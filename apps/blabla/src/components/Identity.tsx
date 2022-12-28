export type Identity = {
  id: string;
  name: string;
  publicKey: string;
  privateKey?: string;
};

export const Identity = (props: { identity: Identity }) => {
  return (
    <div className={"text-white"}>
      <h1>Identity</h1>
      <p>Name: {props.identity.name}</p>
      <p>Public Key: {props.identity.publicKey}</p>
      <p>Private Key: {props.identity.privateKey}</p>
    </div>
  );
};
