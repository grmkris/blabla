import { BounceLoader } from "react-spinners";

export const LoadingSpinner = () => {
  return (
    <BounceLoader
      color={"#4f46e5"}
      loading={true}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
