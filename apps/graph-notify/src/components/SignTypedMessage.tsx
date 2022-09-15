import { useSignTypedData } from "wagmi";

// All properties on a domain are optional
const domain = {
  name: "Ether Mail",
  version: "1",
  chainId: 1,
  verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
};

// The named list of all type definitions
const types = {
  Person: [
    { name: "name", type: "string" },
    { name: "wallet", type: "address" },
  ],
  Mail: [
    { name: "from", type: "Person" },
    { name: "to", type: "Person" },
    { name: "contents", type: "string" },
  ],
};

const value = {
  from: {
    name: "Cow",
    wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
  },
  to: {
    name: "Bob",
    wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
  },
  contents: "Hello, Bob!",
};

export const SignTypedMessage = () => {
  const { data, isError, isLoading, isSuccess, signTypedData } =
    useSignTypedData({
      domain,
      types,
      value,
    });

  return (
    <div>
      <button className={'btn'} disabled={isLoading} onClick={() => signTypedData()}>
        Sign typed data
      </button>
      {isSuccess && <div>Signature: {data}</div>}
      {isError && <div>Error signing message</div>}
    </div>
  );
};