import { SerializeFrom } from "@remix-run/node";
import { LoaderFunction, useAsyncValue } from "react-router-dom";
export { useLoaderData as useTypedLoaderData } from "@remix-run/react";

export const useTypedAsyncValue = <
  T extends LoaderFunction,
  K extends keyof SerializeFrom<T>
>() => {
  return useAsyncValue() as Awaited<SerializeFrom<T>[K]>;
};
