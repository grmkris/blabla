import { useRouter } from "next/router";
import { api } from "../../web-sqlite/sqlite";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "../../components/Layout";
import { eventToNoteMapper } from "../../web-sqlite/client-functions";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { EventComponent } from "../../components/event-view/EventComponent";
import { IdentityInformationCard } from "../identity";

export const SearchPage = () => {
  const { search } = useRouter().query;
  const { profiles, events } = useSqliteSearch({
    search: search as string,
  });

  return (
    <Layout title={`Search for ${search}`}>
      <h2>Profiles</h2>
      {profiles.isLoading && <LoadingSpinner />}
      {profiles.data?.map(
        (x) =>
          x.pubkey && (
            <IdentityInformationCard identity={x.pubkey} key={x.pubkey} />
          )
      )}
      <h2>Events</h2>
      {profiles.isLoading && <LoadingSpinner />}
      {events.data
        ?.map((event) =>
          eventToNoteMapper({
            pubkey: event.pubkey,
            tags: event.tags,
            sig: event.sig,
            content: event.content,
            created_at: event.created_at,
            kind: event.kind,
            id: event.id,
          })
        )
        ?.map((x) => (
          <EventComponent note={x} key={x.event.id} />
        ))}
    </Layout>
  );
};

export const useSqliteSearch = (props: { search: string }) => {
  const events = useQuery(["events", props.search], async () => {
    return await api.fullTextSearchEvents(props.search);
  });
  const profiles = useQuery(["profiles", props.search], async () => {
    return await api.fullTextSearchProfiles(props.search);
  });

  return {
    events,
    profiles,
  };
};

export default SearchPage;
