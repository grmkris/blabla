import type { NostrLocalProfile } from "../AppStore";

export const IdentityComponent = (props: { identity: NostrLocalProfile }) => {
  return (
    <div className="card min-w-0 max-w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h1>Identity</h1>
        <p className={"truncate"}>Public Key: {props.identity.publicKey}</p>
        <p className={"truncate"}>Private Key: {props.identity.privateKey}</p>
      </div>
    </div>
  );
};
