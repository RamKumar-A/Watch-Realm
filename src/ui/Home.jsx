import PageWrapper from '../PageWrapper';
import Carousel from './Carousel';
import Testimonial from './Testimonial';
function Home() {
  return (
    <PageWrapper>
      <Carousel />
      <Testimonial />
    </PageWrapper>
  );
}

export default Home;
