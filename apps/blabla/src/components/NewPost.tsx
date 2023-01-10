import { dateToUnix, useNostr } from "nostr-react";
import {
  type Event as NostrEvent,
  getEventHash,
  Kind,
  signEvent,
} from "nostr-tools";
import { useAppStore } from "../store";
import { Button } from "./common/common";
import { createTsForm } from "@ts-react/form";
import { z } from "zod";
import { TextArea } from "./common/TextArea";

// create the mapping
const mapping = [[z.string(), TextArea]] as const; // 👈 `as const` is necessary

// A typesafe React component
const BlaBlaForm = createTsForm(mapping);

const NewPostSchema = z.object({
  text: z.string().min(1).max(1000),
});
export const NewPost = () => {
  const { publish } = useNostr();
  const identities = useAppStore.use.identities();
  function onSubmit(data: z.infer<typeof NewPostSchema>) {
    // gets typesafe data when form is submitted
    const event: NostrEvent = {
      content: data.text,
      kind: Kind.Text,
      tags: [],
      created_at: dateToUnix(),
      pubkey: identities[0].publicKey,
    };

    event.id = getEventHash(event);
    event.sig = signEvent(event, identities[0].privateKey);
    publish(event);
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
