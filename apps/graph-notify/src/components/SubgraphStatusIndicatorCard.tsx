import { useGetSubgraphStatus } from "../hooks/useGetSubgraphStatus";
import { useGraphNotifyStore } from "../store";
import Link from "next/link";
import { allChains } from "wagmi";
import { useChainListChains } from "../hooks/useChainListChains";
import { useGetLatestBlock } from "../hooks/useGetLatestBlock";
import { BigNumber } from "ethers";
import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import chainIds from "../chainIds";
import BellIcon from "./../../public/bell.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useTrpc } from "../config/trpc/useTrpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Inputs } from "../pages";

export const SubscriptionSchema = z.object({
  subgraphUrl: z.string().url(),
  email: z.string().email(),
  user: z.string(),
  interval: z.string(),
  chainId: z.string().optional(),
});
export type Subscription = z.infer<typeof SubscriptionSchema>;

const NoSsr = (props: { children: React.ReactNode }) => (
  <React.Fragment>{props.children}</React.Fragment>
);
export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});

export const SubgraphStatusIndicatorCard = (props: {
  input: Inputs;
  index: number;
}) => {
  const { data, isLoading } = useGetSubgraphStatus(
    props.input.chainId?.toString(),
    props.input.indexer
  );
  const { removeInput } = useGraphNotifyStore((state) => ({
    removeInput: state.removeInput,
  }));
  const chain = allChains.find((element) => {
    return element.id == props.input.chainId;
  });
  const { data: chainData } = useChainListChains();
  const chainFromChainData = chainData?.find((element) => {
    return element.networkId == props.input.chainId;
  });
  const { data: latestBlock, isLoading: isLoadingLatestBlock } =
    useGetLatestBlock(
      chainFromChainData?.rpc.find((element) => !element.includes("${"))
    );

  const session = useSession();
  const {
    data: subscriptionData,
    isLoading: isLoadingSubscription,
    isError: isErrorSubscriptionData,
  } = useTrpc.useQuery(
    [
      "get-subscription",
      {
        name:
          session?.data?.user?.address +
          "-" +
          props.input.indexer.split("/")[
            props.input.indexer.split("/").length - 1
          ],
      },
    ],
    {
      ssr: false,
      retry: 0,
    }
  );
  const utils = useTrpc.useContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<Subscription>({
    resolver: zodResolver(SubscriptionSchema),
    defaultValues: {
      user: session?.data?.user.address,
      subgraphUrl: props.input.indexer,
    },
  });

  const icon = useMemo(() => {
    const chainSlug =
      chainIds[chainFromChainData?.chainId as keyof typeof chainIds];
    const url = chainSlug
      ? `https://defillama.com/chain-icons/rsz_${chainSlug}.jpg`
      : "/unknown-logo.png";
    console.log(url);
    return url;
  }, [chainFromChainData]);

  const {
    mutate,
    isLoading: isLoadingSubscribe,
    data: dataSubscribe,
  } = useTrpc.useMutation("subscribe", {
    onSuccess: async () => {
      await utils.invalidateQueries(["get-subscription"]);
    },
  });
  const deleteSubscription = useTrpc.useMutation("delete-subscription", {
    onSuccess: async () => {
      await utils.invalidateQueries(["get-subscription"]);
      reset({
        ...getValues(),
        email: "",
        interval: "",
      });
    },
  });
  const blockBehind =
    latestBlock &&
    data?._meta?.block.number &&
    latestBlock - data?._meta?.block.number;
  const onSubmit: SubmitHandler<Subscription> = async (subscriptionReq) => {
    console.log("subscriptionReq", subscriptionReq);
    mutate({
      user: subscriptionReq.user,
      subgraphUrl: subscriptionReq.subgraphUrl,
      email: subscriptionReq.email,
      interval: subscriptionReq.interval,
      chainId: props.input.chainId.toString(),
    });
  };

  useEffect(() => {
    if (subscriptionData) {
      reset({
        ...getValues(),
        interval: subscriptionData?.interval,
        email: subscriptionData?.email,
        subgraphUrl: subscriptionData?.subgraphUrl,
      });
    }
    if (session?.data?.user.address) {
      reset({
        ...getValues(),
        user: session?.data?.user.address,
        subgraphUrl: props.input.indexer,
      });
    }
  }, [session?.data?.user.address, subscriptionData]);

  return (
    <NoSsr>
      <div className="card w-80 bg-base-100 shadow-xl">
        <div className="drawer drawer-end max-h-80">
          <input
            id={props.index.toString()}
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content">
            <div className="card-body">
              <div className="card-actions justify-end">
                <label
                  htmlFor={props.index.toString()}
                  className="drawer-button btn btn-square btn-sm btn-accent"
                >
                  <BellIcon />
                </label>
                <button
                  className="btn btn-square btn-sm"
                  onClick={() => {
                    const result = deleteSubscription.mutate({
                      name:
                        session?.data?.user?.address +
                        "-" +
                        props.input.indexer.split("/")[
                          props.input.indexer.split("/").length - 1
                        ],
                    });
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
              {isLoadingSubscription ||
                (!data && <div className="text-gray-500">Loading...</div>)}
              <h2 className="card-title">{props.input.name}</h2>
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
              <Link href={props.input.indexer} passHref>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className={"link link-primary truncate text-clip max-w-sm"}
                >
                  {props.input.indexer}
                </a>
              </Link>{" "}
              <div className="flex flex-col text-left">
                <div>Subgraph block: {data?._meta?.block.number}</div>
                {isLoadingSubscription && <div>Subgraph block: Loading...</div>}
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
            <label
              htmlFor={props.index.toString()}
              className="drawer-overlay"
            ></label>
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
                    type="text"
                    placeholder="Interval"
                    className="input input-primary input-bordered"
                    {...register("interval")}
                  />
                  {errors.interval && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
                {
                  <div className={"flex flex-row space-x-0.5"}>
                    <button
                      type="submit"
                      className={`btn btn-primary mt-4`}
                      disabled={
                        isLoadingSubscription ||
                        isLoadingSubscribe ||
                        deleteSubscription.isLoading
                      }
                    >
                      {subscriptionData && !isErrorSubscriptionData
                        ? "Update"
                        : "Subscribe"}
                    </button>
                    {subscriptionData && !isErrorSubscriptionData && (
                      <button
                        className={`btn btn-error float-right mt-4`}
                        disabled={deleteSubscription.isLoading}
                        onClick={async () => {
                          deleteSubscription.mutate({
                            name:
                              session?.data?.user?.address +
                              "-" +
                              props.input.indexer.split("/")[
                                props.input.indexer.split("/").length - 1
                              ],
                          });
                        }}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    </NoSsr>
  );
};
