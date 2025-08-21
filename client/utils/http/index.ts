import { BACKEND_BASE_URL } from "@/constants/http";
import type { Dictionary, Maybe } from "ts-wiz";
import type { AxiosRequestConfig } from "axios";
import QueryString from "@/utils/qs";
import axiosInstance from "./axios";

export type FetchOptions<
  Params extends Maybe<Dictionary> = Dictionary,
  Body extends Maybe<Dictionary | Array<unknown> | FormData> = undefined
> = AxiosRequestConfig<Body> & {
  baseURL?: never;
  params?: Params;
  baseUrl?: string;
};

class HttpClient {
  public get<
    Data extends Maybe<Dictionary> = Dictionary,
    Params extends Maybe<Dictionary> = Dictionary
  >(options: FetchOptions<Params>): Promise<Data> {
    const config = typeof options === "string" ? { url: options } : options;

    return this.request<Data, Params>({ method: "GET", ...config });
  }

  public post<
    Data extends Maybe<Dictionary> = Dictionary,
    Params extends Maybe<Dictionary> = Dictionary,
    Body extends Dictionary | Array<unknown> = Dictionary
  >(options: Omit<FetchOptions<Params, Body>, "method"> = {}): Promise<Data> {
    return this.request<Data, Params, Body>({ method: "POST", ...options });
  }

  public patch<
    Data extends Maybe<Dictionary> = Dictionary,
    Params extends Maybe<Dictionary> = Dictionary,
    Body extends Dictionary | Array<unknown> = Dictionary
  >(options: Omit<FetchOptions<Params, Body>, "method"> = {}): Promise<Data> {
    return this.request<Data, Params, Body>({ method: "PATCH", ...options });
  }

  public put<
    Data extends Maybe<Dictionary> = Dictionary,
    Params extends Maybe<Dictionary> = Dictionary,
    Body extends Dictionary | Array<unknown> | FormData = Dictionary
  >(options: Omit<FetchOptions<Params, Body>, "method"> = {}): Promise<Data> {
    return this.request<Data, Params, Body>({ method: "PUT", ...options });
  }

  public delete<
    Data extends Maybe<Dictionary> = Dictionary,
    Params extends Maybe<Dictionary> = Dictionary,
    Body extends Dictionary | Array<unknown> = Dictionary
  >(options: Omit<FetchOptions<Params, Body>, "method"> = {}): Promise<Data> {
    return this.request<Data, Params, Body>({ method: "DELETE", ...options });
  }

  private async request<
    Data extends Maybe<Dictionary> = Dictionary,
    Params extends Maybe<Dictionary> = Dictionary,
    Body extends Maybe<Dictionary | Array<unknown> | FormData> = undefined
  >(options: FetchOptions<Params, Body>): Promise<Data> {
    const { baseUrl, headers, ...restOptions } = options;

    if (headers && headers.set instanceof Function)
      headers.set("X-Platform", "TarazWeb");

    return axiosInstance
      .request<Data>({
        headers,
        baseURL: BACKEND_BASE_URL,
        paramsSerializer: (p) => QueryString.stringify(p),
        ...restOptions,
      })
      .then((res) => res.data);
  }
}

const Http = new HttpClient();

export default Http;
