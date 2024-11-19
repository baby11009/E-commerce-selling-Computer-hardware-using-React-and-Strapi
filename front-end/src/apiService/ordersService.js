import request from "../utils/request";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "./Login/tokenHelper";

export const getDataWithAuth= (path,pathParams = {}) => {

  let paramsKey = Object.values(pathParams);

  const token = getToken(import.meta.env.VITE_AUTH_TOKEN)

  return useQuery({
    queryKey: paramsKey,
    queryFn: async () => {
      const res = await request.get(path, {
        params: {
          ...pathParams,
        },
        headers: {
          Authorization: `${import.meta.env.VITE_BEARER} ${token}`,
        },
      });
      return res.data;
    },
  });
};
