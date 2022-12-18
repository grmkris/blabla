import { useGetChainData } from "../hooks/useGetChainData";
import type { SubmitHandler} from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useAppStore } from "../store";
import { TextField } from "./common/TextField";
import { useGetSubgraphStatus } from "../hooks/useGetSubgraphStatus";
import type { SubgraphForm } from "../types/types";

export const CreateSubgraphForm = () => {
  const { addInput } = useAppStore((state) => ({
    addInput: state.addSubgraph,
  }));
  const chainList = useGetChainData();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm<SubgraphForm>();
  const onSubmit: SubmitHandler<SubgraphForm> = (data) => {
    addInput(data);
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-control w-full">
        <TextField
          label={<SubgraphStatusLabel url={watch("indexer")} />}
          placeholder="https://yousubgraph.url"
          register={register("indexer", {
            required: true,
          })}
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
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: "#818cf8",
                      primary: "#818cf8",
                    },
                  })}
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

        <input type="submit" className={"mt-4 btn bg-primary"} />
      </form>
    </div>
  );
};

const SubgraphStatusLabel = (props: { url?: string }) => {
  try {
    const subgraphStatus = useGetSubgraphStatus(props.url ? new URL(props.url) : undefined);
    console.log("SubgraphStatusLabel", subgraphStatus.data);
    if (subgraphStatus.isFetching && !subgraphStatus.data)
      return <span className={"inline"}>Subgraph url ⏳</span>;
    if (subgraphStatus.error) return <div>Subgraph url ❌</div>;
    if (subgraphStatus.data) return <div>Subgraph url ✅</div>;
    return <div>Subgraph url</div>;
  } catch (e) {
    return <div>Subgraph url</div>;
  }
};