import request from "../utils/request";
import { useQuery } from "@tanstack/react-query";

export const getProductDetail = (path,productSlug) => {
    return useQuery({
        queryKey: [productSlug],
        queryFn: async () =>{
            const res = await request.get(`${path}/${productSlug}`,{
                params:{
                    'populate' : '*',
                }
            });
            return res.data;
        }
    })
}