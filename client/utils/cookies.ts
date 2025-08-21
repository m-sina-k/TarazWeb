import { destroyCookie, parseCookies, setCookie } from "nookies";
import Intervals from "@/constants/intervals";
import type { GetServerSidePropsContext } from "next";
import type { ParseOptions, SerializeOptions } from "cookie";
import type { Maybe, Nullable } from "ts-wiz";

export default class Cookies {
  static get = <Data>(
    name: string,
    ctx?: Nullable<GetServerSidePropsContext>,
    options?: ParseOptions
  ): Maybe<Data> => {
    try {
      return parseCookies(ctx || null, options)[name] as Data;
    } catch (e) {}
  };

  static set = (
    name: string,
    value: string,
    ctx?: Nullable<GetServerSidePropsContext>,
    options?: SerializeOptions
  ) => {
    try {
      return setCookie(
        ctx,
        name,
        value,
        options || { maxAge: Intervals.Month, path: "/" }
      );
    } catch (e) {}
  };

  static remove = (
    key: string,
    ctx?: GetServerSidePropsContext,
    options = { path: "/" }
  ) => {
    try {
      return destroyCookie(ctx, key, options);
    } catch (e) {}
  };

  /**
   * Indirectly check to see if an http cookie exists,
   * we can reach this by trying to set it to a value with javascript
   * if it can't be set, then the HTTP Only Cookie must be there (or the user is blocking cookies).
   */
  static httpCookieExist = (cookieName: string) => {
    const date = new Date();
    date.setTime(date.getTime() + 1000);
    const expires = `expires=${date.toUTCString()}`;

    if (typeof document !== "undefined") {
      document.cookie = `${cookieName}=new_value;path=/;${expires}`;
      if (!document.cookie.includes(`${cookieName}=`)) return true;
    }
    return false;
  };
}
