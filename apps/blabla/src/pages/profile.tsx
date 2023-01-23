import { UserIdentities } from "../components/UserIdentities";
import { Layout } from "../components/Layout";
import NoSSR from "../components/NoSSR";

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
