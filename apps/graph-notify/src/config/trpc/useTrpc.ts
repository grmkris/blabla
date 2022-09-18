import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "../pages/api/trpc/[trpc]";

export const useTrpc = createReactQueryHooks<AppRouter>();

