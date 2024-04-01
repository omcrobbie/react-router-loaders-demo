import { LoaderFunction, useLoaderData } from "react-router-dom";
import { LoaderData } from "./types";

export const useTypedLoaderData = <T extends LoaderFunction>() => {
  const data = useLoaderData() as LoaderData<T>;
  return data;
};
