import { Layout } from "../components/Layout";
import NoSSR from "../components/common/NoSSR";
import { UserIdentities } from "../components/settings/UserIdentities";

export default function Profile() {
  return (
    <Layout title={"Profile"}>
      <NoSSR>
        <h1 className="m-4 text-2xl font-bold">Profile</h1>
        <UserIdentities />
      </NoSSR>
    </Layout>
  );
}
