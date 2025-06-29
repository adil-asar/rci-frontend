import { useEffect } from 'react';
import AboutUs from './AboutUs';
import Banner from './Banner';
// import BlogNews from './BlogNews';
import OurServices from './OurServices';
import OurValues from './OurValues';
// import Testimonial from './Testimonial';
import WhyChooseUs from './WhyChooseUs';


const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className='' >
      <Banner />
      <div className='about' >
        <AboutUs />
      </div>
      <div className='services' >
        <OurServices />
      </div>
      <div className='whychooseus' >
        <WhyChooseUs />
      </div>
      {/* <div className='testimonials' >
        <Testimonial />
      </div> */}
      <OurValues />
      {/* <div className='blog' >
        <BlogNews />
      </div> */}
    </div>
  );
};

export default Home;