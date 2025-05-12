import { createContext, useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const FilterContext = createContext();

function FilterProvider({ children }) {
  const [searchParams] = useSearchParams();

  const category = searchParams.get('category')?.split(',');
  const material = searchParams.get('material')?.split(',');
  const brand = searchParams.get('brand')?.split(',');
  const sort = searchParams.get('sort') || '';

  const [selectedCategory, setSelectedCategory] = useState(category || []);
  const [selectedMaterial, setSelectedMaterial] = useState(material || []);
  const [selectedBrand, setSelectedBrand] = useState(brand || []);
  const [selectedSort, setSelectedSort] = useState(sort);

  const value = {
    selectedBrand,
    selectedCategory,
    selectedMaterial,
    setSelectedBrand,
    setSelectedCategory,
    setSelectedMaterial,
    selectedSort,
    setSelectedSort,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined)
    throw new Error('useFilter used Outside the context ');
  return context;
}

export { FilterProvider, useFilter };
