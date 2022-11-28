import { decode } from "js-base64";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useGraphNotifyStore } from "../../../store";
import { SubgraphFormSchema } from "../../../types/common";

function SharePage() {
  const router = useRouter();
  const { setSubgraphs } = useGraphNotifyStore();

  useEffect(() => {
    const hash = router.asPath.split("/")[2];

    const arrays = JSON.parse(decode(hash));
    const mappedSubgraphForms = arrays.map((a: unknown) =>
      SubgraphFormSchema.parse(a)
    );

    setSubgraphs(mappedSubgraphForms);

    router.push("/");
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      <button className="btn loading btn-outline">loading</button>
    </div>
  );
}

export default SharePage;
