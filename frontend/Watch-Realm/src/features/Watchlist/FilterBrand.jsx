import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useWatchFilter } from './useWatchFilters';
import { useFilter } from '../../Context/FilterContext';

import FilterWrapper from './FilterWrapper';
import FilterTitle from './filters/FilterTitle';

import { filterChildVariants } from '../../helpers/variants';

import Checkbox from '../../ui/Checkbox';
import Collapse from '../../ui/Collapse';

function FilterBrand() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { brandData } = useWatchFilter();
  const { selectedBrand, setSelectedBrand } = useFilter();

  function handleSelectedBrand(brand, checked) {
    const updatedBrand = checked
      ? [...selectedBrand, brand]
      : selectedBrand.filter((item) => item !== brand);
    setSelectedBrand(updatedBrand);
    const brandParams = updatedBrand.join(',');
    if (brandParams) {
      searchParams.set('brand', brandParams);
    } else {
      searchParams.delete('brand');
    }
    setSearchParams(searchParams);
  }

  return (
    <div>
      <FilterWrapper onClick={() => setIsOpen(!isOpen)}>
        <FilterTitle isOpen={isOpen}>Brand</FilterTitle>
        <Collapse open={isOpen}>
          <div className="max-h-28 overflow-y-auto space-y-1.5 py-3 ">
            {brandData?.data?.map((brand, i) => (
              <motion.div
                key={brand._id}
                className="origin-left"
                initial="initial"
                animate="animate"
                variants={filterChildVariants}
                custom={i}
              >
                <Checkbox
                  label={brand.brand}
                  checked={selectedBrand.includes(brand.brand)}
                  onChange={(e) =>
                    handleSelectedBrand(brand.brand, e.target.checked)
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

export default FilterBrand;
