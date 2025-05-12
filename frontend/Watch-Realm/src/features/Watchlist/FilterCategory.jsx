import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useWatchFilter } from './useWatchFilters';
import { useFilter } from '../../Context/FilterContext';

import FilterWrapper from './FilterWrapper';
import FilterTitle from './filters/FilterTitle';

import { filterChildVariants } from '../../helpers/variants';
import Collapse from '../../ui/Collapse';
import Checkbox from '../../ui/Checkbox';

function FilterCategory() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { categoryData } = useWatchFilter();
  const { selectedCategory, setSelectedCategory } = useFilter();

  function handleSelectedCategory(category, checked) {
    const updatedCategory = checked
      ? [...selectedCategory, category]
      : selectedCategory.filter((item) => item !== category);

    setSelectedCategory(updatedCategory);

    const categoryParams = updatedCategory.join(',');
    if (categoryParams) {
      searchParams.set('category', categoryParams);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  }

  return (
    <div className="">
      <FilterWrapper onClick={() => setIsOpen(!isOpen)}>
        <FilterTitle isOpen={isOpen}>Category</FilterTitle>

        <Collapse open={isOpen}>
          <div className="max-h-28 overflow-y-auto space-y-1.5 py-3">
            {categoryData?.data?.map((category, i) => (
              <motion.div
                key={category._id}
                className="origin-left"
                initial="initial"
                animate="animate"
                custom={i}
                variants={filterChildVariants}
              >
                <Checkbox
                  label={category.category}
                  checked={selectedCategory.includes(category.category)}
                  onChange={(e) =>
                    handleSelectedCategory(category.category, e.target.checked)
                  }
                />
              </motion.div>
            ))}
          </div>
        </Collapse>
      </FilterWrapper>
    </div>
  );
}

export default FilterCategory;
