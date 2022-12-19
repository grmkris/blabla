import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppStore } from "../../store";
import toast from "react-hot-toast";
import { base64DecodeToSubgraphFormData } from "../../utils/functions";
import NonSSRWrapper from "../../components/common/NonSSRWrapper";

function SharePage() {
  return (
    <NonSSRWrapper>
      <ShareComponent />
    </NonSSRWrapper>
  );
}

export default SharePage;

const ShareComponent = () => {
  const router = useRouter();
  const { hash } = router.query;
  const updateSubgraphs = useAppStore((state) => state.updateSubgraphs);

  useEffect(() => {
    console.log("hash", hash);
    if (hash && typeof hash === "string") {
      try {
        const mappedSubgraphForms = base64DecodeToSubgraphFormData(hash);

        updateSubgraphs(mappedSubgraphForms);
        toast.success("Subgraphs imported successfully", {
          position: "bottom-center",
        });
        router.push("/");
      } catch (e) {
        toast.error("Error importing subgraphs", {
          position: "bottom-center",
        });
      }
    } else if (hash) {
      toast.error("Error importing subgraphs", {
        position: "bottom-center",
      });
    }
  }, [hash]);

  return (
    <div className="flex w-full items-center justify-center">
      <button className="btn-outline loading btn">loading</button>
    </div>
  );
};
