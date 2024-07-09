import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFilterOpen: false,
  allWatches: [],
  allBrands: [],
  allCategories: [],
  filteredWatches: [],
  selectedBrands: [],
  selectedMaterials: [],
  selectedSizes: [],
  selectedCategories: [],
  selectedPrice: [0, 500000],
  sortBy: 'ascending',
  searchQuery: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setIsFilterOpen(state, action) {
      state.isFilterOpen = action.payload;
    },
    addAllWatches(state, action) {
      state.allWatches = action.payload;
    },
    addAllBrands(state, action) {
      state.allBrands = action.payload;
    },
    addAllCategories(state, action) {
      state.allCategories = action.payload;
    },
    filterBrand(state, action) {
      state.selectedBrands = action.payload;
      state.filteredWatches = filterWatches(
        state.allWatches,
        action.payload,
        state.selectedCategories,
        state.selectedMaterials,
        state.selectedSizes,
        state.selectedPrice,
        state.sortBy
      );
    },
    filterMaterial(state, action) {
      state.selectedMaterials = action.payload;
      state.filteredWatches = filterWatches(
        state.allWatches,
        state.selectedBrands,
        state.selectedCategories,
        action.payload,
        state.selectedSizes,
        state.selectedPrice,
        state.sortBy
      );
    },
    filterSize(state, action) {
      state.selectedSizes = action.payload;
      state.filteredWatches = filterWatches(
        state.allWatches,
        state.selectedBrands,
        state.selectedCategories,
        state.selectedMaterials,
        action.payload,
        state.selectedPrice,
        state.sortBy
      );
    },
    filterCategory(state, action) {
      state.selectedCategories = action.payload;
      state.filteredWatches = filterWatches(
        state.allWatches,
        state.selectedBrands,
        action.payload,
        state.selectedMaterials,
        state.selectedSizes,
        state.selectedPrice,
        state.sortBy
      );
    },
    filterPrice(state, action) {
      state.selectedPrice = action.payload;
      state.filteredWatches = filterWatches(
        state.allWatches,
        state.selectedBrands,
        state.selectedCategories,
        state.selectedMaterials,
        state.selectedSizes,
        state.selectedPrice,
        state.sortBy
      );
    },
    sortBy(state, action) {
      state.sortBy = action.payload;
      state.filteredWatches = filterWatches(
        state.allWatches,
        state.selectedBrands,
        state.selectedCategories,
        state.selectedMaterials,
        state.selectedSizes,
        state.selectedPrice,
        state.sortBy
      );
    },
    searchWatch(state, action) {
      state.searchQuery = action.payload;
      state.filteredWatches = state.allWatches.filter((watch) =>
        watch.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
});

export const {
  setIsFilterOpen,
  addAllWatches,
  addAllBrands,
  addAllCategories,
  filterBrand,
  filterSize,
  filterCategory,
  filterMaterial,
  filterPrice,
  sortBy,
  searchWatch,
} = filterSlice.actions;

function filterWatches(
  watches,
  selectedBrands,
  selectedCategories,
  selectedMaterials,
  selectedSizes,
  selectedPrice = [0, 5000000],
  sortBy
) {
  let filterWatch = watches.filter((watch) => {
    const price = Number(watch.price_range.slice(1));

    return (
      (!selectedBrands.length ||
        selectedBrands.some((id) => id === watch.brand_id)) &&
      (!selectedCategories.length ||
        selectedCategories.some((id) => id === watch.category_id)) &&
      (!selectedMaterials.length ||
        selectedMaterials.some(
          (materialType) => materialType === watch.material_type
        )) &&
      (!selectedSizes.length ||
        selectedSizes.some((sizes) => sizes === watch.size)) &&
      (price >= selectedPrice[0] || price <= selectedSizes[1])
    );
  });
  if (sortBy) {
    filterWatch.sort((watchA, watchB) => {
      const nameA = watchA.name.toLowerCase();
      const nameB = watchB.name.toLowerCase();
      const priceA = Number(watchA.price_range.slice(1));
      const priceB = Number(watchB.price_range.slice(1));
      if (sortBy === 'ascending') {
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      } else if (sortBy === 'descending') {
        return nameB < nameA ? -1 : nameB > nameA ? 1 : 0;
      } else if (sortBy === 'low-high') {
        if (priceA < priceB) return priceA - priceB;
      } else if (sortBy === 'high-low') {
        if (priceA > priceB) return priceB - priceA;
      }
      return 0;
    });
  }

  return filterWatch;
}

export const getFilteredWatches = (state) => state.filter.filteredWatches;

export const getIsFilterOpen = (state) => state.filter.isFilterOpen;

export const getAllWatches = (state) => state.filter.allWatches;
export const getAllBrands = (state) => state.filter.allBrands;
export const getAllCategories = (state) => state.filter.allCategories;

export default filterSlice.reducer;
