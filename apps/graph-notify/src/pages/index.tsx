import type { NextPage } from "next";
import Head from "next/head";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { SubgraphStatusIndicator } from "../components/SubgraphStatusIndicator";
import { useGraphNotifyStore } from "../store";
import { useChainListChains } from "../hooks/useChainListChains";
import Select from "react-select";
import { useTrpc } from "../config/trpc/useTrpc";

export type Inputs = { chainId: number; indexer: string };
const Home: NextPage = () => {
  const { inputs, addInput } = useGraphNotifyStore((state) => ({
    inputs: state.inputs,
    addInput: state.addInput,
  }));
  const { data: chainList } = useChainListChains();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("qqq", data);
    addInput(data);
    reset();
  };
  const result = useTrpc.useQuery(["hello"], {});

  console.log("result", result.data);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/apps/graph-notify/public/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Subgraph{" "}
          <a className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900">
            Observer
          </a>
        </h1>
        <p className="mt-3 text-2xl">
          Be 🚨notified 🚨 on important events happening on any subgraph 🚀
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text font-bold">Sugraph url?</span>
            </label>
            <input
              className="input input-bordered input-primary"
              {...register("indexer", { required: true })}
            />
            <label className="label">
              {errors.indexer && (
                <span className={"label-text-alt text-error"}>
                  This field is required
                </span>
              )}
            </label>
          </div>

          <div className="form-control w-full w-72">
            {chainList && (
              <>
                <label className="label">
                  <span className="label-text font-bold">Chain</span>
                </label>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="chainId"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      onChange={(option) => onChange(option?.value)}
                      value={{
                        label: chainList
                          .map((chain) => chain.chainId + "-" + chain.name)
                          .find((chain) => chain?.includes(value?.toString())),
                        value,
                      }}
                      options={chainList.map((chain) => ({
                        label: chain.chainId + "-" + chain.name,
                        value: chain.chainId,
                      }))}
                      styles={{
                        input: (provided) => ({
                          ...provided,
                          height: "2.4em",
                        }),
                        control: (provided) => ({
                          ...provided,
                          borderRadius: "0.5em",
                        }),
                      }}
                    />
                  )}
                />
              </>
            )}
          </div>

          <input type="submit" className={"mt-2 btn"} />
        </form>
        <div className={"divider font-bold text-2xl"}>
          <a className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-blue-700">
            Subgraphs
          </a>
        </div>
        <div className={"mb-20 flex flex-wrap flex-row justify-center"}>
          {inputs.map((subgraph, index) => {
            return (
              <div className={"m-2"}>
                <SubgraphStatusIndicator
                  chain={subgraph.chainId}
                  indexer={subgraph.indexer}
                  key={index}
                  index={index}
                />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;
