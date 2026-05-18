
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "3.10.4";globalThis.nextVersion = "16.2.3";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// ../../node_modules/.pnpm/cookie@1.1.1/node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/.pnpm/cookie@1.1.1/node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCookie = parseCookie;
    exports.parse = parseCookie;
    exports.stringifyCookie = stringifyCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    exports.parseSetCookie = parseSetCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var maxAgeRegExp = /^-?\d+$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parseCookie(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1)
          break;
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const key = valueSlice(str, index, eqIdx);
        if (obj[key] === void 0) {
          obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function stringifyCookie(cookie, options) {
      const enc = options?.encode || encodeURIComponent;
      const cookieStrings = [];
      for (const name of Object.keys(cookie)) {
        const val = cookie[name];
        if (val === void 0)
          continue;
        if (!cookieNameRegExp.test(name)) {
          throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
          throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
      }
      return cookieStrings.join("; ");
    }
    function stringifySetCookie(_name, _val, _opts) {
      const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
      const options = typeof _val === "object" ? _val : _opts;
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
      }
      const value = cookie.value ? enc(cookie.value) : "";
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
      }
      let str = cookie.name + "=" + value;
      if (cookie.maxAge !== void 0) {
        if (!Number.isInteger(cookie.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
      }
      if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
          throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
      }
      if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
          throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
      }
      if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
      }
      if (cookie.httpOnly) {
        str += "; HttpOnly";
      }
      if (cookie.secure) {
        str += "; Secure";
      }
      if (cookie.partitioned) {
        str += "; Partitioned";
      }
      if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
      }
      if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
      }
      return str;
    }
    function parseSetCookie(str, options) {
      const dec = options?.decode || decode;
      const len = str.length;
      const endIdx = endIndex(str, 0, len);
      const eqIdx = eqIndex(str, 0, endIdx);
      const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
      };
      let index = endIdx + 1;
      while (index < len) {
        const endIdx2 = endIndex(str, index, len);
        const eqIdx2 = eqIndex(str, index, endIdx2);
        const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
        const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
        switch (attr.toLowerCase()) {
          case "httponly":
            setCookie.httpOnly = true;
            break;
          case "secure":
            setCookie.secure = true;
            break;
          case "partitioned":
            setCookie.partitioned = true;
            break;
          case "domain":
            setCookie.domain = val;
            break;
          case "path":
            setCookie.path = val;
            break;
          case "max-age":
            if (val && maxAgeRegExp.test(val))
              setCookie.maxAge = Number(val);
            break;
          case "expires":
            if (!val)
              break;
            const date = new Date(val);
            if (Number.isFinite(date.valueOf()))
              setCookie.expires = date;
            break;
          case "priority":
            if (!val)
              break;
            const priority = val.toLowerCase();
            if (priority === "low" || priority === "medium" || priority === "high") {
              setCookie.priority = priority;
            }
            break;
          case "samesite":
            if (!val)
              break;
            const sameSite = val.toLowerCase();
            if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
              setCookie.sameSite = sameSite;
            }
            break;
        }
        index = endIdx2 + 1;
      }
      return setCookie;
    }
    function endIndex(str, min, len) {
      const index = str.indexOf(";", min);
      return index === -1 ? len : index;
    }
    function eqIndex(str, min, max) {
      const index = str.indexOf("=", min);
      return index < max ? index : -1;
    }
    function valueSlice(str, min, max) {
      let start = min;
      let end = max;
      do {
        const code = str.charCodeAt(start);
        if (code !== 32 && code !== 9)
          break;
      } while (++start < end);
      while (end > start) {
        const code = str.charCodeAt(end - 1);
        if (code !== 32 && code !== 9)
          break;
        end--;
      }
      return str.slice(start, end);
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
  }
});

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream as ReadableStream2 } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream2({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream2({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream2({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          const cur = responseHeaders[key];
          if (cur === void 0) {
            responseHeaders[key] = value;
          } else if (Array.isArray(cur)) {
            cur.push(value);
          } else {
            responseHeaders[key] = [cur, value];
          }
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// .next/server/edge/chunks/[root-of-the-server]__0qs~70n._.js
var require_root_of_the_server_0qs_70n = __commonJS({
  ".next/server/edge/chunks/[root-of-the-server]__0qs~70n._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__0qs~70n._.js", 51615, (e, r, n) => {
      r.exports = e.x("node:buffer", () => (init_node_buffer(), __toCommonJS(node_buffer_exports)));
    }, 78500, (e, r, n) => {
      r.exports = e.x("node:async_hooks", () => (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports)));
    }, 84948, (e, r, n) => {
      self._ENTRIES ||= {};
      let o = Promise.resolve().then(() => e.i(77722));
      o.catch(() => {
      }), self._ENTRIES.middleware_middleware = new Proxy(o, { get(e2, r2) {
        if ("then" === r2) return (r3, n3) => e2.then(r3, n3);
        let n2 = (...n3) => e2.then((e3) => (0, e3[r2])(...n3));
        return n2.then = (n3, o2) => e2.then((e3) => e3[r2]).then(n3, o2), n2;
      } });
    }]);
  }
});

// .next/server/edge/chunks/0p5a_next_dist_esm_api_headers_02gono3.js
var require_p5a_next_dist_esm_api_headers_02gono3 = __commonJS({
  ".next/server/edge/chunks/0p5a_next_dist_esm_api_headers_02gono3.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/0p5a_next_dist_esm_api_headers_02gono3.js", 66816, (e) => {
      "use strict";
      var r = e.i(57432);
      e.i(94438);
      var t = e.i(67168);
      e.i(49202);
      var a = e.i(50484), n = e.i(12873), s = e.i(31497), i = e.i(78905);
      class o extends Error {
        constructor(...e2) {
          super(...e2), this.code = "NEXT_STATIC_GEN_BAILOUT";
        }
      }
      var c = e.i(1974), u = e.i(77496);
      let d = { current: null }, l = "function" == typeof u.cache ? u.cache : (e2) => e2, p = console.warn;
      function h(e2) {
        return function(...r2) {
          p(e2(...r2));
        };
      }
      l((e2) => {
        try {
          p(d.current);
        } finally {
          d.current = null;
        }
      });
      var f = e.i(76170), m = e.i(72471);
      e.i(51028);
      let b = /* @__PURE__ */ new WeakMap();
      function g(e2) {
        let r2 = b.get(e2);
        if (r2) return r2;
        let t2 = Promise.resolve(e2);
        return b.set(e2, t2), t2;
      }
      h(function(e2, r2) {
        let t2 = e2 ? `Route "${e2}" ` : "This route ";
        return Object.defineProperty(Error(`${t2}used ${r2}. \`cookies()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E830", enumerable: false, configurable: true });
      }), e.s(["cookies", 0, function e2() {
        let u2 = "cookies", d2 = a.workAsyncStorage.getStore(), l2 = s.workUnitAsyncStorage.getStore();
        if (d2) {
          if (l2 && "after" === l2.phase && !(0, f.isRequestAPICallableInsideAfter)()) throw Object.defineProperty(Error(`Route ${d2.route} used \`cookies()\` inside \`after()\`. This is not supported. If you need this data inside an \`after()\` callback, use \`cookies()\` outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E843", enumerable: false, configurable: true });
          if (d2.forceStatic) return g(r.RequestCookiesAdapter.seal(new t.RequestCookies(new Headers({}))));
          if (d2.dynamicShouldError) throw Object.defineProperty(new o(`Route ${d2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`cookies()\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E849", enumerable: false, configurable: true });
          if (l2) switch (l2.type) {
            case "cache":
              let a2 = Object.defineProperty(Error(`Route ${d2.route} used \`cookies()\` inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`cookies()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E831", enumerable: false, configurable: true });
              throw Error.captureStackTrace(a2, e2), d2.invalidDynamicUsageError ??= a2, a2;
            case "unstable-cache":
              throw Object.defineProperty(Error(`Route ${d2.route} used \`cookies()\` inside a function cached with \`unstable_cache()\`. Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`cookies()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E846", enumerable: false, configurable: true });
            case "generate-static-params":
              throw Object.defineProperty(Error(`Route ${d2.route} used \`cookies()\` inside \`generateStaticParams\`. This is not supported because \`generateStaticParams\` runs at build time without an HTTP request. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", { value: "E1123", enumerable: false, configurable: true });
            case "prerender":
              var p2 = d2, h2 = l2;
              let s2 = b.get(h2);
              if (s2) return s2;
              let E2 = (0, c.makeHangingPromise)(h2.renderSignal, p2.route, "`cookies()`");
              return b.set(h2, E2), E2;
            case "prerender-client":
            case "validation-client":
              let y2 = "`cookies`";
              throw Object.defineProperty(new m.InvariantError(`${y2} must not be used within a Client Component. Next.js should be preventing ${y2} from being included in Client Components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E1037", enumerable: false, configurable: true });
            case "prerender-ppr":
              return (0, i.postponeWithTracking)(d2.route, u2, l2.dynamicTracking);
            case "prerender-legacy":
              return (0, i.throwToInterruptStaticGeneration)(u2, d2, l2);
            case "prerender-runtime":
              return (0, c.delayUntilRuntimeStage)(l2, g(l2.cookies));
            case "private-cache":
              return g(l2.cookies);
            case "request":
              let _2;
              if ((0, i.trackDynamicDataInDynamicRender)(l2), _2 = (0, r.areCookiesMutableInCurrentPhase)(l2) ? l2.userspaceMutableCookies : l2.cookies, !l2.asyncApiPromises) return g(_2);
              {
                let e3 = (0, n.isInEarlyRenderStage)(l2);
                if (_2 === l2.mutableCookies) return e3 ? l2.asyncApiPromises.earlyMutableCookies : l2.asyncApiPromises.mutableCookies;
                return e3 ? l2.asyncApiPromises.earlyCookies : l2.asyncApiPromises.cookies;
              }
          }
        }
        (0, n.throwForMissingRequestStore)(u2);
      }], 68828);
      var E = e.i(42011);
      function y() {
        let e2 = "headers", r2 = a.workAsyncStorage.getStore(), t2 = s.workUnitAsyncStorage.getStore();
        if (r2) {
          if (t2 && "after" === t2.phase && !(0, f.isRequestAPICallableInsideAfter)()) throw Object.defineProperty(Error(`Route ${r2.route} used \`headers()\` inside \`after()\`. This is not supported. If you need this data inside an \`after()\` callback, use \`headers()\` outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E839", enumerable: false, configurable: true });
          if (r2.forceStatic) return R(E.HeadersAdapter.seal(new Headers({})));
          if (t2) switch (t2.type) {
            case "cache": {
              let e3 = Object.defineProperty(Error(`Route ${r2.route} used \`headers()\` inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`headers()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E833", enumerable: false, configurable: true });
              throw Error.captureStackTrace(e3, y), r2.invalidDynamicUsageError ??= e3, e3;
            }
            case "unstable-cache":
              throw Object.defineProperty(Error(`Route ${r2.route} used \`headers()\` inside a function cached with \`unstable_cache()\`. Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`headers()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E838", enumerable: false, configurable: true });
            case "generate-static-params":
              throw Object.defineProperty(Error(`Route ${r2.route} used \`headers()\` inside \`generateStaticParams\`. This is not supported because \`generateStaticParams\` runs at build time without an HTTP request. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", { value: "E1134", enumerable: false, configurable: true });
          }
          if (r2.dynamicShouldError) throw Object.defineProperty(new o(`Route ${r2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`headers()\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E828", enumerable: false, configurable: true });
          if (t2) switch (t2.type) {
            case "prerender":
              var u2 = r2, d2 = t2;
              let a2 = _.get(d2);
              if (a2) return a2;
              let s2 = (0, c.makeHangingPromise)(d2.renderSignal, u2.route, "`headers()`");
              return _.set(d2, s2), s2;
            case "prerender-client":
            case "validation-client":
              let l2 = "`headers`";
              throw Object.defineProperty(new m.InvariantError(`${l2} must not be used within a client component. Next.js should be preventing ${l2} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E1017", enumerable: false, configurable: true });
            case "prerender-ppr":
              return (0, i.postponeWithTracking)(r2.route, e2, t2.dynamicTracking);
            case "prerender-legacy":
              return (0, i.throwToInterruptStaticGeneration)(e2, r2, t2);
            case "prerender-runtime":
              return (0, c.delayUntilRuntimeStage)(t2, R(t2.headers));
            case "private-cache":
              return R(t2.headers);
            case "request":
              if ((0, i.trackDynamicDataInDynamicRender)(t2), t2.asyncApiPromises) return (0, n.isInEarlyRenderStage)(t2) ? t2.asyncApiPromises.earlyHeaders : t2.asyncApiPromises.headers;
              return R(t2.headers);
          }
        }
        (0, n.throwForMissingRequestStore)(e2);
      }
      let _ = /* @__PURE__ */ new WeakMap();
      function R(e2) {
        let r2 = _.get(e2);
        if (r2) return r2;
        let t2 = Promise.resolve(e2);
        return _.set(e2, t2), t2;
      }
      h(function(e2, r2) {
        let t2 = e2 ? `Route "${e2}" ` : "This route ";
        return Object.defineProperty(Error(`${t2}used ${r2}. \`headers()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E836", enumerable: false, configurable: true });
      }), e.s(["headers", 0, y], 63852);
      var w = e.i(94414);
      function O(e2, r2) {
        let t2 = T.get(e2 ?? v);
        return t2 || Promise.resolve(new S(e2));
      }
      e.i(12914);
      let v = {}, T = /* @__PURE__ */ new WeakMap();
      class S {
        constructor(e2) {
          this._provider = e2;
        }
        get isEnabled() {
          return null !== this._provider && this._provider.isEnabled;
        }
        enable() {
          P("draftMode().enable()", this.enable), null !== this._provider && this._provider.enable();
        }
        disable() {
          P("draftMode().disable()", this.disable), null !== this._provider && this._provider.disable();
        }
      }
      function P(e2, r2) {
        let t2 = a.workAsyncStorage.getStore(), n2 = s.workUnitAsyncStorage.getStore();
        if (t2) {
          if ((null == n2 ? void 0 : n2.phase) === "after") throw Object.defineProperty(Error(`Route ${t2.route} used "${e2}" inside \`after()\`. The enabled status of \`draftMode()\` can be read inside \`after()\` but you cannot enable or disable \`draftMode()\`. See more info here: https://nextjs.org/docs/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E845", enumerable: false, configurable: true });
          if (t2.dynamicShouldError) throw Object.defineProperty(new o(`Route ${t2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E553", enumerable: false, configurable: true });
          if (n2) switch (n2.type) {
            case "cache":
            case "private-cache": {
              let a3 = Object.defineProperty(Error(`Route ${t2.route} used "${e2}" inside "use cache". The enabled status of \`draftMode()\` can be read in caches but you must not enable or disable \`draftMode()\` inside a cache. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E829", enumerable: false, configurable: true });
              throw Error.captureStackTrace(a3, r2), t2.invalidDynamicUsageError ??= a3, a3;
            }
            case "unstable-cache":
              throw Object.defineProperty(Error(`Route ${t2.route} used "${e2}" inside a function cached with \`unstable_cache()\`. The enabled status of \`draftMode()\` can be read in caches but you must not enable or disable \`draftMode()\` inside a cache. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E844", enumerable: false, configurable: true });
            case "prerender":
            case "prerender-runtime": {
              let r3 = Object.defineProperty(Error(`Route ${t2.route} used ${e2} without first calling \`await connection()\`. See more info here: https://nextjs.org/docs/messages/next-prerender-sync-headers`), "__NEXT_ERROR_CODE", { value: "E126", enumerable: false, configurable: true });
              return (0, i.abortAndThrowOnSynchronousRequestDataAccess)(t2.route, e2, r3, n2);
            }
            case "prerender-client":
            case "validation-client":
              let a2 = "`draftMode`";
              throw Object.defineProperty(new m.InvariantError(`${a2} must not be used within a Client Component. Next.js should be preventing ${a2} from being included in Client Components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E1046", enumerable: false, configurable: true });
            case "prerender-ppr":
              return (0, i.postponeWithTracking)(t2.route, e2, n2.dynamicTracking);
            case "prerender-legacy":
              n2.revalidate = 0;
              let s2 = Object.defineProperty(new w.DynamicServerError(`Route ${t2.route} couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", { value: "E558", enumerable: false, configurable: true });
              throw t2.dynamicUsageDescription = e2, t2.dynamicUsageStack = s2.stack, s2;
            case "request":
              (0, i.trackDynamicDataInDynamicRender)(n2);
              break;
            case "generate-static-params":
              throw Object.defineProperty(Error(`Route ${t2.route} used \`${e2}\` inside \`generateStaticParams\`. This is not supported because \`generateStaticParams\` runs at build time without an HTTP request. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", { value: "E1121", enumerable: false, configurable: true });
          }
        }
      }
      h(function(e2, r2) {
        let t2 = e2 ? `Route "${e2}" ` : "This route ";
        return Object.defineProperty(Error(`${t2}used ${r2}. \`draftMode()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E835", enumerable: false, configurable: true });
      }), e.s(["draftMode", 0, function() {
        let e2 = "draftMode", r2 = a.workAsyncStorage.getStore(), t2 = s.workUnitAsyncStorage.getStore();
        switch ((!r2 || !t2) && (0, n.throwForMissingRequestStore)(e2), t2.type) {
          case "prerender-runtime":
            return (0, c.delayUntilRuntimeStage)(t2, O(t2.draftMode, r2));
          case "request":
            return O(t2.draftMode, r2);
          case "cache":
          case "private-cache":
          case "unstable-cache":
            let i2 = (0, n.getDraftModeProviderForCacheScope)(r2, t2);
            if (i2) return O(i2, r2);
          case "prerender":
          case "prerender-ppr":
          case "prerender-legacy":
            return O(null, r2);
          case "prerender-client":
          case "validation-client": {
            let e3 = "`draftMode`";
            throw Object.defineProperty(new m.InvariantError(`${e3} must not be used within a Client Component. Next.js should be preventing ${e3} from being included in Client Components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E1046", enumerable: false, configurable: true });
          }
          case "generate-static-params":
            throw Object.defineProperty(Error(`Route ${r2.route} used \`${e2}()\` inside \`generateStaticParams\`. This is not supported because \`generateStaticParams\` runs at build time without an HTTP request. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", { value: "E1132", enumerable: false, configurable: true });
          default:
            return t2;
        }
      }], 25586), e.s([], 62688), e.i(62688), e.i(68828), e.i(63852), e.i(25586), e.s(["headers", 0, y], 66816);
    }]);
  }
});

// .next/server/edge/chunks/node_modules__pnpm_0knvyhq._.js
var require_node_modules_pnpm_0knvyhq = __commonJS({
  ".next/server/edge/chunks/node_modules__pnpm_0knvyhq._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/node_modules__pnpm_0knvyhq._.js", 41379, (e, t, r) => {
    }, 95179, (e, t, r) => {
      (() => {
        "use strict";
        let r2, s, i, n, a;
        var o, c, l, u, h, d, p, m, f, g, y, b, w, v, x, _, k = { 491: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ContextAPI = void 0;
          let s2 = r3(223), i2 = r3(172), n2 = r3(930), a2 = "context", o2 = new s2.NoopContextManager();
          class c2 {
            static getInstance() {
              return this._instance || (this._instance = new c2()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, i2.registerGlobal)(a2, e3, n2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t3, r4, ...s3) {
              return this._getContextManager().with(e3, t3, r4, ...s3);
            }
            bind(e3, t3) {
              return this._getContextManager().bind(e3, t3);
            }
            _getContextManager() {
              return (0, i2.getGlobal)(a2) || o2;
            }
            disable() {
              this._getContextManager().disable(), (0, i2.unregisterGlobal)(a2, n2.DiagAPI.instance());
            }
          }
          t2.ContextAPI = c2;
        }, 930: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagAPI = void 0;
          let s2 = r3(56), i2 = r3(912), n2 = r3(957), a2 = r3(172);
          class o2 {
            constructor() {
              function e3(e4) {
                return function(...t4) {
                  let r4 = (0, a2.getGlobal)("diag");
                  if (r4) return r4[e4](...t4);
                };
              }
              const t3 = this;
              t3.setLogger = (e4, r4 = { logLevel: n2.DiagLogLevel.INFO }) => {
                var s3, o3, c2;
                if (e4 === t3) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t3.error(null != (s3 = e5.stack) ? s3 : e5.message), false;
                }
                "number" == typeof r4 && (r4 = { logLevel: r4 });
                let l2 = (0, a2.getGlobal)("diag"), u2 = (0, i2.createLogLevelDiagLogger)(null != (o3 = r4.logLevel) ? o3 : n2.DiagLogLevel.INFO, e4);
                if (l2 && !r4.suppressOverrideMessage) {
                  let e5 = null != (c2 = Error().stack) ? c2 : "<failed to generate stacktrace>";
                  l2.warn(`Current logger will be overwritten from ${e5}`), u2.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, a2.registerGlobal)("diag", u2, t3, true);
              }, t3.disable = () => {
                (0, a2.unregisterGlobal)("diag", t3);
              }, t3.createComponentLogger = (e4) => new s2.DiagComponentLogger(e4), t3.verbose = e3("verbose"), t3.debug = e3("debug"), t3.info = e3("info"), t3.warn = e3("warn"), t3.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new o2()), this._instance;
            }
          }
          t2.DiagAPI = o2;
        }, 653: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.MetricsAPI = void 0;
          let s2 = r3(660), i2 = r3(172), n2 = r3(930), a2 = "metrics";
          class o2 {
            static getInstance() {
              return this._instance || (this._instance = new o2()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, i2.registerGlobal)(a2, e3, n2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, i2.getGlobal)(a2) || s2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t3, r4) {
              return this.getMeterProvider().getMeter(e3, t3, r4);
            }
            disable() {
              (0, i2.unregisterGlobal)(a2, n2.DiagAPI.instance());
            }
          }
          t2.MetricsAPI = o2;
        }, 181: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.PropagationAPI = void 0;
          let s2 = r3(172), i2 = r3(874), n2 = r3(194), a2 = r3(277), o2 = r3(369), c2 = r3(930), l2 = "propagation", u2 = new i2.NoopTextMapPropagator();
          class h2 {
            constructor() {
              this.createBaggage = o2.createBaggage, this.getBaggage = a2.getBaggage, this.getActiveBaggage = a2.getActiveBaggage, this.setBaggage = a2.setBaggage, this.deleteBaggage = a2.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new h2()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, s2.registerGlobal)(l2, e3, c2.DiagAPI.instance());
            }
            inject(e3, t3, r4 = n2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t3, r4);
            }
            extract(e3, t3, r4 = n2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t3, r4);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, s2.unregisterGlobal)(l2, c2.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, s2.getGlobal)(l2) || u2;
            }
          }
          t2.PropagationAPI = h2;
        }, 997: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceAPI = void 0;
          let s2 = r3(172), i2 = r3(846), n2 = r3(139), a2 = r3(607), o2 = r3(930), c2 = "trace";
          class l2 {
            constructor() {
              this._proxyTracerProvider = new i2.ProxyTracerProvider(), this.wrapSpanContext = n2.wrapSpanContext, this.isSpanContextValid = n2.isSpanContextValid, this.deleteSpan = a2.deleteSpan, this.getSpan = a2.getSpan, this.getActiveSpan = a2.getActiveSpan, this.getSpanContext = a2.getSpanContext, this.setSpan = a2.setSpan, this.setSpanContext = a2.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new l2()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t3 = (0, s2.registerGlobal)(c2, this._proxyTracerProvider, o2.DiagAPI.instance());
              return t3 && this._proxyTracerProvider.setDelegate(e3), t3;
            }
            getTracerProvider() {
              return (0, s2.getGlobal)(c2) || this._proxyTracerProvider;
            }
            getTracer(e3, t3) {
              return this.getTracerProvider().getTracer(e3, t3);
            }
            disable() {
              (0, s2.unregisterGlobal)(c2, o2.DiagAPI.instance()), this._proxyTracerProvider = new i2.ProxyTracerProvider();
            }
          }
          t2.TraceAPI = l2;
        }, 277: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.deleteBaggage = t2.setBaggage = t2.getActiveBaggage = t2.getBaggage = void 0;
          let s2 = r3(491), i2 = (0, r3(780).createContextKey)("OpenTelemetry Baggage Key");
          function n2(e3) {
            return e3.getValue(i2) || void 0;
          }
          t2.getBaggage = n2, t2.getActiveBaggage = function() {
            return n2(s2.ContextAPI.getInstance().active());
          }, t2.setBaggage = function(e3, t3) {
            return e3.setValue(i2, t3);
          }, t2.deleteBaggage = function(e3) {
            return e3.deleteValue(i2);
          };
        }, 993: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BaggageImpl = void 0;
          class r3 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t3 = this._entries.get(e3);
              if (t3) return Object.assign({}, t3);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t3]) => [e3, t3]);
            }
            setEntry(e3, t3) {
              let s2 = new r3(this._entries);
              return s2._entries.set(e3, t3), s2;
            }
            removeEntry(e3) {
              let t3 = new r3(this._entries);
              return t3._entries.delete(e3), t3;
            }
            removeEntries(...e3) {
              let t3 = new r3(this._entries);
              for (let r4 of e3) t3._entries.delete(r4);
              return t3;
            }
            clear() {
              return new r3();
            }
          }
          t2.BaggageImpl = r3;
        }, 830: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataSymbol = void 0, t2.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataFromString = t2.createBaggage = void 0;
          let s2 = r3(930), i2 = r3(993), n2 = r3(830), a2 = s2.DiagAPI.instance();
          t2.createBaggage = function(e3 = {}) {
            return new i2.BaggageImpl(new Map(Object.entries(e3)));
          }, t2.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (a2.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: n2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.context = void 0, t2.context = r3(491).ContextAPI.getInstance();
        }, 223: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopContextManager = void 0;
          let s2 = r3(780);
          t2.NoopContextManager = class {
            active() {
              return s2.ROOT_CONTEXT;
            }
            with(e3, t3, r4, ...s3) {
              return t3.call(r4, ...s3);
            }
            bind(e3, t3) {
              return t3;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          };
        }, 780: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ROOT_CONTEXT = t2.createContextKey = void 0, t2.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r3 {
            constructor(e3) {
              const t3 = this;
              t3._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t3.getValue = (e4) => t3._currentContext.get(e4), t3.setValue = (e4, s2) => {
                let i2 = new r3(t3._currentContext);
                return i2._currentContext.set(e4, s2), i2;
              }, t3.deleteValue = (e4) => {
                let s2 = new r3(t3._currentContext);
                return s2._currentContext.delete(e4), s2;
              };
            }
          }
          t2.ROOT_CONTEXT = new r3();
        }, 506: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.diag = void 0, t2.diag = r3(930).DiagAPI.instance();
        }, 56: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagComponentLogger = void 0;
          let s2 = r3(172);
          function i2(e3, t3, r4) {
            let i3 = (0, s2.getGlobal)("diag");
            if (i3) return r4.unshift(t3), i3[e3](...r4);
          }
          t2.DiagComponentLogger = class {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return i2("debug", this._namespace, e3);
            }
            error(...e3) {
              return i2("error", this._namespace, e3);
            }
            info(...e3) {
              return i2("info", this._namespace, e3);
            }
            warn(...e3) {
              return i2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return i2("verbose", this._namespace, e3);
            }
          };
        }, 972: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagConsoleLogger = void 0;
          let r3 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          t2.DiagConsoleLogger = class {
            constructor() {
              for (let e3 = 0; e3 < r3.length; e3++) this[r3[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t3) {
                  if (console) {
                    let r4 = console[e4];
                    if ("function" != typeof r4 && (r4 = console.log), "function" == typeof r4) return r4.apply(console, t3);
                  }
                };
              }(r3[e3].c);
            }
          };
        }, 912: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createLogLevelDiagLogger = void 0;
          let s2 = r3(957);
          t2.createLogLevelDiagLogger = function(e3, t3) {
            function r4(r5, s3) {
              let i2 = t3[r5];
              return "function" == typeof i2 && e3 >= s3 ? i2.bind(t3) : function() {
              };
            }
            return e3 < s2.DiagLogLevel.NONE ? e3 = s2.DiagLogLevel.NONE : e3 > s2.DiagLogLevel.ALL && (e3 = s2.DiagLogLevel.ALL), t3 = t3 || {}, { error: r4("error", s2.DiagLogLevel.ERROR), warn: r4("warn", s2.DiagLogLevel.WARN), info: r4("info", s2.DiagLogLevel.INFO), debug: r4("debug", s2.DiagLogLevel.DEBUG), verbose: r4("verbose", s2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagLogLevel = void 0, (r3 = t2.DiagLogLevel || (t2.DiagLogLevel = {}))[r3.NONE = 0] = "NONE", r3[r3.ERROR = 30] = "ERROR", r3[r3.WARN = 50] = "WARN", r3[r3.INFO = 60] = "INFO", r3[r3.DEBUG = 70] = "DEBUG", r3[r3.VERBOSE = 80] = "VERBOSE", r3[r3.ALL = 9999] = "ALL";
        }, 172: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.unregisterGlobal = t2.getGlobal = t2.registerGlobal = void 0;
          let s2 = r3(200), i2 = r3(521), n2 = r3(130), a2 = i2.VERSION.split(".")[0], o2 = Symbol.for(`opentelemetry.js.api.${a2}`), c2 = s2._globalThis;
          t2.registerGlobal = function(e3, t3, r4, s3 = false) {
            var n3;
            let a3 = c2[o2] = null != (n3 = c2[o2]) ? n3 : { version: i2.VERSION };
            if (!s3 && a3[e3]) {
              let t4 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r4.error(t4.stack || t4.message), false;
            }
            if (a3.version !== i2.VERSION) {
              let t4 = Error(`@opentelemetry/api: Registration of version v${a3.version} for ${e3} does not match previously registered API v${i2.VERSION}`);
              return r4.error(t4.stack || t4.message), false;
            }
            return a3[e3] = t3, r4.debug(`@opentelemetry/api: Registered a global for ${e3} v${i2.VERSION}.`), true;
          }, t2.getGlobal = function(e3) {
            var t3, r4;
            let s3 = null == (t3 = c2[o2]) ? void 0 : t3.version;
            if (s3 && (0, n2.isCompatible)(s3)) return null == (r4 = c2[o2]) ? void 0 : r4[e3];
          }, t2.unregisterGlobal = function(e3, t3) {
            t3.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${i2.VERSION}.`);
            let r4 = c2[o2];
            r4 && delete r4[e3];
          };
        }, 130: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.isCompatible = t2._makeCompatibilityCheck = void 0;
          let s2 = r3(521), i2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function n2(e3) {
            let t3 = /* @__PURE__ */ new Set([e3]), r4 = /* @__PURE__ */ new Set(), s3 = e3.match(i2);
            if (!s3) return () => false;
            let n3 = { major: +s3[1], minor: +s3[2], patch: +s3[3], prerelease: s3[4] };
            if (null != n3.prerelease) return function(t4) {
              return t4 === e3;
            };
            function a2(e4) {
              return r4.add(e4), false;
            }
            return function(e4) {
              if (t3.has(e4)) return true;
              if (r4.has(e4)) return false;
              let s4 = e4.match(i2);
              if (!s4) return a2(e4);
              let o2 = { major: +s4[1], minor: +s4[2], patch: +s4[3], prerelease: s4[4] };
              if (null != o2.prerelease || n3.major !== o2.major) return a2(e4);
              if (0 === n3.major) return n3.minor === o2.minor && n3.patch <= o2.patch ? (t3.add(e4), true) : a2(e4);
              return n3.minor <= o2.minor ? (t3.add(e4), true) : a2(e4);
            };
          }
          t2._makeCompatibilityCheck = n2, t2.isCompatible = n2(s2.VERSION);
        }, 886: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.metrics = void 0, t2.metrics = r3(653).MetricsAPI.getInstance();
        }, 901: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ValueType = void 0, (r3 = t2.ValueType || (t2.ValueType = {}))[r3.INT = 0] = "INT", r3[r3.DOUBLE = 1] = "DOUBLE";
        }, 102: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createNoopMeter = t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t2.NOOP_OBSERVABLE_GAUGE_METRIC = t2.NOOP_OBSERVABLE_COUNTER_METRIC = t2.NOOP_UP_DOWN_COUNTER_METRIC = t2.NOOP_HISTOGRAM_METRIC = t2.NOOP_COUNTER_METRIC = t2.NOOP_METER = t2.NoopObservableUpDownCounterMetric = t2.NoopObservableGaugeMetric = t2.NoopObservableCounterMetric = t2.NoopObservableMetric = t2.NoopHistogramMetric = t2.NoopUpDownCounterMetric = t2.NoopCounterMetric = t2.NoopMetric = t2.NoopMeter = void 0;
          class r3 {
            createHistogram(e3, r4) {
              return t2.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r4) {
              return t2.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r4) {
              return t2.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r4) {
              return t2.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t3) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t2.NoopMeter = r3;
          class s2 {
          }
          t2.NoopMetric = s2;
          class i2 extends s2 {
            add(e3, t3) {
            }
          }
          t2.NoopCounterMetric = i2;
          class n2 extends s2 {
            add(e3, t3) {
            }
          }
          t2.NoopUpDownCounterMetric = n2;
          class a2 extends s2 {
            record(e3, t3) {
            }
          }
          t2.NoopHistogramMetric = a2;
          class o2 {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t2.NoopObservableMetric = o2;
          class c2 extends o2 {
          }
          t2.NoopObservableCounterMetric = c2;
          class l2 extends o2 {
          }
          t2.NoopObservableGaugeMetric = l2;
          class u2 extends o2 {
          }
          t2.NoopObservableUpDownCounterMetric = u2, t2.NOOP_METER = new r3(), t2.NOOP_COUNTER_METRIC = new i2(), t2.NOOP_HISTOGRAM_METRIC = new a2(), t2.NOOP_UP_DOWN_COUNTER_METRIC = new n2(), t2.NOOP_OBSERVABLE_COUNTER_METRIC = new c2(), t2.NOOP_OBSERVABLE_GAUGE_METRIC = new l2(), t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new u2(), t2.createNoopMeter = function() {
            return t2.NOOP_METER;
          };
        }, 660: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NOOP_METER_PROVIDER = t2.NoopMeterProvider = void 0;
          let s2 = r3(102);
          class i2 {
            getMeter(e3, t3, r4) {
              return s2.NOOP_METER;
            }
          }
          t2.NoopMeterProvider = i2, t2.NOOP_METER_PROVIDER = new i2();
        }, 200: function(e2, t2, r3) {
          var s2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, s3) {
            void 0 === s3 && (s3 = r4), Object.defineProperty(e3, s3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, s3) {
            void 0 === s3 && (s3 = r4), e3[s3] = t3[r4];
          }), i2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || s2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), i2(r3(46), t2);
        }, 651: (t2, r3) => {
          Object.defineProperty(r3, "__esModule", { value: true }), r3._globalThis = void 0, r3._globalThis = "object" == typeof globalThis ? globalThis : e.g;
        }, 46: function(e2, t2, r3) {
          var s2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, s3) {
            void 0 === s3 && (s3 = r4), Object.defineProperty(e3, s3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, s3) {
            void 0 === s3 && (s3 = r4), e3[s3] = t3[r4];
          }), i2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || s2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), i2(r3(651), t2);
        }, 939: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.propagation = void 0, t2.propagation = r3(181).PropagationAPI.getInstance();
        }, 874: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTextMapPropagator = void 0, t2.NoopTextMapPropagator = class {
            inject(e3, t3) {
            }
            extract(e3, t3) {
              return e3;
            }
            fields() {
              return [];
            }
          };
        }, 194: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.defaultTextMapSetter = t2.defaultTextMapGetter = void 0, t2.defaultTextMapGetter = { get(e3, t3) {
            if (null != e3) return e3[t3];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t2.defaultTextMapSetter = { set(e3, t3, r3) {
            null != e3 && (e3[t3] = r3);
          } };
        }, 845: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.trace = void 0, t2.trace = r3(997).TraceAPI.getInstance();
        }, 403: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NonRecordingSpan = void 0;
          let s2 = r3(476);
          t2.NonRecordingSpan = class {
            constructor(e3 = s2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t3) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t3) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t3) {
            }
          };
        }, 614: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracer = void 0;
          let s2 = r3(491), i2 = r3(607), n2 = r3(403), a2 = r3(139), o2 = s2.ContextAPI.getInstance();
          t2.NoopTracer = class {
            startSpan(e3, t3, r4 = o2.active()) {
              var s3;
              if (null == t3 ? void 0 : t3.root) return new n2.NonRecordingSpan();
              let c2 = r4 && (0, i2.getSpanContext)(r4);
              return "object" == typeof (s3 = c2) && "string" == typeof s3.spanId && "string" == typeof s3.traceId && "number" == typeof s3.traceFlags && (0, a2.isSpanContextValid)(c2) ? new n2.NonRecordingSpan(c2) : new n2.NonRecordingSpan();
            }
            startActiveSpan(e3, t3, r4, s3) {
              let n3, a3, c2;
              if (arguments.length < 2) return;
              2 == arguments.length ? c2 = t3 : 3 == arguments.length ? (n3 = t3, c2 = r4) : (n3 = t3, a3 = r4, c2 = s3);
              let l2 = null != a3 ? a3 : o2.active(), u2 = this.startSpan(e3, n3, l2), h2 = (0, i2.setSpan)(l2, u2);
              return o2.with(h2, c2, void 0, u2);
            }
          };
        }, 124: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracerProvider = void 0;
          let s2 = r3(614);
          t2.NoopTracerProvider = class {
            getTracer(e3, t3, r4) {
              return new s2.NoopTracer();
            }
          };
        }, 125: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracer = void 0;
          let s2 = new (r3(614)).NoopTracer();
          t2.ProxyTracer = class {
            constructor(e3, t3, r4, s3) {
              this._provider = e3, this.name = t3, this.version = r4, this.options = s3;
            }
            startSpan(e3, t3, r4) {
              return this._getTracer().startSpan(e3, t3, r4);
            }
            startActiveSpan(e3, t3, r4, s3) {
              let i2 = this._getTracer();
              return Reflect.apply(i2.startActiveSpan, i2, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : s2;
            }
          };
        }, 846: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracerProvider = void 0;
          let s2 = r3(125), i2 = new (r3(124)).NoopTracerProvider();
          t2.ProxyTracerProvider = class {
            getTracer(e3, t3, r4) {
              var i3;
              return null != (i3 = this.getDelegateTracer(e3, t3, r4)) ? i3 : new s2.ProxyTracer(this, e3, t3, r4);
            }
            getDelegate() {
              var e3;
              return null != (e3 = this._delegate) ? e3 : i2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t3, r4) {
              var s3;
              return null == (s3 = this._delegate) ? void 0 : s3.getTracer(e3, t3, r4);
            }
          };
        }, 996: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SamplingDecision = void 0, (r3 = t2.SamplingDecision || (t2.SamplingDecision = {}))[r3.NOT_RECORD = 0] = "NOT_RECORD", r3[r3.RECORD = 1] = "RECORD", r3[r3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
        }, 607: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.getSpanContext = t2.setSpanContext = t2.deleteSpan = t2.setSpan = t2.getActiveSpan = t2.getSpan = void 0;
          let s2 = r3(780), i2 = r3(403), n2 = r3(491), a2 = (0, s2.createContextKey)("OpenTelemetry Context Key SPAN");
          function o2(e3) {
            return e3.getValue(a2) || void 0;
          }
          function c2(e3, t3) {
            return e3.setValue(a2, t3);
          }
          t2.getSpan = o2, t2.getActiveSpan = function() {
            return o2(n2.ContextAPI.getInstance().active());
          }, t2.setSpan = c2, t2.deleteSpan = function(e3) {
            return e3.deleteValue(a2);
          }, t2.setSpanContext = function(e3, t3) {
            return c2(e3, new i2.NonRecordingSpan(t3));
          }, t2.getSpanContext = function(e3) {
            var t3;
            return null == (t3 = o2(e3)) ? void 0 : t3.spanContext();
          };
        }, 325: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceStateImpl = void 0;
          let s2 = r3(564);
          class i2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t3) {
              let r4 = this._clone();
              return r4._internalState.has(e3) && r4._internalState.delete(e3), r4._internalState.set(e3, t3), r4;
            }
            unset(e3) {
              let t3 = this._clone();
              return t3._internalState.delete(e3), t3;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t3) => (e3.push(t3 + "=" + this.get(t3)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t3) => {
                let r4 = t3.trim(), i3 = r4.indexOf("=");
                if (-1 !== i3) {
                  let n2 = r4.slice(0, i3), a2 = r4.slice(i3 + 1, t3.length);
                  (0, s2.validateKey)(n2) && (0, s2.validateValue)(a2) && e4.set(n2, a2);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new i2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t2.TraceStateImpl = i2;
        }, 564: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.validateValue = t2.validateKey = void 0;
          let r3 = "[_0-9a-z-*/]", s2 = `[a-z]${r3}{0,255}`, i2 = `[a-z0-9]${r3}{0,240}@[a-z]${r3}{0,13}`, n2 = RegExp(`^(?:${s2}|${i2})$`), a2 = /^[ -~]{0,255}[!-~]$/, o2 = /,|=/;
          t2.validateKey = function(e3) {
            return n2.test(e3);
          }, t2.validateValue = function(e3) {
            return a2.test(e3) && !o2.test(e3);
          };
        }, 98: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createTraceState = void 0;
          let s2 = r3(325);
          t2.createTraceState = function(e3) {
            return new s2.TraceStateImpl(e3);
          };
        }, 476: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.INVALID_SPAN_CONTEXT = t2.INVALID_TRACEID = t2.INVALID_SPANID = void 0;
          let s2 = r3(475);
          t2.INVALID_SPANID = "0000000000000000", t2.INVALID_TRACEID = "00000000000000000000000000000000", t2.INVALID_SPAN_CONTEXT = { traceId: t2.INVALID_TRACEID, spanId: t2.INVALID_SPANID, traceFlags: s2.TraceFlags.NONE };
        }, 357: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanKind = void 0, (r3 = t2.SpanKind || (t2.SpanKind = {}))[r3.INTERNAL = 0] = "INTERNAL", r3[r3.SERVER = 1] = "SERVER", r3[r3.CLIENT = 2] = "CLIENT", r3[r3.PRODUCER = 3] = "PRODUCER", r3[r3.CONSUMER = 4] = "CONSUMER";
        }, 139: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.wrapSpanContext = t2.isSpanContextValid = t2.isValidSpanId = t2.isValidTraceId = void 0;
          let s2 = r3(476), i2 = r3(403), n2 = /^([0-9a-f]{32})$/i, a2 = /^[0-9a-f]{16}$/i;
          function o2(e3) {
            return n2.test(e3) && e3 !== s2.INVALID_TRACEID;
          }
          function c2(e3) {
            return a2.test(e3) && e3 !== s2.INVALID_SPANID;
          }
          t2.isValidTraceId = o2, t2.isValidSpanId = c2, t2.isSpanContextValid = function(e3) {
            return o2(e3.traceId) && c2(e3.spanId);
          }, t2.wrapSpanContext = function(e3) {
            return new i2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanStatusCode = void 0, (r3 = t2.SpanStatusCode || (t2.SpanStatusCode = {}))[r3.UNSET = 0] = "UNSET", r3[r3.OK = 1] = "OK", r3[r3.ERROR = 2] = "ERROR";
        }, 475: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceFlags = void 0, (r3 = t2.TraceFlags || (t2.TraceFlags = {}))[r3.NONE = 0] = "NONE", r3[r3.SAMPLED = 1] = "SAMPLED";
        }, 521: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.VERSION = void 0, t2.VERSION = "1.6.0";
        } }, E = {};
        function S(e2) {
          var t2 = E[e2];
          if (void 0 !== t2) return t2.exports;
          var r3 = E[e2] = { exports: {} }, s2 = true;
          try {
            k[e2].call(r3.exports, r3, r3.exports, S), s2 = false;
          } finally {
            s2 && delete E[e2];
          }
          return r3.exports;
        }
        S.ab = "/ROOT/node_modules/.pnpm/next@16.2.3_@babel+core@7.2_7615a97fca7fd705b5e52339c323f144/node_modules/next/dist/compiled/@opentelemetry/api/";
        var O = {};
        Object.defineProperty(O, "__esModule", { value: true }), O.trace = O.propagation = O.metrics = O.diag = O.context = O.INVALID_SPAN_CONTEXT = O.INVALID_TRACEID = O.INVALID_SPANID = O.isValidSpanId = O.isValidTraceId = O.isSpanContextValid = O.createTraceState = O.TraceFlags = O.SpanStatusCode = O.SpanKind = O.SamplingDecision = O.ProxyTracerProvider = O.ProxyTracer = O.defaultTextMapSetter = O.defaultTextMapGetter = O.ValueType = O.createNoopMeter = O.DiagLogLevel = O.DiagConsoleLogger = O.ROOT_CONTEXT = O.createContextKey = O.baggageEntryMetadataFromString = void 0, o = S(369), Object.defineProperty(O, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
          return o.baggageEntryMetadataFromString;
        } }), c = S(780), Object.defineProperty(O, "createContextKey", { enumerable: true, get: function() {
          return c.createContextKey;
        } }), Object.defineProperty(O, "ROOT_CONTEXT", { enumerable: true, get: function() {
          return c.ROOT_CONTEXT;
        } }), l = S(972), Object.defineProperty(O, "DiagConsoleLogger", { enumerable: true, get: function() {
          return l.DiagConsoleLogger;
        } }), u = S(957), Object.defineProperty(O, "DiagLogLevel", { enumerable: true, get: function() {
          return u.DiagLogLevel;
        } }), h = S(102), Object.defineProperty(O, "createNoopMeter", { enumerable: true, get: function() {
          return h.createNoopMeter;
        } }), d = S(901), Object.defineProperty(O, "ValueType", { enumerable: true, get: function() {
          return d.ValueType;
        } }), p = S(194), Object.defineProperty(O, "defaultTextMapGetter", { enumerable: true, get: function() {
          return p.defaultTextMapGetter;
        } }), Object.defineProperty(O, "defaultTextMapSetter", { enumerable: true, get: function() {
          return p.defaultTextMapSetter;
        } }), m = S(125), Object.defineProperty(O, "ProxyTracer", { enumerable: true, get: function() {
          return m.ProxyTracer;
        } }), f = S(846), Object.defineProperty(O, "ProxyTracerProvider", { enumerable: true, get: function() {
          return f.ProxyTracerProvider;
        } }), g = S(996), Object.defineProperty(O, "SamplingDecision", { enumerable: true, get: function() {
          return g.SamplingDecision;
        } }), y = S(357), Object.defineProperty(O, "SpanKind", { enumerable: true, get: function() {
          return y.SpanKind;
        } }), b = S(847), Object.defineProperty(O, "SpanStatusCode", { enumerable: true, get: function() {
          return b.SpanStatusCode;
        } }), w = S(475), Object.defineProperty(O, "TraceFlags", { enumerable: true, get: function() {
          return w.TraceFlags;
        } }), v = S(98), Object.defineProperty(O, "createTraceState", { enumerable: true, get: function() {
          return v.createTraceState;
        } }), x = S(139), Object.defineProperty(O, "isSpanContextValid", { enumerable: true, get: function() {
          return x.isSpanContextValid;
        } }), Object.defineProperty(O, "isValidTraceId", { enumerable: true, get: function() {
          return x.isValidTraceId;
        } }), Object.defineProperty(O, "isValidSpanId", { enumerable: true, get: function() {
          return x.isValidSpanId;
        } }), _ = S(476), Object.defineProperty(O, "INVALID_SPANID", { enumerable: true, get: function() {
          return _.INVALID_SPANID;
        } }), Object.defineProperty(O, "INVALID_TRACEID", { enumerable: true, get: function() {
          return _.INVALID_TRACEID;
        } }), Object.defineProperty(O, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
          return _.INVALID_SPAN_CONTEXT;
        } }), r2 = S(67), Object.defineProperty(O, "context", { enumerable: true, get: function() {
          return r2.context;
        } }), s = S(506), Object.defineProperty(O, "diag", { enumerable: true, get: function() {
          return s.diag;
        } }), i = S(886), Object.defineProperty(O, "metrics", { enumerable: true, get: function() {
          return i.metrics;
        } }), n = S(939), Object.defineProperty(O, "propagation", { enumerable: true, get: function() {
          return n.propagation;
        } }), a = S(845), Object.defineProperty(O, "trace", { enumerable: true, get: function() {
          return a.trace;
        } }), O.default = { context: r2.context, diag: s.diag, metrics: i.metrics, propagation: n.propagation, trace: a.trace }, t.exports = O;
      })();
    }, 25784, (e, t, r) => {
      (() => {
        "use strict";
        "u" > typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/.pnpm/next@16.2.3_@babel+core@7.2_7615a97fca7fd705b5e52339c323f144/node_modules/next/dist/compiled/cookie/");
        var e2, r2, s, i, n = {};
        n.parse = function(t2, r3) {
          if ("string" != typeof t2) throw TypeError("argument str must be a string");
          for (var i2 = {}, n2 = t2.split(s), a = (r3 || {}).decode || e2, o = 0; o < n2.length; o++) {
            var c = n2[o], l = c.indexOf("=");
            if (!(l < 0)) {
              var u = c.substr(0, l).trim(), h = c.substr(++l, c.length).trim();
              '"' == h[0] && (h = h.slice(1, -1)), void 0 == i2[u] && (i2[u] = function(e3, t3) {
                try {
                  return t3(e3);
                } catch (t4) {
                  return e3;
                }
              }(h, a));
            }
          }
          return i2;
        }, n.serialize = function(e3, t2, s2) {
          var n2 = s2 || {}, a = n2.encode || r2;
          if ("function" != typeof a) throw TypeError("option encode is invalid");
          if (!i.test(e3)) throw TypeError("argument name is invalid");
          var o = a(t2);
          if (o && !i.test(o)) throw TypeError("argument val is invalid");
          var c = e3 + "=" + o;
          if (null != n2.maxAge) {
            var l = n2.maxAge - 0;
            if (isNaN(l) || !isFinite(l)) throw TypeError("option maxAge is invalid");
            c += "; Max-Age=" + Math.floor(l);
          }
          if (n2.domain) {
            if (!i.test(n2.domain)) throw TypeError("option domain is invalid");
            c += "; Domain=" + n2.domain;
          }
          if (n2.path) {
            if (!i.test(n2.path)) throw TypeError("option path is invalid");
            c += "; Path=" + n2.path;
          }
          if (n2.expires) {
            if ("function" != typeof n2.expires.toUTCString) throw TypeError("option expires is invalid");
            c += "; Expires=" + n2.expires.toUTCString();
          }
          if (n2.httpOnly && (c += "; HttpOnly"), n2.secure && (c += "; Secure"), n2.sameSite) switch ("string" == typeof n2.sameSite ? n2.sameSite.toLowerCase() : n2.sameSite) {
            case true:
            case "strict":
              c += "; SameSite=Strict";
              break;
            case "lax":
              c += "; SameSite=Lax";
              break;
            case "none":
              c += "; SameSite=None";
              break;
            default:
              throw TypeError("option sameSite is invalid");
          }
          return c;
        }, e2 = decodeURIComponent, r2 = encodeURIComponent, s = /; */, i = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, t.exports = n;
      })();
    }, 48864, (e, t, r) => {
      (() => {
        "use strict";
        let e2, r2, s, i, n;
        var a = { 993: (e3) => {
          var t2 = Object.prototype.hasOwnProperty, r3 = "~";
          function s2() {
          }
          function i2(e4, t3, r4) {
            this.fn = e4, this.context = t3, this.once = r4 || false;
          }
          function n2(e4, t3, s3, n3, a3) {
            if ("function" != typeof s3) throw TypeError("The listener must be a function");
            var o3 = new i2(s3, n3 || e4, a3), c2 = r3 ? r3 + t3 : t3;
            return e4._events[c2] ? e4._events[c2].fn ? e4._events[c2] = [e4._events[c2], o3] : e4._events[c2].push(o3) : (e4._events[c2] = o3, e4._eventsCount++), e4;
          }
          function a2(e4, t3) {
            0 == --e4._eventsCount ? e4._events = new s2() : delete e4._events[t3];
          }
          function o2() {
            this._events = new s2(), this._eventsCount = 0;
          }
          Object.create && (s2.prototype = /* @__PURE__ */ Object.create(null), new s2().__proto__ || (r3 = false)), o2.prototype.eventNames = function() {
            var e4, s3, i3 = [];
            if (0 === this._eventsCount) return i3;
            for (s3 in e4 = this._events) t2.call(e4, s3) && i3.push(r3 ? s3.slice(1) : s3);
            return Object.getOwnPropertySymbols ? i3.concat(Object.getOwnPropertySymbols(e4)) : i3;
          }, o2.prototype.listeners = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, s3 = this._events[t3];
            if (!s3) return [];
            if (s3.fn) return [s3.fn];
            for (var i3 = 0, n3 = s3.length, a3 = Array(n3); i3 < n3; i3++) a3[i3] = s3[i3].fn;
            return a3;
          }, o2.prototype.listenerCount = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, s3 = this._events[t3];
            return s3 ? s3.fn ? 1 : s3.length : 0;
          }, o2.prototype.emit = function(e4, t3, s3, i3, n3, a3) {
            var o3 = r3 ? r3 + e4 : e4;
            if (!this._events[o3]) return false;
            var c2, l2, u = this._events[o3], h = arguments.length;
            if (u.fn) {
              switch (u.once && this.removeListener(e4, u.fn, void 0, true), h) {
                case 1:
                  return u.fn.call(u.context), true;
                case 2:
                  return u.fn.call(u.context, t3), true;
                case 3:
                  return u.fn.call(u.context, t3, s3), true;
                case 4:
                  return u.fn.call(u.context, t3, s3, i3), true;
                case 5:
                  return u.fn.call(u.context, t3, s3, i3, n3), true;
                case 6:
                  return u.fn.call(u.context, t3, s3, i3, n3, a3), true;
              }
              for (l2 = 1, c2 = Array(h - 1); l2 < h; l2++) c2[l2 - 1] = arguments[l2];
              u.fn.apply(u.context, c2);
            } else {
              var d, p = u.length;
              for (l2 = 0; l2 < p; l2++) switch (u[l2].once && this.removeListener(e4, u[l2].fn, void 0, true), h) {
                case 1:
                  u[l2].fn.call(u[l2].context);
                  break;
                case 2:
                  u[l2].fn.call(u[l2].context, t3);
                  break;
                case 3:
                  u[l2].fn.call(u[l2].context, t3, s3);
                  break;
                case 4:
                  u[l2].fn.call(u[l2].context, t3, s3, i3);
                  break;
                default:
                  if (!c2) for (d = 1, c2 = Array(h - 1); d < h; d++) c2[d - 1] = arguments[d];
                  u[l2].fn.apply(u[l2].context, c2);
              }
            }
            return true;
          }, o2.prototype.on = function(e4, t3, r4) {
            return n2(this, e4, t3, r4, false);
          }, o2.prototype.once = function(e4, t3, r4) {
            return n2(this, e4, t3, r4, true);
          }, o2.prototype.removeListener = function(e4, t3, s3, i3) {
            var n3 = r3 ? r3 + e4 : e4;
            if (!this._events[n3]) return this;
            if (!t3) return a2(this, n3), this;
            var o3 = this._events[n3];
            if (o3.fn) o3.fn !== t3 || i3 && !o3.once || s3 && o3.context !== s3 || a2(this, n3);
            else {
              for (var c2 = 0, l2 = [], u = o3.length; c2 < u; c2++) (o3[c2].fn !== t3 || i3 && !o3[c2].once || s3 && o3[c2].context !== s3) && l2.push(o3[c2]);
              l2.length ? this._events[n3] = 1 === l2.length ? l2[0] : l2 : a2(this, n3);
            }
            return this;
          }, o2.prototype.removeAllListeners = function(e4) {
            var t3;
            return e4 ? (t3 = r3 ? r3 + e4 : e4, this._events[t3] && a2(this, t3)) : (this._events = new s2(), this._eventsCount = 0), this;
          }, o2.prototype.off = o2.prototype.removeListener, o2.prototype.addListener = o2.prototype.on, o2.prefixed = r3, o2.EventEmitter = o2, e3.exports = o2;
        }, 213: (e3) => {
          e3.exports = (e4, t2) => (t2 = t2 || (() => {
          }), e4.then((e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => e5), (e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => {
            throw e5;
          })));
        }, 574: (e3, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e4, t3, r3) {
            let s2 = 0, i2 = e4.length;
            for (; i2 > 0; ) {
              let n2 = i2 / 2 | 0, a2 = s2 + n2;
              0 >= r3(e4[a2], t3) ? (s2 = ++a2, i2 -= n2 + 1) : i2 = n2;
            }
            return s2;
          };
        }, 821: (e3, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          let s2 = r3(574);
          t2.default = class {
            constructor() {
              this._queue = [];
            }
            enqueue(e4, t3) {
              let r4 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e4 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) return void this._queue.push(r4);
              let i2 = s2.default(this._queue, r4, (e5, t4) => t4.priority - e5.priority);
              this._queue.splice(i2, 0, r4);
            }
            dequeue() {
              let e4 = this._queue.shift();
              return null == e4 ? void 0 : e4.run;
            }
            filter(e4) {
              return this._queue.filter((t3) => t3.priority === e4.priority).map((e5) => e5.run);
            }
            get size() {
              return this._queue.length;
            }
          };
        }, 816: (e3, t2, r3) => {
          let s2 = r3(213);
          class i2 extends Error {
            constructor(e4) {
              super(e4), this.name = "TimeoutError";
            }
          }
          let n2 = (e4, t3, r4) => new Promise((n3, a2) => {
            if ("number" != typeof t3 || t3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (t3 === 1 / 0) return void n3(e4);
            let o2 = setTimeout(() => {
              if ("function" == typeof r4) {
                try {
                  n3(r4());
                } catch (e5) {
                  a2(e5);
                }
                return;
              }
              let s3 = "string" == typeof r4 ? r4 : `Promise timed out after ${t3} milliseconds`, o3 = r4 instanceof Error ? r4 : new i2(s3);
              "function" == typeof e4.cancel && e4.cancel(), a2(o3);
            }, t3);
            s2(e4.then(n3, a2), () => {
              clearTimeout(o2);
            });
          });
          e3.exports = n2, e3.exports.default = n2, e3.exports.TimeoutError = i2;
        } }, o = {};
        function c(e3) {
          var t2 = o[e3];
          if (void 0 !== t2) return t2.exports;
          var r3 = o[e3] = { exports: {} }, s2 = true;
          try {
            a[e3](r3, r3.exports, c), s2 = false;
          } finally {
            s2 && delete o[e3];
          }
          return r3.exports;
        }
        c.ab = "/ROOT/node_modules/.pnpm/next@16.2.3_@babel+core@7.2_7615a97fca7fd705b5e52339c323f144/node_modules/next/dist/compiled/p-queue/";
        var l = {};
        Object.defineProperty(l, "__esModule", { value: true }), e2 = c(993), r2 = c(816), s = c(821), i = () => {
        }, n = new r2.TimeoutError(), l.default = class extends e2 {
          constructor(e3) {
            var t2, r3, n2, a2;
            if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = i, this._resolveIdle = i, !("number" == typeof (e3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: s.default }, e3)).intervalCap && e3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (r3 = null == (t2 = e3.intervalCap) ? void 0 : t2.toString()) ? r3 : ""}\` (${typeof e3.intervalCap})`);
            if (void 0 === e3.interval || !(Number.isFinite(e3.interval) && e3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null != (a2 = null == (n2 = e3.interval) ? void 0 : n2.toString()) ? a2 : ""}\` (${typeof e3.interval})`);
            this._carryoverConcurrencyCount = e3.carryoverConcurrencyCount, this._isIntervalIgnored = e3.intervalCap === 1 / 0 || 0 === e3.interval, this._intervalCap = e3.intervalCap, this._interval = e3.interval, this._queue = new e3.queueClass(), this._queueClass = e3.queueClass, this.concurrency = e3.concurrency, this._timeout = e3.timeout, this._throwOnTimeout = true === e3.throwOnTimeout, this._isPaused = false === e3.autoStart;
          }
          get _doesIntervalAllowAnother() {
            return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
          }
          get _doesConcurrentAllowAnother() {
            return this._pendingCount < this._concurrency;
          }
          _next() {
            this._pendingCount--, this._tryToStartAnother(), this.emit("next");
          }
          _resolvePromises() {
            this._resolveEmpty(), this._resolveEmpty = i, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = i, this.emit("idle"));
          }
          _onResumeInterval() {
            this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
          }
          _isIntervalPaused() {
            let e3 = Date.now();
            if (void 0 === this._intervalId) {
              let t2 = this._intervalEnd - e3;
              if (!(t2 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                this._onResumeInterval();
              }, t2)), true;
              this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
            }
            return false;
          }
          _tryToStartAnother() {
            if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
            if (!this._isPaused) {
              let e3 = !this._isIntervalPaused();
              if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                let t2 = this._queue.dequeue();
                return !!t2 && (this.emit("active"), t2(), e3 && this._initializeIntervalIfNeeded(), true);
              }
            }
            return false;
          }
          _initializeIntervalIfNeeded() {
            this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
              this._onInterval();
            }, this._interval), this._intervalEnd = Date.now() + this._interval);
          }
          _onInterval() {
            0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
          }
          _processQueue() {
            for (; this._tryToStartAnother(); ) ;
          }
          get concurrency() {
            return this._concurrency;
          }
          set concurrency(e3) {
            if (!("number" == typeof e3 && e3 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e3}\` (${typeof e3})`);
            this._concurrency = e3, this._processQueue();
          }
          async add(e3, t2 = {}) {
            return new Promise((s2, i2) => {
              let a2 = async () => {
                this._pendingCount++, this._intervalCount++;
                try {
                  let a3 = void 0 === this._timeout && void 0 === t2.timeout ? e3() : r2.default(Promise.resolve(e3()), void 0 === t2.timeout ? this._timeout : t2.timeout, () => {
                    (void 0 === t2.throwOnTimeout ? this._throwOnTimeout : t2.throwOnTimeout) && i2(n);
                  });
                  s2(await a3);
                } catch (e4) {
                  i2(e4);
                }
                this._next();
              };
              this._queue.enqueue(a2, t2), this._tryToStartAnother(), this.emit("add");
            });
          }
          async addAll(e3, t2) {
            return Promise.all(e3.map(async (e4) => this.add(e4, t2)));
          }
          start() {
            return this._isPaused && (this._isPaused = false, this._processQueue()), this;
          }
          pause() {
            this._isPaused = true;
          }
          clear() {
            this._queue = new this._queueClass();
          }
          async onEmpty() {
            if (0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveEmpty;
              this._resolveEmpty = () => {
                t2(), e3();
              };
            });
          }
          async onIdle() {
            if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveIdle;
              this._resolveIdle = () => {
                t2(), e3();
              };
            });
          }
          get size() {
            return this._queue.size;
          }
          sizeBy(e3) {
            return this._queue.filter(e3).length;
          }
          get pending() {
            return this._pendingCount;
          }
          get isPaused() {
            return this._isPaused;
          }
          get timeout() {
            return this._timeout;
          }
          set timeout(e3) {
            this._timeout = e3;
          }
        }, t.exports = l;
      })();
    }, 38794, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var s = { getTestReqInfo: function() {
        return c;
      }, withRequest: function() {
        return o;
      } };
      for (var i in s) Object.defineProperty(r, i, { enumerable: true, get: s[i] });
      let n = new (e.r(78500)).AsyncLocalStorage();
      function a(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (!r2) return;
        let s2 = t2.url(e2);
        return { url: s2, proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function o(e2, t2, r2) {
        let s2 = a(e2, t2);
        return s2 ? n.run(s2, r2) : r2();
      }
      function c(e2, t2) {
        let r2 = n.getStore();
        return r2 || (e2 && t2 ? a(e2, t2) : void 0);
      }
    }, 91794, (e, t, r) => {
      "use strict";
      var s = e.i(51615);
      Object.defineProperty(r, "__esModule", { value: true });
      var i = { handleFetch: function() {
        return l;
      }, interceptFetch: function() {
        return u;
      }, reader: function() {
        return o;
      } };
      for (var n in i) Object.defineProperty(r, n, { enumerable: true, get: i[n] });
      let a = e.r(38794), o = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function c(e2, t2) {
        let { url: r2, method: i2, headers: n2, body: a2, cache: o2, credentials: c2, integrity: l2, mode: u2, redirect: h, referrer: d, referrerPolicy: p } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: i2, headers: [...Array.from(n2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: a2 ? s.Buffer.from(await t2.arrayBuffer()).toString("base64") : null, cache: o2, credentials: c2, integrity: l2, mode: u2, redirect: h, referrer: d, referrerPolicy: p } };
      }
      async function l(e2, t2) {
        let r2 = (0, a.getTestReqInfo)(t2, o);
        if (!r2) return e2(t2);
        let { testData: i2, proxyPort: n2 } = r2, l2 = await c(i2, t2), u2 = await e2(`http://localhost:${n2}`, { method: "POST", body: JSON.stringify(l2), next: { internal: true } });
        if (!u2.ok) throw Object.defineProperty(Error(`Proxy request failed: ${u2.status}`), "__NEXT_ERROR_CODE", { value: "E146", enumerable: false, configurable: true });
        let h = await u2.json(), { api: d } = h;
        switch (d) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Object.defineProperty(Error(`Proxy request aborted [${t2.method} ${t2.url}]`), "__NEXT_ERROR_CODE", { value: "E145", enumerable: false, configurable: true });
          case "fetch":
            return function(e3) {
              let { status: t3, headers: r3, body: i3 } = e3.response;
              return new Response(i3 ? s.Buffer.from(i3, "base64") : null, { status: t3, headers: new Headers(r3) });
            }(h);
          default:
            return d;
        }
      }
      function u(t2) {
        return e.g.fetch = function(e2, r2) {
          var s2;
          return (null == r2 || null == (s2 = r2.next) ? void 0 : s2.internal) ? t2(e2, r2) : l(t2, new Request(e2, r2));
        }, () => {
          e.g.fetch = t2;
        };
      }
    }, 69369, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var s = { interceptTestApis: function() {
        return o;
      }, wrapRequestHandler: function() {
        return c;
      } };
      for (var i in s) Object.defineProperty(r, i, { enumerable: true, get: s[i] });
      let n = e.r(38794), a = e.r(91794);
      function o() {
        return (0, a.interceptFetch)(e.g.fetch);
      }
      function c(e2) {
        return (t2, r2) => (0, n.withRequest)(t2, a.reader, () => e2(t2, r2));
      }
    }, 45565, (e, t, r) => {
      !function() {
        "use strict";
        var e2 = { 114: function(e3) {
          function t2(e4) {
            if ("string" != typeof e4) throw TypeError("Path must be a string. Received " + JSON.stringify(e4));
          }
          function r3(e4, t3) {
            for (var r4, s3 = "", i = 0, n = -1, a = 0, o = 0; o <= e4.length; ++o) {
              if (o < e4.length) r4 = e4.charCodeAt(o);
              else if (47 === r4) break;
              else r4 = 47;
              if (47 === r4) {
                if (n === o - 1 || 1 === a) ;
                else if (n !== o - 1 && 2 === a) {
                  if (s3.length < 2 || 2 !== i || 46 !== s3.charCodeAt(s3.length - 1) || 46 !== s3.charCodeAt(s3.length - 2)) {
                    if (s3.length > 2) {
                      var c = s3.lastIndexOf("/");
                      if (c !== s3.length - 1) {
                        -1 === c ? (s3 = "", i = 0) : i = (s3 = s3.slice(0, c)).length - 1 - s3.lastIndexOf("/"), n = o, a = 0;
                        continue;
                      }
                    } else if (2 === s3.length || 1 === s3.length) {
                      s3 = "", i = 0, n = o, a = 0;
                      continue;
                    }
                  }
                  t3 && (s3.length > 0 ? s3 += "/.." : s3 = "..", i = 2);
                } else s3.length > 0 ? s3 += "/" + e4.slice(n + 1, o) : s3 = e4.slice(n + 1, o), i = o - n - 1;
                n = o, a = 0;
              } else 46 === r4 && -1 !== a ? ++a : a = -1;
            }
            return s3;
          }
          var s2 = { resolve: function() {
            for (var e4, s3, i = "", n = false, a = arguments.length - 1; a >= -1 && !n; a--) a >= 0 ? s3 = arguments[a] : (void 0 === e4 && (e4 = ""), s3 = e4), t2(s3), 0 !== s3.length && (i = s3 + "/" + i, n = 47 === s3.charCodeAt(0));
            if (i = r3(i, !n), n) if (i.length > 0) return "/" + i;
            else return "/";
            return i.length > 0 ? i : ".";
          }, normalize: function(e4) {
            if (t2(e4), 0 === e4.length) return ".";
            var s3 = 47 === e4.charCodeAt(0), i = 47 === e4.charCodeAt(e4.length - 1);
            return (0 !== (e4 = r3(e4, !s3)).length || s3 || (e4 = "."), e4.length > 0 && i && (e4 += "/"), s3) ? "/" + e4 : e4;
          }, isAbsolute: function(e4) {
            return t2(e4), e4.length > 0 && 47 === e4.charCodeAt(0);
          }, join: function() {
            if (0 == arguments.length) return ".";
            for (var e4, r4 = 0; r4 < arguments.length; ++r4) {
              var i = arguments[r4];
              t2(i), i.length > 0 && (void 0 === e4 ? e4 = i : e4 += "/" + i);
            }
            return void 0 === e4 ? "." : s2.normalize(e4);
          }, relative: function(e4, r4) {
            if (t2(e4), t2(r4), e4 === r4 || (e4 = s2.resolve(e4)) === (r4 = s2.resolve(r4))) return "";
            for (var i = 1; i < e4.length && 47 === e4.charCodeAt(i); ++i) ;
            for (var n = e4.length, a = n - i, o = 1; o < r4.length && 47 === r4.charCodeAt(o); ++o) ;
            for (var c = r4.length - o, l = a < c ? a : c, u = -1, h = 0; h <= l; ++h) {
              if (h === l) {
                if (c > l) {
                  if (47 === r4.charCodeAt(o + h)) return r4.slice(o + h + 1);
                  else if (0 === h) return r4.slice(o + h);
                } else a > l && (47 === e4.charCodeAt(i + h) ? u = h : 0 === h && (u = 0));
                break;
              }
              var d = e4.charCodeAt(i + h);
              if (d !== r4.charCodeAt(o + h)) break;
              47 === d && (u = h);
            }
            var p = "";
            for (h = i + u + 1; h <= n; ++h) (h === n || 47 === e4.charCodeAt(h)) && (0 === p.length ? p += ".." : p += "/..");
            return p.length > 0 ? p + r4.slice(o + u) : (o += u, 47 === r4.charCodeAt(o) && ++o, r4.slice(o));
          }, _makeLong: function(e4) {
            return e4;
          }, dirname: function(e4) {
            if (t2(e4), 0 === e4.length) return ".";
            for (var r4 = e4.charCodeAt(0), s3 = 47 === r4, i = -1, n = true, a = e4.length - 1; a >= 1; --a) if (47 === (r4 = e4.charCodeAt(a))) {
              if (!n) {
                i = a;
                break;
              }
            } else n = false;
            return -1 === i ? s3 ? "/" : "." : s3 && 1 === i ? "//" : e4.slice(0, i);
          }, basename: function(e4, r4) {
            if (void 0 !== r4 && "string" != typeof r4) throw TypeError('"ext" argument must be a string');
            t2(e4);
            var s3, i = 0, n = -1, a = true;
            if (void 0 !== r4 && r4.length > 0 && r4.length <= e4.length) {
              if (r4.length === e4.length && r4 === e4) return "";
              var o = r4.length - 1, c = -1;
              for (s3 = e4.length - 1; s3 >= 0; --s3) {
                var l = e4.charCodeAt(s3);
                if (47 === l) {
                  if (!a) {
                    i = s3 + 1;
                    break;
                  }
                } else -1 === c && (a = false, c = s3 + 1), o >= 0 && (l === r4.charCodeAt(o) ? -1 == --o && (n = s3) : (o = -1, n = c));
              }
              return i === n ? n = c : -1 === n && (n = e4.length), e4.slice(i, n);
            }
            for (s3 = e4.length - 1; s3 >= 0; --s3) if (47 === e4.charCodeAt(s3)) {
              if (!a) {
                i = s3 + 1;
                break;
              }
            } else -1 === n && (a = false, n = s3 + 1);
            return -1 === n ? "" : e4.slice(i, n);
          }, extname: function(e4) {
            t2(e4);
            for (var r4 = -1, s3 = 0, i = -1, n = true, a = 0, o = e4.length - 1; o >= 0; --o) {
              var c = e4.charCodeAt(o);
              if (47 === c) {
                if (!n) {
                  s3 = o + 1;
                  break;
                }
                continue;
              }
              -1 === i && (n = false, i = o + 1), 46 === c ? -1 === r4 ? r4 = o : 1 !== a && (a = 1) : -1 !== r4 && (a = -1);
            }
            return -1 === r4 || -1 === i || 0 === a || 1 === a && r4 === i - 1 && r4 === s3 + 1 ? "" : e4.slice(r4, i);
          }, format: function(e4) {
            var t3, r4;
            if (null === e4 || "object" != typeof e4) throw TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e4);
            return t3 = e4.dir || e4.root, r4 = e4.base || (e4.name || "") + (e4.ext || ""), t3 ? t3 === e4.root ? t3 + r4 : t3 + "/" + r4 : r4;
          }, parse: function(e4) {
            t2(e4);
            var r4, s3 = { root: "", dir: "", base: "", ext: "", name: "" };
            if (0 === e4.length) return s3;
            var i = e4.charCodeAt(0), n = 47 === i;
            n ? (s3.root = "/", r4 = 1) : r4 = 0;
            for (var a = -1, o = 0, c = -1, l = true, u = e4.length - 1, h = 0; u >= r4; --u) {
              if (47 === (i = e4.charCodeAt(u))) {
                if (!l) {
                  o = u + 1;
                  break;
                }
                continue;
              }
              -1 === c && (l = false, c = u + 1), 46 === i ? -1 === a ? a = u : 1 !== h && (h = 1) : -1 !== a && (h = -1);
            }
            return -1 === a || -1 === c || 0 === h || 1 === h && a === c - 1 && a === o + 1 ? -1 !== c && (0 === o && n ? s3.base = s3.name = e4.slice(1, c) : s3.base = s3.name = e4.slice(o, c)) : (0 === o && n ? (s3.name = e4.slice(1, a), s3.base = e4.slice(1, c)) : (s3.name = e4.slice(o, a), s3.base = e4.slice(o, c)), s3.ext = e4.slice(a, c)), o > 0 ? s3.dir = e4.slice(0, o - 1) : n && (s3.dir = "/"), s3;
          }, sep: "/", delimiter: ":", win32: null, posix: null };
          s2.posix = s2, e3.exports = s2;
        } }, r2 = {};
        function s(t2) {
          var i = r2[t2];
          if (void 0 !== i) return i.exports;
          var n = r2[t2] = { exports: {} }, a = true;
          try {
            e2[t2](n, n.exports, s), a = false;
          } finally {
            a && delete r2[t2];
          }
          return n.exports;
        }
        s.ab = "/ROOT/node_modules/.pnpm/next@16.2.3_@babel+core@7.2_7615a97fca7fd705b5e52339c323f144/node_modules/next/dist/compiled/path-browserify/", t.exports = s(114);
      }();
    }, 90539, (e, t, r) => {
      t.exports = e.r(45565);
    }, 85626, (e, t, r) => {
      (() => {
        "use strict";
        "u" > typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/.pnpm/next@16.2.3_@babel+core@7.2_7615a97fca7fd705b5e52339c323f144/node_modules/next/dist/compiled/path-to-regexp/");
        var e2 = {};
        (() => {
          function t2(e3, t3) {
            void 0 === t3 && (t3 = {});
            for (var r3 = function(e4) {
              for (var t4 = [], r4 = 0; r4 < e4.length; ) {
                var s3 = e4[r4];
                if ("*" === s3 || "+" === s3 || "?" === s3) {
                  t4.push({ type: "MODIFIER", index: r4, value: e4[r4++] });
                  continue;
                }
                if ("\\" === s3) {
                  t4.push({ type: "ESCAPED_CHAR", index: r4++, value: e4[r4++] });
                  continue;
                }
                if ("{" === s3) {
                  t4.push({ type: "OPEN", index: r4, value: e4[r4++] });
                  continue;
                }
                if ("}" === s3) {
                  t4.push({ type: "CLOSE", index: r4, value: e4[r4++] });
                  continue;
                }
                if (":" === s3) {
                  for (var i2 = "", n3 = r4 + 1; n3 < e4.length; ) {
                    var a3 = e4.charCodeAt(n3);
                    if (a3 >= 48 && a3 <= 57 || a3 >= 65 && a3 <= 90 || a3 >= 97 && a3 <= 122 || 95 === a3) {
                      i2 += e4[n3++];
                      continue;
                    }
                    break;
                  }
                  if (!i2) throw TypeError("Missing parameter name at ".concat(r4));
                  t4.push({ type: "NAME", index: r4, value: i2 }), r4 = n3;
                  continue;
                }
                if ("(" === s3) {
                  var o3 = 1, c2 = "", n3 = r4 + 1;
                  if ("?" === e4[n3]) throw TypeError('Pattern cannot start with "?" at '.concat(n3));
                  for (; n3 < e4.length; ) {
                    if ("\\" === e4[n3]) {
                      c2 += e4[n3++] + e4[n3++];
                      continue;
                    }
                    if (")" === e4[n3]) {
                      if (0 == --o3) {
                        n3++;
                        break;
                      }
                    } else if ("(" === e4[n3] && (o3++, "?" !== e4[n3 + 1])) throw TypeError("Capturing groups are not allowed at ".concat(n3));
                    c2 += e4[n3++];
                  }
                  if (o3) throw TypeError("Unbalanced pattern at ".concat(r4));
                  if (!c2) throw TypeError("Missing pattern at ".concat(r4));
                  t4.push({ type: "PATTERN", index: r4, value: c2 }), r4 = n3;
                  continue;
                }
                t4.push({ type: "CHAR", index: r4, value: e4[r4++] });
              }
              return t4.push({ type: "END", index: r4, value: "" }), t4;
            }(e3), s2 = t3.prefixes, n2 = void 0 === s2 ? "./" : s2, a2 = t3.delimiter, o2 = void 0 === a2 ? "/#?" : a2, c = [], l = 0, u = 0, h = "", d = function(e4) {
              if (u < r3.length && r3[u].type === e4) return r3[u++].value;
            }, p = function(e4) {
              var t4 = d(e4);
              if (void 0 !== t4) return t4;
              var s3 = r3[u], i2 = s3.type, n3 = s3.index;
              throw TypeError("Unexpected ".concat(i2, " at ").concat(n3, ", expected ").concat(e4));
            }, m = function() {
              for (var e4, t4 = ""; e4 = d("CHAR") || d("ESCAPED_CHAR"); ) t4 += e4;
              return t4;
            }, f = function(e4) {
              for (var t4 = 0; t4 < o2.length; t4++) {
                var r4 = o2[t4];
                if (e4.indexOf(r4) > -1) return true;
              }
              return false;
            }, g = function(e4) {
              var t4 = c[c.length - 1], r4 = e4 || (t4 && "string" == typeof t4 ? t4 : "");
              if (t4 && !r4) throw TypeError('Must have text between two parameters, missing text after "'.concat(t4.name, '"'));
              return !r4 || f(r4) ? "[^".concat(i(o2), "]+?") : "(?:(?!".concat(i(r4), ")[^").concat(i(o2), "])+?");
            }; u < r3.length; ) {
              var y = d("CHAR"), b = d("NAME"), w = d("PATTERN");
              if (b || w) {
                var v = y || "";
                -1 === n2.indexOf(v) && (h += v, v = ""), h && (c.push(h), h = ""), c.push({ name: b || l++, prefix: v, suffix: "", pattern: w || g(v), modifier: d("MODIFIER") || "" });
                continue;
              }
              var x = y || d("ESCAPED_CHAR");
              if (x) {
                h += x;
                continue;
              }
              if (h && (c.push(h), h = ""), d("OPEN")) {
                var v = m(), _ = d("NAME") || "", k = d("PATTERN") || "", E = m();
                p("CLOSE"), c.push({ name: _ || (k ? l++ : ""), pattern: _ && !k ? g(v) : k, prefix: v, suffix: E, modifier: d("MODIFIER") || "" });
                continue;
              }
              p("END");
            }
            return c;
          }
          function r2(e3, t3) {
            void 0 === t3 && (t3 = {});
            var r3 = n(t3), s2 = t3.encode, i2 = void 0 === s2 ? function(e4) {
              return e4;
            } : s2, a2 = t3.validate, o2 = void 0 === a2 || a2, c = e3.map(function(e4) {
              if ("object" == typeof e4) return new RegExp("^(?:".concat(e4.pattern, ")$"), r3);
            });
            return function(t4) {
              for (var r4 = "", s3 = 0; s3 < e3.length; s3++) {
                var n2 = e3[s3];
                if ("string" == typeof n2) {
                  r4 += n2;
                  continue;
                }
                var a3 = t4 ? t4[n2.name] : void 0, l = "?" === n2.modifier || "*" === n2.modifier, u = "*" === n2.modifier || "+" === n2.modifier;
                if (Array.isArray(a3)) {
                  if (!u) throw TypeError('Expected "'.concat(n2.name, '" to not repeat, but got an array'));
                  if (0 === a3.length) {
                    if (l) continue;
                    throw TypeError('Expected "'.concat(n2.name, '" to not be empty'));
                  }
                  for (var h = 0; h < a3.length; h++) {
                    var d = i2(a3[h], n2);
                    if (o2 && !c[s3].test(d)) throw TypeError('Expected all "'.concat(n2.name, '" to match "').concat(n2.pattern, '", but got "').concat(d, '"'));
                    r4 += n2.prefix + d + n2.suffix;
                  }
                  continue;
                }
                if ("string" == typeof a3 || "number" == typeof a3) {
                  var d = i2(String(a3), n2);
                  if (o2 && !c[s3].test(d)) throw TypeError('Expected "'.concat(n2.name, '" to match "').concat(n2.pattern, '", but got "').concat(d, '"'));
                  r4 += n2.prefix + d + n2.suffix;
                  continue;
                }
                if (!l) {
                  var p = u ? "an array" : "a string";
                  throw TypeError('Expected "'.concat(n2.name, '" to be ').concat(p));
                }
              }
              return r4;
            };
          }
          function s(e3, t3, r3) {
            void 0 === r3 && (r3 = {});
            var s2 = r3.decode, i2 = void 0 === s2 ? function(e4) {
              return e4;
            } : s2;
            return function(r4) {
              var s3 = e3.exec(r4);
              if (!s3) return false;
              for (var n2 = s3[0], a2 = s3.index, o2 = /* @__PURE__ */ Object.create(null), c = 1; c < s3.length; c++) !function(e4) {
                if (void 0 !== s3[e4]) {
                  var r5 = t3[e4 - 1];
                  "*" === r5.modifier || "+" === r5.modifier ? o2[r5.name] = s3[e4].split(r5.prefix + r5.suffix).map(function(e5) {
                    return i2(e5, r5);
                  }) : o2[r5.name] = i2(s3[e4], r5);
                }
              }(c);
              return { path: n2, index: a2, params: o2 };
            };
          }
          function i(e3) {
            return e3.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
          }
          function n(e3) {
            return e3 && e3.sensitive ? "" : "i";
          }
          function a(e3, t3, r3) {
            void 0 === r3 && (r3 = {});
            for (var s2 = r3.strict, a2 = void 0 !== s2 && s2, o2 = r3.start, c = r3.end, l = r3.encode, u = void 0 === l ? function(e4) {
              return e4;
            } : l, h = r3.delimiter, d = r3.endsWith, p = "[".concat(i(void 0 === d ? "" : d), "]|$"), m = "[".concat(i(void 0 === h ? "/#?" : h), "]"), f = void 0 === o2 || o2 ? "^" : "", g = 0; g < e3.length; g++) {
              var y = e3[g];
              if ("string" == typeof y) f += i(u(y));
              else {
                var b = i(u(y.prefix)), w = i(u(y.suffix));
                if (y.pattern) if (t3 && t3.push(y), b || w) if ("+" === y.modifier || "*" === y.modifier) {
                  var v = "*" === y.modifier ? "?" : "";
                  f += "(?:".concat(b, "((?:").concat(y.pattern, ")(?:").concat(w).concat(b, "(?:").concat(y.pattern, "))*)").concat(w, ")").concat(v);
                } else f += "(?:".concat(b, "(").concat(y.pattern, ")").concat(w, ")").concat(y.modifier);
                else {
                  if ("+" === y.modifier || "*" === y.modifier) throw TypeError('Can not repeat "'.concat(y.name, '" without a prefix and suffix'));
                  f += "(".concat(y.pattern, ")").concat(y.modifier);
                }
                else f += "(?:".concat(b).concat(w, ")").concat(y.modifier);
              }
            }
            if (void 0 === c || c) a2 || (f += "".concat(m, "?")), f += r3.endsWith ? "(?=".concat(p, ")") : "$";
            else {
              var x = e3[e3.length - 1], _ = "string" == typeof x ? m.indexOf(x[x.length - 1]) > -1 : void 0 === x;
              a2 || (f += "(?:".concat(m, "(?=").concat(p, "))?")), _ || (f += "(?=".concat(m, "|").concat(p, ")"));
            }
            return new RegExp(f, n(r3));
          }
          function o(e3, r3, s2) {
            if (e3 instanceof RegExp) {
              var i2;
              if (!r3) return e3;
              for (var c = /\((?:\?<(.*?)>)?(?!\?)/g, l = 0, u = c.exec(e3.source); u; ) r3.push({ name: u[1] || l++, prefix: "", suffix: "", modifier: "", pattern: "" }), u = c.exec(e3.source);
              return e3;
            }
            return Array.isArray(e3) ? (i2 = e3.map(function(e4) {
              return o(e4, r3, s2).source;
            }), new RegExp("(?:".concat(i2.join("|"), ")"), n(s2))) : a(t2(e3, s2), r3, s2);
          }
          Object.defineProperty(e2, "__esModule", { value: true }), e2.pathToRegexp = e2.tokensToRegexp = e2.regexpToFunction = e2.match = e2.tokensToFunction = e2.compile = e2.parse = void 0, e2.parse = t2, e2.compile = function(e3, s2) {
            return r2(t2(e3, s2), s2);
          }, e2.tokensToFunction = r2, e2.match = function(e3, t3) {
            var r3 = [];
            return s(o(e3, r3, t3), r3, t3);
          }, e2.regexpToFunction = s, e2.tokensToRegexp = a, e2.pathToRegexp = o;
        })(), t.exports = e2;
      })();
    }, 40012, (e) => {
      "use strict";
      let t = (0, e.i(53441).createAsyncLocalStorage)();
      e.s([], 99486), e.i(99486), e.s(["actionAsyncStorage", 0, t], 40012);
    }, 32828, (e) => {
      "use strict";
      let t = new Set(Object.values({ NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 })), r = "NEXT_HTTP_ERROR_FALLBACK";
      e.s(["HTTP_ERROR_FALLBACK_ERROR_CODE", 0, r, "isHTTPAccessFallbackError", 0, function(e2) {
        if ("object" != typeof e2 || null === e2 || !("digest" in e2) || "string" != typeof e2.digest) return false;
        let [s, i] = e2.digest.split(";");
        return s === r && t.has(Number(i));
      }]);
    }, 16563, (e) => {
      "use strict";
      var t, r = e.i(1974);
      let s = Symbol.for("react.postpone");
      var i = e.i(32828), n = ((t = {})[t.SeeOther = 303] = "SeeOther", t[t.TemporaryRedirect = 307] = "TemporaryRedirect", t[t.PermanentRedirect = 308] = "PermanentRedirect", t), a = e.i(78905), o = e.i(94414);
      e.s(["unstable_rethrow", 0, function e2(t2) {
        if (function(e3) {
          if ("object" != typeof e3 || null === e3 || !("digest" in e3) || "string" != typeof e3.digest) return false;
          let t3 = e3.digest.split(";"), [r2, s2] = t3, i2 = t3.slice(2, -2).join(";"), a2 = Number(t3.at(-2));
          return "NEXT_REDIRECT" === r2 && ("replace" === s2 || "push" === s2) && "string" == typeof i2 && !isNaN(a2) && a2 in n;
        }(t2) || (0, i.isHTTPAccessFallbackError)(t2) || "object" == typeof t2 && null !== t2 && "digest" in t2 && "BAILOUT_TO_CLIENT_SIDE_RENDERING" === t2.digest || (0, o.isDynamicServerError)(t2) || (0, a.isDynamicPostpone)(t2) || "object" == typeof t2 && null !== t2 && t2.$$typeof === s || (0, r.isHangingPromiseRejectionError)(t2) || (0, a.isPrerenderInterruptedError)(t2)) throw t2;
        t2 instanceof Error && "cause" in t2 && e2(t2.cause);
      }], 16563);
    }, 58746, (e, t, r) => {
      var s = { 226: function(t2, r2) {
        !function(s2) {
          "use strict";
          var i2 = "function", n2 = "undefined", a = "object", o = "string", c = "major", l = "model", u = "name", h = "type", d = "vendor", p = "version", m = "architecture", f = "console", g = "mobile", y = "tablet", b = "smarttv", w = "wearable", v = "embedded", x = "Amazon", _ = "Apple", k = "ASUS", E = "BlackBerry", S = "Browser", O = "Chrome", T = "Firefox", C = "Google", R = "Huawei", A = "Microsoft", P = "Motorola", I = "Opera", N = "Samsung", L = "Sharp", U = "Sony", M = "Xiaomi", D = "Zebra", j = "Facebook", q = "Chromium OS", z = "Mac OS", B = function(e2, t3) {
            var r3 = {};
            for (var s3 in e2) t3[s3] && t3[s3].length % 2 == 0 ? r3[s3] = t3[s3].concat(e2[s3]) : r3[s3] = e2[s3];
            return r3;
          }, $ = function(e2) {
            for (var t3 = {}, r3 = 0; r3 < e2.length; r3++) t3[e2[r3].toUpperCase()] = e2[r3];
            return t3;
          }, K = function(e2, t3) {
            return typeof e2 === o && -1 !== H(t3).indexOf(H(e2));
          }, H = function(e2) {
            return e2.toLowerCase();
          }, F = function(e2, t3) {
            if (typeof e2 === o) return e2 = e2.replace(/^\s\s*/, ""), typeof t3 === n2 ? e2 : e2.substring(0, 350);
          }, W = function(e2, t3) {
            for (var r3, s3, n3, o2, c2, l2, u2 = 0; u2 < t3.length && !c2; ) {
              var h2 = t3[u2], d2 = t3[u2 + 1];
              for (r3 = s3 = 0; r3 < h2.length && !c2 && h2[r3]; ) if (c2 = h2[r3++].exec(e2)) for (n3 = 0; n3 < d2.length; n3++) l2 = c2[++s3], typeof (o2 = d2[n3]) === a && o2.length > 0 ? 2 === o2.length ? typeof o2[1] == i2 ? this[o2[0]] = o2[1].call(this, l2) : this[o2[0]] = o2[1] : 3 === o2.length ? typeof o2[1] !== i2 || o2[1].exec && o2[1].test ? this[o2[0]] = l2 ? l2.replace(o2[1], o2[2]) : void 0 : this[o2[0]] = l2 ? o2[1].call(this, l2, o2[2]) : void 0 : 4 === o2.length && (this[o2[0]] = l2 ? o2[3].call(this, l2.replace(o2[1], o2[2])) : void 0) : this[o2] = l2 || void 0;
              u2 += 2;
            }
          }, J = function(e2, t3) {
            for (var r3 in t3) if (typeof t3[r3] === a && t3[r3].length > 0) {
              for (var s3 = 0; s3 < t3[r3].length; s3++) if (K(t3[r3][s3], e2)) return "?" === r3 ? void 0 : r3;
            } else if (K(t3[r3], e2)) return "?" === r3 ? void 0 : r3;
            return e2;
          }, G = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, V = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [p, [u, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [p, [u, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [u, p], [/opios[\/ ]+([\w\.]+)/i], [p, [u, I + " Mini"]], [/\bopr\/([\w\.]+)/i], [p, [u, I]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [u, p], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [p, [u, "UC" + S]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [p, [u, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [p, [u, "WeChat"]], [/konqueror\/([\w\.]+)/i], [p, [u, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [p, [u, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [p, [u, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[u, /(.+)/, "$1 Secure " + S], p], [/\bfocus\/([\w\.]+)/i], [p, [u, T + " Focus"]], [/\bopt\/([\w\.]+)/i], [p, [u, I + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [p, [u, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [p, [u, "Dolphin"]], [/coast\/([\w\.]+)/i], [p, [u, I + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [p, [u, "MIUI " + S]], [/fxios\/([-\w\.]+)/i], [p, [u, T]], [/\bqihu|(qi?ho?o?|360)browser/i], [[u, "360 " + S]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[u, /(.+)/, "$1 " + S], p], [/(comodo_dragon)\/([\w\.]+)/i], [[u, /_/g, " "], p], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [u, p], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [u], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[u, j], p], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [u, p], [/\bgsa\/([\w\.]+) .*safari\//i], [p, [u, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [p, [u, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [p, [u, O + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[u, O + " WebView"], p], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [p, [u, "Android " + S]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [u, p], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [p, [u, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [p, u], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [u, [p, J, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [u, p], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[u, "Netscape"], p], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [p, [u, T + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [u, p], [/(cobalt)\/([\w\.]+)/i], [u, [p, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[m, "amd64"]], [/(ia32(?=;))/i], [[m, H]], [/((?:i[346]|x)86)[;\)]/i], [[m, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[m, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[m, "armhf"]], [/windows (ce|mobile); ppc;/i], [[m, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[m, /ower/, "", H]], [/(sun4\w)[;\)]/i], [[m, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[m, H]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [l, [d, N], [h, y]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [l, [d, N], [h, g]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [l, [d, _], [h, g]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [l, [d, _], [h, y]], [/(macintosh);/i], [l, [d, _]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [l, [d, L], [h, g]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [l, [d, R], [h, y]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [l, [d, R], [h, g]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[l, /_/g, " "], [d, M], [h, g]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[l, /_/g, " "], [d, M], [h, y]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [l, [d, "OPPO"], [h, g]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [l, [d, "Vivo"], [h, g]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [l, [d, "Realme"], [h, g]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [l, [d, P], [h, g]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [l, [d, P], [h, y]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [l, [d, "LG"], [h, y]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [l, [d, "LG"], [h, g]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [l, [d, "Lenovo"], [h, y]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[l, /_/g, " "], [d, "Nokia"], [h, g]], [/(pixel c)\b/i], [l, [d, C], [h, y]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [l, [d, C], [h, g]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [l, [d, U], [h, g]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[l, "Xperia Tablet"], [d, U], [h, y]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [l, [d, "OnePlus"], [h, g]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [l, [d, x], [h, y]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[l, /(.+)/g, "Fire Phone $1"], [d, x], [h, g]], [/(playbook);[-\w\),; ]+(rim)/i], [l, d, [h, y]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [l, [d, E], [h, g]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [l, [d, k], [h, y]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [l, [d, k], [h, g]], [/(nexus 9)/i], [l, [d, "HTC"], [h, y]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [d, [l, /_/g, " "], [h, g]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [l, [d, "Acer"], [h, y]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [l, [d, "Meizu"], [h, g]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [d, l, [h, g]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [d, l, [h, y]], [/(surface duo)/i], [l, [d, A], [h, y]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [l, [d, "Fairphone"], [h, g]], [/(u304aa)/i], [l, [d, "AT&T"], [h, g]], [/\bsie-(\w*)/i], [l, [d, "Siemens"], [h, g]], [/\b(rct\w+) b/i], [l, [d, "RCA"], [h, y]], [/\b(venue[\d ]{2,7}) b/i], [l, [d, "Dell"], [h, y]], [/\b(q(?:mv|ta)\w+) b/i], [l, [d, "Verizon"], [h, y]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [l, [d, "Barnes & Noble"], [h, y]], [/\b(tm\d{3}\w+) b/i], [l, [d, "NuVision"], [h, y]], [/\b(k88) b/i], [l, [d, "ZTE"], [h, y]], [/\b(nx\d{3}j) b/i], [l, [d, "ZTE"], [h, g]], [/\b(gen\d{3}) b.+49h/i], [l, [d, "Swiss"], [h, g]], [/\b(zur\d{3}) b/i], [l, [d, "Swiss"], [h, y]], [/\b((zeki)?tb.*\b) b/i], [l, [d, "Zeki"], [h, y]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[d, "Dragon Touch"], l, [h, y]], [/\b(ns-?\w{0,9}) b/i], [l, [d, "Insignia"], [h, y]], [/\b((nxa|next)-?\w{0,9}) b/i], [l, [d, "NextBook"], [h, y]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[d, "Voice"], l, [h, g]], [/\b(lvtel\-)?(v1[12]) b/i], [[d, "LvTel"], l, [h, g]], [/\b(ph-1) /i], [l, [d, "Essential"], [h, g]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [l, [d, "Envizen"], [h, y]], [/\b(trio[-\w\. ]+) b/i], [l, [d, "MachSpeed"], [h, y]], [/\btu_(1491) b/i], [l, [d, "Rotor"], [h, y]], [/(shield[\w ]+) b/i], [l, [d, "Nvidia"], [h, y]], [/(sprint) (\w+)/i], [d, l, [h, g]], [/(kin\.[onetw]{3})/i], [[l, /\./g, " "], [d, A], [h, g]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [l, [d, D], [h, y]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [l, [d, D], [h, g]], [/smart-tv.+(samsung)/i], [d, [h, b]], [/hbbtv.+maple;(\d+)/i], [[l, /^/, "SmartTV"], [d, N], [h, b]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[d, "LG"], [h, b]], [/(apple) ?tv/i], [d, [l, _ + " TV"], [h, b]], [/crkey/i], [[l, O + "cast"], [d, C], [h, b]], [/droid.+aft(\w)( bui|\))/i], [l, [d, x], [h, b]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [l, [d, L], [h, b]], [/(bravia[\w ]+)( bui|\))/i], [l, [d, U], [h, b]], [/(mitv-\w{5}) bui/i], [l, [d, M], [h, b]], [/Hbbtv.*(technisat) (.*);/i], [d, l, [h, b]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[d, F], [l, F], [h, b]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[h, b]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [d, l, [h, f]], [/droid.+; (shield) bui/i], [l, [d, "Nvidia"], [h, f]], [/(playstation [345portablevi]+)/i], [l, [d, U], [h, f]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [l, [d, A], [h, f]], [/((pebble))app/i], [d, l, [h, w]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [l, [d, _], [h, w]], [/droid.+; (glass) \d/i], [l, [d, C], [h, w]], [/droid.+; (wt63?0{2,3})\)/i], [l, [d, D], [h, w]], [/(quest( 2| pro)?)/i], [l, [d, j], [h, w]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [d, [h, v]], [/(aeobc)\b/i], [l, [d, x], [h, v]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [l, [h, g]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [l, [h, y]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[h, y]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[h, g]], [/(android[-\w\. ]{0,9});.+buil/i], [l, [d, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [p, [u, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [p, [u, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [u, p], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [p, u]], os: [[/microsoft (windows) (vista|xp)/i], [u, p], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [u, [p, J, G]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[u, "Windows"], [p, J, G]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[p, /_/g, "."], [u, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[u, z], [p, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [p, u], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [u, p], [/\(bb(10);/i], [p, [u, E]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [p, [u, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [p, [u, T + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [p, [u, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [p, [u, "watchOS"]], [/crkey\/([\d\.]+)/i], [p, [u, O + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[u, q], p], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [u, p], [/(sunos) ?([\w\.\d]*)/i], [[u, "Solaris"], p], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [u, p]] }, X = function(e2, t3) {
            if (typeof e2 === a && (t3 = e2, e2 = void 0), !(this instanceof X)) return new X(e2, t3).getResult();
            var r3 = typeof s2 !== n2 && s2.navigator ? s2.navigator : void 0, f2 = e2 || (r3 && r3.userAgent ? r3.userAgent : ""), b2 = r3 && r3.userAgentData ? r3.userAgentData : void 0, w2 = t3 ? B(V, t3) : V, v2 = r3 && r3.userAgent == f2;
            return this.getBrowser = function() {
              var e3, t4 = {};
              return t4[u] = void 0, t4[p] = void 0, W.call(t4, f2, w2.browser), t4[c] = typeof (e3 = t4[p]) === o ? e3.replace(/[^\d\.]/g, "").split(".")[0] : void 0, v2 && r3 && r3.brave && typeof r3.brave.isBrave == i2 && (t4[u] = "Brave"), t4;
            }, this.getCPU = function() {
              var e3 = {};
              return e3[m] = void 0, W.call(e3, f2, w2.cpu), e3;
            }, this.getDevice = function() {
              var e3 = {};
              return e3[d] = void 0, e3[l] = void 0, e3[h] = void 0, W.call(e3, f2, w2.device), v2 && !e3[h] && b2 && b2.mobile && (e3[h] = g), v2 && "Macintosh" == e3[l] && r3 && typeof r3.standalone !== n2 && r3.maxTouchPoints && r3.maxTouchPoints > 2 && (e3[l] = "iPad", e3[h] = y), e3;
            }, this.getEngine = function() {
              var e3 = {};
              return e3[u] = void 0, e3[p] = void 0, W.call(e3, f2, w2.engine), e3;
            }, this.getOS = function() {
              var e3 = {};
              return e3[u] = void 0, e3[p] = void 0, W.call(e3, f2, w2.os), v2 && !e3[u] && b2 && "Unknown" != b2.platform && (e3[u] = b2.platform.replace(/chrome os/i, q).replace(/macos/i, z)), e3;
            }, this.getResult = function() {
              return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
            }, this.getUA = function() {
              return f2;
            }, this.setUA = function(e3) {
              return f2 = typeof e3 === o && e3.length > 350 ? F(e3, 350) : e3, this;
            }, this.setUA(f2), this;
          };
          if (X.VERSION = "1.0.35", X.BROWSER = $([u, p, c]), X.CPU = $([m]), X.DEVICE = $([l, d, h, f, g, b, y, w, v]), X.ENGINE = X.OS = $([u, p]), typeof r2 !== n2) t2.exports && (r2 = t2.exports = X), r2.UAParser = X;
          else if (typeof define === i2 && define.amd) e.r, void 0 !== X && e.v(X);
          else typeof s2 !== n2 && (s2.UAParser = X);
          var Y = typeof s2 !== n2 && (s2.jQuery || s2.Zepto);
          if (Y && !Y.ua) {
            var Q = new X();
            Y.ua = Q.getResult(), Y.ua.get = function() {
              return Q.getUA();
            }, Y.ua.set = function(e2) {
              Q.setUA(e2);
              var t3 = Q.getResult();
              for (var r3 in t3) Y.ua[r3] = t3[r3];
            };
          }
        }(this);
      } }, i = {};
      function n(e2) {
        var t2 = i[e2];
        if (void 0 !== t2) return t2.exports;
        var r2 = i[e2] = { exports: {} }, a = true;
        try {
          s[e2].call(r2.exports, r2, r2.exports, n), a = false;
        } finally {
          a && delete i[e2];
        }
        return r2.exports;
      }
      n.ab = "/ROOT/node_modules/.pnpm/next@16.2.3_@babel+core@7.2_7615a97fca7fd705b5e52339c323f144/node_modules/next/dist/compiled/ua-parser-js/", t.exports = n(226);
    }, 21760, (e, t, r) => {
      t.exports = { name: "next", version: "16.2.3", description: "The React Framework", main: "./dist/server/next.js", license: "MIT", repository: "vercel/next.js", bugs: "https://github.com/vercel/next.js/issues", homepage: "https://nextjs.org", types: "index.d.ts", files: ["dist", "app.js", "app.d.ts", "babel.js", "babel.d.ts", "client.js", "client.d.ts", "compat", "cache.js", "cache.d.ts", "constants.js", "constants.d.ts", "document.js", "document.d.ts", "dynamic.js", "dynamic.d.ts", "error.js", "error.d.ts", "future", "legacy", "script.js", "script.d.ts", "server.js", "server.d.ts", "head.js", "head.d.ts", "image.js", "image.d.ts", "link.js", "link.d.ts", "form.js", "form.d.ts", "router.js", "router.d.ts", "jest.js", "jest.d.ts", "og.js", "og.d.ts", "root-params.js", "root-params.d.ts", "types.d.ts", "types.js", "index.d.ts", "types/global.d.ts", "types/compiled.d.ts", "image-types/global.d.ts", "navigation-types/navigation.d.ts", "navigation-types/compat/navigation.d.ts", "font", "navigation.js", "navigation.d.ts", "headers.js", "headers.d.ts", "navigation-types", "web-vitals.js", "web-vitals.d.ts", "experimental/testing/server.js", "experimental/testing/server.d.ts", "experimental/testmode/playwright.js", "experimental/testmode/playwright.d.ts", "experimental/testmode/playwright/msw.js", "experimental/testmode/playwright/msw.d.ts", "experimental/testmode/proxy.js", "experimental/testmode/proxy.d.ts"], bin: { next: "./dist/bin/next" }, scripts: { dev: "cross-env NEXT_SERVER_NO_MANGLE=1 taskr", build: "taskr release", prepublishOnly: "cd ../../ && turbo run build", types: "tsc --project tsconfig.build.json --declaration --emitDeclarationOnly --stripInternal --declarationDir dist", typescript: "tsec --noEmit", "ncc-compiled": "taskr ncc", storybook: "BROWSER=none storybook dev -p 6006", "build-storybook": "storybook build", "test-storybook": "test-storybook" }, taskr: { requires: ["./taskfile-webpack.js", "./taskfile-ncc.js", "./taskfile-swc.js", "./taskfile-watch.js"] }, dependencies: { "@next/env": "16.2.3", "@swc/helpers": "0.5.15", "baseline-browser-mapping": "^2.9.19", "caniuse-lite": "^1.0.30001579", postcss: "8.4.31", "styled-jsx": "5.1.6" }, peerDependencies: { "@opentelemetry/api": "^1.1.0", "@playwright/test": "^1.51.1", "babel-plugin-react-compiler": "*", react: "^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0", "react-dom": "^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0", sass: "^1.3.0" }, peerDependenciesMeta: { "babel-plugin-react-compiler": { optional: true }, sass: { optional: true }, "@opentelemetry/api": { optional: true }, "@playwright/test": { optional: true } }, optionalDependencies: { sharp: "^0.34.5", "@next/swc-darwin-arm64": "16.2.3", "@next/swc-darwin-x64": "16.2.3", "@next/swc-linux-arm64-gnu": "16.2.3", "@next/swc-linux-arm64-musl": "16.2.3", "@next/swc-linux-x64-gnu": "16.2.3", "@next/swc-linux-x64-musl": "16.2.3", "@next/swc-win32-arm64-msvc": "16.2.3", "@next/swc-win32-x64-msvc": "16.2.3" }, devDependencies: { "@babel/core": "7.26.10", "@babel/eslint-parser": "7.24.6", "@babel/generator": "7.27.0", "@babel/plugin-syntax-bigint": "7.8.3", "@babel/plugin-syntax-dynamic-import": "7.8.3", "@babel/plugin-syntax-import-attributes": "7.26.0", "@babel/plugin-syntax-jsx": "7.25.9", "@babel/plugin-syntax-typescript": "7.25.4", "@babel/plugin-transform-class-properties": "7.25.9", "@babel/plugin-transform-export-namespace-from": "7.25.9", "@babel/plugin-transform-modules-commonjs": "7.26.3", "@babel/plugin-transform-numeric-separator": "7.25.9", "@babel/plugin-transform-object-rest-spread": "7.25.9", "@babel/plugin-transform-runtime": "7.26.10", "@babel/preset-env": "7.26.9", "@babel/preset-react": "7.26.3", "@babel/preset-typescript": "7.27.0", "@babel/runtime": "7.27.0", "@babel/traverse": "7.27.0", "@babel/types": "7.27.0", "@base-ui-components/react": "1.0.0-beta.2", "@capsizecss/metrics": "3.4.0", "@edge-runtime/cookies": "6.0.0", "@edge-runtime/ponyfill": "4.0.0", "@edge-runtime/primitives": "6.0.0", "@hapi/accept": "5.0.2", "@jest/transform": "29.5.0", "@jest/types": "29.5.0", "@modelcontextprotocol/sdk": "1.18.1", "@mswjs/interceptors": "0.23.0", "@napi-rs/triples": "1.2.0", "@next/font": "16.2.3", "@next/polyfill-module": "16.2.3", "@next/polyfill-nomodule": "16.2.3", "@next/react-refresh-utils": "16.2.3", "@next/swc": "16.2.3", "@opentelemetry/api": "1.6.0", "@playwright/test": "1.58.2", "@rspack/core": "1.6.7", "@storybook/addon-a11y": "8.6.0", "@storybook/addon-essentials": "8.6.0", "@storybook/addon-interactions": "8.6.0", "@storybook/addon-webpack5-compiler-swc": "3.0.0", "@storybook/blocks": "8.6.0", "@storybook/react": "8.6.0", "@storybook/react-webpack5": "8.6.0", "@storybook/test": "8.6.0", "@storybook/test-runner": "0.21.0", "@swc/core": "1.11.24", "@swc/types": "0.1.7", "@taskr/clear": "1.1.0", "@taskr/esnext": "1.1.0", "@types/babel__code-frame": "7.0.6", "@types/babel__core": "7.20.5", "@types/babel__generator": "7.27.0", "@types/babel__template": "7.4.4", "@types/babel__traverse": "7.20.7", "@types/bytes": "3.1.1", "@types/ci-info": "2.0.0", "@types/compression": "0.0.36", "@types/content-disposition": "0.5.4", "@types/content-type": "1.1.3", "@types/cookie": "0.3.3", "@types/cross-spawn": "6.0.0", "@types/debug": "4.1.5", "@types/express-serve-static-core": "4.17.33", "@types/fresh": "0.5.0", "@types/glob": "7.1.1", "@types/jsonwebtoken": "9.0.0", "@types/lodash": "4.14.198", "@types/lodash.curry": "4.1.6", "@types/path-to-regexp": "1.7.0", "@types/picomatch": "2.3.3", "@types/platform": "1.3.4", "@types/react": "19.0.8", "@types/react-dom": "19.0.3", "@types/react-is": "18.2.4", "@types/semver": "7.3.1", "@types/send": "0.14.4", "@types/serve-handler": "6.1.4", "@types/shell-quote": "1.7.1", "@types/text-table": "0.2.1", "@types/ua-parser-js": "0.7.36", "@types/webpack-sources1": "npm:@types/webpack-sources@0.1.5", "@types/ws": "8.2.0", "@vercel/ncc": "0.34.0", "@vercel/nft": "0.27.1", "@vercel/routing-utils": "5.2.0", "@vercel/turbopack-ecmascript-runtime": "*", acorn: "8.14.0", anser: "1.4.9", arg: "4.1.0", assert: "2.0.0", "async-retry": "1.2.3", "async-sema": "3.0.0", "axe-playwright": "2.0.3", "babel-loader": "10.0.0", "babel-plugin-react-compiler": "0.0.0-experimental-1371fcb-20260227", "babel-plugin-transform-define": "2.0.0", "babel-plugin-transform-react-remove-prop-types": "0.4.24", "browserify-zlib": "0.2.0", browserslist: "4.28.1", buffer: "5.6.0", busboy: "1.6.0", bytes: "3.1.1", "ci-info": "watson/ci-info#f43f6a1cefff47fb361c88cf4b943fdbcaafe540", "cli-select": "1.1.2", "client-only": "0.0.1", commander: "12.1.0", "comment-json": "3.0.3", compression: "1.7.4", conf: "5.0.0", "constants-browserify": "1.0.0", "content-disposition": "0.5.3", "content-type": "1.0.4", cookie: "0.4.1", "cross-env": "6.0.3", "cross-spawn": "7.0.3", "crypto-browserify": "3.12.0", "css-loader": "7.1.2", "css.escape": "1.5.1", "cssnano-preset-default": "7.0.6", "data-uri-to-buffer": "3.0.1", debug: "4.1.1", devalue: "2.0.1", "domain-browser": "4.19.0", "edge-runtime": "4.0.1", events: "3.3.0", "find-up": "4.1.0", fresh: "0.5.2", glob: "7.1.7", "gzip-size": "5.1.1", "http-proxy": "1.18.1", "http-proxy-agent": "5.0.0", "https-browserify": "1.0.0", "https-proxy-agent": "5.0.1", "icss-utils": "5.1.0", "ignore-loader": "0.1.2", "image-size": "1.2.1", "ipaddr.js": "2.2.0", "is-docker": "2.0.0", "is-wsl": "2.2.0", "jest-worker": "27.5.1", json5: "2.2.3", jsonwebtoken: "9.0.0", "loader-runner": "4.3.0", "loader-utils2": "npm:loader-utils@2.0.4", "loader-utils3": "npm:loader-utils@3.1.3", "lodash.curry": "4.1.1", "mini-css-extract-plugin": "2.4.4", msw: "2.3.0", nanoid: "3.1.32", "native-url": "0.3.4", "neo-async": "2.6.1", "node-html-parser": "5.3.3", ora: "4.0.4", "os-browserify": "0.3.0", "p-limit": "3.1.0", "p-queue": "6.6.2", "path-browserify": "1.0.1", "path-to-regexp": "6.3.0", picomatch: "4.0.1", "postcss-flexbugs-fixes": "5.0.2", "postcss-modules-extract-imports": "3.0.0", "postcss-modules-local-by-default": "4.2.0", "postcss-modules-scope": "3.0.0", "postcss-modules-values": "4.0.0", "postcss-preset-env": "7.4.3", "postcss-safe-parser": "6.0.0", "postcss-scss": "4.0.3", "postcss-value-parser": "4.2.0", process: "0.11.10", punycode: "2.1.1", "querystring-es3": "0.2.1", "raw-body": "2.4.1", "react-refresh": "0.12.0", recast: "0.23.11", "regenerator-runtime": "0.13.4", "safe-stable-stringify": "2.5.0", "sass-loader": "16.0.5", "schema-utils2": "npm:schema-utils@2.7.1", "schema-utils3": "npm:schema-utils@3.0.0", semver: "7.3.2", send: "0.18.0", "serve-handler": "6.1.6", "server-only": "0.0.1", setimmediate: "1.0.5", "shell-quote": "1.7.3", "source-map": "0.6.1", "source-map-loader": "5.0.0", "source-map08": "npm:source-map@0.8.0-beta.0", "stacktrace-parser": "0.1.10", storybook: "8.6.0", "stream-browserify": "3.0.0", "stream-http": "3.1.1", "strict-event-emitter": "0.5.0", "string-hash": "1.1.3", string_decoder: "1.3.0", "strip-ansi": "6.0.0", "style-loader": "4.0.0", superstruct: "1.0.3", tar: "7.5.11", taskr: "1.1.0", terser: "5.27.0", "terser-webpack-plugin": "5.3.9", "text-table": "0.2.0", "timers-browserify": "2.0.12", "tty-browserify": "0.0.1", typescript: "5.9.2", "ua-parser-js": "1.0.35", unistore: "3.4.1", util: "0.12.4", "vm-browserify": "1.1.2", watchpack: "2.4.0", "web-vitals": "4.2.1", webpack: "5.98.0", "webpack-sources1": "npm:webpack-sources@1.4.3", "webpack-sources3": "npm:webpack-sources@3.2.3", ws: "8.2.3", zod: "3.25.76", "zod-validation-error": "3.4.0" }, keywords: ["react", "framework", "nextjs", "web", "server", "node", "front-end", "backend", "cli", "vercel"], engines: { node: ">=20.9.0" } };
    }, 14595, (e, t, r) => {
      "use strict";
      var s = Object.defineProperty, i = Object.getOwnPropertyDescriptor, n = Object.getOwnPropertyNames, a = Object.prototype.hasOwnProperty, o = {}, c = { Analytics: () => p };
      for (var l in c) s(o, l, { get: c[l], enumerable: true });
      t.exports = ((e2, t2, r2, o2) => {
        if (t2 && "object" == typeof t2 || "function" == typeof t2) for (let c2 of n(t2)) a.call(e2, c2) || c2 === r2 || s(e2, c2, { get: () => t2[c2], enumerable: !(o2 = i(t2, c2)) || o2.enumerable });
        return e2;
      })(s({}, "__esModule", { value: true }), o);
      var u = `
local key = KEYS[1]
local field = ARGV[1]

local data = redis.call("ZRANGE", key, 0, -1, "WITHSCORES")
local count = {}

for i = 1, #data, 2 do
  local json_str = data[i]
  local score = tonumber(data[i + 1])
  local obj = cjson.decode(json_str)

  local fieldValue = obj[field]

  if count[fieldValue] == nil then
    count[fieldValue] = score
  else
    count[fieldValue] = count[fieldValue] + score
  end
end

local result = {}
for k, v in pairs(count) do
  table.insert(result, {k, v})
end

return result
`, h = `
local prefix = KEYS[1]
local first_timestamp = tonumber(ARGV[1]) -- First timestamp to check
local increment = tonumber(ARGV[2])       -- Increment between each timestamp
local num_timestamps = tonumber(ARGV[3])  -- Number of timestampts to check (24 for a day and 24 * 7 for a week)
local num_elements = tonumber(ARGV[4])    -- Number of elements to fetch in each category
local check_at_most = tonumber(ARGV[5])   -- Number of elements to check at most.

local keys = {}
for i = 1, num_timestamps do
  local timestamp = first_timestamp - (i - 1) * increment
  table.insert(keys, prefix .. ":" .. timestamp)
end

-- get the union of the groups
local zunion_params = {"ZUNION", num_timestamps, unpack(keys)}
table.insert(zunion_params, "WITHSCORES")
local result = redis.call(unpack(zunion_params))

-- select num_elements many items
local true_group = {}
local false_group = {}
local denied_group = {}
local true_count = 0
local false_count = 0
local denied_count = 0
local i = #result - 1

-- index to stop at after going through "checkAtMost" many items:
local cutoff_index = #result - 2 * check_at_most

-- iterate over the results
while (true_count + false_count + denied_count) < (num_elements * 3) and 1 <= i and i >= cutoff_index do
  local score = tonumber(result[i + 1])
  if score > 0 then
    local element = result[i]
    if string.find(element, "success\\":true") and true_count < num_elements then
      table.insert(true_group, {score, element})
      true_count = true_count + 1
    elseif string.find(element, "success\\":false") and false_count < num_elements then
      table.insert(false_group, {score, element})
      false_count = false_count + 1
    elseif string.find(element, "success\\":\\"denied") and denied_count < num_elements then
      table.insert(denied_group, {score, element})
      denied_count = denied_count + 1
    end
  end
  i = i - 2
end

return {true_group, false_group, denied_group}
`, d = `
local prefix = KEYS[1]
local first_timestamp = tonumber(ARGV[1])
local increment = tonumber(ARGV[2])
local num_timestamps = tonumber(ARGV[3])

local keys = {}
for i = 1, num_timestamps do
  local timestamp = first_timestamp - (i - 1) * increment
  table.insert(keys, prefix .. ":" .. timestamp)
end

-- get the union of the groups
local zunion_params = {"ZUNION", num_timestamps, unpack(keys)}
table.insert(zunion_params, "WITHSCORES")
local result = redis.call(unpack(zunion_params))

return result
`, p = class {
        redis;
        prefix;
        bucketSize;
        constructor(e2) {
          this.redis = e2.redis, this.prefix = e2.prefix ?? "@upstash/analytics", this.bucketSize = this.parseWindow(e2.window);
        }
        validateTableName(e2) {
          if (!/^[a-zA-Z0-9_-]+$/.test(e2)) throw Error(`Invalid table name: ${e2}. Table names can only contain letters, numbers, dashes and underscores.`);
        }
        parseWindow(e2) {
          if ("number" == typeof e2) {
            if (e2 <= 0) throw Error(`Invalid window: ${e2}`);
            return e2;
          }
          let t2 = /^(\d+)([smhd])$/;
          if (!t2.test(e2)) throw Error(`Invalid window: ${e2}`);
          let [, r2, s2] = e2.match(t2), i2 = parseInt(r2);
          switch (s2) {
            case "s":
              return 1e3 * i2;
            case "m":
              return 1e3 * i2 * 60;
            case "h":
              return 1e3 * i2 * 3600;
            case "d":
              return 1e3 * i2 * 86400;
            default:
              throw Error(`Invalid window unit: ${s2}`);
          }
        }
        getBucket(e2) {
          return Math.floor((e2 ?? Date.now()) / this.bucketSize) * this.bucketSize;
        }
        async ingest(e2, ...t2) {
          this.validateTableName(e2), await Promise.all(t2.map(async (t3) => {
            let r2 = this.getBucket(t3.time), s2 = [this.prefix, e2, r2].join(":");
            await this.redis.zincrby(s2, 1, JSON.stringify({ ...t3, time: void 0 }));
          }));
        }
        formatBucketAggregate(e2, t2, r2) {
          let s2 = {};
          return e2.forEach(([e3, r3]) => {
            "success" == t2 && (e3 = 1 === e3 ? "true" : null === e3 ? "false" : e3), s2[t2] = s2[t2] || {}, s2[t2][(e3 ?? "null").toString()] = r3;
          }), { time: r2, ...s2 };
        }
        async aggregateBucket(e2, t2, r2) {
          this.validateTableName(e2);
          let s2 = this.getBucket(r2), i2 = [this.prefix, e2, s2].join(":"), n2 = await this.redis.eval(u, [i2], [t2]);
          return this.formatBucketAggregate(n2, t2, s2);
        }
        async aggregateBuckets(e2, t2, r2, s2) {
          this.validateTableName(e2);
          let i2 = this.getBucket(s2), n2 = [];
          for (let s3 = 0; s3 < r2; s3 += 1) n2.push(this.aggregateBucket(e2, t2, i2)), i2 -= this.bucketSize;
          return Promise.all(n2);
        }
        async aggregateBucketsWithPipeline(e2, t2, r2, s2, i2) {
          this.validateTableName(e2), i2 = i2 ?? 48;
          let n2 = this.getBucket(s2), a2 = [], o2 = this.redis.pipeline(), c2 = [];
          for (let s3 = 1; s3 <= r2; s3 += 1) {
            let l2 = [this.prefix, e2, n2].join(":");
            o2.eval(u, [l2], [t2]), a2.push(n2), n2 -= this.bucketSize, (s3 % i2 == 0 || s3 == r2) && (c2.push(o2.exec()), o2 = this.redis.pipeline());
          }
          return (await Promise.all(c2)).flat().map((e3, r3) => this.formatBucketAggregate(e3, t2, a2[r3]));
        }
        async getAllowedBlocked(e2, t2, r2) {
          this.validateTableName(e2);
          let s2 = [this.prefix, e2].join(":"), i2 = this.getBucket(r2), n2 = await this.redis.eval(d, [s2], [i2, this.bucketSize, t2]), a2 = {};
          for (let e3 = 0; e3 < n2.length; e3 += 2) {
            let t3 = n2[e3], r3 = t3.identifier, s3 = +n2[e3 + 1];
            a2[r3] || (a2[r3] = { success: 0, blocked: 0 }), a2[r3][t3.success ? "success" : "blocked"] = s3;
          }
          return a2;
        }
        async getMostAllowedBlocked(e2, t2, r2, s2, i2) {
          this.validateTableName(e2);
          let n2 = [this.prefix, e2].join(":"), a2 = this.getBucket(s2), [o2, c2, l2] = await this.redis.eval(h, [n2], [a2, this.bucketSize, t2, r2, i2 ?? 5 * r2]);
          return { allowed: this.toDicts(o2), ratelimited: this.toDicts(c2), denied: this.toDicts(l2) };
        }
        toDicts(e2) {
          let t2 = [];
          for (let r2 = 0; r2 < e2.length; r2 += 1) {
            let s2 = +e2[r2][0], i2 = e2[r2][1];
            t2.push({ identifier: i2.identifier, count: s2 });
          }
          return t2;
        }
      };
    }, 15834, (e, t, r) => {
      "use strict";
      var s = Object.defineProperty, i = Object.getOwnPropertyDescriptor, n = Object.getOwnPropertyNames, a = Object.prototype.hasOwnProperty, o = (e2, t2) => {
        for (var r2 in t2) s(e2, r2, { get: t2[r2], enumerable: true });
      }, c = {};
      o(c, { Analytics: () => u, IpDenyList: () => k, MultiRegionRatelimit: () => I, Ratelimit: () => N }), t.exports = ((e2, t2, r2, o2) => {
        if (t2 && "object" == typeof t2 || "function" == typeof t2) for (let c2 of n(t2)) a.call(e2, c2) || c2 === r2 || s(e2, c2, { get: () => t2[c2], enumerable: !(o2 = i(t2, c2)) || o2.enumerable });
        return e2;
      })(s({}, "__esModule", { value: true }), c);
      var l = e.r(14595), u = class {
        analytics;
        table = "events";
        constructor(e2) {
          this.analytics = new l.Analytics({ redis: e2.redis, window: "1h", prefix: e2.prefix ?? "@upstash/ratelimit", retention: "90d" });
        }
        extractGeo(e2) {
          return void 0 !== e2.geo ? e2.geo : void 0 !== e2.cf ? e2.cf : {};
        }
        async record(e2) {
          await this.analytics.ingest(this.table, e2);
        }
        async series(e2, t2) {
          let r2 = Math.min((this.analytics.getBucket(Date.now()) - this.analytics.getBucket(t2)) / 36e5, 256);
          return this.analytics.aggregateBucketsWithPipeline(this.table, e2, r2);
        }
        async getUsage(e2 = 0) {
          let t2 = Math.min((this.analytics.getBucket(Date.now()) - this.analytics.getBucket(e2)) / 36e5, 256);
          return await this.analytics.getAllowedBlocked(this.table, t2);
        }
        async getUsageOverTime(e2, t2) {
          return await this.analytics.aggregateBucketsWithPipeline(this.table, t2, e2);
        }
        async getMostAllowedBlocked(e2, t2, r2) {
          return t2 = t2 ?? 5, this.analytics.getMostAllowedBlocked(this.table, e2, t2, void 0, r2);
        }
      }, h = class {
        cache;
        constructor(e2) {
          this.cache = e2;
        }
        isBlocked(e2) {
          if (!this.cache.has(e2)) return { blocked: false, reset: 0 };
          let t2 = this.cache.get(e2);
          return t2 < Date.now() ? (this.cache.delete(e2), { blocked: false, reset: 0 }) : { blocked: true, reset: t2 };
        }
        blockUntil(e2, t2) {
          this.cache.set(e2, t2);
        }
        set(e2, t2) {
          this.cache.set(e2, t2);
        }
        get(e2) {
          return this.cache.get(e2) || null;
        }
        incr(e2, t2 = 1) {
          let r2 = this.cache.get(e2) ?? 0;
          return r2 += t2, this.cache.set(e2, r2), r2;
        }
        pop(e2) {
          this.cache.delete(e2);
        }
        empty() {
          this.cache.clear();
        }
        size() {
          return this.cache.size;
        }
      }, d = ":dynamic:global", p = "@upstash/ratelimit";
      function m(e2) {
        let t2 = e2.match(/^(\d+)\s?(ms|s|m|h|d)$/);
        if (!t2) throw Error(`Unable to parse window size: ${e2}`);
        let r2 = Number.parseInt(t2[1]);
        switch (t2[2]) {
          case "ms":
            return r2;
          case "s":
            return 1e3 * r2;
          case "m":
            return 1e3 * r2 * 60;
          case "h":
            return 1e3 * r2 * 3600;
          case "d":
            return 1e3 * r2 * 86400;
          default:
            throw Error(`Unable to parse window size: ${e2}`);
        }
      }
      var f = async (e2, t2, r2, s2) => {
        try {
          return await e2.redis.evalsha(t2.hash, r2, s2);
        } catch (i2) {
          if (`${i2}`.includes("NOSCRIPT")) return await e2.redis.eval(t2.script, r2, s2);
          throw i2;
        }
      }, g = { fixedWindow: { limit: { script: `
  local key           = KEYS[1]
  local dynamicLimitKey = KEYS[2]  -- optional: key for dynamic limit in redis
  local tokens        = tonumber(ARGV[1])  -- default limit
  local window        = ARGV[2]
  local incrementBy   = ARGV[3] -- increment rate per request at a given value, default is 1

  -- Check for dynamic limit
  local effectiveLimit = tokens
  if dynamicLimitKey ~= "" then
    local dynamicLimit = redis.call("GET", dynamicLimitKey)
    if dynamicLimit then
      effectiveLimit = tonumber(dynamicLimit)
    end
  end

  local r = redis.call("INCRBY", key, incrementBy)
  if r == tonumber(incrementBy) then
  -- The first time this key is set, the value will be equal to incrementBy.
  -- So we only need the expire command once
  redis.call("PEXPIRE", key, window)
  end

  return {r, effectiveLimit}
`, hash: "472e55443b62f60d0991028456c57815a387066d" }, getRemaining: { script: `
  local key = KEYS[1]
  local dynamicLimitKey = KEYS[2]  -- optional: key for dynamic limit in redis
  local tokens = tonumber(ARGV[1])  -- default limit

  -- Check for dynamic limit
  local effectiveLimit = tokens
  if dynamicLimitKey ~= "" then
    local dynamicLimit = redis.call("GET", dynamicLimitKey)
    if dynamicLimit then
      effectiveLimit = tonumber(dynamicLimit)
    end
  end

  local value = redis.call('GET', key)
  local usedTokens = 0
  if value then
    usedTokens = tonumber(value)
  end
  
  return {effectiveLimit - usedTokens, effectiveLimit}
`, hash: "40515c9dd0a08f8584f5f9b593935f6a87c1c1c3" } }, slidingWindow: { limit: { script: `
  local currentKey  = KEYS[1]           -- identifier including prefixes
  local previousKey = KEYS[2]           -- key of the previous bucket
  local dynamicLimitKey = KEYS[3]       -- optional: key for dynamic limit in redis
  local tokens      = tonumber(ARGV[1]) -- default tokens per window
  local now         = ARGV[2]           -- current timestamp in milliseconds
  local window      = ARGV[3]           -- interval in milliseconds
  local incrementBy = tonumber(ARGV[4]) -- increment rate per request at a given value, default is 1

  -- Check for dynamic limit
  local effectiveLimit = tokens
  if dynamicLimitKey ~= "" then
    local dynamicLimit = redis.call("GET", dynamicLimitKey)
    if dynamicLimit then
      effectiveLimit = tonumber(dynamicLimit)
    end
  end

  local requestsInCurrentWindow = redis.call("GET", currentKey)
  if requestsInCurrentWindow == false then
    requestsInCurrentWindow = 0
  end

  local requestsInPreviousWindow = redis.call("GET", previousKey)
  if requestsInPreviousWindow == false then
    requestsInPreviousWindow = 0
  end
  local percentageInCurrent = ( now % window ) / window
  -- weighted requests to consider from the previous window
  requestsInPreviousWindow = math.floor(( 1 - percentageInCurrent ) * requestsInPreviousWindow)

  -- Only check limit if not refunding (negative rate)
  if incrementBy > 0 and requestsInPreviousWindow + requestsInCurrentWindow >= effectiveLimit then
    return {-1, effectiveLimit}
  end

  local newValue = redis.call("INCRBY", currentKey, incrementBy)
  if newValue == incrementBy then
    -- The first time this key is set, the value will be equal to incrementBy.
    -- So we only need the expire command once
    redis.call("PEXPIRE", currentKey, window * 2 + 1000) -- Enough time to overlap with a new window + 1 second
  end
  return {effectiveLimit - ( newValue + requestsInPreviousWindow ), effectiveLimit}
`, hash: "977fb636fb5ceb7e98a96d1b3a1272ba018efdae" }, getRemaining: { script: `
  local currentKey  = KEYS[1]           -- identifier including prefixes
  local previousKey = KEYS[2]           -- key of the previous bucket
  local dynamicLimitKey = KEYS[3]       -- optional: key for dynamic limit in redis
  local tokens      = tonumber(ARGV[1]) -- default tokens per window
  local now         = ARGV[2]           -- current timestamp in milliseconds
  local window      = ARGV[3]           -- interval in milliseconds

  -- Check for dynamic limit
  local effectiveLimit = tokens
  if dynamicLimitKey ~= "" then
    local dynamicLimit = redis.call("GET", dynamicLimitKey)
    if dynamicLimit then
      effectiveLimit = tonumber(dynamicLimit)
    end
  end

  local requestsInCurrentWindow = redis.call("GET", currentKey)
  if requestsInCurrentWindow == false then
    requestsInCurrentWindow = 0
  end

  local requestsInPreviousWindow = redis.call("GET", previousKey)
  if requestsInPreviousWindow == false then
    requestsInPreviousWindow = 0
  end

  local percentageInCurrent = ( now % window ) / window
  -- weighted requests to consider from the previous window
  requestsInPreviousWindow = math.floor(( 1 - percentageInCurrent ) * requestsInPreviousWindow)

  local usedTokens = requestsInPreviousWindow + requestsInCurrentWindow
  return {effectiveLimit - usedTokens, effectiveLimit}
`, hash: "ee3a3265fad822f83acad23f8a1e2f5c0b156b03" } }, tokenBucket: { limit: { script: `
  local key         = KEYS[1]           -- identifier including prefixes
  local dynamicLimitKey = KEYS[2]       -- optional: key for dynamic limit in redis
  local maxTokens   = tonumber(ARGV[1]) -- default maximum number of tokens
  local interval    = tonumber(ARGV[2]) -- size of the window in milliseconds
  local refillRate  = tonumber(ARGV[3]) -- how many tokens are refilled after each interval
  local now         = tonumber(ARGV[4]) -- current timestamp in milliseconds
  local incrementBy = tonumber(ARGV[5]) -- how many tokens to consume, default is 1

  -- Check for dynamic limit
  local effectiveLimit = maxTokens
  if dynamicLimitKey ~= "" then
    local dynamicLimit = redis.call("GET", dynamicLimitKey)
    if dynamicLimit then
      effectiveLimit = tonumber(dynamicLimit)
    end
  end
        
  local bucket = redis.call("HMGET", key, "refilledAt", "tokens")
        
  local refilledAt
  local tokens

  if bucket[1] == false then
    refilledAt = now
    tokens = effectiveLimit
  else
    refilledAt = tonumber(bucket[1])
    tokens = tonumber(bucket[2])
  end
        
  if now >= refilledAt + interval then
    local numRefills = math.floor((now - refilledAt) / interval)
    tokens = math.min(effectiveLimit, tokens + numRefills * refillRate)

    refilledAt = refilledAt + numRefills * interval
  end

  -- Only reject if tokens are 0 and we're consuming (not refunding)
  if tokens == 0 and incrementBy > 0 then
    return {-1, refilledAt + interval, effectiveLimit}
  end

  local remaining = tokens - incrementBy
  local expireAt = math.ceil(((effectiveLimit - remaining) / refillRate)) * interval
        
  redis.call("HSET", key, "refilledAt", refilledAt, "tokens", remaining)

  if (expireAt > 0) then
    redis.call("PEXPIRE", key, expireAt)
  end
  return {remaining, refilledAt + interval, effectiveLimit}
`, hash: "b35c5bc0b7fdae7dd0573d4529911cabaf9d1d89" }, getRemaining: { script: `
  local key         = KEYS[1]
  local dynamicLimitKey = KEYS[2]       -- optional: key for dynamic limit in redis
  local maxTokens   = tonumber(ARGV[1]) -- default maximum number of tokens

  -- Check for dynamic limit
  local effectiveLimit = maxTokens
  if dynamicLimitKey ~= "" then
    local dynamicLimit = redis.call("GET", dynamicLimitKey)
    if dynamicLimit then
      effectiveLimit = tonumber(dynamicLimit)
    end
  end
        
  local bucket = redis.call("HMGET", key, "refilledAt", "tokens")

  if bucket[1] == false then
    return {effectiveLimit, -1, effectiveLimit}
  end
        
  return {tonumber(bucket[2]), tonumber(bucket[1]), effectiveLimit}
`, hash: "deb03663e8af5a968deee895dd081be553d2611b" } }, cachedFixedWindow: { limit: { script: `
  local key     = KEYS[1]
  local window  = ARGV[1]
  local incrementBy   = ARGV[2] -- increment rate per request at a given value, default is 1

  local r = redis.call("INCRBY", key, incrementBy)
  if r == incrementBy then
  -- The first time this key is set, the value will be equal to incrementBy.
  -- So we only need the expire command once
  redis.call("PEXPIRE", key, window)
  end
      
  return r
`, hash: "c26b12703dd137939b9a69a3a9b18e906a2d940f" }, getRemaining: { script: `
  local key = KEYS[1]
  local tokens = 0

  local value = redis.call('GET', key)
  if value then
      tokens = value
  end
  return tokens
`, hash: "8e8f222ccae68b595ee6e3f3bf2199629a62b91a" } } }, y = { fixedWindow: { limit: { script: `
	local key           = KEYS[1]
	local id            = ARGV[1]
	local window        = ARGV[2]
	local incrementBy   = tonumber(ARGV[3])

	redis.call("HSET", key, id, incrementBy)
	local fields = redis.call("HGETALL", key)
	if #fields == 2 and tonumber(fields[2])==incrementBy then
	-- The first time this key is set, and the value will be equal to incrementBy.
	-- So we only need the expire command once
	  redis.call("PEXPIRE", key, window)
	end

	return fields
`, hash: "a8c14f3835aa87bd70e5e2116081b81664abcf5c" }, getRemaining: { script: `
      local key = KEYS[1]
      local tokens = 0

      local fields = redis.call("HGETALL", key)

      return fields
    `, hash: "8ab8322d0ed5fe5ac8eb08f0c2e4557f1b4816fd" } }, slidingWindow: { limit: { script: `
	local currentKey    = KEYS[1]           -- identifier including prefixes
	local previousKey   = KEYS[2]           -- key of the previous bucket
	local tokens        = tonumber(ARGV[1]) -- tokens per window
	local now           = ARGV[2]           -- current timestamp in milliseconds
	local window        = ARGV[3]           -- interval in milliseconds
	local requestId     = ARGV[4]           -- uuid for this request
	local incrementBy   = tonumber(ARGV[5]) -- custom rate, default is  1

	local currentFields = redis.call("HGETALL", currentKey)
	local requestsInCurrentWindow = 0
	for i = 2, #currentFields, 2 do
	requestsInCurrentWindow = requestsInCurrentWindow + tonumber(currentFields[i])
	end

	local previousFields = redis.call("HGETALL", previousKey)
	local requestsInPreviousWindow = 0
	for i = 2, #previousFields, 2 do
	requestsInPreviousWindow = requestsInPreviousWindow + tonumber(previousFields[i])
	end

	local percentageInCurrent = ( now % window) / window

	-- Only check limit if not refunding (negative rate)
	if incrementBy > 0 and requestsInPreviousWindow * (1 - percentageInCurrent ) + requestsInCurrentWindow + incrementBy > tokens then
	  return {currentFields, previousFields, false}
	end

	redis.call("HSET", currentKey, requestId, incrementBy)

	if requestsInCurrentWindow == 0 then 
	  -- The first time this key is set, the value will be equal to incrementBy.
	  -- So we only need the expire command once
	  redis.call("PEXPIRE", currentKey, window * 2 + 1000) -- Enough time to overlap with a new window + 1 second
	end
	return {currentFields, previousFields, true}
`, hash: "1e7ca8dcd2d600a6d0124a67a57ea225ed62921b" }, getRemaining: { script: `
	local currentKey    = KEYS[1]           -- identifier including prefixes
	local previousKey   = KEYS[2]           -- key of the previous bucket
	local now         	= ARGV[1]           -- current timestamp in milliseconds
  	local window      	= ARGV[2]           -- interval in milliseconds

	local currentFields = redis.call("HGETALL", currentKey)
	local requestsInCurrentWindow = 0
	for i = 2, #currentFields, 2 do
	requestsInCurrentWindow = requestsInCurrentWindow + tonumber(currentFields[i])
	end

	local previousFields = redis.call("HGETALL", previousKey)
	local requestsInPreviousWindow = 0
	for i = 2, #previousFields, 2 do
	requestsInPreviousWindow = requestsInPreviousWindow + tonumber(previousFields[i])
	end

	local percentageInCurrent = ( now % window) / window
  	requestsInPreviousWindow = math.floor(( 1 - percentageInCurrent ) * requestsInPreviousWindow)
	
	return requestsInCurrentWindow + requestsInPreviousWindow
`, hash: "558c9306b7ec54abb50747fe0b17e5d44bd24868" } } }, b = { script: `
      local pattern = KEYS[1]

      -- Initialize cursor to start from 0
      local cursor = "0"

      repeat
          -- Scan for keys matching the pattern
          local scan_result = redis.call('SCAN', cursor, 'MATCH', pattern)

          -- Extract cursor for the next iteration
          cursor = scan_result[1]

          -- Extract keys from the scan result
          local keys = scan_result[2]

          for i=1, #keys do
          redis.call('DEL', keys[i])
          end

      -- Continue scanning until cursor is 0 (end of keyspace)
      until cursor == "0"
    `, hash: "54bd274ddc59fb3be0f42deee2f64322a10e2b50" }, w = "denyList", v = "ipDenyList", x = "ipDenyListStatus", _ = `
  -- Checks if values provideed in ARGV are present in the deny lists.
  -- This is done using the allDenyListsKey below.

  -- Additionally, checks the status of the ip deny list using the
  -- ipDenyListStatusKey below. Here are the possible states of the
  -- ipDenyListStatusKey key:
  -- * status == -1: set to "disabled" with no TTL
  -- * status == -2: not set, meaning that is was set before but expired
  -- * status  >  0: set to "valid", with a TTL
  --
  -- In the case of status == -2, we set the status to "pending" with
  -- 30 second ttl. During this time, the process which got status == -2
  -- will update the ip deny list.

  local allDenyListsKey     = KEYS[1]
  local ipDenyListStatusKey = KEYS[2]

  local results = redis.call('SMISMEMBER', allDenyListsKey, unpack(ARGV))
  local status  = redis.call('TTL', ipDenyListStatusKey)
  if status == -2 then
    redis.call('SETEX', ipDenyListStatusKey, 30, "pending")
  end

  return { results, status }
`, k = {};
      o(k, { ThresholdError: () => E, disableIpDenyList: () => T, updateIpDenyList: () => O });
      var E = class extends Error {
        constructor(e2) {
          super(`Allowed threshold values are from 1 to 8, 1 and 8 included. Received: ${e2}`), this.name = "ThresholdError";
        }
      }, S = async (e2) => {
        if ("number" != typeof e2 || e2 < 1 || e2 > 8) throw new E(e2);
        try {
          let t2 = await fetch(`https://raw.githubusercontent.com/stamparm/ipsum/master/levels/${e2}.txt`);
          if (!t2.ok) throw Error(`Error fetching data: ${t2.statusText}`);
          return (await t2.text()).split("\n").filter((e3) => e3.length > 0);
        } catch (e3) {
          throw Error(`Failed to fetch ip deny list: ${e3}`);
        }
      }, O = async (e2, t2, r2, s2) => {
        var i2;
        let n2 = await S(r2), a2 = [t2, w, "all"].join(":"), o2 = [t2, w, v].join(":"), c2 = [t2, x].join(":"), l2 = e2.multi();
        return l2.sdiffstore(a2, a2, o2), l2.del(o2), l2.sadd(o2, n2.at(0), ...n2.slice(1)), l2.sdiffstore(o2, o2, a2), l2.sunionstore(a2, a2, o2), l2.set(c2, "valid", { px: s2 ?? 864e5 - ((i2 || Date.now()) - 72e5) % 864e5 }), await l2.exec();
      }, T = async (e2, t2) => {
        let r2 = [t2, w, "all"].join(":"), s2 = [t2, w, v].join(":"), i2 = [t2, x].join(":"), n2 = e2.multi();
        return n2.sdiffstore(r2, r2, s2), n2.del(s2), n2.set(i2, "disabled"), await n2.exec();
      }, C = new h(/* @__PURE__ */ new Map()), R = async (e2, t2, r2) => {
        let s2, [i2, n2] = await e2.eval(_, [[t2, w, "all"].join(":"), [t2, x].join(":")], r2);
        return i2.map((e3, t3) => {
          if (e3) {
            var i3;
            i3 = r2[t3], C.size() > 1e3 && C.empty(), C.blockUntil(i3, Date.now() + 6e4), s2 = r2[t3];
          }
        }), { deniedValue: s2, invalidIpDenyList: -2 === n2 };
      }, A = class {
        limiter;
        ctx;
        prefix;
        timeout;
        primaryRedis;
        analytics;
        enableProtection;
        denyListThreshold;
        dynamicLimits;
        constructor(e2) {
          this.ctx = e2.ctx, this.limiter = e2.limiter, this.timeout = e2.timeout ?? 5e3, this.prefix = e2.prefix ?? p, this.dynamicLimits = e2.dynamicLimits ?? false, this.enableProtection = e2.enableProtection ?? false, this.denyListThreshold = e2.denyListThreshold ?? 6, this.primaryRedis = "redis" in this.ctx ? this.ctx.redis : this.ctx.regionContexts[0].redis, "redis" in this.ctx && (this.ctx.dynamicLimits = this.dynamicLimits, this.ctx.prefix = this.prefix), this.analytics = e2.analytics ? new u({ redis: this.primaryRedis, prefix: this.prefix }) : void 0, e2.ephemeralCache instanceof Map ? this.ctx.cache = new h(e2.ephemeralCache) : void 0 === e2.ephemeralCache && (this.ctx.cache = new h(/* @__PURE__ */ new Map()));
        }
        limit = async (e2, t2) => {
          let r2 = null;
          try {
            let s2 = this.getRatelimitResponse(e2, t2), { responseArray: i2, newTimeoutId: n2 } = this.applyTimeout(s2);
            r2 = n2;
            let a2 = await Promise.race(i2);
            return this.submitAnalytics(a2, e2, t2);
          } finally {
            r2 && clearTimeout(r2);
          }
        };
        blockUntilReady = async (e2, t2) => {
          let r2;
          if (t2 <= 0) throw Error("timeout must be positive");
          let s2 = Date.now() + t2;
          for (; !(r2 = await this.limit(e2)).success; ) {
            if (0 === r2.reset) throw Error("This should not happen");
            let e3 = Math.min(r2.reset, s2) - Date.now();
            if (await new Promise((t3) => setTimeout(t3, e3)), Date.now() > s2) break;
          }
          return r2;
        };
        resetUsedTokens = async (e2) => {
          let t2 = [this.prefix, e2].join(":");
          await this.limiter().resetTokens(this.ctx, t2);
        };
        getRemaining = async (e2) => {
          let t2 = [this.prefix, e2].join(":");
          return await this.limiter().getRemaining(this.ctx, t2);
        };
        getRatelimitResponse = async (e2, t2) => {
          let r2 = this.getKey(e2), s2 = this.getDefinedMembers(e2, t2), i2 = s2.find((e3) => C.isBlocked(e3).blocked), n2 = i2 ? [{ success: false, limit: 0, remaining: 0, reset: 0, pending: Promise.resolve(), reason: "denyList", deniedValue: i2 }, { deniedValue: i2, invalidIpDenyList: false }] : await Promise.all([this.limiter().limit(this.ctx, r2, t2?.rate), this.enableProtection ? R(this.primaryRedis, this.prefix, s2) : { deniedValue: void 0, invalidIpDenyList: false }]);
          return ((e3, t3, [r3, s3], i3) => {
            if (s3.deniedValue && (r3.success = false, r3.remaining = 0, r3.reason = "denyList", r3.deniedValue = s3.deniedValue), s3.invalidIpDenyList) {
              let s4 = O(e3, t3, i3);
              r3.pending = Promise.all([r3.pending, s4]);
            }
            return r3;
          })(this.primaryRedis, this.prefix, n2, this.denyListThreshold);
        };
        applyTimeout = (e2) => {
          let t2 = null, r2 = [e2];
          if (this.timeout > 0) {
            let e3 = new Promise((e4) => {
              t2 = setTimeout(() => {
                e4({ success: true, limit: 0, remaining: 0, reset: 0, pending: Promise.resolve(), reason: "timeout" });
              }, this.timeout);
            });
            r2.push(e3);
          }
          return { responseArray: r2, newTimeoutId: t2 };
        };
        submitAnalytics = (e2, t2, r2) => {
          if (this.analytics) try {
            let s2 = r2 ? this.analytics.extractGeo(r2) : void 0, i2 = this.analytics.record({ identifier: "denyList" === e2.reason ? e2.deniedValue : t2, time: Date.now(), success: "denyList" === e2.reason ? "denied" : e2.success, ...s2 }).catch((e3) => {
              let t3 = "Failed to record analytics";
              `${e3}`.includes("WRONGTYPE") && (t3 = `
    Failed to record analytics. See the information below:

    This can occur when you uprade to Ratelimit version 1.1.2
    or later from an earlier version.

    This occurs simply because the way we store analytics data
    has changed. To avoid getting this error, disable analytics
    for *an hour*, then simply enable it back.

    `), console.warn(t3, e3);
            });
            e2.pending = Promise.all([e2.pending, i2]);
          } catch (e3) {
            console.warn("Failed to record analytics", e3);
          }
          return e2;
        };
        getKey = (e2) => [this.prefix, e2].join(":");
        getDefinedMembers = (e2, t2) => [e2, t2?.ip, t2?.userAgent, t2?.country].filter(Boolean);
        setDynamicLimit = async (e2) => {
          if (!this.dynamicLimits) throw Error("dynamicLimits must be enabled in the Ratelimit constructor to use setDynamicLimit()");
          let t2 = `${this.prefix}${d}`;
          await (false === e2.limit ? this.primaryRedis.del(t2) : this.primaryRedis.set(t2, e2.limit));
        };
        getDynamicLimit = async () => {
          if (!this.dynamicLimits) throw Error("dynamicLimits must be enabled in the Ratelimit constructor to use getDynamicLimit()");
          let e2 = `${this.prefix}${d}`, t2 = await this.primaryRedis.get(e2);
          return { dynamicLimit: null === t2 ? null : Number(t2) };
        };
      };
      function P() {
        let e2 = "", t2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", r2 = t2.length;
        for (let s2 = 0; s2 < 16; s2++) e2 += t2.charAt(Math.floor(Math.random() * r2));
        return e2;
      }
      var I = class extends A {
        constructor(e2) {
          super({ prefix: e2.prefix, limiter: e2.limiter, timeout: e2.timeout, analytics: e2.analytics, dynamicLimits: e2.dynamicLimits, ctx: { regionContexts: e2.redis.map((t2) => ({ redis: t2, prefix: e2.prefix ?? p })), cache: e2.ephemeralCache ? new h(e2.ephemeralCache) : void 0 } }), e2.dynamicLimits && console.warn("Warning: Dynamic limits are not yet supported for multi-region rate limiters. The dynamicLimits option will be ignored.");
        }
        static fixedWindow(e2, t2) {
          let r2 = m(t2);
          return () => ({ async limit(t3, s2, i2) {
            let n2 = P(), a2 = Math.floor(Date.now() / r2), o2 = [s2, a2].join(":"), c2 = i2 ?? 1;
            if (t3.cache && c2 > 0) {
              let { blocked: r3, reset: i3 } = t3.cache.isBlocked(s2);
              if (r3) return { success: false, limit: e2, remaining: 0, reset: i3, pending: Promise.resolve(), reason: "cacheBlock" };
            }
            let l2 = t3.regionContexts.map((e3) => ({ redis: e3.redis, request: f(e3, y.fixedWindow.limit, [o2], [n2, r2, c2]) })), u2 = e2 - (await Promise.any(l2.map((e3) => e3.request))).reduce((e3, t4, r3) => {
              let s3 = 0;
              return r3 % 2 && (s3 = Number.parseInt(t4)), e3 + s3;
            }, 0);
            async function h2() {
              let t4 = [...new Set((await Promise.all(l2.map((e3) => e3.request))).flat().reduce((e3, t5, r3) => (r3 % 2 == 0 && e3.push(t5), e3), [])).values()];
              for (let r3 of l2) {
                let s3 = (await r3.request).reduce((e3, t5, r4) => {
                  let s4 = 0;
                  return r4 % 2 && (s4 = Number.parseInt(t5)), e3 + s4;
                }, 0), i3 = (await r3.request).reduce((e3, t5, r4) => (r4 % 2 == 0 && e3.push(t5), e3), []);
                if (s3 >= e2) continue;
                let n3 = t4.filter((e3) => !i3.includes(e3));
                if (0 !== n3.length) for (let e3 of n3) await r3.redis.hset(o2, { [e3]: c2 });
              }
            }
            let d2 = u2 >= 0, p2 = (a2 + 1) * r2;
            return t3.cache && (d2 ? c2 < 0 && t3.cache.pop(s2) : t3.cache.blockUntil(s2, p2)), { success: d2, limit: e2, remaining: u2, reset: p2, pending: h2() };
          }, async getRemaining(t3, s2) {
            let i2 = Math.floor(Date.now() / r2), n2 = [s2, i2].join(":"), a2 = t3.regionContexts.map((e3) => ({ redis: e3.redis, request: f(e3, y.fixedWindow.getRemaining, [n2], [null]) }));
            return { remaining: Math.max(0, e2 - (await Promise.any(a2.map((e3) => e3.request))).reduce((e3, t4, r3) => {
              let s3 = 0;
              return r3 % 2 && (s3 = Number.parseInt(t4)), e3 + s3;
            }, 0)), reset: (i2 + 1) * r2, limit: e2 };
          }, async resetTokens(e3, t3) {
            let r3 = [t3, "*"].join(":");
            e3.cache && e3.cache.pop(t3), await Promise.all(e3.regionContexts.map((e4) => {
              f(e4, b, [r3], [null]);
            }));
          } });
        }
        static slidingWindow(e2, t2) {
          let r2 = m(t2), s2 = m(t2);
          return () => ({ async limit(t3, i2, n2) {
            let a2 = P(), o2 = Date.now(), c2 = Math.floor(o2 / r2), l2 = [i2, c2].join(":"), u2 = [i2, c2 - 1].join(":"), h2 = n2 ?? 1;
            if (t3.cache && h2 > 0) {
              let { blocked: r3, reset: s3 } = t3.cache.isBlocked(i2);
              if (r3) return { success: false, limit: e2, remaining: 0, reset: s3, pending: Promise.resolve(), reason: "cacheBlock" };
            }
            let d2 = t3.regionContexts.map((t4) => ({ redis: t4.redis, request: f(t4, y.slidingWindow.limit, [l2, u2], [e2, o2, s2, a2, h2]) })), p2 = o2 % s2 / s2, [m2, g2, b2] = await Promise.any(d2.map((e3) => e3.request));
            b2 && m2.push(a2, h2.toString());
            let w2 = e2 - (Math.ceil(g2.reduce((e3, t4, r3) => {
              let s3 = 0;
              return r3 % 2 && (s3 = Number.parseInt(t4)), e3 + s3;
            }, 0) * (1 - p2)) + m2.reduce((e3, t4, r3) => {
              let s3 = 0;
              return r3 % 2 && (s3 = Number.parseInt(t4)), e3 + s3;
            }, 0));
            async function v2() {
              let t4 = [...new Set((await Promise.all(d2.map((e3) => e3.request))).flatMap(([e3]) => e3).reduce((e3, t5, r3) => (r3 % 2 == 0 && e3.push(t5), e3), [])).values()];
              for (let r3 of d2) {
                let [s3, i3, n3] = await r3.request, a3 = s3.reduce((e3, t5, r4) => (r4 % 2 == 0 && e3.push(t5), e3), []);
                if (s3.reduce((e3, t5, r4) => {
                  let s4 = 0;
                  return r4 % 2 && (s4 = Number.parseInt(t5)), e3 + s4;
                }, 0) >= e2) continue;
                let o3 = t4.filter((e3) => !a3.includes(e3));
                if (0 !== o3.length) for (let e3 of o3) await r3.redis.hset(l2, { [e3]: h2 });
              }
            }
            let x2 = (c2 + 1) * s2;
            return t3.cache && (b2 ? h2 < 0 && t3.cache.pop(i2) : t3.cache.blockUntil(i2, x2)), { success: !!b2, limit: e2, remaining: Math.max(0, w2), reset: x2, pending: v2() };
          }, async getRemaining(t3, s3) {
            let i2 = Date.now(), n2 = Math.floor(i2 / r2), a2 = [s3, n2].join(":"), o2 = [s3, n2 - 1].join(":"), c2 = t3.regionContexts.map((e3) => ({ redis: e3.redis, request: f(e3, y.slidingWindow.getRemaining, [a2, o2], [i2, r2]) }));
            return { remaining: Math.max(0, e2 - await Promise.any(c2.map((e3) => e3.request))), reset: (n2 + 1) * r2, limit: e2 };
          }, async resetTokens(e3, t3) {
            let r3 = [t3, "*"].join(":");
            e3.cache && e3.cache.pop(t3), await Promise.all(e3.regionContexts.map((e4) => {
              f(e4, b, [r3], [null]);
            }));
          } });
        }
      }, N = class extends A {
        constructor(e2) {
          super({ prefix: e2.prefix, limiter: e2.limiter, timeout: e2.timeout, analytics: e2.analytics, ctx: { redis: e2.redis, prefix: e2.prefix ?? p }, ephemeralCache: e2.ephemeralCache, enableProtection: e2.enableProtection, denyListThreshold: e2.denyListThreshold, dynamicLimits: e2.dynamicLimits });
        }
        static fixedWindow(e2, t2) {
          let r2 = m(t2);
          return () => ({ async limit(t3, s2, i2) {
            let n2 = Math.floor(Date.now() / r2), a2 = [s2, n2].join(":"), o2 = i2 ?? 1;
            if (t3.cache && o2 > 0) {
              let { blocked: r3, reset: i3 } = t3.cache.isBlocked(s2);
              if (r3) return { success: false, limit: e2, remaining: 0, reset: i3, pending: Promise.resolve(), reason: "cacheBlock" };
            }
            let c2 = t3.dynamicLimits ? `${t3.prefix}${d}` : "", [l2, u2] = await f(t3, g.fixedWindow.limit, [a2, c2], [e2, r2, o2]), h2 = l2 <= u2, p2 = Math.max(0, u2 - l2), m2 = (n2 + 1) * r2;
            return t3.cache && (h2 ? o2 < 0 && t3.cache.pop(s2) : t3.cache.blockUntil(s2, m2)), { success: h2, limit: u2, remaining: p2, reset: m2, pending: Promise.resolve() };
          }, async getRemaining(t3, s2) {
            let i2 = Math.floor(Date.now() / r2), n2 = [s2, i2].join(":"), a2 = t3.dynamicLimits ? `${t3.prefix}${d}` : "", [o2, c2] = await f(t3, g.fixedWindow.getRemaining, [n2, a2], [e2]);
            return { remaining: Math.max(0, o2), reset: (i2 + 1) * r2, limit: c2 };
          }, async resetTokens(e3, t3) {
            let r3 = [t3, "*"].join(":");
            e3.cache && e3.cache.pop(t3), await f(e3, b, [r3], [null]);
          } });
        }
        static slidingWindow(e2, t2) {
          let r2 = m(t2);
          return () => ({ async limit(t3, s2, i2) {
            let n2 = Date.now(), a2 = Math.floor(n2 / r2), o2 = [s2, a2].join(":"), c2 = [s2, a2 - 1].join(":"), l2 = i2 ?? 1;
            if (t3.cache && l2 > 0) {
              let { blocked: r3, reset: i3 } = t3.cache.isBlocked(s2);
              if (r3) return { success: false, limit: e2, remaining: 0, reset: i3, pending: Promise.resolve(), reason: "cacheBlock" };
            }
            let u2 = t3.dynamicLimits ? `${t3.prefix}${d}` : "", [h2, p2] = await f(t3, g.slidingWindow.limit, [o2, c2, u2], [e2, n2, r2, l2]), m2 = h2 >= 0, y2 = (a2 + 1) * r2;
            return t3.cache && (m2 ? l2 < 0 && t3.cache.pop(s2) : t3.cache.blockUntil(s2, y2)), { success: m2, limit: p2, remaining: Math.max(0, h2), reset: y2, pending: Promise.resolve() };
          }, async getRemaining(t3, s2) {
            let i2 = Date.now(), n2 = Math.floor(i2 / r2), a2 = [s2, n2].join(":"), o2 = [s2, n2 - 1].join(":"), c2 = t3.dynamicLimits ? `${t3.prefix}${d}` : "", [l2, u2] = await f(t3, g.slidingWindow.getRemaining, [a2, o2, c2], [e2, i2, r2]);
            return { remaining: Math.max(0, l2), reset: (n2 + 1) * r2, limit: u2 };
          }, async resetTokens(e3, t3) {
            let r3 = [t3, "*"].join(":");
            e3.cache && e3.cache.pop(t3), await f(e3, b, [r3], [null]);
          } });
        }
        static tokenBucket(e2, t2, r2) {
          let s2 = m(t2);
          return () => ({ async limit(t3, i2, n2) {
            let a2 = Date.now(), o2 = n2 ?? 1;
            if (t3.cache && o2 > 0) {
              let { blocked: e3, reset: s3 } = t3.cache.isBlocked(i2);
              if (e3) return { success: false, limit: r2, remaining: 0, reset: s3, pending: Promise.resolve(), reason: "cacheBlock" };
            }
            let c2 = t3.dynamicLimits ? `${t3.prefix}${d}` : "", [l2, u2, h2] = await f(t3, g.tokenBucket.limit, [i2, c2], [r2, s2, e2, a2, o2]), p2 = l2 >= 0;
            return t3.cache && (p2 ? o2 < 0 && t3.cache.pop(i2) : t3.cache.blockUntil(i2, u2)), { success: p2, limit: h2, remaining: Math.max(0, l2), reset: u2, pending: Promise.resolve() };
          }, async getRemaining(e3, t3) {
            let i2 = e3.dynamicLimits ? `${e3.prefix}${d}` : "", [n2, a2, o2] = await f(e3, g.tokenBucket.getRemaining, [t3, i2], [r2]), c2 = Date.now() + s2, l2 = a2 + s2;
            return { remaining: Math.max(0, n2), reset: -1 === a2 ? c2 : l2, limit: o2 };
          }, async resetTokens(e3, t3) {
            e3.cache && e3.cache.pop(t3), await f(e3, b, [t3], [null]);
          } });
        }
        static cachedFixedWindow(e2, t2) {
          let r2 = m(t2);
          return () => ({ async limit(t3, s2, i2) {
            if (!t3.cache) throw Error("This algorithm requires a cache");
            t3.dynamicLimits && console.warn("Warning: Dynamic limits are not yet supported for cachedFixedWindow algorithm. The dynamicLimits option will be ignored.");
            let n2 = Math.floor(Date.now() / r2), a2 = [s2, n2].join(":"), o2 = (n2 + 1) * r2, c2 = i2 ?? 1;
            if ("number" == typeof t3.cache.get(a2)) {
              let s3 = t3.cache.incr(a2, c2), i3 = s3 < e2, n3 = i3 ? f(t3, g.cachedFixedWindow.limit, [a2], [r2, c2]) : Promise.resolve();
              return { success: i3, limit: e2, remaining: e2 - s3, reset: o2, pending: n3 };
            }
            let l2 = await f(t3, g.cachedFixedWindow.limit, [a2], [r2, c2]);
            t3.cache.set(a2, l2);
            let u2 = e2 - l2;
            return { success: u2 >= 0, limit: e2, remaining: u2, reset: o2, pending: Promise.resolve() };
          }, async getRemaining(t3, s2) {
            if (!t3.cache) throw Error("This algorithm requires a cache");
            let i2 = Math.floor(Date.now() / r2), n2 = [s2, i2].join(":");
            return "number" == typeof t3.cache.get(n2) ? { remaining: Math.max(0, e2 - (t3.cache.get(n2) ?? 0)), reset: (i2 + 1) * r2, limit: e2 } : { remaining: Math.max(0, e2 - await f(t3, g.cachedFixedWindow.getRemaining, [n2], [null])), reset: (i2 + 1) * r2, limit: e2 };
          }, async resetTokens(e3, t3) {
            if (!e3.cache) throw Error("This algorithm requires a cache");
            let s2 = [t3, Math.floor(Date.now() / r2)].join(":");
            e3.cache.pop(s2);
            let i2 = [t3, "*"].join(":");
            await f(e3, b, [i2], [null]);
          } });
        }
      };
    }, 77722, (e) => {
      "use strict";
      let t, r, s, i, n, a, o, c, l, u, h;
      async function d() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      e.i(41379);
      let p = null;
      async function m() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        p || (p = d());
        let e10 = await p;
        if (null == e10 ? void 0 : e10.register) try {
          await e10.register();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      async function f(...e10) {
        let t10 = await d();
        try {
          var r10;
          await (null == t10 || null == (r10 = t10.onRequestError) ? void 0 : r10.call(t10, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let g = null;
      function y() {
        return g || (g = m()), g;
      }
      function b(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== e.g.process && (process.env = e.g.process.env, e.g.process = process);
      try {
        Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
          let t10 = new Proxy(function() {
          }, { get(t11, r10) {
            if ("then" === r10) return {};
            throw Object.defineProperty(Error(b(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, construct() {
            throw Object.defineProperty(Error(b(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, apply(r10, s10, i10) {
            if ("function" == typeof i10[0]) return i10[0](t10);
            throw Object.defineProperty(Error(b(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          } });
          return new Proxy({}, { get: () => t10 });
        }, enumerable: false, configurable: false });
      } catch {
      }
      y();
      class w extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class v extends Error {
        constructor() {
          super("The request.page has been deprecated in favour of `URLPattern`.\n  Read more: https://nextjs.org/docs/messages/middleware-request-page\n  ");
        }
      }
      class x extends Error {
        constructor() {
          super("The request.ua has been removed in favour of `userAgent` function.\n  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent\n  ");
        }
      }
      let _ = "x-prerender-revalidate", k = ".meta", E = "x-next-cache-tags", S = "x-next-revalidated-tags", O = "_N_T_", T = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" };
      function C(e10) {
        var t10, r10, s10, i10, n10, a10 = [], o10 = 0;
        function c10() {
          for (; o10 < e10.length && /\s/.test(e10.charAt(o10)); ) o10 += 1;
          return o10 < e10.length;
        }
        for (; o10 < e10.length; ) {
          for (t10 = o10, n10 = false; c10(); ) if ("," === (r10 = e10.charAt(o10))) {
            for (s10 = o10, o10 += 1, c10(), i10 = o10; o10 < e10.length && "=" !== (r10 = e10.charAt(o10)) && ";" !== r10 && "," !== r10; ) o10 += 1;
            o10 < e10.length && "=" === e10.charAt(o10) ? (n10 = true, o10 = i10, a10.push(e10.substring(t10, s10)), t10 = o10) : o10 = s10 + 1;
          } else o10 += 1;
          (!n10 || o10 >= e10.length) && a10.push(e10.substring(t10, e10.length));
        }
        return a10;
      }
      function R(e10) {
        let t10 = {}, r10 = [];
        if (e10) for (let [s10, i10] of e10.entries()) "set-cookie" === s10.toLowerCase() ? (r10.push(...C(i10)), t10[s10] = 1 === r10.length ? r10[0] : r10) : t10[s10] = i10;
        return t10;
      }
      function A(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t10) {
          throw Object.defineProperty(Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t10 }), "__NEXT_ERROR_CODE", { value: "E61", enumerable: false, configurable: true });
        }
      }
      ({ ...T, GROUP: { builtinReact: [T.reactServerComponents, T.actionBrowser], serverOnly: [T.reactServerComponents, T.actionBrowser, T.instrument, T.middleware], neutralTarget: [T.apiNode, T.apiEdge], clientOnly: [T.serverSideRendering, T.appPagesBrowser], bundled: [T.reactServerComponents, T.actionBrowser, T.serverSideRendering, T.appPagesBrowser, T.shared, T.instrument, T.middleware], appPages: [T.reactServerComponents, T.serverSideRendering, T.appPagesBrowser, T.actionBrowser] } });
      let P = Symbol("response"), I = Symbol("passThrough"), N = Symbol("waitUntil");
      class L {
        constructor(e10, t10) {
          this[I] = false, this[N] = t10 ? { kind: "external", function: t10 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[P] || (this[P] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[I] = true;
        }
        waitUntil(e10) {
          if ("external" === this[N].kind) return (0, this[N].function)(e10);
          this[N].promises.push(e10);
        }
      }
      class U extends L {
        constructor(e10) {
          var t10;
          super(e10.request, null == (t10 = e10.context) ? void 0 : t10.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new w({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new w({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      function M(e10) {
        return e10.replace(/\/$/, "") || "/";
      }
      function D(e10) {
        let t10 = e10.indexOf("#"), r10 = e10.indexOf("?"), s10 = r10 > -1 && (t10 < 0 || r10 < t10);
        return s10 || t10 > -1 ? { pathname: e10.substring(0, s10 ? r10 : t10), query: s10 ? e10.substring(r10, t10 > -1 ? t10 : void 0) : "", hash: t10 > -1 ? e10.slice(t10) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function j(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: s10, hash: i10 } = D(e10);
        return `${t10}${r10}${s10}${i10}`;
      }
      function q(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: s10, hash: i10 } = D(e10);
        return `${r10}${t10}${s10}${i10}`;
      }
      function z(e10, t10) {
        if ("string" != typeof e10) return false;
        let { pathname: r10 } = D(e10);
        return r10 === t10 || r10.startsWith(t10 + "/");
      }
      let B = /* @__PURE__ */ new WeakMap();
      function $(e10, t10) {
        let r10;
        if (!t10) return { pathname: e10 };
        let s10 = B.get(t10);
        s10 || (s10 = t10.map((e11) => e11.toLowerCase()), B.set(t10, s10));
        let i10 = e10.split("/", 2);
        if (!i10[1]) return { pathname: e10 };
        let n10 = i10[1].toLowerCase(), a10 = s10.indexOf(n10);
        return a10 < 0 ? { pathname: e10 } : (r10 = t10[a10], { pathname: e10 = e10.slice(r10.length + 1) || "/", detectedLocale: r10 });
      }
      let K = /^(?:127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)$/;
      function H(e10, t10) {
        let r10 = new URL(String(e10), t10 && String(t10));
        return K.test(r10.hostname) && (r10.hostname = "localhost"), r10;
      }
      let F = Symbol("NextURLInternal");
      class W {
        constructor(e10, t10, r10) {
          let s10, i10;
          "object" == typeof t10 && "pathname" in t10 || "string" == typeof t10 ? (s10 = t10, i10 = r10 || {}) : i10 = r10 || t10 || {}, this[F] = { url: H(e10, s10 ?? i10.base), options: i10, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t10, r10, s10, i10;
          let n10 = function(e11, t11) {
            let { basePath: r11, i18n: s11, trailingSlash: i11 } = t11.nextConfig ?? {}, n11 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : i11 };
            r11 && z(n11.pathname, r11) && (n11.pathname = function(e12, t12) {
              if (!z(e12, t12)) return e12;
              let r12 = e12.slice(t12.length);
              return r12.startsWith("/") ? r12 : `/${r12}`;
            }(n11.pathname, r11), n11.basePath = r11);
            let a11 = n11.pathname;
            if (n11.pathname.startsWith("/_next/data/") && n11.pathname.endsWith(".json")) {
              let e12 = n11.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              n11.buildId = e12[0], a11 = "index" !== e12[1] ? `/${e12.slice(1).join("/")}` : "/", true === t11.parseData && (n11.pathname = a11);
            }
            if (s11) {
              let e12 = t11.i18nProvider ? t11.i18nProvider.analyze(n11.pathname) : $(n11.pathname, s11.locales);
              n11.locale = e12.detectedLocale, n11.pathname = e12.pathname ?? n11.pathname, !e12.detectedLocale && n11.buildId && (e12 = t11.i18nProvider ? t11.i18nProvider.analyze(a11) : $(a11, s11.locales)).detectedLocale && (n11.locale = e12.detectedLocale);
            }
            return n11;
          }(this[F].url.pathname, { nextConfig: this[F].options.nextConfig, parseData: true, i18nProvider: this[F].options.i18nProvider }), a10 = function(e11, t11) {
            let r11;
            if (t11?.host && !Array.isArray(t11.host)) r11 = t11.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r11 = e11.hostname;
            }
            return r11.toLowerCase();
          }(this[F].url, this[F].options.headers);
          this[F].domainLocale = this[F].options.i18nProvider ? this[F].options.i18nProvider.detectDomainLocale(a10) : function(e11, t11, r11) {
            if (e11) {
              for (let s11 of (r11 && (r11 = r11.toLowerCase()), e11)) if (t11 === s11.domain?.split(":", 1)[0].toLowerCase() || r11 === s11.defaultLocale.toLowerCase() || s11.locales?.some((e12) => e12.toLowerCase() === r11)) return s11;
            }
          }(null == (t10 = this[F].options.nextConfig) || null == (e10 = t10.i18n) ? void 0 : e10.domains, a10);
          let o10 = (null == (r10 = this[F].domainLocale) ? void 0 : r10.defaultLocale) || (null == (i10 = this[F].options.nextConfig) || null == (s10 = i10.i18n) ? void 0 : s10.defaultLocale);
          this[F].url.pathname = n10.pathname, this[F].defaultLocale = o10, this[F].basePath = n10.basePath ?? "", this[F].buildId = n10.buildId, this[F].locale = n10.locale ?? o10, this[F].trailingSlash = n10.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t10;
          return t10 = function(e11, t11, r10, s10) {
            if (!t11 || t11 === r10) return e11;
            let i10 = e11.toLowerCase();
            return !s10 && (z(i10, "/api") || z(i10, `/${t11.toLowerCase()}`)) ? e11 : j(e11, `/${t11}`);
          }((e10 = { basePath: this[F].basePath, buildId: this[F].buildId, defaultLocale: this[F].options.forceLocale ? void 0 : this[F].defaultLocale, locale: this[F].locale, pathname: this[F].url.pathname, trailingSlash: this[F].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t10 = M(t10)), e10.buildId && (t10 = q(j(t10, `/_next/data/${e10.buildId}`), "/" === e10.pathname ? "index.json" : ".json")), t10 = j(t10, e10.basePath), !e10.buildId && e10.trailingSlash ? t10.endsWith("/") ? t10 : q(t10, "/") : M(t10);
        }
        formatSearch() {
          return this[F].url.search;
        }
        get buildId() {
          return this[F].buildId;
        }
        set buildId(e10) {
          this[F].buildId = e10;
        }
        get locale() {
          return this[F].locale ?? "";
        }
        set locale(e10) {
          var t10, r10;
          if (!this[F].locale || !(null == (r10 = this[F].options.nextConfig) || null == (t10 = r10.i18n) ? void 0 : t10.locales.includes(e10))) throw Object.defineProperty(TypeError(`The NextURL configuration includes no locale "${e10}"`), "__NEXT_ERROR_CODE", { value: "E597", enumerable: false, configurable: true });
          this[F].locale = e10;
        }
        get defaultLocale() {
          return this[F].defaultLocale;
        }
        get domainLocale() {
          return this[F].domainLocale;
        }
        get searchParams() {
          return this[F].url.searchParams;
        }
        get host() {
          return this[F].url.host;
        }
        set host(e10) {
          this[F].url.host = e10;
        }
        get hostname() {
          return this[F].url.hostname;
        }
        set hostname(e10) {
          this[F].url.hostname = e10;
        }
        get port() {
          return this[F].url.port;
        }
        set port(e10) {
          this[F].url.port = e10;
        }
        get protocol() {
          return this[F].url.protocol;
        }
        set protocol(e10) {
          this[F].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t10 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t10}${this.hash}`;
        }
        set href(e10) {
          this[F].url = H(e10), this.analyze();
        }
        get origin() {
          return this[F].url.origin;
        }
        get pathname() {
          return this[F].url.pathname;
        }
        set pathname(e10) {
          this[F].url.pathname = e10;
        }
        get hash() {
          return this[F].url.hash;
        }
        set hash(e10) {
          this[F].url.hash = e10;
        }
        get search() {
          return this[F].url.search;
        }
        set search(e10) {
          this[F].url.search = e10;
        }
        get password() {
          return this[F].url.password;
        }
        set password(e10) {
          this[F].url.password = e10;
        }
        get username() {
          return this[F].url.username;
        }
        set username(e10) {
          this[F].url.username = e10;
        }
        get basePath() {
          return this[F].basePath;
        }
        set basePath(e10) {
          this[F].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new W(String(this), this[F].options);
        }
      }
      e.i(94438);
      var J, G, V = e.i(67168);
      let X = Symbol("internal request");
      class Y extends Request {
        constructor(e10, t10 = {}) {
          const r10 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          A(r10), e10 instanceof Request ? super(e10, t10) : super(r10, t10);
          const s10 = new W(r10, { headers: R(this.headers), nextConfig: t10.nextConfig });
          this[X] = { cookies: new V.RequestCookies(this.headers), nextUrl: s10, url: s10.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[X].cookies;
        }
        get nextUrl() {
          return this[X].nextUrl;
        }
        get page() {
          throw new v();
        }
        get ua() {
          throw new x();
        }
        get url() {
          return this[X].url;
        }
      }
      var Q = e.i(12914);
      let Z = Symbol("internal response"), ee = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function et(e10, t10) {
        var r10;
        if (null == e10 || null == (r10 = e10.request) ? void 0 : r10.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Object.defineProperty(Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", { value: "E119", enumerable: false, configurable: true });
          let r11 = [];
          for (let [s10, i10] of e10.request.headers) t10.set("x-middleware-request-" + s10, i10), r11.push(s10);
          t10.set("x-middleware-override-headers", r11.join(","));
        }
      }
      class er extends Response {
        constructor(e10, t10 = {}) {
          super(e10, t10);
          const r10 = this.headers, s10 = new Proxy(new V.ResponseCookies(r10), { get(e11, s11, i10) {
            switch (s11) {
              case "delete":
              case "set":
                return (...i11) => {
                  let n10 = Reflect.apply(e11[s11], e11, i11), a10 = new Headers(r10);
                  return n10 instanceof V.ResponseCookies && r10.set("x-middleware-set-cookie", n10.getAll().map((e12) => (0, V.stringifyCookie)(e12)).join(",")), et(t10, a10), n10;
                };
              default:
                return Q.ReflectAdapter.get(e11, s11, i10);
            }
          } });
          this[Z] = { cookies: s10, url: t10.url ? new W(t10.url, { headers: R(r10), nextConfig: t10.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[Z].cookies;
        }
        static json(e10, t10) {
          let r10 = Response.json(e10, t10);
          return new er(r10.body, r10);
        }
        static redirect(e10, t10) {
          let r10 = "number" == typeof t10 ? t10 : (null == t10 ? void 0 : t10.status) ?? 307;
          if (!ee.has(r10)) throw Object.defineProperty(RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", { value: "E529", enumerable: false, configurable: true });
          let s10 = "object" == typeof t10 ? t10 : {}, i10 = new Headers(null == s10 ? void 0 : s10.headers);
          return i10.set("Location", A(e10)), new er(null, { ...s10, headers: i10, status: r10 });
        }
        static rewrite(e10, t10) {
          let r10 = new Headers(null == t10 ? void 0 : t10.headers);
          return r10.set("x-middleware-rewrite", A(e10)), et(t10, r10), new er(null, { ...t10, headers: r10 });
        }
        static next(e10) {
          let t10 = new Headers(null == e10 ? void 0 : e10.headers);
          return t10.set("x-middleware-next", "1"), et(e10, t10), new er(null, { ...e10, headers: t10 });
        }
      }
      function es(e10, t10) {
        let r10 = "string" == typeof t10 ? new URL(t10) : t10, s10 = new URL(e10, t10), i10 = s10.origin === r10.origin;
        return { url: i10 ? s10.toString().slice(r10.origin.length) : s10.toString(), isRelative: i10 };
      }
      let ei = "next-router-prefetch", en = ["rsc", "next-router-state-tree", ei, "next-hmr-refresh", "next-router-segment-prefetch"], ea = "_rsc";
      function eo(e10) {
        return e10.startsWith("/") ? e10 : `/${e10}`;
      }
      function ec(e10) {
        return eo(e10.split("/").reduce((e11, t10, r10, s10) => t10 ? "(" === t10[0] && t10.endsWith(")") || "@" === t10[0] || ("page" === t10 || "route" === t10) && r10 === s10.length - 1 ? e11 : `${e11}/${t10}` : e11, ""));
      }
      var el = e.i(42011), eu = e.i(57432), eh = ((o7 = eh || {}).handleRequest = "BaseServer.handleRequest", o7.run = "BaseServer.run", o7.pipe = "BaseServer.pipe", o7.getStaticHTML = "BaseServer.getStaticHTML", o7.render = "BaseServer.render", o7.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", o7.renderToResponse = "BaseServer.renderToResponse", o7.renderToHTML = "BaseServer.renderToHTML", o7.renderError = "BaseServer.renderError", o7.renderErrorToResponse = "BaseServer.renderErrorToResponse", o7.renderErrorToHTML = "BaseServer.renderErrorToHTML", o7.render404 = "BaseServer.render404", o7), ed = ((o9 = ed || {}).loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", o9.loadComponents = "LoadComponents.loadComponents", o9), ep = ((o8 = ep || {}).getRequestHandler = "NextServer.getRequestHandler", o8.getRequestHandlerWithMetadata = "NextServer.getRequestHandlerWithMetadata", o8.getServer = "NextServer.getServer", o8.getServerRequestHandler = "NextServer.getServerRequestHandler", o8.createServer = "createServer.createServer", o8), em = ((ce = em || {}).compression = "NextNodeServer.compression", ce.getBuildId = "NextNodeServer.getBuildId", ce.createComponentTree = "NextNodeServer.createComponentTree", ce.clientComponentLoading = "NextNodeServer.clientComponentLoading", ce.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", ce.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", ce.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", ce.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", ce.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", ce.sendRenderResult = "NextNodeServer.sendRenderResult", ce.proxyRequest = "NextNodeServer.proxyRequest", ce.runApi = "NextNodeServer.runApi", ce.render = "NextNodeServer.render", ce.renderHTML = "NextNodeServer.renderHTML", ce.imageOptimizer = "NextNodeServer.imageOptimizer", ce.getPagePath = "NextNodeServer.getPagePath", ce.getRoutesManifest = "NextNodeServer.getRoutesManifest", ce.findPageComponents = "NextNodeServer.findPageComponents", ce.getFontManifest = "NextNodeServer.getFontManifest", ce.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", ce.getRequestHandler = "NextNodeServer.getRequestHandler", ce.renderToHTML = "NextNodeServer.renderToHTML", ce.renderError = "NextNodeServer.renderError", ce.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", ce.render404 = "NextNodeServer.render404", ce.startResponse = "NextNodeServer.startResponse", ce.route = "route", ce.onProxyReq = "onProxyReq", ce.apiResolver = "apiResolver", ce.internalFetch = "internalFetch", ce), ef = ((ct = ef || {}).startServer = "startServer.startServer", ct), eg = ((cr = eg || {}).getServerSideProps = "Render.getServerSideProps", cr.getStaticProps = "Render.getStaticProps", cr.renderToString = "Render.renderToString", cr.renderDocument = "Render.renderDocument", cr.createBodyResult = "Render.createBodyResult", cr), ey = ((cs = ey || {}).renderToString = "AppRender.renderToString", cs.renderToReadableStream = "AppRender.renderToReadableStream", cs.getBodyResult = "AppRender.getBodyResult", cs.fetch = "AppRender.fetch", cs), eb = ((ci = eb || {}).executeRoute = "Router.executeRoute", ci), ew = ((cn = ew || {}).runHandler = "Node.runHandler", cn), ev = ((ca = ev || {}).runHandler = "AppRouteRouteHandlers.runHandler", ca), ex = ((co = ex || {}).generateMetadata = "ResolveMetadata.generateMetadata", co.generateViewport = "ResolveMetadata.generateViewport", co), e_ = ((cc = e_ || {}).execute = "Middleware.execute", cc);
      let ek = /* @__PURE__ */ new Set(["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"]), eE = /* @__PURE__ */ new Set(["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"]);
      function eS(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let eO = process.env.NEXT_OTEL_PERFORMANCE_PREFIX, { context: eT, propagation: eC, trace: eR, SpanStatusCode: eA, SpanKind: eP, ROOT_CONTEXT: eI } = t = e.r(95179);
      class eN extends Error {
        constructor(e10, t10) {
          super(), this.bubble = e10, this.result = t10;
        }
      }
      let eL = (e10, t10) => {
        "object" == typeof t10 && null !== t10 && t10 instanceof eN && t10.bubble ? e10.setAttribute("next.bubble", true) : (t10 && (e10.recordException(t10), e10.setAttribute("error.type", t10.name)), e10.setStatus({ code: eA.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end();
      }, eU = /* @__PURE__ */ new Map(), eM = t.createContextKey("next.rootSpanId"), eD = 0, ej = { set(e10, t10, r10) {
        e10.push({ key: t10, value: r10 });
      } }, eq = (s = new class e {
        getTracerInstance() {
          return eR.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return eT;
        }
        getTracePropagationData() {
          let e10 = eT.active(), t10 = [];
          return eC.inject(e10, t10, ej), t10;
        }
        getActiveScopeSpan() {
          return eR.getSpan(null == eT ? void 0 : eT.active());
        }
        withPropagatedContext(e10, t10, r10, s10 = false) {
          let i10 = eT.active();
          if (s10) {
            let s11 = eC.extract(eI, e10, r10);
            if (eR.getSpanContext(s11)) return eT.with(s11, t10);
            let n11 = eC.extract(i10, e10, r10);
            return eT.with(n11, t10);
          }
          if (eR.getSpanContext(i10)) return t10();
          let n10 = eC.extract(i10, e10, r10);
          return eT.with(n10, t10);
        }
        trace(...e10) {
          let [t10, r10, s10] = e10, { fn: i10, options: n10 } = "function" == typeof r10 ? { fn: r10, options: {} } : { fn: s10, options: { ...r10 } }, a10 = n10.spanName ?? t10;
          if (!ek.has(t10) && "1" !== process.env.NEXT_OTEL_VERBOSE || n10.hideSpan) return i10();
          let o10 = this.getSpanContext((null == n10 ? void 0 : n10.parentSpan) ?? this.getActiveScopeSpan());
          o10 || (o10 = (null == eT ? void 0 : eT.active()) ?? eI);
          let c10 = o10.getValue(eM), l10 = "number" != typeof c10 || !eU.has(c10), u10 = eD++;
          return n10.attributes = { "next.span_name": a10, "next.span_type": t10, ...n10.attributes }, eT.with(o10.setValue(eM, u10), () => this.getTracerInstance().startActiveSpan(a10, n10, (e11) => {
            let r11;
            eO && t10 && eE.has(t10) && (r11 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0);
            let s11 = false, a11 = () => {
              !s11 && (s11 = true, eU.delete(u10), r11 && performance.measure(`${eO}:next-${(t10.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: r11, end: performance.now() }));
            };
            if (l10 && eU.set(u10, new Map(Object.entries(n10.attributes ?? {}))), i10.length > 1) try {
              return i10(e11, (t11) => eL(e11, t11));
            } catch (t11) {
              throw eL(e11, t11), t11;
            } finally {
              a11();
            }
            try {
              let t11 = i10(e11);
              if (eS(t11)) return t11.then((t12) => (e11.end(), t12)).catch((t12) => {
                throw eL(e11, t12), t12;
              }).finally(a11);
              return e11.end(), a11(), t11;
            } catch (t11) {
              throw eL(e11, t11), a11(), t11;
            }
          }));
        }
        wrap(...e10) {
          let t10 = this, [r10, s10, i10] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return ek.has(r10) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = s10;
            "function" == typeof e11 && "function" == typeof i10 && (e11 = e11.apply(this, arguments));
            let n10 = arguments.length - 1, a10 = arguments[n10];
            if ("function" != typeof a10) return t10.trace(r10, e11, () => i10.apply(this, arguments));
            {
              let s11 = t10.getContext().bind(eT.active(), a10);
              return t10.trace(r10, e11, (e12, t11) => (arguments[n10] = function(e13) {
                return null == t11 || t11(e13), s11.apply(this, arguments);
              }, i10.apply(this, arguments)));
            }
          } : i10;
        }
        startSpan(...e10) {
          let [t10, r10] = e10, s10 = this.getSpanContext((null == r10 ? void 0 : r10.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t10, r10, s10);
        }
        getSpanContext(e10) {
          return e10 ? eR.setSpan(eT.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = eT.active().getValue(eM);
          return eU.get(e10);
        }
        setRootSpanAttribute(e10, t10) {
          let r10 = eT.active().getValue(eM), s10 = eU.get(r10);
          s10 && !s10.has(e10) && s10.set(e10, t10);
        }
        withSpan(e10, t10) {
          let r10 = eR.setSpan(eT.active(), e10);
          return eT.with(r10, t10);
        }
      }(), () => s), ez = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(ez);
      class eB {
        constructor(e10, t10, r10, s10) {
          var i10;
          const n10 = e10 && function(e11, t11) {
            let r11 = el.HeadersAdapter.from(e11.headers);
            return { isOnDemandRevalidate: r11.get(_) === t11.previewModeId, revalidateOnlyGenerated: r11.has("x-prerender-revalidate-if-generated") };
          }(t10, e10).isOnDemandRevalidate, a10 = null == (i10 = r10.get(ez)) ? void 0 : i10.value;
          this._isEnabled = !!(!n10 && a10 && e10 && a10 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = s10;
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId) throw Object.defineProperty(Error("Invariant: previewProps missing previewModeId this should never happen"), "__NEXT_ERROR_CODE", { value: "E93", enumerable: false, configurable: true });
          this._mutableCookies.set({ name: ez, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" }), this._isEnabled = true;
        }
        disable() {
          this._mutableCookies.set({ name: ez, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) }), this._isEnabled = false;
        }
      }
      function e$(e10, t10) {
        if ("x-middleware-set-cookie" in e10.headers && "string" == typeof e10.headers["x-middleware-set-cookie"]) {
          let r10 = e10.headers["x-middleware-set-cookie"], s10 = new Headers();
          for (let e11 of C(r10)) s10.append("set-cookie", e11);
          for (let e11 of new V.ResponseCookies(s10).getAll()) t10.set(e11);
        }
      }
      var eK = e.i(12873), eH = e.i(31497), eF = e.i(48864), eW = e.i(72471);
      e.i(49202);
      var eJ = e.i(50484), eG = e.i(51615);
      process.env.NEXT_PRIVATE_DEBUG_CACHE, Symbol.for("@next/cache-handlers");
      let eV = Symbol.for("@next/cache-handlers-map"), eX = Symbol.for("@next/cache-handlers-set"), eY = globalThis;
      function eQ() {
        if (eY[eV]) return eY[eV].entries();
      }
      async function eZ(e10, t10) {
        if (!e10) return t10();
        let r10 = e0(e10);
        try {
          return await t10();
        } finally {
          var s10, i10, n10, a10;
          let t11, o10, c10, l10, u10 = (s10 = r10, i10 = e0(e10), t11 = new Set(s10.pendingRevalidatedTags.map((e11) => {
            let t12 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return `${e11.tag}:${t12}`;
          })), o10 = new Set(s10.pendingRevalidateWrites), { pendingRevalidatedTags: i10.pendingRevalidatedTags.filter((e11) => {
            let r11 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return !t11.has(`${e11.tag}:${r11}`);
          }), pendingRevalidates: Object.fromEntries(Object.entries(i10.pendingRevalidates).filter(([e11]) => !(e11 in s10.pendingRevalidates))), pendingRevalidateWrites: i10.pendingRevalidateWrites.filter((e11) => !o10.has(e11)) });
          await (n10 = e10, c10 = [], (l10 = (null == (a10 = u10) ? void 0 : a10.pendingRevalidatedTags) ?? n10.pendingRevalidatedTags ?? []).length > 0 && c10.push(e1(l10, n10.incrementalCache, n10)), c10.push(...Object.values((null == a10 ? void 0 : a10.pendingRevalidates) ?? n10.pendingRevalidates ?? {})), c10.push(...(null == a10 ? void 0 : a10.pendingRevalidateWrites) ?? n10.pendingRevalidateWrites ?? []), 0 !== c10.length && Promise.all(c10).then(() => void 0));
        }
      }
      function e0(e10) {
        return { pendingRevalidatedTags: e10.pendingRevalidatedTags ? [...e10.pendingRevalidatedTags] : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function e1(e10, t10, r10) {
        if (0 === e10.length) return;
        let s10 = function() {
          if (eY[eX]) return eY[eX].values();
        }(), i10 = [], n10 = /* @__PURE__ */ new Map();
        for (let t11 of e10) {
          let e11, r11 = t11.profile;
          for (let [t12] of n10) if ("string" == typeof t12 && "string" == typeof r11 && t12 === r11 || "object" == typeof t12 && "object" == typeof r11 && JSON.stringify(t12) === JSON.stringify(r11) || t12 === r11) {
            e11 = t12;
            break;
          }
          let s11 = e11 || r11;
          n10.has(s11) || n10.set(s11, []), n10.get(s11).push(t11.tag);
        }
        for (let [e11, o10] of n10) {
          let n11;
          if (e11) {
            let t11;
            if ("object" == typeof e11) t11 = e11;
            else if ("string" == typeof e11) {
              var a10;
              if (!(t11 = null == r10 || null == (a10 = r10.cacheLifeProfiles) ? void 0 : a10[e11])) throw Object.defineProperty(Error(`Invalid profile provided "${e11}" must be configured under cacheLife in next.config or be "max"`), "__NEXT_ERROR_CODE", { value: "E873", enumerable: false, configurable: true });
            }
            t11 && (n11 = { expire: t11.expire });
          }
          for (let t11 of s10 || []) e11 ? i10.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, o10, n11)) : i10.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, o10));
          t10 && i10.push(t10.revalidateTag(o10, n11));
        }
        await Promise.all(i10);
      }
      var e2 = e.i(53441);
      e.i(30972);
      var e3 = e.i(20111);
      class e4 {
        constructor({ waitUntil: e10, onClose: t10, onTaskError: r10 }) {
          this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t10, this.onTaskError = r10, this.callbackQueue = new eF.default(), this.callbackQueue.pause();
        }
        after(e10) {
          if (eS(e10)) this.waitUntil || e5(), this.waitUntil(e10.catch((e11) => this.reportTaskError("promise", e11)));
          else if ("function" == typeof e10) this.addCallback(e10);
          else throw Object.defineProperty(Error("`after()`: Argument must be a promise or a function"), "__NEXT_ERROR_CODE", { value: "E50", enumerable: false, configurable: true });
        }
        addCallback(e10) {
          this.waitUntil || e5();
          let t10 = eH.workUnitAsyncStorage.getStore();
          t10 && this.workUnitStores.add(t10);
          let r10 = e3.afterTaskAsyncStorage.getStore(), s10 = r10 ? r10.rootTaskSpawnPhase : null == t10 ? void 0 : t10.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let i10 = (0, e2.bindSnapshot)(async () => {
            try {
              await e3.afterTaskAsyncStorage.run({ rootTaskSpawnPhase: s10 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          });
          this.callbackQueue.add(i10);
        }
        async runCallbacksOnClose() {
          return await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          for (let e11 of this.workUnitStores) e11.phase = "after";
          let e10 = eJ.workAsyncStorage.getStore();
          if (!e10) throw Object.defineProperty(new eW.InvariantError("Missing workStore in AfterContext.runCallbacks"), "__NEXT_ERROR_CODE", { value: "E547", enumerable: false, configurable: true });
          return eZ(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t10) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, t10);
          } catch (e11) {
            console.error(Object.defineProperty(new eW.InvariantError("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E569", enumerable: false, configurable: true }));
          }
        }
      }
      function e5() {
        throw Object.defineProperty(Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment."), "__NEXT_ERROR_CODE", { value: "E91", enumerable: false, configurable: true });
      }
      function e6(e10) {
        let t10, r10 = { then: (s10, i10) => (t10 || (t10 = Promise.resolve(e10())), t10.then((e11) => {
          r10.value = e11;
        }).catch(() => {
        }), t10.then(s10, i10)) };
        return r10;
      }
      class e7 {
        onClose(e10) {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot subscribe to a closed CloseController"), "__NEXT_ERROR_CODE", { value: "E365", enumerable: false, configurable: true });
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot close a CloseController multiple times"), "__NEXT_ERROR_CODE", { value: "E229", enumerable: false, configurable: true });
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function e9() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID || "", previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let e8 = Symbol.for("@next/request-context");
      async function te(e10, t10, r10) {
        let s10 = /* @__PURE__ */ new Set();
        for (let t11 of ((e11) => {
          let t12 = ["/layout"];
          if (e11.startsWith("/")) {
            let r11 = e11.split("/");
            for (let e12 = 1; e12 < r11.length + 1; e12++) {
              let s11 = r11.slice(0, e12).join("/");
              s11 && (s11.endsWith("/page") || s11.endsWith("/route") || (s11 = `${s11}${!s11.endsWith("/") ? "/" : ""}layout`), t12.push(s11));
            }
          }
          return t12;
        })(e10)) t11 = `${O}${t11}`, s10.add(t11);
        if (t10 && (!r10 || 0 === r10.size)) {
          let e11 = `${O}${t10}`;
          s10.add(e11);
        }
        s10.has(`${O}/`) && s10.add(`${O}/index`), s10.has(`${O}/index`) && s10.add(`${O}/`);
        let i10 = Array.from(s10);
        return { tags: i10, expirationsByCacheKind: function(e11) {
          let t11 = /* @__PURE__ */ new Map(), r11 = eQ();
          if (r11) for (let [s11, i11] of r11) "getExpiration" in i11 && t11.set(s11, e6(async () => i11.getExpiration(e11)));
          return t11;
        }(i10) };
      }
      let tt = Symbol.for("NextInternalRequestMeta");
      class tr extends Y {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new w({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new w({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        waitUntil() {
          throw Object.defineProperty(new w({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      let ts = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 }, ti = (e10, t10) => eq().withPropagatedContext(e10.headers, t10, ts), tn = false;
      async function ta(t10) {
        var r10, s10, i10, n10, a10;
        let o10, c10, l10, u10, h10;
        !function() {
          if (!tn && (tn = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: t11, wrapRequestHandler: r11 } = e.r(69369);
            t11(), ti = r11(ti);
          }
        }(), await y();
        let d10 = void 0 !== globalThis.__BUILD_MANIFEST;
        t10.request.url = t10.request.url.replace(/\.rsc($|\?)/, "$1");
        let p2 = t10.bypassNextUrl ? new URL(t10.request.url) : new W(t10.request.url, { headers: t10.request.headers, nextConfig: t10.request.nextConfig });
        for (let e10 of [...p2.searchParams.keys()]) {
          let t11 = p2.searchParams.getAll(e10), r11 = function(e11) {
            for (let t12 of ["nxtP", "nxtI"]) if (e11 !== t12 && e11.startsWith(t12)) return e11.substring(t12.length);
            return null;
          }(e10);
          if (r11) {
            for (let e11 of (p2.searchParams.delete(r11), t11)) p2.searchParams.append(r11, e11);
            p2.searchParams.delete(e10);
          }
        }
        let m2 = process.env.__NEXT_BUILD_ID || "";
        "buildId" in p2 && (m2 = p2.buildId || "", p2.buildId = "");
        let f2 = function(e10) {
          let t11 = new Headers();
          for (let [r11, s11] of Object.entries(e10)) for (let e11 of Array.isArray(s11) ? s11 : [s11]) void 0 !== e11 && ("number" == typeof e11 && (e11 = e11.toString()), t11.append(r11, e11));
          return t11;
        }(t10.request.headers), g2 = f2.has("x-nextjs-data"), b2 = "1" === f2.get("rsc");
        g2 && "/index" === p2.pathname && (p2.pathname = "/");
        let w2 = /* @__PURE__ */ new Map();
        if (!d10) for (let e10 of en) {
          let t11 = f2.get(e10);
          null !== t11 && (w2.set(e10, t11), f2.delete(e10));
        }
        let v2 = p2.searchParams.get(ea), x2 = new tr({ page: t10.page, input: ((u10 = (l10 = "string" == typeof p2) ? new URL(p2) : p2).searchParams.delete(ea), l10 ? u10.toString() : u10).toString(), init: { body: t10.request.body, headers: f2, method: t10.request.method, nextConfig: t10.request.nextConfig, signal: t10.request.signal } });
        t10.request.requestMeta && (a10 = t10.request.requestMeta, x2[tt] = a10), g2 && Object.defineProperty(x2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && t10.IncrementalCache && (globalThis.__incrementalCache = new t10.IncrementalCache({ CurCacheHandler: t10.incrementalCacheHandler, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: t10.request.headers, getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: e9() }) }));
        let _2 = t10.request.waitUntil ?? (null == (r10 = null == (h10 = globalThis[e8]) ? void 0 : h10.get()) ? void 0 : r10.waitUntil), k2 = new U({ request: x2, page: t10.page, context: _2 ? { waitUntil: _2 } : void 0 });
        if ((o10 = await ti(x2, () => {
          if ("/middleware" === t10.page || "/src/middleware" === t10.page || "/proxy" === t10.page || "/src/proxy" === t10.page) {
            let e10 = k2.waitUntil.bind(k2), r11 = new e7();
            return eq().trace(e_.execute, { spanName: `middleware ${x2.method}`, attributes: { "http.target": x2.nextUrl.pathname, "http.method": x2.method } }, async () => {
              try {
                var s11, i11, n11, a11, o11, l11;
                let u11 = e9(), h11 = await te("/", x2.nextUrl.pathname, null), d11 = (o11 = x2.nextUrl, l11 = (e11) => {
                  c10 = e11;
                }, function(e11, t11, r12, s12, i12, n12, a12, o12, c11, l12) {
                  function u12(e12) {
                    r12 && r12.setHeader("Set-Cookie", e12);
                  }
                  let h12 = {};
                  return { type: "request", phase: e11, implicitTags: n12, url: { pathname: s12.pathname, search: s12.search ?? "" }, rootParams: i12, get headers() {
                    return h12.headers || (h12.headers = function(e12) {
                      let t12 = el.HeadersAdapter.from(e12);
                      for (let e13 of en) t12.delete(e13);
                      return el.HeadersAdapter.seal(t12);
                    }(t11.headers)), h12.headers;
                  }, get cookies() {
                    if (!h12.cookies) {
                      let e12 = new V.RequestCookies(el.HeadersAdapter.from(t11.headers));
                      e$(t11, e12), h12.cookies = eu.RequestCookiesAdapter.seal(e12);
                    }
                    return h12.cookies;
                  }, set cookies(value) {
                    h12.cookies = value;
                  }, get mutableCookies() {
                    if (!h12.mutableCookies) {
                      var d12, p4;
                      let e12, s13 = (d12 = t11.headers, p4 = a12 || (r12 ? u12 : void 0), e12 = new V.RequestCookies(el.HeadersAdapter.from(d12)), eu.MutableRequestCookiesAdapter.wrap(e12, p4));
                      e$(t11, s13), h12.mutableCookies = s13;
                    }
                    return h12.mutableCookies;
                  }, get userspaceMutableCookies() {
                    return h12.userspaceMutableCookies || (h12.userspaceMutableCookies = (0, eu.createCookiesWithMutableAccessCheck)(this)), h12.userspaceMutableCookies;
                  }, get draftMode() {
                    return h12.draftMode || (h12.draftMode = new eB(o12, t11, this.cookies, this.mutableCookies)), h12.draftMode;
                  }, renderResumeDataCache: null, isHmrRefresh: c11, serverComponentsHmrCache: l12 || globalThis.__serverComponentsHmrCache, fallbackParams: null };
                }("action", x2, void 0, o11, {}, h11, l11, u11, false, void 0)), p3 = function({ page: e11, renderOpts: t11, isPrefetchRequest: r12, buildId: s12, previouslyRevalidatedTags: i12, nonce: n12 }) {
                  let a12 = !t11.shouldWaitOnAllReady && !t11.supportsDynamicResponse && !t11.isDraftMode && !t11.isPossibleServerAction, o12 = a12 && (!!process.env.NEXT_DEBUG_BUILD || "1" === process.env.NEXT_SSG_FETCH_METRICS), c11 = { isStaticGeneration: a12, page: e11, route: ec(e11), incrementalCache: t11.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: t11.cacheLifeProfiles, isBuildTimePrerendering: t11.isBuildTimePrerendering, fetchCache: t11.fetchCache, isOnDemandRevalidate: t11.isOnDemandRevalidate, isDraftMode: t11.isDraftMode, isPrefetchRequest: r12, buildId: s12, reactLoadableManifest: (null == t11 ? void 0 : t11.reactLoadableManifest) || {}, assetPrefix: (null == t11 ? void 0 : t11.assetPrefix) || "", nonce: n12, afterContext: function(e12) {
                    let { waitUntil: t12, onClose: r13, onAfterTaskError: s13 } = e12;
                    return new e4({ waitUntil: t12, onClose: r13, onTaskError: s13 });
                  }(t11), cacheComponentsEnabled: t11.cacheComponents, previouslyRevalidatedTags: i12, refreshTagsByCacheKind: function() {
                    let e12 = /* @__PURE__ */ new Map(), t12 = eQ();
                    if (t12) for (let [r13, s13] of t12) "refreshTags" in s13 && e12.set(r13, e6(async () => s13.refreshTags()));
                    return e12;
                  }(), runInCleanSnapshot: (0, e2.createSnapshot)(), shouldTrackFetchMetrics: o12, reactServerErrorsByDigest: /* @__PURE__ */ new Map() };
                  return t11.store = c11, c11;
                }({ page: "/", renderOpts: { cacheLifeProfiles: null == (i11 = t10.request.nextConfig) || null == (s11 = i11.experimental) ? void 0 : s11.cacheLife, cacheComponents: false, experimental: { isRoutePPREnabled: false, authInterrupts: !!(null == (a11 = t10.request.nextConfig) || null == (n11 = a11.experimental) ? void 0 : n11.authInterrupts) }, supportsDynamicResponse: true, waitUntil: e10, onClose: r11.onClose.bind(r11), onAfterTaskError: void 0 }, isPrefetchRequest: "1" === x2.headers.get(ei), buildId: m2 ?? "", previouslyRevalidatedTags: [] });
                return await eJ.workAsyncStorage.run(p3, () => eH.workUnitAsyncStorage.run(d11, t10.handler, x2, k2));
              } finally {
                setTimeout(() => {
                  r11.dispatchClose();
                }, 0);
              }
            });
          }
          return t10.handler(x2, k2);
        })) && !(o10 instanceof Response)) throw Object.defineProperty(TypeError("Expected an instance of Response to be returned"), "__NEXT_ERROR_CODE", { value: "E567", enumerable: false, configurable: true });
        o10 && c10 && o10.headers.set("set-cookie", c10);
        let E2 = null == o10 ? void 0 : o10.headers.get("x-middleware-rewrite");
        if (o10 && E2 && (b2 || !d10)) {
          let e10 = new W(E2, { forceLocale: true, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          d10 || e10.host !== x2.nextUrl.host || (e10.buildId = m2 || e10.buildId, o10.headers.set("x-middleware-rewrite", String(e10)));
          let { url: r11, isRelative: a11 } = es(e10.toString(), p2.toString());
          !d10 && g2 && o10.headers.set("x-nextjs-rewrite", r11);
          let c11 = !a11 && (null == (n10 = t10.request.nextConfig) || null == (i10 = n10.experimental) || null == (s10 = i10.clientParamParsingOrigins) ? void 0 : s10.some((t11) => new RegExp(t11).test(e10.origin)));
          b2 && (a11 || c11) && (p2.pathname !== e10.pathname && o10.headers.set("x-nextjs-rewritten-path", e10.pathname), p2.search !== e10.search && o10.headers.set("x-nextjs-rewritten-query", e10.search.slice(1)));
        }
        if (o10 && E2 && b2 && v2) {
          let e10 = new URL(E2);
          e10.searchParams.has(ea) || (e10.searchParams.set(ea, v2), o10.headers.set("x-middleware-rewrite", e10.toString()));
        }
        let S2 = null == o10 ? void 0 : o10.headers.get("Location");
        if (o10 && S2 && !d10) {
          let e10 = new W(S2, { forceLocale: false, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          o10 = new Response(o10.body, o10), e10.host === p2.host && (e10.buildId = m2 || e10.buildId, o10.headers.set("Location", es(e10, p2).url)), g2 && (o10.headers.delete("Location"), o10.headers.set("x-nextjs-redirect", es(e10.toString(), p2.toString()).url));
        }
        let O2 = o10 || er.next(), T2 = O2.headers.get("x-middleware-override-headers"), C2 = [];
        if (T2) {
          for (let [e10, t11] of w2) O2.headers.set(`x-middleware-request-${e10}`, t11), C2.push(e10);
          C2.length > 0 && O2.headers.set("x-middleware-override-headers", T2 + "," + C2.join(","));
        }
        return { response: O2, waitUntil: ("internal" === k2[N].kind ? Promise.all(k2[N].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: x2.fetchMetrics };
      }
      class to {
        constructor() {
          let e10, t10;
          this.promise = new Promise((r10, s10) => {
            e10 = r10, t10 = s10;
          }), this.resolve = e10, this.reject = t10;
        }
      }
      class tc {
        constructor(e10, t10, r10) {
          this.prev = null, this.next = null, this.key = e10, this.data = t10, this.size = r10;
        }
      }
      class tl {
        constructor() {
          this.prev = null, this.next = null;
        }
      }
      class tu {
        constructor(e10, t10, r10) {
          this.cache = /* @__PURE__ */ new Map(), this.totalSize = 0, this.maxSize = e10, this.calculateSize = t10, this.onEvict = r10, this.head = new tl(), this.tail = new tl(), this.head.next = this.tail, this.tail.prev = this.head;
        }
        addToHead(e10) {
          e10.prev = this.head, e10.next = this.head.next, this.head.next.prev = e10, this.head.next = e10;
        }
        removeNode(e10) {
          e10.prev.next = e10.next, e10.next.prev = e10.prev;
        }
        moveToHead(e10) {
          this.removeNode(e10), this.addToHead(e10);
        }
        removeTail() {
          let e10 = this.tail.prev;
          return this.removeNode(e10), e10;
        }
        set(e10, t10) {
          let r10 = (null == this.calculateSize ? void 0 : this.calculateSize.call(this, t10)) ?? 1;
          if (r10 <= 0) throw Object.defineProperty(Error(`LRUCache: calculateSize returned ${r10}, but size must be > 0. Items with size 0 would never be evicted, causing unbounded cache growth.`), "__NEXT_ERROR_CODE", { value: "E1045", enumerable: false, configurable: true });
          if (r10 > this.maxSize) return console.warn("Single item size exceeds maxSize"), false;
          let s10 = this.cache.get(e10);
          if (s10) s10.data = t10, this.totalSize = this.totalSize - s10.size + r10, s10.size = r10, this.moveToHead(s10);
          else {
            let s11 = new tc(e10, t10, r10);
            this.cache.set(e10, s11), this.addToHead(s11), this.totalSize += r10;
          }
          for (; this.totalSize > this.maxSize && this.cache.size > 0; ) {
            let e11 = this.removeTail();
            this.cache.delete(e11.key), this.totalSize -= e11.size, null == this.onEvict || this.onEvict.call(this, e11.key, e11.data);
          }
          return true;
        }
        has(e10) {
          return this.cache.has(e10);
        }
        get(e10) {
          let t10 = this.cache.get(e10);
          if (t10) return this.moveToHead(t10), t10.data;
        }
        *[Symbol.iterator]() {
          let e10 = this.head.next;
          for (; e10 && e10 !== this.tail; ) {
            let t10 = e10;
            yield [t10.key, t10.data], e10 = e10.next;
          }
        }
        remove(e10) {
          let t10 = this.cache.get(e10);
          t10 && (this.removeNode(t10), this.cache.delete(e10), this.totalSize -= t10.size);
        }
        get size() {
          return this.cache.size;
        }
        get currentSize() {
          return this.totalSize;
        }
      }
      let { env: th, stdout: td } = (null == (ch = globalThis) ? void 0 : ch.process) ?? {}, tp = th && !th.NO_COLOR && (th.FORCE_COLOR || (null == td ? void 0 : td.isTTY) && !th.CI && "dumb" !== th.TERM), tm = (e10, t10, r10, s10) => {
        let i10 = e10.substring(0, s10) + r10, n10 = e10.substring(s10 + t10.length), a10 = n10.indexOf(t10);
        return ~a10 ? i10 + tm(n10, t10, r10, a10) : i10 + n10;
      }, tf = (e10, t10, r10 = e10) => tp ? (s10) => {
        let i10 = "" + s10, n10 = i10.indexOf(t10, e10.length);
        return ~n10 ? e10 + tm(i10, t10, r10, n10) + t10 : e10 + i10 + t10;
      } : String, tg = tf("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m");
      tf("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"), tf("\x1B[3m", "\x1B[23m"), tf("\x1B[4m", "\x1B[24m"), tf("\x1B[7m", "\x1B[27m"), tf("\x1B[8m", "\x1B[28m"), tf("\x1B[9m", "\x1B[29m"), tf("\x1B[30m", "\x1B[39m");
      let ty = tf("\x1B[31m", "\x1B[39m"), tb = tf("\x1B[32m", "\x1B[39m"), tw = tf("\x1B[33m", "\x1B[39m");
      tf("\x1B[34m", "\x1B[39m");
      let tv = tf("\x1B[35m", "\x1B[39m");
      tf("\x1B[38;2;173;127;168m", "\x1B[39m"), tf("\x1B[36m", "\x1B[39m");
      let tx = tf("\x1B[37m", "\x1B[39m");
      tf("\x1B[90m", "\x1B[39m"), tf("\x1B[40m", "\x1B[49m"), tf("\x1B[41m", "\x1B[49m"), tf("\x1B[42m", "\x1B[49m"), tf("\x1B[43m", "\x1B[49m"), tf("\x1B[44m", "\x1B[49m"), tf("\x1B[45m", "\x1B[49m"), tf("\x1B[46m", "\x1B[49m"), tf("\x1B[47m", "\x1B[49m"), tx(tg("\u25CB")), ty(tg("\u2A2F")), tw(tg("\u26A0")), tx(tg(" ")), tb(tg("\u2713")), tv(tg("\xBB")), new tu(1e4, (e10) => e10.length), new tu(1e4, (e10) => e10.length);
      var t_ = ((cl = {}).APP_PAGE = "APP_PAGE", cl.APP_ROUTE = "APP_ROUTE", cl.PAGES = "PAGES", cl.FETCH = "FETCH", cl.REDIRECT = "REDIRECT", cl.IMAGE = "IMAGE", cl), tk = ((cu = {}).APP_PAGE = "APP_PAGE", cu.APP_ROUTE = "APP_ROUTE", cu.PAGES = "PAGES", cu.FETCH = "FETCH", cu.IMAGE = "IMAGE", cu);
      function tE() {
      }
      let tS = new TextEncoder();
      function tO(e10) {
        return new ReadableStream({ start(t10) {
          t10.enqueue(tS.encode(e10)), t10.close();
        } });
      }
      function tT(e10) {
        return new ReadableStream({ start(t10) {
          t10.enqueue(e10), t10.close();
        } });
      }
      async function tC(e10, t10) {
        let r10 = new TextDecoder("utf-8", { fatal: true }), s10 = "";
        for await (let i10 of e10) {
          if (null == t10 ? void 0 : t10.aborted) return s10;
          s10 += r10.decode(i10, { stream: true });
        }
        return s10 + r10.decode();
      }
      let tR = "ResponseAborted";
      class tA extends Error {
        constructor(...e10) {
          super(...e10), this.name = tR;
        }
      }
      let tP = 0, tI = 0, tN = 0;
      function tL(e10) {
        return (null == e10 ? void 0 : e10.name) === "AbortError" || (null == e10 ? void 0 : e10.name) === tR;
      }
      async function tU(e10, t10, r10) {
        try {
          let s10, { errored: i10, destroyed: n10 } = t10;
          if (i10 || n10) return;
          let a10 = (s10 = new AbortController(), t10.once("close", () => {
            t10.writableFinished || s10.abort(new tA());
          }), s10), o10 = function(e11, t11) {
            let r11 = false, s11 = new to();
            function i11() {
              s11.resolve();
            }
            e11.on("drain", i11), e11.once("close", () => {
              e11.off("drain", i11), s11.resolve();
            });
            let n11 = new to();
            return e11.once("finish", () => {
              n11.resolve();
            }), new WritableStream({ write: async (t12) => {
              if (!r11) {
                if (r11 = true, "performance" in globalThis && process.env.NEXT_OTEL_PERFORMANCE_PREFIX) {
                  let e12 = function(e13 = {}) {
                    let t13 = 0 === tP ? void 0 : { clientComponentLoadStart: tP, clientComponentLoadTimes: tI, clientComponentLoadCount: tN };
                    return e13.reset && (tP = 0, tI = 0, tN = 0), t13;
                  }();
                  e12 && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-client-component-loading`, { start: e12.clientComponentLoadStart, end: e12.clientComponentLoadStart + e12.clientComponentLoadTimes });
                }
                e11.flushHeaders(), eq().trace(em.startResponse, { spanName: "start response" }, () => void 0);
              }
              try {
                let r12 = e11.write(t12);
                "flush" in e11 && "function" == typeof e11.flush && e11.flush(), r12 || (await s11.promise, s11 = new to());
              } catch (t13) {
                throw e11.end(), Object.defineProperty(Error("failed to write chunk to response", { cause: t13 }), "__NEXT_ERROR_CODE", { value: "E321", enumerable: false, configurable: true });
              }
            }, abort: (t12) => {
              e11.writableFinished || e11.destroy(t12);
            }, close: async () => {
              if (t11 && await t11, !e11.writableFinished) return e11.end(), n11.promise;
            } });
          }(t10, r10);
          await e10.pipeTo(o10, { signal: a10.signal });
        } catch (e11) {
          if (tL(e11)) return;
          throw Object.defineProperty(Error("failed to pipe response", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E180", enumerable: false, configurable: true });
        }
      }
      class tM {
        static #e = this.EMPTY = new tM(null, { metadata: {}, contentType: null });
        static fromStatic(e10, t10) {
          return new tM(e10, { metadata: {}, contentType: t10 });
        }
        constructor(e10, { contentType: t10, waitUntil: r10, metadata: s10 }) {
          this.response = e10, this.contentType = t10, this.metadata = s10, this.waitUntil = r10;
        }
        assignMetadata(e10) {
          Object.assign(this.metadata, e10);
        }
        get isNull() {
          return null === this.response;
        }
        get isDynamic() {
          return "string" != typeof this.response;
        }
        toUnchunkedString(e10 = false) {
          if (null === this.response) return "";
          if ("string" != typeof this.response) {
            if (!e10) throw Object.defineProperty(new eW.InvariantError("dynamic responses cannot be unchunked. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E732", enumerable: false, configurable: true });
            return tC(this.readable);
          }
          return this.response;
        }
        get readable() {
          return null === this.response ? new ReadableStream({ start(e10) {
            e10.close();
          } }) : "string" == typeof this.response ? tO(this.response) : eG.Buffer.isBuffer(this.response) ? tT(this.response) : Array.isArray(this.response) ? function(...e10) {
            if (0 === e10.length) return new ReadableStream({ start(e11) {
              e11.close();
            } });
            if (1 === e10.length) return e10[0];
            let { readable: t10, writable: r10 } = new TransformStream(), s10 = e10[0].pipeTo(r10, { preventClose: true }), i10 = 1;
            for (; i10 < e10.length - 1; i10++) {
              let t11 = e10[i10];
              s10 = s10.then(() => t11.pipeTo(r10, { preventClose: true }));
            }
            let n10 = e10[i10];
            return (s10 = s10.then(() => n10.pipeTo(r10))).catch(tE), t10;
          }(...this.response) : this.response;
        }
        coerce() {
          return null === this.response ? [] : "string" == typeof this.response ? [tO(this.response)] : Array.isArray(this.response) ? this.response : eG.Buffer.isBuffer(this.response) ? [tT(this.response)] : [this.response];
        }
        pipeThrough(e10) {
          this.response = this.readable.pipeThrough(e10);
        }
        unshift(e10) {
          this.response = this.coerce(), this.response.unshift(e10);
        }
        push(e10) {
          this.response = this.coerce(), this.response.push(e10);
        }
        async pipeTo(e10) {
          try {
            await this.readable.pipeTo(e10, { preventClose: true }), this.waitUntil && await this.waitUntil, await e10.close();
          } catch (t10) {
            if (tL(t10)) return void await e10.abort(t10);
            throw t10;
          }
        }
        async pipeToNodeResponse(e10) {
          await tU(this.readable, e10, this.waitUntil);
        }
      }
      function tD(e10, t10) {
        if (!e10) return t10;
        let r10 = parseInt(e10, 10);
        return Number.isFinite(r10) && r10 > 0 ? r10 : t10;
      }
      tD(process.env.NEXT_PRIVATE_RESPONSE_CACHE_TTL, 1e4), tD(process.env.NEXT_PRIVATE_RESPONSE_CACHE_MAX_SIZE, 150);
      var tj = e.i(90539);
      let tq = /* @__PURE__ */ new Map(), tz = (e10, t10) => {
        for (let r10 of e10) {
          let e11 = tq.get(r10), s10 = null == e11 ? void 0 : e11.expired;
          if ("number" == typeof s10 && s10 <= Date.now() && s10 > t10) return true;
        }
        return false;
      }, tB = (e10, t10) => {
        for (let r10 of e10) {
          let e11 = tq.get(r10), s10 = (null == e11 ? void 0 : e11.stale) ?? 0;
          if ("number" == typeof s10 && s10 > t10) return true;
        }
        return false;
      };
      class t$ {
        constructor(e10) {
          this.fs = e10, this.tasks = [];
        }
        findOrCreateTask(e10) {
          for (let t11 of this.tasks) if (t11[0] === e10) return t11;
          let t10 = this.fs.mkdir(e10);
          t10.catch(() => {
          });
          let r10 = [e10, t10, []];
          return this.tasks.push(r10), r10;
        }
        append(e10, t10) {
          let r10 = this.findOrCreateTask(tj.default.dirname(e10)), s10 = r10[1].then(() => this.fs.writeFile(e10, t10));
          s10.catch(() => {
          }), r10[2].push(s10);
        }
        wait() {
          return Promise.all(this.tasks.flatMap((e10) => e10[2]));
        }
      }
      function tK(e10) {
        return (null == e10 ? void 0 : e10.length) || 0;
      }
      class tH {
        static #e = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
        constructor(e10) {
          this.fs = e10.fs, this.flushToDisk = e10.flushToDisk, this.serverDistDir = e10.serverDistDir, this.revalidatedTags = e10.revalidatedTags, e10.maxMemoryCacheSize ? tH.memoryCache ? tH.debug && console.log("FileSystemCache: memory store already initialized") : (tH.debug && console.log("FileSystemCache: using memory store for fetch cache"), tH.memoryCache = function(e11) {
            return r || (r = new tu(e11, function({ value: e12 }) {
              var t10, r10;
              if (!e12) return 25;
              if (e12.kind === t_.REDIRECT) return JSON.stringify(e12.props).length;
              if (e12.kind === t_.IMAGE) throw Object.defineProperty(Error("invariant image should not be incremental-cache"), "__NEXT_ERROR_CODE", { value: "E501", enumerable: false, configurable: true });
              if (e12.kind === t_.FETCH) return JSON.stringify(e12.data || "").length;
              if (e12.kind === t_.APP_ROUTE) return e12.body.length;
              return e12.kind === t_.APP_PAGE ? Math.max(1, e12.html.length + tK(e12.rscData) + ((null == (r10 = e12.postponed) ? void 0 : r10.length) || 0) + function(e13) {
                if (!e13) return 0;
                let t11 = 0;
                for (let [r11, s10] of e13) t11 += r11.length + tK(s10);
                return t11;
              }(e12.segmentData)) : e12.html.length + ((null == (t10 = JSON.stringify(e12.pageData)) ? void 0 : t10.length) || 0);
            })), r;
          }(e10.maxMemoryCacheSize)) : tH.debug && console.log("FileSystemCache: not using memory store for fetch cache");
        }
        resetRequestCache() {
        }
        async revalidateTag(e10, t10) {
          if (e10 = "string" == typeof e10 ? [e10] : e10, tH.debug && console.log("FileSystemCache: revalidateTag", e10, t10), 0 === e10.length) return;
          let r10 = Date.now();
          for (let s10 of e10) {
            let e11 = tq.get(s10) || {};
            if (t10) {
              let i10 = { ...e11 };
              i10.stale = r10, void 0 !== t10.expire && (i10.expired = r10 + 1e3 * t10.expire), tq.set(s10, i10);
            } else tq.set(s10, { ...e11, expired: r10 });
          }
        }
        async get(...e10) {
          var t10, r10, s10, i10, n10, a10;
          let [o10, c10] = e10, { kind: l10 } = c10, u10 = null == (t10 = tH.memoryCache) ? void 0 : t10.get(o10);
          if (tH.debug && (l10 === tk.FETCH ? console.log("FileSystemCache: get", o10, c10.tags, l10, !!u10) : console.log("FileSystemCache: get", o10, l10, !!u10)), (null == u10 || null == (r10 = u10.value) ? void 0 : r10.kind) === t_.APP_PAGE || (null == u10 || null == (s10 = u10.value) ? void 0 : s10.kind) === t_.APP_ROUTE || (null == u10 || null == (i10 = u10.value) ? void 0 : i10.kind) === t_.PAGES) {
            let e11 = null == (a10 = u10.value.headers) ? void 0 : a10[E];
            if ("string" == typeof e11) {
              let t11 = e11.split(",");
              if (t11.length > 0 && tz(t11, u10.lastModified)) return tH.debug && console.log("FileSystemCache: expired tags", t11), null;
            }
          } else if ((null == u10 || null == (n10 = u10.value) ? void 0 : n10.kind) === t_.FETCH) {
            let e11 = c10.kind === tk.FETCH ? [...c10.tags || [], ...c10.softTags || []] : [];
            if (e11.some((e12) => this.revalidatedTags.includes(e12))) return tH.debug && console.log("FileSystemCache: was revalidated", e11), null;
            if (tz(e11, u10.lastModified)) return tH.debug && console.log("FileSystemCache: expired tags", e11), null;
          }
          return u10 ?? null;
        }
        async set(e10, t10, r10) {
          var s10;
          if (null == (s10 = tH.memoryCache) || s10.set(e10, { value: t10, lastModified: Date.now() }), tH.debug && console.log("FileSystemCache: set", e10), !this.flushToDisk || !t10) return;
          let i10 = new t$(this.fs);
          if (t10.kind === t_.APP_ROUTE) {
            let r11 = this.getFilePath(`${e10}.body`, tk.APP_ROUTE);
            i10.append(r11, t10.body);
            let s11 = { headers: t10.headers, status: t10.status, postponed: void 0, segmentPaths: void 0, prefetchHints: void 0 };
            i10.append(r11.replace(/\.body$/, k), JSON.stringify(s11, null, 2));
          } else if (t10.kind === t_.PAGES || t10.kind === t_.APP_PAGE) {
            let s11 = t10.kind === t_.APP_PAGE, n10 = this.getFilePath(`${e10}.html`, s11 ? tk.APP_PAGE : tk.PAGES);
            if (i10.append(n10, t10.html), r10.fetchCache || r10.isFallback || r10.isRoutePPREnabled || i10.append(this.getFilePath(`${e10}${s11 ? ".rsc" : ".json"}`, s11 ? tk.APP_PAGE : tk.PAGES), s11 ? t10.rscData : JSON.stringify(t10.pageData)), (null == t10 ? void 0 : t10.kind) === t_.APP_PAGE) {
              let e11;
              if (t10.segmentData) {
                e11 = [];
                let r12 = n10.replace(/\.html$/, ".segments");
                for (let [s12, n11] of t10.segmentData) {
                  e11.push(s12);
                  let t11 = r12 + s12 + ".segment.rsc";
                  i10.append(t11, n11);
                }
              }
              let r11 = { headers: t10.headers, status: t10.status, postponed: t10.postponed, segmentPaths: e11, prefetchHints: void 0 };
              i10.append(n10.replace(/\.html$/, k), JSON.stringify(r11));
            }
          } else if (t10.kind === t_.FETCH) {
            let s11 = this.getFilePath(e10, tk.FETCH);
            i10.append(s11, JSON.stringify({ ...t10, tags: r10.fetchCache ? r10.tags : [] }));
          }
          await i10.wait();
        }
        getFilePath(e10, t10) {
          switch (t10) {
            case tk.FETCH:
              return tj.default.join(this.serverDistDir, "..", "cache", "fetch-cache", e10);
            case tk.PAGES:
              return tj.default.join(this.serverDistDir, "pages", e10);
            case tk.IMAGE:
            case tk.APP_PAGE:
            case tk.APP_ROUTE:
              return tj.default.join(this.serverDistDir, "app", e10);
            default:
              throw Object.defineProperty(Error(`Unexpected file path kind: ${t10}`), "__NEXT_ERROR_CODE", { value: "E479", enumerable: false, configurable: true });
          }
        }
      }
      let tF = ["(..)(..)", "(.)", "(..)", "(...)"], tW = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/, tJ = /\/\[[^/]+\](?=\/|$)/;
      function tG(e10) {
        return e10.replace(/(?:\/index)?\/?$/, "") || "/";
      }
      class tV {
        static #e = this.cacheControls = /* @__PURE__ */ new Map();
        constructor(e10) {
          this.prerenderManifest = e10;
        }
        get(e10) {
          let t10 = tV.cacheControls.get(e10);
          if (t10) return t10;
          let r10 = this.prerenderManifest.routes[e10];
          if (r10) {
            let { initialRevalidateSeconds: e11, initialExpireSeconds: t11 } = r10;
            if (void 0 !== e11) return { revalidate: e11, expire: t11 };
          }
          let s10 = this.prerenderManifest.dynamicRoutes[e10];
          if (s10) {
            let { fallbackRevalidate: e11, fallbackExpire: t11 } = s10;
            if (void 0 !== e11) return { revalidate: e11, expire: t11 };
          }
        }
        set(e10, t10) {
          tV.cacheControls.set(e10, t10);
        }
        clear() {
          tV.cacheControls.clear();
        }
      }
      e.i(85626);
      class tX {
        static #e = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
        constructor({ fs: e10, dev: t10, flushToDisk: r10, minimalMode: s10, serverDistDir: i10, requestHeaders: n10, maxMemoryCacheSize: a10, getPrerenderManifest: o10, fetchCacheKeyPrefix: c10, CurCacheHandler: l10, allowedRevalidateHeaderKeys: u10 }) {
          var h10, d10, p2, m2;
          this.locks = /* @__PURE__ */ new Map(), this.hasCustomCacheHandler = !!l10;
          const f2 = Symbol.for("@next/cache-handlers"), g2 = globalThis;
          if (l10) tX.debug && console.log("IncrementalCache: using custom cache handler", l10.name);
          else {
            const t11 = g2[f2];
            (null == t11 ? void 0 : t11.FetchCache) ? (l10 = t11.FetchCache, tX.debug && console.log("IncrementalCache: using global FetchCache cache handler")) : e10 && i10 && (tX.debug && console.log("IncrementalCache: using filesystem cache handler"), l10 = tH);
          }
          process.env.__NEXT_TEST_MAX_ISR_CACHE && (a10 = parseInt(process.env.__NEXT_TEST_MAX_ISR_CACHE, 10)), this.dev = t10, this.disableForTestmode = "true" === process.env.NEXT_PRIVATE_TEST_PROXY, this.minimalMode = s10, this.requestHeaders = n10, this.allowedRevalidateHeaderKeys = u10, this.prerenderManifest = o10(), this.cacheControls = new tV(this.prerenderManifest), this.fetchCacheKeyPrefix = c10;
          let y2 = [];
          n10[_] === (null == (d10 = this.prerenderManifest) || null == (h10 = d10.preview) ? void 0 : h10.previewModeId) && (this.isOnDemandRevalidate = true), s10 && (y2 = this.revalidatedTags = function(e11, t11) {
            return "string" == typeof e11[S] && e11["x-next-revalidate-tag-token"] === t11 ? e11[S].split(",") : [];
          }(n10, null == (m2 = this.prerenderManifest) || null == (p2 = m2.preview) ? void 0 : p2.previewModeId)), l10 && (this.cacheHandler = new l10({ dev: t10, fs: e10, flushToDisk: r10, serverDistDir: i10, revalidatedTags: y2, maxMemoryCacheSize: a10, _requestHeaders: n10, fetchCacheKeyPrefix: c10 }));
        }
        calculateRevalidate(e10, t10, r10, s10) {
          if (r10) return Math.floor(performance.timeOrigin + performance.now() - 1e3);
          let i10 = this.cacheControls.get(tG(e10)), n10 = i10 ? i10.revalidate : !s10 && 1;
          return "number" == typeof n10 ? 1e3 * n10 + t10 : n10;
        }
        _getPathname(e10, t10) {
          return t10 ? e10 : /^\/index(\/|$)/.test(e10) && !function(e11, t11 = true) {
            return (void 0 !== e11.split("/").find((e12) => tF.find((t12) => e12.startsWith(t12))) && (e11 = function(e12) {
              let t12, r10, s10;
              for (let i10 of e12.split("/")) if (r10 = tF.find((e13) => i10.startsWith(e13))) {
                [t12, s10] = e12.split(r10, 2);
                break;
              }
              if (!t12 || !r10 || !s10) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`), "__NEXT_ERROR_CODE", { value: "E269", enumerable: false, configurable: true });
              switch (t12 = ec(t12), r10) {
                case "(.)":
                  s10 = "/" === t12 ? `/${s10}` : t12 + "/" + s10;
                  break;
                case "(..)":
                  if ("/" === t12) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Cannot use (..) marker at the root level, use (.) instead.`), "__NEXT_ERROR_CODE", { value: "E207", enumerable: false, configurable: true });
                  s10 = t12.split("/").slice(0, -1).concat(s10).join("/");
                  break;
                case "(...)":
                  s10 = "/" + s10;
                  break;
                case "(..)(..)":
                  let i10 = t12.split("/");
                  if (i10.length <= 2) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Cannot use (..)(..) marker at the root level or one level up.`), "__NEXT_ERROR_CODE", { value: "E486", enumerable: false, configurable: true });
                  s10 = i10.slice(0, -2).concat(s10).join("/");
                  break;
                default:
                  throw Object.defineProperty(Error("Invariant: unexpected marker"), "__NEXT_ERROR_CODE", { value: "E112", enumerable: false, configurable: true });
              }
              return { interceptingRoute: t12, interceptedRoute: s10 };
            }(e11).interceptedRoute), t11) ? tJ.test(e11) : tW.test(e11);
          }(e10) ? `/index${e10}` : "/" === e10 ? "/index" : eo(e10);
        }
        resetRequestCache() {
          var e10, t10;
          null == (t10 = this.cacheHandler) || null == (e10 = t10.resetRequestCache) || e10.call(t10);
        }
        async lock(e10) {
          for (; ; ) {
            let t11 = this.locks.get(e10);
            if (tX.debug && console.log("IncrementalCache: lock get", e10, !!t11), !t11) break;
            await t11;
          }
          let { resolve: t10, promise: r10 } = new to();
          return tX.debug && console.log("IncrementalCache: successfully locked", e10), this.locks.set(e10, r10), () => {
            t10(), this.locks.delete(e10);
          };
        }
        async revalidateTag(e10, t10) {
          var r10;
          return null == (r10 = this.cacheHandler) ? void 0 : r10.revalidateTag(e10, t10);
        }
        async generateCacheKey(e10, t10 = {}) {
          let r10 = [], s10 = new TextEncoder(), i10 = new TextDecoder();
          if (t10.body) if (t10.body instanceof Uint8Array) r10.push(i10.decode(t10.body)), t10._ogBody = t10.body;
          else if ("function" == typeof t10.body.getReader) {
            let e11 = t10.body, n11 = [];
            try {
              await e11.pipeTo(new WritableStream({ write(e12) {
                "string" == typeof e12 ? (n11.push(s10.encode(e12)), r10.push(e12)) : (n11.push(e12), r10.push(i10.decode(e12, { stream: true })));
              } })), r10.push(i10.decode());
              let a11 = n11.reduce((e12, t11) => e12 + t11.length, 0), o11 = new Uint8Array(a11), c10 = 0;
              for (let e12 of n11) o11.set(e12, c10), c10 += e12.length;
              t10._ogBody = o11;
            } catch (e12) {
              console.error("Problem reading body", e12);
            }
          } else if ("function" == typeof t10.body.keys) {
            let e11 = t10.body;
            for (let s11 of (t10._ogBody = t10.body, /* @__PURE__ */ new Set([...e11.keys()]))) {
              let t11 = e11.getAll(s11);
              r10.push(`${s11}=${(await Promise.all(t11.map(async (e12) => "string" == typeof e12 ? e12 : await e12.text()))).join(",")}`);
            }
          } else if ("function" == typeof t10.body.arrayBuffer) {
            let e11 = t10.body, s11 = await e11.arrayBuffer();
            r10.push(await e11.text()), t10._ogBody = new Blob([s11], { type: e11.type });
          } else "string" == typeof t10.body && (r10.push(t10.body), t10._ogBody = t10.body);
          let n10 = "function" == typeof (t10.headers || {}).keys ? Object.fromEntries(t10.headers) : Object.assign({}, t10.headers);
          "traceparent" in n10 && delete n10.traceparent, "tracestate" in n10 && delete n10.tracestate;
          let a10 = JSON.stringify(["v3", this.fetchCacheKeyPrefix || "", e10, t10.method, n10, t10.mode, t10.redirect, t10.credentials, t10.referrer, t10.referrerPolicy, t10.integrity, t10.cache, r10]);
          {
            var o10;
            let e11 = s10.encode(a10);
            return o10 = await crypto.subtle.digest("SHA-256", e11), Array.prototype.map.call(new Uint8Array(o10), (e12) => e12.toString(16).padStart(2, "0")).join("");
          }
        }
        async get(e10, t10) {
          var r10, s10, i10, n10, a10, o10, c10;
          let l10, u10;
          if (t10.kind === tk.FETCH) {
            let r11 = eH.workUnitAsyncStorage.getStore(), s11 = r11 ? (0, eK.getRenderResumeDataCache)(r11) : null;
            if (s11) {
              let r12 = s11.fetch.get(e10);
              if ((null == r12 ? void 0 : r12.kind) === t_.FETCH) {
                let s12 = eJ.workAsyncStorage.getStore();
                if (![...t10.tags || [], ...t10.softTags || []].some((e11) => {
                  var t11, r13;
                  return (null == (t11 = this.revalidatedTags) ? void 0 : t11.includes(e11)) || (null == s12 || null == (r13 = s12.pendingRevalidatedTags) ? void 0 : r13.some((t12) => t12.tag === e11));
                })) return tX.debug && console.log("IncrementalCache: rdc:hit", e10), { isStale: false, value: r12 };
                tX.debug && console.log("IncrementalCache: rdc:revalidated-tag", e10);
              } else tX.debug && console.log("IncrementalCache: rdc:miss", e10);
            } else tX.debug && console.log("IncrementalCache: rdc:no-resume-data");
          }
          if (this.disableForTestmode || this.dev && (t10.kind !== tk.FETCH || "no-cache" === this.requestHeaders["cache-control"])) return null;
          e10 = this._getPathname(e10, t10.kind === tk.FETCH);
          let h10 = await (null == (r10 = this.cacheHandler) ? void 0 : r10.get(e10, t10));
          if (t10.kind === tk.FETCH) {
            if (!h10) return null;
            if ((null == (i10 = h10.value) ? void 0 : i10.kind) !== t_.FETCH) throw Object.defineProperty(new eW.InvariantError(`Expected cached value for cache key ${JSON.stringify(e10)} to be a "FETCH" kind, got ${JSON.stringify(null == (n10 = h10.value) ? void 0 : n10.kind)} instead.`), "__NEXT_ERROR_CODE", { value: "E653", enumerable: false, configurable: true });
            let r11 = eJ.workAsyncStorage.getStore(), s11 = [...t10.tags || [], ...t10.softTags || []];
            if (s11.some((e11) => {
              var t11, s12;
              return (null == (t11 = this.revalidatedTags) ? void 0 : t11.includes(e11)) || (null == r11 || null == (s12 = r11.pendingRevalidatedTags) ? void 0 : s12.some((t12) => t12.tag === e11));
            })) return tX.debug && console.log("IncrementalCache: expired tag", e10), null;
            let a11 = eH.workUnitAsyncStorage.getStore();
            if (a11) {
              let t11 = (0, eK.getPrerenderResumeDataCache)(a11);
              t11 && (tX.debug && console.log("IncrementalCache: rdc:set", e10), t11.fetch.set(e10, h10.value));
            }
            let o11 = t10.revalidate || h10.value.revalidate, c11 = (performance.timeOrigin + performance.now() - (h10.lastModified || 0)) / 1e3 > o11, l11 = h10.value.data;
            return tz(s11, h10.lastModified) ? null : (tB(s11, h10.lastModified) && (c11 = true), { isStale: c11, value: { kind: t_.FETCH, data: l11, revalidate: o11 } });
          }
          if ((null == h10 || null == (s10 = h10.value) ? void 0 : s10.kind) === t_.FETCH) throw Object.defineProperty(new eW.InvariantError(`Expected cached value for cache key ${JSON.stringify(e10)} not to be a ${JSON.stringify(t10.kind)} kind, got "FETCH" instead.`), "__NEXT_ERROR_CODE", { value: "E652", enumerable: false, configurable: true });
          let d10 = null, { isFallback: p2 } = t10, m2 = this.cacheControls.get(tG(e10));
          if ((null == h10 ? void 0 : h10.lastModified) === -1) l10 = -1, u10 = -31536e6;
          else {
            let r11 = performance.timeOrigin + performance.now(), s11 = (null == h10 ? void 0 : h10.lastModified) || r11;
            if (void 0 === (l10 = false !== (u10 = this.calculateRevalidate(e10, s11, this.dev ?? false, t10.isFallback)) && u10 < r11 || void 0) && ((null == h10 || null == (a10 = h10.value) ? void 0 : a10.kind) === t_.APP_PAGE || (null == h10 || null == (o10 = h10.value) ? void 0 : o10.kind) === t_.APP_ROUTE)) {
              let e11 = null == (c10 = h10.value.headers) ? void 0 : c10[E];
              if ("string" == typeof e11) {
                let t11 = e11.split(",");
                t11.length > 0 && (tz(t11, s11) ? l10 = -1 : tB(t11, s11) && (l10 = true));
              }
            }
          }
          return h10 && (d10 = { isStale: l10, cacheControl: m2, revalidateAfter: u10, value: h10.value, isFallback: p2 }), !h10 && this.prerenderManifest.notFoundRoutes.includes(e10) && (d10 = { isStale: l10, value: null, cacheControl: m2, revalidateAfter: u10, isFallback: p2 }, this.set(e10, d10.value, { ...t10, cacheControl: m2 })), d10;
        }
        async set(e10, t10, r10) {
          if ((null == t10 ? void 0 : t10.kind) === t_.FETCH) {
            let r11 = eH.workUnitAsyncStorage.getStore(), s11 = r11 ? (0, eK.getPrerenderResumeDataCache)(r11) : null;
            s11 && (tX.debug && console.log("IncrementalCache: rdc:set", e10), s11.fetch.set(e10, t10));
          }
          if (this.disableForTestmode || this.dev && !r10.fetchCache) return;
          e10 = this._getPathname(e10, r10.fetchCache);
          let s10 = JSON.stringify(t10).length;
          if (r10.fetchCache && s10 > 2097152 && !this.hasCustomCacheHandler && !r10.isImplicitBuildTimeCache) {
            let t11 = `Failed to set Next.js data cache for ${r10.fetchUrl || e10}, items over 2MB can not be cached (${s10} bytes)`;
            if (this.dev) throw Object.defineProperty(Error(t11), "__NEXT_ERROR_CODE", { value: "E1003", enumerable: false, configurable: true });
            console.warn(t11);
            return;
          }
          try {
            var i10;
            !r10.fetchCache && r10.cacheControl && this.cacheControls.set(tG(e10), r10.cacheControl), await (null == (i10 = this.cacheHandler) ? void 0 : i10.set(e10, t10, r10));
          } catch (t11) {
            console.warn("Failed to update prerender cache for", e10, t11);
          }
        }
      }
      let tY = () => {
        try {
          return true;
        } catch {
        }
        return false;
      }, tQ = /* @__PURE__ */ new Set(), tZ = [".lcl.dev", ".lclstage.dev", ".lclclerk.com"], t0 = [".accounts.dev", ".accountsstage.dev", ".accounts.lclclerk.com"], t1 = [".lcl.dev", ".stg.dev", ".lclstage.dev", ".stgstage.dev", ".dev.lclclerk.com", ".stg.lclclerk.com", ".accounts.lclclerk.com", "accountsstage.dev", "accounts.dev"], t2 = [".lcl.dev", "lclstage.dev", ".lclclerk.com", ".accounts.lclclerk.com"], t3 = [".accountsstage.dev"], t4 = "https://api.clerk.com", t5 = "https://frontend-api.clerk.dev", t6 = "/__clerk", t7 = (e10) => "u" > typeof atob && "function" == typeof atob ? atob(e10) : void 0 !== globalThis.Buffer ? globalThis.Buffer.from(e10, "base64").toString() : e10, t9 = "pk_live_";
      function t8(e10) {
        if (!e10.endsWith("$")) return false;
        let t10 = e10.slice(0, -1);
        return !t10.includes("$") && t10.includes(".");
      }
      function re(e10, t10 = {}) {
        let r10;
        if (!(e10 = e10 || "") || !rt(e10)) {
          if (t10.fatal && !e10) throw Error("Publishable key is missing. Ensure that your publishable key is correctly configured. Double-check your environment configuration for your keys, or access them here: https://dashboard.clerk.com/last-active?path=api-keys");
          if (t10.fatal && !rt(e10)) throw Error("Publishable key not valid.");
          return null;
        }
        let s10 = e10.startsWith(t9) ? "production" : "development";
        try {
          r10 = t7(e10.split("_")[2]);
        } catch {
          if (t10.fatal) throw Error("Publishable key not valid: Failed to decode key.");
          return null;
        }
        if (!t8(r10)) {
          if (t10.fatal) throw Error("Publishable key not valid: Decoded key has invalid format.");
          return null;
        }
        let i10 = r10.slice(0, -1);
        return t10.proxyUrl ? i10 = t10.proxyUrl : "development" !== s10 && t10.domain && t10.isSatellite && (i10 = `clerk.${t10.domain}`), { instanceType: s10, frontendApi: i10 };
      }
      function rt(e10 = "") {
        try {
          if (!(e10.startsWith(t9) || e10.startsWith("pk_test_"))) return false;
          let t10 = e10.split("_");
          if (3 !== t10.length) return false;
          let r10 = t10[2];
          if (!r10) return false;
          return t8(t7(r10));
        } catch {
          return false;
        }
      }
      function rr(e10) {
        return e10.startsWith("live_") || e10.startsWith("pk_live_");
      }
      function rs(e10) {
        return e10.startsWith("test_") || e10.startsWith("sk_test_");
      }
      async function ri(e10, t10 = globalThis.crypto.subtle) {
        var r10;
        let s10 = new TextEncoder().encode(e10);
        return (r10 = String.fromCharCode(...new Uint8Array(await t10.digest("sha-1", s10))), "u" > typeof btoa && "function" == typeof btoa ? btoa(r10) : void 0 !== globalThis.Buffer ? globalThis.Buffer.from(r10).toString("base64") : r10).replace(/\+/gi, "-").replace(/\//gi, "_").substring(0, 8);
      }
      let rn = { initialDelay: 125, maxDelayBetweenRetries: 0, factor: 2, shouldRetry: (e10, t10) => t10 < 5, retryImmediately: false, jitter: true }, ra = async (e10) => new Promise((t10) => setTimeout(t10, e10)), ro = (e10, t10) => t10 ? e10 * (1 + Math.random()) : e10, rc = async (e10, t10 = {}) => {
        var r10;
        let s10, i10 = 0, { shouldRetry: n10, initialDelay: a10, maxDelayBetweenRetries: o10, factor: c10, retryImmediately: l10, jitter: u10, onBeforeRetry: h10 } = { ...rn, ...t10 }, d10 = (r10 = { initialDelay: a10, maxDelayBetweenRetries: o10, factor: c10, jitter: u10 }, s10 = 0, async () => {
          let e11;
          await ra((e11 = ro(e11 = r10.initialDelay * Math.pow(r10.factor, s10), r10.jitter), Math.min(r10.maxDelayBetweenRetries || e11, e11))), s10++;
        });
        for (; ; ) try {
          return await e10();
        } catch (e11) {
          if (!n10(e11, ++i10)) throw e11;
          h10 && await h10(i10), l10 && 1 === i10 ? await ra(ro(100, u10)) : await d10();
        }
      };
      function rl(e10) {
        return function(t10) {
          let r10 = t10 ?? this;
          if (!r10) throw TypeError(`${e10.kind || e10.name} type guard requires an error object`);
          return !!e10.kind && "object" == typeof r10 && null !== r10 && "constructor" in r10 && r10.constructor?.kind === e10.kind || r10 instanceof e10;
        };
      }
      var ru = class e10 extends Error {
        static kind = "ClerkError";
        clerkError = true;
        code;
        longMessage;
        docsUrl;
        cause;
        get name() {
          return this.constructor.name;
        }
        constructor(t10) {
          super(new.target.formatMessage(new.target.kind, t10.message, t10.code, t10.docsUrl), { cause: t10.cause }), Object.setPrototypeOf(this, e10.prototype), this.code = t10.code, this.docsUrl = t10.docsUrl, this.longMessage = t10.longMessage, this.cause = t10.cause;
        }
        toString() {
          return `[${this.name}]
Message:${this.message}`;
        }
        static formatMessage(e11, t10, r10, s10) {
          let i10 = "Clerk:", n10 = RegExp(i10.replace(" ", "\\s*"), "i");
          return t10 = t10.replace(n10, ""), t10 = `${i10} ${t10.trim()}

(code="${r10}")

`, s10 && (t10 += `

Docs: ${s10}`), t10;
        }
      };
      rl(class e10 extends ru {
        static kind = "ClerkRuntimeError";
        clerkRuntimeError = true;
        constructor(t10, r10) {
          super({ ...r10, message: t10 }), Object.setPrototypeOf(this, e10.prototype);
        }
      });
      var rh = class {
        static kind = "ClerkAPIError";
        code;
        message;
        longMessage;
        meta;
        constructor(e10) {
          const t10 = { code: e10.code, message: e10.message, longMessage: e10.long_message, meta: { paramName: e10.meta?.param_name, sessionId: e10.meta?.session_id, emailAddresses: e10.meta?.email_addresses, identifiers: e10.meta?.identifiers, zxcvbn: e10.meta?.zxcvbn, plan: e10.meta?.plan, isPlanUpgradePossible: e10.meta?.is_plan_upgrade_possible } };
          this.code = t10.code, this.message = t10.message, this.longMessage = t10.longMessage, this.meta = t10.meta;
        }
      };
      function rd(e10) {
        return new rh(e10);
      }
      rl(rh);
      var rp = class e10 extends ru {
        static kind = "ClerkAPIResponseError";
        status;
        clerkTraceId;
        retryAfter;
        errors;
        constructor(t10, r10) {
          const { data: s10, status: i10, clerkTraceId: n10, retryAfter: a10 } = r10;
          super({ ...r10, message: t10, code: "api_response_error" }), Object.setPrototypeOf(this, e10.prototype), this.status = i10, this.clerkTraceId = n10, this.retryAfter = a10, this.errors = (s10 || []).map((e11) => new rh(e11));
        }
        toString() {
          let e11 = `[${this.name}]
Message:${this.message}
Status:${this.status}
Serialized errors: ${this.errors.map((e12) => JSON.stringify(e12))}`;
          return this.clerkTraceId && (e11 += `
Clerk Trace ID: ${this.clerkTraceId}`), e11;
        }
        static formatMessage(e11, t10, r10, s10) {
          return t10;
        }
      };
      let rm = rl(rp), rf = Object.freeze({ InvalidProxyUrlErrorMessage: "The proxyUrl passed to Clerk is invalid. The expected value for proxyUrl is an absolute URL or a relative path with a leading '/'. (key={{url}})", InvalidPublishableKeyErrorMessage: "The publishableKey passed to Clerk is invalid. You can get your Publishable key at https://dashboard.clerk.com/last-active?path=api-keys. (key={{key}})", MissingPublishableKeyErrorMessage: "Missing publishableKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.", MissingSecretKeyErrorMessage: "Missing secretKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.", MissingClerkProvider: "{{source}} can only be used within the <ClerkProvider /> component. Learn more: https://clerk.com/docs/components/clerk-provider" });
      function rg({ packageName: e10, customMessages: t10 }) {
        let r10 = e10;
        function s10(e11, t11) {
          if (!t11) return `${r10}: ${e11}`;
          let s11 = e11;
          for (let r11 of e11.matchAll(/{{([a-zA-Z0-9-_]+)}}/g)) {
            let e12 = (t11[r11[1]] || "").toString();
            s11 = s11.replace(`{{${r11[1]}}}`, e12);
          }
          return `${r10}: ${s11}`;
        }
        let i10 = { ...rf, ...t10 };
        return { setPackageName({ packageName: e11 }) {
          return "string" == typeof e11 && (r10 = e11), this;
        }, setMessages({ customMessages: e11 }) {
          return Object.assign(i10, e11 || {}), this;
        }, throwInvalidPublishableKeyError(e11) {
          throw Error(s10(i10.InvalidPublishableKeyErrorMessage, e11));
        }, throwInvalidProxyUrl(e11) {
          throw Error(s10(i10.InvalidProxyUrlErrorMessage, e11));
        }, throwMissingPublishableKeyError() {
          throw Error(s10(i10.MissingPublishableKeyErrorMessage));
        }, throwMissingSecretKeyError() {
          throw Error(s10(i10.MissingSecretKeyErrorMessage));
        }, throwMissingClerkProviderError(e11) {
          throw Error(s10(i10.MissingClerkProvider, e11));
        }, throw(e11) {
          throw Error(s10(e11));
        } };
      }
      var ry = rg({ packageName: "@clerk/backend" }), { isDevOrStagingUrl: rb } = (i = /* @__PURE__ */ new Map(), { isDevOrStagingUrl: (e10) => {
        if (!e10) return false;
        let t10 = "string" == typeof e10 ? e10 : e10.hostname, r10 = i.get(t10);
        return void 0 === r10 && (r10 = t1.some((e11) => t10.endsWith(e11)), i.set(t10, r10)), r10;
      } }), rw = "token-expired", rv = "token-invalid", rx = "token-invalid-signature", r_ = "token-not-active-yet", rk = "token-iat-in-the-future", rE = "token-verification-failed", rS = "jwk-remote-failed-to-load", rO = "jwk-failed-to-resolve", rT = "Contact support@clerk.com", rC = "Make sure that this is a valid Clerk-generated JWT.", rR = "Set the CLERK_JWT_KEY environment variable.", rA = class e10 extends Error {
        constructor({ action: t10, message: r10, reason: s10 }) {
          super(r10), Object.setPrototypeOf(this, e10.prototype), this.reason = s10, this.message = r10, this.action = t10;
        }
        getFullMessage() {
          return `${[this.message, this.action].filter((e11) => e11).join(" ")} (reason=${this.reason}, token-carrier=${this.tokenCarrier})`;
        }
      }, rP = "token-invalid", rI = "unexpected-error", rN = "token-verification-failed", rL = class e10 extends ru {
        constructor({ message: t10, code: r10, status: s10, action: i10 }) {
          super({ message: t10, code: r10 }), Object.setPrototypeOf(this, e10.prototype), this.status = s10, this.action = i10;
        }
        static formatMessage(e11, t10, r10, s10) {
          return t10;
        }
        getFullMessage() {
          return `${this.message} (code=${this.code}, status=${this.status || "n/a"})`;
        }
      };
      rL.kind = "MachineTokenVerificationError";
      let rU = crypto;
      var rM = fetch.bind(globalThis), rD = { crypto: rU, get fetch() {
        return rM;
      }, AbortController: globalThis.AbortController, Blob: globalThis.Blob, FormData: globalThis.FormData, Headers: globalThis.Headers, Request: globalThis.Request, Response: globalThis.Response }, rj = (e10, t10) => function(e11, t11, r10 = {}) {
        if (!t11.codes) {
          t11.codes = {};
          for (let e12 = 0; e12 < t11.chars.length; ++e12) t11.codes[t11.chars[e12]] = e12;
        }
        if (!r10.loose && e11.length * t11.bits & 7) throw SyntaxError("Invalid padding");
        let s10 = e11.length;
        for (; "=" === e11[s10 - 1]; ) if (--s10, !r10.loose && !((e11.length - s10) * t11.bits & 7)) throw SyntaxError("Invalid padding");
        let i10 = new (r10.out ?? Uint8Array)(s10 * t11.bits / 8 | 0), n10 = 0, a10 = 0, o10 = 0;
        for (let r11 = 0; r11 < s10; ++r11) {
          let s11 = t11.codes[e11[r11]];
          if (void 0 === s11) throw SyntaxError("Invalid character " + e11[r11]);
          a10 = a10 << t11.bits | s11, (n10 += t11.bits) >= 8 && (n10 -= 8, i10[o10++] = 255 & a10 >> n10);
        }
        if (n10 >= t11.bits || 255 & a10 << 8 - n10) throw SyntaxError("Unexpected end of data");
        return i10;
      }(e10, rq, t10), rq = { chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bits: 6 }, rz = { RS256: "SHA-256", RS384: "SHA-384", RS512: "SHA-512" }, rB = "RSASSA-PKCS1-v1_5", r$ = { RS256: rB, RS384: rB, RS512: rB }, rK = Object.keys(rz), rH = (e10, t10 = "JWT") => {
        if (void 0 === e10) return;
        let r10 = Array.isArray(t10) ? t10 : [t10];
        if (!r10.includes(e10)) throw new rA({ action: rC, reason: rv, message: `Invalid JWT type ${JSON.stringify(e10)}. Expected "${r10.join(", ")}".` });
      }, rF = (e10) => {
        if (!rK.includes(e10)) throw new rA({ action: rC, reason: "token-invalid-algorithm", message: `Invalid JWT algorithm ${JSON.stringify(e10)}. Supported: ${rK}.` });
      };
      async function rW(e10, t10) {
        let { header: r10, signature: s10, raw: i10 } = e10, n10 = new TextEncoder().encode([i10.header, i10.payload].join(".")), a10 = function(e11) {
          let t11 = rz[e11], r11 = r$[e11];
          if (!t11 || !r11) throw Error(`Unsupported algorithm ${e11}, expected one of ${rK.join(",")}.`);
          return { hash: { name: rz[e11] }, name: r$[e11] };
        }(r10.alg);
        try {
          let e11 = await function(e12, t11, r11) {
            if ("object" == typeof e12) return rD.crypto.subtle.importKey("jwk", e12, t11, false, [r11]);
            let s11 = function(e13) {
              let t12 = t7(e13.replace(/-----BEGIN.*?-----/g, "").replace(/-----END.*?-----/g, "").replace(/\s/g, "")), r12 = new Uint8Array(new ArrayBuffer(t12.length));
              for (let e14 = 0, s12 = t12.length; e14 < s12; e14++) r12[e14] = t12.charCodeAt(e14);
              return r12;
            }(e12), i11 = "sign" === r11 ? "pkcs8" : "spki";
            return rD.crypto.subtle.importKey(i11, s11, t11, false, [r11]);
          }(t10, a10, "verify");
          return { data: await rD.crypto.subtle.verify(a10.name, e11, s10, n10) };
        } catch (e11) {
          return { errors: [new rA({ reason: rx, message: e11?.message })] };
        }
      }
      function rJ(e10) {
        let t10 = (e10 || "").toString().split(".");
        if (3 !== t10.length) return { errors: [new rA({ reason: rv, message: "Invalid JWT form. A JWT consists of three parts separated by dots." })] };
        let [r10, s10, i10] = t10, n10 = new TextDecoder(), a10 = JSON.parse(n10.decode(rj(r10, { loose: true }))), o10 = JSON.parse(n10.decode(rj(s10, { loose: true })));
        return { data: { header: a10, payload: o10, signature: rj(i10, { loose: true }), raw: { header: r10, payload: s10, signature: i10, text: e10 } } };
      }
      async function rG(e10, t10) {
        let { audience: r10, authorizedParties: s10, clockSkewInMs: i10, key: n10, headerType: a10 } = t10, o10 = "number" == typeof i10 && Number.isFinite(i10) ? i10 : 5e3, { data: c10, errors: l10 } = rJ(e10);
        if (l10) return { errors: l10 };
        let { header: u10, payload: h10 } = c10;
        try {
          let { typ: e11, alg: t11 } = u10;
          rH(e11, a10), rF(t11);
        } catch (e11) {
          return { errors: [e11] };
        }
        let { data: d10, errors: p2 } = await rW(c10, n10);
        if (p2) return { errors: [new rA({ action: rC, reason: rE, message: `Error verifying JWT signature. ${p2[0]}` })] };
        if (!d10) return { errors: [new rA({ reason: rx, message: "JWT signature is invalid." })] };
        try {
          let { azp: e11, sub: t11, aud: i11, iat: n11, exp: a11, nbf: c11 } = h10;
          if ("string" != typeof t11) throw new rA({ action: rC, reason: rE, message: `Subject claim (sub) is required and must be a string. Received ${JSON.stringify(t11)}.` });
          ((e12, t12) => {
            let r11 = [t12].flat().filter((e13) => !!e13), s11 = [e12].flat().filter((e13) => !!e13);
            if (r11.length > 0 && s11.length > 0) {
              if ("string" == typeof e12) {
                if (!r11.includes(e12)) throw new rA({ action: rC, reason: rE, message: `Invalid JWT audience claim (aud) ${JSON.stringify(e12)}. Is not included in "${JSON.stringify(r11)}".` });
              } else if (Array.isArray(e12) && e12.length > 0 && e12.every((e13) => "string" == typeof e13) && !e12.some((e13) => r11.includes(e13))) throw new rA({ action: rC, reason: rE, message: `Invalid JWT audience claim array (aud) ${JSON.stringify(e12)}. Is not included in "${JSON.stringify(r11)}".` });
            }
          })([i11], [r10]);
          if (e11 && s10 && 0 !== s10.length && !s10.includes(e11)) throw new rA({ reason: "token-invalid-authorized-parties", message: `Invalid JWT Authorized party claim (azp) ${JSON.stringify(e11)}. Expected "${s10}".` });
          if ("number" != typeof a11) throw new rA({ action: rC, reason: rE, message: `Invalid JWT expiry date claim (exp) ${JSON.stringify(a11)}. Expected number.` });
          let l11 = new Date(Date.now()), u11 = /* @__PURE__ */ new Date(0);
          if (u11.setUTCSeconds(a11), u11.getTime() <= l11.getTime() - o10) throw new rA({ reason: rw, message: `JWT is expired. Expiry date: ${u11.toUTCString()}, Current date: ${l11.toUTCString()}.` });
          ((e12, t12) => {
            if (void 0 === e12) return;
            if ("number" != typeof e12) throw new rA({ action: rC, reason: rE, message: `Invalid JWT not before date claim (nbf) ${JSON.stringify(e12)}. Expected number.` });
            let r11 = new Date(Date.now()), s11 = /* @__PURE__ */ new Date(0);
            if (s11.setUTCSeconds(e12), s11.getTime() > r11.getTime() + t12) throw new rA({ reason: r_, message: `JWT cannot be used prior to not before date claim (nbf). Not before date: ${s11.toUTCString()}; Current date: ${r11.toUTCString()};` });
          })(c11, o10), ((e12, t12) => {
            if (void 0 === e12) return;
            if ("number" != typeof e12) throw new rA({ action: rC, reason: rE, message: `Invalid JWT issued at date claim (iat) ${JSON.stringify(e12)}. Expected number.` });
            let r11 = new Date(Date.now()), s11 = /* @__PURE__ */ new Date(0);
            if (s11.setUTCSeconds(e12), s11.getTime() > r11.getTime() + t12) throw new rA({ reason: rk, message: `JWT issued at date claim (iat) is in the future. Issued at date: ${s11.toUTCString()}; Current date: ${r11.toUTCString()};` });
          })(n11, o10);
        } catch (e11) {
          return { errors: [e11] };
        }
        return { data: h10 };
      }
      var rV = Object.create, rX = Object.defineProperty, rY = Object.getOwnPropertyDescriptor, rQ = Object.getOwnPropertyNames, rZ = Object.getPrototypeOf, r0 = Object.prototype.hasOwnProperty, r1 = (e10) => {
        throw TypeError(e10);
      }, r2 = (e10, t10, r10) => t10.has(e10) || r1("Cannot " + r10), r3 = (e10, t10, r10) => t10.has(e10) ? r1("Cannot add the same private member more than once") : t10 instanceof WeakSet ? t10.add(e10) : t10.set(e10, r10), r4 = (e10, t10, r10) => (r2(e10, t10, "access private method"), r10);
      function r5(e10) {
        return e10 ? `https://${e10.replace(/clerk\.accountsstage\./, "accountsstage.").replace(/clerk\.accounts\.|clerk\./, "accounts.")}` : "";
      }
      function r6(e10) {
        return /^http(s)?:\/\//.test(e10 || "");
      }
      let r7 = [".vercel.app"];
      function r9(e10) {
        return r7.some((t10) => e10?.endsWith(t10)) ?? false;
      }
      let r8 = { strict_mfa: { afterMinutes: 10, level: "multi_factor" }, strict: { afterMinutes: 10, level: "second_factor" }, moderate: { afterMinutes: 60, level: "second_factor" }, lax: { afterMinutes: 1440, level: "second_factor" } }, se = /* @__PURE__ */ new Set(["first_factor", "second_factor", "multi_factor"]), st = /* @__PURE__ */ new Set(["strict_mfa", "strict", "moderate", "lax"]), sr = /* @__PURE__ */ new Set(["o", "org", "organization"]), ss = /* @__PURE__ */ new Set(["u", "user"]), si = (e10) => "number" == typeof e10 && Number.isFinite(e10) && (-1 === e10 || e10 >= 0), sn = (e10, t10) => {
        let { org: r10, user: s10 } = sa(e10), [i10, n10] = t10.split(":"), a10 = void 0 !== n10, o10 = n10 || i10;
        if (a10 && !sr.has(i10) && !ss.has(i10)) throw Error(`Invalid scope: ${i10}`);
        if (a10) {
          if (sr.has(i10)) return r10.includes(o10);
          if (ss.has(i10)) return s10.includes(o10);
        }
        return [...r10, ...s10].includes(o10);
      }, sa = (e10) => {
        let t10 = [], r10 = [];
        if (!e10) return { org: t10, user: r10 };
        let s10 = e10.split(",");
        for (let e11 = 0; e11 < s10.length; e11++) {
          let i10 = s10[e11].trim(), n10 = i10.indexOf(":");
          if (-1 === n10) throw Error(`Invalid claim element (missing colon): ${i10}`);
          let a10 = i10.slice(0, n10), o10 = i10.slice(n10 + 1);
          "o" === a10 ? t10.push(o10) : "u" === a10 ? r10.push(o10) : ("ou" === a10 || "uo" === a10) && (t10.push(o10), r10.push(o10));
        }
        return { org: t10, user: r10 };
      };
      function so(e10) {
        return e10.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
      }
      function sc(e10) {
        return e10 && e10.sensitive ? "" : "i";
      }
      function sl(e10, t10, r10) {
        var s10;
        return e10 instanceof RegExp ? function(e11, t11) {
          if (!t11) return e11;
          for (var r11 = /\((?:\?<(.*?)>)?(?!\?)/g, s11 = 0, i10 = r11.exec(e11.source); i10; ) t11.push({ name: i10[1] || s11++, prefix: "", suffix: "", modifier: "", pattern: "" }), i10 = r11.exec(e11.source);
          return e11;
        }(e10, t10) : Array.isArray(e10) ? (s10 = e10.map(function(e11) {
          return sl(e11, t10, r10).source;
        }), new RegExp("(?:".concat(s10.join("|"), ")"), sc(r10))) : function(e11, t11, r11) {
          void 0 === r11 && (r11 = {});
          for (var s11 = r11.strict, i10 = void 0 !== s11 && s11, n10 = r11.start, a10 = r11.end, o10 = r11.encode, c10 = void 0 === o10 ? function(e12) {
            return e12;
          } : o10, l10 = r11.delimiter, u10 = r11.endsWith, h10 = "[".concat(so(void 0 === u10 ? "" : u10), "]|$"), d10 = "[".concat(so(void 0 === l10 ? "/#?" : l10), "]"), p2 = void 0 === n10 || n10 ? "^" : "", m2 = 0; m2 < e11.length; m2++) {
            var f2 = e11[m2];
            if ("string" == typeof f2) p2 += so(c10(f2));
            else {
              var g2 = so(c10(f2.prefix)), y2 = so(c10(f2.suffix));
              if (f2.pattern) if (t11 && t11.push(f2), g2 || y2) if ("+" === f2.modifier || "*" === f2.modifier) {
                var b2 = "*" === f2.modifier ? "?" : "";
                p2 += "(?:".concat(g2, "((?:").concat(f2.pattern, ")(?:").concat(y2).concat(g2, "(?:").concat(f2.pattern, "))*)").concat(y2, ")").concat(b2);
              } else p2 += "(?:".concat(g2, "(").concat(f2.pattern, ")").concat(y2, ")").concat(f2.modifier);
              else {
                if ("+" === f2.modifier || "*" === f2.modifier) throw TypeError('Can not repeat "'.concat(f2.name, '" without a prefix and suffix'));
                p2 += "(".concat(f2.pattern, ")").concat(f2.modifier);
              }
              else p2 += "(?:".concat(g2).concat(y2, ")").concat(f2.modifier);
            }
          }
          if (void 0 === a10 || a10) i10 || (p2 += "".concat(d10, "?")), p2 += r11.endsWith ? "(?=".concat(h10, ")") : "$";
          else {
            var w2 = e11[e11.length - 1], v2 = "string" == typeof w2 ? d10.indexOf(w2[w2.length - 1]) > -1 : void 0 === w2;
            i10 || (p2 += "(?:".concat(d10, "(?=").concat(h10, "))?")), v2 || (p2 += "(?=".concat(d10, "|").concat(h10, ")"));
          }
          return new RegExp(p2, sc(r11));
        }(function(e11, t11) {
          void 0 === t11 && (t11 = {});
          for (var r11 = function(e12) {
            for (var t12 = [], r12 = 0; r12 < e12.length; ) {
              var s12 = e12[r12];
              if ("*" === s12 || "+" === s12 || "?" === s12) {
                t12.push({ type: "MODIFIER", index: r12, value: e12[r12++] });
                continue;
              }
              if ("\\" === s12) {
                t12.push({ type: "ESCAPED_CHAR", index: r12++, value: e12[r12++] });
                continue;
              }
              if ("{" === s12) {
                t12.push({ type: "OPEN", index: r12, value: e12[r12++] });
                continue;
              }
              if ("}" === s12) {
                t12.push({ type: "CLOSE", index: r12, value: e12[r12++] });
                continue;
              }
              if (":" === s12) {
                for (var i11 = "", n11 = r12 + 1; n11 < e12.length; ) {
                  var a11 = e12.charCodeAt(n11);
                  if (a11 >= 48 && a11 <= 57 || a11 >= 65 && a11 <= 90 || a11 >= 97 && a11 <= 122 || 95 === a11) {
                    i11 += e12[n11++];
                    continue;
                  }
                  break;
                }
                if (!i11) throw TypeError("Missing parameter name at ".concat(r12));
                t12.push({ type: "NAME", index: r12, value: i11 }), r12 = n11;
                continue;
              }
              if ("(" === s12) {
                var o11 = 1, c11 = "", n11 = r12 + 1;
                if ("?" === e12[n11]) throw TypeError('Pattern cannot start with "?" at '.concat(n11));
                for (; n11 < e12.length; ) {
                  if ("\\" === e12[n11]) {
                    c11 += e12[n11++] + e12[n11++];
                    continue;
                  }
                  if (")" === e12[n11]) {
                    if (0 == --o11) {
                      n11++;
                      break;
                    }
                  } else if ("(" === e12[n11] && (o11++, "?" !== e12[n11 + 1])) throw TypeError("Capturing groups are not allowed at ".concat(n11));
                  c11 += e12[n11++];
                }
                if (o11) throw TypeError("Unbalanced pattern at ".concat(r12));
                if (!c11) throw TypeError("Missing pattern at ".concat(r12));
                t12.push({ type: "PATTERN", index: r12, value: c11 }), r12 = n11;
                continue;
              }
              t12.push({ type: "CHAR", index: r12, value: e12[r12++] });
            }
            return t12.push({ type: "END", index: r12, value: "" }), t12;
          }(e11), s11 = t11.prefixes, i10 = void 0 === s11 ? "./" : s11, n10 = t11.delimiter, a10 = void 0 === n10 ? "/#?" : n10, o10 = [], c10 = 0, l10 = 0, u10 = "", h10 = function(e12) {
            if (l10 < r11.length && r11[l10].type === e12) return r11[l10++].value;
          }, d10 = function(e12) {
            var t12 = h10(e12);
            if (void 0 !== t12) return t12;
            var s12 = r11[l10], i11 = s12.type, n11 = s12.index;
            throw TypeError("Unexpected ".concat(i11, " at ").concat(n11, ", expected ").concat(e12));
          }, p2 = function() {
            for (var e12, t12 = ""; e12 = h10("CHAR") || h10("ESCAPED_CHAR"); ) t12 += e12;
            return t12;
          }, m2 = function(e12) {
            for (var t12 = 0; t12 < a10.length; t12++) {
              var r12 = a10[t12];
              if (e12.indexOf(r12) > -1) return true;
            }
            return false;
          }, f2 = function(e12) {
            var t12 = o10[o10.length - 1], r12 = e12 || (t12 && "string" == typeof t12 ? t12 : "");
            if (t12 && !r12) throw TypeError('Must have text between two parameters, missing text after "'.concat(t12.name, '"'));
            return !r12 || m2(r12) ? "[^".concat(so(a10), "]+?") : "(?:(?!".concat(so(r12), ")[^").concat(so(a10), "])+?");
          }; l10 < r11.length; ) {
            var g2 = h10("CHAR"), y2 = h10("NAME"), b2 = h10("PATTERN");
            if (y2 || b2) {
              var w2 = g2 || "";
              -1 === i10.indexOf(w2) && (u10 += w2, w2 = ""), u10 && (o10.push(u10), u10 = ""), o10.push({ name: y2 || c10++, prefix: w2, suffix: "", pattern: b2 || f2(w2), modifier: h10("MODIFIER") || "" });
              continue;
            }
            var v2 = g2 || h10("ESCAPED_CHAR");
            if (v2) {
              u10 += v2;
              continue;
            }
            if (u10 && (o10.push(u10), u10 = ""), h10("OPEN")) {
              var w2 = p2(), x2 = h10("NAME") || "", _2 = h10("PATTERN") || "", k2 = p2();
              d10("CLOSE"), o10.push({ name: x2 || (_2 ? c10++ : ""), pattern: x2 && !_2 ? f2(w2) : _2, prefix: w2, suffix: k2, modifier: h10("MODIFIER") || "" });
              continue;
            }
            d10("END");
          }
          return o10;
        }(e10, r10), t10, r10);
      }
      var su = (n = { "../../node_modules/.pnpm/cookie@1.1.1/node_modules/cookie/dist/index.js"(e10) {
        let t10;
        Object.defineProperty(e10, "__esModule", { value: true }), e10.parseCookie = l10, e10.parse = l10, e10.stringifyCookie = function(e11, t11) {
          let i11 = t11?.encode || encodeURIComponent, n11 = [];
          for (let t12 of Object.keys(e11)) {
            let a11 = e11[t12];
            if (void 0 === a11) continue;
            if (!r10.test(t12)) throw TypeError(`cookie name is invalid: ${t12}`);
            let o11 = i11(a11);
            if (!s10.test(o11)) throw TypeError(`cookie val is invalid: ${a11}`);
            n11.push(`${t12}=${o11}`);
          }
          return n11.join("; ");
        }, e10.stringifySetCookie = u10, e10.serialize = u10, e10.parseSetCookie = function(e11, t11) {
          let r11 = t11?.decode || m2, s11 = e11.length, i11 = h10(e11, 0, s11), n11 = d10(e11, 0, i11), o11 = -1 === n11 ? { name: "", value: r11(p2(e11, 0, i11)) } : { name: p2(e11, 0, n11), value: r11(p2(e11, n11 + 1, i11)) }, c11 = i11 + 1;
          for (; c11 < s11; ) {
            let t12 = h10(e11, c11, s11), r12 = d10(e11, c11, t12), i12 = -1 === r12 ? p2(e11, c11, t12) : p2(e11, c11, r12), n12 = -1 === r12 ? void 0 : p2(e11, r12 + 1, t12);
            switch (i12.toLowerCase()) {
              case "httponly":
                o11.httpOnly = true;
                break;
              case "secure":
                o11.secure = true;
                break;
              case "partitioned":
                o11.partitioned = true;
                break;
              case "domain":
                o11.domain = n12;
                break;
              case "path":
                o11.path = n12;
                break;
              case "max-age":
                n12 && a10.test(n12) && (o11.maxAge = Number(n12));
                break;
              case "expires":
                if (!n12) break;
                let l11 = new Date(n12);
                Number.isFinite(l11.valueOf()) && (o11.expires = l11);
                break;
              case "priority":
                if (!n12) break;
                let u11 = n12.toLowerCase();
                ("low" === u11 || "medium" === u11 || "high" === u11) && (o11.priority = u11);
                break;
              case "samesite":
                if (!n12) break;
                let m3 = n12.toLowerCase();
                ("lax" === m3 || "strict" === m3 || "none" === m3) && (o11.sameSite = m3);
            }
            c11 = t12 + 1;
          }
          return o11;
        }, e10.stringifySetCookie = u10, e10.serialize = u10;
        var r10 = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/, s10 = /^[\u0021-\u003A\u003C-\u007E]*$/, i10 = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, n10 = /^[\u0020-\u003A\u003D-\u007E]*$/, a10 = /^-?\d+$/, o10 = Object.prototype.toString, c10 = ((t10 = function() {
        }).prototype = /* @__PURE__ */ Object.create(null), t10);
        function l10(e11, t11) {
          let r11 = new c10(), s11 = e11.length;
          if (s11 < 2) return r11;
          let i11 = t11?.decode || m2, n11 = 0;
          do {
            let t12 = d10(e11, n11, s11);
            if (-1 === t12) break;
            let a11 = h10(e11, n11, s11);
            if (t12 > a11) {
              n11 = e11.lastIndexOf(";", t12 - 1) + 1;
              continue;
            }
            let o11 = p2(e11, n11, t12);
            void 0 === r11[o11] && (r11[o11] = i11(p2(e11, t12 + 1, a11))), n11 = a11 + 1;
          } while (n11 < s11);
          return r11;
        }
        function u10(e11, t11, a11) {
          let c11 = "object" == typeof e11 ? e11 : { ...a11, name: e11, value: String(t11) }, l11 = ("object" == typeof t11 ? t11 : a11)?.encode || encodeURIComponent;
          if (!r10.test(c11.name)) throw TypeError(`argument name is invalid: ${c11.name}`);
          let u11 = c11.value ? l11(c11.value) : "";
          if (!s10.test(u11)) throw TypeError(`argument val is invalid: ${c11.value}`);
          let h11 = c11.name + "=" + u11;
          if (void 0 !== c11.maxAge) {
            if (!Number.isInteger(c11.maxAge)) throw TypeError(`option maxAge is invalid: ${c11.maxAge}`);
            h11 += "; Max-Age=" + c11.maxAge;
          }
          if (c11.domain) {
            if (!i10.test(c11.domain)) throw TypeError(`option domain is invalid: ${c11.domain}`);
            h11 += "; Domain=" + c11.domain;
          }
          if (c11.path) {
            if (!n10.test(c11.path)) throw TypeError(`option path is invalid: ${c11.path}`);
            h11 += "; Path=" + c11.path;
          }
          if (c11.expires) {
            var d11;
            if (d11 = c11.expires, "[object Date]" !== o10.call(d11) || !Number.isFinite(c11.expires.valueOf())) throw TypeError(`option expires is invalid: ${c11.expires}`);
            h11 += "; Expires=" + c11.expires.toUTCString();
          }
          if (c11.httpOnly && (h11 += "; HttpOnly"), c11.secure && (h11 += "; Secure"), c11.partitioned && (h11 += "; Partitioned"), c11.priority) switch ("string" == typeof c11.priority ? c11.priority.toLowerCase() : void 0) {
            case "low":
              h11 += "; Priority=Low";
              break;
            case "medium":
              h11 += "; Priority=Medium";
              break;
            case "high":
              h11 += "; Priority=High";
              break;
            default:
              throw TypeError(`option priority is invalid: ${c11.priority}`);
          }
          if (c11.sameSite) switch ("string" == typeof c11.sameSite ? c11.sameSite.toLowerCase() : c11.sameSite) {
            case true:
            case "strict":
              h11 += "; SameSite=Strict";
              break;
            case "lax":
              h11 += "; SameSite=Lax";
              break;
            case "none":
              h11 += "; SameSite=None";
              break;
            default:
              throw TypeError(`option sameSite is invalid: ${c11.sameSite}`);
          }
          return h11;
        }
        function h10(e11, t11, r11) {
          let s11 = e11.indexOf(";", t11);
          return -1 === s11 ? r11 : s11;
        }
        function d10(e11, t11, r11) {
          let s11 = e11.indexOf("=", t11);
          return s11 < r11 ? s11 : -1;
        }
        function p2(e11, t11, r11) {
          let s11 = t11, i11 = r11;
          do {
            let t12 = e11.charCodeAt(s11);
            if (32 !== t12 && 9 !== t12) break;
          } while (++s11 < i11);
          for (; i11 > s11; ) {
            let t12 = e11.charCodeAt(i11 - 1);
            if (32 !== t12 && 9 !== t12) break;
            i11--;
          }
          return e11.slice(s11, i11);
        }
        function m2(e11) {
          if (-1 === e11.indexOf("%")) return e11;
          try {
            return decodeURIComponent(e11);
          } catch (t11) {
            return e11;
          }
        }
      } }, function() {
        return a || (0, n[rQ(n)[0]])((a = { exports: {} }).exports, a), a.exports;
      }), sh = "https://api.clerk.com", sd = "@clerk/backend@3.4.7", sp = "2025-11-10", sm = { Session: "__session", Refresh: "__refresh", ClientUat: "__client_uat", Handshake: "__clerk_handshake", DevBrowser: "__clerk_db_jwt", RedirectCount: "__clerk_redirect_count", HandshakeNonce: "__clerk_handshake_nonce" }, sf = { ClerkSynced: "__clerk_synced", SuffixedCookies: "suffixed_cookies", ClerkRedirectUrl: "__clerk_redirect_url", DevBrowser: sm.DevBrowser, Handshake: sm.Handshake, HandshakeHelp: "__clerk_help", LegacyDevBrowser: "__dev_session", HandshakeReason: "__clerk_hs_reason", HandshakeNonce: sm.HandshakeNonce, HandshakeFormat: "format", Session: "__session" }, sg = { NeedsSync: "false", Completed: "true" }, sy = "accept", sb = "x-clerk-auth-message", sw = "authorization", sv = "x-clerk-auth-reason", sx = "x-clerk-auth-signature", s_ = "x-clerk-auth-status", sk = "x-clerk-auth-token", sE = "cache-control", sS = "x-clerk-redirect-to", sO = "x-clerk-request-data", sT = "x-clerk-clerk-url", sC = "cloudfront-forwarded-proto", sR = "content-type", sA = "content-security-policy", sP = "content-security-policy-report-only", sI = "x-clerk-debug", sN = "x-forwarded-host", sL = "x-forwarded-proto", sU = "host", sM = "location", sD = "x-nonce", sj = "origin", sq = "referer", sz = "sec-fetch-dest", sB = "user-agent", s$ = "reporting-endpoints", sK = "application/json", sH = (e10, t10, r10, s10, i10) => {
        if ("" === e10) return sF(t10.toString(), r10?.toString());
        let n10 = new URL(e10), a10 = r10 ? new URL(r10, n10) : void 0, o10 = new URL(t10, n10), c10 = `${n10.hostname}:${n10.port}` != `${o10.hostname}:${o10.port}`;
        return a10 && (c10 && i10 && a10.searchParams.set(sf.ClerkSynced, sg.NeedsSync), o10.searchParams.set("redirect_url", a10.toString())), c10 && s10 && o10.searchParams.set(sf.DevBrowser, s10), o10.toString();
      }, sF = (e10, t10) => {
        let r10;
        if (e10.startsWith("http")) r10 = new URL(e10);
        else {
          if (!t10 || !t10.startsWith("http")) throw Error("destination url or return back url should be an absolute path url!");
          let s10 = new URL(t10);
          r10 = new URL(e10, s10.origin);
        }
        return t10 && r10.searchParams.set("redirect_url", t10), r10.toString();
      };
      function sW(e10, t10) {
        return Object.keys(e10).reduce((e11, r10) => ({ ...e11, [r10]: t10[r10] || e11[r10] }), { ...e10 });
      }
      function sJ(e10) {
        if (!e10 || "string" != typeof e10) throw Error("Missing Clerk Secret Key. Go to https://dashboard.clerk.com and get your key for your instance.");
      }
      var sG = "session_token", sV = "api_key", sX = "m2m_token", sY = "oauth_token", sQ = class {
        constructor(e10, t10, r10) {
          this.cookieSuffix = e10, this.clerkRequest = t10, this.originalFrontendApi = "";
          const s10 = function({ publishableKey: e11, hasDomain: t11 = false, hasProxyUrl: r11 = false, environment: s11 = "u" > typeof process && process.env ? process.env : {} }) {
            if (r11 || t11 || !rr(e11) || "production" !== s11.VERCEL_TARGET_ENV) return "";
            let i10 = s11.VERCEL_PROJECT_PRODUCTION_URL;
            return i10 && r9(function(e12) {
              if (e12.startsWith("http://") || e12.startsWith("https://")) try {
                return new URL(e12).hostname;
              } catch {
                return "";
              }
              return e12.split("/")[0] || "";
            }(i10)) ? "/__clerk" : "";
          }({ publishableKey: r10.publishableKey ?? "", hasProxyUrl: !!r10.proxyUrl, hasDomain: !!r10.domain });
          s10 && (r10 = { ...r10, proxyUrl: `${t10.clerkUrl.origin}${s10}` }), r10.acceptsToken === sX || r10.acceptsToken === sV ? this.initHeaderValues() : (this.initPublishableKeyValues(r10), this.initHeaderValues(), this.initCookieValues(), this.initHandshakeValues()), Object.assign(this, r10), this.clerkUrl = this.clerkRequest.clerkUrl, this.proxyUrl?.startsWith("/") && (this.proxyUrl = `${this.clerkUrl.origin}${this.proxyUrl}`);
        }
        get sessionToken() {
          return this.sessionTokenInCookie || this.tokenInHeader;
        }
        usesSuffixedCookies() {
          let e10 = this.getSuffixedCookie(sm.ClientUat), t10 = this.getCookie(sm.ClientUat), r10 = this.getSuffixedCookie(sm.Session) || "", s10 = this.getCookie(sm.Session) || "";
          if (s10 && !this.tokenHasIssuer(s10)) return false;
          if (s10 && !this.tokenBelongsToInstance(s10)) return true;
          if (!e10 && !r10) return false;
          let { data: i10 } = rJ(s10), n10 = i10?.payload.iat || 0, { data: a10 } = rJ(r10), o10 = a10?.payload.iat || 0;
          if ("0" !== e10 && "0" !== t10 && n10 > o10 || "0" === e10 && "0" !== t10) return false;
          if ("production" !== this.instanceType) {
            let r11 = this.sessionExpired(a10);
            if ("0" !== e10 && "0" === t10 && r11) return false;
          }
          return !!e10 || !r10;
        }
        isCrossOriginReferrer() {
          if (!this.referrer || !this.clerkUrl.origin) return false;
          try {
            return new URL(this.referrer).origin !== this.clerkUrl.origin;
          } catch {
            return false;
          }
        }
        isKnownClerkReferrer() {
          if (!this.referrer) return false;
          try {
            let e10 = new URL(this.referrer), t10 = e10.hostname;
            if (this.frontendApi) {
              let e11 = this.frontendApi.startsWith("http") ? new URL(this.frontendApi).hostname : this.frontendApi;
              if (t10 === e11) return true;
            }
            if (tZ.some((e11) => t10.startsWith("accounts.") && t10.endsWith(e11)) || t0.some((e11) => t10.endsWith(e11) && !t10.endsWith(".clerk" + e11))) return true;
            let r10 = r5(this.frontendApi);
            if (r10) {
              let t11 = new URL(r10).origin;
              if (e10.origin === t11) return true;
            }
            if (t10.startsWith("accounts.")) return true;
            return false;
          } catch {
            return false;
          }
        }
        initPublishableKeyValues(e10) {
          re(e10.publishableKey, { fatal: true }), this.publishableKey = e10.publishableKey;
          let t10 = e10.proxyUrl;
          t10?.startsWith("/") && (t10 = `${this.clerkRequest.clerkUrl.origin}${t10}`);
          let r10 = re(this.publishableKey, { fatal: true, domain: e10.domain, isSatellite: e10.isSatellite });
          this.originalFrontendApi = r10.frontendApi;
          let s10 = re(this.publishableKey, { fatal: true, proxyUrl: t10, domain: e10.domain, isSatellite: e10.isSatellite });
          this.instanceType = s10.instanceType, this.frontendApi = s10.frontendApi;
        }
        initHeaderValues() {
          this.method = this.clerkRequest.method, this.tokenInHeader = this.parseAuthorizationHeader(this.getHeader(sw)), this.origin = this.getHeader(sj), this.host = this.getHeader(sU), this.forwardedHost = this.getHeader(sN), this.forwardedProto = this.getHeader(sC) || this.getHeader(sL), this.referrer = this.getHeader(sq), this.userAgent = this.getHeader(sB), this.secFetchDest = this.getHeader(sz), this.accept = this.getHeader(sy);
        }
        initCookieValues() {
          this.sessionTokenInCookie = this.getSuffixedOrUnSuffixedCookie(sm.Session), this.refreshTokenInCookie = this.getSuffixedCookie(sm.Refresh), this.clientUat = Number.parseInt(this.getSuffixedOrUnSuffixedCookie(sm.ClientUat) || "") || 0;
        }
        initHandshakeValues() {
          this.devBrowserToken = this.getQueryParam(sf.DevBrowser) || this.getSuffixedOrUnSuffixedCookie(sm.DevBrowser), this.handshakeToken = this.getQueryParam(sf.Handshake) || this.getCookie(sm.Handshake), this.handshakeRedirectLoopCounter = Number(this.getCookie(sm.RedirectCount)) || 0, this.handshakeNonce = this.getQueryParam(sf.HandshakeNonce) || this.getCookie(sm.HandshakeNonce);
        }
        getQueryParam(e10) {
          return this.clerkRequest.clerkUrl.searchParams.get(e10);
        }
        getHeader(e10) {
          return this.clerkRequest.headers.get(e10) || void 0;
        }
        getCookie(e10) {
          return this.clerkRequest.cookies.get(e10) || void 0;
        }
        getSuffixedCookie(e10) {
          let t10;
          return this.getCookie((t10 = this.cookieSuffix, `${e10}_${t10}`)) || void 0;
        }
        getSuffixedOrUnSuffixedCookie(e10) {
          return this.usesSuffixedCookies() ? this.getSuffixedCookie(e10) : this.getCookie(e10);
        }
        parseAuthorizationHeader(e10) {
          if (!e10) return;
          let [t10, r10] = e10.split(" ", 2);
          return r10 ? "Bearer" === t10 ? r10 : void 0 : t10;
        }
        tokenHasIssuer(e10) {
          let { data: t10, errors: r10 } = rJ(e10);
          return !r10 && !!t10.payload.iss;
        }
        tokenBelongsToInstance(e10) {
          if (!e10) return false;
          let { data: t10, errors: r10 } = rJ(e10);
          if (r10) return false;
          let s10 = t10.payload.iss.replace(/https?:\/\//gi, "");
          return this.originalFrontendApi === s10;
        }
        sessionExpired(e10) {
          return !!e10 && e10?.payload.exp <= (Date.now() / 1e3 | 0);
        }
      }, sZ = async (e10, t10) => new sQ(t10.publishableKey ? await ri(t10.publishableKey, rD.crypto.subtle) : "", e10, t10), s0 = RegExp("(?<!:)/{1,}", "g");
      function s1(...e10) {
        let t10 = e10.filter((e11) => e11).join("/").replace(s0, "/");
        for (let e11 of t10.split("/")) if (function(e12) {
          let t11 = e12;
          for (let r10 = 0; r10 <= 10; r10++) {
            if (t11.split(/[/\\]/).some((e13) => "." === e13 || ".." === e13)) return true;
            if (10 === r10) throw Error(`joinPaths: too many layers of encoding in ${e12}`);
            try {
              let e13 = decodeURIComponent(t11);
              if (e13 === t11) break;
              t11 = e13;
            } catch {
              break;
            }
          }
          return false;
        }(e11)) throw Error(`joinPaths: "." and ".." path segments are not allowed (received "${t10}")`);
        return t10;
      }
      var s2 = class {
        constructor(e10) {
          this.request = e10;
        }
        requireId(e10) {
          if (!e10) throw Error("A valid resource ID is required.");
        }
      }, s3 = "/actor_tokens", s4 = class extends s2 {
        async create(e10) {
          return this.request({ method: "POST", path: s3, bodyParams: e10 });
        }
        async revoke(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: s1(s3, e10, "revoke") });
        }
      }, s5 = "/agents/tasks", s6 = class extends s2 {
        async create(e10) {
          return this.request({ method: "POST", path: s5, bodyParams: e10, options: { deepSnakecaseBodyParamKeys: true } });
        }
        async revoke(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: s1(s5, e10, "revoke") });
        }
      }, s7 = "/accountless_applications", s9 = class extends s2 {
        async createAccountlessApplication(e10) {
          let t10 = e10?.requestHeaders ? Object.fromEntries(e10.requestHeaders.entries()) : void 0;
          return this.request({ method: "POST", path: s7, headerParams: t10 });
        }
        async completeAccountlessApplicationOnboarding(e10) {
          let t10 = e10?.requestHeaders ? Object.fromEntries(e10.requestHeaders.entries()) : void 0;
          return this.request({ method: "POST", path: s1(s7, "complete"), headerParams: t10 });
        }
      }, s8 = "/allowlist_identifiers", ie = class extends s2 {
        async getAllowlistIdentifierList(e10 = {}) {
          return this.request({ method: "GET", path: s8, queryParams: { ...e10, paginated: true } });
        }
        async createAllowlistIdentifier(e10) {
          return this.request({ method: "POST", path: s8, bodyParams: e10 });
        }
        async deleteAllowlistIdentifier(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: s1(s8, e10) });
        }
      }, it = "/api_keys", ir = class extends s2 {
        async list(e10) {
          return this.request({ method: "GET", path: it, queryParams: e10 });
        }
        async create(e10) {
          return this.request({ method: "POST", path: it, bodyParams: e10 });
        }
        async get(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: s1(it, e10) });
        }
        async update(e10) {
          let { apiKeyId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: s1(it, t10), bodyParams: r10 });
        }
        async delete(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: s1(it, e10) });
        }
        async revoke(e10) {
          let { apiKeyId: t10, revocationReason: r10 = null } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: s1(it, t10, "revoke"), bodyParams: { revocationReason: r10 } });
        }
        async getSecret(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: s1(it, e10, "secret") });
        }
        async verify(e10) {
          return this.request({ method: "POST", path: s1(it, "verify"), bodyParams: { secret: e10 } });
        }
      }, is = class extends s2 {
        async changeDomain(e10) {
          return this.request({ method: "POST", path: s1("/beta_features", "change_domain"), bodyParams: e10 });
        }
      }, ii = "/blocklist_identifiers", ia = class extends s2 {
        async getBlocklistIdentifierList(e10 = {}) {
          return this.request({ method: "GET", path: ii, queryParams: e10 });
        }
        async createBlocklistIdentifier(e10) {
          return this.request({ method: "POST", path: ii, bodyParams: e10 });
        }
        async deleteBlocklistIdentifier(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: s1(ii, e10) });
        }
      }, io = "/clients", ic = class extends s2 {
        async getClientList(e10 = {}) {
          return this.request({ method: "GET", path: io, queryParams: { ...e10, paginated: true } });
        }
        async getClient(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: s1(io, e10) });
        }
        verifyClient(e10) {
          return this.request({ method: "POST", path: s1(io, "verify"), bodyParams: { token: e10 } });
        }
        async getHandshakePayload(e10) {
          return this.request({ method: "GET", path: s1(io, "handshake_payload"), queryParams: e10 });
        }
      }, il = "/domains", iu = class extends s2 {
        async list() {
          return this.request({ method: "GET", path: il });
        }
        async add(e10) {
          return this.request({ method: "POST", path: il, bodyParams: e10 });
        }
        async update(e10) {
          let { domainId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: s1(il, t10), bodyParams: r10 });
        }
        async delete(e10) {
          return this.deleteDomain(e10);
        }
        async deleteDomain(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: s1(il, e10) });
        }
      }, ih = "/email_addresses", id = class extends s2 {
        async getEmailAddress(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: s1(ih, e10) });
        }
        async createEmailAddress(e10) {
          return this.request({ method: "POST", path: ih, bodyParams: e10 });
        }
        async updateEmailAddress(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: s1(ih, e10), bodyParams: t10 });
        }
        async deleteEmailAddress(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: s1(ih, e10) });
        }
      }, ip = "/enterprise_connections", im = class extends s2 {
        async createEnterpriseConnection(e10) {
          return this.request({ method: "POST", path: ip, bodyParams: e10, options: { deepSnakecaseBodyParamKeys: true } });
        }
        async updateEnterpriseConnection(e10, t10) {
          return this.requireId(e10), this.request({ method: "PATCH", path: s1(ip, e10), bodyParams: t10, options: { deepSnakecaseBodyParamKeys: true } });
        }
        async getEnterpriseConnectionList(e10 = {}) {
          return this.request({ method: "GET", path: ip, queryParams: e10 });
        }
        async getEnterpriseConnection(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: s1(ip, e10) });
        }
        async deleteEnterpriseConnection(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: s1(ip, e10) });
        }
      }, ig = class extends s2 {
        async verify(e10) {
          return this.request({ method: "POST", path: s1("/oauth_applications/access_tokens", "verify"), bodyParams: { access_token: e10 } });
        }
      }, iy = "/instance", ib = class extends s2 {
        async get() {
          return this.request({ method: "GET", path: iy });
        }
        async update(e10) {
          return this.request({ method: "PATCH", path: iy, bodyParams: e10 });
        }
        async updateRestrictions(e10) {
          return this.request({ method: "PATCH", path: s1(iy, "restrictions"), bodyParams: e10 });
        }
        async getOrganizationSettings() {
          return this.request({ method: "GET", path: s1(iy, "organization_settings") });
        }
        async updateOrganizationSettings(e10) {
          return this.request({ method: "PATCH", path: s1(iy, "organization_settings"), bodyParams: e10 });
        }
      }, iw = "/invitations", iv = class extends s2 {
        async getInvitationList(e10 = {}) {
          return this.request({ method: "GET", path: iw, queryParams: { ...e10, paginated: true } });
        }
        async createInvitation(e10) {
          return this.request({ method: "POST", path: iw, bodyParams: e10 });
        }
        async createInvitationBulk(e10) {
          return this.request({ method: "POST", path: s1(iw, "bulk"), bodyParams: e10 });
        }
        async revokeInvitation(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: s1(iw, e10, "revoke") });
        }
      }, ix = "/machines", i_ = class extends s2 {
        async get(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: s1(ix, e10) });
        }
        async list(e10 = {}) {
          return this.request({ method: "GET", path: ix, queryParams: e10 });
        }
        async create(e10) {
          return this.request({ method: "POST", path: ix, bodyParams: e10 });
        }
        async update(e10) {
          let { machineId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: s1(ix, t10), bodyParams: r10 });
        }
        async delete(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: s1(ix, e10) });
        }
        async getSecretKey(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: s1(ix, e10, "secret_key") });
        }
        async rotateSecretKey(e10) {
          let { machineId: t10, previousTokenTtl: r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: s1(ix, t10, "secret_key", "rotate"), bodyParams: { previousTokenTtl: r10 } });
        }
        async createScope(e10, t10) {
          return this.requireId(e10), this.request({ method: "POST", path: s1(ix, e10, "scopes"), bodyParams: { toMachineId: t10 } });
        }
        async deleteScope(e10, t10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: s1(ix, e10, "scopes", t10) });
        }
      }, ik = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10, c10, l10, u10) {
          this.id = e11, this.clientId = t10, this.type = r10, this.subject = s10, this.scopes = i10, this.revoked = n10, this.revocationReason = a10, this.expired = o10, this.expiration = c10, this.createdAt = l10, this.updatedAt = u10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.client_id, t10.type, t10.subject, t10.scopes, t10.revoked, t10.revocation_reason, t10.expired, t10.expiration, t10.created_at, t10.updated_at);
        }
        static fromJwtPayload(t10, r10 = 5e3) {
          return new e10(t10.jti ?? "", t10.client_id ?? "", "oauth_token", t10.sub, t10.scp ?? t10.scope?.split(" ") ?? [], false, null, 1e3 * t10.exp <= Date.now() - r10, t10.exp, t10.iat, t10.iat);
        }
      }, iE = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10, c10, l10, u10) {
          this.id = e11, this.subject = t10, this.scopes = r10, this.claims = s10, this.revoked = i10, this.revocationReason = n10, this.expired = a10, this.expiration = o10, this.createdAt = c10, this.updatedAt = l10, this.token = u10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.subject, t10.scopes, t10.claims, t10.revoked, t10.revocation_reason, t10.expired, t10.expiration, t10.created_at, t10.updated_at, t10.token);
        }
        static fromJwtPayload(t10, r10 = 5e3) {
          return new e10(t10.jti ?? "", t10.sub, t10.scopes?.split(" ") ?? t10.aud ?? [], null, false, null, 1e3 * t10.exp <= Date.now() - r10, 1e3 * t10.exp, 1e3 * t10.iat, 1e3 * t10.iat);
        }
      }, iS = {}, iO = 0;
      function iT(e10, t10, r10 = true) {
        iS[e10] = t10, iO = r10 ? Date.now() : -1;
      }
      function iC(e10) {
        let { kid: t10, pem: r10 } = e10, s10 = `local-${t10}`, i10 = iS[s10];
        if (i10) return i10;
        if (!r10) throw new rA({ action: rR, message: "Missing local JWK.", reason: "jwk-local-missing" });
        let n10 = { kid: s10, kty: "RSA", alg: "RS256", n: r10.replace(/\r\n|\n|\r/g, "").replace("-----BEGIN PUBLIC KEY-----", "").replace("-----END PUBLIC KEY-----", "").replace("MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA", "").replace("IDAQAB", "").replace(/\+/g, "-").replace(/\//g, "_"), e: "AQAB" };
        return iT(s10, n10, false), n10;
      }
      async function iR(e10) {
        let { secretKey: t10, apiUrl: r10 = sh, apiVersion: s10 = "v1", kid: i10, skipJwksCache: n10 } = e10;
        if (n10 || function() {
          if (-1 === iO) return false;
          let e11 = Date.now() - iO >= 3e5;
          return e11 && (iS = {}), e11;
        }() || !iS[i10]) {
          if (!t10) throw new rA({ action: rT, message: "Failed to load JWKS from Clerk Backend or Frontend API.", reason: rS });
          let { keys: e11 } = await rc(() => iA(r10, t10, s10));
          if (!e11 || !e11.length) throw new rA({ action: rT, message: "The JWKS endpoint did not contain any signing keys. Contact support@clerk.com.", reason: rS });
          e11.forEach((e12) => iT(e12.kid, e12));
        }
        let a10 = iS[i10];
        if (!a10) {
          let e11 = Object.values(iS).map((e12) => e12.kid).sort().join(", ");
          throw new rA({ action: `Go to your Dashboard and validate your secret and public keys are correct. ${rT} if the issue persists.`, message: `Unable to find a signing key in JWKS that matches the kid='${i10}' of the provided session token. Please make sure that the __session cookie or the HTTP authorization header contain a Clerk-generated session JWT. The following kid is available: ${e11}`, reason: "jwk-kid-mismatch" });
        }
        return a10;
      }
      async function iA(e10, t10, r10) {
        if (!t10) throw new rA({ action: "Set the CLERK_SECRET_KEY environment variable.", message: "Missing Clerk Secret Key or API Key. Go to https://dashboard.clerk.com and get your key for your instance.", reason: rS });
        let s10 = new URL(e10);
        s10.pathname = s1(s10.pathname, r10, "/jwks");
        let i10 = await rD.fetch(s10.href, { headers: { Authorization: `Bearer ${t10}`, "Clerk-API-Version": sp, "Content-Type": "application/json", "User-Agent": sd } });
        if (!i10.ok) {
          let e11 = await i10.json(), t11 = iP(e11?.errors, "clerk_key_invalid");
          if (t11) throw new rA({ action: rT, message: t11.message, reason: "secret-key-invalid" });
          throw new rA({ action: rT, message: `Error loading Clerk JWKS from ${s10.href} with code=${i10.status}`, reason: rS });
        }
        return i10.json();
      }
      var iP = (e10, t10) => e10 ? e10.find((e11) => e11.code === t10) : null, iI = "mch_", iN = "oat_", iL = ["mt_", iN, "ak_"], iU = /^[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+$/;
      function iM(e10) {
        return iU.test(e10);
      }
      var iD = ["at+jwt", "application/at+jwt"];
      function ij(e10) {
        if (!iM(e10)) return false;
        try {
          let { data: t10, errors: r10 } = rJ(e10);
          return !r10 && !!t10 && iD.includes(t10.header.typ);
        } catch {
          return false;
        }
      }
      function iq(e10) {
        if (!iM(e10)) return false;
        try {
          let { data: t10, errors: r10 } = rJ(e10);
          return !r10 && !!t10 && "string" == typeof t10.payload.sub && t10.payload.sub.startsWith(iI);
        } catch {
          return false;
        }
      }
      function iz(e10) {
        return iL.some((t10) => e10.startsWith(t10));
      }
      function iB(e10) {
        return iz(e10) || ij(e10) || iq(e10);
      }
      function i$(e10) {
        if (e10.startsWith("mt_") || iq(e10)) return sX;
        if (e10.startsWith(iN) || ij(e10)) return sY;
        if (e10.startsWith("ak_")) return sV;
        throw Error("Unknown machine token type");
      }
      var iK = (e10, t10) => !!e10 && ("any" === t10 || (Array.isArray(t10) ? t10 : [t10]).includes(e10)), iH = /* @__PURE__ */ new Set([sV, sX, sY]);
      async function iF(e10, t10, r10, s10) {
        try {
          let i10;
          if (r10.jwtKey) i10 = iC({ kid: t10, pem: r10.jwtKey });
          else {
            if (!r10.secretKey) return { error: new rL({ action: rR, message: "Failed to resolve JWK during verification.", code: rN }) };
            i10 = await iR({ ...r10, kid: t10 });
          }
          let { data: n10, errors: a10 } = await rG(e10, { ...r10, key: i10, ...s10 ? { headerType: s10 } : {} });
          if (a10) return { error: new rL({ code: rN, message: a10[0].message }) };
          return { payload: n10 };
        } catch (e11) {
          return { error: new rL({ code: rN, message: e11.message }) };
        }
      }
      async function iW(e10, t10, r10) {
        let s10 = await iF(e10, t10.header.kid, r10);
        return "error" in s10 ? { data: void 0, tokenType: sX, errors: [s10.error] } : { data: iE.fromJwtPayload(s10.payload, r10.clockSkewInMs), tokenType: sX, errors: void 0 };
      }
      async function iJ(e10, t10, r10) {
        let s10 = await iF(e10, t10.header.kid, r10, iD);
        return "error" in s10 ? { data: void 0, tokenType: sY, errors: [s10.error] } : { data: ik.fromJwtPayload(s10.payload, r10.clockSkewInMs), tokenType: sY, errors: void 0 };
      }
      var iG = "/m2m_tokens", iV = class extends s2 {
        constructor(e10, t10 = {}) {
          super(e10), r3(this, cp), r3(this, cd), ((e11, t11, r10, s10) => (r2(e11, t11, "write to private field"), s10 ? s10.call(e11, r10) : t11.set(e11, r10)))(this, cd, t10);
        }
        async list(e10) {
          let { machineSecretKey: t10, ...r10 } = e10, s10 = r4(this, cp, cm).call(this, { method: "GET", path: iG, queryParams: r10 }, t10);
          return this.request(s10);
        }
        async createToken(e10) {
          let { claims: t10 = null, machineSecretKey: r10, minRemainingTtlSeconds: s10, secondsUntilExpiration: i10 = null, tokenFormat: n10 = "opaque" } = e10 || {}, a10 = r4(this, cp, cm).call(this, { method: "POST", path: iG, bodyParams: { secondsUntilExpiration: i10, claims: t10, minRemainingTtlSeconds: s10, tokenFormat: n10 } }, r10);
          return this.request(a10);
        }
        async revokeToken(e10) {
          let { m2mTokenId: t10, revocationReason: r10 = null, machineSecretKey: s10 } = e10;
          this.requireId(t10);
          let i10 = r4(this, cp, cm).call(this, { method: "POST", path: s1(iG, t10, "revoke"), bodyParams: { revocationReason: r10 } }, s10);
          return this.request(i10);
        }
        async verify(e10) {
          let { token: t10, machineSecretKey: r10 } = e10;
          if (iq(t10)) return r4(this, cp, cf).call(this, t10);
          let s10 = r4(this, cp, cm).call(this, { method: "POST", path: s1(iG, "verify"), bodyParams: { token: t10 } }, r10);
          return this.request(s10);
        }
      };
      cd = /* @__PURE__ */ new WeakMap(), cp = /* @__PURE__ */ new WeakSet(), cm = function(e10, t10) {
        return t10 ? { ...e10, headerParams: { ...e10.headerParams, Authorization: `Bearer ${t10}` } } : e10;
      }, cf = async function(e10) {
        let t10, r10, s10;
        try {
          let { data: r11, errors: s11 } = rJ(e10);
          if (s11) throw s11[0];
          t10 = r11;
        } catch (e11) {
          throw new rL({ code: rP, message: e11.message });
        }
        let i10 = await iW(e10, t10, (r2(this, r10 = cd, "read from private field"), s10 ? s10.call(this) : r10.get(this)));
        if (i10.errors) throw i10.errors[0];
        return i10.data;
      };
      var iX = class extends s2 {
        async getJwks() {
          return this.request({ method: "GET", path: "/jwks" });
        }
      }, iY = "/jwt_templates", iQ = class extends s2 {
        async list(e10 = {}) {
          return this.request({ method: "GET", path: iY, queryParams: { ...e10, paginated: true } });
        }
        async get(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: s1(iY, e10) });
        }
        async create(e10) {
          return this.request({ method: "POST", path: iY, bodyParams: e10 });
        }
        async update(e10) {
          let { templateId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: s1(iY, t10), bodyParams: r10 });
        }
        async delete(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: s1(iY, e10) });
        }
      }, iZ = "/organizations", i0 = class extends s2 {
        async getOrganizationList(e10) {
          return this.request({ method: "GET", path: iZ, queryParams: e10 });
        }
        async createOrganization(e10) {
          return this.request({ method: "POST", path: iZ, bodyParams: e10 });
        }
        async getOrganization(e10) {
          let { includeMembersCount: t10 } = e10, r10 = "organizationId" in e10 ? e10.organizationId : e10.slug;
          return this.requireId(r10), this.request({ method: "GET", path: s1(iZ, r10), queryParams: { includeMembersCount: t10 } });
        }
        async updateOrganization(e10, t10) {
          return this.requireId(e10), this.request({ method: "PATCH", path: s1(iZ, e10), bodyParams: t10 });
        }
        async updateOrganizationLogo(e10, t10) {
          this.requireId(e10);
          let r10 = new rD.FormData();
          return r10.append("file", t10?.file), t10?.uploaderUserId && r10.append("uploader_user_id", t10?.uploaderUserId), this.request({ method: "PUT", path: s1(iZ, e10, "logo"), formData: r10 });
        }
        async deleteOrganizationLogo(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: s1(iZ, e10, "logo") });
        }
        async updateOrganizationMetadata(e10, t10) {
          return this.requireId(e10), this.request({ method: "PATCH", path: s1(iZ, e10, "metadata"), bodyParams: t10 });
        }
        async deleteOrganization(e10) {
          return this.request({ method: "DELETE", path: s1(iZ, e10) });
        }
        async getOrganizationMembershipList(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: s1(iZ, t10, "memberships"), queryParams: r10 });
        }
        async getInstanceOrganizationMembershipList(e10) {
          return this.request({ method: "GET", path: "/organization_memberships", queryParams: e10 });
        }
        async createOrganizationMembership(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: s1(iZ, t10, "memberships"), bodyParams: r10 });
        }
        async updateOrganizationMembership(e10) {
          let { organizationId: t10, userId: r10, ...s10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: s1(iZ, t10, "memberships", r10), bodyParams: s10 });
        }
        async updateOrganizationMembershipMetadata(e10) {
          let { organizationId: t10, userId: r10, ...s10 } = e10;
          return this.request({ method: "PATCH", path: s1(iZ, t10, "memberships", r10, "metadata"), bodyParams: s10 });
        }
        async deleteOrganizationMembership(e10) {
          let { organizationId: t10, userId: r10 } = e10;
          return this.requireId(t10), this.request({ method: "DELETE", path: s1(iZ, t10, "memberships", r10) });
        }
        async getOrganizationInvitationList(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: s1(iZ, t10, "invitations"), queryParams: r10 });
        }
        async createOrganizationInvitation(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: s1(iZ, t10, "invitations"), bodyParams: r10 });
        }
        async createOrganizationInvitationBulk(e10, t10) {
          return this.requireId(e10), this.request({ method: "POST", path: s1(iZ, e10, "invitations", "bulk"), bodyParams: t10 });
        }
        async getOrganizationInvitation(e10) {
          let { organizationId: t10, invitationId: r10 } = e10;
          return this.requireId(t10), this.requireId(r10), this.request({ method: "GET", path: s1(iZ, t10, "invitations", r10) });
        }
        async revokeOrganizationInvitation(e10) {
          let { organizationId: t10, invitationId: r10, ...s10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: s1(iZ, t10, "invitations", r10, "revoke"), bodyParams: s10 });
        }
        async getOrganizationDomainList(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: s1(iZ, t10, "domains"), queryParams: r10 });
        }
        async createOrganizationDomain(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: s1(iZ, t10, "domains"), bodyParams: { ...r10, verified: r10.verified ?? true } });
        }
        async updateOrganizationDomain(e10) {
          let { organizationId: t10, domainId: r10, ...s10 } = e10;
          return this.requireId(t10), this.requireId(r10), this.request({ method: "PATCH", path: s1(iZ, t10, "domains", r10), bodyParams: s10 });
        }
        async deleteOrganizationDomain(e10) {
          let { organizationId: t10, domainId: r10 } = e10;
          return this.requireId(t10), this.requireId(r10), this.request({ method: "DELETE", path: s1(iZ, t10, "domains", r10) });
        }
      }, i1 = "/oauth_applications", i2 = class extends s2 {
        async list(e10 = {}) {
          return this.request({ method: "GET", path: i1, queryParams: e10 });
        }
        async get(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: s1(i1, e10) });
        }
        async create(e10) {
          return this.request({ method: "POST", path: i1, bodyParams: e10 });
        }
        async update(e10) {
          let { oauthApplicationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: s1(i1, t10), bodyParams: r10 });
        }
        async delete(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: s1(i1, e10) });
        }
        async rotateSecret(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: s1(i1, e10, "rotate_secret") });
        }
      }, i3 = "/phone_numbers", i4 = class extends s2 {
        async getPhoneNumber(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: s1(i3, e10) });
        }
        async createPhoneNumber(e10) {
          return this.request({ method: "POST", path: i3, bodyParams: e10 });
        }
        async updatePhoneNumber(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: s1(i3, e10), bodyParams: t10 });
        }
        async deletePhoneNumber(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: s1(i3, e10) });
        }
      }, i5 = class extends s2 {
        async verify(e10) {
          return this.request({ method: "POST", path: "/proxy_checks", bodyParams: e10 });
        }
      }, i6 = "/redirect_urls", i7 = class extends s2 {
        async getRedirectUrlList() {
          return this.request({ method: "GET", path: i6, queryParams: { paginated: true } });
        }
        async getRedirectUrl(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: s1(i6, e10) });
        }
        async createRedirectUrl(e10) {
          return this.request({ method: "POST", path: i6, bodyParams: e10 });
        }
        async deleteRedirectUrl(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: s1(i6, e10) });
        }
      }, i9 = "/saml_connections", i8 = class extends s2 {
        async getSamlConnectionList(e10 = {}) {
          return this.request({ method: "GET", path: i9, queryParams: e10 });
        }
        async createSamlConnection(e10) {
          return this.request({ method: "POST", path: i9, bodyParams: e10, options: { deepSnakecaseBodyParamKeys: true } });
        }
        async getSamlConnection(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: s1(i9, e10) });
        }
        async updateSamlConnection(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: s1(i9, e10), bodyParams: t10, options: { deepSnakecaseBodyParamKeys: true } });
        }
        async deleteSamlConnection(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: s1(i9, e10) });
        }
      }, ne = "/sessions", nt = class extends s2 {
        async getSessionList(e10 = {}) {
          return this.request({ method: "GET", path: ne, queryParams: { ...e10, paginated: true } });
        }
        async getSession(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: s1(ne, e10) });
        }
        async createSession(e10) {
          return this.request({ method: "POST", path: ne, bodyParams: e10 });
        }
        async revokeSession(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: s1(ne, e10, "revoke") });
        }
        async verifySession(e10, t10) {
          return this.requireId(e10), this.request({ method: "POST", path: s1(ne, e10, "verify"), bodyParams: { token: t10 } });
        }
        async getToken(e10, t10, r10) {
          this.requireId(e10);
          let s10 = { method: "POST", path: t10 ? s1(ne, e10, "tokens", t10) : s1(ne, e10, "tokens") };
          return void 0 !== r10 && (s10.bodyParams = { expires_in_seconds: r10 }), this.request(s10);
        }
        async refreshSession(e10, t10) {
          this.requireId(e10);
          let { suffixed_cookies: r10, ...s10 } = t10;
          return this.request({ method: "POST", path: s1(ne, e10, "refresh"), bodyParams: s10, queryParams: { suffixed_cookies: r10 } });
        }
      }, nr = "/sign_in_tokens", ns = class extends s2 {
        async createSignInToken(e10) {
          return this.request({ method: "POST", path: nr, bodyParams: e10 });
        }
        async revokeSignInToken(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: s1(nr, e10, "revoke") });
        }
      }, ni = "/sign_ups", nn = class extends s2 {
        async get(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: s1(ni, e10) });
        }
        async update(e10) {
          let { signUpAttemptId: t10, ...r10 } = e10;
          return this.request({ method: "PATCH", path: s1(ni, t10), bodyParams: r10 });
        }
      }, na = class extends s2 {
        async createTestingToken() {
          return this.request({ method: "POST", path: "/testing_tokens" });
        }
      }, no = "/users", nc = class extends s2 {
        async getUserList(e10 = {}) {
          let { limit: t10, offset: r10, orderBy: s10, ...i10 } = e10, [n10, a10] = await Promise.all([this.request({ method: "GET", path: no, queryParams: e10 }), this.getCount(i10)]);
          return { data: n10, totalCount: a10 };
        }
        async getUser(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: s1(no, e10) });
        }
        async createUser(e10) {
          return this.request({ method: "POST", path: no, bodyParams: e10 });
        }
        async updateUser(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: s1(no, e10), bodyParams: t10 });
        }
        async updateUserProfileImage(e10, t10) {
          this.requireId(e10);
          let r10 = new rD.FormData();
          return r10.append("file", t10?.file), this.request({ method: "POST", path: s1(no, e10, "profile_image"), formData: r10 });
        }
        async updateUserMetadata(e10, t10) {
          return this.requireId(e10), this.request({ method: "PATCH", path: s1(no, e10, "metadata"), bodyParams: t10 });
        }
        async deleteUser(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: s1(no, e10) });
        }
        async getCount(e10 = {}) {
          return this.request({ method: "GET", path: s1(no, "count"), queryParams: e10 });
        }
        async getUserOauthAccessToken(e10, t10) {
          var r10, s10;
          let i10, n10;
          this.requireId(e10);
          let a10 = t10.startsWith("oauth_"), o10 = a10 ? t10 : `oauth_${t10}`;
          return a10 && (r10 = "getUserOauthAccessToken(userId, provider)", i10 = tY(), n10 = s10 ?? r10, tQ.has(n10) || i10 || (tQ.add(n10), console.warn(`Clerk - DEPRECATION WARNING: "${r10}" is deprecated and will be removed in the next major release.
Remove the \`oauth_\` prefix from the \`provider\` argument.`))), this.request({ method: "GET", path: s1(no, e10, "oauth_access_tokens", o10), queryParams: { paginated: true } });
        }
        async disableUserMFA(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: s1(no, e10, "mfa") });
        }
        async getOrganizationMembershipList(e10) {
          let { userId: t10, limit: r10, offset: s10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: s1(no, t10, "organization_memberships"), queryParams: { limit: r10, offset: s10 } });
        }
        async getOrganizationInvitationList(e10) {
          let { userId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: s1(no, t10, "organization_invitations"), queryParams: r10 });
        }
        async verifyPassword(e10) {
          let { userId: t10, password: r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: s1(no, t10, "verify_password"), bodyParams: { password: r10 } });
        }
        async verifyTOTP(e10) {
          let { userId: t10, code: r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: s1(no, t10, "verify_totp"), bodyParams: { code: r10 } });
        }
        async banUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: s1(no, e10, "ban") });
        }
        async unbanUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: s1(no, e10, "unban") });
        }
        async lockUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: s1(no, e10, "lock") });
        }
        async unlockUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: s1(no, e10, "unlock") });
        }
        async deleteUserProfileImage(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: s1(no, e10, "profile_image") });
        }
        async deleteUserPasskey(e10) {
          return this.requireId(e10.userId), this.requireId(e10.passkeyIdentificationId), this.request({ method: "DELETE", path: s1(no, e10.userId, "passkeys", e10.passkeyIdentificationId) });
        }
        async deleteUserWeb3Wallet(e10) {
          return this.requireId(e10.userId), this.requireId(e10.web3WalletIdentificationId), this.request({ method: "DELETE", path: s1(no, e10.userId, "web3_wallets", e10.web3WalletIdentificationId) });
        }
        async deleteUserExternalAccount(e10) {
          return this.requireId(e10.userId), this.requireId(e10.externalAccountId), this.request({ method: "DELETE", path: s1(no, e10.userId, "external_accounts", e10.externalAccountId) });
        }
        async deleteUserBackupCodes(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: s1(no, e10, "backup_code") });
        }
        async deleteUserTOTP(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: s1(no, e10, "totp") });
        }
        async setPasswordCompromised(e10, t10 = { revokeAllSessions: false }) {
          return this.requireId(e10), this.request({ method: "POST", path: s1(no, e10, "password", "set_compromised"), bodyParams: t10 });
        }
        async unsetPasswordCompromised(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: s1(no, e10, "password", "unset_compromised") });
        }
      }, nl = "/waitlist_entries", nu = class extends s2 {
        async list(e10 = {}) {
          return this.request({ method: "GET", path: nl, queryParams: e10 });
        }
        async create(e10) {
          return this.request({ method: "POST", path: nl, bodyParams: e10 });
        }
        async createBulk(e10) {
          return this.request({ method: "POST", path: s1(nl, "bulk"), bodyParams: e10 });
        }
        async invite(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "POST", path: s1(nl, e10, "invite"), bodyParams: t10 });
        }
        async reject(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: s1(nl, e10, "reject") });
        }
        async delete(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: s1(nl, e10) });
        }
      }, nh = "/webhooks", nd = class extends s2 {
        async createSvixApp() {
          return this.request({ method: "POST", path: s1(nh, "svix") });
        }
        async generateSvixAuthURL() {
          return this.request({ method: "POST", path: s1(nh, "svix_url") });
        }
        async deleteSvixApp() {
          return this.request({ method: "DELETE", path: s1(nh, "svix") });
        }
      }, np = "/billing", nm = class extends s2 {
        async getPlanList(e10) {
          return this.request({ method: "GET", path: s1(np, "plans"), queryParams: e10 });
        }
        async cancelSubscriptionItem(e10, t10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: s1(np, "subscription_items", e10), queryParams: t10 });
        }
        async extendSubscriptionItemFreeTrial(e10, t10) {
          return this.requireId(e10), this.request({ method: "POST", path: s1("/billing", "subscription_items", e10, "extend_free_trial"), bodyParams: t10 });
        }
        async getOrganizationBillingSubscription(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: s1("/organizations", e10, "billing", "subscription") });
        }
        async getUserBillingSubscription(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: s1("/users", e10, "billing", "subscription") });
        }
      }, nf = (e10) => "object" == typeof e10 && null !== e10, ng = (e10) => nf(e10) && !(e10 instanceof RegExp) && !(e10 instanceof Error) && !(e10 instanceof Date) && !(globalThis.Blob && e10 instanceof globalThis.Blob), ny = Symbol("mapObjectSkip"), nb = (e10, t10, r10, s10 = /* @__PURE__ */ new WeakMap()) => {
        if (r10 = { deep: false, target: {}, ...r10 }, s10.has(e10)) return s10.get(e10);
        s10.set(e10, r10.target);
        let { target: i10 } = r10;
        delete r10.target;
        let n10 = (e11) => e11.map((e12) => ng(e12) ? nb(e12, t10, r10, s10) : e12);
        if (Array.isArray(e10)) return n10(e10);
        for (let [a10, o10] of Object.entries(e10)) {
          let c10 = t10(a10, o10, e10);
          if (c10 === ny) continue;
          let [l10, u10, { shouldRecurse: h10 = true } = {}] = c10;
          "__proto__" !== l10 && (r10.deep && h10 && ng(u10) && (u10 = Array.isArray(u10) ? n10(u10) : nb(u10, t10, r10, s10)), i10[l10] = u10);
        }
        return i10;
      };
      function nw(e10, t10, r10) {
        if (!nf(e10)) throw TypeError(`Expected an object, got \`${e10}\` (${typeof e10})`);
        if (Array.isArray(e10)) throw TypeError("Expected an object, got an array");
        return nb(e10, t10, r10);
      }
      var nv = /([\p{Ll}\d])(\p{Lu})/gu, nx = /(\p{Lu})([\p{Lu}][\p{Ll}])/gu, n_ = /(\d)\p{Ll}|(\p{L})\d/u, nk = /[^\p{L}\d]+/giu, nE = "$1\0$2";
      function nS(e10) {
        let t10 = e10.trim();
        t10 = (t10 = t10.replace(nv, nE).replace(nx, nE)).replace(nk, "\0");
        let r10 = 0, s10 = t10.length;
        for (; "\0" === t10.charAt(r10); ) r10++;
        if (r10 === s10) return [];
        for (; "\0" === t10.charAt(s10 - 1); ) s10--;
        return t10.slice(r10, s10).split(/\0/g);
      }
      function nO(e10) {
        let t10 = nS(e10);
        for (let e11 = 0; e11 < t10.length; e11++) {
          let r10 = t10[e11], s10 = n_.exec(r10);
          if (s10) {
            let i10 = s10.index + (s10[1] ?? s10[2]).length;
            t10.splice(e11, 1, r10.slice(0, i10), r10.slice(i10));
          }
        }
        return t10;
      }
      function nT(e10, t10) {
        return function(e11, t11) {
          var r10;
          let [s10, i10, n10] = function(e12, t12 = {}) {
            let r11 = t12.split ?? (t12.separateNumbers ? nO : nS), s11 = t12.prefixCharacters ?? "", i11 = t12.suffixCharacters ?? "", n11 = 0, a10 = e12.length;
            for (; n11 < e12.length; ) {
              let t13 = e12.charAt(n11);
              if (!s11.includes(t13)) break;
              n11++;
            }
            for (; a10 > n11; ) {
              let t13 = a10 - 1, r12 = e12.charAt(t13);
              if (!i11.includes(r12)) break;
              a10 = t13;
            }
            return [e12.slice(0, n11), r11(e12.slice(n11, a10)), e12.slice(a10)];
          }(e11, t11);
          return s10 + i10.map(false === (r10 = t11?.locale) ? (e12) => e12.toLowerCase() : (e12) => e12.toLocaleLowerCase(r10)).join(t11?.delimiter ?? " ") + n10;
        }(e10, { delimiter: "_", ...t10 });
      }
      var nC = {}.constructor;
      function nR(e10, t10) {
        return e10.some((e11) => "string" == typeof e11 ? e11 === t10 : e11.test(t10));
      }
      function nA(e10, t10, r10) {
        return r10.shouldRecurse ? { shouldRecurse: r10.shouldRecurse(e10, t10) } : void 0;
      }
      var nP = function(e10, t10) {
        if (Array.isArray(e10)) {
          if (e10.some((e11) => e11.constructor !== nC)) throw Error("obj must be array of plain objects");
          let r11 = (t10 = { deep: true, exclude: [], parsingOptions: {}, ...t10 }).snakeCase || ((e11) => nT(e11, t10.parsingOptions));
          return e10.map((e11) => nw(e11, (e12, s10) => [nR(t10.exclude, e12) ? e12 : r11(e12), s10, nA(e12, s10, t10)], t10));
        }
        if (e10.constructor !== nC) throw Error("obj must be an plain object");
        let r10 = (t10 = { deep: true, exclude: [], parsingOptions: {}, ...t10 }).snakeCase || ((e11) => nT(e11, t10.parsingOptions));
        return nw(e10, (e11, s10) => [nR(t10.exclude, e11) ? e11 : r10(e11), s10, nA(e11, s10, t10)], t10);
      }, nI = class e10 {
        constructor(e11, t10, r10, s10) {
          this.publishableKey = e11, this.secretKey = t10, this.claimUrl = r10, this.apiKeysUrl = s10;
        }
        static fromJSON(t10) {
          return new e10(t10.publishable_key, t10.secret_key, t10.claim_url, t10.api_keys_url);
        }
      }, nN = class e10 {
        constructor(e11, t10, r10) {
          this.agentId = e11, this.taskId = t10, this.url = r10;
        }
        static fromJSON(t10) {
          return new e10(t10.agent_id, t10.task_id, t10.url);
        }
      }, nL = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10) {
          this.id = e11, this.status = t10, this.userId = r10, this.actor = s10, this.token = i10, this.url = n10, this.createdAt = a10, this.updatedAt = o10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.status, t10.user_id, t10.actor, t10.token, t10.url, t10.created_at, t10.updated_at);
        }
      }, nU = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10) {
          this.id = e11, this.identifier = t10, this.identifierType = r10, this.createdAt = s10, this.updatedAt = i10, this.instanceId = n10, this.invitationId = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.identifier, t10.identifier_type, t10.created_at, t10.updated_at, t10.instance_id, t10.invitation_id);
        }
      }, nM = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10, c10, l10, u10, h10, d10, p2, m2, f2) {
          this.id = e11, this.type = t10, this.name = r10, this.subject = s10, this.scopes = i10, this.claims = n10, this.revoked = a10, this.revocationReason = o10, this.expired = c10, this.expiration = l10, this.createdBy = u10, this.description = h10, this.lastUsedAt = d10, this.createdAt = p2, this.updatedAt = m2, this.secret = f2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.type, t10.name, t10.subject, t10.scopes, t10.claims, t10.revoked, t10.revocation_reason, t10.expired, t10.expiration, t10.created_by, t10.description, t10.last_used_at, t10.created_at, t10.updated_at, t10.secret);
        }
      }, nD = class e10 {
        constructor(e11, t10, r10, s10, i10, n10) {
          this.id = e11, this.identifier = t10, this.identifierType = r10, this.createdAt = s10, this.updatedAt = i10, this.instanceId = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.identifier, t10.identifier_type, t10.created_at, t10.updated_at, t10.instance_id);
        }
      }, nj = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10) {
          this.id = e11, this.isMobile = t10, this.ipAddress = r10, this.city = s10, this.country = i10, this.browserVersion = n10, this.browserName = a10, this.deviceType = o10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.is_mobile, t10.ip_address, t10.city, t10.country, t10.browser_version, t10.browser_name, t10.device_type);
        }
      }, nq = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10, c10, l10, u10, h10 = null) {
          this.id = e11, this.clientId = t10, this.userId = r10, this.status = s10, this.lastActiveAt = i10, this.expireAt = n10, this.abandonAt = a10, this.createdAt = o10, this.updatedAt = c10, this.lastActiveOrganizationId = l10, this.latestActivity = u10, this.actor = h10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.client_id, t10.user_id, t10.status, t10.last_active_at, t10.expire_at, t10.abandon_at, t10.created_at, t10.updated_at, t10.last_active_organization_id, t10.latest_activity && nj.fromJSON(t10.latest_activity), t10.actor);
        }
      }, nz = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10, c10) {
          this.id = e11, this.sessionIds = t10, this.sessions = r10, this.signInId = s10, this.signUpId = i10, this.lastActiveSessionId = n10, this.lastAuthenticationStrategy = a10, this.createdAt = o10, this.updatedAt = c10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.session_ids, t10.sessions.map((e11) => nq.fromJSON(e11)), t10.sign_in_id, t10.sign_up_id, t10.last_active_session_id, t10.last_authentication_strategy, t10.created_at, t10.updated_at);
        }
      }, nB = class e10 {
        constructor(e11, t10, r10) {
          this.host = e11, this.value = t10, this.required = r10;
        }
        static fromJSON(t10) {
          return new e10(t10.host, t10.value, t10.required);
        }
      }, n$ = class e10 {
        constructor(e11) {
          this.cookies = e11;
        }
        static fromJSON(t10) {
          return new e10(t10.cookies);
        }
      }, nK = class e10 {
        constructor(e11, t10, r10, s10) {
          this.object = e11, this.id = t10, this.slug = r10, this.deleted = s10;
        }
        static fromJSON(t10) {
          return new e10(t10.object, t10.id || null, t10.slug || null, t10.deleted);
        }
      }, nH = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10) {
          this.id = e11, this.name = t10, this.isSatellite = r10, this.frontendApiUrl = s10, this.developmentOrigin = i10, this.cnameTargets = n10, this.accountsPortalUrl = a10, this.proxyUrl = o10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.is_satellite, t10.frontend_api_url, t10.development_origin, t10.cname_targets && t10.cname_targets.map((e11) => nB.fromJSON(e11)), t10.accounts_portal_url, t10.proxy_url);
        }
      }, nF = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10, c10, l10, u10) {
          this.id = e11, this.fromEmailName = t10, this.emailAddressId = r10, this.toEmailAddress = s10, this.subject = i10, this.body = n10, this.bodyPlain = a10, this.status = o10, this.slug = c10, this.data = l10, this.deliveredByClerk = u10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.from_email_name, t10.email_address_id, t10.to_email_address, t10.subject, t10.body, t10.body_plain, t10.status, t10.slug, t10.data, t10.delivered_by_clerk);
        }
      }, nW = class e10 {
        constructor(e11, t10) {
          this.id = e11, this.type = t10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.type);
        }
      }, nJ = class e10 {
        constructor(e11, t10, r10 = null, s10 = null, i10 = null, n10 = null, a10 = null) {
          this.status = e11, this.strategy = t10, this.externalVerificationRedirectURL = r10, this.attempts = s10, this.expireAt = i10, this.nonce = n10, this.message = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.status, t10.strategy, t10.external_verification_redirect_url ? new URL(t10.external_verification_redirect_url) : null, t10.attempts, t10.expire_at, t10.nonce);
        }
      }, nG = class e10 {
        constructor(e11, t10, r10, s10) {
          this.id = e11, this.emailAddress = t10, this.verification = r10, this.linkedTo = s10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.email_address, t10.verification && nJ.fromJSON(t10.verification), t10.linked_to.map((e11) => nW.fromJSON(e11)));
        }
      }, nV = class e10 {
        constructor(e11, t10, r10, s10, i10) {
          this.id = e11, this.name = t10, this.description = r10, this.slug = s10, this.avatarUrl = i10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.description ?? null, t10.slug, t10.avatar_url ?? null);
        }
      }, nX = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10, c10, l10, u10, h10, d10, p2, m2, f2) {
          this.id = e11, this.name = t10, this.slug = r10, this.description = s10, this.isDefault = i10, this.isRecurring = n10, this.hasBaseFee = a10, this.publiclyVisible = o10, this.fee = c10, this.annualFee = l10, this.annualMonthlyFee = u10, this.forPayerType = h10, this.features = d10, this.avatarUrl = p2, this.freeTrialDays = m2, this.freeTrialEnabled = f2;
        }
        static fromJSON(t10) {
          let r10 = (e11) => e11 ? { amount: e11.amount, amountFormatted: e11.amount_formatted, currency: e11.currency, currencySymbol: e11.currency_symbol } : null;
          return new e10(t10.id, t10.name, t10.slug, t10.description ?? null, t10.is_default, t10.is_recurring, t10.has_base_fee, t10.publicly_visible, r10(t10.fee), r10(t10.annual_fee), r10(t10.annual_monthly_fee), t10.for_payer_type, (t10.features ?? []).map((e11) => nV.fromJSON(e11)), t10.avatar_url, t10.free_trial_days, t10.free_trial_enabled);
        }
      }, nY = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10, c10, l10, u10, h10, d10, p2, m2, f2, g2) {
          this.id = e11, this.status = t10, this.planPeriod = r10, this.periodStart = s10, this.nextPayment = i10, this.amount = n10, this.plan = a10, this.planId = o10, this.createdAt = c10, this.updatedAt = l10, this.periodEnd = u10, this.canceledAt = h10, this.pastDueAt = d10, this.endedAt = p2, this.payerId = m2, this.isFreeTrial = f2, this.lifetimePaid = g2;
        }
        static fromJSON(t10) {
          function r10(e11) {
            return e11 ? { amount: e11.amount, amountFormatted: e11.amount_formatted, currency: e11.currency, currencySymbol: e11.currency_symbol } : e11;
          }
          return new e10(t10.id, t10.status, t10.plan_period, t10.period_start, t10.next_payment, r10(t10.amount) ?? void 0, t10.plan ? nX.fromJSON(t10.plan) : null, t10.plan_id ?? null, t10.created_at, t10.updated_at, t10.period_end, t10.canceled_at, t10.past_due_at, t10.ended_at, t10.payer_id, t10.is_free_trial, r10(t10.lifetime_paid) ?? void 0);
        }
      }, nQ = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10, c10, l10) {
          this.id = e11, this.status = t10, this.payerId = r10, this.createdAt = s10, this.updatedAt = i10, this.activeAt = n10, this.pastDueAt = a10, this.subscriptionItems = o10, this.nextPayment = c10, this.eligibleForFreeTrial = l10;
        }
        static fromJSON(t10) {
          let r10 = t10.next_payment ? { date: t10.next_payment.date, amount: { amount: t10.next_payment.amount.amount, amountFormatted: t10.next_payment.amount.amount_formatted, currency: t10.next_payment.amount.currency, currencySymbol: t10.next_payment.amount.currency_symbol } } : null;
          return new e10(t10.id, t10.status, t10.payer_id, t10.created_at, t10.updated_at, t10.active_at ?? null, t10.past_due_at ?? null, (t10.subscription_items ?? []).map((e11) => nY.fromJSON(e11)), r10, t10.eligible_for_free_trial ?? false);
        }
      }, nZ = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10, c10, l10, u10, h10, d10) {
          this.id = e11, this.active = t10, this.allowIdpInitiated = r10, this.allowSubdomains = s10, this.disableAdditionalIdentifications = i10, this.domain = n10, this.logoPublicUrl = a10, this.name = o10, this.protocol = c10, this.provider = l10, this.syncUserAttributes = u10, this.createdAt = h10, this.updatedAt = d10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.active, t10.allow_idp_initiated, t10.allow_subdomains, t10.disable_additional_identifications, t10.domain, t10.logo_public_url, t10.name, t10.protocol, t10.provider, t10.sync_user_attributes, t10.created_at, t10.updated_at);
        }
      }, n0 = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10, c10, l10, u10, h10, d10) {
          this.id = e11, this.active = t10, this.emailAddress = r10, this.enterpriseConnection = s10, this.firstName = i10, this.lastName = n10, this.protocol = a10, this.provider = o10, this.providerUserId = c10, this.publicMetadata = l10, this.verification = u10, this.lastAuthenticatedAt = h10, this.enterpriseConnectionId = d10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.active, t10.email_address, t10.enterprise_connection && nZ.fromJSON(t10.enterprise_connection), t10.first_name, t10.last_name, t10.protocol, t10.provider, t10.provider_user_id, t10.public_metadata, t10.verification && nJ.fromJSON(t10.verification), t10.last_authenticated_at, t10.enterprise_connection_id);
        }
      }, n1 = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10, c10, l10, u10, h10, d10) {
          this.id = e11, this.name = t10, this.idpEntityId = r10, this.idpSsoUrl = s10, this.idpCertificate = i10, this.idpMetadataUrl = n10, this.idpMetadata = a10, this.acsUrl = o10, this.spEntityId = c10, this.spMetadataUrl = l10, this.syncUserAttributes = u10, this.allowSubdomains = h10, this.allowIdpInitiated = d10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.idp_entity_id, t10.idp_sso_url, t10.idp_certificate, t10.idp_metadata_url, t10.idp_metadata, t10.acs_url, t10.sp_entity_id, t10.sp_metadata_url, t10.sync_user_attributes, t10.allow_subdomains, t10.allow_idp_initiated);
        }
      }, n2 = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10) {
          this.id = e11, this.name = t10, this.clientId = r10, this.discoveryUrl = s10, this.logoPublicUrl = i10, this.createdAt = n10, this.updatedAt = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.client_id, t10.discovery_url, t10.logo_public_url, t10.created_at, t10.updated_at);
        }
      }, n3 = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10, c10, l10, u10, h10) {
          this.id = e11, this.name = t10, this.domains = r10, this.organizationId = s10, this.active = i10, this.syncUserAttributes = n10, this.allowSubdomains = a10, this.disableAdditionalIdentifications = o10, this.createdAt = c10, this.updatedAt = l10, this.samlConnection = u10, this.oauthConfig = h10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.domains, t10.organization_id, t10.active, t10.sync_user_attributes, t10.allow_subdomains, t10.disable_additional_identifications, t10.created_at, t10.updated_at, null != t10.saml_connection ? n1.fromJSON(t10.saml_connection) : null, null != t10.oauth_config ? n2.fromJSON(t10.oauth_config) : null);
        }
      }, n4 = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10, c10, l10, u10, h10, d10 = {}, p2, m2) {
          this.id = e11, this.provider = t10, this.providerUserId = r10, this.identificationId = s10, this.externalId = i10, this.approvedScopes = n10, this.emailAddress = a10, this.firstName = o10, this.lastName = c10, this.imageUrl = l10, this.username = u10, this.phoneNumber = h10, this.publicMetadata = d10, this.label = p2, this.verification = m2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.provider, t10.provider_user_id, t10.identification_id, t10.provider_user_id, t10.approved_scopes, t10.email_address, t10.first_name, t10.last_name, t10.image_url || "", t10.username, t10.phone_number, t10.public_metadata, t10.label, t10.verification && nJ.fromJSON(t10.verification));
        }
      }, n5 = class e10 {
        constructor(e11, t10, r10) {
          this.id = e11, this.environmentType = t10, this.allowedOrigins = r10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.environment_type, t10.allowed_origins);
        }
      }, n6 = class e10 {
        constructor(e11, t10, r10, s10, i10) {
          this.allowlist = e11, this.blocklist = t10, this.blockEmailSubaddresses = r10, this.blockDisposableEmailDomains = s10, this.ignoreDotsForGmailAddresses = i10;
        }
        static fromJSON(t10) {
          return new e10(t10.allowlist, t10.blocklist, t10.block_email_subaddresses, t10.block_disposable_email_domains, t10.ignore_dots_for_gmail_addresses);
        }
      }, n7 = class e10 {
        constructor(e11, t10, r10, s10, i10) {
          this.id = e11, this.restrictedToAllowlist = t10, this.fromEmailAddress = r10, this.progressiveSignUp = s10, this.enhancedEmailDeliverability = i10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.restricted_to_allowlist, t10.from_email_address, t10.progressive_sign_up, t10.enhanced_email_deliverability);
        }
      }, n9 = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10) {
          this.id = e11, this.emailAddress = t10, this.publicMetadata = r10, this.createdAt = s10, this.updatedAt = i10, this.status = n10, this.url = a10, this.revoked = o10, this._raw = null;
        }
        get raw() {
          return this._raw;
        }
        static fromJSON(t10) {
          let r10 = new e10(t10.id, t10.email_address, t10.public_metadata, t10.created_at, t10.updated_at, t10.status, t10.url, t10.revoked);
          return r10._raw = t10, r10;
        }
      }, n8 = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10, c10) {
          this.id = e11, this.name = t10, this.claims = r10, this.lifetime = s10, this.allowedClockSkew = i10, this.customSigningKey = n10, this.signingAlgorithm = a10, this.createdAt = o10, this.updatedAt = c10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.claims, t10.lifetime, t10.allowed_clock_skew, t10.custom_signing_key, t10.signing_algorithm, t10.created_at, t10.updated_at);
        }
      }, ae = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10) {
          this.id = e11, this.name = t10, this.instanceId = r10, this.createdAt = s10, this.updatedAt = i10, this.scopedMachines = n10, this.defaultTokenTtl = a10, this.secretKey = o10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.instance_id, t10.created_at, t10.updated_at, t10.scoped_machines.map((t11) => new e10(t11.id, t11.name, t11.instance_id, t11.created_at, t11.updated_at, [], t11.default_token_ttl)), t10.default_token_ttl, t10.secret_key);
        }
      }, at = class e10 {
        constructor(e11, t10, r10, s10) {
          this.fromMachineId = e11, this.toMachineId = t10, this.createdAt = r10, this.deleted = s10;
        }
        static fromJSON(t10) {
          return new e10(t10.from_machine_id, t10.to_machine_id, t10.created_at, t10.deleted);
        }
      }, ar = class e10 {
        constructor(e11) {
          this.secret = e11;
        }
        static fromJSON(t10) {
          return new e10(t10.secret);
        }
      }, as = class e10 {
        constructor(e11, t10, r10, s10 = {}, i10, n10, a10, o10, c10) {
          this.externalAccountId = e11, this.provider = t10, this.token = r10, this.publicMetadata = s10, this.label = i10, this.scopes = n10, this.tokenSecret = a10, this.expiresAt = o10, this.idToken = c10;
        }
        static fromJSON(t10) {
          return new e10(t10.external_account_id, t10.provider, t10.token, t10.public_metadata, t10.label || "", t10.scopes, t10.token_secret, t10.expires_at, t10.id_token);
        }
      }, ai = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10, c10, l10, u10, h10, d10, p2, m2, f2, g2, y2, b2, w2) {
          this.id = e11, this.instanceId = t10, this.name = r10, this.clientId = s10, this.clientUri = i10, this.clientImageUrl = n10, this.dynamicallyRegistered = a10, this.consentScreenEnabled = o10, this.pkceRequired = c10, this.isPublic = l10, this.scopes = u10, this.redirectUris = h10, this.authorizeUrl = d10, this.tokenFetchUrl = p2, this.userInfoUrl = m2, this.discoveryUrl = f2, this.tokenIntrospectionUrl = g2, this.createdAt = y2, this.updatedAt = b2, this.clientSecret = w2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.instance_id, t10.name, t10.client_id, t10.client_uri, t10.client_image_url, t10.dynamically_registered, t10.consent_screen_enabled, t10.pkce_required, t10.public, t10.scopes, t10.redirect_uris, t10.authorize_url, t10.token_fetch_url, t10.user_info_url, t10.discovery_url, t10.token_introspection_url, t10.created_at, t10.updated_at, t10.client_secret);
        }
      }, an = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10 = {}, c10 = {}, l10, u10, h10, d10) {
          this.id = e11, this.name = t10, this.slug = r10, this.imageUrl = s10, this.hasImage = i10, this.createdAt = n10, this.updatedAt = a10, this.publicMetadata = o10, this.privateMetadata = c10, this.maxAllowedMemberships = l10, this.adminDeleteEnabled = u10, this.membersCount = h10, this.createdBy = d10, this._raw = null;
        }
        get raw() {
          return this._raw;
        }
        static fromJSON(t10) {
          let r10 = new e10(t10.id, t10.name, t10.slug, t10.image_url || "", t10.has_image, t10.created_at, t10.updated_at, t10.public_metadata, t10.private_metadata, t10.max_allowed_memberships, t10.admin_delete_enabled, t10.members_count, t10.created_by);
          return r10._raw = t10, r10;
        }
      }, aa = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10, c10, l10, u10 = {}, h10 = {}, d10) {
          this.id = e11, this.emailAddress = t10, this.role = r10, this.roleName = s10, this.organizationId = i10, this.createdAt = n10, this.updatedAt = a10, this.expiresAt = o10, this.url = c10, this.status = l10, this.publicMetadata = u10, this.privateMetadata = h10, this.publicOrganizationData = d10, this._raw = null;
        }
        get raw() {
          return this._raw;
        }
        static fromJSON(t10) {
          let r10 = new e10(t10.id, t10.email_address, t10.role, t10.role_name, t10.organization_id, t10.created_at, t10.updated_at, t10.expires_at, t10.url, t10.status, t10.public_metadata, t10.private_metadata, t10.public_organization_data);
          return r10._raw = t10, r10;
        }
      }, ao = class e10 {
        constructor(e11, t10, r10, s10 = {}, i10 = {}, n10, a10, o10, c10) {
          this.id = e11, this.role = t10, this.permissions = r10, this.publicMetadata = s10, this.privateMetadata = i10, this.createdAt = n10, this.updatedAt = a10, this.organization = o10, this.publicUserData = c10, this._raw = null;
        }
        get raw() {
          return this._raw;
        }
        static fromJSON(t10) {
          let r10 = new e10(t10.id, t10.role, t10.permissions, t10.public_metadata, t10.private_metadata, t10.created_at, t10.updated_at, an.fromJSON(t10.organization), ac.fromJSON(t10.public_user_data));
          return r10._raw = t10, r10;
        }
      }, ac = class e10 {
        constructor(e11, t10, r10, s10, i10, n10) {
          this.identifier = e11, this.firstName = t10, this.lastName = r10, this.imageUrl = s10, this.hasImage = i10, this.userId = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.identifier, t10.first_name, t10.last_name, t10.image_url, t10.has_image, t10.user_id);
        }
      }, al = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10, c10, l10) {
          this.enabled = e11, this.maxAllowedMemberships = t10, this.maxAllowedRoles = r10, this.maxAllowedPermissions = s10, this.creatorRole = i10, this.adminDeleteEnabled = n10, this.domainsEnabled = a10, this.slugDisabled = o10, this.domainsEnrollmentModes = c10, this.domainsDefaultRole = l10;
        }
        static fromJSON(t10) {
          return new e10(t10.enabled, t10.max_allowed_memberships, t10.max_allowed_roles, t10.max_allowed_permissions, t10.creator_role, t10.admin_delete_enabled, t10.domains_enabled, t10.slug_disabled, t10.domains_enrollment_modes, t10.domains_default_role);
        }
      }, au = class e10 {
        constructor(e11, t10, r10, s10, i10, n10) {
          this.id = e11, this.phoneNumber = t10, this.reservedForSecondFactor = r10, this.defaultSecondFactor = s10, this.verification = i10, this.linkedTo = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.phone_number, t10.reserved_for_second_factor, t10.default_second_factor, t10.verification && nJ.fromJSON(t10.verification), t10.linked_to.map((e11) => nW.fromJSON(e11)));
        }
      }, ah = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10) {
          this.id = e11, this.domainId = t10, this.lastRunAt = r10, this.proxyUrl = s10, this.successful = i10, this.createdAt = n10, this.updatedAt = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.domain_id, t10.last_run_at, t10.proxy_url, t10.successful, t10.created_at, t10.updated_at);
        }
      }, ad = class e10 {
        constructor(e11, t10, r10, s10) {
          this.id = e11, this.url = t10, this.createdAt = r10, this.updatedAt = s10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.url, t10.created_at, t10.updated_at);
        }
      }, ap = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10, c10, l10, u10, h10, d10, p2, m2, f2, g2, y2, b2, w2, v2) {
          this.id = e11, this.name = t10, this.domain = r10, this.organizationId = s10, this.idpEntityId = i10, this.idpSsoUrl = n10, this.idpCertificate = a10, this.idpMetadataUrl = o10, this.idpMetadata = c10, this.acsUrl = l10, this.spEntityId = u10, this.spMetadataUrl = h10, this.active = d10, this.provider = p2, this.userCount = m2, this.syncUserAttributes = f2, this.allowSubdomains = g2, this.allowIdpInitiated = y2, this.createdAt = b2, this.updatedAt = w2, this.attributeMapping = v2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.domain, t10.organization_id, t10.idp_entity_id, t10.idp_sso_url, t10.idp_certificate, t10.idp_metadata_url, t10.idp_metadata, t10.acs_url, t10.sp_entity_id, t10.sp_metadata_url, t10.active, t10.provider, t10.user_count, t10.sync_user_attributes, t10.allow_subdomains, t10.allow_idp_initiated, t10.created_at, t10.updated_at, t10.attribute_mapping && am.fromJSON(t10.attribute_mapping));
        }
      }, am = class e10 {
        constructor(e11, t10, r10, s10) {
          this.userId = e11, this.emailAddress = t10, this.firstName = r10, this.lastName = s10;
        }
        static fromJSON(t10) {
          return new e10(t10.user_id, t10.email_address, t10.first_name, t10.last_name);
        }
      }, af = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10) {
          this.id = e11, this.userId = t10, this.token = r10, this.status = s10, this.url = i10, this.createdAt = n10, this.updatedAt = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.user_id, t10.token, t10.status, t10.url, t10.created_at, t10.updated_at);
        }
      }, ag = class e10 {
        constructor(e11, t10) {
          this.nextAction = e11, this.supportedStrategies = t10;
        }
        static fromJSON(t10) {
          return new e10(t10.next_action, t10.supported_strategies);
        }
      }, ay = class e10 {
        constructor(e11, t10, r10, s10) {
          this.emailAddress = e11, this.phoneNumber = t10, this.web3Wallet = r10, this.externalAccount = s10;
        }
        static fromJSON(t10) {
          return new e10(t10.email_address && ag.fromJSON(t10.email_address), t10.phone_number && ag.fromJSON(t10.phone_number), t10.web3_wallet && ag.fromJSON(t10.web3_wallet), t10.external_account);
        }
      }, ab = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10, c10, l10, u10, h10, d10, p2, m2, f2, g2, y2, b2, w2, v2, x2) {
          this.id = e11, this.status = t10, this.requiredFields = r10, this.optionalFields = s10, this.missingFields = i10, this.unverifiedFields = n10, this.verifications = a10, this.username = o10, this.emailAddress = c10, this.phoneNumber = l10, this.web3Wallet = u10, this.passwordEnabled = h10, this.firstName = d10, this.lastName = p2, this.customAction = m2, this.externalId = f2, this.createdSessionId = g2, this.createdUserId = y2, this.abandonAt = b2, this.legalAcceptedAt = w2, this.publicMetadata = v2, this.unsafeMetadata = x2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.status, t10.required_fields, t10.optional_fields, t10.missing_fields, t10.unverified_fields, t10.verifications ? ay.fromJSON(t10.verifications) : null, t10.username, t10.email_address, t10.phone_number, t10.web3_wallet, t10.password_enabled, t10.first_name, t10.last_name, t10.custom_action, t10.external_id, t10.created_session_id, t10.created_user_id, t10.abandon_at, t10.legal_accepted_at, t10.public_metadata, t10.unsafe_metadata);
        }
      }, aw = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10) {
          this.id = e11, this.fromPhoneNumber = t10, this.toPhoneNumber = r10, this.message = s10, this.status = i10, this.phoneNumberId = n10, this.data = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.from_phone_number, t10.to_phone_number, t10.message, t10.status, t10.phone_number_id, t10.data);
        }
      }, av = class e10 {
        constructor(e11) {
          this.jwt = e11;
        }
        static fromJSON(t10) {
          return new e10(t10.jwt);
        }
      }, ax = class e10 {
        constructor(e11, t10, r10) {
          this.id = e11, this.web3Wallet = t10, this.verification = r10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.web3_wallet, t10.verification && nJ.fromJSON(t10.verification));
        }
      }, a_ = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10, o10, c10, l10, u10, h10, d10, p2, m2, f2, g2, y2, b2, w2 = {}, v2 = {}, x2 = {}, _2 = [], k2 = [], E2 = [], S2 = [], O2 = [], T2, C2, R2 = null, A2, P2, I2) {
          this.id = e11, this.passwordEnabled = t10, this.totpEnabled = r10, this.backupCodeEnabled = s10, this.twoFactorEnabled = i10, this.banned = n10, this.locked = a10, this.createdAt = o10, this.updatedAt = c10, this.imageUrl = l10, this.hasImage = u10, this.primaryEmailAddressId = h10, this.primaryPhoneNumberId = d10, this.primaryWeb3WalletId = p2, this.lastSignInAt = m2, this.externalId = f2, this.username = g2, this.firstName = y2, this.lastName = b2, this.publicMetadata = w2, this.privateMetadata = v2, this.unsafeMetadata = x2, this.emailAddresses = _2, this.phoneNumbers = k2, this.web3Wallets = E2, this.externalAccounts = S2, this.enterpriseAccounts = O2, this.lastActiveAt = T2, this.createOrganizationEnabled = C2, this.createOrganizationsLimit = R2, this.deleteSelfEnabled = A2, this.legalAcceptedAt = P2, this.locale = I2, this._raw = null;
        }
        get raw() {
          return this._raw;
        }
        static fromJSON(t10) {
          let r10 = new e10(t10.id, t10.password_enabled, t10.totp_enabled, t10.backup_code_enabled, t10.two_factor_enabled, t10.banned, t10.locked, t10.created_at, t10.updated_at, t10.image_url, t10.has_image, t10.primary_email_address_id, t10.primary_phone_number_id, t10.primary_web3_wallet_id, t10.last_sign_in_at, t10.external_id, t10.username, t10.first_name, t10.last_name, t10.public_metadata, t10.private_metadata, t10.unsafe_metadata, (t10.email_addresses || []).map((e11) => nG.fromJSON(e11)), (t10.phone_numbers || []).map((e11) => au.fromJSON(e11)), (t10.web3_wallets || []).map((e11) => ax.fromJSON(e11)), (t10.external_accounts || []).map((e11) => n4.fromJSON(e11)), (t10.enterprise_accounts || []).map((e11) => n0.fromJSON(e11)), t10.last_active_at, t10.create_organization_enabled, t10.create_organizations_limit, t10.delete_self_enabled, t10.legal_accepted_at, t10.locale);
          return r10._raw = t10, r10;
        }
        get primaryEmailAddress() {
          return this.emailAddresses.find(({ id: e11 }) => e11 === this.primaryEmailAddressId) ?? null;
        }
        get primaryPhoneNumber() {
          return this.phoneNumbers.find(({ id: e11 }) => e11 === this.primaryPhoneNumberId) ?? null;
        }
        get primaryWeb3Wallet() {
          return this.web3Wallets.find(({ id: e11 }) => e11 === this.primaryWeb3WalletId) ?? null;
        }
        get fullName() {
          return [this.firstName, this.lastName].join(" ").trim() || null;
        }
      }, ak = class e10 {
        constructor(e11, t10, r10, s10, i10, n10, a10) {
          this.id = e11, this.emailAddress = t10, this.status = r10, this.invitation = s10, this.createdAt = i10, this.updatedAt = n10, this.isLocked = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.email_address, t10.status, t10.invitation && n9.fromJSON(t10.invitation), t10.created_at, t10.updated_at, t10.is_locked);
        }
      };
      function aE(e10) {
        if ("string" != typeof e10 && "object" in e10 && "deleted" in e10) return nK.fromJSON(e10);
        switch (e10.object) {
          case "accountless_application":
            return nI.fromJSON(e10);
          case "actor_token":
            return nL.fromJSON(e10);
          case "allowlist_identifier":
            return nU.fromJSON(e10);
          case "api_key":
            return nM.fromJSON(e10);
          case "blocklist_identifier":
            return nD.fromJSON(e10);
          case "client":
            return nz.fromJSON(e10);
          case "cookies":
            return n$.fromJSON(e10);
          case "domain":
            return nH.fromJSON(e10);
          case "email_address":
            return nG.fromJSON(e10);
          case "enterprise_account":
            return n0.fromJSON(e10);
          case "email":
            return nF.fromJSON(e10);
          case "clerk_idp_oauth_access_token":
            return ik.fromJSON(e10);
          case "instance":
            return n5.fromJSON(e10);
          case "instance_restrictions":
            return n6.fromJSON(e10);
          case "instance_settings":
            return n7.fromJSON(e10);
          case "invitation":
            return n9.fromJSON(e10);
          case "jwt_template":
            return n8.fromJSON(e10);
          case "machine":
            return ae.fromJSON(e10);
          case "machine_scope":
            return at.fromJSON(e10);
          case "machine_secret_key":
            return ar.fromJSON(e10);
          case "machine_to_machine_token":
            return iE.fromJSON(e10);
          case "oauth_access_token":
            return as.fromJSON(e10);
          case "oauth_application":
            return ai.fromJSON(e10);
          case "organization":
            return an.fromJSON(e10);
          case "organization_invitation":
            return aa.fromJSON(e10);
          case "organization_membership":
            return ao.fromJSON(e10);
          case "organization_settings":
            return al.fromJSON(e10);
          case "phone_number":
            return au.fromJSON(e10);
          case "proxy_check":
            return ah.fromJSON(e10);
          case "redirect_url":
            return ad.fromJSON(e10);
          case "enterprise_connection":
            return n3.fromJSON(e10);
          case "saml_connection":
            return ap.fromJSON(e10);
          case "sign_in_token":
            return af.fromJSON(e10);
          case "agent_task":
            return nN.fromJSON(e10);
          case "sign_up_attempt":
            return ab.fromJSON(e10);
          case "session":
            return nq.fromJSON(e10);
          case "sms_message":
            return aw.fromJSON(e10);
          case "token":
            return av.fromJSON(e10);
          case "total_count":
            return e10.total_count;
          case "user":
            return a_.fromJSON(e10);
          case "waitlist_entry":
            return ak.fromJSON(e10);
          case "commerce_plan":
            return nX.fromJSON(e10);
          case "commerce_subscription":
            return nQ.fromJSON(e10);
          case "commerce_subscription_item":
            return nY.fromJSON(e10);
          case "feature":
            return nV.fromJSON(e10);
          default:
            return e10;
        }
      }
      function aS(e10) {
        var t10;
        return t10 = async (t11) => {
          let r10, { secretKey: s10, machineSecretKey: i10, useMachineSecretKey: n10 = false, requireSecretKey: a10 = true, apiUrl: o10 = sh, apiVersion: c10 = "v1", userAgent: l10 = sd, skipApiVersionInUrl: u10 = false } = e10, { path: h10, method: d10, queryParams: p2, headerParams: m2, bodyParams: f2, formData: g2, options: y2 } = t11, { deepSnakecaseBodyParamKeys: b2 = false } = y2 || {};
          a10 && sJ(s10);
          let w2 = new URL(u10 ? s1(o10, h10) : s1(o10, c10, h10));
          if (p2) for (let [e11, t12] of Object.entries(nP({ ...p2 }))) t12 && [t12].flat().forEach((t13) => w2.searchParams.append(e11, t13));
          let v2 = new Headers({ "Clerk-API-Version": sp, [sB]: l10, ...m2 }), x2 = sw;
          !v2.has(x2) && (n10 && i10 ? v2.set(x2, `Bearer ${i10}`) : s10 && v2.set(x2, `Bearer ${s10}`));
          try {
            g2 ? r10 = await rD.fetch(w2.href, { method: d10, headers: v2, body: g2 }) : (v2.set("Content-Type", "application/json"), r10 = await rD.fetch(w2.href, { method: d10, headers: v2, ...(() => {
              if (!("GET" !== d10 && f2 && Object.keys(f2).length > 0)) return null;
              let e12 = (e13) => nP(e13, { deep: b2 });
              return { body: JSON.stringify(Array.isArray(f2) ? f2.map(e12) : e12(f2)) };
            })() }));
            let e11 = r10?.headers && r10.headers?.get(sR) === sK, t12 = await (e11 ? r10.json() : r10.text());
            if (!r10.ok) return { data: null, errors: aC(t12), status: r10?.status, statusText: r10?.statusText, clerkTraceId: aO(t12, r10?.headers), retryAfter: aT(r10?.headers) };
            return { ...function(e12) {
              var t13, r11;
              let s11;
              if (Array.isArray(e12)) return { data: e12.map((e13) => aE(e13)) };
              if ((t13 = e12) && "object" == typeof t13 && "m2m_tokens" in t13 && Array.isArray(t13.m2m_tokens)) return { data: s11 = e12.m2m_tokens.map((e13) => aE(e13)), totalCount: e12.total_count };
              return (r11 = e12) && "object" == typeof r11 && "data" in r11 && Array.isArray(r11.data) && void 0 !== r11.data ? { data: s11 = e12.data.map((e13) => aE(e13)), totalCount: e12.total_count } : { data: aE(e12) };
            }(t12), errors: null };
          } catch (e11) {
            if (e11 instanceof Error) return { data: null, errors: [{ code: "unexpected_error", message: e11.message || "Unexpected error" }], clerkTraceId: aO(e11, r10?.headers) };
            return { data: null, errors: aC(e11), status: r10?.status, statusText: r10?.statusText, clerkTraceId: aO(e11, r10?.headers), retryAfter: aT(r10?.headers) };
          }
        }, async (...e11) => {
          let { data: r10, errors: s10, totalCount: i10, status: n10, statusText: a10, clerkTraceId: o10, retryAfter: c10 } = await t10(...e11);
          if (s10) {
            let e12 = new rp(a10 || "", { data: [], status: n10, clerkTraceId: o10, retryAfter: c10 });
            throw e12.errors = s10, e12;
          }
          return void 0 !== i10 ? { data: r10, totalCount: i10 } : r10;
        };
      }
      function aO(e10, t10) {
        return e10 && "object" == typeof e10 && "clerk_trace_id" in e10 && "string" == typeof e10.clerk_trace_id ? e10.clerk_trace_id : t10?.get("cf-ray") || "";
      }
      function aT(e10) {
        let t10 = e10?.get("Retry-After");
        if (!t10) return;
        let r10 = parseInt(t10, 10);
        if (!isNaN(r10)) return r10;
      }
      function aC(e10) {
        if (e10 && "object" == typeof e10 && "errors" in e10) {
          let t10 = e10.errors;
          return t10.length > 0 ? t10.map(rd) : [];
        }
        return [];
      }
      function aR(e10) {
        let t10 = aS(e10);
        return { __experimental_accountlessApplications: new s9(aS({ ...e10, requireSecretKey: false })), actorTokens: new s4(t10), agentTasks: new s6(t10), allowlistIdentifiers: new ie(t10), apiKeys: new ir(aS({ ...e10, skipApiVersionInUrl: true })), betaFeatures: new is(t10), blocklistIdentifiers: new ia(t10), billing: new nm(t10), clients: new ic(t10), domains: new iu(t10), emailAddresses: new id(t10), enterpriseConnections: new im(t10), idPOAuthAccessToken: new ig(aS({ ...e10, skipApiVersionInUrl: true })), instance: new ib(t10), invitations: new iv(t10), jwks: new iX(t10), jwtTemplates: new iQ(t10), machines: new i_(t10), m2m: new iV(aS({ ...e10, skipApiVersionInUrl: true, requireSecretKey: false, useMachineSecretKey: true }), { secretKey: e10.secretKey, apiUrl: e10.apiUrl, jwtKey: e10.jwtKey }), oauthApplications: new i2(t10), organizations: new i0(t10), phoneNumbers: new i4(t10), proxyChecks: new i5(t10), redirectUrls: new i7(t10), sessions: new nt(t10), signInTokens: new ns(t10), signUps: new nn(t10), testingTokens: new na(t10), users: new nc(t10), waitlistEntries: new nu(t10), webhooks: new nd(t10), samlConnections: new i8(t10) };
      }
      var aA = (e10) => () => {
        let t10 = { ...e10 };
        return t10.secretKey = (t10.secretKey || "").substring(0, 7), t10.jwtKey = (t10.jwtKey || "").substring(0, 7), { ...t10 };
      };
      function aP(e10, t10) {
        return { tokenType: sG, sessionClaims: null, sessionId: null, sessionStatus: t10 ?? null, userId: null, actor: null, orgId: null, orgRole: null, orgSlug: null, orgPermissions: null, factorVerificationAge: null, getToken: () => Promise.resolve(null), has: () => false, debug: aA(e10), isAuthenticated: false };
      }
      function aI(e10, t10) {
        let r10 = { id: null, subject: null, scopes: null, has: () => false, getToken: () => Promise.resolve(null), debug: aA(t10), isAuthenticated: false };
        switch (e10) {
          case sV:
            return { ...r10, tokenType: e10, name: null, claims: null, scopes: null, userId: null, orgId: null };
          case sX:
            return { ...r10, tokenType: e10, claims: null, scopes: null, machineId: null };
          case sY:
            return { ...r10, tokenType: e10, scopes: null, userId: null, clientId: null };
          default:
            throw Error(`Invalid token type: ${e10}`);
        }
      }
      function aN() {
        return { isAuthenticated: false, tokenType: null, getToken: () => Promise.resolve(null), has: () => false, debug: () => ({}) };
      }
      var aL = ({ authObject: e10, acceptsToken: t10 = sG }) => {
        if ("any" === t10) return e10;
        if (Array.isArray(t10)) return iK(e10.tokenType, t10) ? e10 : aN();
        if (!iK(e10.tokenType, t10)) return iH.has(t10) ? aI(t10, e10.debug) : aP(e10.debug);
        return e10;
      }, aU = "signed-out", aM = "handshake", aD = "satellite-needs-syncing", aj = "session-token-and-uat-missing", aq = "token-type-mismatch", az = "unexpected-error";
      function aB(e10) {
        let { authenticateContext: t10, headers: r10 = new Headers(), token: s10 } = e10;
        return { status: "signed-in", reason: null, message: null, proxyUrl: t10.proxyUrl || "", publishableKey: t10.publishableKey || "", isSatellite: t10.isSatellite || false, domain: t10.domain || "", signInUrl: t10.signInUrl || "", signUpUrl: t10.signUpUrl || "", afterSignInUrl: t10.afterSignInUrl || "", afterSignUpUrl: t10.afterSignUpUrl || "", isSignedIn: true, isAuthenticated: true, tokenType: e10.tokenType, toAuth: ({ treatPendingAsSignedOut: r11 = true } = {}) => {
          if (e10.tokenType === sG) {
            let { sessionClaims: i11 } = e10, n11 = function(e11, t11, r12) {
              let s11, { actor: i12, sessionId: n12, sessionStatus: a11, userId: o10, orgId: c10, orgRole: l10, orgSlug: u10, orgPermissions: h10, factorVerificationAge: d10 } = ((e12) => {
                let t12, r13, s12, i13, n13 = e12.fva ?? null, a12 = e12.sts ?? null;
                if (2 === e12.v) {
                  if (e12.o) {
                    t12 = e12.o?.id, s12 = e12.o?.slg, e12.o?.rol && (r13 = `org:${e12.o?.rol}`);
                    let { org: n14 } = sa(e12.fea), { permissions: a13, featurePermissionMap: o11 } = (({ per: e13, fpm: t13 }) => {
                      if (!e13 || !t13) return { permissions: [], featurePermissionMap: [] };
                      let r14 = e13.split(",").map((e14) => e14.trim());
                      return { permissions: r14, featurePermissionMap: t13.split(",").map((e14) => Number.parseInt(e14.trim(), 10)).map((e14) => e14.toString(2).padStart(r14.length, "0").split("").map((e15) => Number.parseInt(e15, 10)).reverse()).filter(Boolean) };
                    })({ per: e12.o?.per, fpm: e12.o?.fpm });
                    i13 = function({ features: e13, permissions: t13, featurePermissionMap: r14 }) {
                      if (!e13 || !t13 || !r14) return [];
                      let s13 = [];
                      for (let i14 = 0; i14 < e13.length; i14++) {
                        let n15 = e13[i14];
                        if (i14 >= r14.length) continue;
                        let a14 = r14[i14];
                        if (a14) for (let e14 = 0; e14 < a14.length; e14++) 1 === a14[e14] && s13.push(`org:${n15}:${t13[e14]}`);
                      }
                      return s13;
                    }({ features: n14, featurePermissionMap: o11, permissions: a13 });
                  }
                } else t12 = e12.org_id, r13 = e12.org_role, s12 = e12.org_slug, i13 = e12.org_permissions;
                return { sessionClaims: e12, sessionId: e12.sid, sessionStatus: a12, actor: e12.act, userId: e12.sub, orgId: t12, orgRole: r13, orgSlug: s12, orgPermissions: i13, factorVerificationAge: n13 };
              })(r12), p2 = aR(e11), m2 = ((e12) => {
                let { fetcher: t12, sessionToken: r13, sessionId: s12 } = e12 || {};
                return async (e13 = {}) => s12 ? e13.template || void 0 !== e13.expiresInSeconds ? t12(s12, e13.template, e13.expiresInSeconds) : r13 : null;
              })({ sessionId: n12, sessionToken: t11, fetcher: async (e12, t12, r13) => (await p2.sessions.getToken(e12, t12 || "", r13)).jwt });
              return { tokenType: sG, actor: i12, sessionClaims: r12, sessionId: n12, sessionStatus: a11, userId: o10, orgId: c10, orgRole: l10, orgSlug: u10, orgPermissions: h10, factorVerificationAge: d10, getToken: m2, has: (s11 = { orgId: c10, orgRole: l10, orgPermissions: h10, userId: o10, factorVerificationAge: d10, features: r12.fea || "", plans: r12.pla || "" }, (e12) => {
                let t12;
                return !!s11.userId && (t12 = [((e13, t13) => {
                  let { orgId: r13, orgRole: s12, orgPermissions: i13 } = t13, n13 = void 0 !== e13.role, a12 = void 0 !== e13.permission;
                  return n13 || a12 ? n13 && "string" != typeof e13.role || a12 && "string" != typeof e13.permission || !r13 || n13 && ("string" != typeof s12 || !s12 || s12.replace(/^(org:)*/, "org:") !== e13.role.replace(/^(org:)*/, "org:")) || a12 && (!Array.isArray(i13) || !i13.includes(e13.permission.replace(/^(org:)*/, "org:"))) ? "fail" : "pass" : "skip";
                })(e12, s11), ((e13, t13) => {
                  let { features: r13, plans: s12 } = t13, i13 = void 0 !== e13.feature, n13 = void 0 !== e13.plan;
                  if (!i13 && !n13) return "skip";
                  if (i13 && "string" != typeof e13.feature || n13 && "string" != typeof e13.plan) return "fail";
                  if (i13) {
                    if ("string" != typeof r13 || !r13) return "fail";
                    try {
                      if (!sn(r13, e13.feature)) return "fail";
                    } catch {
                      return "fail";
                    }
                  }
                  if (n13) {
                    if ("string" != typeof s12 || !s12) return "fail";
                    try {
                      if (!sn(s12, e13.plan)) return "fail";
                    } catch {
                      return "fail";
                    }
                  }
                  return "pass";
                })(e12, s11), ((e13, { factorVerificationAge: t13 }) => {
                  if (void 0 === e13.reverification) return "skip";
                  if (!t13 || !Array.isArray(t13) || 2 !== t13.length || !si(t13[0]) || !si(t13[1])) return "fail";
                  let r13 = ((e14) => {
                    let t14, r14;
                    if (!e14) return false;
                    let s13 = "string" == typeof e14 && st.has(e14), i14 = "object" == typeof e14 && (t14 = e14.level, se.has(t14)) && "number" == typeof (r14 = e14.afterMinutes) && r14 > 0;
                    return (!!s13 || !!i14) && ((e15) => "string" == typeof e15 ? r8[e15] : e15).bind(null, e14);
                  })(e13.reverification);
                  if (!r13) return "fail";
                  let { level: s12, afterMinutes: i13 } = r13(), [n13, a12] = t13;
                  if (-1 === n13 && -1 === a12) return "fail";
                  let o11 = -1 !== n13 && i13 > n13, c11 = -1 !== a12 && i13 > a12;
                  switch (s12) {
                    case "first_factor":
                      return o11 ? "pass" : "fail";
                    case "second_factor":
                      if (-1 === a12) return o11 ? "pass" : "fail";
                      return c11 ? "pass" : "fail";
                    case "multi_factor":
                      if (-1 === a12) return o11 ? "pass" : "fail";
                      if (-1 === n13) return "fail";
                      return o11 && c11 ? "pass" : "fail";
                  }
                })(e12, s11)]).some((e13) => "pass" === e13) && t12.every((e13) => "pass" === e13 || "skip" === e13);
              }), debug: aA({ ...e11, sessionToken: t11 }), isAuthenticated: true };
            }(t10, s10, i11);
            return r11 && "pending" === n11.sessionStatus ? aP(void 0, n11.sessionStatus) : n11;
          }
          let { machineData: i10 } = e10;
          var n10 = e10.tokenType;
          let a10 = { id: i10.id, subject: i10.subject, getToken: () => Promise.resolve(s10), has: () => false, debug: aA(t10), isAuthenticated: true };
          switch (n10) {
            case sV:
              return { ...a10, tokenType: n10, name: i10.name, claims: i10.claims, scopes: i10.scopes, userId: i10.subject.startsWith("user_") ? i10.subject : null, orgId: i10.subject.startsWith("org_") ? i10.subject : null };
            case sX:
              return { ...a10, tokenType: n10, claims: i10.claims, scopes: i10.scopes, machineId: i10.subject };
            case sY:
              return { ...a10, tokenType: n10, scopes: i10.scopes, userId: i10.subject, clientId: i10.clientId };
            default:
              throw Error(`Invalid token type: ${n10}`);
          }
        }, headers: r10, token: s10 };
      }
      function a$(e10) {
        let { authenticateContext: t10, headers: r10 = new Headers(), reason: s10, message: i10 = "", tokenType: n10 } = e10;
        return aK({ status: aU, reason: s10, message: i10, proxyUrl: t10.proxyUrl || "", publishableKey: t10.publishableKey || "", isSatellite: t10.isSatellite || false, domain: t10.domain || "", signInUrl: t10.signInUrl || "", signUpUrl: t10.signUpUrl || "", afterSignInUrl: t10.afterSignInUrl || "", afterSignUpUrl: t10.afterSignUpUrl || "", isSignedIn: false, isAuthenticated: false, tokenType: n10, toAuth: () => n10 === sG ? aP({ ...t10, status: aU, reason: s10, message: i10 }) : aI(n10, { reason: s10, message: i10, headers: r10 }), headers: r10, token: null });
      }
      var aK = (e10) => {
        let t10 = new Headers(e10.headers || {});
        if (e10.message) try {
          t10.set(sb, e10.message);
        } catch {
        }
        if (e10.reason) try {
          t10.set(sv, e10.reason);
        } catch {
        }
        if (e10.status) try {
          t10.set(s_, e10.status);
        } catch {
        }
        return e10.headers = t10, e10;
      }, aH = (l = null != (o = su()) ? rV(rZ(o)) : {}, ((e10, t10, r10, s10) => {
        if (t10 && "object" == typeof t10 || "function" == typeof t10) for (let i10 of rQ(t10)) r0.call(e10, i10) || i10 === r10 || rX(e10, i10, { get: () => t10[i10], enumerable: !(s10 = rY(t10, i10)) || s10.enumerable });
        return e10;
      })(!c && o && o.__esModule ? l : rX(l, "default", { value: o, enumerable: true }), o)), aF = class extends URL {
        isCrossOrigin(e10) {
          return this.origin !== new URL(e10.toString()).origin;
        }
      }, aW = (...e10) => new aF(...e10), aJ = class extends Request {
        constructor(e10, t10) {
          let r10;
          const s10 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          t10 ? r10 = t10 : "string" != typeof e10 && (r10 = new Proxy(e10, { get(e11, t11) {
            if ("signal" !== t11) return Reflect.get(e11, t11, e11);
          } })), super(s10, r10), this.clerkUrl = this.deriveUrlFromHeaders(this), this.cookies = this.parseCookies(this);
        }
        toJSON() {
          return { url: this.clerkUrl.href, method: this.method, headers: JSON.stringify(Object.fromEntries(this.headers)), clerkUrl: this.clerkUrl.toString(), cookies: JSON.stringify(Object.fromEntries(this.cookies)) };
        }
        deriveUrlFromHeaders(e10) {
          let t10 = new URL(e10.url), r10 = e10.headers.get(sL), s10 = e10.headers.get(sN), i10 = e10.headers.get(sU), n10 = t10.protocol, a10 = this.getFirstValueFromHeader(s10) ?? i10, o10 = this.getFirstValueFromHeader(r10) ?? n10?.replace(/[:/]/, ""), c10 = a10 && o10 ? `${o10}://${a10}` : t10.origin;
          if (c10 === t10.origin) return aW(t10);
          try {
            return aW(t10.pathname + t10.search, c10);
          } catch {
            return aW(t10);
          }
        }
        getFirstValueFromHeader(e10) {
          return e10?.split(",")[0];
        }
        parseCookies(e10) {
          return new Map(Object.entries((0, aH.parse)(this.decodeCookieValue(e10.headers.get("cookie") || ""))));
        }
        decodeCookieValue(e10) {
          return e10 ? e10.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent) : e10;
        }
      }, aG = (...e10) => e10[0] && "object" == typeof e10[0] && "clerkUrl" in e10[0] && "cookies" in e10[0] ? e10[0] : new aJ(...e10), aV = (e10) => e10.split(";")[0]?.split("=")[0], aX = (e10) => e10.split(";")[0]?.split("=")[1];
      async function aY(e10, t10) {
        let { data: r10, errors: s10 } = rJ(e10);
        if (s10) return { errors: s10 };
        let { header: i10 } = r10, { kid: n10 } = i10;
        try {
          let r11;
          if (t10.jwtKey) r11 = iC({ kid: n10, pem: t10.jwtKey });
          else {
            if (!t10.secretKey) return { errors: [new rA({ action: rR, message: "Failed to resolve JWK during verification.", reason: rO })] };
            r11 = await iR({ ...t10, kid: n10 });
          }
          return await rG(e10, { ...t10, key: r11 });
        } catch (e11) {
          return { errors: [e11] };
        }
      }
      function aQ(e10, t10, r10) {
        if (rm(t10)) {
          let s10, i10;
          switch (t10.status) {
            case 401:
              s10 = "secret-key-invalid", i10 = t10.errors[0]?.message || "Invalid secret key";
              break;
            case 404:
              s10 = rP, i10 = r10;
              break;
            default:
              s10 = rI, i10 = "Unexpected error";
          }
          return { data: void 0, tokenType: e10, errors: [new rL({ message: i10, code: s10, status: t10.status })] };
        }
        return { data: void 0, tokenType: e10, errors: [new rL({ message: "Unexpected error", code: rI, status: t10.status })] };
      }
      async function aZ(e10, t10) {
        try {
          let r10 = aR(t10);
          return { data: await r10.m2m.verify({ token: e10 }), tokenType: sX, errors: void 0 };
        } catch (e11) {
          return aQ(sX, e11, "Machine token not found");
        }
      }
      async function a0(e10, t10) {
        try {
          let r10 = aR(t10);
          return { data: await r10.idPOAuthAccessToken.verify(e10), tokenType: sY, errors: void 0 };
        } catch (e11) {
          return aQ(sY, e11, "OAuth token not found");
        }
      }
      async function a1(e10, t10) {
        try {
          let r10 = aR(t10);
          return { data: await r10.apiKeys.verify(e10), tokenType: sV, errors: void 0 };
        } catch (e11) {
          return aQ(sV, e11, "API key not found");
        }
      }
      async function a2(e10, t10) {
        if (iM(e10)) {
          let r10;
          try {
            let { data: t11, errors: s10 } = rJ(e10);
            if (s10) throw s10[0];
            r10 = t11;
          } catch (e11) {
            return { data: void 0, tokenType: sX, errors: [new rL({ code: rP, message: e11.message })] };
          }
          return r10.payload.sub.startsWith(iI) ? iW(e10, r10, t10) : iD.includes(r10.header.typ) ? iJ(e10, r10, t10) : { data: void 0, tokenType: sY, errors: [new rL({ code: rN, message: `Invalid JWT type: ${r10.header.typ ?? "missing"}. Expected one of: ${iD.join(", ")} for OAuth, or sub starting with 'mch_' for M2M` })] };
        }
        if (e10.startsWith("mt_")) return aZ(e10, t10);
        if (e10.startsWith(iN)) return a0(e10, t10);
        if (e10.startsWith("ak_")) return a1(e10, t10);
        throw Error("Unknown machine token type");
      }
      async function a3(e10, { key: t10 }) {
        let { data: r10, errors: s10 } = rJ(e10);
        if (s10) throw s10[0];
        let { header: i10, payload: n10 } = r10, { typ: a10, alg: o10 } = i10;
        rH(a10), rF(o10);
        let { data: c10, errors: l10 } = await rW(r10, t10);
        if (l10) throw new rA({ reason: rE, message: `Error verifying handshake token. ${l10[0]}` });
        if (!c10) throw new rA({ reason: rx, message: "Handshake signature is invalid." });
        return n10;
      }
      async function a4(e10, t10) {
        let r10, { secretKey: s10, apiUrl: i10, apiVersion: n10, jwksCacheTtlInMs: a10, jwtKey: o10, skipJwksCache: c10 } = t10, { data: l10, errors: u10 } = rJ(e10);
        if (u10) throw u10[0];
        let { kid: h10 } = l10.header;
        if (o10) r10 = iC({ kid: h10, pem: o10 });
        else if (s10) r10 = await iR({ secretKey: s10, apiUrl: i10, apiVersion: n10, kid: h10, jwksCacheTtlInMs: a10, skipJwksCache: c10 });
        else throw new rA({ action: rR, message: "Failed to resolve JWK during handshake verification.", reason: rO });
        return a3(e10, { key: r10 });
      }
      var a5 = class {
        constructor(e10, t10, r10) {
          this.authenticateContext = e10, this.options = t10, this.organizationMatcher = r10;
        }
        isRequestEligibleForHandshake() {
          let { accept: e10, method: t10, secFetchDest: r10 } = this.authenticateContext;
          return "GET" === t10 && !!("document" === r10 || "iframe" === r10 || !r10 && e10?.startsWith("text/html"));
        }
        buildRedirectToHandshake(e10) {
          if (!this.authenticateContext?.clerkUrl) throw Error("Missing clerkUrl in authenticateContext");
          let t10 = this.removeDevBrowserFromURL(this.authenticateContext.clerkUrl), r10 = this.authenticateContext.frontendApi.startsWith("http") ? this.authenticateContext.frontendApi : `https://${this.authenticateContext.frontendApi}`, s10 = new URL("v1/client/handshake", r10 = r10.replace(/\/+$/, "") + "/");
          s10.searchParams.append("redirect_url", t10?.href || ""), s10.searchParams.append("__clerk_api_version", sp), s10.searchParams.append(sf.SuffixedCookies, this.authenticateContext.usesSuffixedCookies().toString()), s10.searchParams.append(sf.HandshakeReason, e10), s10.searchParams.append(sf.HandshakeFormat, "nonce"), this.authenticateContext.sessionToken && s10.searchParams.append(sf.Session, this.authenticateContext.sessionToken), "development" === this.authenticateContext.instanceType && this.authenticateContext.devBrowserToken && s10.searchParams.append(sf.DevBrowser, this.authenticateContext.devBrowserToken);
          let i10 = this.getOrganizationSyncTarget(this.authenticateContext.clerkUrl, this.organizationMatcher);
          return i10 && this.getOrganizationSyncQueryParams(i10).forEach((e11, t11) => {
            s10.searchParams.append(t11, e11);
          }), new Headers({ [sM]: s10.href });
        }
        async getCookiesFromHandshake() {
          let e10 = [];
          if (this.authenticateContext.handshakeNonce) try {
            let t10 = await this.authenticateContext.apiClient?.clients.getHandshakePayload({ nonce: this.authenticateContext.handshakeNonce });
            t10 && e10.push(...t10.directives);
          } catch (e11) {
            console.error("Clerk: HandshakeService: error getting handshake payload:", e11);
          }
          else if (this.authenticateContext.handshakeToken) {
            let t10 = await a4(this.authenticateContext.handshakeToken, this.authenticateContext);
            t10 && Array.isArray(t10.handshake) && e10.push(...t10.handshake);
          }
          return e10;
        }
        async resolveHandshake() {
          let e10 = new Headers({ "Access-Control-Allow-Origin": "null", "Access-Control-Allow-Credentials": "true" }), t10 = await this.getCookiesFromHandshake(), r10 = "";
          if (t10.forEach((t11) => {
            e10.append("Set-Cookie", t11), aV(t11).startsWith(sm.Session) && (r10 = aX(t11));
          }), "development" === this.authenticateContext.instanceType) {
            let t11 = new URL(this.authenticateContext.clerkUrl);
            t11.searchParams.delete(sf.Handshake), t11.searchParams.delete(sf.HandshakeHelp), t11.searchParams.delete(sf.DevBrowser), t11.searchParams.delete(sf.HandshakeNonce), e10.append(sM, t11.toString()), e10.set(sE, "no-store");
          }
          if ("" === r10) return a$({ tokenType: sG, authenticateContext: this.authenticateContext, reason: "session-token-missing", message: "", headers: e10 });
          let { data: s10, errors: [i10] = [] } = await aY(r10, this.authenticateContext);
          if (s10) return aB({ tokenType: sG, authenticateContext: this.authenticateContext, sessionClaims: s10, headers: e10, token: r10 });
          if ("development" === this.authenticateContext.instanceType && (i10?.reason === rw || i10?.reason === r_ || i10?.reason === rk)) {
            let t11 = new rA({ action: i10.action, message: i10.message, reason: i10.reason });
            t11.tokenCarrier = "cookie", console.error(`Clerk: Clock skew detected. This usually means that your system clock is inaccurate. Clerk will attempt to account for the clock skew in development.

To resolve this issue, make sure your system's clock is set to the correct time (e.g. turn off and on automatic time synchronization).

---

${t11.getFullMessage()}`);
            let { data: s11, errors: [n10] = [] } = await aY(r10, { ...this.authenticateContext, clockSkewInMs: 864e5 });
            if (s11) return aB({ tokenType: sG, authenticateContext: this.authenticateContext, sessionClaims: s11, headers: e10, token: r10 });
            throw Error(n10?.message || "Clerk: Handshake retry failed.");
          }
          throw Error(i10?.message || "Clerk: Handshake failed.");
        }
        handleTokenVerificationErrorInDevelopment(e10) {
          if (e10.reason === rx) throw Error("Clerk: Handshake token verification failed due to an invalid signature. If you have switched Clerk keys locally, clear your cookies and try again.");
          throw Error(`Clerk: Handshake token verification failed: ${e10.getFullMessage()}.`);
        }
        checkAndTrackRedirectLoop(e10) {
          if (3 === this.authenticateContext.handshakeRedirectLoopCounter) return true;
          let t10 = this.authenticateContext.handshakeRedirectLoopCounter + 1, r10 = sm.RedirectCount;
          return e10.append("Set-Cookie", `${r10}=${t10}; SameSite=Lax; HttpOnly; Max-Age=2`), false;
        }
        removeDevBrowserFromURL(e10) {
          let t10 = new URL(e10);
          return t10.searchParams.delete(sf.DevBrowser), t10.searchParams.delete(sf.LegacyDevBrowser), t10;
        }
        getOrganizationSyncTarget(e10, t10) {
          return t10.findTarget(e10);
        }
        getOrganizationSyncQueryParams(e10) {
          let t10 = /* @__PURE__ */ new Map();
          return "personalAccount" === e10.type && t10.set("organization_id", ""), "organization" === e10.type && (e10.organizationId && t10.set("organization_id", e10.organizationId), e10.organizationSlug && t10.set("organization_id", e10.organizationSlug)), t10;
        }
      }, a6 = class {
        constructor(e10) {
          this.organizationPattern = this.createMatcher(e10?.organizationPatterns), this.personalAccountPattern = this.createMatcher(e10?.personalAccountPatterns);
        }
        createMatcher(e10) {
          if (!e10) return null;
          try {
            var t10, r10, s10, i10, n10, a10, o10;
            try {
              return t10 = void 0, r10 = [], s10 = sl(e10, r10, t10), i10 = r10, n10 = t10, void 0 === n10 && (n10 = {}), a10 = n10.decode, o10 = void 0 === a10 ? function(e11) {
                return e11;
              } : a10, function(e11) {
                var t11 = s10.exec(e11);
                if (!t11) return false;
                for (var r11 = t11[0], n11 = t11.index, a11 = /* @__PURE__ */ Object.create(null), c10 = 1; c10 < t11.length; c10++) !function(e12) {
                  if (void 0 !== t11[e12]) {
                    var r12 = i10[e12 - 1];
                    "*" === r12.modifier || "+" === r12.modifier ? a11[r12.name] = t11[e12].split(r12.prefix + r12.suffix).map(function(e13) {
                      return o10(e13, r12);
                    }) : a11[r12.name] = o10(t11[e12], r12);
                  }
                }(c10);
                return { path: r11, index: n11, params: a11 };
              };
            } catch (e11) {
              throw Error(`Invalid path and options: Consult the documentation of path-to-regexp here: https://github.com/pillarjs/path-to-regexp/tree/6.x
${e11.message}`);
            }
          } catch (t11) {
            throw Error(`Invalid pattern "${e10}": ${t11}`);
          }
        }
        findTarget(e10) {
          let t10 = this.findOrganizationTarget(e10);
          return t10 || this.findPersonalAccountTarget(e10);
        }
        findOrganizationTarget(e10) {
          if (!this.organizationPattern) return null;
          try {
            let t10 = this.organizationPattern(e10.pathname);
            if (!t10 || !("params" in t10)) return null;
            let r10 = t10.params;
            if (r10.id) return { type: "organization", organizationId: r10.id };
            if (r10.slug) return { type: "organization", organizationSlug: r10.slug };
            return null;
          } catch (e11) {
            return console.error("Failed to match organization pattern:", e11), null;
          }
        }
        findPersonalAccountTarget(e10) {
          if (!this.personalAccountPattern) return null;
          try {
            return this.personalAccountPattern(e10.pathname) ? { type: "personalAccount" } : null;
          } catch (e11) {
            return console.error("Failed to match personal account pattern:", e11), null;
          }
        }
      };
      function a7(e10, t10, r10) {
        return iK(e10, t10) ? null : a$({ tokenType: "string" == typeof t10 ? t10 : e10, authenticateContext: r10, reason: aq });
      }
      var a9 = async (e10, t10) => {
        let r10 = await sZ(aG(e10), t10), s10 = t10.acceptsToken ?? sG;
        if (s10 !== sX && (sJ(r10.secretKey), r10.isSatellite)) {
          var i10 = r10.signInUrl, n10 = r10.secretKey;
          if (!i10 && rs(n10)) throw Error("Missing signInUrl. Pass a signInUrl for dev instances if an app is satellite");
          if (r10.signInUrl && r10.origin && function(e11, t11) {
            let r11;
            try {
              r11 = new URL(e11);
            } catch {
              throw Error("The signInUrl needs to have a absolute url format.");
            }
            if (r11.origin === t11) throw Error("The signInUrl needs to be on a different origin than your satellite application.");
          }(r10.signInUrl, r10.origin), !(r10.proxyUrl || r10.domain)) throw Error("Missing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl");
        }
        s10 === sX && function(e11) {
          if (!e11.machineSecretKey && !e11.secretKey) throw Error("Machine token authentication requires either a Machine secret key or a Clerk secret key. Ensure a Clerk secret key or Machine secret key is set.");
        }(r10);
        let a10 = new a6(t10.organizationSyncOptions), o10 = new a5(r10, { organizationSyncOptions: t10.organizationSyncOptions }, a10);
        async function c10(r11) {
          if (!t10.apiClient) return { data: null, error: { message: "An apiClient is needed to perform token refresh.", cause: { reason: "missing-api-client" } } };
          let { sessionToken: s11, refreshTokenInCookie: i11 } = r11;
          if (!s11) return { data: null, error: { message: "Session token must be provided.", cause: { reason: "missing-session-token" } } };
          if (!i11) return { data: null, error: { message: "Refresh token must be provided.", cause: { reason: "missing-refresh-token" } } };
          let { data: n11, errors: a11 } = rJ(s11);
          if (!n11 || a11) return { data: null, error: { message: "Unable to decode the expired session token.", cause: { reason: "expired-session-token-decode-failed", errors: a11 } } };
          if (!n11?.payload?.sid) return { data: null, error: { message: "Expired session token is missing the `sid` claim.", cause: { reason: "expired-session-token-missing-sid-claim" } } };
          try {
            return { data: (await t10.apiClient.sessions.refreshSession(n11.payload.sid, { format: "cookie", suffixed_cookies: r11.usesSuffixedCookies(), expired_token: s11 || "", refresh_token: i11 || "", request_origin: r11.clerkUrl.origin, request_headers: Object.fromEntries(Array.from(e10.headers.entries()).map(([e11, t11]) => [e11, [t11]])) })).cookies, error: null };
          } catch (e11) {
            if (!e11?.errors?.length) return { data: null, error: { message: "Unexpected Server/BAPI error", cause: { reason: "unexpected-bapi-error", errors: [e11] } } };
            if ("unexpected_error" === e11.errors[0].code) return { data: null, error: { message: "Fetch unexpected error", cause: { reason: "fetch-error", errors: e11.errors } } };
            return { data: null, error: { message: e11.errors[0].code, cause: { reason: e11.errors[0].code, errors: e11.errors } } };
          }
        }
        async function l10(e11) {
          let { data: t11, error: r11 } = await c10(e11);
          if (!t11 || 0 === t11.length) return { data: null, error: r11 };
          let s11 = new Headers(), i11 = "";
          t11.forEach((e12) => {
            s11.append("Set-Cookie", e12), aV(e12).startsWith(sm.Session) && (i11 = aX(e12));
          });
          let { data: n11, errors: a11 } = await aY(i11, e11);
          return a11 ? { data: null, error: { message: "Clerk: unable to verify refreshed session token.", cause: { reason: "invalid-session-token", errors: a11 } } } : { data: { jwtPayload: n11, sessionToken: i11, headers: s11 }, error: null };
        }
        function u10(e11, t11, r11, s11) {
          if (!o10.isRequestEligibleForHandshake()) return a$({ tokenType: sG, authenticateContext: e11, reason: t11, message: r11 });
          let i11 = s11 ?? o10.buildRedirectToHandshake(t11);
          return (i11.get(sM) && i11.set(sE, "no-store"), o10.checkAndTrackRedirectLoop(i11)) ? (console.log("Clerk: Refreshing the session token resulted in an infinite redirect loop. This usually means that your Clerk instance keys do not match - make sure to copy the correct publishable and secret keys from the Clerk dashboard."), a$({ tokenType: sG, authenticateContext: e11, reason: t11, message: r11 })) : function(e12, t12, r12 = "", s12) {
            return aK({ status: aM, reason: t12, message: r12, publishableKey: e12.publishableKey || "", isSatellite: e12.isSatellite || false, domain: e12.domain || "", proxyUrl: e12.proxyUrl || "", signInUrl: e12.signInUrl || "", signUpUrl: e12.signUpUrl || "", afterSignInUrl: e12.afterSignInUrl || "", afterSignUpUrl: e12.afterSignUpUrl || "", isSignedIn: false, isAuthenticated: false, tokenType: sG, toAuth: () => null, headers: s12, token: null });
          }(e11, t11, r11, i11);
        }
        async function h10() {
          let { tokenInHeader: e11 } = r10;
          if (ij(e11) || iq(e11)) return a$({ tokenType: sG, authenticateContext: r10, reason: aq, message: "" });
          try {
            let { data: t11, errors: s11 } = await aY(e11, r10);
            if (s11) throw s11[0];
            return aB({ tokenType: sG, authenticateContext: r10, sessionClaims: t11, headers: new Headers(), token: e11 });
          } catch (e12) {
            return p2(e12, "header");
          }
        }
        async function d10() {
          let e11 = r10.clientUat, t11 = !!r10.sessionTokenInCookie, s11 = !!r10.devBrowserToken;
          if (r10.handshakeNonce || r10.handshakeToken) try {
            return await o10.resolveHandshake();
          } catch (e12) {
            e12 instanceof rA && "development" === r10.instanceType ? o10.handleTokenVerificationErrorInDevelopment(e12) : console.error("Clerk: unable to resolve handshake:", e12);
          }
          let i11 = r10.isSatellite && "document" === r10.secFetchDest && "GET" === r10.method, n11 = r10.clerkUrl.searchParams.get(sf.ClerkSynced), c11 = n11 === sg.NeedsSync, l11 = n11 === sg.Completed, h11 = t11 || e11, d11 = true !== r10.satelliteAutoSync && !h11 && !c11;
          if ("production" === r10.instanceType && i11 && !l11) {
            if (d11) return a$({ tokenType: sG, authenticateContext: r10, reason: aj });
            if (!h11 || c11) return u10(r10, aD, "");
          }
          if ("development" === r10.instanceType && i11 && !l11) {
            if (d11) return a$({ tokenType: sG, authenticateContext: r10, reason: aj });
            if (!h11 || c11) {
              let e12 = new URL(r10.signInUrl);
              return e12.searchParams.append(sf.ClerkRedirectUrl, r10.clerkUrl.toString()), u10(r10, aD, "", new Headers({ [sM]: e12.toString() }));
            }
          }
          let m3 = new URL(r10.clerkUrl).searchParams.get(sf.ClerkRedirectUrl);
          if ("development" === r10.instanceType && !r10.isSatellite && m3) {
            let e12 = new URL(m3);
            return r10.devBrowserToken && e12.searchParams.append(sf.DevBrowser, r10.devBrowserToken), e12.searchParams.set(sf.ClerkSynced, sg.Completed), u10(r10, "primary-responds-to-syncing", "", new Headers({ [sM]: e12.toString() }));
          }
          if ("development" === r10.instanceType && r10.clerkUrl.searchParams.has(sf.DevBrowser)) return u10(r10, "dev-browser-sync", "");
          if ("development" === r10.instanceType && !s11) return u10(r10, "dev-browser-missing", "");
          if (!e11 && !t11) return a$({ tokenType: sG, authenticateContext: r10, reason: aj });
          if (!e11 && t11) return u10(r10, "session-token-but-no-client-uat", "");
          if (e11 && !t11) return u10(r10, "client-uat-but-no-session-token", "");
          let { data: f3, errors: g3 } = rJ(r10.sessionTokenInCookie);
          if (g3) return p2(g3[0], "cookie");
          if (f3.payload.iat < r10.clientUat) return u10(r10, "session-token-iat-before-client-uat", "");
          try {
            let { data: e12, errors: t12 } = await aY(r10.sessionTokenInCookie, r10);
            if (t12) throw t12[0];
            e12.azp || console.warn("Clerk: Session token from cookie is missing the azp claim. In a future version of Clerk, this token will be considered invalid. Please contact Clerk support if you see this warning.");
            let s12 = aB({ tokenType: sG, authenticateContext: r10, sessionClaims: e12, headers: new Headers(), token: r10.sessionTokenInCookie });
            if (!r10.isSatellite && "GET" === r10.method && "document" === r10.secFetchDest && r10.isCrossOriginReferrer() && !r10.isKnownClerkReferrer() && 0 === r10.handshakeRedirectLoopCounter) return u10(r10, "primary-domain-cross-origin-sync", "Cross-origin request from satellite domain requires handshake");
            let i12 = s12.toAuth();
            if (i12.userId) {
              let e13 = function(e14, t13) {
                let r11 = a10.findTarget(e14.clerkUrl);
                if (!r11) return null;
                let s13 = false;
                if ("organization" === r11.type && (r11.organizationSlug && r11.organizationSlug !== t13.orgSlug && (s13 = true), r11.organizationId && r11.organizationId !== t13.orgId && (s13 = true)), "personalAccount" === r11.type && t13.orgId && (s13 = true), !s13) return null;
                if (e14.handshakeRedirectLoopCounter >= 3) return console.warn("Clerk: Organization activation handshake loop detected. This is likely due to an invalid organization ID or slug. Skipping organization activation."), null;
                let i13 = u10(e14, "active-organization-mismatch", "");
                return "handshake" !== i13.status ? null : i13;
              }(r10, i12);
              if (e13) return e13;
            }
            return s12;
          } catch (e12) {
            return p2(e12, "cookie");
          }
        }
        async function p2(t11, s11) {
          let i11;
          if (!(t11 instanceof rA)) return a$({ tokenType: sG, authenticateContext: r10, reason: az });
          if (t11.reason === rw && r10.refreshTokenInCookie && "GET" === e10.method) {
            let { data: e11, error: t12 } = await l10(r10);
            if (e11) return aB({ tokenType: sG, authenticateContext: r10, sessionClaims: e11.jwtPayload, headers: e11.headers, token: e11.sessionToken });
            i11 = t12?.cause?.reason ? t12.cause.reason : "unexpected-sdk-error";
          } else i11 = "GET" !== e10.method ? "non-eligible-non-get" : r10.refreshTokenInCookie ? null : "non-eligible-no-refresh-cookie";
          return (t11.tokenCarrier = s11, [rw, r_, rk].includes(t11.reason)) ? u10(r10, oe({ tokenError: t11.reason, refreshError: i11 }), t11.getFullMessage()) : a$({ tokenType: sG, authenticateContext: r10, reason: t11.reason, message: t11.getFullMessage() });
        }
        function m2(e11, t11) {
          return t11 instanceof rL ? a$({ tokenType: e11, authenticateContext: r10, reason: t11.code, message: t11.getFullMessage() }) : a$({ tokenType: e11, authenticateContext: r10, reason: az });
        }
        async function f2() {
          let { tokenInHeader: e11 } = r10;
          if (!e11) return p2(Error("Missing token in header"), "header");
          if (!iB(e11)) return a$({ tokenType: s10, authenticateContext: r10, reason: aq, message: "" });
          let t11 = a7(i$(e11), s10, r10);
          if (t11) return t11;
          let { data: i11, tokenType: n11, errors: a11 } = await a2(e11, r10);
          return a11 ? m2(n11, a11[0]) : aB({ tokenType: n11, authenticateContext: r10, machineData: i11, token: e11 });
        }
        async function g2() {
          let { tokenInHeader: e11 } = r10;
          if (!e11) return p2(Error("Missing token in header"), "header");
          if (iB(e11)) {
            let t12 = a7(i$(e11), s10, r10);
            if (t12) return t12;
            let { data: i12, tokenType: n11, errors: a11 } = await a2(e11, r10);
            return a11 ? m2(n11, a11[0]) : aB({ tokenType: n11, authenticateContext: r10, machineData: i12, token: e11 });
          }
          let { data: t11, errors: i11 } = await aY(e11, r10);
          return i11 ? p2(i11[0], "header") : aB({ tokenType: sG, authenticateContext: r10, sessionClaims: t11, token: e11 });
        }
        if (Array.isArray(s10) && !function(e11, t11) {
          let r11 = null, { tokenInHeader: s11 } = t11;
          return s11 && (r11 = iB(s11) ? i$(s11) : sG), iK(r11 ?? sG, e11);
        }(s10, r10)) {
          let e11;
          return e11 = aN(), aK({ status: aU, reason: aq, message: "", proxyUrl: "", publishableKey: "", isSatellite: false, domain: "", signInUrl: "", signUpUrl: "", afterSignInUrl: "", afterSignUpUrl: "", isSignedIn: false, isAuthenticated: false, tokenType: null, toAuth: () => e11, headers: new Headers(), token: null });
        }
        return r10.tokenInHeader ? "any" === s10 || Array.isArray(s10) ? g2() : s10 === sG ? h10() : f2() : s10 === sY || s10 === sV || s10 === sX ? a$({ tokenType: s10, authenticateContext: r10, reason: "No token in header" }) : d10();
      }, a8 = (e10) => {
        let { isSignedIn: t10, isAuthenticated: r10, proxyUrl: s10, reason: i10, message: n10, publishableKey: a10, isSatellite: o10, domain: c10 } = e10;
        return { isSignedIn: t10, isAuthenticated: r10, proxyUrl: s10, reason: i10, message: n10, publishableKey: a10, isSatellite: o10, domain: c10 };
      }, oe = ({ tokenError: e10, refreshError: t10 }) => {
        switch (e10) {
          case rw:
            return `session-token-expired-refresh-${t10}`;
          case r_:
            return "session-token-nbf";
          case rk:
            return "session-token-iat-in-the-future";
          default:
            return az;
        }
      }, ot = { secretKey: "", machineSecretKey: "", jwtKey: "", apiUrl: void 0, apiVersion: void 0, proxyUrl: "", publishableKey: "", isSatellite: false, domain: "", audience: "" }, or = /* @__PURE__ */ new Set(["connection", "keep-alive", "proxy-authenticate", "proxy-authorization", "te", "trailer", "transfer-encoding", "upgrade"]);
      function os(e10) {
        let t10 = e10.get("connection");
        return t10 ? new Set(t10.split(",").map((e11) => e11.trim().toLowerCase()).filter((e11) => e11.length > 0)) : /* @__PURE__ */ new Set();
      }
      var oi = /* @__PURE__ */ new Set(["content-encoding", "content-length"]);
      function on(e10) {
        for (; e10.endsWith("/"); ) e10 = e10.slice(0, -1);
        return e10;
      }
      function oa(e10, t10, r10) {
        return new Response(JSON.stringify({ errors: [{ code: e10, message: t10 }] }), { status: r10, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
      }
      async function oo(e10, t10) {
        let r10, s10, i10, n10 = on(t10?.proxyPath || t6), a10 = t10?.publishableKey || ("u" > typeof process ? process.env?.CLERK_PUBLISHABLE_KEY : void 0), o10 = t10?.secretKey || ("u" > typeof process ? process.env?.CLERK_SECRET_KEY : void 0);
        if (!a10) return oa("proxy_configuration_error", "Missing publishableKey. Provide it in options or set CLERK_PUBLISHABLE_KEY environment variable.", 500);
        if (!o10) return oa("proxy_configuration_error", "Missing secretKey. Provide it in options or set CLERK_SECRET_KEY environment variable.", 500);
        let c10 = new URL(e10.url);
        if (!(c10.pathname === n10 || c10.pathname.startsWith(n10 + "/"))) return oa("proxy_path_mismatch", `Request path "${c10.pathname}" does not match proxy path "${n10}"`, 400);
        let l10 = (r10 = re(a10)?.frontendApi, r10?.startsWith("clerk.") && tZ.some((e11) => r10?.endsWith(e11)) ? t5 : t2.some((e11) => r10?.endsWith(e11)) ? "https://frontend-api.lclclerk.com" : t3.some((e11) => r10?.endsWith(e11)) ? "https://frontend-api.clerkstage.dev" : t5), u10 = new URL(l10).host, h10 = c10.pathname.slice(n10.length) || "/", d10 = new URL(`${l10}${h10}`);
        if (d10.search = c10.search, d10.host !== u10) return oa("proxy_request_failed", "Resolved target does not match the expected host", 400);
        let p2 = new Headers(), m2 = os(e10.headers);
        e10.headers.forEach((e11, t11) => {
          let r11 = t11.toLowerCase();
          or.has(r11) || m2.has(r11) || p2.set(t11, e11);
        });
        let f2 = (s10 = e10.headers.get("x-forwarded-proto")?.split(",")[0]?.trim(), i10 = e10.headers.get("x-forwarded-host")?.split(",")[0]?.trim(), s10 && i10 ? `${s10}://${i10}` : c10.origin), g2 = `${f2}${n10}`;
        p2.set("Clerk-Proxy-Url", g2), p2.set("Clerk-Secret-Key", o10), p2.set("Host", u10), p2.set("Accept-Encoding", "identity"), p2.has("X-Forwarded-Host") || p2.set("X-Forwarded-Host", c10.host), p2.has("X-Forwarded-Proto") || p2.set("X-Forwarded-Proto", c10.protocol.replace(":", ""));
        let y2 = function(e11) {
          let t11 = e11.headers.get("cf-connecting-ip");
          if (t11) return t11;
          let r11 = e11.headers.get("x-real-ip");
          if (r11) return r11;
          let s11 = e11.headers.get("x-forwarded-for");
          if (s11) return s11.split(",")[0]?.trim();
        }(e10);
        y2 && p2.set("X-Forwarded-For", y2);
        let b2 = null !== e10.body;
        try {
          let t11 = { method: e10.method, headers: p2, redirect: "manual" };
          b2 && (t11.duplex = "half", t11.body = e10.body);
          let r11 = await fetch(d10.toString(), t11), s11 = os(r11.headers), i11 = new Headers();
          r11.headers.forEach((e11, t12) => {
            let r12 = t12.toLowerCase();
            or.has(r12) || oi.has(r12) || s11.has(r12) || ("set-cookie" === r12 ? i11.append(t12, e11) : i11.set(t12, e11));
          });
          let n11 = r11.headers.get("location");
          if (n11) try {
            let e11 = new URL(n11, l10);
            if (e11.host === u10) {
              let t12 = `${g2}${e11.pathname}${e11.search}${e11.hash}`;
              i11.set("Location", t12);
            }
          } catch {
          }
          let a11 = new Response(r11.body, { status: r11.status, statusText: r11.statusText, headers: i11 });
          for (let e11 of oi) a11.headers.delete(e11);
          return a11;
        } catch (t11) {
          let e11 = t11 instanceof Error ? t11.message : "Unknown error";
          return oa("proxy_request_failed", `Failed to proxy request to Clerk FAPI: ${e11}`, 502);
        }
      }
      var oc = class extends Error {
        statusCode = 400;
        constructor(e10, t10) {
          super(`Malformed encoding in URL path: ${e10}`), this.name = "MalformedURLError", this.cause = t10;
        }
      };
      URLSearchParams, e.r(40012).actionAsyncStorage, e.r(16563).unstable_rethrow;
      var ol = e.i(32828);
      let ou = `${ol.HTTP_ERROR_FALLBACK_ERROR_CODE};404`;
      e.i(58746), e.i(78905), e.i(76170);
      let oh = "x-middleware-rewrite", od = "x-middleware-next", op = "Location", om = "next-url", of = "next-action", og = "x-nextjs-data", oy = (e10, t10, r10) => (e10.headers.set(t10, r10), e10), ob = "__clerk_db_jwt";
      var ow = e.i(21760);
      let ov = (e10) => {
        if (!e10 || "string" != typeof e10) return e10;
        try {
          return (e10 || "").replace(/^(sk_(live|test)_)(.+?)(.{3})$/, "$1*********$4");
        } catch {
          return "";
        }
      }, ox = (e10) => (Array.isArray(e10) ? e10 : [e10]).map((e11) => "string" == typeof e11 ? ov(e11) : JSON.stringify(Object.fromEntries(Object.entries(e11).map(([e12, t10]) => [e12, ov(t10)])), null, 2)).join(", "), o_ = (e10, t10) => (...r10) => {
        let s10 = ("string" == typeof e10 ? () => {
          let t11 = [], r11 = false;
          return { enable: () => {
            r11 = true;
          }, debug: (...e11) => {
            r11 && t11.push(e11.map((e12) => "function" == typeof e12 ? e12() : e12));
          }, commit: () => {
            if (r11) {
              var s11, i11;
              for (let r12 of (console.log((s11 = e10, `[clerk debug start: ${s11}]`)), t11)) {
                let e11 = ox(r12);
                e11 = e11.split("\n").map((e12) => `  ${e12}`).join("\n"), process.env.VERCEL && (e11 = function(e12) {
                  let t12 = new TextEncoder(), r13 = new TextDecoder("utf-8"), s12 = t12.encode(e12).slice(0, 4096);
                  return r13.decode(s12).replace(/\uFFFD/g, "");
                }(e11)), console.log(e11);
              }
              console.log((i11 = e10, `[clerk debug end: ${i11}] (@clerk/nextjs=7.3.3,next=${ow.default.version},timestamp=${Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3)})`));
            }
          } };
        } : e10)(), i10 = t10(s10);
        try {
          let e11 = i10(...r10);
          if ("object" == typeof e11 && "then" in e11 && "function" == typeof e11.then) return e11.then((e12) => (s10.commit(), e12)).catch((e12) => {
            throw s10.commit(), e12;
          });
          return s10.commit(), e11;
        } catch (e11) {
          throw s10.commit(), e11;
        }
      }, ok = (e10) => {
        let t10 = (r10) => {
          if (!r10) return r10;
          if (Array.isArray(r10)) return r10.map((e11) => "object" == typeof e11 || Array.isArray(e11) ? t10(e11) : e11);
          let s10 = { ...r10 };
          for (let r11 of Object.keys(s10)) {
            let i10 = e10(r11.toString());
            i10 !== r11 && (s10[i10] = s10[r11], delete s10[r11]), "object" == typeof s10[i10] && (s10[i10] = t10(s10[i10]));
          }
          return s10;
        };
        return t10;
      };
      function oE(e10) {
        if ("boolean" == typeof e10) return e10;
        if (null == e10) return false;
        if ("string" == typeof e10) {
          if ("true" === e10.toLowerCase()) return true;
          if ("false" === e10.toLowerCase()) return false;
        }
        let t10 = parseInt(e10, 10);
        return !isNaN(t10) && t10 > 0;
      }
      ok(function(e10) {
        return e10 ? e10.replace(/[A-Z]/g, (e11) => `_${e11.toLowerCase()}`) : "";
      }), ok(function(e10) {
        return e10 ? e10.replace(/([-_][a-z])/g, (e11) => e11.toUpperCase().replace(/-|_/, "")) : "";
      }), process.env.NEXT_PUBLIC_CLERK_JS_VERSION, process.env.NEXT_PUBLIC_CLERK_JS_URL, process.env.NEXT_PUBLIC_CLERK_UI_URL, process.env.NEXT_PUBLIC_CLERK_UI_VERSION;
      let oS = process.env.CLERK_API_VERSION || "v1", oO = process.env.CLERK_SECRET_KEY || "", oT = process.env.CLERK_MACHINE_SECRET_KEY || "", oC = "pk_test_ZmlybS1rYW5nYXJvby00Ni5jbGVyay5hY2NvdW50cy5kZXYk", oR = process.env.CLERK_ENCRYPTION_KEY || "", oA = process.env.CLERK_API_URL || (u = re(oC)?.frontendApi, u?.startsWith("clerk.") && tZ.some((e10) => u?.endsWith(e10)) ? t4 : t2.some((e10) => u?.endsWith(e10)) ? "https://api.lclclerk.com" : t3.some((e10) => u?.endsWith(e10)) ? "https://api.clerkstage.dev" : t4), oP = process.env.NEXT_PUBLIC_CLERK_DOMAIN || "", oI = process.env.NEXT_PUBLIC_CLERK_PROXY_URL || "", oN = oE(process.env.NEXT_PUBLIC_CLERK_IS_SATELLITE) || false, oL = "/sign-in", oU = "/sign-up", oM = oE(process.env.NEXT_PUBLIC_CLERK_TELEMETRY_DISABLED), oD = oE(process.env.NEXT_PUBLIC_CLERK_TELEMETRY_DEBUG), oj = oE(process.env.NEXT_PUBLIC_CLERK_KEYLESS_DISABLED) || false, oq = false, oz = Symbol.for("clerk_use_cache_error");
      class oB extends (cy = Error, cg = oz, cy) {
        constructor(e10, t10) {
          super(e10), this.originalError = t10, this[cg] = true, this.name = "ClerkUseCacheError";
        }
      }
      let o$ = /inside\s+["']use cache["']|["']use cache["'].*(?:headers|cookies)|(?:headers|cookies).*["']use cache["']/i, oK = /cache scope/i, oH = /dynamic data source/i, oF = /Route .*? needs to bail out of prerendering at this point because it used .*?./, oW = (e10) => {
        if (!(e10 instanceof Error) || !("message" in e10)) return false;
        let { message: t10 } = e10, r10 = t10.toLowerCase();
        return oF.test(t10) || r10.includes("dynamic server usage") || r10.includes("this page needs to bail out of prerendering") || r10.includes("during prerendering");
      }, oJ = `Clerk: auth() and currentUser() cannot be called inside a "use cache" function. These functions access \`headers()\` internally, which is a dynamic API not allowed in cached contexts.

To fix this, call auth() outside the cached function and pass the values you need as arguments:

  import { auth, clerkClient } from '@clerk/nextjs/server';

  async function getCachedUser(userId: string) {
    "use cache";
    const client = await clerkClient();
    return client.users.getUser(userId);
  }

  // In your component/page:
  const { userId } = await auth();
  if (userId) {
    const user = await getCachedUser(userId);
  }`;
      async function oG() {
        try {
          let { headers: t10 } = await Promise.resolve().then(() => e.i(66816)), r10 = await t10();
          return new Y("https://placeholder.com", { headers: r10 });
        } catch (e10) {
          if (e10 && oW(e10)) throw e10;
          if (e10 && ((e11) => {
            if (!(e11 instanceof Error)) return false;
            let { message: t10 } = e11;
            return !!(o$.test(t10) || oK.test(t10) && oH.test(t10));
          })(e10)) throw new oB(`${oJ}

Original error: ${e10.message}`, e10);
          throw Error(`Clerk: auth(), currentUser() and clerkClient(), are only supported in App Router (/app directory).
If you're using /pages, try getAuth() instead.
Original error: ${e10}`);
        }
      }
      var oV = class {
        #t;
        #r = 864e5;
        constructor(e10) {
          this.#t = e10;
        }
        isEventThrottled(e10) {
          let t10 = Date.now(), r10 = this.#s(e10), s10 = this.#t.getItem(r10);
          return !!s10 && !(t10 - s10 > this.#r) || (this.#t.setItem(r10, t10), false);
        }
        #s(e10) {
          let { sk: t10, pk: r10, payload: s10, ...i10 } = e10, n10 = { ...s10, ...i10 };
          return JSON.stringify(Object.keys({ ...s10, ...i10 }).sort().map((e11) => n10[e11]));
        }
      }, oX = class {
        #i = "clerk_telemetry_throttler";
        getItem(e10) {
          return this.#n()[e10];
        }
        setItem(e10, t10) {
          try {
            let r10 = this.#n();
            r10[e10] = t10, localStorage.setItem(this.#i, JSON.stringify(r10));
          } catch (e11) {
            e11 instanceof DOMException && ("QuotaExceededError" === e11.name || "NS_ERROR_DOM_QUOTA_REACHED" === e11.name) && localStorage.length > 0 && localStorage.removeItem(this.#i);
          }
        }
        removeItem(e10) {
          try {
            let t10 = this.#n();
            delete t10[e10], localStorage.setItem(this.#i, JSON.stringify(t10));
          } catch {
          }
        }
        #n() {
          try {
            let e10 = localStorage.getItem(this.#i);
            if (!e10) return {};
            return JSON.parse(e10);
          } catch {
            return {};
          }
        }
        static isSupported() {
          return false;
        }
      }, oY = class {
        #t = /* @__PURE__ */ new Map();
        #a = 1e4;
        getItem(e10) {
          return this.#t.size > this.#a ? void this.#t.clear() : this.#t.get(e10);
        }
        setItem(e10, t10) {
          this.#t.set(e10, t10);
        }
        removeItem(e10) {
          this.#t.delete(e10);
        }
      };
      let oQ = /* @__PURE__ */ new Set(["error", "warn", "info", "debug", "trace"]);
      var oZ = class {
        #o;
        #c;
        #l = {};
        #u = [];
        #h = null;
        constructor(e10) {
          this.#o = { maxBufferSize: e10.maxBufferSize ?? 5, samplingRate: e10.samplingRate ?? 1, perEventSampling: e10.perEventSampling ?? true, disabled: e10.disabled ?? false, debug: e10.debug ?? false, endpoint: "https://clerk-telemetry.com" }, e10.clerkVersion ? this.#l.clerkVersion = e10.clerkVersion ?? "" : this.#l.clerkVersion = "", this.#l.sdk = e10.sdk, this.#l.sdkVersion = e10.sdkVersion, this.#l.publishableKey = e10.publishableKey ?? "";
          const t10 = re(e10.publishableKey);
          t10 && (this.#l.instanceType = t10.instanceType), e10.secretKey && (this.#l.secretKey = e10.secretKey.substring(0, 16)), this.#c = new oV(oX.isSupported() ? new oX() : new oY());
        }
        get isEnabled() {
          return !("development" !== this.#l.instanceType || this.#o.disabled || "u" > typeof process && process.env && oE(process.env.CLERK_TELEMETRY_DISABLED));
        }
        get isDebug() {
          return this.#o.debug || "u" > typeof process && process.env && oE(process.env.CLERK_TELEMETRY_DEBUG);
        }
        record(e10) {
          try {
            let t10 = this.#d(e10.event, e10.payload);
            if (this.#p(t10.event, t10), !this.#m(t10, e10.eventSamplingRate)) return;
            this.#u.push({ kind: "event", value: t10 }), this.#f();
          } catch (e11) {
            console.error("[clerk/telemetry] Error recording telemetry event", e11);
          }
        }
        recordLog(e10) {
          try {
            if (!this.#g(e10)) return;
            let t10 = "string" == typeof e10?.level && oQ.has(e10.level), r10 = "string" == typeof e10?.message && e10.message.trim().length > 0, s10 = null, i10 = e10?.timestamp;
            if ("number" == typeof i10 || "string" == typeof i10) {
              let e11 = new Date(i10);
              Number.isNaN(e11.getTime()) || (s10 = e11);
            }
            if (!t10 || !r10 || null === s10) {
              this.isDebug && "u" > typeof console && console.warn("[clerk/telemetry] Dropping invalid telemetry log entry", { levelIsValid: t10, messageIsValid: r10, timestampIsValid: null !== s10 });
              return;
            }
            let n10 = this.#y(), a10 = { sdk: n10.name, sdkv: n10.version, cv: this.#l.clerkVersion ?? "", lvl: e10.level, msg: e10.message, ts: s10.toISOString(), pk: this.#l.publishableKey || null, payload: this.#b(e10.context) };
            this.#u.push({ kind: "log", value: a10 }), this.#f();
          } catch (e11) {
            console.error("[clerk/telemetry] Error recording telemetry log entry", e11);
          }
        }
        #m(e10, t10) {
          return this.isEnabled && !this.isDebug && this.#w(e10, t10);
        }
        #g(e10) {
          return true;
        }
        #w(e10, t10) {
          let r10 = Math.random();
          return !!(r10 <= this.#o.samplingRate && (false === this.#o.perEventSampling || void 0 === t10 || r10 <= t10)) && !this.#c.isEventThrottled(e10);
        }
        #f() {
          this.#v();
        }
        #v() {
          let e10 = [...this.#u];
          if (this.#u = [], this.#h = null, 0 === e10.length) return;
          let t10 = e10.filter((e11) => "event" === e11.kind).map((e11) => e11.value), r10 = e10.filter((e11) => "log" === e11.kind).map((e11) => e11.value);
          t10.length > 0 && fetch(new URL("/v1/event", this.#o.endpoint), { headers: { "Content-Type": "application/json" }, keepalive: true, method: "POST", body: JSON.stringify({ events: t10 }) }).catch(() => void 0), r10.length > 0 && fetch(new URL("/v1/logs", this.#o.endpoint), { headers: { "Content-Type": "application/json" }, keepalive: true, method: "POST", body: JSON.stringify({ logs: r10 }) }).catch(() => void 0);
        }
        #p(e10, t10) {
          this.isDebug && (void 0 !== console.groupCollapsed ? (console.groupCollapsed("[clerk/telemetry]", e10), console.log(t10), console.groupEnd()) : console.log("[clerk/telemetry]", e10, t10));
        }
        #y() {
          return { name: this.#l.sdk, version: this.#l.sdkVersion };
        }
        #d(e10, t10) {
          let r10 = this.#y();
          return { event: e10, cv: this.#l.clerkVersion ?? "", it: this.#l.instanceType ?? "", sdk: r10.name, sdkv: r10.version, ...this.#l.publishableKey ? { pk: this.#l.publishableKey } : {}, ...this.#l.secretKey ? { sk: this.#l.secretKey } : {}, payload: t10 };
        }
        #b(e10) {
          if (null == e10 || "object" != typeof e10) return null;
          try {
            let t10 = JSON.parse(JSON.stringify(e10));
            if (t10 && "object" == typeof t10 && !Array.isArray(t10)) return t10;
            return null;
          } catch {
            return null;
          }
        }
      };
      let o0 = { secretKey: oO, publishableKey: oC, apiUrl: oA, apiVersion: oS, userAgent: "@clerk/nextjs@7.3.3", proxyUrl: oI, domain: oP, isSatellite: oN, machineSecretKey: oT, sdkMetadata: { name: "@clerk/nextjs", version: "7.3.3", environment: "production" }, telemetry: { disabled: oM, debug: oD } }, o1 = (e10) => {
        var t10;
        let r10, s10, i10, n10, a10, o10;
        return s10 = aR(r10 = { ...o0, ...e10 }), i10 = sW(ot, (t10 = { options: r10, apiClient: s10 }).options), n10 = t10.apiClient, a10 = { authenticateRequest: (e11, t11 = {}) => {
          let { apiUrl: r11, apiVersion: s11 } = i10, a11 = sW(i10, t11);
          return a9(e11, { ...t11, ...a11, apiUrl: r11, apiVersion: s11, apiClient: n10 });
        }, debugRequestState: a8 }, o10 = new oZ({ publishableKey: r10.publishableKey, secretKey: r10.secretKey, samplingRate: 0.1, ...r10.sdkMetadata ? { sdk: r10.sdkMetadata.name, sdkVersion: r10.sdkMetadata.version } : {}, ...r10.telemetry || {} }), { ...s10, ...a10, telemetry: o10 };
      };
      function o2(e10, t10) {
        var r10, s10;
        return function(e11) {
          try {
            let { headers: t11, nextUrl: r11, cookies: s11 } = e11 || {};
            return "function" == typeof (null == t11 ? void 0 : t11.get) && "function" == typeof (null == r11 ? void 0 : r11.searchParams.get) && "function" == typeof (null == s11 ? void 0 : s11.get);
          } catch {
            return false;
          }
        }(e10) || function(e11) {
          try {
            let { headers: t11 } = e11 || {};
            return "function" == typeof (null == t11 ? void 0 : t11.get);
          } catch {
            return false;
          }
        }(e10) ? e10.headers.get(t10) : e10.headers[t10] || e10.headers[t10.toLowerCase()] || (null == (s10 = null == (r10 = e10.socket) ? void 0 : r10._httpMessage) ? void 0 : s10.getHeader(t10));
      }
      var o3 = e.i(78500);
      let o4 = /* @__PURE__ */ new Map(), o5 = new o3.AsyncLocalStorage();
      function o6(e10, t10, r10) {
        return "function" == typeof e10 ? e10(t10) : void 0 !== e10 ? e10 : void 0 !== r10 ? r10 : void 0;
      }
      var o7, o9, o8, ce, ct, cr, cs, ci, cn, ca, co, cc, cl, cu, ch, cd, cp, cm, cf, cg, cy, cb, cw, cv, cx, c_, ck, cE = Object.defineProperty, cS = (null == (cb = "u" > typeof globalThis ? globalThis : void 0) ? void 0 : cb.crypto) || (null == (cw = e.g) ? void 0 : cw.crypto) || (null == (cv = "u" > typeof self ? self : void 0) ? void 0 : cv.crypto) || (null == (c_ = null == (cx = "u" > typeof frames ? frames : void 0) ? void 0 : cx[0]) ? void 0 : c_.crypto);
      ck = cS ? (e10) => {
        let t10 = [];
        for (let r10 = 0; r10 < e10; r10 += 4) t10.push(cS.getRandomValues(new Uint32Array(1))[0]);
        return new cT(t10, e10);
      } : (e10) => {
        let t10 = [], r10 = (e11) => {
          let t11 = e11, r11 = 987654321;
          return () => {
            let e12 = ((r11 = 36969 * (65535 & r11) + (r11 >> 16) | 0) << 16) + (t11 = 18e3 * (65535 & t11) + (t11 >> 16) | 0) | 0;
            return e12 /= 4294967296, (e12 += 0.5) * (Math.random() > 0.5 ? 1 : -1);
          };
        };
        for (let s10 = 0, i10; s10 < e10; s10 += 4) {
          let e11 = r10(4294967296 * (i10 || Math.random()));
          i10 = 987654071 * e11(), t10.push(4294967296 * e11() | 0);
        }
        return new cT(t10, e10);
      };
      var cO = class {
        static create(...e10) {
          return new this(...e10);
        }
        mixIn(e10) {
          return Object.assign(this, e10);
        }
        clone() {
          let e10 = new this.constructor();
          return Object.assign(e10, this), e10;
        }
      }, cT = class extends cO {
        constructor(e10 = [], t10 = 4 * e10.length) {
          super();
          let r10 = e10;
          if (r10 instanceof ArrayBuffer && (r10 = new Uint8Array(r10)), (r10 instanceof Int8Array || r10 instanceof Uint8ClampedArray || r10 instanceof Int16Array || r10 instanceof Uint16Array || r10 instanceof Int32Array || r10 instanceof Uint32Array || r10 instanceof Float32Array || r10 instanceof Float64Array) && (r10 = new Uint8Array(r10.buffer, r10.byteOffset, r10.byteLength)), r10 instanceof Uint8Array) {
            let e11 = r10.byteLength, t11 = [];
            for (let s10 = 0; s10 < e11; s10 += 1) t11[s10 >>> 2] |= r10[s10] << 24 - s10 % 4 * 8;
            this.words = t11, this.sigBytes = e11;
          } else this.words = e10, this.sigBytes = t10;
        }
        toString(e10 = cC) {
          return e10.stringify(this);
        }
        concat(e10) {
          let t10 = this.words, r10 = e10.words, s10 = this.sigBytes, i10 = e10.sigBytes;
          if (this.clamp(), s10 % 4) for (let e11 = 0; e11 < i10; e11 += 1) {
            let i11 = r10[e11 >>> 2] >>> 24 - e11 % 4 * 8 & 255;
            t10[s10 + e11 >>> 2] |= i11 << 24 - (s10 + e11) % 4 * 8;
          }
          else for (let e11 = 0; e11 < i10; e11 += 4) t10[s10 + e11 >>> 2] = r10[e11 >>> 2];
          return this.sigBytes += i10, this;
        }
        clamp() {
          let { words: e10, sigBytes: t10 } = this;
          e10[t10 >>> 2] &= 4294967295 << 32 - t10 % 4 * 8, e10.length = Math.ceil(t10 / 4);
        }
        clone() {
          let e10 = super.clone.call(this);
          return e10.words = this.words.slice(0), e10;
        }
      };
      (h = "symbol" != typeof (G = "random") ? G + "" : G) in cT ? cE(cT, h, { enumerable: true, configurable: true, writable: true, value: ck }) : cT[h] = ck;
      var cC = { stringify(e10) {
        let { words: t10, sigBytes: r10 } = e10, s10 = [];
        for (let e11 = 0; e11 < r10; e11 += 1) {
          let r11 = t10[e11 >>> 2] >>> 24 - e11 % 4 * 8 & 255;
          s10.push((r11 >>> 4).toString(16)), s10.push((15 & r11).toString(16));
        }
        return s10.join("");
      }, parse(e10) {
        let t10 = e10.length, r10 = [];
        for (let s10 = 0; s10 < t10; s10 += 2) r10[s10 >>> 3] |= parseInt(e10.substr(s10, 2), 16) << 24 - s10 % 8 * 4;
        return new cT(r10, t10 / 2);
      } }, cR = { stringify(e10) {
        let { words: t10, sigBytes: r10 } = e10, s10 = [];
        for (let e11 = 0; e11 < r10; e11 += 1) {
          let r11 = t10[e11 >>> 2] >>> 24 - e11 % 4 * 8 & 255;
          s10.push(String.fromCharCode(r11));
        }
        return s10.join("");
      }, parse(e10) {
        let t10 = e10.length, r10 = [];
        for (let s10 = 0; s10 < t10; s10 += 1) r10[s10 >>> 2] |= (255 & e10.charCodeAt(s10)) << 24 - s10 % 4 * 8;
        return new cT(r10, t10);
      } }, cA = { stringify(e10) {
        try {
          return decodeURIComponent(escape(cR.stringify(e10)));
        } catch {
          throw Error("Malformed UTF-8 data");
        }
      }, parse: (e10) => cR.parse(unescape(encodeURIComponent(e10))) }, cP = class extends cO {
        constructor() {
          super(), this._minBufferSize = 0;
        }
        reset() {
          this._data = new cT(), this._nDataBytes = 0;
        }
        _append(e10) {
          let t10 = e10;
          "string" == typeof t10 && (t10 = cA.parse(t10)), this._data.concat(t10), this._nDataBytes += t10.sigBytes;
        }
        _process(e10) {
          let t10, { _data: r10, blockSize: s10 } = this, i10 = r10.words, n10 = r10.sigBytes, a10 = n10 / (4 * s10), o10 = (a10 = e10 ? Math.ceil(a10) : Math.max((0 | a10) - this._minBufferSize, 0)) * s10, c10 = Math.min(4 * o10, n10);
          if (o10) {
            for (let e11 = 0; e11 < o10; e11 += s10) this._doProcessBlock(i10, e11);
            t10 = i10.splice(0, o10), r10.sigBytes -= c10;
          }
          return new cT(t10, c10);
        }
        clone() {
          let e10 = super.clone.call(this);
          return e10._data = this._data.clone(), e10;
        }
      }, cI = class extends cP {
        constructor(e10) {
          super(), this.blockSize = 16, this.cfg = Object.assign(new cO(), e10), this.reset();
        }
        static _createHelper(e10) {
          return (t10, r10) => new e10(r10).finalize(t10);
        }
        static _createHmacHelper(e10) {
          return (t10, r10) => new cN(e10, r10).finalize(t10);
        }
        reset() {
          super.reset.call(this), this._doReset();
        }
        update(e10) {
          return this._append(e10), this._process(), this;
        }
        finalize(e10) {
          return e10 && this._append(e10), this._doFinalize();
        }
      }, cN = class extends cO {
        constructor(e10, t10) {
          super();
          let r10 = new e10();
          this._hasher = r10;
          let s10 = t10;
          "string" == typeof s10 && (s10 = cA.parse(s10));
          let i10 = r10.blockSize, n10 = 4 * i10;
          s10.sigBytes > n10 && (s10 = r10.finalize(t10)), s10.clamp();
          let a10 = s10.clone();
          this._oKey = a10;
          let o10 = s10.clone();
          this._iKey = o10;
          let c10 = a10.words, l10 = o10.words;
          for (let e11 = 0; e11 < i10; e11 += 1) c10[e11] ^= 1549556828, l10[e11] ^= 909522486;
          a10.sigBytes = n10, o10.sigBytes = n10, this.reset();
        }
        reset() {
          let e10 = this._hasher;
          e10.reset(), e10.update(this._iKey);
        }
        update(e10) {
          return this._hasher.update(e10), this;
        }
        finalize(e10) {
          let t10 = this._hasher, r10 = t10.finalize(e10);
          return t10.reset(), t10.finalize(this._oKey.clone().concat(r10));
        }
      }, cL = { stringify(e10) {
        let { words: t10, sigBytes: r10 } = e10, s10 = this._map;
        e10.clamp();
        let i10 = [];
        for (let e11 = 0; e11 < r10; e11 += 3) {
          let n11 = (t10[e11 >>> 2] >>> 24 - e11 % 4 * 8 & 255) << 16 | (t10[e11 + 1 >>> 2] >>> 24 - (e11 + 1) % 4 * 8 & 255) << 8 | t10[e11 + 2 >>> 2] >>> 24 - (e11 + 2) % 4 * 8 & 255;
          for (let t11 = 0; t11 < 4 && e11 + 0.75 * t11 < r10; t11 += 1) i10.push(s10.charAt(n11 >>> 6 * (3 - t11) & 63));
        }
        let n10 = s10.charAt(64);
        if (n10) for (; i10.length % 4; ) i10.push(n10);
        return i10.join("");
      }, parse(e10) {
        let t10 = e10.length, r10 = this._map, s10 = this._reverseMap;
        if (!s10) {
          this._reverseMap = [], s10 = this._reverseMap;
          for (let e11 = 0; e11 < r10.length; e11 += 1) s10[r10.charCodeAt(e11)] = e11;
        }
        let i10 = r10.charAt(64);
        if (i10) {
          let r11 = e10.indexOf(i10);
          -1 !== r11 && (t10 = r11);
        }
        var n10 = t10, a10 = s10;
        let o10 = [], c10 = 0;
        for (let t11 = 0; t11 < n10; t11 += 1) if (t11 % 4) {
          let r11 = a10[e10.charCodeAt(t11 - 1)] << t11 % 4 * 2 | a10[e10.charCodeAt(t11)] >>> 6 - t11 % 4 * 2;
          o10[c10 >>> 2] |= r11 << 24 - c10 % 4 * 8, c10 += 1;
        }
        return cT.create(o10, c10);
      }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" }, cU = [];
      for (let e10 = 0; e10 < 64; e10 += 1) cU[e10] = 4294967296 * Math.abs(Math.sin(e10 + 1)) | 0;
      var cM = (e10, t10, r10, s10, i10, n10, a10) => {
        let o10 = e10 + (t10 & r10 | ~t10 & s10) + i10 + a10;
        return (o10 << n10 | o10 >>> 32 - n10) + t10;
      }, cD = (e10, t10, r10, s10, i10, n10, a10) => {
        let o10 = e10 + (t10 & s10 | r10 & ~s10) + i10 + a10;
        return (o10 << n10 | o10 >>> 32 - n10) + t10;
      }, cj = (e10, t10, r10, s10, i10, n10, a10) => {
        let o10 = e10 + (t10 ^ r10 ^ s10) + i10 + a10;
        return (o10 << n10 | o10 >>> 32 - n10) + t10;
      }, cq = (e10, t10, r10, s10, i10, n10, a10) => {
        let o10 = e10 + (r10 ^ (t10 | ~s10)) + i10 + a10;
        return (o10 << n10 | o10 >>> 32 - n10) + t10;
      }, cz = class extends cI {
        _doReset() {
          this._hash = new cT([1732584193, 4023233417, 2562383102, 271733878]);
        }
        _doProcessBlock(e10, t10) {
          for (let r11 = 0; r11 < 16; r11 += 1) {
            let s11 = t10 + r11, i11 = e10[s11];
            e10[s11] = (i11 << 8 | i11 >>> 24) & 16711935 | (i11 << 24 | i11 >>> 8) & 4278255360;
          }
          let r10 = this._hash.words, s10 = e10[t10 + 0], i10 = e10[t10 + 1], n10 = e10[t10 + 2], a10 = e10[t10 + 3], o10 = e10[t10 + 4], c10 = e10[t10 + 5], l10 = e10[t10 + 6], u10 = e10[t10 + 7], h10 = e10[t10 + 8], d10 = e10[t10 + 9], p2 = e10[t10 + 10], m2 = e10[t10 + 11], f2 = e10[t10 + 12], g2 = e10[t10 + 13], y2 = e10[t10 + 14], b2 = e10[t10 + 15], w2 = r10[0], v2 = r10[1], x2 = r10[2], _2 = r10[3];
          w2 = cM(w2, v2, x2, _2, s10, 7, cU[0]), _2 = cM(_2, w2, v2, x2, i10, 12, cU[1]), x2 = cM(x2, _2, w2, v2, n10, 17, cU[2]), v2 = cM(v2, x2, _2, w2, a10, 22, cU[3]), w2 = cM(w2, v2, x2, _2, o10, 7, cU[4]), _2 = cM(_2, w2, v2, x2, c10, 12, cU[5]), x2 = cM(x2, _2, w2, v2, l10, 17, cU[6]), v2 = cM(v2, x2, _2, w2, u10, 22, cU[7]), w2 = cM(w2, v2, x2, _2, h10, 7, cU[8]), _2 = cM(_2, w2, v2, x2, d10, 12, cU[9]), x2 = cM(x2, _2, w2, v2, p2, 17, cU[10]), v2 = cM(v2, x2, _2, w2, m2, 22, cU[11]), w2 = cM(w2, v2, x2, _2, f2, 7, cU[12]), _2 = cM(_2, w2, v2, x2, g2, 12, cU[13]), x2 = cM(x2, _2, w2, v2, y2, 17, cU[14]), v2 = cM(v2, x2, _2, w2, b2, 22, cU[15]), w2 = cD(w2, v2, x2, _2, i10, 5, cU[16]), _2 = cD(_2, w2, v2, x2, l10, 9, cU[17]), x2 = cD(x2, _2, w2, v2, m2, 14, cU[18]), v2 = cD(v2, x2, _2, w2, s10, 20, cU[19]), w2 = cD(w2, v2, x2, _2, c10, 5, cU[20]), _2 = cD(_2, w2, v2, x2, p2, 9, cU[21]), x2 = cD(x2, _2, w2, v2, b2, 14, cU[22]), v2 = cD(v2, x2, _2, w2, o10, 20, cU[23]), w2 = cD(w2, v2, x2, _2, d10, 5, cU[24]), _2 = cD(_2, w2, v2, x2, y2, 9, cU[25]), x2 = cD(x2, _2, w2, v2, a10, 14, cU[26]), v2 = cD(v2, x2, _2, w2, h10, 20, cU[27]), w2 = cD(w2, v2, x2, _2, g2, 5, cU[28]), _2 = cD(_2, w2, v2, x2, n10, 9, cU[29]), x2 = cD(x2, _2, w2, v2, u10, 14, cU[30]), v2 = cD(v2, x2, _2, w2, f2, 20, cU[31]), w2 = cj(w2, v2, x2, _2, c10, 4, cU[32]), _2 = cj(_2, w2, v2, x2, h10, 11, cU[33]), x2 = cj(x2, _2, w2, v2, m2, 16, cU[34]), v2 = cj(v2, x2, _2, w2, y2, 23, cU[35]), w2 = cj(w2, v2, x2, _2, i10, 4, cU[36]), _2 = cj(_2, w2, v2, x2, o10, 11, cU[37]), x2 = cj(x2, _2, w2, v2, u10, 16, cU[38]), v2 = cj(v2, x2, _2, w2, p2, 23, cU[39]), w2 = cj(w2, v2, x2, _2, g2, 4, cU[40]), _2 = cj(_2, w2, v2, x2, s10, 11, cU[41]), x2 = cj(x2, _2, w2, v2, a10, 16, cU[42]), v2 = cj(v2, x2, _2, w2, l10, 23, cU[43]), w2 = cj(w2, v2, x2, _2, d10, 4, cU[44]), _2 = cj(_2, w2, v2, x2, f2, 11, cU[45]), x2 = cj(x2, _2, w2, v2, b2, 16, cU[46]), v2 = cj(v2, x2, _2, w2, n10, 23, cU[47]), w2 = cq(w2, v2, x2, _2, s10, 6, cU[48]), _2 = cq(_2, w2, v2, x2, u10, 10, cU[49]), x2 = cq(x2, _2, w2, v2, y2, 15, cU[50]), v2 = cq(v2, x2, _2, w2, c10, 21, cU[51]), w2 = cq(w2, v2, x2, _2, f2, 6, cU[52]), _2 = cq(_2, w2, v2, x2, a10, 10, cU[53]), x2 = cq(x2, _2, w2, v2, p2, 15, cU[54]), v2 = cq(v2, x2, _2, w2, i10, 21, cU[55]), w2 = cq(w2, v2, x2, _2, h10, 6, cU[56]), _2 = cq(_2, w2, v2, x2, b2, 10, cU[57]), x2 = cq(x2, _2, w2, v2, l10, 15, cU[58]), v2 = cq(v2, x2, _2, w2, g2, 21, cU[59]), w2 = cq(w2, v2, x2, _2, o10, 6, cU[60]), _2 = cq(_2, w2, v2, x2, m2, 10, cU[61]), x2 = cq(x2, _2, w2, v2, n10, 15, cU[62]), v2 = cq(v2, x2, _2, w2, d10, 21, cU[63]), r10[0] = r10[0] + w2 | 0, r10[1] = r10[1] + v2 | 0, r10[2] = r10[2] + x2 | 0, r10[3] = r10[3] + _2 | 0;
        }
        _doFinalize() {
          let e10 = this._data, t10 = e10.words, r10 = 8 * this._nDataBytes, s10 = 8 * e10.sigBytes;
          t10[s10 >>> 5] |= 128 << 24 - s10 % 32;
          let i10 = Math.floor(r10 / 4294967296);
          t10[(s10 + 64 >>> 9 << 4) + 15] = (i10 << 8 | i10 >>> 24) & 16711935 | (i10 << 24 | i10 >>> 8) & 4278255360, t10[(s10 + 64 >>> 9 << 4) + 14] = (r10 << 8 | r10 >>> 24) & 16711935 | (r10 << 24 | r10 >>> 8) & 4278255360, e10.sigBytes = (t10.length + 1) * 4, this._process();
          let n10 = this._hash, a10 = n10.words;
          for (let e11 = 0; e11 < 4; e11 += 1) {
            let t11 = a10[e11];
            a10[e11] = (t11 << 8 | t11 >>> 24) & 16711935 | (t11 << 24 | t11 >>> 8) & 4278255360;
          }
          return n10;
        }
        clone() {
          let e10 = super.clone.call(this);
          return e10._hash = this._hash.clone(), e10;
        }
      };
      cI._createHelper(cz), cI._createHmacHelper(cz);
      var cB = class extends cO {
        constructor(e10) {
          super(), this.cfg = Object.assign(new cO(), { keySize: 4, hasher: cz, iterations: 1 }, e10);
        }
        compute(e10, t10) {
          let r10, { cfg: s10 } = this, i10 = s10.hasher.create(), n10 = cT.create(), a10 = n10.words, { keySize: o10, iterations: c10 } = s10;
          for (; a10.length < o10; ) {
            r10 && i10.update(r10), r10 = i10.update(e10).finalize(t10), i10.reset();
            for (let e11 = 1; e11 < c10; e11 += 1) r10 = i10.finalize(r10), i10.reset();
            n10.concat(r10);
          }
          return n10.sigBytes = 4 * o10, n10;
        }
      }, c$ = class extends cP {
        constructor(e10, t10, r10) {
          super(), this.cfg = Object.assign(new cO(), r10), this._xformMode = e10, this._key = t10, this.reset();
        }
        static createEncryptor(e10, t10) {
          return this.create(this._ENC_XFORM_MODE, e10, t10);
        }
        static createDecryptor(e10, t10) {
          return this.create(this._DEC_XFORM_MODE, e10, t10);
        }
        static _createHelper(e10) {
          let t10 = (e11) => "string" == typeof e11 ? cX : cV;
          return { encrypt: (r10, s10, i10) => t10(s10).encrypt(e10, r10, s10, i10), decrypt: (r10, s10, i10) => t10(s10).decrypt(e10, r10, s10, i10) };
        }
        reset() {
          super.reset.call(this), this._doReset();
        }
        process(e10) {
          return this._append(e10), this._process();
        }
        finalize(e10) {
          return e10 && this._append(e10), this._doFinalize();
        }
      };
      c$._ENC_XFORM_MODE = 1, c$._DEC_XFORM_MODE = 2, c$.keySize = 4, c$.ivSize = 4;
      var cK = class extends cO {
        constructor(e10, t10) {
          super(), this._cipher = e10, this._iv = t10;
        }
        static createEncryptor(e10, t10) {
          return this.Encryptor.create(e10, t10);
        }
        static createDecryptor(e10, t10) {
          return this.Decryptor.create(e10, t10);
        }
      };
      function cH(e10, t10, r10) {
        let s10, i10 = this._iv;
        i10 ? (s10 = i10, this._iv = void 0) : s10 = this._prevBlock;
        for (let i11 = 0; i11 < r10; i11 += 1) e10[t10 + i11] ^= s10[i11];
      }
      var cF = class extends cK {
      };
      cF.Encryptor = class extends cF {
        processBlock(e10, t10) {
          let r10 = this._cipher, { blockSize: s10 } = r10;
          cH.call(this, e10, t10, s10), r10.encryptBlock(e10, t10), this._prevBlock = e10.slice(t10, t10 + s10);
        }
      }, cF.Decryptor = class extends cF {
        processBlock(e10, t10) {
          let r10 = this._cipher, { blockSize: s10 } = r10, i10 = e10.slice(t10, t10 + s10);
          r10.decryptBlock(e10, t10), cH.call(this, e10, t10, s10), this._prevBlock = i10;
        }
      };
      var cW = { pad(e10, t10) {
        let r10 = 4 * t10, s10 = r10 - e10.sigBytes % r10, i10 = s10 << 24 | s10 << 16 | s10 << 8 | s10, n10 = [];
        for (let e11 = 0; e11 < s10; e11 += 4) n10.push(i10);
        let a10 = cT.create(n10, s10);
        e10.concat(a10);
      }, unpad(e10) {
        let t10 = 255 & e10.words[e10.sigBytes - 1 >>> 2];
        e10.sigBytes -= t10;
      } }, cJ = class extends c$ {
        constructor(e10, t10, r10) {
          super(e10, t10, Object.assign({ mode: cF, padding: cW }, r10)), this.blockSize = 4;
        }
        reset() {
          let e10;
          super.reset.call(this);
          let { cfg: t10 } = this, { iv: r10, mode: s10 } = t10;
          this._xformMode === this.constructor._ENC_XFORM_MODE ? e10 = s10.createEncryptor : (e10 = s10.createDecryptor, this._minBufferSize = 1), this._mode = e10.call(s10, this, r10 && r10.words), this._mode.__creator = e10;
        }
        _doProcessBlock(e10, t10) {
          this._mode.processBlock(e10, t10);
        }
        _doFinalize() {
          let e10, { padding: t10 } = this.cfg;
          return this._xformMode === this.constructor._ENC_XFORM_MODE ? (t10.pad(this._data, this.blockSize), e10 = this._process(true)) : (e10 = this._process(true), t10.unpad(e10)), e10;
        }
      }, cG = class extends cO {
        constructor(e10) {
          super(), this.mixIn(e10);
        }
        toString(e10) {
          return (e10 || this.formatter).stringify(this);
        }
      }, cV = class extends cO {
        static encrypt(e10, t10, r10, s10) {
          let i10 = Object.assign(new cO(), this.cfg, s10), n10 = e10.createEncryptor(r10, i10), a10 = n10.finalize(t10), o10 = n10.cfg;
          return cG.create({ ciphertext: a10, key: r10, iv: o10.iv, algorithm: e10, mode: o10.mode, padding: o10.padding, blockSize: n10.blockSize, formatter: i10.format });
        }
        static decrypt(e10, t10, r10, s10) {
          let i10 = t10, n10 = Object.assign(new cO(), this.cfg, s10);
          return i10 = this._parse(i10, n10.format), e10.createDecryptor(r10, n10).finalize(i10.ciphertext);
        }
        static _parse(e10, t10) {
          return "string" == typeof e10 ? t10.parse(e10, this) : e10;
        }
      };
      cV.cfg = Object.assign(new cO(), { format: { stringify(e10) {
        let { ciphertext: t10, salt: r10 } = e10;
        return (r10 ? cT.create([1398893684, 1701076831]).concat(r10).concat(t10) : t10).toString(cL);
      }, parse(e10) {
        let t10, r10 = cL.parse(e10), s10 = r10.words;
        return 1398893684 === s10[0] && 1701076831 === s10[1] && (t10 = cT.create(s10.slice(2, 4)), s10.splice(0, 4), r10.sigBytes -= 16), cG.create({ ciphertext: r10, salt: t10 });
      } } });
      var cX = class extends cV {
        static encrypt(e10, t10, r10, s10) {
          let i10 = Object.assign(new cO(), this.cfg, s10), n10 = i10.kdf.execute(r10, e10.keySize, e10.ivSize, i10.salt, i10.hasher);
          i10.iv = n10.iv;
          let a10 = cV.encrypt.call(this, e10, t10, n10.key, i10);
          return a10.mixIn(n10), a10;
        }
        static decrypt(e10, t10, r10, s10) {
          let i10 = t10, n10 = Object.assign(new cO(), this.cfg, s10);
          i10 = this._parse(i10, n10.format);
          let a10 = n10.kdf.execute(r10, e10.keySize, e10.ivSize, i10.salt, n10.hasher);
          return n10.iv = a10.iv, cV.decrypt.call(this, e10, i10, a10.key, n10);
        }
      };
      cX.cfg = Object.assign(cV.cfg, { kdf: { execute(e10, t10, r10, s10, i10) {
        let n10, a10 = s10;
        a10 || (a10 = cT.random(8)), n10 = i10 ? cB.create({ keySize: t10 + r10, hasher: i10 }).compute(e10, a10) : cB.create({ keySize: t10 + r10 }).compute(e10, a10);
        let o10 = cT.create(n10.words.slice(t10), 4 * r10);
        return n10.sigBytes = 4 * t10, cG.create({ key: n10, iv: o10, salt: a10 });
      } } });
      var cY = [], cQ = [], cZ = [], c0 = [], c1 = [], c2 = [], c3 = [], c4 = [], c5 = [], c6 = [], c7 = [];
      for (let e10 = 0; e10 < 256; e10 += 1) e10 < 128 ? c7[e10] = e10 << 1 : c7[e10] = e10 << 1 ^ 283;
      var c9 = 0, c8 = 0;
      for (let e10 = 0; e10 < 256; e10 += 1) {
        let e11 = c8 ^ c8 << 1 ^ c8 << 2 ^ c8 << 3 ^ c8 << 4;
        e11 = e11 >>> 8 ^ 255 & e11 ^ 99, cY[c9] = e11, cQ[e11] = c9;
        let t10 = c7[c9], r10 = c7[t10], s10 = c7[r10], i10 = 257 * c7[e11] ^ 16843008 * e11;
        cZ[c9] = i10 << 24 | i10 >>> 8, c0[c9] = i10 << 16 | i10 >>> 16, c1[c9] = i10 << 8 | i10 >>> 24, c2[c9] = i10, i10 = 16843009 * s10 ^ 65537 * r10 ^ 257 * t10 ^ 16843008 * c9, c3[e11] = i10 << 24 | i10 >>> 8, c4[e11] = i10 << 16 | i10 >>> 16, c5[e11] = i10 << 8 | i10 >>> 24, c6[e11] = i10, c9 ? (c9 = t10 ^ c7[c7[c7[s10 ^ t10]]], c8 ^= c7[c7[c8]]) : c9 = c8 = 1;
      }
      var le = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], lt = class extends cJ {
        _doReset() {
          let e10;
          if (this._nRounds && this._keyPriorReset === this._key) return;
          this._keyPriorReset = this._key;
          let t10 = this._keyPriorReset, r10 = t10.words, s10 = t10.sigBytes / 4;
          this._nRounds = s10 + 6;
          let i10 = (this._nRounds + 1) * 4;
          this._keySchedule = [];
          let n10 = this._keySchedule;
          for (let t11 = 0; t11 < i10; t11 += 1) t11 < s10 ? n10[t11] = r10[t11] : (e10 = n10[t11 - 1], t11 % s10 ? s10 > 6 && t11 % s10 == 4 && (e10 = cY[e10 >>> 24] << 24 | cY[e10 >>> 16 & 255] << 16 | cY[e10 >>> 8 & 255] << 8 | cY[255 & e10]) : e10 = (cY[(e10 = e10 << 8 | e10 >>> 24) >>> 24] << 24 | cY[e10 >>> 16 & 255] << 16 | cY[e10 >>> 8 & 255] << 8 | cY[255 & e10]) ^ le[t11 / s10 | 0] << 24, n10[t11] = n10[t11 - s10] ^ e10);
          this._invKeySchedule = [];
          let a10 = this._invKeySchedule;
          for (let t11 = 0; t11 < i10; t11 += 1) {
            let r11 = i10 - t11;
            e10 = t11 % 4 ? n10[r11] : n10[r11 - 4], t11 < 4 || r11 <= 4 ? a10[t11] = e10 : a10[t11] = c3[cY[e10 >>> 24]] ^ c4[cY[e10 >>> 16 & 255]] ^ c5[cY[e10 >>> 8 & 255]] ^ c6[cY[255 & e10]];
          }
        }
        encryptBlock(e10, t10) {
          this._doCryptBlock(e10, t10, this._keySchedule, cZ, c0, c1, c2, cY);
        }
        decryptBlock(e10, t10) {
          let r10 = e10[t10 + 1];
          e10[t10 + 1] = e10[t10 + 3], e10[t10 + 3] = r10, this._doCryptBlock(e10, t10, this._invKeySchedule, c3, c4, c5, c6, cQ), r10 = e10[t10 + 1], e10[t10 + 1] = e10[t10 + 3], e10[t10 + 3] = r10;
        }
        _doCryptBlock(e10, t10, r10, s10, i10, n10, a10, o10) {
          let c10 = this._nRounds, l10 = e10[t10] ^ r10[0], u10 = e10[t10 + 1] ^ r10[1], h10 = e10[t10 + 2] ^ r10[2], d10 = e10[t10 + 3] ^ r10[3], p2 = 4;
          for (let e11 = 1; e11 < c10; e11 += 1) {
            let e12 = s10[l10 >>> 24] ^ i10[u10 >>> 16 & 255] ^ n10[h10 >>> 8 & 255] ^ a10[255 & d10] ^ r10[p2];
            p2 += 1;
            let t11 = s10[u10 >>> 24] ^ i10[h10 >>> 16 & 255] ^ n10[d10 >>> 8 & 255] ^ a10[255 & l10] ^ r10[p2];
            p2 += 1;
            let o11 = s10[h10 >>> 24] ^ i10[d10 >>> 16 & 255] ^ n10[l10 >>> 8 & 255] ^ a10[255 & u10] ^ r10[p2];
            p2 += 1;
            let c11 = s10[d10 >>> 24] ^ i10[l10 >>> 16 & 255] ^ n10[u10 >>> 8 & 255] ^ a10[255 & h10] ^ r10[p2];
            p2 += 1, l10 = e12, u10 = t11, h10 = o11, d10 = c11;
          }
          let m2 = (o10[l10 >>> 24] << 24 | o10[u10 >>> 16 & 255] << 16 | o10[h10 >>> 8 & 255] << 8 | o10[255 & d10]) ^ r10[p2];
          p2 += 1;
          let f2 = (o10[u10 >>> 24] << 24 | o10[h10 >>> 16 & 255] << 16 | o10[d10 >>> 8 & 255] << 8 | o10[255 & l10]) ^ r10[p2];
          p2 += 1;
          let g2 = (o10[h10 >>> 24] << 24 | o10[d10 >>> 16 & 255] << 16 | o10[l10 >>> 8 & 255] << 8 | o10[255 & u10]) ^ r10[p2];
          p2 += 1;
          let y2 = (o10[d10 >>> 24] << 24 | o10[l10 >>> 16 & 255] << 16 | o10[u10 >>> 8 & 255] << 8 | o10[255 & h10]) ^ r10[p2];
          p2 += 1, e10[t10] = m2, e10[t10 + 1] = f2, e10[t10 + 2] = g2, e10[t10 + 3] = y2;
        }
      };
      lt.keySize = 8;
      var lr = cJ._createHelper(lt), ls = [], li = class extends cI {
        _doReset() {
          this._hash = new cT([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
        }
        _doProcessBlock(e10, t10) {
          let r10 = this._hash.words, s10 = r10[0], i10 = r10[1], n10 = r10[2], a10 = r10[3], o10 = r10[4];
          for (let r11 = 0; r11 < 80; r11 += 1) {
            if (r11 < 16) ls[r11] = 0 | e10[t10 + r11];
            else {
              let e11 = ls[r11 - 3] ^ ls[r11 - 8] ^ ls[r11 - 14] ^ ls[r11 - 16];
              ls[r11] = e11 << 1 | e11 >>> 31;
            }
            let c10 = (s10 << 5 | s10 >>> 27) + o10 + ls[r11];
            r11 < 20 ? c10 += (i10 & n10 | ~i10 & a10) + 1518500249 : r11 < 40 ? c10 += (i10 ^ n10 ^ a10) + 1859775393 : r11 < 60 ? c10 += (i10 & n10 | i10 & a10 | n10 & a10) - 1894007588 : c10 += (i10 ^ n10 ^ a10) - 899497514, o10 = a10, a10 = n10, n10 = i10 << 30 | i10 >>> 2, i10 = s10, s10 = c10;
          }
          r10[0] = r10[0] + s10 | 0, r10[1] = r10[1] + i10 | 0, r10[2] = r10[2] + n10 | 0, r10[3] = r10[3] + a10 | 0, r10[4] = r10[4] + o10 | 0;
        }
        _doFinalize() {
          let e10 = this._data, t10 = e10.words, r10 = 8 * this._nDataBytes, s10 = 8 * e10.sigBytes;
          return t10[s10 >>> 5] |= 128 << 24 - s10 % 32, t10[(s10 + 64 >>> 9 << 4) + 14] = Math.floor(r10 / 4294967296), t10[(s10 + 64 >>> 9 << 4) + 15] = r10, e10.sigBytes = 4 * t10.length, this._process(), this._hash;
        }
        clone() {
          let e10 = super.clone.call(this);
          return e10._hash = this._hash.clone(), e10;
        }
      }, ln = (cI._createHelper(li), cI._createHmacHelper(li));
      (null == (J = ow.default) ? void 0 : J.version) && isNaN(parseInt(ow.default.version.split(".")[0], 10));
      let la = `
Missing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl.

1) With middleware
   e.g. export default clerkMiddleware({domain:'YOUR_DOMAIN',isSatellite:true});
2) With environment variables e.g.
   NEXT_PUBLIC_CLERK_DOMAIN='YOUR_DOMAIN'
   NEXT_PUBLIC_CLERK_IS_SATELLITE='true'
   `, lo = `
Invalid signInUrl. A satellite application requires a signInUrl for development instances.
Check if signInUrl is missing from your configuration or if it is not an absolute URL

1) With middleware
   e.g. export default clerkMiddleware({signInUrl:'SOME_URL', isSatellite:true});
2) With environment variables e.g.
   NEXT_PUBLIC_CLERK_SIGN_IN_URL='SOME_URL'
   NEXT_PUBLIC_CLERK_IS_SATELLITE='true'`, lc = `Clerk: Unable to decrypt request data.

Refresh the page if your .env file was just updated. If the issue persists, ensure the encryption key is valid and properly set.

For more information, see: https://clerk.com/docs/reference/nextjs/clerk-middleware#dynamic-keys. (code=encryption_key_invalid)`, ll = rg({ packageName: "@clerk/nextjs" }), lu = "x-middleware-override-headers", lh = "x-middleware-request", ld = (e10, t10, r10) => {
        e10.headers.get(lu) || (e10.headers.set(lu, [...t10.headers.keys()]), t10.headers.forEach((t11, r11) => {
          e10.headers.set(`${lh}-${r11}`, t11);
        })), Object.entries(r10).forEach(([t11, r11]) => {
          e10.headers.set(lu, `${e10.headers.get(lu)},${t11}`), e10.headers.set(`${lh}-${t11}`, r11);
        });
      }, lp = (e10) => er.redirect(e10, { headers: { [sS]: "true" } }), lm = "clerk_keyless_dummy_key";
      function lf() {
        if (tY()) throw Error("Clerk: Unable to decrypt request data, this usually means the encryption key is invalid. Ensure the encryption key is properly set. For more information, see: https://clerk.com/docs/reference/nextjs/clerk-middleware#dynamic-keys. (code=encryption_key_invalid)");
        throw Error(lc);
      }
      function lg(e10, t10) {
        return JSON.parse(lr.decrypt(e10, t10).toString(cA));
      }
      let ly = async () => {
        var e10, t10;
        let r10;
        try {
          let e11 = await oG(), t11 = o2(e11, sO);
          r10 = function(e12) {
            if (!e12) return {};
            let t12 = tY() ? oR || oO : oR || oO || lm;
            try {
              return lg(e12, t12);
            } catch {
              if (oq) try {
                return lg(e12, lm);
              } catch {
                lf();
              }
              lf();
            }
          }(t11);
        } catch (e11) {
          if (e11 && oW(e11) || e11 && e11 instanceof Error && oz in e11) throw e11;
        }
        let s10 = null != (t10 = null == (e10 = o5.getStore()) ? void 0 : e10.get("requestData")) ? t10 : r10;
        return (null == s10 ? void 0 : s10.secretKey) || (null == s10 ? void 0 : s10.publishableKey) ? o1(s10) : o1({});
      };
      class lb {
        static createDefaultDirectives() {
          return Object.entries(this.DEFAULT_DIRECTIVES).reduce((e10, [t10, r10]) => (e10[t10] = new Set(r10), e10), {});
        }
        static isKeyword(e10) {
          return this.KEYWORDS.has(e10.replace(/^'|'$/g, ""));
        }
        static formatValue(e10) {
          let t10 = e10.replace(/^'|'$/g, "");
          return this.isKeyword(t10) ? `'${t10}'` : e10;
        }
        static handleDirectiveValues(e10) {
          let t10 = /* @__PURE__ */ new Set();
          return e10.includes("'none'") || e10.includes("none") ? t10.add("'none'") : e10.forEach((e11) => t10.add(this.formatValue(e11))), t10;
        }
      }
      lb.KEYWORDS = /* @__PURE__ */ new Set(["none", "self", "strict-dynamic", "unsafe-eval", "unsafe-hashes", "unsafe-inline"]), lb.DEFAULT_DIRECTIVES = { "connect-src": ["self", "https://clerk-telemetry.com", "https://*.clerk-telemetry.com", "https://api.stripe.com", "https://maps.googleapis.com", "https://img.clerk.com", "https://images.clerkstage.dev"], "default-src": ["self"], "form-action": ["self"], "frame-src": ["self", "https://challenges.cloudflare.com", "https://*.js.stripe.com", "https://js.stripe.com", "https://hooks.stripe.com"], "img-src": ["self", "https://img.clerk.com"], "script-src": ["self", "unsafe-inline", "https:", "http:", "https://*.js.stripe.com", "https://js.stripe.com", "https://maps.googleapis.com"], "style-src": ["self", "unsafe-inline"], "worker-src": ["self", "blob:"] };
      let lw = "__clerk_keys_";
      async function lv(e10) {
        let t10 = new TextEncoder().encode(e10);
        return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", t10))).map((e11) => e11.toString(16).padStart(2, "0")).join("").slice(0, 16);
      }
      async function lx() {
        let e10 = process.env.PWD;
        if (!e10) return `${lw}0`;
        let t10 = e10.split("/").filter(Boolean).slice(-3).reverse().join("/"), r10 = await lv(t10);
        return `${lw}${r10}`;
      }
      async function l_(e10) {
        let t10;
        if (!oq) return;
        let r10 = await lx();
        try {
          t10 = JSON.parse(e10(r10) || "{}");
        } catch {
          t10 = void 0;
        }
        return t10;
      }
      let lk = "CLERK_PROTECT_REDIRECT_TO_SIGN_IN", lE = "CLERK_PROTECT_REDIRECT_TO_SIGN_UP", lS = { NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 }, lO = new Set(Object.values(lS)), lT = "NEXT_HTTP_ERROR_FALLBACK";
      function lC(e10) {
        if (!function(e11) {
          if ("object" != typeof e11 || null === e11 || !("digest" in e11) || "string" != typeof e11.digest) return false;
          let [t11, r10] = e11.digest.split(";");
          return t11 === lT && lO.has(Number(r10));
        }(e10)) return;
        let [, t10] = e10.digest.split(";");
        return Number(t10);
      }
      let lR = "NEXT_REDIRECT";
      function lA(e10, t10, r10 = "replace", s10 = 307) {
        let i10 = Error(lR);
        throw i10.digest = `${lR};${r10};${e10};${s10};`, i10.clerk_digest = "CLERK_PROTECT_REDIRECT_TO_URL", Object.assign(i10, t10), i10;
      }
      function lP(e10, t10) {
        return null === t10 ? "" : t10 || e10;
      }
      function lI(e10) {
        if ("object" != typeof e10 || null === e10 || !("digest" in e10) || "string" != typeof e10.digest) return false;
        let t10 = e10.digest.split(";"), [r10, s10] = t10, i10 = t10.slice(2, -2).join(";"), n10 = Number(t10.at(-2));
        return r10 === lR && ("replace" === s10 || "push" === s10) && "string" == typeof i10 && !isNaN(n10) && 307 === n10;
      }
      function lN() {
        let e10 = Error(lT);
        throw e10.digest = `${lT};${lS.UNAUTHORIZED}`, e10;
      }
      let lL = ["role", "permission", "feature", "plan", "reverification"], lU = (e10) => {
        var t10, r10;
        return !!e10.headers.get(om) && ((null == (t10 = e10.headers.get(sy)) ? void 0 : t10.includes("text/x-component")) || (null == (r10 = e10.headers.get(sR)) ? void 0 : r10.includes("multipart/form-data")) || !!e10.headers.get(of));
      }, lM = (e10) => !!e10.headers.get(om) && !lU(e10) || lD(), lD = () => {
        let e10 = globalThis.fetch;
        if (!("__nextPatched" in e10 && true === e10.__nextPatched)) return false;
        let { page: t10 } = e10.__nextGetStaticStore().getStore() || {};
        return !!t10;
      }, lj = (e10) => !!e10.headers.get(og);
      async function lq({ clerkRequest: e10, request: t10, event: r10, requestState: s10, handler: i10, options: n10, resolvedParams: a10, keyless: o10, logger: c10 }) {
        var l10, u10, h10, d10, p2;
        let { publishableKey: m2, secretKey: f2 } = n10;
        c10.debug("requestState", () => ({ status: s10.status, headers: JSON.stringify(Object.fromEntries(s10.headers)), reason: s10.reason }));
        let g2 = s10.headers.get(sM);
        if (g2) {
          !function({ locationHeader: e12, requestStateHeaders: t11, publishableKey: r11 }) {
            let s11 = !("u" < typeof process) && !!process.env && (!!process.env.NETLIFY || !!process.env.NETLIFY_FUNCTIONS_TOKEN || "string" == typeof process.env.URL && process.env.URL.endsWith("netlify.app")), i11 = r11.startsWith("test_") || r11.startsWith("pk_test_");
            if (s11 && i11 && !e12.includes("__clerk_handshake")) {
              let r12 = new URL(e12);
              r12.searchParams.append("__clerk_netlify_cache_bust", Date.now().toString()), t11.set("Location", r12.toString());
            }
          }({ locationHeader: g2, requestStateHeaders: s10.headers, publishableKey: s10.publishableKey });
          let e11 = er.redirect(s10.headers.get(sM) || g2);
          return s10.headers.forEach((t11, r11) => {
            r11 !== sM && e11.headers.append(r11, t11);
          }), e11;
        }
        if (s10.status === aM) throw Error("Clerk: handshake status without redirect");
        let y2 = s10.toAuth();
        c10.debug("auth", () => ({ auth: y2, debug: y2.debug() }));
        let b2 = lz(e10), w2 = lB(e10), v2 = await l$(e10, y2, b2), x2 = lK(s10, b2, w2);
        x2.protect = v2;
        let _2 = er.next();
        try {
          _2 = await o5.run(o4, async () => null == i10 ? void 0 : i10(x2, t10, r10)) || _2;
        } catch (r11) {
          _2 = lH(r11, e10, t10, s10);
        }
        if (n10.contentSecurityPolicy) {
          let t11, r11, s11, i11, { headers: a11 } = (h10 = (null != (u10 = null == (l10 = re(m2)) ? void 0 : l10.frontendApi) ? u10 : "").replace("$", ""), d10 = n10.contentSecurityPolicy, t11 = [], s11 = d10.strict ? (r11 = new Uint8Array(16), crypto.getRandomValues(r11), btoa(Array.from(r11, (e11) => String.fromCharCode(e11)).join(""))) : void 0, i11 = function(e11, t12, r12, s12) {
            let i12 = Object.entries(lb.DEFAULT_DIRECTIVES).reduce((e12, [t13, r13]) => (e12[t13] = new Set(r13), e12), {});
            if (i12["connect-src"].add(t12), e11 && (i12["script-src"].delete("http:"), i12["script-src"].delete("https:"), i12["script-src"].add("'strict-dynamic'"), s12 && i12["script-src"].add(`'nonce-${s12}'`)), r12) {
              let e12 = /* @__PURE__ */ new Map();
              Object.entries(r12).forEach(([t13, r13]) => {
                let s13 = Array.isArray(r13) ? r13 : [r13];
                lb.DEFAULT_DIRECTIVES[t13] ? function(e13, t14, r14) {
                  if (r14.includes("'none'") || r14.includes("none")) {
                    e13[t14] = /* @__PURE__ */ new Set(["'none'"]);
                    return;
                  }
                  let s14 = /* @__PURE__ */ new Set();
                  e13[t14].forEach((e14) => {
                    s14.add(lb.formatValue(e14));
                  }), r14.forEach((e14) => {
                    s14.add(lb.formatValue(e14));
                  }), e13[t14] = s14;
                }(i12, t13, s13) : function(e13, t14, r14) {
                  if (r14.includes("'none'") || r14.includes("none")) return e13.set(t14, /* @__PURE__ */ new Set(["'none'"]));
                  let s14 = /* @__PURE__ */ new Set();
                  r14.forEach((e14) => {
                    let t15 = lb.formatValue(e14);
                    s14.add(t15);
                  }), e13.set(t14, s14);
                }(e12, t13, s13);
              }), e12.forEach((e13, t13) => {
                i12[t13] = e13;
              });
            }
            return Object.entries(i12).sort(([e12], [t13]) => e12.localeCompare(t13)).map(([e12, t13]) => {
              let r13 = Array.from(t13).map((e13) => ({ raw: e13, formatted: lb.formatValue(e13) }));
              return `${e12} ${r13.map((e13) => e13.formatted).join(" ")}`;
            }).join("; ");
          }(null != (p2 = d10.strict) && p2, h10, d10.directives, s11), d10.reportTo && (i11 += "; report-to csp-endpoint", t11.push([s$, `csp-endpoint="${d10.reportTo}"`])), d10.reportOnly ? t11.push([sP, i11]) : t11.push([sA, i11]), s11 && t11.push([sD, s11]), { headers: t11 }), o11 = {};
          a11.forEach(([e11, t12]) => {
            oy(_2, e11, t12), o11[e11] = t12;
          }), ld(_2, e10, o11), c10.debug("Clerk generated CSP", () => ({ headers: a11 }));
        }
        if (s10.headers && s10.headers.forEach((e11, t11) => {
          t11 === sA && c10.debug("Content-Security-Policy detected", () => ({ value: e11 })), _2.headers.append(t11, e11);
        }), _2.headers.get(op)) return c10.debug("handlerResult is redirect"), ((e11, t11, r11) => {
          let s11 = t11.headers.get("location");
          if ("true" === t11.headers.get(sS) && s11 && rs(r11.secretKey) && e11.clerkUrl.isCrossOrigin(s11)) {
            var i11;
            let r12, n11, a11, o11 = e11.cookies.get(ob) || "", c11 = (i11 = new URL(s11), n11 = (r12 = new URL(i11)).searchParams.get(ob), r12.searchParams.delete(ob), (a11 = n11 || o11) && r12.searchParams.set(ob, a11), r12);
            return er.redirect(c11.href, t11);
          }
          return t11;
        })(e10, _2, n10);
        n10.debug && ld(_2, e10, { [sI]: "true" });
        let k2 = f2 === (null == o10 ? void 0 : o10.secretKey) ? { publishableKey: null == o10 ? void 0 : o10.publishableKey, secretKey: null == o10 ? void 0 : o10.secretKey } : {};
        return !function(e11, t11, r11, s11, i11, n11) {
          let a11, { reason: o11, message: c11, status: l11, token: u11 } = r11;
          if (t11 || (t11 = er.next()), t11.headers.get(op)) return;
          "1" === t11.headers.get(od) && (t11.headers.delete(od), a11 = new URL(e11.url));
          let h11 = t11.headers.get(oh);
          if (h11) {
            let t12 = new URL(e11.url);
            if ((a11 = new URL(h11)).origin !== t12.origin) return;
          }
          if (a11) {
            let r12 = function(e12, t12, r13) {
              var s12;
              let i12 = (e13) => !e13 || !Object.values(e13).some((e14) => void 0 !== e14);
              if (i12(e12) && i12(t12) && !r13) return;
              if (e12.secretKey && !oR) throw Error("Clerk: Missing `CLERK_ENCRYPTION_KEY`. Required for propagating `secretKey` middleware option. See docs: https://clerk.com/docs/references/nextjs/clerk-middleware#dynamic-keys. (code=encryption_key_missing)");
              let n12 = tY() ? oR || (s12 = () => ll.throwMissingSecretKeyError(), oO || s12(), oO) : oR || oO || lm;
              return lr.encrypt(JSON.stringify({ ...t12, ...e12, machineAuthObject: null != r13 ? r13 : void 0 }), n12).toString();
            }(s11, i11, n11);
            ld(t11, e11, { [s_]: l11, [sk]: u11 || "", [sx]: u11 ? ln(u11, (null == s11 ? void 0 : s11.secretKey) || oO || i11.secretKey || "").toString() : "", [sb]: c11 || "", [sv]: o11 || "", [sT]: e11.clerkUrl.toString(), ...r12 ? { [sO]: r12 } : {} }), t11.headers.set(oh, a11.href);
          }
        }(e10, _2, s10, a10, k2, "session_token" === y2.tokenType ? null : ((e11) => {
          let { debug: t11, getToken: r11, has: s11, ...i11 } = e11;
          return i11;
        })(y2)), _2;
      }
      let lz = (e10) => (t10 = {}) => {
        var r10;
        r10 = e10.clerkUrl.toString(), lA(r10, { clerk_digest: lk, returnBackUrl: lP(r10, t10.returnBackUrl) });
      }, lB = (e10) => (t10 = {}) => {
        var r10;
        r10 = e10.clerkUrl.toString(), lA(r10, { clerk_digest: lE, returnBackUrl: lP(r10, t10.returnBackUrl) });
      }, l$ = (e10, t10, r10) => async (s10, i10) => function(e11) {
        let { redirectToSignIn: t11, authObject: r11, redirect: s11, notFound: i11, request: n10, unauthorized: a10 } = e11;
        return async (...e12) => {
          var o10, c10, l10, u10, h10, d10, p2, m2;
          let f2 = ((e13) => {
            if (!e13) return;
            if ("function" == typeof e13) return e13;
            let t12 = {};
            for (let r12 of lL) void 0 !== e13[r12] && (t12[r12] = e13[r12]);
            if (0 !== Object.keys(t12).length) return t12;
          })(e12[0]), g2 = (null == (o10 = e12[0]) ? void 0 : o10.unauthenticatedUrl) || (null == (c10 = e12[1]) ? void 0 : c10.unauthenticatedUrl), y2 = (null == (l10 = e12[0]) ? void 0 : l10.unauthorizedUrl) || (null == (u10 = e12[1]) ? void 0 : u10.unauthorizedUrl), b2 = (null == (h10 = e12[0]) ? void 0 : h10.token) || (null == (d10 = e12[1]) ? void 0 : d10.token) || sG, w2 = () => r11.tokenType === sG && iK(sG, b2) ? y2 ? s11(y2) : i11() : a10();
          if (!iK(r11.tokenType, b2)) return w2();
          if (r11.tokenType !== sG) return r11.isAuthenticated ? r11 : w2();
          if ("pending" === r11.sessionStatus || !r11.userId) {
            return g2 ? s11(g2) : "document" === (p2 = n10).headers.get(sz) || "iframe" === p2.headers.get(sz) || (null == (m2 = p2.headers.get(sy)) ? void 0 : m2.includes("text/html")) || lM(p2) || lj(p2) ? t11() : lU(n10) ? a10() : i11();
          }
          return f2 ? "function" == typeof f2 ? f2(r11.has) ? r11 : w2() : r11.has(f2) ? r11 : w2() : r11;
        };
      }({ request: e10, redirect: (e11) => lA(e11, { redirectUrl: e11 }), notFound: () => function() {
        let e11 = Object.defineProperty(Error(ou), "__NEXT_ERROR_CODE", { value: "E1041", enumerable: false, configurable: true });
        throw e11.digest = ou, e11;
      }(), unauthorized: lN, authObject: aL({ authObject: t10, acceptsToken: (null == s10 ? void 0 : s10.token) || (null == i10 ? void 0 : i10.token) || sG }), redirectToSignIn: r10 })(s10, i10), lK = (e10, t10, r10) => async (s10) => {
        var i10;
        let n10 = e10.toAuth({ treatPendingAsSignedOut: null == s10 ? void 0 : s10.treatPendingAsSignedOut }), a10 = null != (i10 = null == s10 ? void 0 : s10.acceptsToken) ? i10 : sG, o10 = aL({ authObject: n10, acceptsToken: a10 });
        return o10.tokenType === sG && iK(sG, a10) ? Object.assign(o10, { redirectToSignIn: t10, redirectToSignUp: r10 }) : o10;
      }, lH = (e10, t10, r10, s10) => {
        var i10;
        if (e10 instanceof Error && "MalformedURLError" === e10.name) return new er(null, { status: 400, statusText: "Bad Request" });
        if (lC(e10) === lS.UNAUTHORIZED) {
          let e11 = new er(null, { status: 401 }), t11 = s10.toAuth();
          if (t11 && t11.tokenType === sY) {
            let t12 = re(s10.publishableKey);
            return oy(e11, "WWW-Authenticate", `Bearer resource_metadata="https://${null == t12 ? void 0 : t12.frontendApi}/.well-known/oauth-protected-resource"`);
          }
          return e11;
        }
        if ("object" == typeof e10 && null !== e10 && "digest" in e10 && "NEXT_NOT_FOUND" === e10.digest || lC(e10) === lS.NOT_FOUND) return oy(er.rewrite(new URL(`/clerk_${Date.now()}`, r10.url)), sv, "protect-rewrite");
        let n10 = !!lI(e10) && "clerk_digest" in e10 && e10.clerk_digest === lk, a10 = !!lI(e10) && "clerk_digest" in e10 && e10.clerk_digest === lE;
        if (n10 || a10) {
          let r11 = ((e11) => {
            let { publishableKey: t11, redirectAdapter: r12, signInUrl: s11, signUpUrl: i11, baseUrl: n11, sessionStatus: a12, isSatellite: o10 } = e11, c10 = re(t11), l10 = c10?.frontendApi, u10 = c10?.instanceType === "development", h10 = r5(l10), d10 = "pending" === a12, p2 = (t12, { returnBackUrl: s12 }) => r12(sH(n11, `${t12}/tasks`, s12, u10 ? e11.devBrowserToken : null, o10));
            return { redirectToSignUp: ({ returnBackUrl: t12 } = {}) => {
              i11 || h10 || ry.throwMissingPublishableKeyError();
              let a13 = `${h10}/sign-up`, c11 = i11 || function(e12) {
                if (!e12) return;
                let t13 = new URL(e12, n11);
                return t13.pathname = `${t13.pathname}/create`, t13.toString();
              }(s11) || a13;
              return d10 ? p2(c11, { returnBackUrl: t12 }) : r12(sH(n11, c11, t12, u10 ? e11.devBrowserToken : null, o10));
            }, redirectToSignIn: ({ returnBackUrl: t12 } = {}) => {
              s11 || h10 || ry.throwMissingPublishableKeyError();
              let i12 = `${h10}/sign-in`, a13 = s11 || i12;
              return d10 ? p2(a13, { returnBackUrl: t12 }) : r12(sH(n11, a13, t12, u10 ? e11.devBrowserToken : null, o10));
            } };
          })({ redirectAdapter: lp, baseUrl: t10.clerkUrl, signInUrl: s10.signInUrl, signUpUrl: s10.signUpUrl, publishableKey: s10.publishableKey, sessionStatus: null == (i10 = s10.toAuth()) ? void 0 : i10.sessionStatus, isSatellite: s10.isSatellite }), { returnBackUrl: a11 } = e10;
          return r11[n10 ? "redirectToSignIn" : "redirectToSignUp"]({ returnBackUrl: a11 });
        }
        if (lI(e10)) return lp(e10.redirectUrl);
        throw e10;
      }, lF = (e10) => {
        let t10;
        if ("function" == typeof e10) return (t11) => e10(t11);
        let r10 = (t10 = [e10 || ""].flat().filter(Boolean).map((e11) => e11 instanceof RegExp ? e11 : ((e12) => {
          try {
            return sl(e12);
          } catch (t11) {
            throw Error(`Invalid path: ${e12}.
Consult the documentation of path-to-regexp here: https://github.com/pillarjs/path-to-regexp/tree/6.x
${t11.message}`);
          }
        })(e11)), (e11) => t10.some((t11) => t11.test(((e12) => {
          try {
            e12 = decodeURI(e12);
          } catch (t12) {
            throw new oc(e12, t12);
          }
          return e12.replace(/\/\/+/g, "/");
        })(e11))));
        return (e11) => r10(e11.nextUrl.pathname);
      };
      var lW = e.i(15834);
      let lJ = globalThis.crypto.subtle;
      var lG = Object.defineProperty, lV = {}, lX = { UpstashError: () => lQ, UpstashJSONParseError: () => l0, UrlError: () => lZ };
      for (var lY in lX) lG(lV, lY, { get: lX[lY], enumerable: true });
      var lQ = class extends Error {
        constructor(e10, t10) {
          super(e10, t10), this.name = "UpstashError";
        }
      }, lZ = class extends Error {
        constructor(e10) {
          super(`Upstash Redis client was passed an invalid URL. You should pass a URL starting with https. Received: "${e10}". `), this.name = "UrlError";
        }
      }, l0 = class extends lQ {
        constructor(e10, t10) {
          const r10 = e10.length > 200 ? e10.slice(0, 200) + "..." : e10;
          super(`Unable to parse response body: ${r10}`, t10), this.name = "UpstashJSONParseError";
        }
      };
      function l1(e10) {
        try {
          return function e11(t10) {
            let r10 = Array.isArray(t10) ? t10.map((t11) => {
              try {
                return e11(t11);
              } catch {
                return t11;
              }
            }) : JSON.parse(t10);
            return "number" == typeof r10 && r10.toString() !== t10 ? t10 : r10;
          }(e10);
        } catch {
          return e10;
        }
      }
      function l2(e10) {
        return [e10[0], ...l1(e10.slice(1))];
      }
      function l3(e10) {
        let [t10, r10] = e10, s10 = [];
        for (let e11 = 0; e11 < r10.length; e11 += 2) s10.push({ key: r10[e11], type: r10[e11 + 1] });
        return [t10, s10];
      }
      function l4(e10) {
        if ("object" == typeof e10 && null !== e10 && !Array.isArray(e10)) return e10;
        if (!Array.isArray(e10)) return {};
        let t10 = {};
        for (let r10 = 0; r10 < e10.length; r10 += 2) "string" == typeof e10[r10] && (t10[e10[r10]] = e10[r10 + 1]);
        return t10;
      }
      var l5 = class {
        baseUrl;
        headers;
        options;
        readYourWrites;
        upstashSyncToken = "";
        hasCredentials;
        retry;
        constructor(e10) {
          if (this.options = { backend: e10.options?.backend, agent: e10.agent, responseEncoding: e10.responseEncoding ?? "base64", cache: e10.cache, signal: e10.signal, keepAlive: e10.keepAlive ?? true }, this.upstashSyncToken = "", this.readYourWrites = e10.readYourWrites ?? true, this.baseUrl = (e10.baseUrl || "").replace(/\/$/, ""), this.baseUrl && !/^https?:\/\/[^\s#$./?].\S*$/.test(this.baseUrl)) throw new lZ(this.baseUrl);
          this.headers = { "Content-Type": "application/json", ...e10.headers }, this.hasCredentials = !!(this.baseUrl && this.headers.authorization.split(" ")[1]), "base64" === this.options.responseEncoding && (this.headers["Upstash-Encoding"] = "base64"), this.retry = "boolean" != typeof e10.retry || e10.retry ? { attempts: e10.retry?.retries ?? 5, backoff: e10.retry?.backoff ?? ((e11) => 50 * Math.exp(e11)) } : { attempts: 1, backoff: () => 0 };
        }
        mergeTelemetry(e10) {
          this.headers = l9(this.headers, "Upstash-Telemetry-Runtime", e10.runtime), this.headers = l9(this.headers, "Upstash-Telemetry-Platform", e10.platform), this.headers = l9(this.headers, "Upstash-Telemetry-Sdk", e10.sdk);
        }
        async request(e10) {
          let t10, r10 = function(...e11) {
            let t11 = {};
            for (let r11 of e11) if (r11) for (let [e12, s11] of Object.entries(r11)) null != s11 && (t11[e12] = s11);
            return t11;
          }(this.headers, e10.headers ?? {}), s10 = [this.baseUrl, ...e10.path ?? []].join("/"), i10 = "text/event-stream" === r10.Accept, n10 = e10.signal ?? this.options.signal, a10 = "function" == typeof n10, o10 = { cache: this.options.cache, method: "POST", headers: r10, body: JSON.stringify(e10.body), keepalive: this.options.keepAlive, agent: this.options.agent, signal: a10 ? n10() : n10, backend: this.options.backend };
          if (this.hasCredentials || console.warn("[Upstash Redis] Redis client was initialized without url or token. Failed to execute command."), this.readYourWrites) {
            let e11 = this.upstashSyncToken;
            this.headers["upstash-sync-token"] = e11;
          }
          let c10 = null, l10 = null;
          for (let e11 = 0; e11 <= this.retry.attempts; e11++) try {
            c10 = await fetch(s10, o10);
            break;
          } catch (t11) {
            if (o10.signal?.aborted && a10) throw t11;
            if (o10.signal?.aborted) {
              c10 = new Response(new Blob([JSON.stringify({ result: o10.signal.reason ?? "Aborted" })]), { status: 200, statusText: o10.signal.reason ?? "Aborted" });
              break;
            }
            l10 = t11, e11 < this.retry.attempts && await new Promise((t12) => setTimeout(t12, this.retry.backoff(e11)));
          }
          if (!c10) throw l10 ?? Error("Exhausted all retries");
          if (!c10.ok) {
            let t11, r11 = await c10.text();
            try {
              t11 = JSON.parse(r11);
            } catch (e11) {
              throw new l0(r11, { cause: e11 });
            }
            throw new lQ(`${t11.error}, command was: ${JSON.stringify(e10.body)}`);
          }
          if (this.readYourWrites) {
            let e11 = c10.headers;
            this.upstashSyncToken = e11.get("upstash-sync-token") ?? "";
          }
          if (i10 && e10 && e10.onMessage && c10.body) {
            let t11 = c10.body.getReader(), r11 = new TextDecoder();
            return (async () => {
              try {
                let s11 = "";
                for (; ; ) {
                  let { value: i11, done: n11 } = await t11.read();
                  if (n11) break;
                  let a11 = (s11 += r11.decode(i11, { stream: true })).split("\n");
                  if ((s11 = a11.pop() || "").length > 1048576) throw Error("Buffer size exceeded (1MB)");
                  for (let t12 of a11) if (t12.startsWith("data: ")) {
                    let r12 = t12.slice(6);
                    e10.onMessage?.(r12);
                  }
                }
              } catch (e11) {
                e11 instanceof Error && "AbortError" === e11.name || console.error("Stream reading error:", e11);
              } finally {
                try {
                  await t11.cancel();
                } catch {
                }
              }
            })(), { result: 1 };
          }
          let u10 = await c10.text();
          try {
            t10 = JSON.parse(u10);
          } catch (e11) {
            throw new l0(u10, { cause: e11 });
          }
          if (this.readYourWrites) {
            let e11 = c10.headers;
            this.upstashSyncToken = e11.get("upstash-sync-token") ?? "";
          }
          return "base64" === this.options.responseEncoding ? Array.isArray(t10) ? t10.map(({ result: e11, error: t11 }) => ({ result: l7(e11), error: t11 })) : { result: l7(t10.result), error: t10.error } : t10;
        }
      };
      function l6(e10) {
        let t10 = "";
        try {
          let r10 = atob(e10), s10 = r10.length, i10 = new Uint8Array(s10);
          for (let e11 = 0; e11 < s10; e11++) i10[e11] = r10.charCodeAt(e11);
          t10 = new TextDecoder().decode(i10);
        } catch {
          t10 = e10;
        }
        return t10;
      }
      function l7(e10) {
        let t10;
        switch (typeof e10) {
          case "undefined":
            return e10;
          case "number":
            t10 = e10;
            break;
          case "object":
            t10 = Array.isArray(e10) ? e10.map((e11) => "string" == typeof e11 ? l6(e11) : Array.isArray(e11) ? e11.map((e12) => l7(e12)) : e11) : null;
            break;
          case "string":
            t10 = "OK" === e10 ? "OK" : l6(e10);
        }
        return t10;
      }
      function l9(e10, t10, r10) {
        return r10 && (e10[t10] = e10[t10] ? [e10[t10], r10].join(",") : r10), e10;
      }
      var l8 = (e10) => {
        switch (typeof e10) {
          case "string":
          case "number":
          case "boolean":
            return e10;
          default:
            return JSON.stringify(e10);
        }
      }, ue = class {
        command;
        serialize;
        deserialize;
        headers;
        path;
        onMessage;
        isStreaming;
        signal;
        constructor(e10, t10) {
          if (this.serialize = l8, this.deserialize = t10?.automaticDeserialization === void 0 || t10.automaticDeserialization ? t10?.deserialize ?? l1 : (e11) => e11, this.command = e10.map((e11) => this.serialize(e11)), this.headers = t10?.headers, this.path = t10?.path, this.onMessage = t10?.streamOptions?.onMessage, this.isStreaming = t10?.streamOptions?.isStreaming ?? false, this.signal = t10?.streamOptions?.signal, t10?.latencyLogging) {
            const e11 = this.exec.bind(this);
            this.exec = async (t11) => {
              let r10 = performance.now(), s10 = await e11(t11), i10 = (performance.now() - r10).toFixed(2);
              return console.log(`Latency for \x1B[38;2;19;185;39m${this.command[0].toString().toUpperCase()}\x1B[0m: \x1B[38;2;0;255;255m${i10} ms\x1B[0m`), s10;
            };
          }
        }
        async exec(e10) {
          let { result: t10, error: r10 } = await e10.request({ body: this.command, path: this.path, upstashSyncToken: e10.upstashSyncToken, headers: this.headers, onMessage: this.onMessage, isStreaming: this.isStreaming, signal: this.signal });
          if (r10) throw new lQ(r10);
          if (void 0 === t10) throw TypeError("Request did not return a result");
          return this.deserialize(t10);
        }
      }, ut = class extends ue {
        constructor(e10, t10) {
          super(e10.map((e11) => "string" == typeof e11 ? e11 : String(e11)), t10);
        }
      }, ur = ["TEXT", "U64", "I64", "F64", "BOOL", "DATE", "KEYWORD", "FACET"];
      function us(e10) {
        return "string" == typeof e10 && ur.includes(e10);
      }
      function ui(e10) {
        return "object" == typeof e10 && null !== e10 && "type" in e10 && us(e10.type);
      }
      function un(e10) {
        let t10 = {};
        for (let r10 = 0; r10 < e10.length; r10 += 2) {
          let s10 = e10[r10], i10 = e10[r10 + 1];
          if (Array.isArray(i10) && i10.length > 0) "string" == typeof i10[0] ? t10[s10] = un(i10) : Array.isArray(i10[0]) && "string" == typeof i10[0][0] ? t10[s10] = i10.map((e11) => un(e11)) : t10[s10] = i10;
          else t10[s10] = "string" != typeof i10 || "" === i10 || Number.isNaN(Number(i10)) ? i10 : Number(i10);
        }
        return t10;
      }
      function ua(e10, t10, r10) {
        let s10 = [e10, t10, JSON.stringify(r10?.filter ?? {})];
        if (r10?.limit !== void 0 && s10.push("LIMIT", r10.limit.toString()), r10?.offset !== void 0 && s10.push("OFFSET", r10.offset.toString()), r10?.select && 0 === Object.keys(r10.select).length && s10.push("NOCONTENT"), r10) if ("orderBy" in r10 && r10.orderBy) for (let [e11, t11] of (s10.push("ORDERBY"), Object.entries(r10.orderBy))) s10.push(e11, t11);
        else "scoreFunc" in r10 && r10.scoreFunc && s10.push("SCOREFUNC", ...function(e11) {
          let t11 = [];
          if ("string" == typeof e11) t11.push("FIELDVALUE", e11);
          else if ("fields" in e11) for (let r11 of (e11.combineMode && t11.push("COMBINEMODE", e11.combineMode.toUpperCase()), e11.scoreMode && t11.push("SCOREMODE", e11.scoreMode.toUpperCase()), e11.fields)) t11.push(...uo(r11));
          else t11.push(...uo(e11));
          return t11;
        }(r10.scoreFunc));
        return r10?.highlight && (s10.push("HIGHLIGHT", "FIELDS", r10.highlight.fields.length.toString(), ...r10.highlight.fields), r10.highlight.preTag && r10.highlight.postTag && s10.push("TAGS", r10.highlight.preTag, r10.highlight.postTag)), r10?.select && Object.keys(r10.select).length > 0 && s10.push("SELECT", Object.keys(r10.select).length.toString(), ...Object.keys(r10.select)), s10;
      }
      function uo(e10) {
        let t10 = [];
        return "string" == typeof e10 ? t10.push("FIELDVALUE", e10) : (e10.scoreMode && t10.push("SCOREMODE", e10.scoreMode.toUpperCase()), t10.push("FIELDVALUE", e10.field), e10.modifier && t10.push("MODIFIER", e10.modifier.toUpperCase()), void 0 !== e10.factor && t10.push("FACTOR", e10.factor.toString()), void 0 !== e10.missing && t10.push("MISSING", e10.missing.toString())), t10;
      }
      var uc = class {
        name;
        schema;
        client;
        constructor({ name: e10, schema: t10, client: r10 }) {
          this.name = e10, this.schema = t10, this.client = r10;
        }
        async waitIndexing() {
          let e10 = ["SEARCH.WAITINDEXING", this.name];
          return await new ut(e10).exec(this.client);
        }
        async describe() {
          let e10 = ["SEARCH.DESCRIBE", this.name], t10 = await new ut(e10).exec(this.client);
          return t10 ? function(e11) {
            let t11 = {};
            for (let r10 = 0; r10 < e11.length; r10 += 2) switch (e11[r10]) {
              case "name":
                t11.name = e11[r10 + 1];
                break;
              case "type":
                t11.dataType = e11[r10 + 1].toLowerCase();
                break;
              case "prefixes":
                t11.prefixes = e11[r10 + 1];
                break;
              case "language":
                t11.language = e11[r10 + 1];
                break;
              case "schema": {
                let s10 = {};
                for (let t12 of e11[r10 + 1]) {
                  let e12 = t12[0], r11 = { type: t12[1] };
                  if (t12.length > 2) for (let e13 = 2; e13 < t12.length; e13++) switch (t12[e13]) {
                    case "NOSTEM":
                      r11.noStem = true;
                      break;
                    case "NOTOKENIZE":
                      r11.noTokenize = true;
                      break;
                    case "FAST":
                      r11.fast = true;
                      break;
                    case "FROM":
                      r11.from = t12[++e13];
                  }
                  s10[e12] = r11;
                }
                t11.schema = s10;
              }
            }
            return t11;
          }(t10) : null;
        }
        async query(e10) {
          let t10 = ua("SEARCH.QUERY", this.name, e10), r10 = await new ut(t10).exec(this.client);
          return r10 ? r10.map((e11) => {
            let t11 = e11[0], r11 = Number(e11[1]), s10 = e11[2];
            if (void 0 === s10) return { key: t11, score: r11 };
            if (!Array.isArray(s10) || 0 === s10.length) return { key: t11, score: r11, data: {} };
            let i10 = {};
            for (let e12 of s10) {
              let t12 = e12[0], r12 = e12[1], s11 = t12.split(".");
              if (1 === s11.length) i10[t12] = r12;
              else {
                let e13 = i10;
                for (let t13 = 0; t13 < s11.length - 1; t13++) {
                  let r13 = s11[t13];
                  r13 in e13 || (e13[r13] = {}), e13 = e13[r13];
                }
                e13[s11.at(-1)] = r12;
              }
            }
            return "$" in i10 && (i10 = i10.$), { key: t11, score: r11, data: i10 };
          }) : r10;
        }
        async aggregate(e10) {
          var t10;
          let r10 = (t10 = this.name, ["SEARCH.AGGREGATE", t10, JSON.stringify(e10?.filter ?? {}), JSON.stringify(e10.aggregations)]);
          return function e11(t11) {
            let r11 = {};
            for (let s10 = 0; s10 < t11.length; s10 += 2) {
              let i10 = t11[s10], n10 = t11[s10 + 1];
              Array.isArray(n10) ? n10.length > 0 && "string" == typeof n10[0] ? r11[i10] = "buckets" === n10[0] ? function(e12) {
                if ("buckets" === e12[0] && Array.isArray(e12[1])) {
                  let t12 = { buckets: e12[1].map((e13) => {
                    let t13 = {};
                    for (let r12 = 0; r12 < e13.length; r12 += 2) {
                      let s11 = e13[r12], i11 = e13[r12 + 1];
                      t13[s11] = Array.isArray(i11) && i11.length > 0 && "string" == typeof i11[0] ? un(i11) : i11;
                    }
                    return t13;
                  }) };
                  for (let r12 = 2; r12 < e12.length; r12 += 2) t12[e12[r12]] = e12[r12 + 1];
                  return t12;
                }
                return e12;
              }(n10) : un(n10) : r11[i10] = e11(n10) : r11[i10] = n10;
            }
            return r11;
          }(await new ut(r10).exec(this.client));
        }
        async count({ filter: e10 }) {
          var t10;
          let r10 = ua("SEARCH.COUNT", this.name, { filter: e10 });
          return { count: "number" == typeof (t10 = await new ut(r10).exec(this.client)) ? t10 : Number.parseInt(t10, 10) };
        }
        async drop() {
          let e10 = ["SEARCH.DROP", this.name];
          return await new ut(e10).exec(this.client);
        }
        async addAlias({ alias: e10 }) {
          let t10 = ["SEARCH.ALIASADD", e10, this.name];
          return await new ut(t10).exec(this.client);
        }
      };
      async function ul(e10, t10) {
        let { name: r10, schema: s10 } = t10, i10 = function(e11) {
          let { name: t11, schema: r11, dataType: s11, prefix: i11, language: n10, skipInitialScan: a10, existsOk: o10 } = e11, c10 = Array.isArray(i11) ? i11 : [i11], l10 = [t11, ...a10 ? ["SKIPINITIALSCAN"] : [], ...o10 ? ["EXISTSOK"] : [], "ON", s11.toUpperCase(), "PREFIX", c10.length.toString(), ...c10, ...n10 ? ["LANGUAGE", n10] : [], "SCHEMA"];
          for (let e12 of function e13(t12, r12 = []) {
            let s12 = [];
            for (let [i12, n11] of Object.entries(t12)) {
              let t13 = [...r12, i12], a11 = t13.join(".");
              if (us(n11)) s12.push({ path: a11, type: n11 });
              else if (ui(n11)) s12.push({ path: a11, type: n11.type, fast: "fast" in n11 ? n11.fast : void 0, noTokenize: "noTokenize" in n11 ? n11.noTokenize : void 0, noStem: "noStem" in n11 ? n11.noStem : void 0, from: "from" in n11 ? n11.from : void 0 });
              else if ("object" == typeof n11 && null !== n11 && !ui(n11)) {
                let r13 = e13(n11, t13);
                s12.push(...r13);
              }
            }
            return s12;
          }(r11)) l10.push(e12.path, e12.type), e12.fast && l10.push("FAST"), e12.noTokenize && l10.push("NOTOKENIZE"), e12.noStem && l10.push("NOSTEM"), e12.from && l10.push("FROM", e12.from);
          return ["SEARCH.CREATE", ...l10];
        }(t10);
        return await new ut(i10).exec(e10), uu(e10, { name: r10, schema: s10 });
      }
      function uu(e10, t10) {
        let { name: r10, schema: s10 } = t10;
        return new uc({ name: r10, schema: s10, client: e10 });
      }
      async function uh(e10) {
        let t10 = await new ut(["SEARCH.LISTALIASES"]).exec(e10);
        if (0 === t10 || Array.isArray(t10) && 0 === t10.length || !Array.isArray(t10)) return {};
        let r10 = {};
        for (let e11 of t10) if (Array.isArray(e11) && 2 === e11.length) {
          let [t11, s10] = e11;
          r10[t11] = s10;
        }
        return r10;
      }
      async function ud(e10, { indexName: t10, alias: r10 }) {
        return await new ut(["SEARCH.ALIASADD", r10, t10]).exec(e10);
      }
      async function up(e10, { alias: t10 }) {
        return await new ut(["SEARCH.ALIASDEL", t10]).exec(e10);
      }
      var um = class extends ue {
        constructor(e10, t10) {
          const r10 = ["hrandfield", e10[0]];
          "number" == typeof e10[1] && r10.push(e10[1]), e10[2] && r10.push("WITHVALUES"), super(r10, { deserialize: e10[2] ? (e11) => function(e12) {
            if (0 === e12.length) return null;
            let t11 = {};
            for (let r11 = 0; r11 < e12.length; r11 += 2) {
              let s10 = e12[r11], i10 = e12[r11 + 1];
              try {
                t11[s10] = JSON.parse(i10);
              } catch {
                t11[s10] = i10;
              }
            }
            return t11;
          }(e11) : t10?.deserialize, ...t10 });
        }
      }, uf = class extends ue {
        constructor(e10, t10) {
          super(["append", ...e10], t10);
        }
      }, ug = class extends ue {
        constructor([e10, t10, r10], s10) {
          const i10 = ["bitcount", e10];
          "number" == typeof t10 && i10.push(t10), "number" == typeof r10 && i10.push(r10), super(i10, s10);
        }
      }, uy = class {
        constructor(e10, t10, r10, s10 = (e11) => e11.exec(this.client)) {
          this.client = t10, this.opts = r10, this.execOperation = s10, this.command = ["bitfield", ...e10];
        }
        command;
        chain(...e10) {
          return this.command.push(...e10), this;
        }
        get(...e10) {
          return this.chain("get", ...e10);
        }
        set(...e10) {
          return this.chain("set", ...e10);
        }
        incrby(...e10) {
          return this.chain("incrby", ...e10);
        }
        overflow(e10) {
          return this.chain("overflow", e10);
        }
        exec() {
          let e10 = new ue(this.command, this.opts);
          return this.execOperation(e10);
        }
      }, ub = class extends ue {
        constructor(e10, t10) {
          super(["bitop", ...e10], t10);
        }
      }, uw = class extends ue {
        constructor(e10, t10) {
          super(["bitpos", ...e10], t10);
        }
      }, uv = class extends ue {
        constructor([e10, t10], r10) {
          super(["CLIENT", "SETINFO", e10.toUpperCase(), t10], r10);
        }
      }, ux = class extends ue {
        constructor([e10, t10, r10], s10) {
          super(["COPY", e10, t10, ...r10?.replace ? ["REPLACE"] : []], { ...s10, deserialize: (e11) => e11 > 0 ? "COPIED" : "NOT_COPIED" });
        }
      }, u_ = class extends ue {
        constructor(e10) {
          super(["dbsize"], e10);
        }
      }, uk = class extends ue {
        constructor(e10, t10) {
          super(["decr", ...e10], t10);
        }
      }, uE = class extends ue {
        constructor(e10, t10) {
          super(["decrby", ...e10], t10);
        }
      }, uS = class extends ue {
        constructor(e10, t10) {
          super(["del", ...e10], t10);
        }
      }, uO = class extends ue {
        constructor(e10, t10) {
          super(["echo", ...e10], t10);
        }
      }, uT = class extends ue {
        constructor([e10, t10, r10], s10) {
          super(["eval_ro", e10, t10.length, ...t10, ...r10 ?? []], s10);
        }
      }, uC = class extends ue {
        constructor([e10, t10, r10], s10) {
          super(["eval", e10, t10.length, ...t10, ...r10 ?? []], s10);
        }
      }, uR = class extends ue {
        constructor([e10, t10, r10], s10) {
          super(["evalsha_ro", e10, t10.length, ...t10, ...r10 ?? []], s10);
        }
      }, uA = class extends ue {
        constructor([e10, t10, r10], s10) {
          super(["evalsha", e10, t10.length, ...t10, ...r10 ?? []], s10);
        }
      }, uP = class extends ue {
        constructor(e10, t10) {
          super(["exists", ...e10], t10);
        }
      }, uI = class extends ue {
        constructor(e10, t10) {
          super(["expire", ...e10.filter(Boolean)], t10);
        }
      }, uN = class extends ue {
        constructor(e10, t10) {
          super(["expireat", ...e10], t10);
        }
      }, uL = class extends ue {
        constructor([e10, t10, r10], s10) {
          super(["fcall", e10, ...t10 ? [t10.length, ...t10] : [0], ...r10 ?? []], s10);
        }
      }, uU = class extends ue {
        constructor([e10, t10, r10], s10) {
          super(["fcall_ro", e10, ...t10 ? [t10.length, ...t10] : [0], ...r10 ?? []], s10);
        }
      }, uM = class extends ue {
        constructor(e10, t10) {
          const r10 = ["flushall"];
          e10 && e10.length > 0 && e10[0].async && r10.push("async"), super(r10, t10);
        }
      }, uD = class extends ue {
        constructor([e10], t10) {
          const r10 = ["flushdb"];
          e10?.async && r10.push("async"), super(r10, t10);
        }
      }, uj = class extends ue {
        constructor([e10], t10) {
          super(["function", "delete", e10], t10);
        }
      }, uq = class extends ue {
        constructor(e10) {
          super(["function", "flush"], e10);
        }
      }, uz = class extends ue {
        constructor([e10], t10) {
          const r10 = ["function", "list"];
          e10?.libraryName && r10.push("libraryname", e10.libraryName), e10?.withCode && r10.push("withcode"), super(r10, { deserialize: uB, ...t10 });
        }
      };
      function uB(e10) {
        return Array.isArray(e10) ? e10.map((e11) => {
          let t10 = l4(e11), r10 = t10.functions.map((e12) => l4(e12));
          return { libraryName: t10.library_name, engine: t10.engine, functions: r10.map((e12) => ({ name: e12.name, description: e12.description ?? void 0, flags: e12.flags })), libraryCode: t10.library_code };
        }) : [];
      }
      var u$ = class extends ue {
        constructor([e10], t10) {
          super(["function", "load", ...e10.replace ? ["replace"] : [], e10.code], t10);
        }
      }, uK = class extends ue {
        constructor(e10) {
          super(["function", "stats"], { deserialize: uH, ...e10 });
        }
      };
      function uH(e10) {
        return { engines: Object.fromEntries(Object.entries(Object.fromEntries(Object.entries(l4(l4(e10).engines)).map(([e11, t10]) => [e11, l4(t10)]))).map(([e11, t10]) => [e11, { librariesCount: t10.libraries_count, functionsCount: t10.functions_count }])) };
      }
      var uF = class extends ue {
        constructor([e10, t10, ...r10], s10) {
          const i10 = ["geoadd", e10];
          "nx" in t10 && t10.nx ? i10.push("nx") : "xx" in t10 && t10.xx && i10.push("xx"), "ch" in t10 && t10.ch && i10.push("ch"), "latitude" in t10 && t10.latitude && i10.push(t10.longitude, t10.latitude, t10.member), i10.push(...r10.flatMap(({ latitude: e11, longitude: t11, member: r11 }) => [t11, e11, r11])), super(i10, s10);
        }
      }, uW = class extends ue {
        constructor([e10, t10, r10, s10 = "M"], i10) {
          super(["GEODIST", e10, t10, r10, s10], i10);
        }
      }, uJ = class extends ue {
        constructor(e10, t10) {
          const [r10] = e10;
          super(["GEOHASH", r10, ...Array.isArray(e10[1]) ? e10[1] : e10.slice(1)], t10);
        }
      }, uG = class extends ue {
        constructor(e10, t10) {
          const [r10] = e10;
          super(["GEOPOS", r10, ...Array.isArray(e10[1]) ? e10[1] : e10.slice(1)], { deserialize: (e11) => function(e12) {
            let t11 = [];
            for (let r11 of e12) r11?.[0] && r11?.[1] && t11.push({ lng: Number.parseFloat(r11[0]), lat: Number.parseFloat(r11[1]) });
            return t11;
          }(e11), ...t10 });
        }
      }, uV = class extends ue {
        constructor([e10, t10, r10, s10, i10], n10) {
          const a10 = ["GEOSEARCH", e10];
          ("FROMMEMBER" === t10.type || "frommember" === t10.type) && a10.push(t10.type, t10.member), ("FROMLONLAT" === t10.type || "fromlonlat" === t10.type) && a10.push(t10.type, t10.coordinate.lon, t10.coordinate.lat), ("BYRADIUS" === r10.type || "byradius" === r10.type) && a10.push(r10.type, r10.radius, r10.radiusType), ("BYBOX" === r10.type || "bybox" === r10.type) && a10.push(r10.type, r10.rect.width, r10.rect.height, r10.rectType), a10.push(s10), i10?.count && a10.push("COUNT", i10.count.limit, ...i10.count.any ? ["ANY"] : []), super([...a10, ...i10?.withCoord ? ["WITHCOORD"] : [], ...i10?.withDist ? ["WITHDIST"] : [], ...i10?.withHash ? ["WITHHASH"] : []], { deserialize: (e11) => i10?.withCoord || i10?.withDist || i10?.withHash ? e11.map((e12) => {
            let t11 = 1, r11 = {};
            try {
              r11.member = JSON.parse(e12[0]);
            } catch {
              r11.member = e12[0];
            }
            return i10.withDist && (r11.dist = Number.parseFloat(e12[t11++])), i10.withHash && (r11.hash = e12[t11++].toString()), i10.withCoord && (r11.coord = { long: Number.parseFloat(e12[t11][0]), lat: Number.parseFloat(e12[t11][1]) }), r11;
          }) : e11.map((e12) => {
            try {
              return { member: JSON.parse(e12) };
            } catch {
              return { member: e12 };
            }
          }), ...n10 });
        }
      }, uX = class extends ue {
        constructor([e10, t10, r10, s10, i10, n10], a10) {
          const o10 = ["GEOSEARCHSTORE", e10, t10];
          ("FROMMEMBER" === r10.type || "frommember" === r10.type) && o10.push(r10.type, r10.member), ("FROMLONLAT" === r10.type || "fromlonlat" === r10.type) && o10.push(r10.type, r10.coordinate.lon, r10.coordinate.lat), ("BYRADIUS" === s10.type || "byradius" === s10.type) && o10.push(s10.type, s10.radius, s10.radiusType), ("BYBOX" === s10.type || "bybox" === s10.type) && o10.push(s10.type, s10.rect.width, s10.rect.height, s10.rectType), o10.push(i10), n10?.count && o10.push("COUNT", n10.count.limit, ...n10.count.any ? ["ANY"] : []), super([...o10, ...n10?.storeDist ? ["STOREDIST"] : []], a10);
        }
      }, uY = class extends ue {
        constructor(e10, t10) {
          super(["get", ...e10], t10);
        }
      }, uQ = class extends ue {
        constructor(e10, t10) {
          super(["getbit", ...e10], t10);
        }
      }, uZ = class extends ue {
        constructor(e10, t10) {
          super(["getdel", ...e10], t10);
        }
      }, u0 = class extends ue {
        constructor([e10, t10], r10) {
          const s10 = ["getex", e10];
          t10 && ("ex" in t10 && "number" == typeof t10.ex ? s10.push("ex", t10.ex) : "px" in t10 && "number" == typeof t10.px ? s10.push("px", t10.px) : "exat" in t10 && "number" == typeof t10.exat ? s10.push("exat", t10.exat) : "pxat" in t10 && "number" == typeof t10.pxat ? s10.push("pxat", t10.pxat) : "persist" in t10 && t10.persist && s10.push("persist")), super(s10, r10);
        }
      }, u1 = class extends ue {
        constructor(e10, t10) {
          super(["getrange", ...e10], t10);
        }
      }, u2 = class extends ue {
        constructor(e10, t10) {
          super(["getset", ...e10], t10);
        }
      }, u3 = class extends ue {
        constructor(e10, t10) {
          super(["hdel", ...e10], t10);
        }
      }, u4 = class extends ue {
        constructor(e10, t10) {
          super(["hexists", ...e10], t10);
        }
      }, u5 = class extends ue {
        constructor(e10, t10) {
          const [r10, s10, i10, n10] = e10, a10 = Array.isArray(s10) ? s10 : [s10];
          super(["hexpire", r10, i10, ...n10 ? [n10] : [], "FIELDS", a10.length, ...a10], t10);
        }
      }, u6 = class extends ue {
        constructor(e10, t10) {
          const [r10, s10, i10, n10] = e10, a10 = Array.isArray(s10) ? s10 : [s10];
          super(["hexpireat", r10, i10, ...n10 ? [n10] : [], "FIELDS", a10.length, ...a10], t10);
        }
      }, u7 = class extends ue {
        constructor(e10, t10) {
          const [r10, s10] = e10, i10 = Array.isArray(s10) ? s10 : [s10];
          super(["hexpiretime", r10, "FIELDS", i10.length, ...i10], t10);
        }
      }, u9 = class extends ue {
        constructor(e10, t10) {
          const [r10, s10] = e10, i10 = Array.isArray(s10) ? s10 : [s10];
          super(["hpersist", r10, "FIELDS", i10.length, ...i10], t10);
        }
      }, u8 = class extends ue {
        constructor(e10, t10) {
          const [r10, s10, i10, n10] = e10, a10 = Array.isArray(s10) ? s10 : [s10];
          super(["hpexpire", r10, i10, ...n10 ? [n10] : [], "FIELDS", a10.length, ...a10], t10);
        }
      }, he = class extends ue {
        constructor(e10, t10) {
          const [r10, s10, i10, n10] = e10, a10 = Array.isArray(s10) ? s10 : [s10];
          super(["hpexpireat", r10, i10, ...n10 ? [n10] : [], "FIELDS", a10.length, ...a10], t10);
        }
      }, ht = class extends ue {
        constructor(e10, t10) {
          const [r10, s10] = e10, i10 = Array.isArray(s10) ? s10 : [s10];
          super(["hpexpiretime", r10, "FIELDS", i10.length, ...i10], t10);
        }
      }, hr = class extends ue {
        constructor(e10, t10) {
          const [r10, s10] = e10, i10 = Array.isArray(s10) ? s10 : [s10];
          super(["hpttl", r10, "FIELDS", i10.length, ...i10], t10);
        }
      }, hs = class extends ue {
        constructor(e10, t10) {
          super(["hget", ...e10], t10);
        }
      }, hi = class extends ue {
        constructor(e10, t10) {
          super(["hgetall", ...e10], { deserialize: (e11) => function(e12) {
            if (0 === e12.length) return null;
            let t11 = {};
            for (let r10 = 0; r10 < e12.length; r10 += 2) {
              let s10 = e12[r10], i10 = e12[r10 + 1];
              try {
                let e13 = !Number.isNaN(Number(i10)) && !Number.isSafeInteger(Number(i10));
                t11[s10] = e13 ? i10 : JSON.parse(i10);
              } catch {
                t11[s10] = i10;
              }
            }
            return t11;
          }(e11), ...t10 });
        }
      };
      function hn(e10, t10) {
        if (t10.every((e11) => null === e11)) return null;
        let r10 = {};
        for (let [s10, i10] of e10.entries()) try {
          r10[i10] = JSON.parse(t10[s10]);
        } catch {
          r10[i10] = t10[s10];
        }
        return r10;
      }
      var ha = class extends ue {
        constructor([e10, ...t10], r10) {
          super(["hmget", e10, ...t10], { deserialize: (e11) => hn(t10, e11), ...r10 });
        }
      }, ho = class extends ue {
        constructor([e10, ...t10], r10) {
          super(["hgetdel", e10, "FIELDS", t10.length, ...t10], { deserialize: (e11) => hn(t10.map(String), e11), ...r10 });
        }
      }, hc = class extends ue {
        constructor([e10, t10, ...r10], s10) {
          const i10 = ["hgetex", e10];
          "ex" in t10 && "number" == typeof t10.ex ? i10.push("EX", t10.ex) : "px" in t10 && "number" == typeof t10.px ? i10.push("PX", t10.px) : "exat" in t10 && "number" == typeof t10.exat ? i10.push("EXAT", t10.exat) : "pxat" in t10 && "number" == typeof t10.pxat ? i10.push("PXAT", t10.pxat) : "persist" in t10 && t10.persist && i10.push("PERSIST"), i10.push("FIELDS", r10.length, ...r10), super(i10, { deserialize: (e11) => hn(r10.map(String), e11), ...s10 });
        }
      }, hl = class extends ue {
        constructor(e10, t10) {
          super(["hincrby", ...e10], t10);
        }
      }, hu = class extends ue {
        constructor(e10, t10) {
          super(["hincrbyfloat", ...e10], t10);
        }
      }, hh = class extends ue {
        constructor([e10], t10) {
          super(["hkeys", e10], t10);
        }
      }, hd = class extends ue {
        constructor(e10, t10) {
          super(["hlen", ...e10], t10);
        }
      }, hp = class extends ue {
        constructor([e10, t10], r10) {
          super(["hmset", e10, ...Object.entries(t10).flatMap(([e11, t11]) => [e11, t11])], r10);
        }
      }, hm = class extends ue {
        constructor([e10, t10, r10], s10) {
          const i10 = ["hscan", e10, t10];
          r10?.match && i10.push("match", r10.match), "number" == typeof r10?.count && i10.push("count", r10.count), super(i10, { deserialize: l2, ...s10 });
        }
      }, hf = class extends ue {
        constructor([e10, t10], r10) {
          super(["hset", e10, ...Object.entries(t10).flatMap(([e11, t11]) => [e11, t11])], r10);
        }
      }, hg = class extends ue {
        constructor([e10, t10, r10], s10) {
          const i10 = ["hsetex", e10];
          t10.conditional && i10.push(t10.conditional.toUpperCase()), t10.expiration && ("ex" in t10.expiration && "number" == typeof t10.expiration.ex ? i10.push("EX", t10.expiration.ex) : "px" in t10.expiration && "number" == typeof t10.expiration.px ? i10.push("PX", t10.expiration.px) : "exat" in t10.expiration && "number" == typeof t10.expiration.exat ? i10.push("EXAT", t10.expiration.exat) : "pxat" in t10.expiration && "number" == typeof t10.expiration.pxat ? i10.push("PXAT", t10.expiration.pxat) : "keepttl" in t10.expiration && t10.expiration.keepttl && i10.push("KEEPTTL"));
          const n10 = Object.entries(r10);
          for (const [e11, t11] of (i10.push("FIELDS", n10.length), n10)) i10.push(e11, t11);
          super(i10, s10);
        }
      }, hy = class extends ue {
        constructor(e10, t10) {
          super(["hsetnx", ...e10], t10);
        }
      }, hb = class extends ue {
        constructor(e10, t10) {
          super(["hstrlen", ...e10], t10);
        }
      }, hw = class extends ue {
        constructor(e10, t10) {
          const [r10, s10] = e10, i10 = Array.isArray(s10) ? s10 : [s10];
          super(["httl", r10, "FIELDS", i10.length, ...i10], t10);
        }
      }, hv = class extends ue {
        constructor(e10, t10) {
          super(["hvals", ...e10], t10);
        }
      }, hx = class extends ue {
        constructor(e10, t10) {
          super(["incr", ...e10], t10);
        }
      }, h_ = class extends ue {
        constructor(e10, t10) {
          super(["incrby", ...e10], t10);
        }
      }, hk = class extends ue {
        constructor(e10, t10) {
          super(["incrbyfloat", ...e10], t10);
        }
      }, hE = class extends ue {
        constructor(e10, t10) {
          super(["JSON.ARRAPPEND", ...e10], t10);
        }
      }, hS = class extends ue {
        constructor(e10, t10) {
          super(["JSON.ARRINDEX", ...e10], t10);
        }
      }, hO = class extends ue {
        constructor(e10, t10) {
          super(["JSON.ARRINSERT", ...e10], t10);
        }
      }, hT = class extends ue {
        constructor(e10, t10) {
          super(["JSON.ARRLEN", e10[0], e10[1] ?? "$"], t10);
        }
      }, hC = class extends ue {
        constructor(e10, t10) {
          super(["JSON.ARRPOP", ...e10], t10);
        }
      }, hR = class extends ue {
        constructor(e10, t10) {
          const r10 = e10[1] ?? "$", s10 = e10[2] ?? 0, i10 = e10[3] ?? 0;
          super(["JSON.ARRTRIM", e10[0], r10, s10, i10], t10);
        }
      }, hA = class extends ue {
        constructor(e10, t10) {
          super(["JSON.CLEAR", ...e10], t10);
        }
      }, hP = class extends ue {
        constructor(e10, t10) {
          super(["JSON.DEL", ...e10], t10);
        }
      }, hI = class extends ue {
        constructor(e10, t10) {
          super(["JSON.FORGET", ...e10], t10);
        }
      }, hN = class extends ue {
        constructor(e10, t10) {
          const r10 = ["JSON.GET"];
          "string" == typeof e10[1] ? r10.push(...e10) : (r10.push(e10[0]), e10[1] && (e10[1].indent && r10.push("INDENT", e10[1].indent), e10[1].newline && r10.push("NEWLINE", e10[1].newline), e10[1].space && r10.push("SPACE", e10[1].space)), r10.push(...e10.slice(2))), super(r10, t10);
        }
      }, hL = class extends ue {
        constructor(e10, t10) {
          super(["JSON.MERGE", ...e10], t10);
        }
      }, hU = class extends ue {
        constructor(e10, t10) {
          super(["JSON.MGET", ...e10[0], e10[1]], t10);
        }
      }, hM = class extends ue {
        constructor(e10, t10) {
          const r10 = ["JSON.MSET"];
          for (const t11 of e10) r10.push(t11.key, t11.path, t11.value);
          super(r10, t10);
        }
      }, hD = class extends ue {
        constructor(e10, t10) {
          super(["JSON.NUMINCRBY", ...e10], t10);
        }
      }, hj = class extends ue {
        constructor(e10, t10) {
          super(["JSON.NUMMULTBY", ...e10], t10);
        }
      }, hq = class extends ue {
        constructor(e10, t10) {
          super(["JSON.OBJKEYS", ...e10], t10);
        }
      }, hz = class extends ue {
        constructor(e10, t10) {
          super(["JSON.OBJLEN", ...e10], t10);
        }
      }, hB = class extends ue {
        constructor(e10, t10) {
          super(["JSON.RESP", ...e10], t10);
        }
      }, h$ = class extends ue {
        constructor(e10, t10) {
          const r10 = ["JSON.SET", e10[0], e10[1], e10[2]];
          e10[3] && (e10[3].nx ? r10.push("NX") : e10[3].xx && r10.push("XX")), super(r10, t10);
        }
      }, hK = class extends ue {
        constructor(e10, t10) {
          super(["JSON.STRAPPEND", ...e10], t10);
        }
      }, hH = class extends ue {
        constructor(e10, t10) {
          super(["JSON.STRLEN", ...e10], t10);
        }
      }, hF = class extends ue {
        constructor(e10, t10) {
          super(["JSON.TOGGLE", ...e10], t10);
        }
      }, hW = class extends ue {
        constructor(e10, t10) {
          super(["JSON.TYPE", ...e10], t10);
        }
      }, hJ = class extends ue {
        constructor(e10, t10) {
          super(["keys", ...e10], t10);
        }
      }, hG = class extends ue {
        constructor(e10, t10) {
          super(["lindex", ...e10], t10);
        }
      }, hV = class extends ue {
        constructor(e10, t10) {
          super(["linsert", ...e10], t10);
        }
      }, hX = class extends ue {
        constructor(e10, t10) {
          super(["llen", ...e10], t10);
        }
      }, hY = class extends ue {
        constructor(e10, t10) {
          super(["lmove", ...e10], t10);
        }
      }, hQ = class extends ue {
        constructor(e10, t10) {
          const [r10, s10, i10, n10] = e10;
          super(["LMPOP", r10, ...s10, i10, ...n10 ? ["COUNT", n10] : []], t10);
        }
      }, hZ = class extends ue {
        constructor(e10, t10) {
          super(["lpop", ...e10], t10);
        }
      }, h0 = class extends ue {
        constructor(e10, t10) {
          const r10 = ["lpos", e10[0], e10[1]];
          "number" == typeof e10[2]?.rank && r10.push("rank", e10[2].rank), "number" == typeof e10[2]?.count && r10.push("count", e10[2].count), "number" == typeof e10[2]?.maxLen && r10.push("maxLen", e10[2].maxLen), super(r10, t10);
        }
      }, h1 = class extends ue {
        constructor(e10, t10) {
          super(["lpush", ...e10], t10);
        }
      }, h2 = class extends ue {
        constructor(e10, t10) {
          super(["lpushx", ...e10], t10);
        }
      }, h3 = class extends ue {
        constructor(e10, t10) {
          super(["lrange", ...e10], t10);
        }
      }, h4 = class extends ue {
        constructor(e10, t10) {
          super(["lrem", ...e10], t10);
        }
      }, h5 = class extends ue {
        constructor(e10, t10) {
          super(["lset", ...e10], t10);
        }
      }, h6 = class extends ue {
        constructor(e10, t10) {
          super(["ltrim", ...e10], t10);
        }
      }, h7 = class extends ue {
        constructor(e10, t10) {
          super(["mget", ...Array.isArray(e10[0]) ? e10[0] : e10], t10);
        }
      }, h9 = class extends ue {
        constructor([e10], t10) {
          super(["mset", ...Object.entries(e10).flatMap(([e11, t11]) => [e11, t11])], t10);
        }
      }, h8 = class extends ue {
        constructor([e10], t10) {
          super(["msetnx", ...Object.entries(e10).flat()], t10);
        }
      }, de = class extends ue {
        constructor(e10, t10) {
          super(["persist", ...e10], t10);
        }
      }, dt = class extends ue {
        constructor(e10, t10) {
          super(["pexpire", ...e10], t10);
        }
      }, dr = class extends ue {
        constructor(e10, t10) {
          super(["pexpireat", ...e10], t10);
        }
      }, ds = class extends ue {
        constructor(e10, t10) {
          super(["pfadd", ...e10], t10);
        }
      }, di = class extends ue {
        constructor(e10, t10) {
          super(["pfcount", ...e10], t10);
        }
      }, dn = class extends ue {
        constructor(e10, t10) {
          super(["pfmerge", ...e10], t10);
        }
      }, da = class extends ue {
        constructor(e10, t10) {
          const r10 = ["ping"];
          e10?.[0] !== void 0 && r10.push(e10[0]), super(r10, t10);
        }
      }, dc = class extends ue {
        constructor(e10, t10) {
          super(["psetex", ...e10], t10);
        }
      }, dl = class extends ue {
        constructor(e10, t10) {
          super(["pttl", ...e10], t10);
        }
      }, du = class extends ue {
        constructor(e10, t10) {
          super(["publish", ...e10], t10);
        }
      }, dh = class extends ue {
        constructor(e10) {
          super(["randomkey"], e10);
        }
      }, dd = class extends ue {
        constructor(e10, t10) {
          super(["rename", ...e10], t10);
        }
      }, dp = class extends ue {
        constructor(e10, t10) {
          super(["renamenx", ...e10], t10);
        }
      }, dm = class extends ue {
        constructor(e10, t10) {
          super(["rpop", ...e10], t10);
        }
      }, df = class extends ue {
        constructor(e10, t10) {
          super(["rpush", ...e10], t10);
        }
      }, dg = class extends ue {
        constructor(e10, t10) {
          super(["rpushx", ...e10], t10);
        }
      }, dy = class extends ue {
        constructor(e10, t10) {
          super(["sadd", ...e10], t10);
        }
      }, db = class extends ue {
        constructor([e10, t10], r10) {
          const s10 = ["scan", e10];
          t10?.match && s10.push("match", t10.match), "number" == typeof t10?.count && s10.push("count", t10.count), t10 && "withType" in t10 && true === t10.withType ? s10.push("withtype") : t10 && "type" in t10 && t10.type && t10.type.length > 0 && s10.push("type", t10.type), super(s10, { deserialize: t10?.withType ? l3 : l2, ...r10 });
        }
      }, dw = class extends ue {
        constructor(e10, t10) {
          super(["scard", ...e10], t10);
        }
      }, dv = class extends ue {
        constructor(e10, t10) {
          super(["script", "exists", ...e10], { deserialize: (e11) => e11, ...t10 });
        }
      }, dx = class extends ue {
        constructor([e10], t10) {
          const r10 = ["script", "flush"];
          e10?.sync ? r10.push("sync") : e10?.async && r10.push("async"), super(r10, t10);
        }
      }, d_ = class extends ue {
        constructor(e10, t10) {
          super(["script", "load", ...e10], t10);
        }
      }, dk = class extends ue {
        constructor(e10, t10) {
          super(["sdiff", ...e10], t10);
        }
      }, dE = class extends ue {
        constructor(e10, t10) {
          super(["sdiffstore", ...e10], t10);
        }
      }, dS = class extends ue {
        constructor([e10, t10, r10], s10) {
          const i10 = ["set", e10, t10];
          r10 && ("nx" in r10 && r10.nx ? i10.push("nx") : "xx" in r10 && r10.xx && i10.push("xx"), "get" in r10 && r10.get && i10.push("get"), "ex" in r10 && "number" == typeof r10.ex ? i10.push("ex", r10.ex) : "px" in r10 && "number" == typeof r10.px ? i10.push("px", r10.px) : "exat" in r10 && "number" == typeof r10.exat ? i10.push("exat", r10.exat) : "pxat" in r10 && "number" == typeof r10.pxat ? i10.push("pxat", r10.pxat) : "keepTtl" in r10 && r10.keepTtl && i10.push("keepTtl")), super(i10, s10);
        }
      }, dO = class extends ue {
        constructor(e10, t10) {
          super(["setbit", ...e10], t10);
        }
      }, dT = class extends ue {
        constructor(e10, t10) {
          super(["setex", ...e10], t10);
        }
      }, dC = class extends ue {
        constructor(e10, t10) {
          super(["setnx", ...e10], t10);
        }
      }, dR = class extends ue {
        constructor(e10, t10) {
          super(["setrange", ...e10], t10);
        }
      }, dA = class extends ue {
        constructor(e10, t10) {
          super(["sinter", ...e10], t10);
        }
      }, dP = class extends ue {
        constructor(e10, t10) {
          const [r10, s10] = e10, i10 = ["sintercard", r10.length, ...r10];
          s10?.limit !== void 0 && i10.push("LIMIT", s10.limit), super(i10, t10);
        }
      }, dI = class extends ue {
        constructor(e10, t10) {
          super(["sinterstore", ...e10], t10);
        }
      }, dN = class extends ue {
        constructor(e10, t10) {
          super(["sismember", ...e10], t10);
        }
      }, dL = class extends ue {
        constructor(e10, t10) {
          super(["smembers", ...e10], t10);
        }
      }, dU = class extends ue {
        constructor(e10, t10) {
          super(["smismember", e10[0], ...e10[1]], t10);
        }
      }, dM = class extends ue {
        constructor(e10, t10) {
          super(["smove", ...e10], t10);
        }
      }, dD = class extends ue {
        constructor([e10, t10], r10) {
          const s10 = ["spop", e10];
          "number" == typeof t10 && s10.push(t10), super(s10, r10);
        }
      }, dj = class extends ue {
        constructor([e10, t10], r10) {
          const s10 = ["srandmember", e10];
          "number" == typeof t10 && s10.push(t10), super(s10, r10);
        }
      }, dq = class extends ue {
        constructor(e10, t10) {
          super(["srem", ...e10], t10);
        }
      }, dz = class extends ue {
        constructor([e10, t10, r10], s10) {
          const i10 = ["sscan", e10, t10];
          r10?.match && i10.push("match", r10.match), "number" == typeof r10?.count && i10.push("count", r10.count), super(i10, { deserialize: l2, ...s10 });
        }
      }, dB = class extends ue {
        constructor(e10, t10) {
          super(["strlen", ...e10], t10);
        }
      }, d$ = class extends ue {
        constructor(e10, t10) {
          super(["sunion", ...e10], t10);
        }
      }, dK = class extends ue {
        constructor(e10, t10) {
          super(["sunionstore", ...e10], t10);
        }
      }, dH = class extends ue {
        constructor(e10) {
          super(["time"], e10);
        }
      }, dF = class extends ue {
        constructor(e10, t10) {
          super(["touch", ...e10], t10);
        }
      }, dW = class extends ue {
        constructor(e10, t10) {
          super(["ttl", ...e10], t10);
        }
      }, dJ = class extends ue {
        constructor(e10, t10) {
          super(["type", ...e10], t10);
        }
      }, dG = class extends ue {
        constructor(e10, t10) {
          super(["unlink", ...e10], t10);
        }
      }, dV = class extends ue {
        constructor([e10, t10, r10], s10) {
          super(["XACK", e10, t10, ...Array.isArray(r10) ? [...r10] : [r10]], s10);
        }
      }, dX = class extends ue {
        constructor([e10, t10, r10, ...s10], i10) {
          const n10 = ["XACKDEL", e10, t10];
          n10.push(r10.toUpperCase(), "IDS", s10.length, ...s10), super(n10, i10);
        }
      }, dY = class extends ue {
        constructor([e10, t10, r10, s10], i10) {
          const n10 = ["XADD", e10];
          for (const [e11, i11] of (s10 && (s10.nomkStream && n10.push("NOMKSTREAM"), s10.trim && (n10.push(s10.trim.type, s10.trim.comparison, s10.trim.threshold), void 0 !== s10.trim.limit && n10.push("LIMIT", s10.trim.limit))), n10.push(t10), Object.entries(r10))) n10.push(e11, i11);
          super(n10, i10);
        }
      }, dQ = class extends ue {
        constructor([e10, t10, r10, s10, i10, n10], a10) {
          const o10 = [];
          n10?.count && o10.push("COUNT", n10.count), n10?.justId && o10.push("JUSTID"), super(["XAUTOCLAIM", e10, t10, r10, s10, i10, ...o10], a10);
        }
      }, dZ = class extends ue {
        constructor([e10, t10, r10, s10, i10, n10], a10) {
          const o10 = Array.isArray(i10) ? [...i10] : [i10], c10 = [];
          n10?.idleMS && c10.push("IDLE", n10.idleMS), n10?.idleMS && c10.push("TIME", n10.timeMS), n10?.retryCount && c10.push("RETRYCOUNT", n10.retryCount), n10?.force && c10.push("FORCE"), n10?.justId && c10.push("JUSTID"), n10?.lastId && c10.push("LASTID", n10.lastId), super(["XCLAIM", e10, t10, r10, s10, ...o10, ...c10], a10);
        }
      }, d0 = class extends ue {
        constructor([e10, t10], r10) {
          super(["XDEL", e10, ...Array.isArray(t10) ? [...t10] : [t10]], r10);
        }
      }, d1 = class extends ue {
        constructor([e10, t10, ...r10], s10) {
          const i10 = ["XDELEX", e10];
          t10 && i10.push(t10.toUpperCase()), i10.push("IDS", r10.length, ...r10), super(i10, s10);
        }
      }, d2 = class extends ue {
        constructor([e10, t10], r10) {
          const s10 = ["XGROUP"];
          switch (t10.type) {
            case "CREATE":
              s10.push("CREATE", e10, t10.group, t10.id), t10.options && (t10.options.MKSTREAM && s10.push("MKSTREAM"), void 0 !== t10.options.ENTRIESREAD && s10.push("ENTRIESREAD", t10.options.ENTRIESREAD.toString()));
              break;
            case "CREATECONSUMER":
              s10.push("CREATECONSUMER", e10, t10.group, t10.consumer);
              break;
            case "DELCONSUMER":
              s10.push("DELCONSUMER", e10, t10.group, t10.consumer);
              break;
            case "DESTROY":
              s10.push("DESTROY", e10, t10.group);
              break;
            case "SETID":
              s10.push("SETID", e10, t10.group, t10.id), t10.options?.ENTRIESREAD !== void 0 && s10.push("ENTRIESREAD", t10.options.ENTRIESREAD.toString());
              break;
            default:
              throw Error("Invalid XGROUP");
          }
          super(s10, r10);
        }
      }, d3 = class extends ue {
        constructor([e10, t10], r10) {
          const s10 = [];
          "CONSUMERS" === t10.type ? s10.push("CONSUMERS", e10, t10.group) : s10.push("GROUPS", e10), super(["XINFO", ...s10], r10);
        }
      }, d4 = class extends ue {
        constructor(e10, t10) {
          super(["XLEN", ...e10], t10);
        }
      }, d5 = class extends ue {
        constructor([e10, t10, r10, s10, i10, n10], a10) {
          const o10 = n10?.consumer === void 0 ? [] : Array.isArray(n10.consumer) ? [...n10.consumer] : [n10.consumer];
          super(["XPENDING", e10, t10, ...n10?.idleTime ? ["IDLE", n10.idleTime] : [], r10, s10, i10, ...o10], a10);
        }
      }, d6 = class extends ue {
        constructor([e10, t10, r10, s10], i10) {
          const n10 = ["XRANGE", e10, t10, r10];
          "number" == typeof s10 && n10.push("COUNT", s10), super(n10, { deserialize: (e11) => function(e12) {
            let t11 = {};
            for (let r11 of e12) for (let e13 = 0; e13 < r11.length; e13 += 2) {
              let s11 = r11[e13], i11 = r11[e13 + 1];
              s11 in t11 || (t11[s11] = {});
              for (let e14 = 0; e14 < i11.length; e14 += 2) {
                let r12 = i11[e14], n11 = i11[e14 + 1];
                try {
                  t11[s11][r12] = JSON.parse(n11);
                } catch {
                  t11[s11][r12] = n11;
                }
              }
            }
            return t11;
          }(e11), ...i10 });
        }
      }, d7 = class extends ue {
        constructor([e10, t10, r10], s10) {
          if (Array.isArray(e10) && Array.isArray(t10) && e10.length !== t10.length) throw Error("ERR Unbalanced XREAD list of streams: for each stream key an ID or '$' must be specified");
          const i10 = [];
          "number" == typeof r10?.count && i10.push("COUNT", r10.count), "number" == typeof r10?.blockMS && i10.push("BLOCK", r10.blockMS), i10.push("STREAMS", ...Array.isArray(e10) ? [...e10] : [e10], ...Array.isArray(t10) ? [...t10] : [t10]), super(["XREAD", ...i10], s10);
        }
      }, d9 = class extends ue {
        constructor([e10, t10, r10, s10, i10], n10) {
          if (Array.isArray(r10) && Array.isArray(s10) && r10.length !== s10.length) throw Error("ERR Unbalanced XREADGROUP list of streams: for each stream key an ID or '$' must be specified");
          const a10 = [];
          "number" == typeof i10?.count && a10.push("COUNT", i10.count), "number" == typeof i10?.blockMS && a10.push("BLOCK", i10.blockMS), "boolean" == typeof i10?.NOACK && i10.NOACK && a10.push("NOACK"), a10.push("STREAMS", ...Array.isArray(r10) ? [...r10] : [r10], ...Array.isArray(s10) ? [...s10] : [s10]), super(["XREADGROUP", "GROUP", e10, t10, ...a10], n10);
        }
      }, d8 = class extends ue {
        constructor([e10, t10, r10, s10], i10) {
          const n10 = ["XREVRANGE", e10, t10, r10];
          "number" == typeof s10 && n10.push("COUNT", s10), super(n10, { deserialize: (e11) => function(e12) {
            let t11 = {};
            for (let r11 of e12) for (let e13 = 0; e13 < r11.length; e13 += 2) {
              let s11 = r11[e13], i11 = r11[e13 + 1];
              s11 in t11 || (t11[s11] = {});
              for (let e14 = 0; e14 < i11.length; e14 += 2) {
                let r12 = i11[e14], n11 = i11[e14 + 1];
                try {
                  t11[s11][r12] = JSON.parse(n11);
                } catch {
                  t11[s11][r12] = n11;
                }
              }
            }
            return t11;
          }(e11), ...i10 });
        }
      }, pe = class extends ue {
        constructor([e10, t10], r10) {
          const { limit: s10, strategy: i10, threshold: n10, exactness: a10 = "~" } = t10;
          super(["XTRIM", e10, i10, a10, n10, ...s10 ? ["LIMIT", s10] : []], r10);
        }
      }, pt = class extends ue {
        constructor([e10, t10, ...r10], s10) {
          const i10 = ["zadd", e10];
          "nx" in t10 && t10.nx ? i10.push("nx") : "xx" in t10 && t10.xx && i10.push("xx"), "ch" in t10 && t10.ch && i10.push("ch"), "incr" in t10 && t10.incr && i10.push("incr"), "lt" in t10 && t10.lt ? i10.push("lt") : "gt" in t10 && t10.gt && i10.push("gt"), "score" in t10 && "member" in t10 && i10.push(t10.score, t10.member), i10.push(...r10.flatMap(({ score: e11, member: t11 }) => [e11, t11])), super(i10, s10);
        }
      }, pr = class extends ue {
        constructor(e10, t10) {
          super(["zcard", ...e10], t10);
        }
      }, ps = class extends ue {
        constructor(e10, t10) {
          super(["zcount", ...e10], t10);
        }
      }, pi = class extends ue {
        constructor(e10, t10) {
          super(["zincrby", ...e10], t10);
        }
      }, pn = class extends ue {
        constructor([e10, t10, r10, s10], i10) {
          const n10 = ["zinterstore", e10, t10];
          Array.isArray(r10) ? n10.push(...r10) : n10.push(r10), s10 && ("weights" in s10 && s10.weights ? n10.push("weights", ...s10.weights) : "weight" in s10 && "number" == typeof s10.weight && n10.push("weights", s10.weight), "aggregate" in s10 && n10.push("aggregate", s10.aggregate)), super(n10, i10);
        }
      }, pa = class extends ue {
        constructor(e10, t10) {
          super(["zlexcount", ...e10], t10);
        }
      }, po = class extends ue {
        constructor([e10, t10], r10) {
          const s10 = ["zpopmax", e10];
          "number" == typeof t10 && s10.push(t10), super(s10, r10);
        }
      }, pc = class extends ue {
        constructor([e10, t10], r10) {
          const s10 = ["zpopmin", e10];
          "number" == typeof t10 && s10.push(t10), super(s10, r10);
        }
      }, pl = class extends ue {
        constructor([e10, t10, r10, s10], i10) {
          const n10 = ["zrange", e10, t10, r10];
          s10?.byScore && n10.push("byscore"), s10?.byLex && n10.push("bylex"), s10?.rev && n10.push("rev"), s10?.count !== void 0 && void 0 !== s10.offset && n10.push("limit", s10.offset, s10.count), s10?.withScores && n10.push("withscores"), super(n10, i10);
        }
      }, pu = class extends ue {
        constructor(e10, t10) {
          super(["zrank", ...e10], t10);
        }
      }, ph = class extends ue {
        constructor(e10, t10) {
          super(["zrem", ...e10], t10);
        }
      }, pd = class extends ue {
        constructor(e10, t10) {
          super(["zremrangebylex", ...e10], t10);
        }
      }, pp = class extends ue {
        constructor(e10, t10) {
          super(["zremrangebyrank", ...e10], t10);
        }
      }, pm = class extends ue {
        constructor(e10, t10) {
          super(["zremrangebyscore", ...e10], t10);
        }
      }, pf = class extends ue {
        constructor(e10, t10) {
          super(["zrevrank", ...e10], t10);
        }
      }, pg = class extends ue {
        constructor([e10, t10, r10], s10) {
          const i10 = ["zscan", e10, t10];
          r10?.match && i10.push("match", r10.match), "number" == typeof r10?.count && i10.push("count", r10.count), super(i10, { deserialize: l2, ...s10 });
        }
      }, py = class extends ue {
        constructor(e10, t10) {
          super(["zscore", ...e10], t10);
        }
      }, pb = class extends ue {
        constructor([e10, t10, r10], s10) {
          const i10 = ["zunion", e10];
          Array.isArray(t10) ? i10.push(...t10) : i10.push(t10), r10 && ("weights" in r10 && r10.weights ? i10.push("weights", ...r10.weights) : "weight" in r10 && "number" == typeof r10.weight && i10.push("weights", r10.weight), "aggregate" in r10 && i10.push("aggregate", r10.aggregate), r10.withScores && i10.push("withscores")), super(i10, s10);
        }
      }, pw = class extends ue {
        constructor([e10, t10, r10, s10], i10) {
          const n10 = ["zunionstore", e10, t10];
          Array.isArray(r10) ? n10.push(...r10) : n10.push(r10), s10 && ("weights" in s10 && s10.weights ? n10.push("weights", ...s10.weights) : "weight" in s10 && "number" == typeof s10.weight && n10.push("weights", s10.weight), "aggregate" in s10 && n10.push("aggregate", s10.aggregate)), super(n10, i10);
        }
      }, pv = class extends ue {
        constructor(e10, t10) {
          super(["zdiffstore", ...e10], t10);
        }
      }, px = class extends ue {
        constructor(e10, t10) {
          const [r10, s10] = e10;
          super(["zmscore", r10, ...s10], t10);
        }
      }, p_ = class {
        client;
        commands;
        commandOptions;
        multiExec;
        constructor(e10) {
          if (this.client = e10.client, this.commands = [], this.commandOptions = e10.commandOptions, this.multiExec = e10.multiExec ?? false, this.commandOptions?.latencyLogging) {
            const e11 = this.exec.bind(this);
            this.exec = async (t10) => {
              let r10 = performance.now(), s10 = await (t10 ? e11(t10) : e11()), i10 = (performance.now() - r10).toFixed(2);
              return console.log(`Latency for \x1B[38;2;19;185;39m${this.multiExec ? ["MULTI-EXEC"] : ["PIPELINE"].toString().toUpperCase()}\x1B[0m: \x1B[38;2;0;255;255m${i10} ms\x1B[0m`), s10;
            };
          }
        }
        exec = async (e10) => {
          if (0 === this.commands.length) throw Error("Pipeline is empty");
          let t10 = this.multiExec ? ["multi-exec"] : ["pipeline"], r10 = await this.client.request({ path: t10, body: Object.values(this.commands).map((e11) => e11.command) });
          return e10?.keepErrors ? r10.map(({ error: e11, result: t11 }, r11) => ({ error: e11, result: this.commands[r11].deserialize(t11) })) : r10.map(({ error: e11, result: t11 }, r11) => {
            if (e11) throw new lQ(`Command ${r11 + 1} [ ${this.commands[r11].command[0]} ] failed: ${e11}`);
            return this.commands[r11].deserialize(t11);
          });
        };
        length() {
          return this.commands.length;
        }
        chain(e10) {
          return this.commands.push(e10), this;
        }
        append = (...e10) => this.chain(new uf(e10, this.commandOptions));
        bitcount = (...e10) => this.chain(new ug(e10, this.commandOptions));
        bitfield = (...e10) => new uy(e10, this.client, this.commandOptions, this.chain.bind(this));
        bitop = (e10, t10, r10, ...s10) => this.chain(new ub([e10, t10, r10, ...s10], this.commandOptions));
        bitpos = (...e10) => this.chain(new uw(e10, this.commandOptions));
        clientSetinfo = (...e10) => this.chain(new uv(e10, this.commandOptions));
        copy = (...e10) => this.chain(new ux(e10, this.commandOptions));
        zdiffstore = (...e10) => this.chain(new pv(e10, this.commandOptions));
        dbsize = () => this.chain(new u_(this.commandOptions));
        decr = (...e10) => this.chain(new uk(e10, this.commandOptions));
        decrby = (...e10) => this.chain(new uE(e10, this.commandOptions));
        del = (...e10) => this.chain(new uS(e10, this.commandOptions));
        echo = (...e10) => this.chain(new uO(e10, this.commandOptions));
        evalRo = (...e10) => this.chain(new uT(e10, this.commandOptions));
        eval = (...e10) => this.chain(new uC(e10, this.commandOptions));
        evalshaRo = (...e10) => this.chain(new uR(e10, this.commandOptions));
        evalsha = (...e10) => this.chain(new uA(e10, this.commandOptions));
        exists = (...e10) => this.chain(new uP(e10, this.commandOptions));
        expire = (...e10) => this.chain(new uI(e10, this.commandOptions));
        expireat = (...e10) => this.chain(new uN(e10, this.commandOptions));
        flushall = (e10) => this.chain(new uM(e10, this.commandOptions));
        flushdb = (...e10) => this.chain(new uD(e10, this.commandOptions));
        geoadd = (...e10) => this.chain(new uF(e10, this.commandOptions));
        geodist = (...e10) => this.chain(new uW(e10, this.commandOptions));
        geopos = (...e10) => this.chain(new uG(e10, this.commandOptions));
        geohash = (...e10) => this.chain(new uJ(e10, this.commandOptions));
        geosearch = (...e10) => this.chain(new uV(e10, this.commandOptions));
        geosearchstore = (...e10) => this.chain(new uX(e10, this.commandOptions));
        get = (...e10) => this.chain(new uY(e10, this.commandOptions));
        getbit = (...e10) => this.chain(new uQ(e10, this.commandOptions));
        getdel = (...e10) => this.chain(new uZ(e10, this.commandOptions));
        getex = (...e10) => this.chain(new u0(e10, this.commandOptions));
        getrange = (...e10) => this.chain(new u1(e10, this.commandOptions));
        getset = (e10, t10) => this.chain(new u2([e10, t10], this.commandOptions));
        hdel = (...e10) => this.chain(new u3(e10, this.commandOptions));
        hexists = (...e10) => this.chain(new u4(e10, this.commandOptions));
        hexpire = (...e10) => this.chain(new u5(e10, this.commandOptions));
        hexpireat = (...e10) => this.chain(new u6(e10, this.commandOptions));
        hexpiretime = (...e10) => this.chain(new u7(e10, this.commandOptions));
        httl = (...e10) => this.chain(new hw(e10, this.commandOptions));
        hpexpire = (...e10) => this.chain(new u8(e10, this.commandOptions));
        hpexpireat = (...e10) => this.chain(new he(e10, this.commandOptions));
        hpexpiretime = (...e10) => this.chain(new ht(e10, this.commandOptions));
        hpttl = (...e10) => this.chain(new hr(e10, this.commandOptions));
        hpersist = (...e10) => this.chain(new u9(e10, this.commandOptions));
        hget = (...e10) => this.chain(new hs(e10, this.commandOptions));
        hgetall = (...e10) => this.chain(new hi(e10, this.commandOptions));
        hgetdel = (...e10) => this.chain(new ho(e10, this.commandOptions));
        hgetex = (...e10) => this.chain(new hc(e10, this.commandOptions));
        hincrby = (...e10) => this.chain(new hl(e10, this.commandOptions));
        hincrbyfloat = (...e10) => this.chain(new hu(e10, this.commandOptions));
        hkeys = (...e10) => this.chain(new hh(e10, this.commandOptions));
        hlen = (...e10) => this.chain(new hd(e10, this.commandOptions));
        hmget = (...e10) => this.chain(new ha(e10, this.commandOptions));
        hmset = (e10, t10) => this.chain(new hp([e10, t10], this.commandOptions));
        hrandfield = (e10, t10, r10) => this.chain(new um([e10, t10, r10], this.commandOptions));
        hscan = (...e10) => this.chain(new hm(e10, this.commandOptions));
        hset = (e10, t10) => this.chain(new hf([e10, t10], this.commandOptions));
        hsetex = (...e10) => this.chain(new hg(e10, this.commandOptions));
        hsetnx = (e10, t10, r10) => this.chain(new hy([e10, t10, r10], this.commandOptions));
        hstrlen = (...e10) => this.chain(new hb(e10, this.commandOptions));
        hvals = (...e10) => this.chain(new hv(e10, this.commandOptions));
        incr = (...e10) => this.chain(new hx(e10, this.commandOptions));
        incrby = (...e10) => this.chain(new h_(e10, this.commandOptions));
        incrbyfloat = (...e10) => this.chain(new hk(e10, this.commandOptions));
        keys = (...e10) => this.chain(new hJ(e10, this.commandOptions));
        lindex = (...e10) => this.chain(new hG(e10, this.commandOptions));
        linsert = (e10, t10, r10, s10) => this.chain(new hV([e10, t10, r10, s10], this.commandOptions));
        llen = (...e10) => this.chain(new hX(e10, this.commandOptions));
        lmove = (...e10) => this.chain(new hY(e10, this.commandOptions));
        lpop = (...e10) => this.chain(new hZ(e10, this.commandOptions));
        lmpop = (...e10) => this.chain(new hQ(e10, this.commandOptions));
        lpos = (...e10) => this.chain(new h0(e10, this.commandOptions));
        lpush = (e10, ...t10) => this.chain(new h1([e10, ...t10], this.commandOptions));
        lpushx = (e10, ...t10) => this.chain(new h2([e10, ...t10], this.commandOptions));
        lrange = (...e10) => this.chain(new h3(e10, this.commandOptions));
        lrem = (e10, t10, r10) => this.chain(new h4([e10, t10, r10], this.commandOptions));
        lset = (e10, t10, r10) => this.chain(new h5([e10, t10, r10], this.commandOptions));
        ltrim = (...e10) => this.chain(new h6(e10, this.commandOptions));
        mget = (...e10) => this.chain(new h7(e10, this.commandOptions));
        mset = (e10) => this.chain(new h9([e10], this.commandOptions));
        msetnx = (e10) => this.chain(new h8([e10], this.commandOptions));
        persist = (...e10) => this.chain(new de(e10, this.commandOptions));
        pexpire = (...e10) => this.chain(new dt(e10, this.commandOptions));
        pexpireat = (...e10) => this.chain(new dr(e10, this.commandOptions));
        pfadd = (...e10) => this.chain(new ds(e10, this.commandOptions));
        pfcount = (...e10) => this.chain(new di(e10, this.commandOptions));
        pfmerge = (...e10) => this.chain(new dn(e10, this.commandOptions));
        ping = (e10) => this.chain(new da(e10, this.commandOptions));
        psetex = (e10, t10, r10) => this.chain(new dc([e10, t10, r10], this.commandOptions));
        pttl = (...e10) => this.chain(new dl(e10, this.commandOptions));
        publish = (...e10) => this.chain(new du(e10, this.commandOptions));
        randomkey = () => this.chain(new dh(this.commandOptions));
        rename = (...e10) => this.chain(new dd(e10, this.commandOptions));
        renamenx = (...e10) => this.chain(new dp(e10, this.commandOptions));
        rpop = (...e10) => this.chain(new dm(e10, this.commandOptions));
        rpush = (e10, ...t10) => this.chain(new df([e10, ...t10], this.commandOptions));
        rpushx = (e10, ...t10) => this.chain(new dg([e10, ...t10], this.commandOptions));
        sadd = (e10, t10, ...r10) => this.chain(new dy([e10, t10, ...r10], this.commandOptions));
        scan = (...e10) => this.chain(new db(e10, this.commandOptions));
        scard = (...e10) => this.chain(new dw(e10, this.commandOptions));
        scriptExists = (...e10) => this.chain(new dv(e10, this.commandOptions));
        scriptFlush = (...e10) => this.chain(new dx(e10, this.commandOptions));
        scriptLoad = (...e10) => this.chain(new d_(e10, this.commandOptions));
        sdiff = (...e10) => this.chain(new dk(e10, this.commandOptions));
        sdiffstore = (...e10) => this.chain(new dE(e10, this.commandOptions));
        set = (e10, t10, r10) => this.chain(new dS([e10, t10, r10], this.commandOptions));
        setbit = (...e10) => this.chain(new dO(e10, this.commandOptions));
        setex = (e10, t10, r10) => this.chain(new dT([e10, t10, r10], this.commandOptions));
        setnx = (e10, t10) => this.chain(new dC([e10, t10], this.commandOptions));
        setrange = (...e10) => this.chain(new dR(e10, this.commandOptions));
        sinter = (...e10) => this.chain(new dA(e10, this.commandOptions));
        sintercard = (...e10) => this.chain(new dP(e10, this.commandOptions));
        sinterstore = (...e10) => this.chain(new dI(e10, this.commandOptions));
        sismember = (e10, t10) => this.chain(new dN([e10, t10], this.commandOptions));
        smembers = (...e10) => this.chain(new dL(e10, this.commandOptions));
        smismember = (e10, t10) => this.chain(new dU([e10, t10], this.commandOptions));
        smove = (e10, t10, r10) => this.chain(new dM([e10, t10, r10], this.commandOptions));
        spop = (...e10) => this.chain(new dD(e10, this.commandOptions));
        srandmember = (...e10) => this.chain(new dj(e10, this.commandOptions));
        srem = (e10, ...t10) => this.chain(new dq([e10, ...t10], this.commandOptions));
        sscan = (...e10) => this.chain(new dz(e10, this.commandOptions));
        strlen = (...e10) => this.chain(new dB(e10, this.commandOptions));
        sunion = (...e10) => this.chain(new d$(e10, this.commandOptions));
        sunionstore = (...e10) => this.chain(new dK(e10, this.commandOptions));
        time = () => this.chain(new dH(this.commandOptions));
        touch = (...e10) => this.chain(new dF(e10, this.commandOptions));
        ttl = (...e10) => this.chain(new dW(e10, this.commandOptions));
        type = (...e10) => this.chain(new dJ(e10, this.commandOptions));
        unlink = (...e10) => this.chain(new dG(e10, this.commandOptions));
        zadd = (...e10) => ("score" in e10[1], this.chain(new pt([e10[0], e10[1], ...e10.slice(2)], this.commandOptions)));
        xadd = (...e10) => this.chain(new dY(e10, this.commandOptions));
        xack = (...e10) => this.chain(new dV(e10, this.commandOptions));
        xackdel = (...e10) => this.chain(new dX(e10, this.commandOptions));
        xdel = (...e10) => this.chain(new d0(e10, this.commandOptions));
        xdelex = (...e10) => this.chain(new d1(e10, this.commandOptions));
        xgroup = (...e10) => this.chain(new d2(e10, this.commandOptions));
        xread = (...e10) => this.chain(new d7(e10, this.commandOptions));
        xreadgroup = (...e10) => this.chain(new d9(e10, this.commandOptions));
        xinfo = (...e10) => this.chain(new d3(e10, this.commandOptions));
        xlen = (...e10) => this.chain(new d4(e10, this.commandOptions));
        xpending = (...e10) => this.chain(new d5(e10, this.commandOptions));
        xclaim = (...e10) => this.chain(new dZ(e10, this.commandOptions));
        xautoclaim = (...e10) => this.chain(new dQ(e10, this.commandOptions));
        xtrim = (...e10) => this.chain(new pe(e10, this.commandOptions));
        xrange = (...e10) => this.chain(new d6(e10, this.commandOptions));
        xrevrange = (...e10) => this.chain(new d8(e10, this.commandOptions));
        zcard = (...e10) => this.chain(new pr(e10, this.commandOptions));
        zcount = (...e10) => this.chain(new ps(e10, this.commandOptions));
        zincrby = (e10, t10, r10) => this.chain(new pi([e10, t10, r10], this.commandOptions));
        zinterstore = (...e10) => this.chain(new pn(e10, this.commandOptions));
        zlexcount = (...e10) => this.chain(new pa(e10, this.commandOptions));
        zmscore = (...e10) => this.chain(new px(e10, this.commandOptions));
        zpopmax = (...e10) => this.chain(new po(e10, this.commandOptions));
        zpopmin = (...e10) => this.chain(new pc(e10, this.commandOptions));
        zrange = (...e10) => this.chain(new pl(e10, this.commandOptions));
        zrank = (e10, t10) => this.chain(new pu([e10, t10], this.commandOptions));
        zrem = (e10, ...t10) => this.chain(new ph([e10, ...t10], this.commandOptions));
        zremrangebylex = (...e10) => this.chain(new pd(e10, this.commandOptions));
        zremrangebyrank = (...e10) => this.chain(new pp(e10, this.commandOptions));
        zremrangebyscore = (...e10) => this.chain(new pm(e10, this.commandOptions));
        zrevrank = (e10, t10) => this.chain(new pf([e10, t10], this.commandOptions));
        zscan = (...e10) => this.chain(new pg(e10, this.commandOptions));
        zscore = (e10, t10) => this.chain(new py([e10, t10], this.commandOptions));
        zunionstore = (...e10) => this.chain(new pw(e10, this.commandOptions));
        zunion = (...e10) => this.chain(new pb(e10, this.commandOptions));
        get json() {
          return { arrappend: (...e10) => this.chain(new hE(e10, this.commandOptions)), arrindex: (...e10) => this.chain(new hS(e10, this.commandOptions)), arrinsert: (...e10) => this.chain(new hO(e10, this.commandOptions)), arrlen: (...e10) => this.chain(new hT(e10, this.commandOptions)), arrpop: (...e10) => this.chain(new hC(e10, this.commandOptions)), arrtrim: (...e10) => this.chain(new hR(e10, this.commandOptions)), clear: (...e10) => this.chain(new hA(e10, this.commandOptions)), del: (...e10) => this.chain(new hP(e10, this.commandOptions)), forget: (...e10) => this.chain(new hI(e10, this.commandOptions)), get: (...e10) => this.chain(new hN(e10, this.commandOptions)), merge: (...e10) => this.chain(new hL(e10, this.commandOptions)), mget: (...e10) => this.chain(new hU(e10, this.commandOptions)), mset: (...e10) => this.chain(new hM(e10, this.commandOptions)), numincrby: (...e10) => this.chain(new hD(e10, this.commandOptions)), nummultby: (...e10) => this.chain(new hj(e10, this.commandOptions)), objkeys: (...e10) => this.chain(new hq(e10, this.commandOptions)), objlen: (...e10) => this.chain(new hz(e10, this.commandOptions)), resp: (...e10) => this.chain(new hB(e10, this.commandOptions)), set: (...e10) => this.chain(new h$(e10, this.commandOptions)), strappend: (...e10) => this.chain(new hK(e10, this.commandOptions)), strlen: (...e10) => this.chain(new hH(e10, this.commandOptions)), toggle: (...e10) => this.chain(new hF(e10, this.commandOptions)), type: (...e10) => this.chain(new hW(e10, this.commandOptions)) };
        }
        get functions() {
          return { load: (...e10) => this.chain(new u$(e10, this.commandOptions)), list: (...e10) => this.chain(new uz(e10, this.commandOptions)), delete: (...e10) => this.chain(new uj(e10, this.commandOptions)), flush: () => this.chain(new uq(this.commandOptions)), stats: () => this.chain(new uK(this.commandOptions)), call: (...e10) => this.chain(new uL(e10, this.commandOptions)), callRo: (...e10) => this.chain(new uU(e10, this.commandOptions)) };
        }
      }, pk = /* @__PURE__ */ new Set(["get", "getrange", "mget", "strlen", "bitcount", "bitpos", "getbit", "hexists", "hget", "hgetall", "hkeys", "hlen", "hmget", "hrandfield", "hscan", "hstrlen", "httl", "hvals", "hexpiretime", "hpexpiretime", "hpttl", "lindex", "llen", "lpos", "lrange", "scard", "sdiff", "sinter", "sintercard", "sismember", "smembers", "smismember", "srandmember", "sscan", "sunion", "zcard", "zcount", "zlexcount", "zmscore", "zrange", "zrank", "zrevrank", "zscan", "zscore", "zunion", "exists", "type", "ttl", "pttl", "randomkey", "touch", "pfcount", "xinfo", "xlen", "xpending", "xrange", "xread", "xrevrange", "geodist", "geohash", "geopos", "geosearch", "scriptExists", "evalRo", "evalshaRo", "dbsize", "echo", "ping", "time", "scan", "keys", "arrindex", "arrlen", "objkeys", "objlen", "resp", "list", "stats", "callRo"]), pE = /* @__PURE__ */ new Set(["scan", "keys", "flushdb", "flushall", "dbsize", "hscan", "hgetall", "hkeys", "lrange", "sscan", "smembers", "xrange", "xrevrange", "zscan", "zrange", "exec"]), pS = class {
        pipelinePromises = /* @__PURE__ */ new WeakMap();
        activeReadPipeline = null;
        activeWritePipeline = null;
        readIndex = 0;
        writeIndex = 0;
        redis;
        pipeline;
        pipelineCounter = 0;
        constructor(e10) {
          this.redis = e10, this.pipeline = e10.pipeline();
        }
        async withAutoPipeline(e10, t10) {
          let r10 = "read" === e10, s10 = r10 ? this.activeReadPipeline : this.activeWritePipeline, i10 = s10 ?? this.redis.pipeline();
          s10 || (r10 ? (this.activeReadPipeline = i10, this.readIndex = 0) : (this.activeWritePipeline = i10, this.writeIndex = 0));
          let n10 = r10 ? this.readIndex++ : this.writeIndex++;
          t10(i10), r10 && this.readIndex >= 1e3 ? this.activeReadPipeline = null : !r10 && this.writeIndex >= 1e3 && (this.activeWritePipeline = null);
          let a10 = this.deferExecution().then(() => {
            if (!this.pipelinePromises.has(i10)) {
              let e11 = i10.exec({ keepErrors: true });
              this.pipelineCounter += 1, this.pipelinePromises.set(i10, e11), this.activeReadPipeline === i10 && (this.activeReadPipeline = null), this.activeWritePipeline === i10 && (this.activeWritePipeline = null);
            }
            return this.pipelinePromises.get(i10);
          }), o10 = (await a10)[n10];
          if (o10.error) throw new lQ(`Command failed: ${o10.error}`);
          return o10.result;
        }
        async deferExecution() {
          await Promise.resolve(), await Promise.resolve();
        }
      }, pO = class extends ue {
        constructor(e10, t10) {
          super([], { ...t10, headers: { Accept: "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" }, path: ["psubscribe", ...e10], streamOptions: { isStreaming: true, onMessage: t10?.streamOptions?.onMessage, signal: t10?.streamOptions?.signal } });
        }
      }, pT = class extends EventTarget {
        subscriptions;
        client;
        listeners;
        opts;
        constructor(e10, t10, r10 = false, s10) {
          for (const i10 of (super(), this.client = e10, this.subscriptions = /* @__PURE__ */ new Map(), this.listeners = /* @__PURE__ */ new Map(), this.opts = s10, t10)) r10 ? this.subscribeToPattern(i10) : this.subscribeToChannel(i10);
        }
        subscribeToChannel(e10) {
          let t10 = new AbortController(), r10 = new pC([e10], { streamOptions: { signal: t10.signal, onMessage: (e11) => this.handleMessage(e11, false) } });
          r10.exec(this.client).catch((e11) => {
            "AbortError" !== e11.name && this.dispatchToListeners("error", e11);
          }), this.subscriptions.set(e10, { command: r10, controller: t10, isPattern: false });
        }
        subscribeToPattern(e10) {
          let t10 = new AbortController(), r10 = new pO([e10], { streamOptions: { signal: t10.signal, onMessage: (e11) => this.handleMessage(e11, true) } });
          r10.exec(this.client).catch((e11) => {
            "AbortError" !== e11.name && this.dispatchToListeners("error", e11);
          }), this.subscriptions.set(e10, { command: r10, controller: t10, isPattern: true });
        }
        handleMessage(e10, t10) {
          let r10 = e10.replace(/^data:\s*/, ""), s10 = r10.indexOf(","), i10 = r10.indexOf(",", s10 + 1), n10 = t10 ? r10.indexOf(",", i10 + 1) : -1;
          if (-1 !== s10 && -1 !== i10) {
            let e11 = r10.slice(0, s10);
            if (t10 && "pmessage" === e11 && -1 !== n10) {
              let e12 = r10.slice(s10 + 1, i10), t11 = r10.slice(i10 + 1, n10), a10 = r10.slice(n10 + 1);
              try {
                let r11 = this.opts?.automaticDeserialization === false ? a10 : JSON.parse(a10);
                this.dispatchToListeners("pmessage", { pattern: e12, channel: t11, message: r11 }), this.dispatchToListeners(`pmessage:${e12}`, { pattern: e12, channel: t11, message: r11 });
              } catch (e13) {
                this.dispatchToListeners("error", Error(`Failed to parse message: ${e13}`));
              }
            } else {
              let t11 = r10.slice(s10 + 1, i10), n11 = r10.slice(i10 + 1);
              try {
                if ("subscribe" === e11 || "psubscribe" === e11 || "unsubscribe" === e11 || "punsubscribe" === e11) {
                  let t12 = Number.parseInt(n11);
                  this.dispatchToListeners(e11, t12);
                } else {
                  let r11 = this.opts?.automaticDeserialization === false ? n11 : pR(n11);
                  this.dispatchToListeners(e11, { channel: t11, message: r11 }), this.dispatchToListeners(`${e11}:${t11}`, { channel: t11, message: r11 });
                }
              } catch (e12) {
                this.dispatchToListeners("error", Error(`Failed to parse message: ${e12}`));
              }
            }
          }
        }
        dispatchToListeners(e10, t10) {
          let r10 = this.listeners.get(e10);
          if (r10) for (let e11 of r10) e11(t10);
        }
        on(e10, t10) {
          this.listeners.has(e10) || this.listeners.set(e10, /* @__PURE__ */ new Set()), this.listeners.get(e10)?.add(t10);
        }
        removeAllListeners() {
          this.listeners.clear();
        }
        async unsubscribe(e10) {
          if (e10) for (let t10 of e10) {
            let e11 = this.subscriptions.get(t10);
            if (e11) {
              try {
                e11.controller.abort();
              } catch {
              }
              this.subscriptions.delete(t10);
            }
          }
          else {
            for (let e11 of this.subscriptions.values()) try {
              e11.controller.abort();
            } catch {
            }
            this.subscriptions.clear(), this.removeAllListeners();
          }
        }
        getSubscribedChannels() {
          return [...this.subscriptions.keys()];
        }
      }, pC = class extends ue {
        constructor(e10, t10) {
          super([], { ...t10, headers: { Accept: "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" }, path: ["subscribe", ...e10], streamOptions: { isStreaming: true, onMessage: t10?.streamOptions?.onMessage, signal: t10?.streamOptions?.signal } });
        }
      }, pR = (e10) => {
        try {
          return JSON.parse(e10);
        } catch {
          return e10;
        }
      }, pA = class {
        script;
        sha1;
        initPromise;
        redis;
        constructor(e10, t10) {
          this.redis = e10, this.script = t10, this.sha1 = "", this.init(t10);
        }
        init(e10) {
          return this.initPromise || (this.initPromise = this.digest(e10).then((e11) => {
            this.sha1 = e11;
          })), this.initPromise;
        }
        async eval(e10, t10) {
          return await this.init(this.script), await this.redis.eval(this.script, e10, t10);
        }
        async evalsha(e10, t10) {
          return await this.init(this.script), await this.redis.evalsha(this.sha1, e10, t10);
        }
        async exec(e10, t10) {
          return await this.init(this.script), await this.redis.evalsha(this.sha1, e10, t10).catch(async (r10) => {
            if (r10 instanceof Error && r10.message.toLowerCase().includes("noscript")) return await this.redis.eval(this.script, e10, t10);
            throw r10;
          });
        }
        async digest(e10) {
          let t10 = new TextEncoder().encode(e10);
          return [...new Uint8Array(await lJ.digest("SHA-1", t10))].map((e11) => e11.toString(16).padStart(2, "0")).join("");
        }
      }, pP = class {
        script;
        sha1;
        initPromise;
        redis;
        constructor(e10, t10) {
          this.redis = e10, this.sha1 = "", this.script = t10, this.init(t10);
        }
        init(e10) {
          return this.initPromise || (this.initPromise = this.digest(e10).then((e11) => {
            this.sha1 = e11;
          })), this.initPromise;
        }
        async evalRo(e10, t10) {
          return await this.init(this.script), await this.redis.evalRo(this.script, e10, t10);
        }
        async evalshaRo(e10, t10) {
          return await this.init(this.script), await this.redis.evalshaRo(this.sha1, e10, t10);
        }
        async exec(e10, t10) {
          return await this.init(this.script), await this.redis.evalshaRo(this.sha1, e10, t10).catch(async (r10) => {
            if (r10 instanceof Error && r10.message.toLowerCase().includes("noscript")) return await this.redis.evalRo(this.script, e10, t10);
            throw r10;
          });
        }
        async digest(e10) {
          let t10 = new TextEncoder().encode(e10);
          return [...new Uint8Array(await lJ.digest("SHA-1", t10))].map((e11) => e11.toString(16).padStart(2, "0")).join("");
        }
      }, pI = class {
        client;
        opts;
        enableTelemetry;
        enableAutoPipelining;
        constructor(e10, t10) {
          this.client = e10, this.opts = t10, this.enableTelemetry = t10?.enableTelemetry ?? true, t10?.readYourWrites === false && (this.client.readYourWrites = false), this.enableAutoPipelining = t10?.enableAutoPipelining ?? true;
        }
        get readYourWritesSyncToken() {
          return this.client.upstashSyncToken;
        }
        set readYourWritesSyncToken(e10) {
          this.client.upstashSyncToken = e10;
        }
        get json() {
          return { arrappend: (...e10) => new hE(e10, this.opts).exec(this.client), arrindex: (...e10) => new hS(e10, this.opts).exec(this.client), arrinsert: (...e10) => new hO(e10, this.opts).exec(this.client), arrlen: (...e10) => new hT(e10, this.opts).exec(this.client), arrpop: (...e10) => new hC(e10, this.opts).exec(this.client), arrtrim: (...e10) => new hR(e10, this.opts).exec(this.client), clear: (...e10) => new hA(e10, this.opts).exec(this.client), del: (...e10) => new hP(e10, this.opts).exec(this.client), forget: (...e10) => new hI(e10, this.opts).exec(this.client), get: (...e10) => new hN(e10, this.opts).exec(this.client), merge: (...e10) => new hL(e10, this.opts).exec(this.client), mget: (...e10) => new hU(e10, this.opts).exec(this.client), mset: (...e10) => new hM(e10, this.opts).exec(this.client), numincrby: (...e10) => new hD(e10, this.opts).exec(this.client), nummultby: (...e10) => new hj(e10, this.opts).exec(this.client), objkeys: (...e10) => new hq(e10, this.opts).exec(this.client), objlen: (...e10) => new hz(e10, this.opts).exec(this.client), resp: (...e10) => new hB(e10, this.opts).exec(this.client), set: (...e10) => new h$(e10, this.opts).exec(this.client), strappend: (...e10) => new hK(e10, this.opts).exec(this.client), strlen: (...e10) => new hH(e10, this.opts).exec(this.client), toggle: (...e10) => new hF(e10, this.opts).exec(this.client), type: (...e10) => new hW(e10, this.opts).exec(this.client) };
        }
        get functions() {
          return { load: (...e10) => new u$(e10, this.opts).exec(this.client), list: (...e10) => new uz(e10, this.opts).exec(this.client), delete: (...e10) => new uj(e10, this.opts).exec(this.client), flush: () => new uq(this.opts).exec(this.client), stats: () => new uK(this.opts).exec(this.client), call: (...e10) => new uL(e10, this.opts).exec(this.client), callRo: (...e10) => new uU(e10, this.opts).exec(this.client) };
        }
        use = (e10) => {
          let t10 = this.client.request.bind(this.client);
          this.client.request = (r10) => e10(r10, t10);
        };
        addTelemetry = (e10) => {
          if (this.enableTelemetry) try {
            this.client.mergeTelemetry(e10);
          } catch {
          }
        };
        createScript(e10, t10) {
          return t10?.readonly ? new pP(this, e10) : new pA(this, e10);
        }
        get search() {
          return { createIndex: (e10) => ul(this.client, e10), index: (e10) => uu(this.client, e10), alias: { list: () => uh(this.client), add: ({ indexName: e10, alias: t10 }) => ud(this.client, { indexName: e10, alias: t10 }), delete: ({ alias: e10 }) => up(this.client, { alias: e10 }) } };
        }
        pipeline = () => new p_({ client: this.client, commandOptions: this.opts, multiExec: false });
        autoPipeline = () => function e10(t10, r10 = "root") {
          return t10.autoPipelineExecutor || (t10.autoPipelineExecutor = new pS(t10)), new Proxy(t10, { get: (t11, s10) => {
            if ("pipelineCounter" === s10) return t11.autoPipelineExecutor.pipelineCounter;
            if ("root" === r10 && "json" === s10) return e10(t11, "json");
            if ("root" === r10 && "functions" === s10) return e10(t11, "functions");
            if ("root" === r10) {
              let e11 = s10 in t11 && !(s10 in t11.autoPipelineExecutor.pipeline), r11 = pE.has(s10);
              if (e11 || r11) return t11[s10];
            }
            let i10 = t11.autoPipelineExecutor.pipeline, n10 = "json" === r10 ? i10.json[s10] : "functions" === r10 ? i10.functions[s10] : i10[s10];
            return "function" == typeof n10 ? (...e11) => {
              let i11 = pk.has(s10) ? "read" : "write";
              return t11.autoPipelineExecutor.withAutoPipeline(i11, (t12) => {
                ("json" === r10 ? t12.json[s10] : "functions" === r10 ? t12.functions[s10] : t12[s10])(...e11);
              });
            } : n10;
          } });
        }(this);
        multi = () => new p_({ client: this.client, commandOptions: this.opts, multiExec: true });
        bitfield = (...e10) => new uy(e10, this.client, this.opts);
        append = (...e10) => new uf(e10, this.opts).exec(this.client);
        bitcount = (...e10) => new ug(e10, this.opts).exec(this.client);
        bitop = (e10, t10, r10, ...s10) => new ub([e10, t10, r10, ...s10], this.opts).exec(this.client);
        bitpos = (...e10) => new uw(e10, this.opts).exec(this.client);
        clientSetinfo = (...e10) => new uv(e10, this.opts).exec(this.client);
        copy = (...e10) => new ux(e10, this.opts).exec(this.client);
        dbsize = () => new u_(this.opts).exec(this.client);
        decr = (...e10) => new uk(e10, this.opts).exec(this.client);
        decrby = (...e10) => new uE(e10, this.opts).exec(this.client);
        del = (...e10) => new uS(e10, this.opts).exec(this.client);
        echo = (...e10) => new uO(e10, this.opts).exec(this.client);
        evalRo = (...e10) => new uT(e10, this.opts).exec(this.client);
        eval = (...e10) => new uC(e10, this.opts).exec(this.client);
        evalshaRo = (...e10) => new uR(e10, this.opts).exec(this.client);
        evalsha = (...e10) => new uA(e10, this.opts).exec(this.client);
        exec = (e10) => new ut(e10, this.opts).exec(this.client);
        exists = (...e10) => new uP(e10, this.opts).exec(this.client);
        expire = (...e10) => new uI(e10, this.opts).exec(this.client);
        expireat = (...e10) => new uN(e10, this.opts).exec(this.client);
        flushall = (e10) => new uM(e10, this.opts).exec(this.client);
        flushdb = (...e10) => new uD(e10, this.opts).exec(this.client);
        geoadd = (...e10) => new uF(e10, this.opts).exec(this.client);
        geopos = (...e10) => new uG(e10, this.opts).exec(this.client);
        geodist = (...e10) => new uW(e10, this.opts).exec(this.client);
        geohash = (...e10) => new uJ(e10, this.opts).exec(this.client);
        geosearch = (...e10) => new uV(e10, this.opts).exec(this.client);
        geosearchstore = (...e10) => new uX(e10, this.opts).exec(this.client);
        get = (...e10) => new uY(e10, this.opts).exec(this.client);
        getbit = (...e10) => new uQ(e10, this.opts).exec(this.client);
        getdel = (...e10) => new uZ(e10, this.opts).exec(this.client);
        getex = (...e10) => new u0(e10, this.opts).exec(this.client);
        getrange = (...e10) => new u1(e10, this.opts).exec(this.client);
        getset = (e10, t10) => new u2([e10, t10], this.opts).exec(this.client);
        hdel = (...e10) => new u3(e10, this.opts).exec(this.client);
        hexists = (...e10) => new u4(e10, this.opts).exec(this.client);
        hexpire = (...e10) => new u5(e10, this.opts).exec(this.client);
        hexpireat = (...e10) => new u6(e10, this.opts).exec(this.client);
        hexpiretime = (...e10) => new u7(e10, this.opts).exec(this.client);
        httl = (...e10) => new hw(e10, this.opts).exec(this.client);
        hpexpire = (...e10) => new u8(e10, this.opts).exec(this.client);
        hpexpireat = (...e10) => new he(e10, this.opts).exec(this.client);
        hpexpiretime = (...e10) => new ht(e10, this.opts).exec(this.client);
        hpttl = (...e10) => new hr(e10, this.opts).exec(this.client);
        hpersist = (...e10) => new u9(e10, this.opts).exec(this.client);
        hget = (...e10) => new hs(e10, this.opts).exec(this.client);
        hgetall = (...e10) => new hi(e10, this.opts).exec(this.client);
        hgetdel = (...e10) => new ho(e10, this.opts).exec(this.client);
        hgetex = (...e10) => new hc(e10, this.opts).exec(this.client);
        hincrby = (...e10) => new hl(e10, this.opts).exec(this.client);
        hincrbyfloat = (...e10) => new hu(e10, this.opts).exec(this.client);
        hkeys = (...e10) => new hh(e10, this.opts).exec(this.client);
        hlen = (...e10) => new hd(e10, this.opts).exec(this.client);
        hmget = (...e10) => new ha(e10, this.opts).exec(this.client);
        hmset = (e10, t10) => new hp([e10, t10], this.opts).exec(this.client);
        hrandfield = (e10, t10, r10) => new um([e10, t10, r10], this.opts).exec(this.client);
        hscan = (...e10) => new hm(e10, this.opts).exec(this.client);
        hset = (e10, t10) => new hf([e10, t10], this.opts).exec(this.client);
        hsetex = (...e10) => new hg(e10, this.opts).exec(this.client);
        hsetnx = (e10, t10, r10) => new hy([e10, t10, r10], this.opts).exec(this.client);
        hstrlen = (...e10) => new hb(e10, this.opts).exec(this.client);
        hvals = (...e10) => new hv(e10, this.opts).exec(this.client);
        incr = (...e10) => new hx(e10, this.opts).exec(this.client);
        incrby = (...e10) => new h_(e10, this.opts).exec(this.client);
        incrbyfloat = (...e10) => new hk(e10, this.opts).exec(this.client);
        keys = (...e10) => new hJ(e10, this.opts).exec(this.client);
        lindex = (...e10) => new hG(e10, this.opts).exec(this.client);
        linsert = (e10, t10, r10, s10) => new hV([e10, t10, r10, s10], this.opts).exec(this.client);
        llen = (...e10) => new hX(e10, this.opts).exec(this.client);
        lmove = (...e10) => new hY(e10, this.opts).exec(this.client);
        lpop = (...e10) => new hZ(e10, this.opts).exec(this.client);
        lmpop = (...e10) => new hQ(e10, this.opts).exec(this.client);
        lpos = (...e10) => new h0(e10, this.opts).exec(this.client);
        lpush = (e10, ...t10) => new h1([e10, ...t10], this.opts).exec(this.client);
        lpushx = (e10, ...t10) => new h2([e10, ...t10], this.opts).exec(this.client);
        lrange = (...e10) => new h3(e10, this.opts).exec(this.client);
        lrem = (e10, t10, r10) => new h4([e10, t10, r10], this.opts).exec(this.client);
        lset = (e10, t10, r10) => new h5([e10, t10, r10], this.opts).exec(this.client);
        ltrim = (...e10) => new h6(e10, this.opts).exec(this.client);
        mget = (...e10) => new h7(e10, this.opts).exec(this.client);
        mset = (e10) => new h9([e10], this.opts).exec(this.client);
        msetnx = (e10) => new h8([e10], this.opts).exec(this.client);
        persist = (...e10) => new de(e10, this.opts).exec(this.client);
        pexpire = (...e10) => new dt(e10, this.opts).exec(this.client);
        pexpireat = (...e10) => new dr(e10, this.opts).exec(this.client);
        pfadd = (...e10) => new ds(e10, this.opts).exec(this.client);
        pfcount = (...e10) => new di(e10, this.opts).exec(this.client);
        pfmerge = (...e10) => new dn(e10, this.opts).exec(this.client);
        ping = (e10) => new da(e10, this.opts).exec(this.client);
        psetex = (e10, t10, r10) => new dc([e10, t10, r10], this.opts).exec(this.client);
        psubscribe = (e10) => {
          let t10 = Array.isArray(e10) ? e10 : [e10];
          return new pT(this.client, t10, true, this.opts);
        };
        pttl = (...e10) => new dl(e10, this.opts).exec(this.client);
        publish = (...e10) => new du(e10, this.opts).exec(this.client);
        randomkey = () => new dh().exec(this.client);
        rename = (...e10) => new dd(e10, this.opts).exec(this.client);
        renamenx = (...e10) => new dp(e10, this.opts).exec(this.client);
        rpop = (...e10) => new dm(e10, this.opts).exec(this.client);
        rpush = (e10, ...t10) => new df([e10, ...t10], this.opts).exec(this.client);
        rpushx = (e10, ...t10) => new dg([e10, ...t10], this.opts).exec(this.client);
        sadd = (e10, t10, ...r10) => new dy([e10, t10, ...r10], this.opts).exec(this.client);
        scan(e10, t10) {
          return new db([e10, t10], this.opts).exec(this.client);
        }
        scard = (...e10) => new dw(e10, this.opts).exec(this.client);
        scriptExists = (...e10) => new dv(e10, this.opts).exec(this.client);
        scriptFlush = (...e10) => new dx(e10, this.opts).exec(this.client);
        scriptLoad = (...e10) => new d_(e10, this.opts).exec(this.client);
        sdiff = (...e10) => new dk(e10, this.opts).exec(this.client);
        sdiffstore = (...e10) => new dE(e10, this.opts).exec(this.client);
        set = (e10, t10, r10) => new dS([e10, t10, r10], this.opts).exec(this.client);
        setbit = (...e10) => new dO(e10, this.opts).exec(this.client);
        setex = (e10, t10, r10) => new dT([e10, t10, r10], this.opts).exec(this.client);
        setnx = (e10, t10) => new dC([e10, t10], this.opts).exec(this.client);
        setrange = (...e10) => new dR(e10, this.opts).exec(this.client);
        sinter = (...e10) => new dA(e10, this.opts).exec(this.client);
        sintercard = (...e10) => new dP(e10, this.opts).exec(this.client);
        sinterstore = (...e10) => new dI(e10, this.opts).exec(this.client);
        sismember = (e10, t10) => new dN([e10, t10], this.opts).exec(this.client);
        smismember = (e10, t10) => new dU([e10, t10], this.opts).exec(this.client);
        smembers = (...e10) => new dL(e10, this.opts).exec(this.client);
        smove = (e10, t10, r10) => new dM([e10, t10, r10], this.opts).exec(this.client);
        spop = (...e10) => new dD(e10, this.opts).exec(this.client);
        srandmember = (...e10) => new dj(e10, this.opts).exec(this.client);
        srem = (e10, ...t10) => new dq([e10, ...t10], this.opts).exec(this.client);
        sscan = (...e10) => new dz(e10, this.opts).exec(this.client);
        strlen = (...e10) => new dB(e10, this.opts).exec(this.client);
        subscribe = (e10) => {
          let t10 = Array.isArray(e10) ? e10 : [e10];
          return new pT(this.client, t10, false, this.opts);
        };
        sunion = (...e10) => new d$(e10, this.opts).exec(this.client);
        sunionstore = (...e10) => new dK(e10, this.opts).exec(this.client);
        time = () => new dH().exec(this.client);
        touch = (...e10) => new dF(e10, this.opts).exec(this.client);
        ttl = (...e10) => new dW(e10, this.opts).exec(this.client);
        type = (...e10) => new dJ(e10, this.opts).exec(this.client);
        unlink = (...e10) => new dG(e10, this.opts).exec(this.client);
        xadd = (...e10) => new dY(e10, this.opts).exec(this.client);
        xack = (...e10) => new dV(e10, this.opts).exec(this.client);
        xackdel = (...e10) => new dX(e10, this.opts).exec(this.client);
        xdel = (...e10) => new d0(e10, this.opts).exec(this.client);
        xdelex = (...e10) => new d1(e10, this.opts).exec(this.client);
        xgroup = (...e10) => new d2(e10, this.opts).exec(this.client);
        xread = (...e10) => new d7(e10, this.opts).exec(this.client);
        xreadgroup = (...e10) => new d9(e10, this.opts).exec(this.client);
        xinfo = (...e10) => new d3(e10, this.opts).exec(this.client);
        xlen = (...e10) => new d4(e10, this.opts).exec(this.client);
        xpending = (...e10) => new d5(e10, this.opts).exec(this.client);
        xclaim = (...e10) => new dZ(e10, this.opts).exec(this.client);
        xautoclaim = (...e10) => new dQ(e10, this.opts).exec(this.client);
        xtrim = (...e10) => new pe(e10, this.opts).exec(this.client);
        xrange = (...e10) => new d6(e10, this.opts).exec(this.client);
        xrevrange = (...e10) => new d8(e10, this.opts).exec(this.client);
        zadd = (...e10) => ("score" in e10[1], new pt([e10[0], e10[1], ...e10.slice(2)], this.opts).exec(this.client));
        zcard = (...e10) => new pr(e10, this.opts).exec(this.client);
        zcount = (...e10) => new ps(e10, this.opts).exec(this.client);
        zdiffstore = (...e10) => new pv(e10, this.opts).exec(this.client);
        zincrby = (e10, t10, r10) => new pi([e10, t10, r10], this.opts).exec(this.client);
        zinterstore = (...e10) => new pn(e10, this.opts).exec(this.client);
        zlexcount = (...e10) => new pa(e10, this.opts).exec(this.client);
        zmscore = (...e10) => new px(e10, this.opts).exec(this.client);
        zpopmax = (...e10) => new po(e10, this.opts).exec(this.client);
        zpopmin = (...e10) => new pc(e10, this.opts).exec(this.client);
        zrange = (...e10) => new pl(e10, this.opts).exec(this.client);
        zrank = (e10, t10) => new pu([e10, t10], this.opts).exec(this.client);
        zrem = (e10, ...t10) => new ph([e10, ...t10], this.opts).exec(this.client);
        zremrangebylex = (...e10) => new pd(e10, this.opts).exec(this.client);
        zremrangebyrank = (...e10) => new pp(e10, this.opts).exec(this.client);
        zremrangebyscore = (...e10) => new pm(e10, this.opts).exec(this.client);
        zrevrank = (e10, t10) => new pf([e10, t10], this.opts).exec(this.client);
        zscan = (...e10) => new pg(e10, this.opts).exec(this.client);
        zscore = (e10, t10) => new py([e10, t10], this.opts).exec(this.client);
        zunion = (...e10) => new pb(e10, this.opts).exec(this.client);
        zunionstore = (...e10) => new pw(e10, this.opts).exec(this.client);
      };
      "u" < typeof atob && (e.g.atob = (e10) => eG.Buffer.from(e10, "base64").toString("utf8"));
      var pN = class e10 extends pI {
        constructor(e11) {
          if ("request" in e11) return void super(e11);
          e11.url ? (e11.url.startsWith(" ") || e11.url.endsWith(" ") || /\r|\n/.test(e11.url)) && console.warn("[Upstash Redis] The redis url contains whitespace or newline, which can cause errors!") : console.warn("[Upstash Redis] The 'url' property is missing or undefined in your Redis config."), e11.token ? (e11.token.startsWith(" ") || e11.token.endsWith(" ") || /\r|\n/.test(e11.token)) && console.warn("[Upstash Redis] The redis token contains whitespace or newline, which can cause errors!") : console.warn("[Upstash Redis] The 'token' property is missing or undefined in your Redis config.");
          const t10 = new l5({ baseUrl: e11.url, retry: e11.retry, headers: { authorization: `Bearer ${e11.token}` }, agent: e11.agent, responseEncoding: e11.responseEncoding, cache: e11.cache ?? "no-store", signal: e11.signal, keepAlive: e11.keepAlive, readYourWrites: e11.readYourWrites }), r10 = "object" == typeof process && process && "object" == typeof process.env && process.env ? process.env : {};
          if (super(t10, { automaticDeserialization: e11.automaticDeserialization, enableTelemetry: e11.enableTelemetry ?? !r10.UPSTASH_DISABLE_TELEMETRY, latencyLogging: e11.latencyLogging, enableAutoPipelining: e11.enableAutoPipelining }), "object" == typeof process && process && process.version, this.addTelemetry({ runtime: "edge-light", platform: r10.UPSTASH_CONSOLE ? "console" : r10.VERCEL ? "vercel" : r10.AWS_REGION ? "aws" : "unknown", sdk: "@upstash/redis@v1.38.0" }), this.enableAutoPipelining) return this.autoPipeline();
        }
        static fromEnv(t10) {
          if ("object" != typeof process || !process || "object" != typeof process.env || !process.env) throw TypeError('[Upstash Redis] Unable to get environment variables, `process.env` is undefined. If you are deploying to cloudflare, please import from "@upstash/redis/cloudflare" instead');
          let r10 = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
          r10 || console.warn("[Upstash Redis] Unable to find environment variable: `UPSTASH_REDIS_REST_URL`");
          let s10 = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
          return s10 || console.warn("[Upstash Redis] Unable to find environment variable: `UPSTASH_REDIS_REST_TOKEN`"), new e10({ ...t10, url: r10, token: s10 });
        }
      };
      let pL = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN ? new lW.Ratelimit({ redis: new pN({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN }), limiter: lW.Ratelimit.slidingWindow(20, "10 s"), analytics: true }) : null, pU = lF(["/sign-in(.*)", "/sign-up(.*)", "/login(.*)", "/register(.*)", "/forgot-password(.*)"]), pM = lF(["/"]), pD = lF(["/onboarding(.*)"]), pj = lF(["/auth/callback(.*)"]), pq = ((...e10) => {
        let t10, r10, [s10, i10] = [(t10 = e10)[0] instanceof Request ? t10[0] : void 0, t10[0] instanceof Request ? t10[1] : void 0], [n10, a10] = ["function" == typeof (r10 = e10)[0] ? r10[0] : void 0, (2 === r10.length ? r10[1] : "function" == typeof r10[0] ? {} : r10[0]) || {}];
        return o5.run(o4, () => {
          let e11 = o_("clerkMiddleware", (e12) => async (t12, r12) => {
            var s11, i11, o11, c10, l10;
            let u10 = "function" == typeof a10 ? await a10(t12) : a10, h10 = await l_((e13) => {
              var r13;
              return null == (r13 = t12.cookies.get(e13)) ? void 0 : r13.value;
            }), d10 = (s11 = u10.publishableKey || oC || (null == h10 ? void 0 : h10.publishableKey), i11 = () => ll.throwMissingPublishableKeyError(), s11 || i11(), s11), p2 = (o11 = u10.secretKey || oO || (null == h10 ? void 0 : h10.secretKey), c10 = () => ll.throwMissingSecretKeyError(), o11 || c10(), o11), m2 = new URL(t12.nextUrl.href), f2 = u10.frontendApiProxy, g2 = u10.proxyUrl || oI || u10.domain || oP;
            if (!f2 && !g2 && rr(d10) && r9(m2.hostname) && (f2 = { enabled: true }), f2) {
              let e13, r13, { enabled: s12, path: i12 = t6 } = f2;
              if (("function" == typeof s12 ? s12(m2) : s12) && (l10 = { proxyPath: i12 }, e13 = on(l10?.proxyPath || t6), (r13 = new URL(t12.url)).pathname === e13 || r13.pathname.startsWith(e13 + "/"))) return oo(t12, { proxyPath: i12, publishableKey: d10, secretKey: p2 });
            }
            let y2 = { publishableKey: d10, secretKey: p2, signInUrl: u10.signInUrl || oL, signUpUrl: u10.signUpUrl || oU, ...u10 };
            o4.set("requestData", y2);
            let b2 = await ly();
            y2.debug && e12.enable();
            let w2 = aG(t12);
            e12.debug("options", y2), e12.debug("url", () => w2.toJSON());
            let v2 = t12.headers.get(sw);
            v2 && v2.startsWith("Basic ") && e12.debug("Basic Auth detected");
            let x2 = t12.headers.get(sA);
            x2 && e12.debug("Content-Security-Policy detected", () => ({ value: x2 }));
            let _2 = await b2.authenticateRequest(w2, ((e13, t13) => {
              let r13 = t13;
              if (t13.frontendApiProxy && !t13.proxyUrl) {
                let { enabled: s12, path: i12 = t6 } = t13.frontendApiProxy, n11 = new URL(e13.url);
                if ("function" == typeof s12 ? s12(n11) : s12) {
                  let e14 = `${n11.origin}${i12}`;
                  r13 = { ...t13, proxyUrl: e14 };
                }
              }
              return { ...r13, ...((e14, t14) => {
                let r14, s12 = o6(null == t14 ? void 0 : t14.proxyUrl, e14.clerkUrl, oI);
                r14 = s12 && !r6(s12) ? new URL(s12, e14.clerkUrl).toString() : s12;
                let i12 = o6(t14.isSatellite, new URL(e14.url), oN), n11 = o6(t14.domain, new URL(e14.url), oP), a11 = (null == t14 ? void 0 : t14.signInUrl) || oL;
                if (i12 && !r14 && !n11) throw Error(la);
                if (i12 && !r6(a11) && rs(t14.secretKey || oO)) throw Error(lo);
                return { proxyUrl: r14, isSatellite: i12, domain: n11, signInUrl: a11 };
              })(e13, r13), acceptsToken: "any" };
            })(w2, y2));
            return lq({ clerkRequest: w2, request: t12, event: r12, requestState: _2, handler: n10, options: y2, resolvedParams: u10, keyless: h10, logger: e12 });
          }), t11 = o_("clerkMiddleware", (e12) => async (t12, r12) => {
            let s11 = "function" == typeof a10 ? await a10(t12) : a10, i11 = await l_((e13) => {
              var r13;
              return null == (r13 = t12.cookies.get(e13)) ? void 0 : r13.value;
            }), o11 = s11.signInUrl || oL || "", c10 = s11.signUpUrl || oU || "", l10 = { publishableKey: "", secretKey: "", signInUrl: o11, signUpUrl: c10, ...s11 };
            o4.set("requestData", l10), l10.debug && e12.enable();
            let u10 = aG(t12);
            return e12.debug("keyless bootstrap (no publishable key)", () => ({ signInUrl: o11, signUpUrl: c10 })), e12.debug("url", () => u10.toJSON()), lq({ clerkRequest: u10, request: t12, event: r12, requestState: function({ signInUrl: e13 = "", signUpUrl: t13 = "", isSatellite: r13 = false, domain: s12 = "", proxyUrl: i12 = "", reason: n11 = aj, message: a11 = "", headers: o12 = new Headers() } = {}) {
              return aK({ status: aU, reason: n11, message: a11, proxyUrl: i12, publishableKey: "", isSatellite: r13, domain: s12, signInUrl: e13, signUpUrl: t13, afterSignInUrl: "", afterSignUpUrl: "", isSignedIn: false, isAuthenticated: false, tokenType: sG, toAuth: () => aP({ status: aU, reason: n11, message: a11 }), headers: o12, token: null });
            }({ signInUrl: o11, signUpUrl: c10 }), handler: n10, options: l10, resolvedParams: s11, keyless: i11, logger: e12 });
          }), r11 = async (r12, s11) => {
            var i11, n11, o11;
            if ("/clerk-sync-keyless" === r12.nextUrl.pathname) {
              let e12, t12;
              return e12 = (o11 = r12).nextUrl.searchParams.get("returnUrl"), (t12 = new URL(o11.url)).pathname = "", er.redirect(e12 || t12.toString());
            }
            let c10 = "function" == typeof a10 ? await a10(r12) : a10, l10 = await l_((e12) => {
              var t12;
              return null == (t12 = r12.cookies.get(e12)) ? void 0 : t12.value;
            }), u10 = !(c10.publishableKey || oC || (null == l10 ? void 0 : l10.publishableKey)), h10 = null != (n11 = null == (i11 = o2(r12, sw)) ? void 0 : i11.replace("Bearer ", "")) ? n11 : "";
            return u10 && !iz(h10) ? t11(r12, s11) : e11(r12, s11);
          }, o10 = async (t12, s11) => oq ? r11(t12, s11) : e11(t12, s11);
          return s10 && i10 ? o10(s10, i10) : o10;
        });
      })(async (e10, t10) => {
        if (pL) {
          let e11 = t10.headers.get("x-forwarded-for") ?? t10.headers.get("x-real-ip") ?? "127.0.0.1", { success: r11, limit: s11, reset: i11, remaining: n11 } = await pL.limit(e11);
          if (!r11) return new er("Too Many Requests - Rate limit exceeded", { status: 429, headers: { "X-RateLimit-Limit": s11.toString(), "X-RateLimit-Remaining": n11.toString(), "X-RateLimit-Reset": i11.toString() } });
        }
        let { userId: r10, sessionClaims: s10 } = await e10(), i10 = s10?.publicMetadata, n10 = i10?.accountType;
        if (pM(t10)) return r10 ? "proveedor" === n10 ? er.redirect("http://localhost:3002") : er.redirect(new URL("/dashboard", t10.url)) : er.next();
        return pU(t10) ? er.next() : pj(t10) || pD(t10) ? r10 ? er.next() : er.redirect(new URL("/login", t10.url)) : r10 ? "proveedor" === n10 ? er.redirect("http://localhost:3002") : er.next() : er.redirect(new URL("/login", t10.url));
      });
      e.s(["config", 0, { matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"] }, "default", 0, pq, "runtime", 0, "experimental-edge"], 38403);
      let pz = { ...e.i(38403) }, pB = "/middleware", p$ = pz.middleware || pz.default;
      if ("function" != typeof p$) throw new class extends Error {
        constructor(e10) {
          super(e10), this.stack = "";
        }
      }(`The Middleware file "${pB}" must export a function named \`middleware\` or a default function.`);
      let pK = (e10) => ta({ ...e10, IncrementalCache: tX, incrementalCacheHandler: null, page: pB, handler: async (...e11) => {
        try {
          return await p$(...e11);
        } catch (i10) {
          let t10 = e11[0], r10 = new URL(t10.url), s10 = r10.pathname + r10.search;
          throw await f(i10, { path: s10, method: t10.method, headers: Object.fromEntries(t10.headers.entries()) }, { routerKind: "Pages Router", routePath: "/proxy", routeType: "proxy", revalidateReason: void 0 }), i10;
        }
      } });
      async function pH(e10, t10) {
        let r10 = await pK({ request: { url: e10.url, method: e10.method, headers: R(e10.headers), nextConfig: { basePath: "", i18n: "", trailingSlash: false, experimental: { cacheLife: { default: { stale: 300, revalidate: 900, expire: 4294967294 }, seconds: { stale: 30, revalidate: 1, expire: 60 }, minutes: { stale: 300, revalidate: 60, expire: 3600 }, hours: { stale: 300, revalidate: 3600, expire: 86400 }, days: { stale: 300, revalidate: 86400, expire: 604800 }, weeks: { stale: 300, revalidate: 604800, expire: 2592e3 }, max: { stale: 300, revalidate: 2592e3, expire: 31536e3 } }, authInterrupts: false, clientParamParsingOrigins: [] } }, page: { name: pB }, body: "GET" !== e10.method && "HEAD" !== e10.method ? e10.body ?? void 0 : void 0, waitUntil: t10.waitUntil, requestMeta: t10.requestMeta, signal: t10.signal || new AbortController().signal } });
        return null == t10.waitUntil || t10.waitUntil.call(t10, r10.waitUntil), r10.response;
      }
      e.s(["default", 0, pK, "handler", 0, pH], 77722);
    }]);
  }
});

// .next/server/edge/chunks/0p5a_next_dist_0x9fh3h._.js
var require_p5a_next_dist_0x9fh3h = __commonJS({
  ".next/server/edge/chunks/0p5a_next_dist_0x9fh3h._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/0p5a_next_dist_0x9fh3h._.js", 67168, (e, t, r) => {
      "use strict";
      var n = Object.defineProperty, s = Object.getOwnPropertyDescriptor, a = Object.getOwnPropertyNames, o = Object.prototype.hasOwnProperty, i = {}, c = { RequestCookies: () => y, ResponseCookies: () => g, parseCookie: () => f, parseSetCookie: () => d, stringifyCookie: () => l };
      for (var u in c) n(i, u, { get: c[u], enumerable: true });
      function l(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), n2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? n2 : `${n2}; ${r2.join("; ")}`;
      }
      function f(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [n2, s2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(n2, decodeURIComponent(null != s2 ? s2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function d(e2) {
        if (!e2) return;
        let [[t2, r2], ...n2] = f(e2), { domain: s2, expires: a2, httponly: o2, maxage: i2, path: c2, samesite: u2, secure: l2, partitioned: d2, priority: y2 } = Object.fromEntries(n2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        {
          var g2, m, b = { name: t2, value: decodeURIComponent(r2), domain: s2, ...a2 && { expires: new Date(a2) }, ...o2 && { httpOnly: true }, ..."string" == typeof i2 && { maxAge: Number(i2) }, path: c2, ...u2 && { sameSite: p.includes(g2 = (g2 = u2).toLowerCase()) ? g2 : void 0 }, ...l2 && { secure: true }, ...y2 && { priority: h.includes(m = (m = y2).toLowerCase()) ? m : void 0 }, ...d2 && { partitioned: true } };
          let e3 = {};
          for (let t3 in b) b[t3] && (e3[t3] = b[t3]);
          return e3;
        }
      }
      t.exports = ((e2, t2, r2, i2) => {
        if (t2 && "object" == typeof t2 || "function" == typeof t2) for (let c2 of a(t2)) o.call(e2, c2) || c2 === r2 || n(e2, c2, { get: () => t2[c2], enumerable: !(i2 = s(t2, c2)) || i2.enumerable });
        return e2;
      })(n({}, "__esModule", { value: true }), i);
      var p = ["strict", "lax", "none"], h = ["low", "medium", "high"], y = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const t2 = e2.get("cookie");
          if (t2) for (const [e3, r2] of f(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === n2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, n2 = this._parsed;
          return n2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(n2).map(([e3, t3]) => l(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => l(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, g = class {
        constructor(e2) {
          var t2, r2, n2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const s2 = null != (n2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? n2 : [];
          for (const e3 of Array.isArray(s2) ? s2 : function(e4) {
            if (!e4) return [];
            var t3, r3, n3, s3, a2, o2 = [], i2 = 0;
            function c2() {
              for (; i2 < e4.length && /\s/.test(e4.charAt(i2)); ) i2 += 1;
              return i2 < e4.length;
            }
            for (; i2 < e4.length; ) {
              for (t3 = i2, a2 = false; c2(); ) if ("," === (r3 = e4.charAt(i2))) {
                for (n3 = i2, i2 += 1, c2(), s3 = i2; i2 < e4.length && "=" !== (r3 = e4.charAt(i2)) && ";" !== r3 && "," !== r3; ) i2 += 1;
                i2 < e4.length && "=" === e4.charAt(i2) ? (a2 = true, i2 = s3, o2.push(e4.substring(t3, n3)), t3 = i2) : i2 = n3 + 1;
              } else i2 += 1;
              (!a2 || i2 >= e4.length) && o2.push(e4.substring(t3, e4.length));
            }
            return o2;
          }(s2)) {
            const t3 = d(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === n2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, n2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, s2 = this._parsed;
          return s2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...n2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = l(r3);
              t3.append("set-cookie", e4);
            }
          }(s2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(l).join("; ");
        }
      };
    }, 94438, 12914, (e) => {
      "use strict";
      e.i(67168), e.s([], 94438), e.s(["ReflectAdapter", 0, class {
        static get(e2, t, r) {
          let n = Reflect.get(e2, t, r);
          return "function" == typeof n ? n.bind(e2) : n;
        }
        static set(e2, t, r, n) {
          return Reflect.set(e2, t, r, n);
        }
        static has(e2, t) {
          return Reflect.has(e2, t);
        }
        static deleteProperty(e2, t) {
          return Reflect.deleteProperty(e2, t);
        }
      }], 12914);
    }, 42011, (e) => {
      "use strict";
      var t = e.i(12914);
      class r extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new r();
        }
      }
      class n extends Headers {
        constructor(e2) {
          super(), this.headers = new Proxy(e2, { get(r2, n2, s) {
            if ("symbol" == typeof n2) return t.ReflectAdapter.get(r2, n2, s);
            let a = n2.toLowerCase(), o = Object.keys(e2).find((e3) => e3.toLowerCase() === a);
            if (void 0 !== o) return t.ReflectAdapter.get(r2, o, s);
          }, set(r2, n2, s, a) {
            if ("symbol" == typeof n2) return t.ReflectAdapter.set(r2, n2, s, a);
            let o = n2.toLowerCase(), i = Object.keys(e2).find((e3) => e3.toLowerCase() === o);
            return t.ReflectAdapter.set(r2, i ?? n2, s, a);
          }, has(r2, n2) {
            if ("symbol" == typeof n2) return t.ReflectAdapter.has(r2, n2);
            let s = n2.toLowerCase(), a = Object.keys(e2).find((e3) => e3.toLowerCase() === s);
            return void 0 !== a && t.ReflectAdapter.has(r2, a);
          }, deleteProperty(r2, n2) {
            if ("symbol" == typeof n2) return t.ReflectAdapter.deleteProperty(r2, n2);
            let s = n2.toLowerCase(), a = Object.keys(e2).find((e3) => e3.toLowerCase() === s);
            return void 0 === a || t.ReflectAdapter.deleteProperty(r2, a);
          } });
        }
        static seal(e2) {
          return new Proxy(e2, { get(e3, n2, s) {
            switch (n2) {
              case "append":
              case "delete":
              case "set":
                return r.callable;
              default:
                return t.ReflectAdapter.get(e3, n2, s);
            }
          } });
        }
        merge(e2) {
          return Array.isArray(e2) ? e2.join(", ") : e2;
        }
        static from(e2) {
          return e2 instanceof Headers ? e2 : new n(e2);
        }
        append(e2, t2) {
          let r2 = this.headers[e2];
          "string" == typeof r2 ? this.headers[e2] = [r2, t2] : Array.isArray(r2) ? r2.push(t2) : this.headers[e2] = t2;
        }
        delete(e2) {
          delete this.headers[e2];
        }
        get(e2) {
          let t2 = this.headers[e2];
          return void 0 !== t2 ? this.merge(t2) : null;
        }
        has(e2) {
          return void 0 !== this.headers[e2];
        }
        set(e2, t2) {
          this.headers[e2] = t2;
        }
        forEach(e2, t2) {
          for (let [r2, n2] of this.entries()) e2.call(t2, n2, r2, this);
        }
        *entries() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = e2.toLowerCase(), r2 = this.get(t2);
            yield [t2, r2];
          }
        }
        *keys() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = e2.toLowerCase();
            yield t2;
          }
        }
        *values() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = this.get(e2);
            yield t2;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      e.s(["HeadersAdapter", 0, n]);
    }, 53441, (e) => {
      "use strict";
      let t = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class r {
        disable() {
          throw t;
        }
        getStore() {
        }
        run() {
          throw t;
        }
        exit() {
          throw t;
        }
        enterWith() {
          throw t;
        }
        static bind(e2) {
          return e2;
        }
      }
      let n = "u" > typeof globalThis && globalThis.AsyncLocalStorage;
      e.s(["bindSnapshot", 0, function(e2) {
        return n ? n.bind(e2) : r.bind(e2);
      }, "createAsyncLocalStorage", 0, function() {
        return n ? new n() : new r();
      }, "createSnapshot", 0, function() {
        return n ? n.snapshot() : function(e2, ...t2) {
          return e2(...t2);
        };
      }]);
    }, 1974, (e) => {
      "use strict";
      var t = e.i(51028);
      let r = "HANGING_PROMISE_REJECTION";
      class n extends Error {
        constructor(e2, t2) {
          super(`During prerendering, ${t2} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${t2} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context. This occurred at route "${e2}".`), this.route = e2, this.expression = t2, this.digest = r;
        }
      }
      let s = /* @__PURE__ */ new WeakMap();
      function a() {
      }
      e.s(["delayUntilRuntimeStage", 0, function(e2, r2) {
        let { stagedRendering: n2 } = e2;
        return n2 ? n2.waitForStage(n2.currentStage === t.RenderStage.EarlyStatic || n2.currentStage === t.RenderStage.EarlyRuntime ? t.RenderStage.EarlyRuntime : t.RenderStage.Runtime).then(() => r2) : r2;
      }, "isHangingPromiseRejectionError", 0, function(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && e2.digest === r;
      }, "makeDevtoolsIOAwarePromise", 0, function(e2, t2, r2) {
        return t2.stagedRendering ? t2.stagedRendering.delayUntilStage(r2, void 0, e2) : new Promise((t3) => {
          setTimeout(() => {
            t3(e2);
          }, 0);
        });
      }, "makeHangingPromise", 0, function(e2, t2, r2) {
        if (e2.aborted) return Promise.reject(new n(t2, r2));
        {
          let o = new Promise((a2, o2) => {
            let i = o2.bind(null, new n(t2, r2)), c = s.get(e2);
            if (c) c.push(i);
            else {
              let t3 = [i];
              s.set(e2, t3), e2.addEventListener("abort", () => {
                for (let e3 = 0; e3 < t3.length; e3++) t3[e3]();
              }, { once: true });
            }
          });
          return o.catch(a), o;
        }
      }]);
    }, 79569, (e, t, r) => {
      "use strict";
      var n = { H: null, A: null };
      function s(e2) {
        var t2 = "https://react.dev/errors/" + e2;
        if (1 < arguments.length) {
          t2 += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var r2 = 2; r2 < arguments.length; r2++) t2 += "&args[]=" + encodeURIComponent(arguments[r2]);
        }
        return "Minified React error #" + e2 + "; visit " + t2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var a = Array.isArray;
      function o() {
      }
      var i = Symbol.for("react.transitional.element"), c = Symbol.for("react.portal"), u = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), h = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), g = Symbol.for("react.activity"), m = Symbol.for("react.view_transition"), b = Symbol.iterator, _ = Object.prototype.hasOwnProperty, v = Object.assign;
      function R(e2, t2, r2) {
        var n2 = r2.ref;
        return { $$typeof: i, type: e2, key: t2, ref: void 0 !== n2 ? n2 : null, props: r2 };
      }
      function w(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === i;
      }
      var S = /\/+/g;
      function E(e2, t2) {
        var r2, n2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (r2 = "" + e2.key, n2 = { "=": "=0", ":": "=2" }, "$" + r2.replace(/[=:]/g, function(e3) {
          return n2[e3];
        })) : t2.toString(36);
      }
      function A(e2, t2, r2) {
        if (null == e2) return e2;
        var n2 = [], u2 = 0;
        return !function e3(t3, r3, n3, u3, l2) {
          var f2, d2, p2, h2 = typeof t3;
          ("undefined" === h2 || "boolean" === h2) && (t3 = null);
          var g2 = false;
          if (null === t3) g2 = true;
          else switch (h2) {
            case "bigint":
            case "string":
            case "number":
              g2 = true;
              break;
            case "object":
              switch (t3.$$typeof) {
                case i:
                case c:
                  g2 = true;
                  break;
                case y:
                  return e3((g2 = t3._init)(t3._payload), r3, n3, u3, l2);
              }
          }
          if (g2) return l2 = l2(t3), g2 = "" === u3 ? "." + E(t3, 0) : u3, a(l2) ? (n3 = "", null != g2 && (n3 = g2.replace(S, "$&/") + "/"), e3(l2, r3, n3, "", function(e4) {
            return e4;
          })) : null != l2 && (w(l2) && (f2 = l2, d2 = n3 + (null == l2.key || t3 && t3.key === l2.key ? "" : ("" + l2.key).replace(S, "$&/") + "/") + g2, l2 = R(f2.type, d2, f2.props)), r3.push(l2)), 1;
          g2 = 0;
          var m2 = "" === u3 ? "." : u3 + ":";
          if (a(t3)) for (var _2 = 0; _2 < t3.length; _2++) h2 = m2 + E(u3 = t3[_2], _2), g2 += e3(u3, r3, n3, h2, l2);
          else if ("function" == typeof (_2 = null === (p2 = t3) || "object" != typeof p2 ? null : "function" == typeof (p2 = b && p2[b] || p2["@@iterator"]) ? p2 : null)) for (t3 = _2.call(t3), _2 = 0; !(u3 = t3.next()).done; ) h2 = m2 + E(u3 = u3.value, _2++), g2 += e3(u3, r3, n3, h2, l2);
          else if ("object" === h2) {
            if ("function" == typeof t3.then) return e3(function(e4) {
              switch (e4.status) {
                case "fulfilled":
                  return e4.value;
                case "rejected":
                  throw e4.reason;
                default:
                  switch ("string" == typeof e4.status ? e4.then(o, o) : (e4.status = "pending", e4.then(function(t4) {
                    "pending" === e4.status && (e4.status = "fulfilled", e4.value = t4);
                  }, function(t4) {
                    "pending" === e4.status && (e4.status = "rejected", e4.reason = t4);
                  })), e4.status) {
                    case "fulfilled":
                      return e4.value;
                    case "rejected":
                      throw e4.reason;
                  }
              }
              throw e4;
            }(t3), r3, n3, u3, l2);
            throw Error(s(31, "[object Object]" === (r3 = String(t3)) ? "object with keys {" + Object.keys(t3).join(", ") + "}" : r3));
          }
          return g2;
        }(e2, n2, "", "", function(e3) {
          return t2.call(r2, e3, u2++);
        }), n2;
      }
      function k(e2) {
        if (-1 === e2._status) {
          var t2 = (0, e2._result)();
          t2.then(function(r2) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = r2, void 0 === t2.status && (t2.status = "fulfilled", t2.value = r2));
          }, function(r2) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = r2, void 0 === t2.status && (t2.status = "rejected", t2.reason = r2));
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      function x() {
        return /* @__PURE__ */ new WeakMap();
      }
      function C() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      r.Activity = g, r.Children = { map: A, forEach: function(e2, t2, r2) {
        A(e2, function() {
          t2.apply(this, arguments);
        }, r2);
      }, count: function(e2) {
        var t2 = 0;
        return A(e2, function() {
          t2++;
        }), t2;
      }, toArray: function(e2) {
        return A(e2, function(e3) {
          return e3;
        }) || [];
      }, only: function(e2) {
        if (!w(e2)) throw Error(s(143));
        return e2;
      } }, r.Fragment = u, r.Profiler = f, r.StrictMode = l, r.Suspense = p, r.ViewTransition = m, r.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = n, r.cache = function(e2) {
        return function() {
          var t2 = n.A;
          if (!t2) return e2.apply(null, arguments);
          var r2 = t2.getCacheForType(x);
          void 0 === (t2 = r2.get(e2)) && (t2 = C(), r2.set(e2, t2)), r2 = 0;
          for (var s2 = arguments.length; r2 < s2; r2++) {
            var a2 = arguments[r2];
            if ("function" == typeof a2 || "object" == typeof a2 && null !== a2) {
              var o2 = t2.o;
              null === o2 && (t2.o = o2 = /* @__PURE__ */ new WeakMap()), void 0 === (t2 = o2.get(a2)) && (t2 = C(), o2.set(a2, t2));
            } else null === (o2 = t2.p) && (t2.p = o2 = /* @__PURE__ */ new Map()), void 0 === (t2 = o2.get(a2)) && (t2 = C(), o2.set(a2, t2));
          }
          if (1 === t2.s) return t2.v;
          if (2 === t2.s) throw t2.v;
          try {
            var i2 = e2.apply(null, arguments);
            return (r2 = t2).s = 1, r2.v = i2;
          } catch (e3) {
            throw (i2 = t2).s = 2, i2.v = e3, e3;
          }
        };
      }, r.cacheSignal = function() {
        var e2 = n.A;
        return e2 ? e2.cacheSignal() : null;
      }, r.captureOwnerStack = function() {
        return null;
      }, r.cloneElement = function(e2, t2, r2) {
        if (null == e2) throw Error(s(267, e2));
        var n2 = v({}, e2.props), a2 = e2.key;
        if (null != t2) for (o2 in void 0 !== t2.key && (a2 = "" + t2.key), t2) _.call(t2, o2) && "key" !== o2 && "__self" !== o2 && "__source" !== o2 && ("ref" !== o2 || void 0 !== t2.ref) && (n2[o2] = t2[o2]);
        var o2 = arguments.length - 2;
        if (1 === o2) n2.children = r2;
        else if (1 < o2) {
          for (var i2 = Array(o2), c2 = 0; c2 < o2; c2++) i2[c2] = arguments[c2 + 2];
          n2.children = i2;
        }
        return R(e2.type, a2, n2);
      }, r.createElement = function(e2, t2, r2) {
        var n2, s2 = {}, a2 = null;
        if (null != t2) for (n2 in void 0 !== t2.key && (a2 = "" + t2.key), t2) _.call(t2, n2) && "key" !== n2 && "__self" !== n2 && "__source" !== n2 && (s2[n2] = t2[n2]);
        var o2 = arguments.length - 2;
        if (1 === o2) s2.children = r2;
        else if (1 < o2) {
          for (var i2 = Array(o2), c2 = 0; c2 < o2; c2++) i2[c2] = arguments[c2 + 2];
          s2.children = i2;
        }
        if (e2 && e2.defaultProps) for (n2 in o2 = e2.defaultProps) void 0 === s2[n2] && (s2[n2] = o2[n2]);
        return R(e2, a2, s2);
      }, r.createRef = function() {
        return { current: null };
      }, r.forwardRef = function(e2) {
        return { $$typeof: d, render: e2 };
      }, r.isValidElement = w, r.lazy = function(e2) {
        return { $$typeof: y, _payload: { _status: -1, _result: e2 }, _init: k };
      }, r.memo = function(e2, t2) {
        return { $$typeof: h, type: e2, compare: void 0 === t2 ? null : t2 };
      }, r.use = function(e2) {
        return n.H.use(e2);
      }, r.useCallback = function(e2, t2) {
        return n.H.useCallback(e2, t2);
      }, r.useDebugValue = function() {
      }, r.useId = function() {
        return n.H.useId();
      }, r.useMemo = function(e2, t2) {
        return n.H.useMemo(e2, t2);
      }, r.version = "19.3.0-canary-3f0b9e61-20260317";
    }, 77496, (e, t, r) => {
      "use strict";
      t.exports = e.r(79569);
    }, 49202, 96705, 71774, 72471, 51028, 12873, 94414, 78905, (e) => {
      "use strict";
      var t, r = e.i(53441);
      let n = (0, r.createAsyncLocalStorage)();
      e.s(["workAsyncStorageInstance", 0, n], 96705), e.s([], 49202);
      let s = (0, r.createAsyncLocalStorage)();
      e.s(["workUnitAsyncStorageInstance", 0, s], 71774), e.s(["InvariantError", 0, class extends Error {
        constructor(e2, t2) {
          super(`Invariant: ${e2.endsWith(".") ? e2 : e2 + "."} This is a bug in Next.js.`, t2), this.name = "InvariantError";
        }
      }], 72471);
      var a = ((t = {})[t.Before = 1] = "Before", t[t.EarlyStatic = 2] = "EarlyStatic", t[t.Static = 3] = "Static", t[t.EarlyRuntime = 4] = "EarlyRuntime", t[t.Runtime = 5] = "Runtime", t[t.Dynamic = 6] = "Dynamic", t[t.Abandoned = 7] = "Abandoned", t);
      e.s(["RenderStage", 0, a], 51028), e.s(["getDraftModeProviderForCacheScope", 0, function(e2, t2) {
        if (e2.isDraftMode) switch (t2.type) {
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "prerender-runtime":
          case "request":
            return t2.draftMode;
        }
      }, "getPrerenderResumeDataCache", 0, function(e2) {
        switch (e2.type) {
          case "prerender":
          case "prerender-runtime":
          case "prerender-ppr":
          case "prerender-client":
          case "validation-client":
            return e2.prerenderResumeDataCache;
          case "request":
            if (e2.prerenderResumeDataCache) return e2.prerenderResumeDataCache;
          case "prerender-legacy":
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "generate-static-params":
            return null;
          default:
            return e2;
        }
      }, "getRenderResumeDataCache", 0, function(e2) {
        switch (e2.type) {
          case "request":
          case "prerender":
          case "prerender-runtime":
          case "prerender-client":
          case "validation-client":
            if (e2.renderResumeDataCache) return e2.renderResumeDataCache;
          case "prerender-ppr":
            return e2.prerenderResumeDataCache ?? null;
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "prerender-legacy":
          case "generate-static-params":
            return null;
          default:
            return e2;
        }
      }, "isInEarlyRenderStage", 0, function(e2) {
        let t2 = e2.stagedRendering;
        return !!t2 && (t2.currentStage === a.EarlyStatic || t2.currentStage === a.EarlyRuntime);
      }, "throwForMissingRequestStore", 0, function(e2) {
        throw Object.defineProperty(Error(`\`${e2}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", { value: "E251", enumerable: false, configurable: true });
      }], 12873);
      var o = e.i(77496);
      let i = "DYNAMIC_SERVER_USAGE";
      class c extends Error {
        constructor(e2) {
          super(`Dynamic server usage: ${e2}`), this.description = e2, this.digest = i;
        }
      }
      e.s(["DynamicServerError", 0, c, "isDynamicServerError", 0, function(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && "string" == typeof e2.digest && e2.digest === i;
      }], 94414);
      let u = "function" == typeof o.default.unstable_postpone;
      function l(e2, t2) {
        return `Route ${e2} needs to bail out of prerendering at this point because it used ${t2}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
      }
      function f(e2) {
        return e2.includes("needs to bail out of prerendering at this point because it used") && e2.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
      }
      if (false === f(l("%%%", "^^^"))) throw Object.defineProperty(Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E296", enumerable: false, configurable: true });
      let d = "NEXT_PRERENDER_INTERRUPTED";
      function p(e2) {
        let t2 = Object.defineProperty(Error(e2), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        return t2.digest = d, t2;
      }
      RegExp("\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at __next_root_layout_boundary__ \\([^\\n]*\\)"), RegExp("\\n\\s+at __next_metadata_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_viewport_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_outlet_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_instant_validation_boundary__[\\n\\s]"), e.s(["abortAndThrowOnSynchronousRequestDataAccess", 0, function(e2, t2, r2, n2) {
        if (false === n2.controller.signal.aborted) {
          let s2, a2;
          s2 = p(`Route ${e2} needs to bail out of prerendering at this point because it used ${t2}.`), n2.controller.abort(s2), (a2 = n2.dynamicTracking) && a2.dynamicAccesses.push({ stack: a2.isDebugDynamicAccesses ? Error().stack : void 0, expression: t2 });
          let o2 = n2.dynamicTracking;
          o2 && null === o2.syncDynamicErrorWithStack && (o2.syncDynamicErrorWithStack = r2);
        }
        throw p(`Route ${e2} needs to bail out of prerendering at this point because it used ${t2}.`);
      }, "isDynamicPostpone", 0, function(e2) {
        return "object" == typeof e2 && null !== e2 && "string" == typeof e2.message && f(e2.message);
      }, "isPrerenderInterruptedError", 0, function(e2) {
        return "object" == typeof e2 && null !== e2 && e2.digest === d && "name" in e2 && "message" in e2 && e2 instanceof Error;
      }, "postponeWithTracking", 0, function(e2, t2, r2) {
        (function() {
          if (!u) throw Object.defineProperty(Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E224", enumerable: false, configurable: true });
        })(), r2 && r2.dynamicAccesses.push({ stack: r2.isDebugDynamicAccesses ? Error().stack : void 0, expression: t2 }), o.default.unstable_postpone(l(e2, t2));
      }, "throwToInterruptStaticGeneration", 0, function(e2, t2, r2) {
        let n2 = Object.defineProperty(new c(`Route ${t2.route} couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", { value: "E558", enumerable: false, configurable: true });
        throw r2.revalidate = 0, t2.dynamicUsageDescription = e2, t2.dynamicUsageStack = n2.stack, n2;
      }, "trackDynamicDataInDynamicRender", 0, function(e2) {
        switch (e2.type) {
          case "cache":
          case "unstable-cache":
          case "private-cache":
            return;
        }
      }], 78905);
    }, 57432, 50484, 31497, 30972, 20111, 76170, (e) => {
      "use strict";
      e.i(94438);
      var t = e.i(67168), r = e.i(12914);
      e.i(49202);
      var n = e.i(96705);
      e.s(["workAsyncStorage", () => n.workAsyncStorageInstance], 50484);
      var n = n;
      class s extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new s();
        }
      }
      let a = Symbol.for("next.mutated.cookies");
      function o(e2) {
        return "action" === e2.phase;
      }
      function i(e2, t2) {
        if (!o(e2)) throw new s();
      }
      e.s(["MutableRequestCookiesAdapter", 0, class {
        static wrap(e2, s2) {
          let o2 = new t.ResponseCookies(new Headers());
          for (let t2 of e2.getAll()) o2.set(t2);
          let i2 = [], c2 = /* @__PURE__ */ new Set(), u2 = () => {
            let e3 = n.workAsyncStorageInstance.getStore();
            if (e3 && (e3.pathWasRevalidated = 1), i2 = o2.getAll().filter((e4) => c2.has(e4.name)), s2) {
              let e4 = [];
              for (let r2 of i2) {
                let n2 = new t.ResponseCookies(new Headers());
                n2.set(r2), e4.push(n2.toString());
              }
              s2(e4);
            }
          }, l = new Proxy(o2, { get(e3, t2, n2) {
            switch (t2) {
              case a:
                return i2;
              case "delete":
                return function(...t3) {
                  c2.add("string" == typeof t3[0] ? t3[0] : t3[0].name);
                  try {
                    return e3.delete(...t3), l;
                  } finally {
                    u2();
                  }
                };
              case "set":
                return function(...t3) {
                  c2.add("string" == typeof t3[0] ? t3[0] : t3[0].name);
                  try {
                    return e3.set(...t3), l;
                  } finally {
                    u2();
                  }
                };
              default:
                return r.ReflectAdapter.get(e3, t2, n2);
            }
          } });
          return l;
        }
      }, "RequestCookiesAdapter", 0, class {
        static seal(e2) {
          return new Proxy(e2, { get(e3, t2, n2) {
            switch (t2) {
              case "clear":
              case "delete":
              case "set":
                return s.callable;
              default:
                return r.ReflectAdapter.get(e3, t2, n2);
            }
          } });
        }
      }, "areCookiesMutableInCurrentPhase", 0, o, "createCookiesWithMutableAccessCheck", 0, function(e2) {
        let t2 = new Proxy(e2.mutableCookies, { get(n2, s2, a2) {
          switch (s2) {
            case "delete":
              return function(...r2) {
                return i(e2, "cookies().delete"), n2.delete(...r2), t2;
              };
            case "set":
              return function(...r2) {
                return i(e2, "cookies().set"), n2.set(...r2), t2;
              };
            default:
              return r.ReflectAdapter.get(n2, s2, a2);
          }
        } });
        return t2;
      }], 57432);
      var c = e.i(71774);
      e.s(["workUnitAsyncStorage", () => c.workUnitAsyncStorageInstance], 31497);
      let u = (0, e.i(53441).createAsyncLocalStorage)();
      e.s([], 30972), e.s(["afterTaskAsyncStorage", 0, u], 20111), e.s(["isRequestAPICallableInsideAfter", 0, function() {
        let e2 = u.getStore();
        return (null == e2 ? void 0 : e2.rootTaskSpawnPhase) === "action";
      }], 76170);
    }]);
  }
});

// .next/server/edge/chunks/0h1h_next_dist_esm_build_templates_edge-wrapper_01s3kht.js
var require_h1h_next_dist_esm_build_templates_edge_wrapper_01s3kht = __commonJS({
  ".next/server/edge/chunks/0h1h_next_dist_esm_build_templates_edge-wrapper_01s3kht.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/0h1h_next_dist_esm_build_templates_edge-wrapper_01s3kht.js", { otherChunks: ["chunks/[root-of-the-server]__0qs~70n._.js", "chunks/0p5a_next_dist_esm_api_headers_02gono3.js", "chunks/node_modules__pnpm_0knvyhq._.js", "chunks/0p5a_next_dist_0x9fh3h._.js"], runtimeModuleIds: [84948] }]), (() => {
      let e;
      if (!Array.isArray(globalThis.TURBOPACK)) return;
      let t = ["NEXT_DEPLOYMENT_ID", "NEXT_CLIENT_ASSET_SUFFIX"];
      var r, n = ((r = n || {})[r.Runtime = 0] = "Runtime", r[r.Parent = 1] = "Parent", r[r.Update = 2] = "Update", r);
      let o = /* @__PURE__ */ new WeakMap();
      function u(e2, t2) {
        this.m = e2, this.e = t2;
      }
      let i = u.prototype, l = Object.prototype.hasOwnProperty, a = "u" > typeof Symbol && Symbol.toStringTag;
      function s(e2, t2, r2) {
        l.call(e2, t2) || Object.defineProperty(e2, t2, r2);
      }
      function c(e2, t2) {
        let r2 = e2[t2];
        return r2 || (r2 = f(t2), e2[t2] = r2), r2;
      }
      function f(e2) {
        return { exports: {}, error: void 0, id: e2, namespaceObject: void 0 };
      }
      function h(e2, t2) {
        s(e2, "__esModule", { value: true }), a && s(e2, a, { value: "Module" });
        let r2 = 0;
        for (; r2 < t2.length; ) {
          let n2 = t2[r2++], o2 = t2[r2++];
          if ("number" == typeof o2) if (0 === o2) s(e2, n2, { value: t2[r2++], enumerable: true, writable: false });
          else throw Error(`unexpected tag: ${o2}`);
          else "function" == typeof t2[r2] ? s(e2, n2, { get: o2, set: t2[r2++], enumerable: true }) : s(e2, n2, { get: o2, enumerable: true });
        }
        Object.seal(e2);
      }
      function d(e2, t2) {
        (null != t2 ? c(this.c, t2) : this.m).exports = e2;
      }
      i.s = function(e2, t2) {
        let r2, n2;
        null != t2 ? n2 = (r2 = c(this.c, t2)).exports : (r2 = this.m, n2 = this.e), r2.namespaceObject = n2, h(n2, e2);
      }, i.j = function(e2, t2) {
        var r2, n2;
        let u2, i2, a2;
        null != t2 ? i2 = (u2 = c(this.c, t2)).exports : (u2 = this.m, i2 = this.e);
        let s2 = (r2 = u2, n2 = i2, (a2 = o.get(r2)) || (o.set(r2, a2 = []), r2.exports = r2.namespaceObject = new Proxy(n2, { get(e3, t3) {
          if (l.call(e3, t3) || "default" === t3 || "__esModule" === t3) return Reflect.get(e3, t3);
          for (let e4 of a2) {
            let r3 = Reflect.get(e4, t3);
            if (void 0 !== r3) return r3;
          }
        }, ownKeys(e3) {
          let t3 = Reflect.ownKeys(e3);
          for (let e4 of a2) for (let r3 of Reflect.ownKeys(e4)) "default" === r3 || t3.includes(r3) || t3.push(r3);
          return t3;
        } })), a2);
        "object" == typeof e2 && null !== e2 && s2.push(e2);
      }, i.v = d, i.n = function(e2, t2) {
        let r2;
        (r2 = null != t2 ? c(this.c, t2) : this.m).exports = r2.namespaceObject = e2;
      };
      let p = Object.getPrototypeOf ? (e2) => Object.getPrototypeOf(e2) : (e2) => e2.__proto__, m = [null, p({}), p([]), p(p)];
      function b(e2, t2, r2) {
        let n2 = [], o2 = -1;
        for (let t3 = e2; ("object" == typeof t3 || "function" == typeof t3) && !m.includes(t3); t3 = p(t3)) for (let r3 of Object.getOwnPropertyNames(t3)) n2.push(r3, /* @__PURE__ */ function(e3, t4) {
          return () => e3[t4];
        }(e2, r3)), -1 === o2 && "default" === r3 && (o2 = n2.length - 1);
        return r2 && o2 >= 0 || (o2 >= 0 ? n2.splice(o2, 1, 0, e2) : n2.push("default", 0, e2)), h(t2, n2), t2;
      }
      function y(e2) {
        return "function" == typeof e2 ? function(...t2) {
          return e2.apply(this, t2);
        } : /* @__PURE__ */ Object.create(null);
      }
      function g(e2) {
        let t2 = K(e2, this.m);
        if (t2.namespaceObject) return t2.namespaceObject;
        let r2 = t2.exports;
        return t2.namespaceObject = b(r2, y(r2), r2 && r2.__esModule);
      }
      function w(e2) {
        let t2 = e2.indexOf("#");
        -1 !== t2 && (e2 = e2.substring(0, t2));
        let r2 = e2.indexOf("?");
        return -1 !== r2 && (e2 = e2.substring(0, r2)), e2;
      }
      function _(e2) {
        return "string" == typeof e2 ? e2 : e2.path;
      }
      function O() {
        let e2, t2;
        return { promise: new Promise((r2, n2) => {
          t2 = n2, e2 = r2;
        }), resolve: e2, reject: t2 };
      }
      i.i = g, i.A = function(e2) {
        return this.r(e2)(g.bind(this));
      }, i.t = "function" == typeof __require ? __require : function() {
        throw Error("Unexpected use of runtime require");
      }, i.r = function(e2) {
        return K(e2, this.m).exports;
      }, i.f = function(e2) {
        function t2(t3) {
          if (t3 = w(t3), l.call(e2, t3)) return e2[t3].module();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }
        return t2.keys = () => Object.keys(e2), t2.resolve = (t3) => {
          if (t3 = w(t3), l.call(e2, t3)) return e2[t3].id();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }, t2.import = async (e3) => await t2(e3), t2;
      };
      let k = Symbol("turbopack queues"), j = Symbol("turbopack exports"), C = Symbol("turbopack error");
      function P(e2) {
        e2 && 1 !== e2.status && (e2.status = 1, e2.forEach((e3) => e3.queueCount--), e2.forEach((e3) => e3.queueCount-- ? e3.queueCount++ : e3()));
      }
      i.a = function(e2, t2) {
        let r2 = this.m, n2 = t2 ? Object.assign([], { status: -1 }) : void 0, o2 = /* @__PURE__ */ new Set(), { resolve: u2, reject: i2, promise: l2 } = O(), a2 = Object.assign(l2, { [j]: r2.exports, [k]: (e3) => {
          n2 && e3(n2), o2.forEach(e3), a2.catch(() => {
          });
        } }), s2 = { get: () => a2, set(e3) {
          e3 !== a2 && (a2[j] = e3);
        } };
        Object.defineProperty(r2, "exports", s2), Object.defineProperty(r2, "namespaceObject", s2), e2(function(e3) {
          let t3 = e3.map((e4) => {
            if (null !== e4 && "object" == typeof e4) {
              if (k in e4) return e4;
              if (null != e4 && "object" == typeof e4 && "then" in e4 && "function" == typeof e4.then) {
                let t4 = Object.assign([], { status: 0 }), r4 = { [j]: {}, [k]: (e5) => e5(t4) };
                return e4.then((e5) => {
                  r4[j] = e5, P(t4);
                }, (e5) => {
                  r4[C] = e5, P(t4);
                }), r4;
              }
            }
            return { [j]: e4, [k]: () => {
            } };
          }), r3 = () => t3.map((e4) => {
            if (e4[C]) throw e4[C];
            return e4[j];
          }), { promise: u3, resolve: i3 } = O(), l3 = Object.assign(() => i3(r3), { queueCount: 0 });
          function a3(e4) {
            e4 !== n2 && !o2.has(e4) && (o2.add(e4), e4 && 0 === e4.status && (l3.queueCount++, e4.push(l3)));
          }
          return t3.map((e4) => e4[k](a3)), l3.queueCount ? u3 : r3();
        }, function(e3) {
          e3 ? i2(a2[C] = e3) : u2(a2[j]), P(n2);
        }), n2 && -1 === n2.status && (n2.status = 0);
      };
      let v = function(e2) {
        let t2 = new URL(e2, "x:/"), r2 = {};
        for (let e3 in t2) r2[e3] = t2[e3];
        for (let t3 in r2.href = e2, r2.pathname = e2.replace(/[?#].*/, ""), r2.origin = r2.protocol = "", r2.toString = r2.toJSON = (...t4) => e2, r2) Object.defineProperty(this, t3, { enumerable: true, configurable: true, value: r2[t3] });
      };
      function E(e2, t2) {
        throw Error(`Invariant: ${t2(e2)}`);
      }
      v.prototype = URL.prototype, i.U = v, i.z = function(e2) {
        throw Error("dynamic usage of require is not supported");
      }, i.g = globalThis;
      let U = u.prototype, x = /* @__PURE__ */ new Map();
      i.M = x;
      let R = /* @__PURE__ */ new Map(), M = /* @__PURE__ */ new Map();
      async function $(e2, t2, r2) {
        let n2;
        if ("string" == typeof r2) return q(e2, t2, A(r2));
        let o2 = r2.included || [], u2 = o2.map((e3) => !!x.has(e3) || R.get(e3));
        if (u2.length > 0 && u2.every((e3) => e3)) return void await Promise.all(u2);
        let i2 = r2.moduleChunks || [], l2 = i2.map((e3) => M.get(e3)).filter((e3) => e3);
        if (l2.length > 0) {
          if (l2.length === i2.length) return void await Promise.all(l2);
          let r3 = /* @__PURE__ */ new Set();
          for (let e3 of i2) M.has(e3) || r3.add(e3);
          for (let n3 of r3) {
            let r4 = q(e2, t2, A(n3));
            M.set(n3, r4), l2.push(r4);
          }
          n2 = Promise.all(l2);
        } else {
          for (let o3 of (n2 = q(e2, t2, A(r2.path)), i2)) M.has(o3) || M.set(o3, n2);
        }
        for (let e3 of o2) R.has(e3) || R.set(e3, n2);
        await n2;
      }
      U.l = function(e2) {
        return $(n.Parent, this.m.id, e2);
      };
      let T = Promise.resolve(void 0), S = /* @__PURE__ */ new WeakMap();
      function q(t2, r2, o2) {
        let u2 = e.loadChunkCached(t2, o2), i2 = S.get(u2);
        if (void 0 === i2) {
          let e2 = S.set.bind(S, u2, T);
          i2 = u2.then(e2).catch((e3) => {
            let u3;
            switch (t2) {
              case n.Runtime:
                u3 = `as a runtime dependency of chunk ${r2}`;
                break;
              case n.Parent:
                u3 = `from module ${r2}`;
                break;
              case n.Update:
                u3 = "from an HMR update";
                break;
              default:
                E(t2, (e4) => `Unknown source type: ${e4}`);
            }
            let i3 = Error(`Failed to load chunk ${o2} ${u3}${e3 ? `: ${e3}` : ""}`, e3 ? { cause: e3 } : void 0);
            throw i3.name = "ChunkLoadError", i3;
          }), S.set(u2, i2);
        }
        return i2;
      }
      function A(e2) {
        return `${e2.split("/").map((e3) => encodeURIComponent(e3)).join("/")}`;
      }
      U.L = function(e2) {
        return q(n.Parent, this.m.id, e2);
      }, U.R = function(e2) {
        let t2 = this.r(e2);
        return t2?.default ?? t2;
      }, U.P = function(e2) {
        return `/ROOT/${e2 ?? ""}`;
      }, U.q = function(e2, t2) {
        d.call(this, `${e2}`, t2);
      }, U.b = function(e2, r2, n2, o2) {
        let u2 = "SharedWorker" === e2.name, i2 = [n2.map((e3) => A(e3)).reverse(), ""];
        for (let e3 of t) i2.push(globalThis[e3]);
        let l2 = new URL(A(r2), location.origin), a2 = JSON.stringify(i2);
        return u2 ? l2.searchParams.set("params", a2) : l2.hash = "#params=" + encodeURIComponent(a2), new e2(l2, o2 ? { ...o2, type: void 0 } : void 0);
      };
      let N = /\.js(?:\?[^#]*)?(?:#.*)?$/;
      i.w = function(t2, r2, o2) {
        return e.loadWebAssembly(n.Parent, this.m.id, t2, r2, o2);
      }, i.u = function(t2, r2) {
        return e.loadWebAssemblyModule(n.Parent, this.m.id, t2, r2);
      };
      let I = {};
      i.c = I;
      let K = (e2, t2) => {
        let r2 = I[e2];
        if (r2) {
          if (r2.error) throw r2.error;
          return r2;
        }
        return L(e2, n.Parent, t2.id);
      };
      function L(e2, t2, r2) {
        let n2 = x.get(e2);
        if ("function" != typeof n2) throw Error(function(e3, t3, r3) {
          let n3;
          switch (t3) {
            case 0:
              n3 = `as a runtime entry of chunk ${r3}`;
              break;
            case 1:
              n3 = `because it was required from module ${r3}`;
              break;
            case 2:
              n3 = "because of an HMR update";
              break;
            default:
              E(t3, (e4) => `Unknown source type: ${e4}`);
          }
          return `Module ${e3} was instantiated ${n3}, but the module factory is not available.`;
        }(e2, t2, r2));
        let o2 = f(e2), i2 = o2.exports;
        I[e2] = o2;
        let l2 = new u(o2, i2);
        try {
          n2(l2, o2, i2);
        } catch (e3) {
          throw o2.error = e3, e3;
        }
        return o2.namespaceObject && o2.exports !== o2.namespaceObject && b(o2.exports, o2.namespaceObject), o2;
      }
      function W(t2) {
        let r2, n2 = function(e2) {
          if ("string" == typeof e2) return e2;
          if (e2) return { src: e2.getAttribute("src") };
          if ("u" > typeof TURBOPACK_NEXT_CHUNK_URLS) return { src: TURBOPACK_NEXT_CHUNK_URLS.pop() };
          throw Error("chunk path empty but not in a worker");
        }(t2[0]);
        return 2 === t2.length ? r2 = t2[1] : (r2 = void 0, !function(e2, t3) {
          let r3 = 1;
          for (; r3 < e2.length; ) {
            let n3, o2 = r3 + 1;
            for (; o2 < e2.length && "function" != typeof e2[o2]; ) o2++;
            if (o2 === e2.length) throw Error("malformed chunk format, expected a factory function");
            let u2 = e2[o2];
            for (let u3 = r3; u3 < o2; u3++) {
              let r4 = e2[u3], o3 = t3.get(r4);
              if (o3) {
                n3 = o3;
                break;
              }
            }
            let i2 = n3 ?? u2, l2 = false;
            for (let n4 = r3; n4 < o2; n4++) {
              let r4 = e2[n4];
              t3.has(r4) || (l2 || (i2 === u2 && Object.defineProperty(u2, "name", { value: "module evaluation" }), l2 = true), t3.set(r4, i2));
            }
            r3 = o2 + 1;
          }
        }(t2, x)), e.registerChunk(n2, r2);
      }
      function B(e2, t2, r2 = false) {
        let n2;
        try {
          n2 = t2();
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return !r2 || n2.__esModule ? n2 : b(n2, y(n2), true);
      }
      i.y = async function(e2) {
        let t2;
        try {
          t2 = await import(e2);
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return t2 && t2.__esModule && t2.default && "default" in t2.default ? b(t2.default, y(t2), true) : t2;
      }, B.resolve = (e2, t2) => __require.resolve(e2, t2), i.x = B, e = { registerChunk(e2, t2) {
        let r2 = function(e3) {
          if ("string" == typeof e3) return e3;
          let t3 = decodeURIComponent(e3.src.replace(/[?#].*$/, ""));
          return t3.startsWith("") ? t3.slice(0) : t3;
        }(e2);
        F.add(r2), function(e3) {
          let t3 = D.get(e3);
          if (null != t3) {
            for (let r3 of t3) r3.requiredChunks.delete(e3), 0 === r3.requiredChunks.size && X(r3.runtimeModuleIds, r3.chunkPath);
            D.delete(e3);
          }
        }(r2), null != t2 && (0 === t2.otherChunks.length ? X(t2.runtimeModuleIds, r2) : function(e3, t3, r3) {
          let n2 = /* @__PURE__ */ new Set(), o2 = { runtimeModuleIds: r3, chunkPath: e3, requiredChunks: n2 };
          for (let e4 of t3) {
            let t4 = _(e4);
            if (F.has(t4)) continue;
            n2.add(t4);
            let r4 = D.get(t4);
            null == r4 && (r4 = /* @__PURE__ */ new Set(), D.set(t4, r4)), r4.add(o2);
          }
          0 === o2.requiredChunks.size && X(o2.runtimeModuleIds, o2.chunkPath);
        }(r2, t2.otherChunks.filter((e3) => {
          var t3;
          return t3 = _(e3), N.test(t3);
        }), t2.runtimeModuleIds));
      }, loadChunkCached(e2, t2) {
        throw Error("chunk loading is not supported");
      }, async loadWebAssembly(e2, t2, r2, n2, o2) {
        let u2 = await H(r2, n2);
        return await WebAssembly.instantiate(u2, o2);
      }, loadWebAssemblyModule: async (e2, t2, r2, n2) => H(r2, n2) };
      let F = /* @__PURE__ */ new Set(), D = /* @__PURE__ */ new Map();
      function X(e2, t2) {
        for (let r2 of e2) !function(e3, t3) {
          let r3 = I[t3];
          if (r3) {
            if (r3.error) throw r3.error;
            return;
          }
          L(t3, n.Runtime, e3);
        }(t2, r2);
      }
      async function H(e2, t2) {
        let r2;
        try {
          r2 = t2();
        } catch (e3) {
        }
        if (!r2) throw Error(`dynamically loading WebAssembly is not supported in this runtime as global was not injected for chunk '${e2}'`);
        return r2;
      }
      let z = globalThis.TURBOPACK;
      globalThis.TURBOPACK = { push: W }, z.forEach(W);
    })();
  }
});

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*))(\\\\.json)?[\\/#\\?]?$", "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/(api|trpc))(.*)(\\\\.json)?[\\/#\\?]?$"] }];
    require_root_of_the_server_0qs_70n();
    require_p5a_next_dist_esm_api_headers_02gono3();
    require_node_modules_pnpm_0knvyhq();
    require_p5a_next_dist_0x9fh3h();
    require_h1h_next_dist_esm_build_templates_edge_wrapper_01s3kht();
  }
});

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/utils/requestCache.js
var RequestCache = class {
  _caches = /* @__PURE__ */ new Map();
  /**
   * Returns the Map registered under `key`.
   * If no Map exists yet for that key, a new empty Map is created, stored, and returned.
   * Repeated calls with the same key always return the **same** Map instance.
   */
  getOrCreate(key) {
    let cache = this._caches.get(key);
    if (!cache) {
      cache = /* @__PURE__ */ new Map();
      this._caches.set(key, cache);
    }
    return cache;
  }
};

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/utils/promise.js
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set(),
    requestCache: new RequestCache()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "typescript": { "ignoreBuildErrors": false }, "typedRoutes": false, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.mjs", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 14400, "formats": ["image/webp"], "maximumRedirects": 3, "maximumResponseBody": 5e7, "dangerouslyAllowLocalIP": false, "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "localPatterns": [{ "pathname": "**", "search": "" }], "remotePatterns": [], "qualities": [75], "unoptimized": false, "customCacheHandler": false }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": { "serverFunctions": true, "browserToTerminal": "warn" }, "compiler": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "D:\\BIMUS\\plataforma-aagora\\aagora", "cacheComponents": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 30, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 31536e3 } }, "cacheHandlers": {}, "experimental": { "appNewScrollHandler": false, "useSkewCookie": false, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "cachedNavigations": false, "partialFallbacks": false, "dynamicOnHover": false, "varyParams": false, "prefetchInlining": false, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "proxyPrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 31, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "imgOptSkipMetadata": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "strictRouteTypes": false, "viewTransition": false, "removeUncaughtErrorAndRejectionListeners": false, "validateRSCRequestHeaders": false, "staleTimes": { "dynamic": 0, "static": 300 }, "reactDebugChannel": true, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "transitionIndicator": false, "gestureTransition": false, "inlineCss": false, "useCache": false, "globalNotFound": false, "browserDebugInfoInTerminal": "warn", "lockDistDir": true, "proxyClientMaxBodySize": 10485760, "hideLogsAfterAbort": false, "mcpServer": true, "turbopackFileSystemCacheForDev": true, "turbopackFileSystemCacheForBuild": false, "turbopackInferModuleSideEffects": true, "turbopackPluginRuntimeStrategy": "childProcesses", "serverActions": { "bodySizeLimit": "6mb" }, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-sqlite-node", "@effect/sql-sqlite-bun", "@effect/sql-sqlite-wasm", "@effect/sql-sqlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight", "bundlePagesRouterDependencies": false, "configFileName": "next.config.mjs", "transpilePackages": ["@workspace/ui", "@workspace/db", "@workspace/auth"], "turbopack": { "root": "D:\\BIMUS\\plataforma-aagora\\aagora" }, "distDirRoot": ".next" };
var BuildId = "a5mOSdTwSm-VqyWBK3ZL9";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "priority": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_global-error", "regex": "^/_global\\-error(?:/)?$", "routeKeys": {}, "namedRegex": "^/_global\\-error(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/admin", "regex": "^/admin(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin(?:/)?$" }, { "page": "/api/r2/delete", "regex": "^/api/r2/delete(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/r2/delete(?:/)?$" }, { "page": "/api/r2/list", "regex": "^/api/r2/list(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/r2/list(?:/)?$" }, { "page": "/api/r2/upload", "regex": "^/api/r2/upload(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/r2/upload(?:/)?$" }, { "page": "/auth/callback", "regex": "^/auth/callback(?:/)?$", "routeKeys": {}, "namedRegex": "^/auth/callback(?:/)?$" }, { "page": "/dashboard", "regex": "^/dashboard(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }, { "page": "/forgot-password", "regex": "^/forgot\\-password(?:/)?$", "routeKeys": {}, "namedRegex": "^/forgot\\-password(?:/)?$" }, { "page": "/library/construction/assets", "regex": "^/library/construction/assets(?:/)?$", "routeKeys": {}, "namedRegex": "^/library/construction/assets(?:/)?$" }, { "page": "/library/construction/items", "regex": "^/library/construction/items(?:/)?$", "routeKeys": {}, "namedRegex": "^/library/construction/items(?:/)?$" }, { "page": "/library/construction/supplies", "regex": "^/library/construction/supplies(?:/)?$", "routeKeys": {}, "namedRegex": "^/library/construction/supplies(?:/)?$" }, { "page": "/library/contacts", "regex": "^/library/contacts(?:/)?$", "routeKeys": {}, "namedRegex": "^/library/contacts(?:/)?$" }, { "page": "/library/design/cad", "regex": "^/library/design/cad(?:/)?$", "routeKeys": {}, "namedRegex": "^/library/design/cad(?:/)?$" }, { "page": "/library/design/models", "regex": "^/library/design/models(?:/)?$", "routeKeys": {}, "namedRegex": "^/library/design/models(?:/)?$" }, { "page": "/library/parameters/chapters", "regex": "^/library/parameters/chapters(?:/)?$", "routeKeys": {}, "namedRegex": "^/library/parameters/chapters(?:/)?$" }, { "page": "/library/parameters/units", "regex": "^/library/parameters/units(?:/)?$", "routeKeys": {}, "namedRegex": "^/library/parameters/units(?:/)?$" }, { "page": "/projects", "regex": "^/projects(?:/)?$", "routeKeys": {}, "namedRegex": "^/projects(?:/)?$" }, { "page": "/workspaces", "regex": "^/workspaces(?:/)?$", "routeKeys": {}, "namedRegex": "^/workspaces(?:/)?$" }], "dynamic": [{ "page": "/sign-in/[[...sign-in]]", "regex": "^/sign\\-in(?:/(.+?))?(?:/)?$", "routeKeys": { "nxtPsignin": "nxtPsign-in" }, "namedRegex": "^/sign\\-in(?:/(?<nxtPsignin>.+?))?(?:/)?$" }, { "page": "/sign-up/[[...sign-up]]", "regex": "^/sign\\-up(?:/(.+?))?(?:/)?$", "routeKeys": { "nxtPsignup": "nxtPsign-up" }, "namedRegex": "^/sign\\-up(?:/(?<nxtPsignup>.+?))?(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [{ "source": "/(.*)", "headers": [{ "key": "X-DNS-Prefetch-Control", "value": "on" }, { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" }, { "key": "X-Frame-Options", "value": "SAMEORIGIN" }, { "key": "X-Content-Type-Options", "value": "nosniff" }, { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }, { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(), browsing-topics=()" }, { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://clerk.com https://*.clerk.com https://*.clerk.accounts.dev; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://img.clerk.com https://images.clerk.dev https://pub-0c4e991892914662ba0e3f09fb79757a.r2.dev https://pub-c09b07f1a7954c46b7f2a640146d8703.r2.dev; font-src 'self' data:; connect-src 'self' https://clerk.com https://*.clerk.com https://*.clerk.accounts.dev wss://*.clerk.com wss://*.clerk.accounts.dev https://*.r2.cloudflarestorage.com; media-src 'self' https://pub-0c4e991892914662ba0e3f09fb79757a.r2.dev https://pub-c09b07f1a7954c46b7f2a640146d8703.r2.dev; frame-src 'self' https://clerk.com https://*.clerk.com https://*.clerk.accounts.dev; frame-ancestors 'self'; object-src 'none'; base-uri 'self'; form-action 'self' https://clerk.com https://*.clerk.com https://*.clerk.accounts.dev" }], "regex": "^(?:/(.*))(?:/)?$" }];
var PrerenderManifest = { "version": 4, "routes": { "/_global-error": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_global-error", "dataRoute": "/_global-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "9fd117d17061304aa72e3839ba76f7a2", "previewModeSigningKey": "01d44c73bf7f84e9e2a2d97a268b04048497a4edaad7acaff101d3ffd1876119", "previewModeEncryptionKey": "c2b9c031c54a86b1992ddac567583272601c82e9add45b8fe3680f54a4fd1d18" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge/chunks/[root-of-the-server]__0qs~70n._.js", "server/edge/chunks/0p5a_next_dist_esm_api_headers_02gono3.js", "server/edge/chunks/node_modules__pnpm_0knvyhq._.js", "server/edge/chunks/0p5a_next_dist_0x9fh3h._.js", "server/edge/chunks/0h1h_next_dist_esm_build_templates_edge-wrapper_01s3kht.js"], "name": "middleware", "page": "/", "entrypoint": "server/edge/chunks/0h1h_next_dist_esm_build_templates_edge-wrapper_01s3kht.js", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*))(\\\\.json)?[\\/#\\?]?$", "originalSource": "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/(api|trpc))(.*)(\\\\.json)?[\\/#\\?]?$", "originalSource": "/(api|trpc)(.*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "a5mOSdTwSm-VqyWBK3ZL9", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "XNc47T3B00KPV2qP5pPyPJvHLLoAVxi27ptGGlFe0MY=", "__NEXT_PREVIEW_MODE_ID": "9fd117d17061304aa72e3839ba76f7a2", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "c2b9c031c54a86b1992ddac567583272601c82e9add45b8fe3680f54a4fd1d18", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "01d44c73bf7f84e9e2a2d97a268b04048497a4edaad7acaff101d3ffd1876119" } } }, "sortedMiddleware": ["/"], "functions": { "/(auth)/forgot-password/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules__pnpm_0s.ftz1._.js", "server/edge/chunks/ssr/0p5a_next_dist_00_20kl._.js", "server/edge/chunks/ssr/_0iof~vt._.js", "server/edge/chunks/ssr/_0ebkfkp._.js", "server/edge/chunks/ssr/0p5a_next_dist_11kf4_a._.js", "server/edge/chunks/ssr/_12hdtyo._.js", "server/edge/chunks/ssr/node_modules__pnpm_0g8apwc._.js", "server/edge/chunks/ssr/node_modules__pnpm_04ras.w._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0lq2oxs._.js", "server/edge/chunks/ssr/node_modules__pnpm_0--1w4.._.js", "server/edge/chunks/ssr/node_modules__pnpm_0m21_8o._.js", "server/edge/chunks/ssr/node_modules__pnpm_092j8d.._.js", "server/edge/chunks/ssr/12k._sonner_dist_index_mjs_01od1p0._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0s9kahm._.js", "server/edge/chunks/ssr/node_modules__pnpm_12et3~r._.js", "server/edge/chunks/ssr/0p5a_next_dist_03whesw._.js", "server/edge/chunks/ssr/_0jj2nka._.js", "server/edge/chunks/ssr/_0j5e-ro._.js", "server/app/(auth)/forgot-password/page_client-reference-manifest.js", "server/edge/chunks/ssr/_06pp.if._.js", "server/edge/chunks/ssr/0p5a_next_dist_0tls1ij._.js", "server/edge/chunks/ssr/0p5a_next_dist_0t_~92m._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_0yo8pv5._.js", "server/edge/chunks/ssr/node_modules__pnpm_0wfs~16._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_api_headers_0sutlxs.js", "server/edge/chunks/ssr/node_modules__pnpm_0pdptw9._.js", "server/edge/chunks/ssr/0p5a_next_dist_compiled_0~mbq1-._.js", "server/edge/chunks/ssr/node_modules__pnpm_13~6rc~._.js", "server/edge/chunks/ssr/0fge_@clerk_nextjs_dist_esm_client-boundary_uiComponents_0oe0ut8.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0f~.u3w._.js", "server/edge/chunks/ssr/[root-of-the-server]__06a3x.s._.js", "server/edge/chunks/ssr/0p5a_next_dist_028il8e._.js", "server/edge/chunks/ssr/0p5a_next_dist_0fjw4um._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_lib_patch-fetch_108gr2y.js", "server/edge/chunks/ssr/node_modules__pnpm_0_7-~bv._.js", "server/edge/chunks/ssr/0p5a_next_dist_0_0p-jx._.js", "server/edge/chunks/ssr/0p5a_next_dist_08ef9uu._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0x~b_gg._.js", "server/edge/chunks/ssr/[root-of-the-server]__0kc1uz.._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_build_templates_edge-ssr-app_11wbeg3.js", "server/edge/chunks/ssr/[root-of-the-server]__01vmns.._.js", "server/edge/chunks/ssr/0p5a_next_dist_07uzk07._.js", "server/edge/chunks/ssr/node_modules__pnpm_0avbdev._.js", "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_11e3bvf.js", "server/app/(auth)/forgot-password/page/react-loadable-manifest.js"], "name": "app/(auth)/forgot-password/page", "page": "/(auth)/forgot-password/page", "entrypoint": "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_11e3bvf.js", "matchers": [{ "regexp": "^/forgot-password(?:/)?$", "originalSource": "/forgot-password" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "a5mOSdTwSm-VqyWBK3ZL9", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "XNc47T3B00KPV2qP5pPyPJvHLLoAVxi27ptGGlFe0MY=", "__NEXT_PREVIEW_MODE_ID": "9fd117d17061304aa72e3839ba76f7a2", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "c2b9c031c54a86b1992ddac567583272601c82e9add45b8fe3680f54a4fd1d18", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "01d44c73bf7f84e9e2a2d97a268b04048497a4edaad7acaff101d3ffd1876119" } }, "/(auth)/sign-in/[[...sign-in]]/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules__pnpm_0s.ftz1._.js", "server/edge/chunks/ssr/0p5a_next_dist_00_20kl._.js", "server/edge/chunks/ssr/_0iof~vt._.js", "server/edge/chunks/ssr/_0ebkfkp._.js", "server/edge/chunks/ssr/0p5a_next_dist_11kf4_a._.js", "server/edge/chunks/ssr/_12hdtyo._.js", "server/edge/chunks/ssr/node_modules__pnpm_0g8apwc._.js", "server/edge/chunks/ssr/node_modules__pnpm_04ras.w._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0lq2oxs._.js", "server/edge/chunks/ssr/node_modules__pnpm_0--1w4.._.js", "server/edge/chunks/ssr/node_modules__pnpm_0m21_8o._.js", "server/edge/chunks/ssr/node_modules__pnpm_092j8d.._.js", "server/edge/chunks/ssr/12k._sonner_dist_index_mjs_01od1p0._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0s9kahm._.js", "server/edge/chunks/ssr/node_modules__pnpm_12et3~r._.js", "server/edge/chunks/ssr/0p5a_next_dist_03whesw._.js", "server/app/(auth)/sign-in/[[...sign-in]]/page_client-reference-manifest.js", "server/edge/chunks/ssr/_10bs_y3._.js", "server/edge/chunks/ssr/0p5a_next_dist_0tls1ij._.js", "server/edge/chunks/ssr/0p5a_next_dist_0t_~92m._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_0yo8pv5._.js", "server/edge/chunks/ssr/node_modules__pnpm_0wfs~16._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_api_headers_0sutlxs.js", "server/edge/chunks/ssr/node_modules__pnpm_0pdptw9._.js", "server/edge/chunks/ssr/0p5a_next_dist_compiled_0~mbq1-._.js", "server/edge/chunks/ssr/node_modules__pnpm_13~6rc~._.js", "server/edge/chunks/ssr/0fge_@clerk_nextjs_dist_esm_client-boundary_uiComponents_0oe0ut8.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0f~.u3w._.js", "server/edge/chunks/ssr/0p5a_next_dist_028il8e._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_build_templates_edge-ssr-app_0~.w1mz.js", "server/edge/chunks/ssr/node_modules__pnpm_0_7-~bv._.js", "server/edge/chunks/ssr/0p5a_next_dist_0fjw4um._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_lib_patch-fetch_108gr2y.js", "server/edge/chunks/ssr/0p5a_next_dist_0_0p-jx._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0x~b_gg._.js", "server/edge/chunks/ssr/node_modules__pnpm_0avbdev._.js", "server/edge/chunks/ssr/0p5a_next_dist_08ef9uu._.js", "server/edge/chunks/ssr/[root-of-the-server]__01vmns.._.js", "server/edge/chunks/ssr/[root-of-the-server]__0kc1uz.._.js", "server/edge/chunks/ssr/0p5a_next_dist_07uzk07._.js", "server/edge/chunks/ssr/[root-of-the-server]__12sxt7o._.js", "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0nrdmpn.js", "server/app/(auth)/sign-in/[[...sign-in]]/page/react-loadable-manifest.js"], "name": "app/(auth)/sign-in/[[...sign-in]]/page", "page": "/(auth)/sign-in/[[...sign-in]]/page", "entrypoint": "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0nrdmpn.js", "matchers": [{ "regexp": "^/sign-in(?:/(?P<nxtPsignin>.+?))?(?:/)?$", "originalSource": "/sign-in/[[...sign-in]]" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "a5mOSdTwSm-VqyWBK3ZL9", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "XNc47T3B00KPV2qP5pPyPJvHLLoAVxi27ptGGlFe0MY=", "__NEXT_PREVIEW_MODE_ID": "9fd117d17061304aa72e3839ba76f7a2", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "c2b9c031c54a86b1992ddac567583272601c82e9add45b8fe3680f54a4fd1d18", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "01d44c73bf7f84e9e2a2d97a268b04048497a4edaad7acaff101d3ffd1876119" } }, "/(auth)/sign-up/[[...sign-up]]/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules__pnpm_0s.ftz1._.js", "server/edge/chunks/ssr/0p5a_next_dist_00_20kl._.js", "server/edge/chunks/ssr/_0iof~vt._.js", "server/edge/chunks/ssr/_0ebkfkp._.js", "server/edge/chunks/ssr/0p5a_next_dist_11kf4_a._.js", "server/edge/chunks/ssr/_12hdtyo._.js", "server/edge/chunks/ssr/node_modules__pnpm_0g8apwc._.js", "server/edge/chunks/ssr/node_modules__pnpm_04ras.w._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0lq2oxs._.js", "server/edge/chunks/ssr/node_modules__pnpm_0--1w4.._.js", "server/edge/chunks/ssr/node_modules__pnpm_0m21_8o._.js", "server/edge/chunks/ssr/node_modules__pnpm_092j8d.._.js", "server/edge/chunks/ssr/12k._sonner_dist_index_mjs_01od1p0._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0s9kahm._.js", "server/edge/chunks/ssr/node_modules__pnpm_12et3~r._.js", "server/edge/chunks/ssr/0p5a_next_dist_03whesw._.js", "server/app/(auth)/sign-up/[[...sign-up]]/page_client-reference-manifest.js", "server/edge/chunks/ssr/_0zadjj_._.js", "server/edge/chunks/ssr/0p5a_next_dist_0tls1ij._.js", "server/edge/chunks/ssr/0p5a_next_dist_0t_~92m._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_0yo8pv5._.js", "server/edge/chunks/ssr/node_modules__pnpm_0wfs~16._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_api_headers_0sutlxs.js", "server/edge/chunks/ssr/node_modules__pnpm_0pdptw9._.js", "server/edge/chunks/ssr/0p5a_next_dist_compiled_0~mbq1-._.js", "server/edge/chunks/ssr/node_modules__pnpm_13~6rc~._.js", "server/edge/chunks/ssr/0fge_@clerk_nextjs_dist_esm_client-boundary_uiComponents_0oe0ut8.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0f~.u3w._.js", "server/edge/chunks/ssr/0p5a_next_dist_028il8e._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_build_templates_edge-ssr-app_067w7yr.js", "server/edge/chunks/ssr/node_modules__pnpm_0_7-~bv._.js", "server/edge/chunks/ssr/0p5a_next_dist_0fjw4um._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_lib_patch-fetch_108gr2y.js", "server/edge/chunks/ssr/0p5a_next_dist_0_0p-jx._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0x~b_gg._.js", "server/edge/chunks/ssr/node_modules__pnpm_0avbdev._.js", "server/edge/chunks/ssr/0p5a_next_dist_08ef9uu._.js", "server/edge/chunks/ssr/[root-of-the-server]__01vmns.._.js", "server/edge/chunks/ssr/[root-of-the-server]__0kc1uz.._.js", "server/edge/chunks/ssr/0p5a_next_dist_07uzk07._.js", "server/edge/chunks/ssr/[root-of-the-server]__0d9-~yz._.js", "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_03vqtrz.js", "server/app/(auth)/sign-up/[[...sign-up]]/page/react-loadable-manifest.js"], "name": "app/(auth)/sign-up/[[...sign-up]]/page", "page": "/(auth)/sign-up/[[...sign-up]]/page", "entrypoint": "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_03vqtrz.js", "matchers": [{ "regexp": "^/sign-up(?:/(?P<nxtPsignup>.+?))?(?:/)?$", "originalSource": "/sign-up/[[...sign-up]]" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "a5mOSdTwSm-VqyWBK3ZL9", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "XNc47T3B00KPV2qP5pPyPJvHLLoAVxi27ptGGlFe0MY=", "__NEXT_PREVIEW_MODE_ID": "9fd117d17061304aa72e3839ba76f7a2", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "c2b9c031c54a86b1992ddac567583272601c82e9add45b8fe3680f54a4fd1d18", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "01d44c73bf7f84e9e2a2d97a268b04048497a4edaad7acaff101d3ffd1876119" } }, "/_not-found/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules__pnpm_0s.ftz1._.js", "server/edge/chunks/ssr/0p5a_next_dist_00_20kl._.js", "server/edge/chunks/ssr/_0iof~vt._.js", "server/edge/chunks/ssr/_0ebkfkp._.js", "server/edge/chunks/ssr/0p5a_next_dist_11kf4_a._.js", "server/edge/chunks/ssr/_12hdtyo._.js", "server/edge/chunks/ssr/node_modules__pnpm_0g8apwc._.js", "server/edge/chunks/ssr/node_modules__pnpm_04ras.w._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0lq2oxs._.js", "server/edge/chunks/ssr/node_modules__pnpm_0--1w4.._.js", "server/edge/chunks/ssr/node_modules__pnpm_0m21_8o._.js", "server/edge/chunks/ssr/node_modules__pnpm_092j8d.._.js", "server/edge/chunks/ssr/12k._sonner_dist_index_mjs_01od1p0._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0s9kahm._.js", "server/edge/chunks/ssr/node_modules__pnpm_12et3~r._.js", "server/edge/chunks/ssr/0p5a_next_dist_03whesw._.js", "server/app/_not-found/page_client-reference-manifest.js", "server/edge/chunks/ssr/_0j.lc69._.js", "server/edge/chunks/ssr/0p5a_next_dist_0tls1ij._.js", "server/edge/chunks/ssr/0p5a_next_dist_0t_~92m._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_0yo8pv5._.js", "server/edge/chunks/ssr/node_modules__pnpm_0wfs~16._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_api_headers_0sutlxs.js", "server/edge/chunks/ssr/node_modules__pnpm_0pdptw9._.js", "server/edge/chunks/ssr/0p5a_next_dist_compiled_0~mbq1-._.js", "server/edge/chunks/ssr/node_modules__pnpm_13~6rc~._.js", "server/edge/chunks/ssr/0fge_@clerk_nextjs_dist_esm_client-boundary_uiComponents_0oe0ut8.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0f~.u3w._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_lib_patch-fetch_108gr2y.js", "server/edge/chunks/ssr/node_modules__pnpm_0avbdev._.js", "server/edge/chunks/ssr/0p5a_next_dist_0fjw4um._.js", "server/edge/chunks/ssr/0p5a_next_dist_028il8e._.js", "server/edge/chunks/ssr/[root-of-the-server]__0ujqd-6._.js", "server/edge/chunks/ssr/0p5a_next_dist_08ef9uu._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0x~b_gg._.js", "server/edge/chunks/ssr/[root-of-the-server]__0kc1uz.._.js", "server/edge/chunks/ssr/0p5a_next_dist_0_0p-jx._.js", "server/edge/chunks/ssr/node_modules__pnpm_0_7-~bv._.js", "server/edge/chunks/ssr/[root-of-the-server]__01vmns.._.js", "server/edge/chunks/ssr/0p5a_next_dist_07uzk07._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_build_templates_edge-ssr-app_0giyuht.js", "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0hejgzp.js", "server/app/_not-found/page/react-loadable-manifest.js"], "name": "app/_not-found/page", "page": "/_not-found/page", "entrypoint": "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0hejgzp.js", "matchers": [{ "regexp": "^/_not-found(?:/)?$", "originalSource": "/_not-found" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "a5mOSdTwSm-VqyWBK3ZL9", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "XNc47T3B00KPV2qP5pPyPJvHLLoAVxi27ptGGlFe0MY=", "__NEXT_PREVIEW_MODE_ID": "9fd117d17061304aa72e3839ba76f7a2", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "c2b9c031c54a86b1992ddac567583272601c82e9add45b8fe3680f54a4fd1d18", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "01d44c73bf7f84e9e2a2d97a268b04048497a4edaad7acaff101d3ffd1876119" } }, "/admin/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules__pnpm_0s.ftz1._.js", "server/edge/chunks/ssr/0p5a_next_dist_00_20kl._.js", "server/edge/chunks/ssr/_0iof~vt._.js", "server/edge/chunks/ssr/_0ebkfkp._.js", "server/edge/chunks/ssr/0p5a_next_dist_11kf4_a._.js", "server/edge/chunks/ssr/_12hdtyo._.js", "server/edge/chunks/ssr/node_modules__pnpm_0g8apwc._.js", "server/edge/chunks/ssr/node_modules__pnpm_04ras.w._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0lq2oxs._.js", "server/edge/chunks/ssr/node_modules__pnpm_0--1w4.._.js", "server/edge/chunks/ssr/node_modules__pnpm_0m21_8o._.js", "server/edge/chunks/ssr/node_modules__pnpm_092j8d.._.js", "server/edge/chunks/ssr/12k._sonner_dist_index_mjs_01od1p0._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0s9kahm._.js", "server/edge/chunks/ssr/node_modules__pnpm_12et3~r._.js", "server/edge/chunks/ssr/0p5a_next_dist_03whesw._.js", "server/edge/chunks/ssr/_0i17x.l._.js", "server/edge/chunks/ssr/_0zopz7w._.js", "server/edge/chunks/ssr/_0-xka88._.js", "server/edge/chunks/ssr/_0v~u_-4._.js", "server/edge/chunks/ssr/_0kyp037._.js", "server/edge/chunks/ssr/_0oljlix._.js", "server/edge/chunks/ssr/packages_ui_src_components_scroll-area_tsx_0m5lo3h._.js", "server/edge/chunks/ssr/apps_aagora-core_components_navbar_tsx_01etfnf._.js", "server/edge/chunks/ssr/_0tj3w6_._.js", "server/edge/chunks/ssr/_12qpxq8._.js", "server/edge/chunks/ssr/apps_aagora-core_app_admin_page_tsx_0ju58~5._.js", "server/app/admin/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules__pnpm_03hl7ks._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0llm1ej._.js", "server/edge/chunks/ssr/0p5a_next_dist_0d0e6_e._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_api_headers_0sutlxs.js", "server/edge/chunks/ssr/node_modules__pnpm_0ptn6rl._.js", "server/edge/chunks/ssr/node_modules__pnpm_0b5_1z1._.js", "server/edge/chunks/ssr/[root-of-the-server]__04fofcp._.js", "server/edge/chunks/ssr/_0sq0g0e._.js", "server/edge/chunks/ssr/_0r-2fl0._.js", "server/edge/chunks/ssr/0p5a_next_dist_0n9eixf._.js", "server/edge/chunks/ssr/_0-dqmpz._.js", "server/edge/chunks/ssr/0p5a_next_dist_compiled_0~mbq1-._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_0-jxpy_._.js", "server/edge/chunks/ssr/node_modules__pnpm_0lbmh7e._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_lib_patch-fetch_108gr2y.js", "server/edge/chunks/ssr/node_modules__pnpm_13~6rc~._.js", "server/edge/chunks/ssr/0fge_@clerk_nextjs_dist_esm_client-boundary_uiComponents_0oe0ut8.js", "server/edge/chunks/ssr/0p5a_next_dist_028il8e._.js", "server/edge/chunks/ssr/0p5a_next_dist_07uzk07._.js", "server/edge/chunks/ssr/0p5a_next_dist_0fjw4um._.js", "server/edge/chunks/ssr/_0ehto4-._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_build_templates_edge-ssr-app_0ufanqy.js", "server/edge/chunks/ssr/[root-of-the-server]__01vmns.._.js", "server/edge/chunks/ssr/[root-of-the-server]__0kc1uz.._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0x~b_gg._.js", "server/edge/chunks/ssr/node_modules__pnpm_0_7-~bv._.js", "server/edge/chunks/ssr/0p5a_next_dist_0_0p-jx._.js", "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0_ptxau.js", "server/app/admin/page/react-loadable-manifest.js"], "name": "app/admin/page", "page": "/admin/page", "entrypoint": "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0_ptxau.js", "matchers": [{ "regexp": "^/admin(?:/)?$", "originalSource": "/admin" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "a5mOSdTwSm-VqyWBK3ZL9", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "XNc47T3B00KPV2qP5pPyPJvHLLoAVxi27ptGGlFe0MY=", "__NEXT_PREVIEW_MODE_ID": "9fd117d17061304aa72e3839ba76f7a2", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "c2b9c031c54a86b1992ddac567583272601c82e9add45b8fe3680f54a4fd1d18", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "01d44c73bf7f84e9e2a2d97a268b04048497a4edaad7acaff101d3ffd1876119" } }, "/api/r2/delete/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/r2/delete/route_client-reference-manifest.js", "server/edge/chunks/apps_aagora-core__next-internal_server_app_api_r2_delete_route_actions_01x541v.js", "server/edge/chunks/0p5a_next_dist_esm_api_headers_0_w8hiy.js", "server/edge/chunks/[root-of-the-server]__0kbtyx5._.js", "server/edge/chunks/0p5a_next_dist_08a8m.t._.js", "server/edge/chunks/_0dadn2p._.js", "server/edge/chunks/0p5a_next_dist_106ko.s._.js", "server/edge/chunks/0h1h_next_dist_esm_build_templates_edge-wrapper_0hzekzf.js"], "name": "app/api/r2/delete/route", "page": "/api/r2/delete/route", "entrypoint": "server/edge/chunks/0h1h_next_dist_esm_build_templates_edge-wrapper_0hzekzf.js", "matchers": [{ "regexp": "^/api/r2/delete(?:/)?$", "originalSource": "/api/r2/delete" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "a5mOSdTwSm-VqyWBK3ZL9", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "XNc47T3B00KPV2qP5pPyPJvHLLoAVxi27ptGGlFe0MY=", "__NEXT_PREVIEW_MODE_ID": "9fd117d17061304aa72e3839ba76f7a2", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "c2b9c031c54a86b1992ddac567583272601c82e9add45b8fe3680f54a4fd1d18", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "01d44c73bf7f84e9e2a2d97a268b04048497a4edaad7acaff101d3ffd1876119" } }, "/api/r2/list/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/r2/list/route_client-reference-manifest.js", "server/edge/chunks/apps_aagora-core__next-internal_server_app_api_r2_list_route_actions_09_2zx1.js", "server/edge/chunks/0p5a_next_dist_esm_api_headers_0_w8hiy.js", "server/edge/chunks/[root-of-the-server]__0z78uz7._.js", "server/edge/chunks/0p5a_next_dist_08a8m.t._.js", "server/edge/chunks/0p5a_next_dist_106ko.s._.js", "server/edge/chunks/0h1h_next_dist_esm_build_templates_edge-wrapper_0bqylwo.js"], "name": "app/api/r2/list/route", "page": "/api/r2/list/route", "entrypoint": "server/edge/chunks/0h1h_next_dist_esm_build_templates_edge-wrapper_0bqylwo.js", "matchers": [{ "regexp": "^/api/r2/list(?:/)?$", "originalSource": "/api/r2/list" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "a5mOSdTwSm-VqyWBK3ZL9", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "XNc47T3B00KPV2qP5pPyPJvHLLoAVxi27ptGGlFe0MY=", "__NEXT_PREVIEW_MODE_ID": "9fd117d17061304aa72e3839ba76f7a2", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "c2b9c031c54a86b1992ddac567583272601c82e9add45b8fe3680f54a4fd1d18", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "01d44c73bf7f84e9e2a2d97a268b04048497a4edaad7acaff101d3ffd1876119" } }, "/api/r2/upload/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/r2/upload/route_client-reference-manifest.js", "server/edge/chunks/apps_aagora-core__next-internal_server_app_api_r2_upload_route_actions_13lyk_~.js", "server/edge/chunks/0p5a_next_dist_esm_api_headers_0_w8hiy.js", "server/edge/chunks/0p5a_next_dist_106ko.s._.js", "server/edge/chunks/[root-of-the-server]__0xf44zs._.js", "server/edge/chunks/_0lj~8kl._.js", "server/edge/chunks/0p5a_next_dist_08a8m.t._.js", "server/edge/chunks/0p5a_next_dist_esm_build_templates_edge-app-route_0ixs260.js", "server/edge/chunks/0h1h_next_dist_esm_build_templates_edge-wrapper_0azw4a-.js"], "name": "app/api/r2/upload/route", "page": "/api/r2/upload/route", "entrypoint": "server/edge/chunks/0h1h_next_dist_esm_build_templates_edge-wrapper_0azw4a-.js", "matchers": [{ "regexp": "^/api/r2/upload(?:/)?$", "originalSource": "/api/r2/upload" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "a5mOSdTwSm-VqyWBK3ZL9", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "XNc47T3B00KPV2qP5pPyPJvHLLoAVxi27ptGGlFe0MY=", "__NEXT_PREVIEW_MODE_ID": "9fd117d17061304aa72e3839ba76f7a2", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "c2b9c031c54a86b1992ddac567583272601c82e9add45b8fe3680f54a4fd1d18", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "01d44c73bf7f84e9e2a2d97a268b04048497a4edaad7acaff101d3ffd1876119" } }, "/auth/callback/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules__pnpm_0s.ftz1._.js", "server/edge/chunks/ssr/0p5a_next_dist_00_20kl._.js", "server/edge/chunks/ssr/_0iof~vt._.js", "server/edge/chunks/ssr/_0ebkfkp._.js", "server/edge/chunks/ssr/0p5a_next_dist_11kf4_a._.js", "server/edge/chunks/ssr/_12hdtyo._.js", "server/edge/chunks/ssr/node_modules__pnpm_0g8apwc._.js", "server/edge/chunks/ssr/node_modules__pnpm_04ras.w._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0lq2oxs._.js", "server/edge/chunks/ssr/node_modules__pnpm_0--1w4.._.js", "server/edge/chunks/ssr/node_modules__pnpm_0m21_8o._.js", "server/edge/chunks/ssr/node_modules__pnpm_092j8d.._.js", "server/edge/chunks/ssr/12k._sonner_dist_index_mjs_01od1p0._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0s9kahm._.js", "server/edge/chunks/ssr/node_modules__pnpm_12et3~r._.js", "server/edge/chunks/ssr/0p5a_next_dist_03whesw._.js", "server/app/auth/callback/page_client-reference-manifest.js", "server/edge/chunks/ssr/_0kga6xh._.js", "server/edge/chunks/ssr/0p5a_next_dist_0tls1ij._.js", "server/edge/chunks/ssr/0p5a_next_dist_0t_~92m._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_0yo8pv5._.js", "server/edge/chunks/ssr/node_modules__pnpm_0wfs~16._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_api_headers_0sutlxs.js", "server/edge/chunks/ssr/node_modules__pnpm_0pdptw9._.js", "server/edge/chunks/ssr/0p5a_next_dist_compiled_0~mbq1-._.js", "server/edge/chunks/ssr/node_modules__pnpm_13~6rc~._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0f~.u3w._.js", "server/edge/chunks/ssr/0fge_@clerk_nextjs_dist_esm_client-boundary_uiComponents_0oe0ut8.js", "server/edge/chunks/ssr/0p5a_next_dist_028il8e._.js", "server/edge/chunks/ssr/0p5a_next_dist_0fjw4um._.js", "server/edge/chunks/ssr/node_modules__pnpm_0_7-~bv._.js", "server/edge/chunks/ssr/0p5a_next_dist_07uzk07._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_lib_patch-fetch_108gr2y.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_build_templates_edge-ssr-app_0z7fv4..js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0x~b_gg._.js", "server/edge/chunks/ssr/0p5a_next_dist_0_0p-jx._.js", "server/edge/chunks/ssr/[root-of-the-server]__0kc1uz.._.js", "server/edge/chunks/ssr/[root-of-the-server]__01vmns.._.js", "server/edge/chunks/ssr/0p5a_next_dist_08ef9uu._.js", "server/edge/chunks/ssr/node_modules__pnpm_0avbdev._.js", "server/edge/chunks/ssr/_02biyvl._.js", "server/edge/chunks/ssr/[root-of-the-server]__0jsc7z6._.js", "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0ngvwce.js", "server/app/auth/callback/page/react-loadable-manifest.js"], "name": "app/auth/callback/page", "page": "/auth/callback/page", "entrypoint": "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0ngvwce.js", "matchers": [{ "regexp": "^/auth/callback(?:/)?$", "originalSource": "/auth/callback" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "a5mOSdTwSm-VqyWBK3ZL9", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "XNc47T3B00KPV2qP5pPyPJvHLLoAVxi27ptGGlFe0MY=", "__NEXT_PREVIEW_MODE_ID": "9fd117d17061304aa72e3839ba76f7a2", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "c2b9c031c54a86b1992ddac567583272601c82e9add45b8fe3680f54a4fd1d18", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "01d44c73bf7f84e9e2a2d97a268b04048497a4edaad7acaff101d3ffd1876119" } }, "/dashboard/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules__pnpm_0s.ftz1._.js", "server/edge/chunks/ssr/0p5a_next_dist_00_20kl._.js", "server/edge/chunks/ssr/_0iof~vt._.js", "server/edge/chunks/ssr/_0ebkfkp._.js", "server/edge/chunks/ssr/0p5a_next_dist_11kf4_a._.js", "server/edge/chunks/ssr/_12hdtyo._.js", "server/edge/chunks/ssr/node_modules__pnpm_0g8apwc._.js", "server/edge/chunks/ssr/node_modules__pnpm_04ras.w._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0lq2oxs._.js", "server/edge/chunks/ssr/node_modules__pnpm_0--1w4.._.js", "server/edge/chunks/ssr/node_modules__pnpm_0m21_8o._.js", "server/edge/chunks/ssr/node_modules__pnpm_092j8d.._.js", "server/edge/chunks/ssr/12k._sonner_dist_index_mjs_01od1p0._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0s9kahm._.js", "server/edge/chunks/ssr/node_modules__pnpm_12et3~r._.js", "server/edge/chunks/ssr/0p5a_next_dist_03whesw._.js", "server/edge/chunks/ssr/apps_aagora-core_app_dashboard_layout_tsx_0.mxbmg._.js", "server/edge/chunks/ssr/_0i17x.l._.js", "server/edge/chunks/ssr/_0-xka88._.js", "server/edge/chunks/ssr/_0xx~rsu._.js", "server/edge/chunks/ssr/_0yfkk42._.js", "server/edge/chunks/ssr/_0tj3w6_._.js", "server/edge/chunks/ssr/packages_ui_src_components_scroll-area_tsx_0m5lo3h._.js", "server/edge/chunks/ssr/apps_aagora-core_components_navbar_tsx_01etfnf._.js", "server/edge/chunks/ssr/_0oljlix._.js", "server/edge/chunks/ssr/_0kyp037._.js", "server/edge/chunks/ssr/_0uqobdj._.js", "server/edge/chunks/ssr/apps_aagora-core_app_dashboard_page_tsx_0f_p_~7._.js", "server/app/dashboard/page_client-reference-manifest.js", "server/edge/chunks/ssr/0p5a_next_dist_0d0e6_e._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_api_headers_0sutlxs.js", "server/edge/chunks/ssr/_00_7nym._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_lib_patch-fetch_108gr2y.js", "server/edge/chunks/ssr/0p5a_next_dist_compiled_0~mbq1-._.js", "server/edge/chunks/ssr/[root-of-the-server]__04fofcp._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0llm1ej._.js", "server/edge/chunks/ssr/node_modules__pnpm_0ptn6rl._.js", "server/edge/chunks/ssr/_0-dqmpz._.js", "server/edge/chunks/ssr/node_modules__pnpm_0lbmh7e._.js", "server/edge/chunks/ssr/_0r-2fl0._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_0-jxpy_._.js", "server/edge/chunks/ssr/node_modules__pnpm_0b5_1z1._.js", "server/edge/chunks/ssr/0p5a_next_dist_0n9eixf._.js", "server/edge/chunks/ssr/node_modules__pnpm_13~6rc~._.js", "server/edge/chunks/ssr/0fge_@clerk_nextjs_dist_esm_client-boundary_uiComponents_0oe0ut8.js", "server/edge/chunks/ssr/0p5a_next_dist_028il8e._.js", "server/edge/chunks/ssr/0p5a_next_dist_07uzk07._.js", "server/edge/chunks/ssr/0p5a_next_dist_0fjw4um._.js", "server/edge/chunks/ssr/_0r6bk~_._.js", "server/edge/chunks/ssr/node_modules__pnpm_0_7-~bv._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_build_templates_edge-ssr-app_088f_1n.js", "server/edge/chunks/ssr/[root-of-the-server]__01vmns.._.js", "server/edge/chunks/ssr/[root-of-the-server]__0kc1uz.._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0x~b_gg._.js", "server/edge/chunks/ssr/0p5a_next_dist_0_0p-jx._.js", "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0mgg2x7.js", "server/app/dashboard/page/react-loadable-manifest.js"], "name": "app/dashboard/page", "page": "/dashboard/page", "entrypoint": "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0mgg2x7.js", "matchers": [{ "regexp": "^/dashboard(?:/)?$", "originalSource": "/dashboard" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "a5mOSdTwSm-VqyWBK3ZL9", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "XNc47T3B00KPV2qP5pPyPJvHLLoAVxi27ptGGlFe0MY=", "__NEXT_PREVIEW_MODE_ID": "9fd117d17061304aa72e3839ba76f7a2", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "c2b9c031c54a86b1992ddac567583272601c82e9add45b8fe3680f54a4fd1d18", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "01d44c73bf7f84e9e2a2d97a268b04048497a4edaad7acaff101d3ffd1876119" } }, "/library/construction/assets/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules__pnpm_0s.ftz1._.js", "server/edge/chunks/ssr/0p5a_next_dist_00_20kl._.js", "server/edge/chunks/ssr/_0iof~vt._.js", "server/edge/chunks/ssr/_0ebkfkp._.js", "server/edge/chunks/ssr/0p5a_next_dist_11kf4_a._.js", "server/edge/chunks/ssr/_12hdtyo._.js", "server/edge/chunks/ssr/node_modules__pnpm_0g8apwc._.js", "server/edge/chunks/ssr/node_modules__pnpm_04ras.w._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0lq2oxs._.js", "server/edge/chunks/ssr/node_modules__pnpm_0--1w4.._.js", "server/edge/chunks/ssr/node_modules__pnpm_0m21_8o._.js", "server/edge/chunks/ssr/node_modules__pnpm_092j8d.._.js", "server/edge/chunks/ssr/12k._sonner_dist_index_mjs_01od1p0._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0s9kahm._.js", "server/edge/chunks/ssr/node_modules__pnpm_12et3~r._.js", "server/edge/chunks/ssr/0p5a_next_dist_03whesw._.js", "server/edge/chunks/ssr/_0i17x.l._.js", "server/edge/chunks/ssr/_0zopz7w._.js", "server/edge/chunks/ssr/_0-xka88._.js", "server/edge/chunks/ssr/_0v~u_-4._.js", "server/edge/chunks/ssr/_0kyp037._.js", "server/edge/chunks/ssr/_0oljlix._.js", "server/edge/chunks/ssr/packages_ui_src_components_scroll-area_tsx_0m5lo3h._.js", "server/edge/chunks/ssr/apps_aagora-core_components_navbar_tsx_01etfnf._.js", "server/edge/chunks/ssr/_0tj3w6_._.js", "server/edge/chunks/ssr/_0fw_815._.js", "server/edge/chunks/ssr/apps_aagora-core_app_library_construction_assets_page_tsx_0~t1~9k._.js", "server/app/library/construction/assets/page_client-reference-manifest.js", "server/edge/chunks/ssr/_0z332o2._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_api_headers_0sutlxs.js", "server/edge/chunks/ssr/0p5a_next_dist_0d0e6_e._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_0-jxpy_._.js", "server/edge/chunks/ssr/0p5a_next_dist_compiled_0~mbq1-._.js", "server/edge/chunks/ssr/[root-of-the-server]__04fofcp._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0llm1ej._.js", "server/edge/chunks/ssr/_0-dqmpz._.js", "server/edge/chunks/ssr/node_modules__pnpm_0ptn6rl._.js", "server/edge/chunks/ssr/node_modules__pnpm_0lbmh7e._.js", "server/edge/chunks/ssr/_0r-2fl0._.js", "server/edge/chunks/ssr/0p5a_next_dist_0n9eixf._.js", "server/edge/chunks/ssr/node_modules__pnpm_0b5_1z1._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_lib_patch-fetch_108gr2y.js", "server/edge/chunks/ssr/node_modules__pnpm_13~6rc~._.js", "server/edge/chunks/ssr/0fge_@clerk_nextjs_dist_esm_client-boundary_uiComponents_0oe0ut8.js", "server/edge/chunks/ssr/_08jqsh6._.js", "server/edge/chunks/ssr/0p5a_next_dist_0fjw4um._.js", "server/edge/chunks/ssr/0p5a_next_dist_028il8e._.js", "server/edge/chunks/ssr/0p5a_next_dist_07uzk07._.js", "server/edge/chunks/ssr/0p5a_next_dist_0_0p-jx._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_build_templates_edge-ssr-app_0lgaxtk.js", "server/edge/chunks/ssr/node_modules__pnpm_0_7-~bv._.js", "server/edge/chunks/ssr/[root-of-the-server]__01vmns.._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0x~b_gg._.js", "server/edge/chunks/ssr/[root-of-the-server]__0kc1uz.._.js", "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_00~46sy.js", "server/app/library/construction/assets/page/react-loadable-manifest.js"], "name": "app/library/construction/assets/page", "page": "/library/construction/assets/page", "entrypoint": "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_00~46sy.js", "matchers": [{ "regexp": "^/library/construction/assets(?:/)?$", "originalSource": "/library/construction/assets" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "a5mOSdTwSm-VqyWBK3ZL9", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "XNc47T3B00KPV2qP5pPyPJvHLLoAVxi27ptGGlFe0MY=", "__NEXT_PREVIEW_MODE_ID": "9fd117d17061304aa72e3839ba76f7a2", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "c2b9c031c54a86b1992ddac567583272601c82e9add45b8fe3680f54a4fd1d18", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "01d44c73bf7f84e9e2a2d97a268b04048497a4edaad7acaff101d3ffd1876119" } }, "/library/construction/items/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules__pnpm_0s.ftz1._.js", "server/edge/chunks/ssr/0p5a_next_dist_00_20kl._.js", "server/edge/chunks/ssr/_0iof~vt._.js", "server/edge/chunks/ssr/_0ebkfkp._.js", "server/edge/chunks/ssr/0p5a_next_dist_11kf4_a._.js", "server/edge/chunks/ssr/_12hdtyo._.js", "server/edge/chunks/ssr/node_modules__pnpm_0g8apwc._.js", "server/edge/chunks/ssr/node_modules__pnpm_04ras.w._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0lq2oxs._.js", "server/edge/chunks/ssr/node_modules__pnpm_0--1w4.._.js", "server/edge/chunks/ssr/node_modules__pnpm_0m21_8o._.js", "server/edge/chunks/ssr/node_modules__pnpm_092j8d.._.js", "server/edge/chunks/ssr/12k._sonner_dist_index_mjs_01od1p0._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0s9kahm._.js", "server/edge/chunks/ssr/node_modules__pnpm_12et3~r._.js", "server/edge/chunks/ssr/0p5a_next_dist_03whesw._.js", "server/edge/chunks/ssr/_0i17x.l._.js", "server/edge/chunks/ssr/_0zopz7w._.js", "server/edge/chunks/ssr/_0-xka88._.js", "server/edge/chunks/ssr/_0v~u_-4._.js", "server/edge/chunks/ssr/_0kyp037._.js", "server/edge/chunks/ssr/_0oljlix._.js", "server/edge/chunks/ssr/packages_ui_src_components_scroll-area_tsx_0m5lo3h._.js", "server/edge/chunks/ssr/apps_aagora-core_components_navbar_tsx_01etfnf._.js", "server/edge/chunks/ssr/_0tj3w6_._.js", "server/edge/chunks/ssr/_031cpgn._.js", "server/edge/chunks/ssr/apps_aagora-core_app_library_construction_items_page_tsx_0oturkp._.js", "server/app/library/construction/items/page_client-reference-manifest.js", "server/edge/chunks/ssr/_0juu1kv._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0llm1ej._.js", "server/edge/chunks/ssr/0p5a_next_dist_0d0e6_e._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_api_headers_0sutlxs.js", "server/edge/chunks/ssr/0p5a_next_dist_compiled_0~mbq1-._.js", "server/edge/chunks/ssr/node_modules__pnpm_0b5_1z1._.js", "server/edge/chunks/ssr/10fm__next-internal_server_app_library_construction_items_page_actions_00wsztx.js", "server/edge/chunks/ssr/node_modules__pnpm_0ptn6rl._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_lib_patch-fetch_108gr2y.js", "server/edge/chunks/ssr/node_modules__pnpm_0lbmh7e._.js", "server/edge/chunks/ssr/_0r-2fl0._.js", "server/edge/chunks/ssr/_0-dqmpz._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_0-jxpy_._.js", "server/edge/chunks/ssr/0p5a_next_dist_0n9eixf._.js", "server/edge/chunks/ssr/[root-of-the-server]__04fofcp._.js", "server/edge/chunks/ssr/node_modules__pnpm_13~6rc~._.js", "server/edge/chunks/ssr/0fge_@clerk_nextjs_dist_esm_client-boundary_uiComponents_0oe0ut8.js", "server/edge/chunks/ssr/_0nirk.z._.js", "server/edge/chunks/ssr/0p5a_next_dist_0fjw4um._.js", "server/edge/chunks/ssr/0p5a_next_dist_028il8e._.js", "server/edge/chunks/ssr/node_modules__pnpm_0_7-~bv._.js", "server/edge/chunks/ssr/0p5a_next_dist_0_0p-jx._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_build_templates_edge-ssr-app_0b4botb.js", "server/edge/chunks/ssr/[root-of-the-server]__01vmns.._.js", "server/edge/chunks/ssr/[root-of-the-server]__0kc1uz.._.js", "server/edge/chunks/ssr/0p5a_next_dist_07uzk07._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0x~b_gg._.js", "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0~mn7at.js", "server/app/library/construction/items/page/react-loadable-manifest.js"], "name": "app/library/construction/items/page", "page": "/library/construction/items/page", "entrypoint": "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0~mn7at.js", "matchers": [{ "regexp": "^/library/construction/items(?:/)?$", "originalSource": "/library/construction/items" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "a5mOSdTwSm-VqyWBK3ZL9", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "XNc47T3B00KPV2qP5pPyPJvHLLoAVxi27ptGGlFe0MY=", "__NEXT_PREVIEW_MODE_ID": "9fd117d17061304aa72e3839ba76f7a2", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "c2b9c031c54a86b1992ddac567583272601c82e9add45b8fe3680f54a4fd1d18", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "01d44c73bf7f84e9e2a2d97a268b04048497a4edaad7acaff101d3ffd1876119" } }, "/library/construction/supplies/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules__pnpm_0s.ftz1._.js", "server/edge/chunks/ssr/0p5a_next_dist_00_20kl._.js", "server/edge/chunks/ssr/_0iof~vt._.js", "server/edge/chunks/ssr/_0ebkfkp._.js", "server/edge/chunks/ssr/0p5a_next_dist_11kf4_a._.js", "server/edge/chunks/ssr/_12hdtyo._.js", "server/edge/chunks/ssr/node_modules__pnpm_0g8apwc._.js", "server/edge/chunks/ssr/node_modules__pnpm_04ras.w._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0lq2oxs._.js", "server/edge/chunks/ssr/node_modules__pnpm_0--1w4.._.js", "server/edge/chunks/ssr/node_modules__pnpm_0m21_8o._.js", "server/edge/chunks/ssr/node_modules__pnpm_092j8d.._.js", "server/edge/chunks/ssr/12k._sonner_dist_index_mjs_01od1p0._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0s9kahm._.js", "server/edge/chunks/ssr/node_modules__pnpm_12et3~r._.js", "server/edge/chunks/ssr/0p5a_next_dist_03whesw._.js", "server/edge/chunks/ssr/_0i17x.l._.js", "server/edge/chunks/ssr/_0zopz7w._.js", "server/edge/chunks/ssr/_0-xka88._.js", "server/edge/chunks/ssr/_0v~u_-4._.js", "server/edge/chunks/ssr/_0kyp037._.js", "server/edge/chunks/ssr/_0oljlix._.js", "server/edge/chunks/ssr/packages_ui_src_components_scroll-area_tsx_0m5lo3h._.js", "server/edge/chunks/ssr/apps_aagora-core_components_navbar_tsx_01etfnf._.js", "server/edge/chunks/ssr/_0tj3w6_._.js", "server/edge/chunks/ssr/[root-of-the-server]__0ar~krs._.js", "server/edge/chunks/ssr/apps_aagora-core_app_library_construction_supplies_page_tsx_11_6aj2._.js", "server/app/library/construction/supplies/page_client-reference-manifest.js", "server/edge/chunks/ssr/_0bfp_gu._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0llm1ej._.js", "server/edge/chunks/ssr/0p5a_next_dist_0d0e6_e._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_api_headers_0sutlxs.js", "server/edge/chunks/ssr/0p5a_next_dist_compiled_0~mbq1-._.js", "server/edge/chunks/ssr/node_modules__pnpm_0b5_1z1._.js", "server/edge/chunks/ssr/10fm__next-internal_server_app_library_construction_supplies_page_actions_0z~w7fv.js", "server/edge/chunks/ssr/node_modules__pnpm_0ptn6rl._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_lib_patch-fetch_108gr2y.js", "server/edge/chunks/ssr/node_modules__pnpm_0lbmh7e._.js", "server/edge/chunks/ssr/_0r-2fl0._.js", "server/edge/chunks/ssr/_0-dqmpz._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_0-jxpy_._.js", "server/edge/chunks/ssr/0p5a_next_dist_0n9eixf._.js", "server/edge/chunks/ssr/[root-of-the-server]__04fofcp._.js", "server/edge/chunks/ssr/node_modules__pnpm_13~6rc~._.js", "server/edge/chunks/ssr/0fge_@clerk_nextjs_dist_esm_client-boundary_uiComponents_0oe0ut8.js", "server/edge/chunks/ssr/_08bfeb9._.js", "server/edge/chunks/ssr/0p5a_next_dist_0fjw4um._.js", "server/edge/chunks/ssr/0p5a_next_dist_028il8e._.js", "server/edge/chunks/ssr/0p5a_next_dist_07uzk07._.js", "server/edge/chunks/ssr/0p5a_next_dist_0_0p-jx._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_build_templates_edge-ssr-app_11nmrh3.js", "server/edge/chunks/ssr/node_modules__pnpm_0_7-~bv._.js", "server/edge/chunks/ssr/[root-of-the-server]__01vmns.._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0x~b_gg._.js", "server/edge/chunks/ssr/[root-of-the-server]__0kc1uz.._.js", "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0rhg8cb.js", "server/app/library/construction/supplies/page/react-loadable-manifest.js"], "name": "app/library/construction/supplies/page", "page": "/library/construction/supplies/page", "entrypoint": "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0rhg8cb.js", "matchers": [{ "regexp": "^/library/construction/supplies(?:/)?$", "originalSource": "/library/construction/supplies" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "a5mOSdTwSm-VqyWBK3ZL9", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "XNc47T3B00KPV2qP5pPyPJvHLLoAVxi27ptGGlFe0MY=", "__NEXT_PREVIEW_MODE_ID": "9fd117d17061304aa72e3839ba76f7a2", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "c2b9c031c54a86b1992ddac567583272601c82e9add45b8fe3680f54a4fd1d18", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "01d44c73bf7f84e9e2a2d97a268b04048497a4edaad7acaff101d3ffd1876119" } }, "/library/contacts/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules__pnpm_0s.ftz1._.js", "server/edge/chunks/ssr/0p5a_next_dist_00_20kl._.js", "server/edge/chunks/ssr/_0iof~vt._.js", "server/edge/chunks/ssr/_0ebkfkp._.js", "server/edge/chunks/ssr/0p5a_next_dist_11kf4_a._.js", "server/edge/chunks/ssr/_12hdtyo._.js", "server/edge/chunks/ssr/node_modules__pnpm_0g8apwc._.js", "server/edge/chunks/ssr/node_modules__pnpm_04ras.w._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0lq2oxs._.js", "server/edge/chunks/ssr/node_modules__pnpm_0--1w4.._.js", "server/edge/chunks/ssr/node_modules__pnpm_0m21_8o._.js", "server/edge/chunks/ssr/node_modules__pnpm_092j8d.._.js", "server/edge/chunks/ssr/12k._sonner_dist_index_mjs_01od1p0._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0s9kahm._.js", "server/edge/chunks/ssr/node_modules__pnpm_12et3~r._.js", "server/edge/chunks/ssr/0p5a_next_dist_03whesw._.js", "server/edge/chunks/ssr/_0i17x.l._.js", "server/edge/chunks/ssr/_0zopz7w._.js", "server/edge/chunks/ssr/_0-xka88._.js", "server/edge/chunks/ssr/_0v~u_-4._.js", "server/edge/chunks/ssr/_0kyp037._.js", "server/edge/chunks/ssr/_0oljlix._.js", "server/edge/chunks/ssr/packages_ui_src_components_scroll-area_tsx_0m5lo3h._.js", "server/edge/chunks/ssr/apps_aagora-core_components_navbar_tsx_01etfnf._.js", "server/edge/chunks/ssr/_0tj3w6_._.js", "server/edge/chunks/ssr/_08-1-2q._.js", "server/edge/chunks/ssr/apps_aagora-core_app_library_contacts_page_tsx_0lue2so._.js", "server/app/library/contacts/page_client-reference-manifest.js", "server/edge/chunks/ssr/_07.10.2._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0llm1ej._.js", "server/edge/chunks/ssr/0p5a_next_dist_0d0e6_e._.js", "server/edge/chunks/ssr/0p5a_next_dist_compiled_0~mbq1-._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_api_headers_0sutlxs.js", "server/edge/chunks/ssr/node_modules__pnpm_0b5_1z1._.js", "server/edge/chunks/ssr/[root-of-the-server]__04fofcp._.js", "server/edge/chunks/ssr/_0xfqyf-._.js", "server/edge/chunks/ssr/_0r-2fl0._.js", "server/edge/chunks/ssr/0p5a_next_dist_0n9eixf._.js", "server/edge/chunks/ssr/node_modules__pnpm_0ptn6rl._.js", "server/edge/chunks/ssr/_0-dqmpz._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_0-jxpy_._.js", "server/edge/chunks/ssr/node_modules__pnpm_0lbmh7e._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_lib_patch-fetch_108gr2y.js", "server/edge/chunks/ssr/node_modules__pnpm_13~6rc~._.js", "server/edge/chunks/ssr/0fge_@clerk_nextjs_dist_esm_client-boundary_uiComponents_0oe0ut8.js", "server/edge/chunks/ssr/_04734m8._.js", "server/edge/chunks/ssr/0p5a_next_dist_0fjw4um._.js", "server/edge/chunks/ssr/0p5a_next_dist_028il8e._.js", "server/edge/chunks/ssr/0p5a_next_dist_07uzk07._.js", "server/edge/chunks/ssr/0p5a_next_dist_0_0p-jx._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_build_templates_edge-ssr-app_0-ardu2.js", "server/edge/chunks/ssr/node_modules__pnpm_0_7-~bv._.js", "server/edge/chunks/ssr/[root-of-the-server]__01vmns.._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0x~b_gg._.js", "server/edge/chunks/ssr/[root-of-the-server]__0kc1uz.._.js", "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0c1eipe.js", "server/app/library/contacts/page/react-loadable-manifest.js"], "name": "app/library/contacts/page", "page": "/library/contacts/page", "entrypoint": "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0c1eipe.js", "matchers": [{ "regexp": "^/library/contacts(?:/)?$", "originalSource": "/library/contacts" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "a5mOSdTwSm-VqyWBK3ZL9", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "XNc47T3B00KPV2qP5pPyPJvHLLoAVxi27ptGGlFe0MY=", "__NEXT_PREVIEW_MODE_ID": "9fd117d17061304aa72e3839ba76f7a2", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "c2b9c031c54a86b1992ddac567583272601c82e9add45b8fe3680f54a4fd1d18", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "01d44c73bf7f84e9e2a2d97a268b04048497a4edaad7acaff101d3ffd1876119" } }, "/library/design/cad/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules__pnpm_0s.ftz1._.js", "server/edge/chunks/ssr/0p5a_next_dist_00_20kl._.js", "server/edge/chunks/ssr/_0iof~vt._.js", "server/edge/chunks/ssr/_0ebkfkp._.js", "server/edge/chunks/ssr/0p5a_next_dist_11kf4_a._.js", "server/edge/chunks/ssr/_12hdtyo._.js", "server/edge/chunks/ssr/node_modules__pnpm_0g8apwc._.js", "server/edge/chunks/ssr/node_modules__pnpm_04ras.w._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0lq2oxs._.js", "server/edge/chunks/ssr/node_modules__pnpm_0--1w4.._.js", "server/edge/chunks/ssr/node_modules__pnpm_0m21_8o._.js", "server/edge/chunks/ssr/node_modules__pnpm_092j8d.._.js", "server/edge/chunks/ssr/12k._sonner_dist_index_mjs_01od1p0._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0s9kahm._.js", "server/edge/chunks/ssr/node_modules__pnpm_12et3~r._.js", "server/edge/chunks/ssr/0p5a_next_dist_03whesw._.js", "server/edge/chunks/ssr/apps_aagora-core_app_library_design_layout_tsx_0m57f_0._.js", "server/edge/chunks/ssr/_0i17x.l._.js", "server/edge/chunks/ssr/_0-xka88._.js", "server/edge/chunks/ssr/_0xx~rsu._.js", "server/edge/chunks/ssr/_0yfkk42._.js", "server/edge/chunks/ssr/_0tj3w6_._.js", "server/edge/chunks/ssr/packages_ui_src_components_scroll-area_tsx_0m5lo3h._.js", "server/edge/chunks/ssr/apps_aagora-core_components_navbar_tsx_01etfnf._.js", "server/edge/chunks/ssr/_0oljlix._.js", "server/edge/chunks/ssr/_0kyp037._.js", "server/edge/chunks/ssr/_0a~s4oz._.js", "server/edge/chunks/ssr/node_modules__pnpm_0epsu1x._.js", "server/app/library/design/cad/page_client-reference-manifest.js", "server/edge/chunks/ssr/_06witkd._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0llm1ej._.js", "server/edge/chunks/ssr/0p5a_next_dist_0d0e6_e._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_api_headers_0sutlxs.js", "server/edge/chunks/ssr/0p5a_next_dist_compiled_0~mbq1-._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_lib_patch-fetch_108gr2y.js", "server/edge/chunks/ssr/[root-of-the-server]__04fofcp._.js", "server/edge/chunks/ssr/node_modules__pnpm_0ptn6rl._.js", "server/edge/chunks/ssr/_0-dqmpz._.js", "server/edge/chunks/ssr/0p5a_next_dist_0n9eixf._.js", "server/edge/chunks/ssr/_0r-2fl0._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_0-jxpy_._.js", "server/edge/chunks/ssr/node_modules__pnpm_0b5_1z1._.js", "server/edge/chunks/ssr/node_modules__pnpm_0lbmh7e._.js", "server/edge/chunks/ssr/node_modules__pnpm_13~6rc~._.js", "server/edge/chunks/ssr/0fge_@clerk_nextjs_dist_esm_client-boundary_uiComponents_0oe0ut8.js", "server/edge/chunks/ssr/_0m9.p1u._.js", "server/edge/chunks/ssr/0p5a_next_dist_0fjw4um._.js", "server/edge/chunks/ssr/0p5a_next_dist_028il8e._.js", "server/edge/chunks/ssr/node_modules__pnpm_0_7-~bv._.js", "server/edge/chunks/ssr/[root-of-the-server]__0kc1uz.._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_build_templates_edge-ssr-app_0jmreut.js", "server/edge/chunks/ssr/[root-of-the-server]__01vmns.._.js", "server/edge/chunks/ssr/0p5a_next_dist_0_0p-jx._.js", "server/edge/chunks/ssr/0p5a_next_dist_07uzk07._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0x~b_gg._.js", "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0e2v2~g.js", "server/app/library/design/cad/page/react-loadable-manifest.js"], "name": "app/library/design/cad/page", "page": "/library/design/cad/page", "entrypoint": "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0e2v2~g.js", "matchers": [{ "regexp": "^/library/design/cad(?:/)?$", "originalSource": "/library/design/cad" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "a5mOSdTwSm-VqyWBK3ZL9", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "XNc47T3B00KPV2qP5pPyPJvHLLoAVxi27ptGGlFe0MY=", "__NEXT_PREVIEW_MODE_ID": "9fd117d17061304aa72e3839ba76f7a2", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "c2b9c031c54a86b1992ddac567583272601c82e9add45b8fe3680f54a4fd1d18", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "01d44c73bf7f84e9e2a2d97a268b04048497a4edaad7acaff101d3ffd1876119" } }, "/library/design/models/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules__pnpm_0s.ftz1._.js", "server/edge/chunks/ssr/0p5a_next_dist_00_20kl._.js", "server/edge/chunks/ssr/_0iof~vt._.js", "server/edge/chunks/ssr/_0ebkfkp._.js", "server/edge/chunks/ssr/0p5a_next_dist_11kf4_a._.js", "server/edge/chunks/ssr/_12hdtyo._.js", "server/edge/chunks/ssr/node_modules__pnpm_0g8apwc._.js", "server/edge/chunks/ssr/node_modules__pnpm_04ras.w._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0lq2oxs._.js", "server/edge/chunks/ssr/node_modules__pnpm_0--1w4.._.js", "server/edge/chunks/ssr/node_modules__pnpm_0m21_8o._.js", "server/edge/chunks/ssr/node_modules__pnpm_092j8d.._.js", "server/edge/chunks/ssr/12k._sonner_dist_index_mjs_01od1p0._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0s9kahm._.js", "server/edge/chunks/ssr/node_modules__pnpm_12et3~r._.js", "server/edge/chunks/ssr/0p5a_next_dist_03whesw._.js", "server/edge/chunks/ssr/apps_aagora-core_app_library_design_layout_tsx_0m57f_0._.js", "server/edge/chunks/ssr/_0i17x.l._.js", "server/edge/chunks/ssr/_0-xka88._.js", "server/edge/chunks/ssr/_0xx~rsu._.js", "server/edge/chunks/ssr/_0yfkk42._.js", "server/edge/chunks/ssr/_0tj3w6_._.js", "server/edge/chunks/ssr/packages_ui_src_components_scroll-area_tsx_0m5lo3h._.js", "server/edge/chunks/ssr/apps_aagora-core_components_navbar_tsx_01etfnf._.js", "server/edge/chunks/ssr/_0oljlix._.js", "server/edge/chunks/ssr/_0kyp037._.js", "server/edge/chunks/ssr/_07bj1vy._.js", "server/edge/chunks/ssr/node_modules__pnpm_0epsu1x._.js", "server/app/library/design/models/page_client-reference-manifest.js", "server/edge/chunks/ssr/_0x-_je.._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0llm1ej._.js", "server/edge/chunks/ssr/0p5a_next_dist_0d0e6_e._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_api_headers_0sutlxs.js", "server/edge/chunks/ssr/0p5a_next_dist_compiled_0~mbq1-._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_lib_patch-fetch_108gr2y.js", "server/edge/chunks/ssr/[root-of-the-server]__04fofcp._.js", "server/edge/chunks/ssr/node_modules__pnpm_0ptn6rl._.js", "server/edge/chunks/ssr/_0-dqmpz._.js", "server/edge/chunks/ssr/0p5a_next_dist_0n9eixf._.js", "server/edge/chunks/ssr/_0r-2fl0._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_0-jxpy_._.js", "server/edge/chunks/ssr/node_modules__pnpm_0b5_1z1._.js", "server/edge/chunks/ssr/node_modules__pnpm_0lbmh7e._.js", "server/edge/chunks/ssr/node_modules__pnpm_13~6rc~._.js", "server/edge/chunks/ssr/0fge_@clerk_nextjs_dist_esm_client-boundary_uiComponents_0oe0ut8.js", "server/edge/chunks/ssr/_069z8yw._.js", "server/edge/chunks/ssr/0p5a_next_dist_0fjw4um._.js", "server/edge/chunks/ssr/0p5a_next_dist_028il8e._.js", "server/edge/chunks/ssr/node_modules__pnpm_0_7-~bv._.js", "server/edge/chunks/ssr/[root-of-the-server]__0kc1uz.._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_build_templates_edge-ssr-app_0kwaohj.js", "server/edge/chunks/ssr/[root-of-the-server]__01vmns.._.js", "server/edge/chunks/ssr/0p5a_next_dist_0_0p-jx._.js", "server/edge/chunks/ssr/0p5a_next_dist_07uzk07._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0x~b_gg._.js", "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0d.kqq~.js", "server/app/library/design/models/page/react-loadable-manifest.js"], "name": "app/library/design/models/page", "page": "/library/design/models/page", "entrypoint": "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0d.kqq~.js", "matchers": [{ "regexp": "^/library/design/models(?:/)?$", "originalSource": "/library/design/models" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "a5mOSdTwSm-VqyWBK3ZL9", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "XNc47T3B00KPV2qP5pPyPJvHLLoAVxi27ptGGlFe0MY=", "__NEXT_PREVIEW_MODE_ID": "9fd117d17061304aa72e3839ba76f7a2", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "c2b9c031c54a86b1992ddac567583272601c82e9add45b8fe3680f54a4fd1d18", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "01d44c73bf7f84e9e2a2d97a268b04048497a4edaad7acaff101d3ffd1876119" } }, "/library/parameters/chapters/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules__pnpm_0s.ftz1._.js", "server/edge/chunks/ssr/0p5a_next_dist_00_20kl._.js", "server/edge/chunks/ssr/_0iof~vt._.js", "server/edge/chunks/ssr/_0ebkfkp._.js", "server/edge/chunks/ssr/0p5a_next_dist_11kf4_a._.js", "server/edge/chunks/ssr/_12hdtyo._.js", "server/edge/chunks/ssr/node_modules__pnpm_0g8apwc._.js", "server/edge/chunks/ssr/node_modules__pnpm_04ras.w._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0lq2oxs._.js", "server/edge/chunks/ssr/node_modules__pnpm_0--1w4.._.js", "server/edge/chunks/ssr/node_modules__pnpm_0m21_8o._.js", "server/edge/chunks/ssr/node_modules__pnpm_092j8d.._.js", "server/edge/chunks/ssr/12k._sonner_dist_index_mjs_01od1p0._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0s9kahm._.js", "server/edge/chunks/ssr/node_modules__pnpm_12et3~r._.js", "server/edge/chunks/ssr/0p5a_next_dist_03whesw._.js", "server/edge/chunks/ssr/_0i17x.l._.js", "server/edge/chunks/ssr/_0zopz7w._.js", "server/edge/chunks/ssr/_0-xka88._.js", "server/edge/chunks/ssr/_0v~u_-4._.js", "server/edge/chunks/ssr/_0kyp037._.js", "server/edge/chunks/ssr/_0oljlix._.js", "server/edge/chunks/ssr/packages_ui_src_components_scroll-area_tsx_0m5lo3h._.js", "server/edge/chunks/ssr/apps_aagora-core_components_navbar_tsx_01etfnf._.js", "server/edge/chunks/ssr/_0tj3w6_._.js", "server/edge/chunks/ssr/_06fhdks._.js", "server/edge/chunks/ssr/apps_aagora-core_app_library_parameters_chapters_page_tsx_00cx17a._.js", "server/app/library/parameters/chapters/page_client-reference-manifest.js", "server/edge/chunks/ssr/_0c1nv~1._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_api_headers_0sutlxs.js", "server/edge/chunks/ssr/0p5a_next_dist_0d0e6_e._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_0-jxpy_._.js", "server/edge/chunks/ssr/0p5a_next_dist_compiled_0~mbq1-._.js", "server/edge/chunks/ssr/[root-of-the-server]__04fofcp._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0llm1ej._.js", "server/edge/chunks/ssr/_0-dqmpz._.js", "server/edge/chunks/ssr/node_modules__pnpm_0ptn6rl._.js", "server/edge/chunks/ssr/node_modules__pnpm_0lbmh7e._.js", "server/edge/chunks/ssr/_0r-2fl0._.js", "server/edge/chunks/ssr/0p5a_next_dist_0n9eixf._.js", "server/edge/chunks/ssr/node_modules__pnpm_0b5_1z1._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_lib_patch-fetch_108gr2y.js", "server/edge/chunks/ssr/node_modules__pnpm_13~6rc~._.js", "server/edge/chunks/ssr/0fge_@clerk_nextjs_dist_esm_client-boundary_uiComponents_0oe0ut8.js", "server/edge/chunks/ssr/_0_j0e6i._.js", "server/edge/chunks/ssr/0p5a_next_dist_0fjw4um._.js", "server/edge/chunks/ssr/0p5a_next_dist_028il8e._.js", "server/edge/chunks/ssr/0p5a_next_dist_07uzk07._.js", "server/edge/chunks/ssr/0p5a_next_dist_0_0p-jx._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_build_templates_edge-ssr-app_05al3be.js", "server/edge/chunks/ssr/node_modules__pnpm_0_7-~bv._.js", "server/edge/chunks/ssr/[root-of-the-server]__01vmns.._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0x~b_gg._.js", "server/edge/chunks/ssr/[root-of-the-server]__0kc1uz.._.js", "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0nnu9tb.js", "server/app/library/parameters/chapters/page/react-loadable-manifest.js"], "name": "app/library/parameters/chapters/page", "page": "/library/parameters/chapters/page", "entrypoint": "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0nnu9tb.js", "matchers": [{ "regexp": "^/library/parameters/chapters(?:/)?$", "originalSource": "/library/parameters/chapters" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "a5mOSdTwSm-VqyWBK3ZL9", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "XNc47T3B00KPV2qP5pPyPJvHLLoAVxi27ptGGlFe0MY=", "__NEXT_PREVIEW_MODE_ID": "9fd117d17061304aa72e3839ba76f7a2", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "c2b9c031c54a86b1992ddac567583272601c82e9add45b8fe3680f54a4fd1d18", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "01d44c73bf7f84e9e2a2d97a268b04048497a4edaad7acaff101d3ffd1876119" } }, "/library/parameters/units/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules__pnpm_0s.ftz1._.js", "server/edge/chunks/ssr/0p5a_next_dist_00_20kl._.js", "server/edge/chunks/ssr/_0iof~vt._.js", "server/edge/chunks/ssr/_0ebkfkp._.js", "server/edge/chunks/ssr/0p5a_next_dist_11kf4_a._.js", "server/edge/chunks/ssr/_12hdtyo._.js", "server/edge/chunks/ssr/node_modules__pnpm_0g8apwc._.js", "server/edge/chunks/ssr/node_modules__pnpm_04ras.w._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0lq2oxs._.js", "server/edge/chunks/ssr/node_modules__pnpm_0--1w4.._.js", "server/edge/chunks/ssr/node_modules__pnpm_0m21_8o._.js", "server/edge/chunks/ssr/node_modules__pnpm_092j8d.._.js", "server/edge/chunks/ssr/12k._sonner_dist_index_mjs_01od1p0._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0s9kahm._.js", "server/edge/chunks/ssr/node_modules__pnpm_12et3~r._.js", "server/edge/chunks/ssr/0p5a_next_dist_03whesw._.js", "server/edge/chunks/ssr/_0i17x.l._.js", "server/edge/chunks/ssr/_0zopz7w._.js", "server/edge/chunks/ssr/_0-xka88._.js", "server/edge/chunks/ssr/_0v~u_-4._.js", "server/edge/chunks/ssr/_0kyp037._.js", "server/edge/chunks/ssr/_0oljlix._.js", "server/edge/chunks/ssr/packages_ui_src_components_scroll-area_tsx_0m5lo3h._.js", "server/edge/chunks/ssr/apps_aagora-core_components_navbar_tsx_01etfnf._.js", "server/edge/chunks/ssr/_0tj3w6_._.js", "server/edge/chunks/ssr/_0p669cm._.js", "server/edge/chunks/ssr/apps_aagora-core_app_library_parameters_units_page_tsx_0~tf~x_._.js", "server/app/library/parameters/units/page_client-reference-manifest.js", "server/edge/chunks/ssr/_02pc5yj._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_api_headers_0sutlxs.js", "server/edge/chunks/ssr/0p5a_next_dist_0d0e6_e._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_0-jxpy_._.js", "server/edge/chunks/ssr/0p5a_next_dist_compiled_0~mbq1-._.js", "server/edge/chunks/ssr/[root-of-the-server]__04fofcp._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0llm1ej._.js", "server/edge/chunks/ssr/_0-dqmpz._.js", "server/edge/chunks/ssr/node_modules__pnpm_0ptn6rl._.js", "server/edge/chunks/ssr/node_modules__pnpm_0lbmh7e._.js", "server/edge/chunks/ssr/_0r-2fl0._.js", "server/edge/chunks/ssr/0p5a_next_dist_0n9eixf._.js", "server/edge/chunks/ssr/node_modules__pnpm_0b5_1z1._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_lib_patch-fetch_108gr2y.js", "server/edge/chunks/ssr/node_modules__pnpm_13~6rc~._.js", "server/edge/chunks/ssr/0fge_@clerk_nextjs_dist_esm_client-boundary_uiComponents_0oe0ut8.js", "server/edge/chunks/ssr/_0rys2p8._.js", "server/edge/chunks/ssr/0p5a_next_dist_0fjw4um._.js", "server/edge/chunks/ssr/0p5a_next_dist_028il8e._.js", "server/edge/chunks/ssr/0p5a_next_dist_07uzk07._.js", "server/edge/chunks/ssr/0p5a_next_dist_0_0p-jx._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_build_templates_edge-ssr-app_0y26p-f.js", "server/edge/chunks/ssr/node_modules__pnpm_0_7-~bv._.js", "server/edge/chunks/ssr/[root-of-the-server]__01vmns.._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0x~b_gg._.js", "server/edge/chunks/ssr/[root-of-the-server]__0kc1uz.._.js", "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_00~.svm.js", "server/app/library/parameters/units/page/react-loadable-manifest.js"], "name": "app/library/parameters/units/page", "page": "/library/parameters/units/page", "entrypoint": "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_00~.svm.js", "matchers": [{ "regexp": "^/library/parameters/units(?:/)?$", "originalSource": "/library/parameters/units" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "a5mOSdTwSm-VqyWBK3ZL9", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "XNc47T3B00KPV2qP5pPyPJvHLLoAVxi27ptGGlFe0MY=", "__NEXT_PREVIEW_MODE_ID": "9fd117d17061304aa72e3839ba76f7a2", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "c2b9c031c54a86b1992ddac567583272601c82e9add45b8fe3680f54a4fd1d18", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "01d44c73bf7f84e9e2a2d97a268b04048497a4edaad7acaff101d3ffd1876119" } }, "/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules__pnpm_0s.ftz1._.js", "server/edge/chunks/ssr/0p5a_next_dist_00_20kl._.js", "server/edge/chunks/ssr/_0iof~vt._.js", "server/edge/chunks/ssr/_0ebkfkp._.js", "server/edge/chunks/ssr/0p5a_next_dist_11kf4_a._.js", "server/edge/chunks/ssr/_12hdtyo._.js", "server/edge/chunks/ssr/node_modules__pnpm_0g8apwc._.js", "server/edge/chunks/ssr/node_modules__pnpm_04ras.w._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0lq2oxs._.js", "server/edge/chunks/ssr/node_modules__pnpm_0--1w4.._.js", "server/edge/chunks/ssr/node_modules__pnpm_0m21_8o._.js", "server/edge/chunks/ssr/node_modules__pnpm_092j8d.._.js", "server/edge/chunks/ssr/12k._sonner_dist_index_mjs_01od1p0._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0s9kahm._.js", "server/edge/chunks/ssr/node_modules__pnpm_12et3~r._.js", "server/edge/chunks/ssr/0p5a_next_dist_03whesw._.js", "server/edge/chunks/ssr/_078a3kl._.js", "server/edge/chunks/ssr/_0s158vu._.js", "server/app/page_client-reference-manifest.js", "server/edge/chunks/ssr/_067o8-a._.js", "server/edge/chunks/ssr/0p5a_next_dist_0tls1ij._.js", "server/edge/chunks/ssr/0p5a_next_dist_0t_~92m._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_0yo8pv5._.js", "server/edge/chunks/ssr/node_modules__pnpm_0wfs~16._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_api_headers_0sutlxs.js", "server/edge/chunks/ssr/node_modules__pnpm_0pdptw9._.js", "server/edge/chunks/ssr/0p5a_next_dist_compiled_0~mbq1-._.js", "server/edge/chunks/ssr/node_modules__pnpm_13~6rc~._.js", "server/edge/chunks/ssr/0fge_@clerk_nextjs_dist_esm_client-boundary_uiComponents_0oe0ut8.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0f~.u3w._.js", "server/edge/chunks/ssr/[root-of-the-server]__0pd-njj._.js", "server/edge/chunks/ssr/0p5a_next_dist_028il8e._.js", "server/edge/chunks/ssr/0p5a_next_dist_0fjw4um._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_lib_patch-fetch_108gr2y.js", "server/edge/chunks/ssr/node_modules__pnpm_0_7-~bv._.js", "server/edge/chunks/ssr/0p5a_next_dist_0_0p-jx._.js", "server/edge/chunks/ssr/0p5a_next_dist_08ef9uu._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0x~b_gg._.js", "server/edge/chunks/ssr/[root-of-the-server]__0kc1uz.._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_build_templates_edge-ssr-app_0~71zt_.js", "server/edge/chunks/ssr/[root-of-the-server]__01vmns.._.js", "server/edge/chunks/ssr/0p5a_next_dist_07uzk07._.js", "server/edge/chunks/ssr/node_modules__pnpm_0avbdev._.js", "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0hoz658.js", "server/app/page/react-loadable-manifest.js"], "name": "app/page", "page": "/page", "entrypoint": "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0hoz658.js", "matchers": [{ "regexp": "^/(?:/)?$", "originalSource": "/" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "a5mOSdTwSm-VqyWBK3ZL9", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "XNc47T3B00KPV2qP5pPyPJvHLLoAVxi27ptGGlFe0MY=", "__NEXT_PREVIEW_MODE_ID": "9fd117d17061304aa72e3839ba76f7a2", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "c2b9c031c54a86b1992ddac567583272601c82e9add45b8fe3680f54a4fd1d18", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "01d44c73bf7f84e9e2a2d97a268b04048497a4edaad7acaff101d3ffd1876119" } }, "/projects/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules__pnpm_0s.ftz1._.js", "server/edge/chunks/ssr/0p5a_next_dist_00_20kl._.js", "server/edge/chunks/ssr/_0iof~vt._.js", "server/edge/chunks/ssr/_0ebkfkp._.js", "server/edge/chunks/ssr/0p5a_next_dist_11kf4_a._.js", "server/edge/chunks/ssr/_12hdtyo._.js", "server/edge/chunks/ssr/node_modules__pnpm_0g8apwc._.js", "server/edge/chunks/ssr/node_modules__pnpm_04ras.w._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0lq2oxs._.js", "server/edge/chunks/ssr/node_modules__pnpm_0--1w4.._.js", "server/edge/chunks/ssr/node_modules__pnpm_0m21_8o._.js", "server/edge/chunks/ssr/node_modules__pnpm_092j8d.._.js", "server/edge/chunks/ssr/12k._sonner_dist_index_mjs_01od1p0._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0s9kahm._.js", "server/edge/chunks/ssr/node_modules__pnpm_12et3~r._.js", "server/edge/chunks/ssr/0p5a_next_dist_03whesw._.js", "server/edge/chunks/ssr/_0i17x.l._.js", "server/edge/chunks/ssr/_0zopz7w._.js", "server/edge/chunks/ssr/_0-xka88._.js", "server/edge/chunks/ssr/_0v~u_-4._.js", "server/edge/chunks/ssr/_0kyp037._.js", "server/edge/chunks/ssr/_0oljlix._.js", "server/edge/chunks/ssr/packages_ui_src_components_scroll-area_tsx_0m5lo3h._.js", "server/edge/chunks/ssr/apps_aagora-core_components_navbar_tsx_01etfnf._.js", "server/edge/chunks/ssr/_0tj3w6_._.js", "server/edge/chunks/ssr/_0nqpda2._.js", "server/edge/chunks/ssr/apps_aagora-core_app_projects_page_tsx_07mm1f1._.js", "server/app/projects/page_client-reference-manifest.js", "server/edge/chunks/ssr/_0jmizrd._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0llm1ej._.js", "server/edge/chunks/ssr/0p5a_next_dist_0d0e6_e._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_api_headers_0sutlxs.js", "server/edge/chunks/ssr/node_modules__pnpm_0ptn6rl._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_lib_patch-fetch_108gr2y.js", "server/edge/chunks/ssr/[root-of-the-server]__04fofcp._.js", "server/edge/chunks/ssr/_0r-2fl0._.js", "server/edge/chunks/ssr/0p5a_next_dist_0n9eixf._.js", "server/edge/chunks/ssr/node_modules__pnpm_0lbmh7e._.js", "server/edge/chunks/ssr/_0-dqmpz._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_0-jxpy_._.js", "server/edge/chunks/ssr/node_modules__pnpm_0b5_1z1._.js", "server/edge/chunks/ssr/0p5a_next_dist_compiled_0~mbq1-._.js", "server/edge/chunks/ssr/node_modules__pnpm_13~6rc~._.js", "server/edge/chunks/ssr/0fge_@clerk_nextjs_dist_esm_client-boundary_uiComponents_0oe0ut8.js", "server/edge/chunks/ssr/_10ct4d5._.js", "server/edge/chunks/ssr/0p5a_next_dist_0fjw4um._.js", "server/edge/chunks/ssr/0p5a_next_dist_028il8e._.js", "server/edge/chunks/ssr/0p5a_next_dist_07uzk07._.js", "server/edge/chunks/ssr/[root-of-the-server]__01vmns.._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_build_templates_edge-ssr-app_0lwn22s.js", "server/edge/chunks/ssr/node_modules__pnpm_0_7-~bv._.js", "server/edge/chunks/ssr/[root-of-the-server]__0kc1uz.._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0x~b_gg._.js", "server/edge/chunks/ssr/0p5a_next_dist_0_0p-jx._.js", "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0h8lfz-.js", "server/app/projects/page/react-loadable-manifest.js"], "name": "app/projects/page", "page": "/projects/page", "entrypoint": "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0h8lfz-.js", "matchers": [{ "regexp": "^/projects(?:/)?$", "originalSource": "/projects" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "a5mOSdTwSm-VqyWBK3ZL9", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "XNc47T3B00KPV2qP5pPyPJvHLLoAVxi27ptGGlFe0MY=", "__NEXT_PREVIEW_MODE_ID": "9fd117d17061304aa72e3839ba76f7a2", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "c2b9c031c54a86b1992ddac567583272601c82e9add45b8fe3680f54a4fd1d18", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "01d44c73bf7f84e9e2a2d97a268b04048497a4edaad7acaff101d3ffd1876119" } }, "/workspaces/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules__pnpm_0s.ftz1._.js", "server/edge/chunks/ssr/0p5a_next_dist_00_20kl._.js", "server/edge/chunks/ssr/_0iof~vt._.js", "server/edge/chunks/ssr/_0ebkfkp._.js", "server/edge/chunks/ssr/0p5a_next_dist_11kf4_a._.js", "server/edge/chunks/ssr/_12hdtyo._.js", "server/edge/chunks/ssr/node_modules__pnpm_0g8apwc._.js", "server/edge/chunks/ssr/node_modules__pnpm_04ras.w._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0lq2oxs._.js", "server/edge/chunks/ssr/node_modules__pnpm_0--1w4.._.js", "server/edge/chunks/ssr/node_modules__pnpm_0m21_8o._.js", "server/edge/chunks/ssr/node_modules__pnpm_092j8d.._.js", "server/edge/chunks/ssr/12k._sonner_dist_index_mjs_01od1p0._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0s9kahm._.js", "server/edge/chunks/ssr/node_modules__pnpm_12et3~r._.js", "server/edge/chunks/ssr/0p5a_next_dist_03whesw._.js", "server/edge/chunks/ssr/apps_aagora-core_app_workspaces_layout_tsx_0koel4r._.js", "server/edge/chunks/ssr/_0i17x.l._.js", "server/edge/chunks/ssr/_0-xka88._.js", "server/edge/chunks/ssr/_0xx~rsu._.js", "server/edge/chunks/ssr/_0yfkk42._.js", "server/edge/chunks/ssr/_0tj3w6_._.js", "server/edge/chunks/ssr/packages_ui_src_components_scroll-area_tsx_0m5lo3h._.js", "server/edge/chunks/ssr/apps_aagora-core_components_navbar_tsx_01etfnf._.js", "server/edge/chunks/ssr/_0oljlix._.js", "server/edge/chunks/ssr/_0kyp037._.js", "server/edge/chunks/ssr/_0.w3g6p._.js", "server/edge/chunks/ssr/_0in~osi._.js", "server/app/workspaces/page_client-reference-manifest.js", "server/edge/chunks/ssr/_0_es77a._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_api_headers_0sutlxs.js", "server/edge/chunks/ssr/0p5a_next_dist_0d0e6_e._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_0-jxpy_._.js", "server/edge/chunks/ssr/0p5a_next_dist_compiled_0~mbq1-._.js", "server/edge/chunks/ssr/[root-of-the-server]__04fofcp._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0llm1ej._.js", "server/edge/chunks/ssr/_0-dqmpz._.js", "server/edge/chunks/ssr/node_modules__pnpm_0ptn6rl._.js", "server/edge/chunks/ssr/node_modules__pnpm_0lbmh7e._.js", "server/edge/chunks/ssr/_0r-2fl0._.js", "server/edge/chunks/ssr/0p5a_next_dist_0n9eixf._.js", "server/edge/chunks/ssr/node_modules__pnpm_0b5_1z1._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_server_lib_patch-fetch_108gr2y.js", "server/edge/chunks/ssr/node_modules__pnpm_13~6rc~._.js", "server/edge/chunks/ssr/0fge_@clerk_nextjs_dist_esm_client-boundary_uiComponents_0oe0ut8.js", "server/edge/chunks/ssr/0p5a_next_dist_028il8e._.js", "server/edge/chunks/ssr/0p5a_next_dist_07uzk07._.js", "server/edge/chunks/ssr/0p5a_next_dist_0fjw4um._.js", "server/edge/chunks/ssr/_03w3w16._.js", "server/edge/chunks/ssr/node_modules__pnpm_0_7-~bv._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_build_templates_edge-ssr-app_0_dm1mm.js", "server/edge/chunks/ssr/[root-of-the-server]__01vmns.._.js", "server/edge/chunks/ssr/[root-of-the-server]__0kc1uz.._.js", "server/edge/chunks/ssr/0p5a_next_dist_esm_0x~b_gg._.js", "server/edge/chunks/ssr/0p5a_next_dist_0_0p-jx._.js", "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0gh~0_~.js", "server/app/workspaces/page/react-loadable-manifest.js"], "name": "app/workspaces/page", "page": "/workspaces/page", "entrypoint": "server/edge/chunks/ssr/0h1h_next_dist_esm_build_templates_edge-wrapper_0gh~0_~.js", "matchers": [{ "regexp": "^/workspaces(?:/)?$", "originalSource": "/workspaces" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "a5mOSdTwSm-VqyWBK3ZL9", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "XNc47T3B00KPV2qP5pPyPJvHLLoAVxi27ptGGlFe0MY=", "__NEXT_PREVIEW_MODE_ID": "9fd117d17061304aa72e3839ba76f7a2", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "c2b9c031c54a86b1992ddac567583272601c82e9add45b8fe3680f54a4fd1d18", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "01d44c73bf7f84e9e2a2d97a268b04048497a4edaad7acaff101d3ffd1876119" } } } };
var AppPathRoutesManifest = { "/(auth)/forgot-password/page": "/forgot-password", "/(auth)/sign-in/[[...sign-in]]/page": "/sign-in/[[...sign-in]]", "/(auth)/sign-up/[[...sign-up]]/page": "/sign-up/[[...sign-up]]", "/_global-error/page": "/_global-error", "/_not-found/page": "/_not-found", "/admin/page": "/admin", "/api/r2/delete/route": "/api/r2/delete", "/api/r2/list/route": "/api/r2/list", "/api/r2/upload/route": "/api/r2/upload", "/auth/callback/page": "/auth/callback", "/dashboard/page": "/dashboard", "/favicon.ico/route": "/favicon.ico", "/library/construction/assets/page": "/library/construction/assets", "/library/construction/items/page": "/library/construction/items", "/library/construction/supplies/page": "/library/construction/supplies", "/library/contacts/page": "/library/contacts", "/library/design/cad/page": "/library/design/cad", "/library/design/models/page": "/library/design/models", "/library/parameters/chapters/page": "/library/parameters/chapters", "/library/parameters/units/page": "/library/parameters/units", "/page": "/", "/projects/page": "/projects", "/workspaces/page": "/workspaces" };
var FunctionsConfigManifest = { "version": 1, "functions": { "/": {}, "/admin": {}, "/api/r2/delete": {}, "/api/r2/list": {}, "/api/r2/upload": {}, "/auth/callback": {}, "/dashboard": {}, "/forgot-password": {}, "/library/construction/assets": {}, "/library/construction/items": {}, "/library/construction/supplies": {}, "/library/contacts": {}, "/library/design/cad": {}, "/library/design/models": {}, "/library/parameters/chapters": {}, "/library/parameters/units": {}, "/projects": {}, "/sign-in/[[...sign-in]]": {}, "/sign-up/[[...sign-up]]": {}, "/workspaces": {} } };
var PagesManifest = { "/500": "pages/500.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.OPEN_NEXT_BUILD_ID = NextConfig.deploymentId ?? BuildId;
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream3 } from "node:stream/web";

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    const nextUrl = constructNextUrl(internalEvent.url, `/${detectedLocale}${NextConfig.trailingSlash ? "/" : ""}`);
    const queryString = convertToQueryString(internalEvent.query);
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: `${nextUrl}${queryString}`
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream3({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function normalizeLocationHeader(location2, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location2)) {
    return location2;
  }
  const locationURL = new URL(location2);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/utils/semver.js
function compareSemver(v1, operator, v2) {
  let versionDiff = 0;
  if (v1 === "latest") {
    versionDiff = 1;
  } else {
    if (/^[^\d]/.test(v1)) {
      v1 = v1.substring(1);
    }
    if (/^[^\d]/.test(v2)) {
      v2 = v2.substring(1);
    }
    const [major1, minor1 = 0, patch1 = 0] = v1.split(".").map(Number);
    const [major2, minor2 = 0, patch2 = 0] = v2.split(".").map(Number);
    if (Number.isNaN(major1) || Number.isNaN(major2)) {
      throw new Error("The major version is required.");
    }
    if (major1 !== major2) {
      versionDiff = major1 - major2;
    } else if (minor1 !== minor2) {
      versionDiff = minor1 - minor2;
    } else if (patch1 !== patch2) {
      versionDiff = patch1 - patch2;
    }
  }
  switch (operator) {
    case "=":
      return versionDiff === 0;
    case ">=":
      return versionDiff >= 0;
    case "<=":
      return versionDiff <= 0;
    case ">":
      return versionDiff > 0;
    case "<":
      return versionDiff < 0;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/utils/cache.js
async function isStale(key, tags, lastModified) {
  if (!compareSemver(globalThis.nextVersion, ">=", "16.0.0")) {
    return false;
  }
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.isStale?.(tags, lastModified) ?? false;
  }
  return await globalThis.tagCache.isStale?.(key, lastModified) ?? false;
}
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
    delete value.meta?.headers?.["x-next-cache-tags"];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
var NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
var NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
var NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
async function computeCacheControl(path3, body, host, revalidate, lastModified, isStaleFromTagCache = false) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest?.routes ?? {}).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  const isSSG = finalRevalidate === CACHE_ONE_YEAR;
  const remainingTtl = Math.max(finalRevalidate - age, 1);
  const isStaleFromTime = !isSSG && remainingTtl === 1;
  const isStale2 = isStaleFromTime || isStaleFromTagCache;
  if (!isSSG || isStaleFromTagCache) {
    const sMaxAge = isStaleFromTagCache ? 1 : remainingTtl;
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate,
      isStaleFromTagCache
    });
    if (isStale2) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale2 ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  try {
    const segmentHeader = `${event.headers[NEXT_SEGMENT_PREFETCH_HEADER]}`;
    const isSegmentResponse = Boolean(segmentHeader) && segmentHeader in (cachedValue.segmentData || {}) && !NextConfig.experimental?.prefetchInlining;
    const body = isSegmentResponse ? cachedValue.segmentData[segmentHeader] : cachedValue.rsc;
    return {
      body,
      additionalHeaders: isSegmentResponse ? { [NEXT_PRERENDER_HEADER]: "1", [NEXT_POSTPONED_HEADER]: "2" } : {}
    };
  } catch (e) {
    error("Error while getting body for app router from cache:", e);
    return { body: cachedValue.rsc, additionalHeaders: {} };
  }
}
async function generateResult(event, localizedPath, cachedValue, lastModified, isStaleFromTagCache = false) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = Boolean(event.headers.rsc);
    if (isDataRequest) {
      const { body: appRouterBody, additionalHeaders: appHeaders } = getBodyForAppRouter(event, cachedValue);
      body = appRouterBody;
      additionalHeaders = appHeaders;
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified, isStaleFromTagCache);
  return {
    type: "core",
    // Sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    // Also set the status code to the rewriteStatusCode if defined
    // This can happen in handleMiddleware in routingHandler.
    // `NextResponse.rewrite(url, { status: xxx})
    // The rewrite status code should take precedence over the cached one
    statusCode: event.rewriteStatusCode ?? cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER,
      ...additionalHeaders
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath ?? "/") || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      const tags = getTagsFromValue(cachedData.value);
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const _isStale = cachedData.shouldBypassTagCache ? false : await isStale(localizedPath, tags, cachedData.lastModified ?? Date.now());
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified, _isStale);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          return {
            type: "core",
            statusCode: event.rewriteStatusCode ?? cachedData.value.meta?.status ?? 200,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers: {
              ...cacheControl,
              ...cachedData.value.meta?.headers,
              vary: VARY_HEADER
            },
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// ../../node_modules/.pnpm/path-to-regexp@6.3.0/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !event.headers["x-nextjs-data"] && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      if (key.startsWith(INTERNAL_HEADER_PREFIX) || key.startsWith(MIDDLEWARE_HEADER_PREFIX)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    if (middlewareHeadersPrioritized) {
      headers = {
        ...headers,
        ...middlewareEventOrResult.responseHeaders
      };
    } else {
      headers = {
        ...middlewareEventOrResult.responseHeaders,
        ...headers
      };
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.4_next_c046631739c1c8f0cac04430c0c5d687/node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
