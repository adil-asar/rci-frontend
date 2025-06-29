import CustomBadge from "./global/CustomBadge"
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";
import CustomButton from "./global/CustomButton";
import Carousel from "./Carousel";
import { useNavigate } from "react-router-dom";
import FancyButton from "./FancyButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";

const services = [
  {
    title: 'Printing Services for Legal Professionals',
    message: 'Printing legal documents from digital files requires more than clicking “Print.” Our advanced workflow handles even the most complex jobs with speed and precision.',
    buttonName: 'Learn More',
    buttonNameTwo: 'Order Now',
    imgSrc: image6,
    upComing: true,
  },
  {
    title: 'Paper Discovery & Scanning Services',
    message: 'We specialize in high-volume, deadline-driven legal scanning and document conversion.',
    buttonName: 'Learn More',
    buttonNameTwo: 'Order Now',
    imgSrc: image5,
    upComing: true,
  },
  {
    title: 'Trial Boards',
    message: 'Make your argument stand out in the courtroom with professionally designed trial boards and exhibits.',
    buttonName: 'Learn More',
    buttonNameTwo: 'Order Now',
    imgSrc: image4,
    upComing: true,
  },
  {
    title: 'Electronic Data Discovery (EDD) & Early Case Assessment',
    message: 'Cut through the data clutter and prepare your case faster with our precise, efficient EDD services.',
    buttonName: 'Learn More',
    buttonNameTwo: 'Order Now',
    imgSrc: image3,
    upComing: true,
  },
  {
    title: 'Forensic Data Collection',
    message: 'We perform forensic data acquisition with full chain-of-custody documentation for court-ready results.',
    buttonName: 'Learn More',
    buttonNameTwo: 'Order Now',
    imgSrc: image2,
    upComing: true,
  },
  {
    title: 'Litigation Consulting Services',
    message: 'Hands-on guidance from discovery planning through appeal.',
    buttonName: 'Learn More',
    buttonNameTwo: 'Order Now',
    imgSrc: image1,
    upComing: false,
  },
];

const OurServices = () => {

  const [modal, setModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleNavigation = (item, value) => {
    // if (item?.upComing) return;
    const slug = item?.title.split(" ").join('');
    if (value == 'learnmore') {
      navigate(`/services/${slug}`, { state: item });
    } else {
      const token = localStorage.getItem('token');
      if (!token) {
        handleModalFunc();
      } else {
        navigate(`/ordernow/${slug}`, { state: item });
      }
    }

  };

  const handleModalFunc = () => {
    setModal(true)
  };

  const onClose = () => {
    setModal(false);
  };

  const handleSignup = () => {
    navigate('/signin');
  };

  const handleSignin = () => {
    navigate('/signup');
  };

  return (
    <>
      <Dialog open={modal} onOpenChange={onClose}  >
        <DialogContent className="bg-zinc-800 border-zinc-800 text-zinc-400" >
          <DialogHeader>
            <DialogTitle>Login Error</DialogTitle>
            <DialogDescription>
              Please Sign in or Sign up Before Continue.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="bg-zinc-800 text-zinc-400 border-zinc-400 hover:bg-zinc-800 hover:text-zinc-400 cursor-pointer"
              onClick={handleSignup}
            >Sign in</Button>
            <Button
              type="submit"
              className="bg-zinc-900 text-zinc-400 cursor-pointer"
              onClick={handleSignin}
            >Sign up</Button>
          </DialogFooter>
        </DialogContent>

      </Dialog>
      <div className="max-w-7xl mx-auto py-3 px-10 sm:px-2 mt-20" >
        <div className="flex flex-col items-center w-full sm:w-auto space-y-6 px-5" >
          <CustomBadge className="not-dark:bg-zinc-900 not-dark:text-zinc-200 dark:text-zinc-400 dark:bg-zinc-700" title={"Our Services"} />
          <h1 className="text-center text-4xl sm:text-5xl text-zinc-400" >Litigation Support & E-Discovery</h1>
          <p className="text-center text-sm sm:text-base text-zinc-400">
            We help law firms and legal departments manage complex casework with confidence - from digital evidence collection to trial presentation. Whether you need forensic data acquisition, document scanning, consulting or custom exhibits, we deliver accurate, timely and defensible solutions, all backed by personalized, in-person support.
          </p>
        </div>


        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 mt-20 px-5 py-3 " >
          {services && services.map((item, index) => (
            <div key={index} className="w-full md:w-auto flex flex-col items-center justify-between md:items-start space-y-3 relative cursor-pointer not-dark:hover:bg-zinc-200 dark:hover:bg-zinc-800 p-2 rounded-sm" >
              {item?.upComing && <div className="not-dark:bg-zinc-900 dark:bg-zinc-700 not-dark:text-zinc-300 dark:text-zinc-400 text-xs rounded-bl-md p-2 absolute right-0 top-0 tracking-wider font-semibold" >Upcoming</div>}
              <img className="w-40" src={item?.imgSrc} alt="documentPrint" />
              <h3 className="text-center md:text-start text-xl font-medium not-dark:text-zinc-900 dark:text-zinc-400" >
                {item?.title}</h3>
              <p className="text-center md:text-start text-xs text-neutral-400 line-clamp-4" >
                {item?.message}</p>
              <div className="flex items-center gap-5 w-full md:w-auto cursor-pointer" >
                <div className="border-b not-dark:border-zinc-900 dark:border-zinc-400 py-1" >
                  <FancyButton
                    buttonTitle={item?.buttonName}
                    onClick={() => handleNavigation(item, 'learnmore')}
                  />
                </div>
                <div className="border-b not-dark:border-zinc-900 dark:border-zinc-400 py-1" >
                  <FancyButton
                    buttonTitle={item?.buttonNameTwo}
                    onClick={() => handleNavigation(item, 'ordernow')}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>


        <div className="block md:hidden mt-20" >
          <Carousel left="-6%" right="-6%" >
            {services && services.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4">
                {/* Image container with centered alignment */}
                <div className="flex justify-center w-full mb-4">
                  <img className="w-40" src={item?.imgSrc} alt={item?.title} />
                </div>

                {/* Text content */}
                <h3 className="text-xl font-medium w-full text-zinc-400">{item?.title}</h3>
                <p className="text-sm text-neutral-400 mb-4 w-full">{item?.message}</p>

                {/* Button container with centered alignment */}
                <div className="flex justify-center w-full">
                  <CustomButton
                    className="px-8 py-5 cursor-pointer uppercase tracking-wide text-xs border-b-2 bg-white text-black hover:bg-white"
                    title={item?.buttonName}
                    onClick={() => handleNavigation(item, 'learnmore')}
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>


      </div>
    </>
  )
}

export default OurServices