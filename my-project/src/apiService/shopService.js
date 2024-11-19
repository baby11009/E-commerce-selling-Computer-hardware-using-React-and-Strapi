import request from "../utils/request";
import { useQuery } from "@tanstack/react-query";

export const getData = (path, pathParams = {}, enabled = true) => {
  
  let paramsKey = Object.values(pathParams);

  return useQuery({
    queryKey: paramsKey,
    queryFn: async () => {
      const res = await request.get(path, {
        params: {
          ...pathParams,
        },

      });
      return res.data;
    },
    enabled
  });
};
