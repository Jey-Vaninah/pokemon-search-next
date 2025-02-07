import Axios from "axios";

export const axioInstance = Axios.create({
  baseURL: process.env.POKEMON_API_URL
});

export const createPagination = ({ apiUrl, page, pageSize }) => {
  return `${apiUrl}?limit=${pageSize}&offset=${page}`
}
