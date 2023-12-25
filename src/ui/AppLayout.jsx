import { Outlet, useNavigation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';
import { FilterProvider } from '../features/watchList/Context';
import Loader from './Loader';

const StyledDiv = styled.div`
  width: 100%;
  @media (max-width: 321px) {
    width: 116%;
  }
`;

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <>
      {isLoading && <Loader />}
      <StyledDiv className="h-[95vh] grid grid-rows-[auto_1fr_auto]">
        <FilterProvider>
          <Header />
          <main>
            <div>
              <Outlet />
            </div>
          </main>
          <Footer />
        </FilterProvider>
      </StyledDiv>
    </>
  );
}

export default AppLayout;
