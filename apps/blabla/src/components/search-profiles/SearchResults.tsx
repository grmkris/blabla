import nostrPeople1 from "../../test.json";
import { Button } from "../common/common";
import { useAppStore } from "../../store";
export const SearchResults = () => {
  return (
    <ul role="list" className="space-y-3">
      {nostrPeople1.elements.map((item) => (
        <li
          key={item["data.nPubKey"]}
          className="overflow-hidden bg-white px-4 py-4 shadow sm:rounded-md sm:px-6"
        >
          <SearchResult
            element={{
              name: item["data.screenName"],
              npubKey: item["data.nPubKey"],
              imageUrl: item["data.profileImageUrl"],
            }}
          />
        </li>
      ))}
    </ul>
  );
};

export const SearchResult = (props: {
  element: { npubKey: string; imageUrl: string; name: string };
}) => {
  const addFollowing = useAppStore.use.addFollowing();
  return (
    <div className="relative flex items-center space-x-3 px-6 py-5">
      <div className="flex-shrink-0">
        <img
          className="h-10 w-10 rounded-full"
          src={props.element.imageUrl}
          alt=""
        />
      </div>
      <div className="min-w-0 flex-1">
        {/* Extend touch target to entire panel */}
        <p className="text-sm font-medium text-gray-900">
          {props.element.name}
        </p>
        <p className="truncate text-sm text-gray-500">
          {props.element.npubKey}
        </p>
      </div>
      <div>
        <Button
          label="Follow"
          onClick={() => {
            console.log("Follow", props.element.npubKey);
            addFollowing({
              id: props.element.npubKey,
              publicKey: props.element.npubKey,
            });
          }}
        />
      </div>
    </div>
  );
};
