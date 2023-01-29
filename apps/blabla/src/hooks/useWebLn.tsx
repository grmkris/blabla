import type { KeysendArgs, WebLNProvider } from "webln";
import { requestProvider } from "webln";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useWebLn = () => {
  const [webLn, setWebLn] = useState<WebLNProvider>();
  const queryClient = useQueryClient();
  const connect = useMutation(
    async () => {
      const data = await requestProvider();
      if (data) {
        setWebLn(data);
      }
      return data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries(["getInfo"]),
    }
  );

  const getInfo = useQuery({
    queryFn: async () => {
      if (webLn) {
        return await webLn.getInfo();
      } else {
        return null;
      }
    },
    queryKey: ["getInfo"],
    enabled: !!webLn,
  });

  const signMessage = useMutation({
    mutationFn: async (message: string) => {
      if (webLn) {
        return await webLn.signMessage(message);
      }
    },
  });

  const sendPayment = useMutation({
    mutationFn: async (invoice: string) => {
      if (webLn) {
        return await webLn.sendPayment(invoice);
      }
    },
  });

  const makeInvoice = useMutation({
    mutationFn: async (amount: number) => {
      if (webLn) {
        return await webLn.makeInvoice(amount);
      }
    },
  });

  const keySend = useMutation({
    mutationFn: async (variables: KeysendArgs) => {
      if (webLn) {
        return await webLn.keysend(variables);
      }
    },
  });

  const verifyMessage = useMutation({
    mutationFn: async (variables: { message: string; signature: string }) => {
      if (webLn) {
        const { message, signature } = variables;
        return await webLn.verifyMessage(message, signature);
      }
    },
  });

  return {
    connect,
    webLn,
    getInfo,
    signMessage,
    sendPayment,
    makeInvoice,
    keySend,
    verifyMessage,
  };
};
