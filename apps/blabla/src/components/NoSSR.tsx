import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { Fragment } from "react";
const NoSSR = (props: { children: ReactNode }) => (
  <Fragment>{props.children}</Fragment>
);
export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
});
