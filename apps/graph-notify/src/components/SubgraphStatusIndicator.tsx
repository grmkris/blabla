import { useGetSubgraphStatus } from "../hooks/useGetSubgraphStatus";
import { useGraphNotifyStore } from "../store";
import Link from "next/link";
import { allChains } from "wagmi";
import { useChainListChains } from "../hooks/useChainListChains";
import { useGetLatestBlock } from "../hooks/useGetLatestBlock";
import { BigNumber } from "ethers";
import React, { useMemo } from "react";
import Image from "next/image";
import chainIds from "../chainIds";
import BellIcon from "./../../public/bell.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useTrpc } from "../config/trpc/useTrpc";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";

export const SubscriptionSchema = z.object({
  subgraphUrl: z.string().url(),
  email: z.string().email(),
  user: z.string(),
  interval: z.number()
})
export type Subscription = z.infer<typeof SubscriptionSchema>;

const NoSsr = (props: { children: React.ReactNode }) => (
  <React.Fragment>{props.children}</React.Fragment>
);
export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});

export const SubgraphStatusIndicator = (props: {
  chain: number;
  indexer: string;
  index: number;
}) => {
  const { data, isLoading } = useGetSubgraphStatus(
    props.chain?.toString(),
    props.indexer
  );
  const { removeInput } = useGraphNotifyStore((state) => ({
    removeInput: state.removeInput,
  }));
  const chain = allChains.find((element) => {
    return element.id == props.chain;
  });
  const { data: chainData } = useChainListChains();
  const chainFromChainData = chainData?.find((element) => {
    return element.networkId == props.chain;
  });
  const {
    data: latestBlock,
    isLoading: isLoadingLatestBlock
  } = useGetLatestBlock(
    chainFromChainData?.rpc.find((element) => !element.includes("${"))
  );
  const session = useSession();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Subscription>({resolver: zodResolver(SubscriptionSchema),defaultValues: {
      user: session?.data?.user.address,
      subgraphUrl: props.indexer,
    }});

  const icon = useMemo(() => {
    const chainSlug =
      chainIds[chainFromChainData?.chainId as keyof typeof chainIds];
    const url = chainSlug
      ? `https://defillama.com/chain-icons/rsz_${chainSlug}.jpg`
      : "/unknown-logo.png";
    console.log(url);
    return url;
  }, [chainFromChainData]);

  const {mutate, isLoading : isLoadingSubscribe, data : dataSubscribe } = useTrpc.useMutation("subscribe");
  const blockBehind =
    latestBlock &&
    data?._meta?.block.number &&
    latestBlock - data?._meta?.block.number;
  const onSubmit: SubmitHandler<Subscription> = (subscriptionReq) => {
    console.log("subscriptionReq", subscriptionReq);
    mutate({
      user: subscriptionReq.user || session?.data?.user.address,
      subgraphUrl: subscriptionReq.subgraphUrl,
      email: subscriptionReq.email,
      interval: subscriptionReq.interval,
    });
  };

  setValue("user", session?.data?.user.address || "");
  return (
    <NoSsr>
      <div className="card w-80 bg-base-100 shadow-xl">
        <div className="drawer drawer-end max-h-80">
          <input id={props.index.toString()} type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <div className="card-body">
              <div className="card-actions justify-end">
                <label
                  htmlFor={props.index.toString()}
                  className="drawer-button btn btn-square btn-sm"
                >
                  <BellIcon />
                </label>
                <button
                  className="btn btn-square btn-sm"
                  onClick={() => {
                    removeInput(props.index);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {isLoading || !data && <div className="text-gray-500">Loading...</div>}
              <h2 className="card-title">Subgraph Status</h2>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="rounded-full">
                    <Image
                      src={icon}
                      onError={(e) => {
                        e.currentTarget.src = "/unknown-logo.png";
                        e.currentTarget.onerror = null;
                      }}
                      width={28}
                      height={28}
                      alt={chainFromChainData?.shortName + " logo"}
                    />
                  </div>
                </div>
                {chain?.blockExplorers?.default.url ? (
                  <Link href={chain?.blockExplorers?.default.url}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        "link link-primary truncate text-clip max-w-sm"
                      }
                    >
                      {chain?.name}
                    </a>
                  </Link>
                ) : (
                  chain?.name
                )}
              </div>
              <Link href={props.indexer} passHref>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className={"link link-primary truncate text-clip max-w-sm"}
                >
                  {props.indexer}
                </a>
              </Link>{" "}
              <div className="flex flex-col text-left">
                <div>Subgraph block: {data?._meta?.block.number}</div>
                {isLoading && <div>Subgraph block: Loading...</div>}
                {!data?._meta?.block.number && (
                  <div className="badge badge-error gap-2">
                    Subgraph block: Not available
                  </div>
                )}
                {isLoadingLatestBlock && <div>Latest block: Loading...</div>}
                {!isLoadingLatestBlock && (
                  <>
                    {latestBlock ? (
                      <div>
                        Latest block: {BigNumber.from(latestBlock).toString()}
                      </div>
                    ) : (
                      <div className="badge badge-error gap-2">
                        Latest block: Not available
                      </div>
                    )}
                    {blockBehind !== undefined && (
                      <div>
                        Blocks behind:
                        {blockBehind <= 10 && (
                          <div className="badge badge-success m-2">
                            {blockBehind}
                          </div>
                        )}
                        {blockBehind >= 10 && (
                          <div className="badge badge-warning gap-2">
                            {blockBehind}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="drawer-side">
            <label htmlFor={props.index.toString()} className="drawer-overlay"></label>
            <div className="menu p-4 overflow-y-auto w-72 bg-base-100 text-base-content">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="input input-primary input-bordered"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Interval</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Interval"
                    className="input input-primary input-bordered"
                    {...register("interval", {valueAsNumber: true })}
                  />
                  {errors.interval && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
                {
                  /* submit button */
                  <input
                    type="submit"
                    className="btn btn-primary float-left mt-4"
                    value="Subscribe"
                  />
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    </NoSsr>
  );
};
