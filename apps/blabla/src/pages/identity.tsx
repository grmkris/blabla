import { Layout } from "../components/Layout";
import { z } from "zod";
import NoSSR from "../components/common/NoSSR";
import { useSearchParams } from "@jokullsolberg/next-use-search-params";
import { IdentityView, IdentityViewSchema } from "../components/pubkey/IdentityView";

export const IdentityPage = () => {
  const [{ id }] = useSearchParams({
    id: z.string(),
    selected: IdentityViewSchema.default("events"),
  });

  return (
    <NoSSR>
      <Layout title={""}>
        <div className="flex flex-col space-y-4">
          {id && <IdentityView identity={id} />}
        </div>
      </Layout>
    </NoSSR>
  );
};

export default IdentityPage;
