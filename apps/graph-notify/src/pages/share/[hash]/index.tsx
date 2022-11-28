import { Base64 } from "js-base64";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { SubgraphsDashboard } from "../../../components/SubgraphsDashboard";
import { useSetDataFromHash } from "../../../hooks/useSetDataFromHash";
import { useGraphNotifyStore } from "../../../store";
import { SubgraphForm, SubgraphFormSchema } from "../../../types/common";

type Props = {
  hash: string;
};

function SharePage({ hash }: Props) {
  console.log("hash frontend", hash);

  if (!hash) return;

  useSetDataFromHash({ hash });

  return (
    <div>
      SharePage
      <SubgraphsDashboard />
    </div>
  );
}

export default SharePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("params", context.params);
  if (!context.params)
    return {
      notFound: true,
    };
  return {
    props: { hash: context.params.hash },
  };
};
