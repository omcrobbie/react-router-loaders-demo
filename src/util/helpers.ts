import { SerializeFrom } from "@remix-run/node";
import { defer } from "@remix-run/react";
import {
  LoaderFunction,
  LoaderFunctionArgs,
  Await as _Await,
  useAsyncValue,
  useLoaderData,
} from "react-router-dom";
import { LoaderData } from "./types";

export const useTypedLoaderData = <T extends LoaderFunction>() => {
  const data = useLoaderData() as LoaderData<T>;
  return data;
};

export const useTypedAsyncValue = <
  T extends LoaderFunction,
  K extends keyof SerializeFrom<T>
>() => {
  return useAsyncValue() as Awaited<SerializeFrom<T>[K]>;
};

export function deferredLoader<TData extends Record<string, unknown>>(
  dataFunc: (args: LoaderFunctionArgs) => TData
) {
  return (args: LoaderFunctionArgs) =>
    defer(dataFunc(args)) as Omit<ReturnType<typeof defer>, "data"> & {
      data: TData;
    };
}

export const useTypedDeferredLoaderData = <
  TLoader extends ReturnType<typeof deferredLoader>
>() => {
  return useLoaderData() as ReturnType<TLoader>["data"];
};

export interface AwaitResolveRenderFunction<T> {
  (data: Awaited<T>): React.ReactElement;
}

export interface AwaitProps<T> {
  children: React.ReactNode | AwaitResolveRenderFunction<T>;
  errorElement?: React.ReactNode;
  resolve: Promise<T>;
}

export function Await<T>(props: AwaitProps<T>): JSX.Element {
  return _Await(props);
}
