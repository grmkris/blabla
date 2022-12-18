import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useGraphNotifyStore } from "../../../store";
import toast from "react-hot-toast";
import { base64DecodeToSubgraphFormData } from "../../../utils/functions";

function SharePage() {
  const router = useRouter();
  const { hash } = router.query;
  const { updateSubgraphs } = useGraphNotifyStore();

  useEffect(() => {
    console.log('hash', hash);
    if (hash && typeof hash === 'string') {
      try {
        const mappedSubgraphForms = base64DecodeToSubgraphFormData(hash);
        console.log(mappedSubgraphForms);
        console.log('updateSubgraphs', mappedSubgraphForms);
        updateSubgraphs(mappedSubgraphForms);
        toast.success("Subgraphs imported successfully", {
          position: "bottom-center"
        });
      } catch (e) {
        toast.error("Error importing subgraphs", {
          position: "bottom-center"
        });
      }
    } else if (hash) {
      toast.error("Error importing subgraphs", {
        position: "bottom-center"
      });
    }
    router.push('/');
  }, [hash]);

  return (
    <div className="w-full flex justify-center items-center">
      <button className="btn loading btn-outline">loading</button>
    </div>
  );
}

export default SharePage;
