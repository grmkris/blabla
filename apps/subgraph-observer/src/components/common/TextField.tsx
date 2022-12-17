import { UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";
import { ReactNode } from "react";

export declare type FieldValues = Record<string, any>;

export const TextField = (props: {
  label: string | ReactNode;
  placeholder: string;
  error?: string;
  className?: string;
  register: UseFormRegisterReturn<any>;
}) => {
  return (
    <div className="form-control indicator w-full">
      <label className="label">
        <span className="label-text font-bold">{props.label}</span>
        {props.error && (
          <span className="label-text-alt text-error">Required</span>
        )}
      </label>
      <input
        placeholder={props.placeholder}
        autoComplete="off"
        className={clsx("input ", [
          props.error && "input-error",
          props.className,
        ])}
        {...props.register}
      />
    </div>
  );
};
