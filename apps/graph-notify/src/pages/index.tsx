import type { NextPage } from "next";
import Head from "next/head";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { SubgraphStatusIndicatorCard } from "../components/SubgraphStatusIndicatorCard";
import { useGraphNotifyStore } from "../store";
import { useChainListChains } from "../hooks/useChainListChains";
import Select from "react-select";
import z from "zod";

export const inputSchema = z.object({
  chainId: z.number(),
  indexer: z.string(),
  name: z.string(),
  email: z.string().email().optional(),
});
export type Inputs = z.infer<typeof inputSchema>;

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

  return (
    <div className="min-h-screen">
      <Head>
        <title>Observer</title>
        <link rel="icon" href="/apps/graph-notify/public/favicon.ico" />
      </Head>

      <main className="p-14">
        <div className="p-8 sm:px-0">
          <h1 className="text-6xl font-bold">
            Subgraph{" "}
            <a className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900">
              Observer
            </a>
          </h1>
          <p className="mt-3 text-2xl">
            Get notified on important events on Graph network 🚀
          </p>
        </div>
        <div className="lg:grid lg:grid-cols-3 lg:gap-6 text-center">
          <div className="md:col-span-1 items-center justify-center text-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="form-control w-full"
            >
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
                            .find((chain) =>
                              chain?.includes(value?.toString())
                            ),
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

              <label className="label">
                <span className="label-text font-bold">Name</span>
              </label>
              <input
                className="input input-bordered input-primary"
                {...register("name", { required: true })}
              />
              <label className="label">
                {errors.name && (
                  <span className={"label-text-alt text-error"}>
                    This field is required
                  </span>
                )}
              </label>

              <label className="label">
                <span className="label-text font-bold">Email</span>
              </label>
              <input
                className="input input-bordered input-primary"
                {...register("email", { required: true })}
              />
              <label className="label">
                {errors.email && (
                  <span className={"label-text-alt text-error"}>
                    This field is required
                  </span>
                )}
              </label>
              <input type="submit" className={"mt-2 btn"} />
            </form>
          </div>
          <div className="lg:col-span-2 rounded-lg border-4 border-dashed border-gray-200 mt-4 lg:mt-0">
            <div className={"mb-20 flex flex-wrap flex-row justify-center"}>
              {inputs.map((subgraph, index) => {
                return (
                  <div className={"m-2"}>
                    <SubgraphStatusIndicatorCard
                      input={subgraph}
                      key={index}
                      index={index}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
