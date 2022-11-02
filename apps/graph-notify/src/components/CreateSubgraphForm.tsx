import { useGetChainData } from "../hooks/useGetChainData";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SubgraphForm } from "../pages";
import Select from "react-select";
import { useGraphNotifyStore } from "../store";
import { TextField } from "./common/TextField";

export const CreateSubgraphForm = () => {
  const { addInput } = useGraphNotifyStore((state) => ({
    addInput: state.addSubgraph,
  }));
  const { chainList } = useGetChainData();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    getValues,
  } = useForm<SubgraphForm>();
  const onSubmit: SubmitHandler<SubgraphForm> = (data) => {
    addInput(data);
    reset();
  };

  console.log("errors", errors);
  console.log("getValues", getValues());
  return (
    <div className="md:col-span-1 items-center justify-center text-center">
      <form onSubmit={handleSubmit(onSubmit)} className="form-control w-full">
        <TextField
          label="Subgraph url"
          placeholder="https://yousubgraph.url"
          register={register("indexer", { required: true })}
          error={errors.indexer && "This field is required"}
        />
        {chainList.data && (
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
                    label: chainList.data
                      .map((chain) => chain.chainId + "-" + chain.name)
                      .find((chain) => chain?.includes(value?.toString())),
                    value,
                  }}
                  options={chainList.data.map((chain) => ({
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

        <TextField
          register={register("name", { required: true })}
          label="Name"
          placeholder="Name"
          error={errors.name && "This field is required"}
        />

        <input type="submit" className={"mt-4 btn"} />
      </form>
    </div>
  );
};
