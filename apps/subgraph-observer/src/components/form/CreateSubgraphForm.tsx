import { useGetChainData } from "../../hooks/useGetChainData";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useAppStore, useTagStore } from "../../store";
import { TextField } from "../common/TextField";
import { useGetSubgraphStatus } from "../../hooks/useGetSubgraphStatus";
import type { SubgraphForm } from "../../types/types";
import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";

type Props = {
  formData?: SubgraphForm;
  setModalOpen?: (setModal: boolean) => void;
};

export const CreateSubgraphForm = ({ formData, setModalOpen }: Props) => {
  const { addInput, editInput } = useAppStore((state) => ({
    addInput: state.addSubgraph,
    editInput: state.updateSubgraph,
  }));

  const { tags, addTag } = useTagStore();
  const chainList = useGetChainData();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
    setValue,
  } = useForm<SubgraphForm>();

  useEffect(() => {
    if (formData) {
      reset(formData);
    }
  }, [formData]);

  const onSubmit: SubmitHandler<SubgraphForm> = (data) => {
    !formData ? addInput(data) : editInput(data);
    setModalOpen && setModalOpen(false);
    reset();
  };

  const addNewTagHandler = (inputValue: string) => {
    if (!inputValue) return;

    addTag(inputValue);

    setValue("tag", inputValue);
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
            <Controller
              control={control}
              rules={{ required: true }}
              name="chainId"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <label className="label">
                    <span className="label-text font-bold">Chain</span>
                    {error && (
                      <span className="label-text-alt text-error">
                        Required
                      </span>
                    )}
                  </label>
                  <Select
                    instanceId={"chain_select"}
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
                        borderColor: error ? "#f87171" : "",
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
                </>
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

        <Controller
          control={control}
          rules={{ required: true }}
          name="tag"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <label className="label">
                <span className="label-text font-bold">Subgraph Tag</span>
                {error && (
                  <span className="label-text-alt text-error">Required</span>
                )}
              </label>

              <CreatableSelect
                className="w-full"
                instanceId={"tag_select"}
                onChange={(option) => onChange(option?.value)}
                value={{
                  label: tags.find((tag) => tag?.includes(value?.toString())),
                  value,
                }}
                options={tags.map((tag) => ({
                  label: tag,
                  value: tag,
                }))}
                styles={{
                  input: (provided) => ({
                    ...provided,

                    height: "2.4em",
                  }),
                  control: (provided) => ({
                    ...provided,
                    borderColor: error ? "#f87171" : "",
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
                onCreateOption={addNewTagHandler}
                isClearable
              />
            </>
          )}
        />

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
