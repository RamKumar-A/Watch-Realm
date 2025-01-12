import { PAGE_LIMIT } from '../helpers/constants';
import { url } from './api';

export async function getWatch(filters, page = 1) {
  try {
    const searchParams = new URLSearchParams();

    // Add filters to the query string
    if (filters.category) {
      filters.category.forEach((cat) => searchParams.append('category', cat));
    }
    if (filters.brand) {
      filters.brand.forEach((brand) => searchParams.append('brand', brand));
    }
    if (filters.material) {
      filters.material.forEach((mat) => searchParams.append('material', mat));
    }
    if (filters.sort) {
      searchParams.set('sort', filters.sort);
    }
    if (filters.search) {
      searchParams.set('search', filters.search);
    }
    searchParams.set('page', page);
    searchParams.set('limit', PAGE_LIMIT);
    const res = await url.get(`/watches?${searchParams.toString()}`);
    return res.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || 'error in fetching watches'
    );
  }
}

export async function getSingleWatch(id) {
  const res = await url.get(`/watches/${id}`);
  return res.data;
}

export async function getFilters() {
  try {
    const category = await url.get('/watches/category');
    const brands = await url.get('/brands');
    const material = await url.get('/watches/material');
    const categoryData = category.data;
    const brandData = brands.data;
    const materialData = material.data;
    const data = { categoryData, brandData, materialData };
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'error fetching filters');
  }
}
