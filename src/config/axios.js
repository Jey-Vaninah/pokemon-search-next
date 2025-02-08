import Axios from "axios";

export const axioInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_POKEMON_API_URL
});

export const createPagination = ({ apiUrl, page, pageSize }) => {
  return `${apiUrl}?limit=${pageSize}&offset=${page}`
}
