import axios from 'axios';
import { API_KEY, API_PATH } from './config';

axios.defaults.baseURL = API_PATH;

export default async function getParams({
  inputSearch = '',
  currentPage = 1,
} = {}) {
  try {
    const params = new URLSearchParams({
      q: inputSearch,
      page: currentPage,
      per_page: 12,
    });
    const response = await axios.get(
      `?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&${params}`
    );

    return response.data;
  } catch (error) {
    if (error.request.status === 400) return;
    console.error(error);
  }
}

export function getTotalPages(totalHits, itemsPerPage) {
  return Math.ceil(totalHits / itemsPerPage);
}
