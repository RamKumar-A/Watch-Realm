import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlineSearch } from 'react-icons/hi';
import { HiXMark } from 'react-icons/hi2';

import Button from './Button';

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (searchQuery) {
      searchParams.set('search', searchQuery);
      navigate('/shop');
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  }

  return (
    <>
      <HiOutlineSearch
        size={24}
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className="cursor-pointer "
      />
      <AnimatePresence mode="wait" initial={false}>
        {isSearchOpen && (
          <motion.form
            className="w-full inset-0 backdrop-blur-md absolute rounded-md h-full flex items-center justify-center gap-1 sm:gap-5 z-50  sm:bg-accent-secondary origin-right"
            initial={{ opactiy: 0, scale: 0 }}
            animate={{ opactiy: 1, scale: 1 }}
            exit={{ opactiy: 0, scale: 0 }}
            onSubmit={handleSubmit}
          >
            <input
              type="search"
              className="border rounded-lg basis-3/4 bg-secondary-light p-2 md:p-3 relative"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              rounded="full"
              size="xs"
              className="font-bold"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <HiXMark size={24} className="p-1 text-accent-secondary" />
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </>
  );
}

export default Search;
