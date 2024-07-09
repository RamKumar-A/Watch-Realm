import { Outlet, useNavigation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Loader from './Loader';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

function AppLayout() {
  // const location = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const [isToggle, setIsToggle] = useState(false);
  function handleMenuToggle() {
    setIsToggle((toggle) => !toggle);
  }

  useEffect(function () {}, []);
  return (
    <>
      {isLoading && <Loader />}
      <div
        className="w-full h-[100dvh] grid content-between 
        grid-rows-[auto_1fr_auto]
       "
      >
        <Header
          isToggle={isToggle}
          setIsToggle={setIsToggle}
          handleMenuToggle={handleMenuToggle}
        />
        <hr />
        <main className="h-full">
          <AnimatePresence mode="wait" initial={false}>
            <Outlet />
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default AppLayout;
