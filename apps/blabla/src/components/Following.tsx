import { useAppStore } from "../store";
import { useGetNostrPubKeyExternalData } from "../hooks/useGetNostrPubKeyExternalData";
import Image from "next/image";

export default function Following() {
  const following = useAppStore.use.following();
  return (
    <div className="flex flex-col space-y-4">
      <h1>Following</h1>
      <ul role="list" className="divide-y divide-gray-200">
        {following.map((person) => (
          <li key={person.id} className="flex py-4">
            <FollowingRow element={{ npubKey: person.publicKey }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export const FollowingRow = (props: { element: { npubKey: string } }) => {
  const { data } = useGetNostrPubKeyExternalData(props.element.npubKey);

  return (
    <>
      <Image
        className="h-10 w-10 rounded-full"
        width={40}
        height={40}
        src={data?.image ? data.image : "/images/placeholder.png"}
        alt={"profil"}
      />
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">
          {data?.name ?? props.element.npubKey}
        </p>
      </div>
    </>
  );
};
