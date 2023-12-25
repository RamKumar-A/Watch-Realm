import { useState } from 'react';
import styled, { css } from 'styled-components';
import Products from './Products';
import ProductsSidebar from './ProductsSidebar';
import { getWatch } from '../../services/apiWatches';
import { useLoaderData } from 'react-router-dom';
import { getFilters } from '../../services/apiWatches';

const StyledDiv = styled.div`
  margin-top: 2rem;
  column-gap: 10px;
`;

const Main = styled.main`
  display: grid;
  ${(props) => css`
    @media (min-width: 640px) {
      grid-template-columns: 250px 1fr;
    }
  `}
`;

function Shopping() {
  const [openFilters, setOpenFilters] = useState(false);
  const { watch, brands, categories } = useLoaderData();

  return (
    <StyledDiv className="lg:m-10 ">
      <h1 className="text-5xl my-2 mb-16 pt-5 pl-5">Products</h1>
      <Main className="grid sm:grid-cols-2">
        <ProductsSidebar
          watch={watch}
          brands={brands}
          categories={categories}
          openFilters={openFilters}
        />

        <Products
          watches={watch}
          categories={categories}
          brands={brands}
          openFilters={openFilters}
          setOpenFilters={setOpenFilters}
        />
      </Main>
    </StyledDiv>
  );
}

let cachedData = null;

export async function loader() {
  if (cachedData) return cachedData;
  const watch = await getWatch();
  const brands = await getFilters('brands');
  const categories = await getFilters('categories');
  cachedData = { watch, brands, categories };
  // return { watch, brands, categories };
  return cachedData;
}

export default Shopping;
