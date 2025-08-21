import { stringify, parse, exclude, type StringifyOptions } from "query-string";
import type { Dictionary, Primitive, Nullishable } from "ts-wiz";

class QS {
  /** @description Stringify an object into a query string and sort the keys */
  static stringify = (params: Dictionary, options: StringifyOptions = {}) =>
    stringify(params, { arrayFormat: "none", skipNull: true, ...options });

  /** @description Parse a query string into an object. Leading `?` or `#` are ignored, so you can pass `location.search` or `location.hash` directly. */
  static parse = (params: string, options?: StringifyOptions) =>
    parse(params, options);

  /**
   * @description Adds or updates a query inside a url
   *
   * @see {@link https://stackoverflow.com/a/6021027/12322965|stackoverflow}
   */
  static set = (uri: string, key: string, value: Primitive) => {
    const re = new RegExp(`([?&])${key}=.*?(&|$)`, "i");
    const separator = uri.includes("?") ? "&" : "?";
    if (uri.match(re)) return uri.replace(re, `$1${key}=${String(value)}$2`);
    return `${uri + separator + key}=${String(value)}`;
  };

  /** @description Exclude query parameters from a URL. */
  static exclude: typeof exclude = exclude;

  /** @description Replaces spaces with dashes in a string in order to be url friendly */
  static replaceSpaces = (str: Nullishable<string>): string => {
    if (!str || typeof str !== "string") return "";
    return str
      .trim()
      .replace(/\s+/g, "-")
      .replace(new RegExp(String.fromCharCode(8204), "g"), "-"); // Replace spaces with -
  };

  /** @description Replaces dashes with spaces in a string in order to be user readable */
  static replaceDashes = (str: Nullishable<string>): Nullishable<string> => {
    if (!str) return str;
    return str.toString().replace(/-/g, " ");
  };
}
export default QS;
