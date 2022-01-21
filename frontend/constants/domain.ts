import { EnvType } from "./nodeEnv";

const _DOMAIN: {
  [key in EnvType]: string;
} = {
  development: "http://localhost:3000",
  production: "https://jaso-ai.com"
} as const;

const DOMAIN = _DOMAIN[process.env.NODE_ENV as EnvType];

export default DOMAIN;
