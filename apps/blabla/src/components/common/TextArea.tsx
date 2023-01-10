import { useTsController } from "@ts-react/form";

export const TextArea = () => {
  const { field, error } = useTsController<string>();
  return (
    <div className="form-control my-2">
      <label className="label">
        <span className="label-text">Say something nice 🪄</span>
      </label>
      <textarea
        value={field.value ? field.value : ""} // conditional to prevent "uncontrolled to controlled" react warning
        className="textarea-bordered textarea h-24"
        placeholder="Your post..."
        onChange={(e) => {
          field.onChange(e.target.value);
        }}
      />
      {error?.errorMessage && <span>{error?.errorMessage}</span>}
    </div>
  );
};
