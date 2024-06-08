import {
  DefaultBodyType,
  HttpResponse,
  HttpResponseResolver,
  PathParams,
  http,
} from "msw";

export const createHandler = (
  path: string,
  method: "get" | "post" | "put" | "delete" | "patch",
  handlerFn: HttpResponseResolver<PathParams, DefaultBodyType, undefined>
) => {
  return ({ errorResponse, isError }: MockArgs = {}) => {
    const methodFn = {
      get: http.get,
      post: http.post,
      put: http.put,
      delete: http.delete,
      patch: http.patch,
    }[method];
    if (isError) {
      return methodFn(path, () => new HttpResponse(null, errorResponse));
    }
    return methodFn(path, handlerFn);
  };
};

type MockArgs = {
  errorResponse?: ResponseInit;
  isError?: boolean;
  timeout?: number;
};
