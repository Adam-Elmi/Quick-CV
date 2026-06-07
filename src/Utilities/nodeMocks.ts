export const promises = {
  readFile: async () => "",
  writeFile: async () => { },
  readdir: async () => [],
  stat: async () => ({ isDirectory: () => false }),
};
export const existsSync = () => false;
export const readFileSync = () => "";
export const readdirSync = () => [];
export const statSync = () => ({ isDirectory: () => false });
export const resolve = (...args: string[]) => args.join("/");
export const join = (...args: string[]) => args.join("/");
export const dirname = (p: string) => p.split("/").slice(0, -1).join("/") || ".";
export const basename = (p: string) => p.split("/").pop() || "";
export const extname = (p: string) => {
  const parts = p.split(".");
  return parts.length > 1 ? "." + parts.pop() : "";
};
export const fileURLToPath = (url: string) => url;
export const pathToFileURL = (p: string) => ({ href: p });
export const URL = window.URL;

export const relative = (from: string, to: string) => to;
export const normalize = (p: string) => p;
export const isAbsolute = (p: string) => p.startsWith("/");
export const parse = (p: string) => {
  const base = basename(p);
  const dir = dirname(p);
  const ext = extname(p);
  const name = base.slice(0, base.length - ext.length);
  return { root: p.startsWith("/") ? "/" : "", dir, base, ext, name };
};
export const format = (pObj: any) => {
  return join(pObj.dir || "", pObj.base || (pObj.name || "") + (pObj.ext || ""));
};
export const sep = "/";
export const delimiter = ":";

export const posix = {
  resolve,
  join,
  dirname,
  basename,
  extname,
  relative,
  normalize,
  isAbsolute,
  parse,
  format,
  sep,
  delimiter,
};

export const randomBytes = (size: number) => {
  const arr = new Uint8Array(size);
  window.crypto.getRandomValues(arr);
  return {
    toString: (format: string) => {
      if (format === "hex") {
        return Array.from(arr).map(b => b.toString(16).padStart(2, "0")).join("");
      }
      return "";
    }
  };
};

export default {
  promises,
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
  resolve,
  join,
  dirname,
  basename,
  extname,
  relative,
  normalize,
  isAbsolute,
  parse,
  format,
  sep,
  delimiter,
  fileURLToPath,
  pathToFileURL,
  URL,
  randomBytes,
  posix,
};
