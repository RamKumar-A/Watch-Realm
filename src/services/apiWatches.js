import { PAGE_LIMIT } from '../helpers/constants';
import { api } from './api';

export async function getWatch(filters, page = 1) {
  try {
    // Add filters to the query string
    const searchParams = new URLSearchParams();
    const multiValueKeys = ['category', 'brand', 'material'];
    const singleValueKeys = ['sort', 'search'];

    for (const [key, value] of Object.entries(filters)) {
      if (multiValueKeys.includes(key) && Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, item));
      }
      if (singleValueKeys.includes(key) && value) {
        searchParams.set(key, value);
      }
    }

    searchParams.set('page', page);
    searchParams.set('limit', PAGE_LIMIT);
    const res = await api.get(`/watches?${searchParams.toString()}`);
    return res.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || 'error in fetching watches'
    );
  }
}

export async function getSingleWatch(id) {
  const res = await api.get(`/watches/${id}`);
  return res.data;
}

export async function getFilters() {
  try {
    const [category, brands, material] = await Promise.all([
      await api.get('/watches/category'),
      await api.get('/brands'),
      await api.get('/watches/material'),
    ]);

    const data = {
      categoryData: category.data,
      brandData: brands.data,
      materialData: material.data,
    };
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'error fetching filters');
  }
}
