import {
  useBookmarksFeed,
  useFollowsFeed,
  useGlobalFeed,
  useNumberOfNewItems,
} from "../hooks/useGlobalFeed";
import { EventComponent } from "./event-view/EventComponent";
import { Button } from "./common/Button";

const NumberOfNumberOfNewItems = () => {
  const { numberOfNewItems } = useNumberOfNewItems();
  const { refresh } = useGlobalFeed();
  return (
    <>
      {numberOfNewItems?.data ? (
        <Button
          className="w-max"
          onClick={() => {
            refresh.mutate();
          }}
          loading={refresh.isLoading}
        >
          ~ {numberOfNewItems.data} new items
        </Button>
      ) : null}
    </>
  );
};
export const GlobalFeed = () => {
  const { globalFeed } = useGlobalFeed();
  return (
    <div className="flex w-max max-w-full flex-col items-start space-y-2">
      <NumberOfNumberOfNewItems />
      {globalFeed.data?.pages?.map((notes) =>
        notes.map((note) => <EventComponent note={note} key={note.event.id} />)
      )}
      <Button onClick={() => globalFeed.fetchNextPage()}>Load more</Button>
    </div>
  );
};

export const BookmarkedFeed = () => {
  const { bookmarksFeed, numberOfNewItems, refresh } = useBookmarksFeed();

  return (
    <div className="flex max-w-full flex-col items-start space-y-2">
      {numberOfNewItems?.data && numberOfNewItems.data > 0 ? (
        <Button
          className={"w-max"}
          onClick={() => {
            refresh.mutate();
          }}
        >
          ~ {numberOfNewItems.data} new items
        </Button>
      ) : null}
      {bookmarksFeed.data?.pages?.map((notes) =>
        notes.map((note) => <EventComponent note={note} key={note.event.id} />)
      )}
      <div className={"w-max"}>
        <Button onClick={() => bookmarksFeed.fetchNextPage()}>Load more</Button>
      </div>
    </div>
  );
};

export const FollowsFeed = () => {
  const { followsFeed, numberOfNewItems, refresh } = useFollowsFeed();

  return (
    <div className="flex max-w-full flex-col items-start space-y-2">
      {numberOfNewItems?.data && numberOfNewItems.data > 0 ? (
        <Button
          className={"w-max"}
          onClick={() => {
            refresh.mutate();
          }}
        >
          ~ {numberOfNewItems.data} new items
        </Button>
      ) : null}
      {followsFeed.data?.pages?.map((notes) =>
        notes.map((note) => <EventComponent note={note} key={note.event.id} />)
      )}
      <div className={"w-max"}>
        <Button onClick={() => followsFeed.fetchNextPage()}>Load more</Button>
      </div>
    </div>
  );
};

/*
coming soon
 */
export const ExploreFeed = () => {
  return <div>coming soon</div>;
};
