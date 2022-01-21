const NODE_ENV = ["development", "production"] as const;

export default NODE_ENV;
export type EnvType = typeof NODE_ENV[number];
