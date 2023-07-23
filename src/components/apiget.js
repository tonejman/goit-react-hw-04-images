import axios from 'axios';
import { API_KEY, API_PATH } from './config';
export const perPage = 12;

axios.defaults.baseURL = API_PATH;

export const getParams = async (query, page) => {
  const response = await axios.get(
    `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return response.data;
};

export function getTotalPages(totalHits, itemsPerPage) {
  return Math.ceil(totalHits / itemsPerPage);
}

export default getParams;
