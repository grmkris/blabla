import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import React from "react";
const NoSSR = (props: { children: ReactNode }) => (
  <React.Fragment>{props.children}</React.Fragment>
);
export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
});
