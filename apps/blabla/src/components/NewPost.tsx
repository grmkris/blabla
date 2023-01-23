import { Button } from "./common/common";
import { createTsForm } from "@ts-react/form";
import { z } from "zod";
import { TextArea } from "./common/TextArea";
import toast from "react-hot-toast";
import { useNewEvent } from "../hooks/useNewEvent";
import { useRouter } from "next/router";

// create the mapping
const mapping = [[z.string(), TextArea]] as const; // 👈 `as const` is necessary

// A typesafe React component
const BlaBlaForm = createTsForm(mapping);

export const NewPostSchema = z.object({
  text: z.string().min(1).max(1000),
});
export const NewPost = (props: { eventId?: string }) => {
  const router = useRouter();
  const { newNote } = useNewEvent();
  async function onSubmit(data: z.infer<typeof NewPostSchema>) {
    await newNote.mutateAsync({ data, eventId: props.eventId });
    router.push("/");
  }

  return (
    <div className={"my-2"}>
      <BlaBlaForm
        schema={NewPostSchema}
        onSubmit={onSubmit}
        renderAfter={() => <Button type="submit">Submit</Button>}
        // optional typesafe props forwarded to your components
      />
    </div>
  );
};

export const NoIdentitiesToast = () => {
  return toast.custom((t) => (
    <div className="toast-end toast toast-top">
      <div className="alert alert-warning shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 flex-shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>No identities connected</span>
        </div>
      </div>
    </div>
  ));
};
