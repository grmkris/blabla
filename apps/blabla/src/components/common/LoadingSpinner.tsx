import { BounceLoader } from "react-spinners";

export const LoadingSpinner = (props: { size?: number }) => {
  return (
    <BounceLoader
      color={"#4f46e5"}
      loading={true}
      size={props.size ?? 150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
