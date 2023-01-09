import Following from "../components/Following";
import { Layout } from "../components/Layout";
import NoSSR from "../components/NoSSR";
import { UserIdentities } from "../components/UserIdentities";
import { SearchIdentities } from "../components/SearchIdentities";

export default function Identities() {
  return (
    <Layout>
      <NoSSR>
        <div className={"flex flex-wrap"}>
          <h1>Identities</h1>
          <SearchIdentities />
          <Following />
        </div>
      </NoSSR>
    </Layout>
  );
}
