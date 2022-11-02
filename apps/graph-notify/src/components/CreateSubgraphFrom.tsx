import { useChainListChains } from "../hooks/useChainListChains";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "../pages";
import Select from "react-select";
import { useGraphNotifyStore } from "../store";
import { TextField } from "./common/TextField";

export const CreateSubgraphFrom = () => {
  const { addInput } = useGraphNotifyStore((state) => ({
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
    addInput(data);
    reset();
  };

  return (
    <div className="md:col-span-1 items-center justify-center text-center">
      <form onSubmit={handleSubmit(onSubmit)} className="form-control w-full">
        <TextField
          label="Subgraph url"
          placeholder="https://yousubgraph.url"
          {...register("indexer", { required: true })}
          error={errors.indexer && "This field is required"}
        />
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

        <TextField
          label="Name"
          placeholder="Name"
          {...register("name", { required: true })}
          error={errors.name && "This field is required"}
        />

        <TextField label="Email" placeholder="Email" {...register("email")} />

        <input type="submit" className={"mt-2 btn"} />
      </form>
    </div>
  );
};
