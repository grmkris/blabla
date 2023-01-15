export type Identity = {
  id: string;
  publicKey: string;
  privateKey?: string;
  externalData?: ExternalIdentityData;
};

export type ExternalIdentityData = {
  name: string;
  image: string;
  description?: string;
};

export const Identity = (props: { identity: Identity }) => {
  return (
    <div>
      <h1>Identity</h1>
      <p>Name: {props.identity.externalData?.name}</p>
      <p>Public Key: {props.identity.publicKey}</p>
      <p>Private Key: {props.identity.privateKey}</p>
    </div>
  );
};
