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

function FilterMaterial() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { materialData } = useWatchFilter();
  const { selectedMaterial, setSelectedMaterial } = useFilter();

  function handleSelectedMaterial(material, checked) {
    const updatedMaterial = checked
      ? [...selectedMaterial, material]
      : selectedMaterial.filter((item) => item !== material);
    setSelectedMaterial(updatedMaterial);
    const materialParams = updatedMaterial.join(',');
    if (materialParams) {
      searchParams.set('material', materialParams);
    } else {
      searchParams.delete('material');
    }
    setSearchParams(searchParams);
  }

  return (
    <div>
      <FilterWrapper onClick={() => setIsOpen(!isOpen)}>
        <FilterTitle isOpen={isOpen}>Material</FilterTitle>
        <Collapse open={isOpen}>
          <div className="max-h-28 overflow-y-auto space-y-1.5 py-3 ">
            {materialData?.data?.map((material, i) => (
              <motion.div
                key={material._id}
                className="origin-left"
                initial="initial"
                animate="animate"
                variants={filterChildVariants}
                custom={i}
              >
                <Checkbox
                  label={material.material}
                  checked={selectedMaterial.includes(material.material)}
                  onChange={(e) =>
                    handleSelectedMaterial(material.material, e.target.checked)
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

export default FilterMaterial;
