import { UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";

export declare type FieldValues = Record<string, any>;

export const TextField = (props: {
  label: string;
  placeholder: string;
  error?: string;
  className?: string;
  register: UseFormRegisterReturn<any>;
}) => {
  console.log("props", props);
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
        className={clsx("input input-bordered input-primary", [
          props.error && "input-error",
          props.className,
        ])}
        {...props.register}
      />
    </div>
  );
};
