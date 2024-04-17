export const urlEncoder = (encode: boolean, value: string | number | boolean) =>
  encode ? encodeURIComponent(value) : value;

type UrlParams = Record<string, string | readonly string[]>;

export const getUrlParams = (params?: Record<string, string | readonly string[] | undefined>): string => {
  const urlParams = Object.entries(params ?? {}).reduce<UrlParams>((p, c) => {
    const [key, value] = c;
    if (!value) return p;
    return {
      ...p,
      [key]: value,
    };
  }, {});
  return Object.entries(urlParams ?? {}).length > 0 ? `?${new URLSearchParams(urlParams).toString()}` : '';
};
