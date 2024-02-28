import { Outlet, useNavigation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { FilterProvider } from '../features/watchList/Context';
import Loader from './Loader';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <>
      {isLoading && <Loader />}
      <div className="w-full h-[95vh] grid grid-rows-[auto_1fr_auto]">
        <FilterProvider>
          <Header />
          <main>
            <div>
              <Outlet />
            </div>
          </main>
          <Footer />
        </FilterProvider>
      </div>
    </>
  );
}

export default AppLayout;
