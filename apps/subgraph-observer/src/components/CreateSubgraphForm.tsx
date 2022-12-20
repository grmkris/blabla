import { useGetChainData } from "../hooks/useGetChainData";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useAppStore } from "../store";
import { TextField } from "./common/TextField";
import { useGetSubgraphStatus } from "../hooks/useGetSubgraphStatus";
import type { SubgraphForm } from "../types/types";
import { useEffect } from "react";

type Props = {
  formData?: SubgraphForm;
  setModalOpen?: (setModal: boolean) => void;
};

const tagValues = [{ name: "Production" }, { name: "Development" }];

export const CreateSubgraphForm = ({ formData, setModalOpen }: Props) => {
  const { addInput, editInput } = useAppStore((state) => ({
    addInput: state.addSubgraph,
    editInput: state.updateSubgraph,
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
    !formData ? addInput(data) : editInput(data);
    setModalOpen && setModalOpen(false);
    reset();
  };

  useEffect(() => {
    if (formData) {
      reset(formData);
    }
  }, [formData]);

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

        <>
          <label className="label">
            <span className="label-text font-bold">Subgraph Tag</span>
          </label>
          <Controller
            control={control}
            rules={{ required: true }}
            name="tag"
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={(option) => onChange(option?.value)}
                value={{
                  label: tagValues
                    .map((tag) => tag.name)
                    .find((tag) => tag?.includes(value?.toString())),
                  value,
                }}
                options={tagValues.map((tag) => ({
                  label: tag.name,
                  value: tag.name,
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

        <input type="submit" className={"btn my-6 bg-primary"} />
      </form>
    </div>
  );
};

const SubgraphStatusLabel = (props: { url?: string }) => {
  try {
    const subgraphStatus = useGetSubgraphStatus(
      props.url ? new URL(props.url) : undefined
    );

    if (subgraphStatus.isFetching && !subgraphStatus.data)
      return <span className={"inline"}>Subgraph url ⏳</span>;
    if (subgraphStatus.error) return <div>Subgraph url ❌</div>;
    if (subgraphStatus.data) return <div>Subgraph url ✅</div>;
    return <div>Subgraph url</div>;
  } catch (e) {
    return <div>Subgraph url</div>;
  }
};
