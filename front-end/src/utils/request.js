import axios from "axios";

const request = axios.create({
    baseURL: `${import.meta.env.VITE_BE_API}`,
})

export default request;