import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  loading?: boolean;
  loadingLabel?: string;
  error?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}
export const Button = (props: ButtonProps) => {
  const {
    label,
    icon,
    className = "",
    loading = false,
    loadingLabel = "Loading...",
    error = "",
    disabled = false,
    children,
    ...rest
  } = props;

  return (
    <button
      type="button"
      disabled={loading || disabled}
      className={`btn inline-flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium leading-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        disabled
          ? "cursor-not-allowed bg-gray-300"
          : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
      } ${className}`}
      {...rest}
    >
      {loading ? (
        <svg
          className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1z"
          ></path>
        </svg>
      ) : (
        icon
      )}
      {loading && (loadingLabel ?? children)}
      {!loading && (label ?? children)}
      {error && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ExclamationCircleIcon
            className="h-5 w-5 text-red-500"
            aria-hidden="true"
          />
        </div>
      )}
    </button>
  );
};
