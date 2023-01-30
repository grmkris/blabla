import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import type { ComponentPropsWithoutRef } from "react";

export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  name: string;
  // typescript input types
  type?: "text" | "number" | "email" | "password" | "tel" | "url" | "search";
  error?: string;
  className?: string;
}
export const Input = (props: InputProps) => {
  const {
    label,
    name,
    type = "text",
    error = "",
    className = "",
    ...rest
  } = props;

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="mt-1">
        <input
          type={type}
          name={name}
          id={name}
          className={`text-black block w-full rounded-md shadow-sm sm:text-sm ${
            error
              ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500"
              : "border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          }`}
          {...rest}
        />
      </div>
      {error && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ExclamationCircleIcon
            className="h-5 w-5 text-red-500"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
};
