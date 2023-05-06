import qs from "qs";

export const fetcher = {
  get: async <T = any>(url: string, params?: object, init?: RequestInit) => {
    try {
      const res = await fetch(
        params ? `${url}?${qs.stringify(params)}` : url,
        init
      );
      if (res.ok) {
        return { data: res.json() as T };
      }
      return {
        error: {
          status: res.status,
          message: res.body,
        },
      };
    } catch (error: any) {
      console.log(error);
      return { error };
    }
  },
};
