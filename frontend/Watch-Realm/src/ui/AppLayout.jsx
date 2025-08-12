import { AnimatePresence } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function AppLayout() {
  return (
    <div
      className=" min-h-screen grid 
        grid-rows-[auto_1fr_auto] bg-primary-light"
    >
      <div className="bg-secondary-dark sticky top-0 z-[100] border-b border-black/20">
        <Header />
      </div>

      <main className="h-full md:mx-2 lg:mx-5 xl:mx-32 overflow-hidden ">
        <AnimatePresence mode="wait" initial={false}>
          <Outlet />
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default AppLayout;
