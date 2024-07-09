import { createContext, useContext, useEffect, useReducer } from 'react';
import { useLoaderData } from 'react-router-dom';

const FilterContext = createContext();

const initialState = {
  allWatches: [],
  filteredWatches: [],
  selectedBrandId: [],
  selectedCategoryId: [],
  selectedMaterial: [],
  selectedSize: [],
};

function applyFilters(
  watches,
  selectedBrandId,
  selectedCategoryId,
  selectedMaterial,
  selectedSize
) {
  let filteredWatches = watches;

  if (selectedBrandId?.length > 0) {
    filteredWatches = filteredWatches.filter((watch) =>
      selectedBrandId?.some((id) => id === watch.brand_id)
    );
  }

  if (selectedCategoryId?.length > 0) {
    filteredWatches = filteredWatches.filter((watch) =>
      selectedCategoryId?.some((id) => id === watch.category_id)
    );
  }

  if (selectedMaterial?.length > 0) {
    filteredWatches = filteredWatches.filter((watch) =>
      selectedMaterial?.some((material) => material === watch.material_type)
    );
  }

  if (selectedSize?.length > 0) {
    filteredWatches = filteredWatches.filter((watch) =>
      selectedSize?.some((s) => s === watch.size)
    );
  }

  // console.log(selectedBrandId);
  return filteredWatches;
}

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        allWatches: action.payload,
      };

    case 'filterBrand':
      const brandId = action.payload;
      // let filteredWatchesBrand = state.allWatches.filter((watch) =>
      //   brandId.some((id) => id === watch.brand_id)
      // );
      let filteredWatchesBrand = applyFilters(
        state.allWatches,
        brandId,
        state.selectedCategoryId,
        state.material_type,
        state.selectedSize
      );
      // || filteredWatchesBrand;
      // console.log(filteredWatchesBrand);

      return {
        ...state,
        filteredWatches: filteredWatchesBrand,
        selectedBrandId: brandId,
      };

    case 'filterCategory':
      const categoryId = action.payload;
      // let filteredWatchesCategory = state.allWatches.filter((watch) =>
      //   categoryId.some((id) => id === watch.category_id)
      // );
      // console.log(state.selectedBrandId);
      let filteredWatchesCategory = applyFilters(
        state.allWatches,
        state.selectedBrandId,
        categoryId,
        state.selectedMaterial,
        state.selectedSize
      );
      return {
        ...state,
        filteredWatches: filteredWatchesCategory,
        selectedCategoryId: categoryId,
      };

    case 'filterMaterial':
      const materialName = action.payload;
      // let filteredMaterial = state.allWatches.filter((material) =>
      //   materialName.some((name) => name === material.material_type)
      // );
      // console.log(state.selectedMaterial);
      let filteredMaterial = applyFilters(
        state.allWatches,
        state.selectedBrandId,
        state.selectedCategoryId,
        materialName,
        state.selectedSize
      );
      // || filteredMaterial;
      return {
        ...state,
        selectedMaterial: materialName,
        filteredWatches: filteredMaterial,
      };

    case 'filterSize':
      const size = action.payload;
      // let filteredSize = state.allWatches.filter((sizes) =>
      //   size.some((s) => s === sizes.size)
      // );
      let filteredSize = applyFilters(
        state.allWatches,
        state.selectedBrandId,
        state.selectedCategoryId,
        state.selectedMaterial,
        size
      );
      // || filteredSize;
      // console.log(filteredSize);
      // (sizes) => sizes.size === size
      return { ...state, selectedSize: size, filteredWatches: filteredSize };

    case 'filterPrice':
      const { min, max } = action.payload;
      const filteredPrice = state.allWatches.filter((watch) => {
        const price = Number(watch.price_range.slice(1));
        return price >= min && price <= max;
      });
      return { ...state, filteredWatches: filteredPrice };

    case 'clearFilters':
      return { ...state, filteredWatches: [] };

    case 'sortByName':
      const sort = action.payload;
      const sortedWatch = state.allWatches.slice().sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (sort === 'ascending') {
          if (nameA < nameB) return -1;
        }
        if (sort === 'descending') {
          if (nameA > nameB) return 1;
        }

        return 0;
      });

      return { ...state, filteredWatches: sortedWatch };

    case 'sortByPrice':
      const price = action.payload;
      const sortedWatchPrice = state.allWatches.slice().sort((a, b) => {
        const priceA = Number(a.price_range.slice(1));
        const priceB = Number(b.price_range.slice(1));
        if (price === 'low-high') {
          if (priceA < priceB) return priceA - priceB;
        }
        if (price === 'high-low') {
          if (priceA > priceB) return priceB - priceA;
        }
        return 0;
      });
      return { ...state, filteredWatches: sortedWatchPrice };

    case 'removeSort':
      // const rmvSort = action.payload;
      const removedSort = state.allWatches;
      return { ...state, filteredWatches: removedSort };

    case 'searchWatch':
      const search = action.payload;
      // console.log(state.allWatches);
      const filteredSearch = state.allWatches.filter((watch) =>
        watch.name.toLowerCase().includes(search.toLowerCase())
      );
      return { ...state, filteredWatches: filteredSearch };

    default:
      throw new Error('unknown');
  }
}

function FilterProvider({ children }) {
  const [{ allWatches, selectedBrandId, filteredWatches }, dispatch] =
    useReducer(reducer, initialState);

  const { watch } = useLoaderData();

  useEffect(
    function () {
      dispatch({ type: 'dataReceived', payload: watch });
    },
    [watch]
  );

  return (
    <FilterContext.Provider
      value={{
        dispatch,
        allWatches,
        selectedBrandId,
        filteredWatches,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) throw new Error('used outside the context');
  return context;
}

export { useFilter, FilterProvider };
