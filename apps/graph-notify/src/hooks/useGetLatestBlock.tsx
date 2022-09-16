import { useQuery } from "@tanstack/react-query";

export const useGetLatestBlock = (rpc: string | undefined) => {
  return useQuery<number>(
    [rpc],
    async () => {
      if (!rpc) {
        throw new Error("No RPC");
      }
      const result = await fetch(rpc, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_blockNumber",
          params: [],
          id: 1
        })
      });
      const json = await result.json();
      return json.result;
    }, {
      enabled: !!rpc
    });
};
