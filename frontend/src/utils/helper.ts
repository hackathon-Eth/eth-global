const ENCODING = "binary";

export const getEnv = (): "dev" | "production" | "local" | undefined | string => {
    // return process.env.REACT_APP_XMTP_ENV;
    return "dev";
};

export const buildLocalStorageKey = (walletAddress: string) =>
  walletAddress ? `xmtp:${getEnv()}:keys:${walletAddress}` : "";

export const loadKeys = (walletAddress: string): Uint8Array | null => {
    const val = localStorage.getItem(buildLocalStorageKey(walletAddress));
    return val ? Buffer.from(val, ENCODING) : null;
};

export const storeKeys = (walletAddress: string, keys: Uint8Array) => {
    localStorage.setItem(
      buildLocalStorageKey(walletAddress),
      Buffer.from(keys).toString(ENCODING),
    );
  };
