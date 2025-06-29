import background from '../assets/background5.png';
import croppedLogo from '../assets/croppedlogo.jpg';
import { FaFacebook } from "react-icons/fa6";
// import { BsTwitterX } from "react-icons/bs";
// import { IoLogoYoutube } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import CustomBadge from './global/CustomBadge';
import CustomButton from './global/CustomButton';
import { Link } from 'react-scroll';
import { useLocation, useNavigate } from 'react-router-dom';

const navbar = [
    { title: 'Home', to: 'home' },
    { title: 'About', to: 'about' },
    { title: 'Services', to: 'services' },
    { title: 'Why Choose Us', to: 'whychooseus' },
    { title: 'Contact', to: 'contact' },
];

const Footer = () => {

    const navigate = useNavigate();
    const location = useLocation();

    console.log(location?.pathname);

    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleNavigation = () => {
        navigate('/contact');
    };

    return (
        <>
            {location?.pathname !== '/admin' && (
                <div className='' >
                    {location?.pathname === '/' &&
                        <div>
                            <div className='relative w-full' >
                                <img src={background} alt="background" className='w-full min-h-[30rem] object-center object-cover' />
                                <div className='max-w-4xl mx-auto absolute inset-0 px-5' >
                                    <div className='flex flex-col items-center justify-center gap-10 w-full h-full' >
                                        <CustomBadge className='not-dark:bg-zinc-900 not-dark:text-zinc-200 dark:text-zinc-400 dark:bg-zinc-700' title={'Let\'s Talk'} />
                                        <p className='leading-snug text-xl sm:text-2xl text-white text-center' >
                                            "Contact us today to schedule a consultation or request a quote. Whether you need rush printing, a custom exhibit board, or full-case data management - we're your trusted partner for litigation support services."
                                        </p>
                                        <div className='flex flex-col sm:flex-row gap-10 sm:items-center w-full sm:w-auto'>
                                            <Link
                                                to={'services'}
                                                smooth={true}
                                                duration={500}
                                            >

                                                <CustomButton title={'Order Now'} className={'w-full md:w-auto px-14 py-5 cursor-pointer uppercase text-xs hover:text-black hover:bg-white hover:border-black'} />
                                            </Link>
                                            <CustomButton
                                                title={'Contact Us'}
                                                className={'w-full md:w-auto px-14 py-5 cursor-pointer uppercase text-xs hover:text-black hover:bg-white hover:border-black'}
                                                onClick={handleNavigation}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    <div className='w-full not-dark:bg-zinc-50 dark:bg-zinc-900' >
                        <div className='max-w-7xl mx-auto px-3 py-2 text-white ' >
                            <div className='flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-0 justify-around pt-20 pb-10 border-b border-b-zinc-800' >

                                <div className='w-full md:w-1/2' >
                                    <div className='w-full md:w-[25rem] px-10 space-y-6' >
                                        <img src={croppedLogo} alt={"croppedLogo"} className='w-20 place-self-center md:place-self-auto' />
                                        <p className='text-center md:text-start text-sm line-clamp-none sm:line-clamp-3 not-dark:text-zinc-900 dark:text-zinc-400' >
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse molestias atque nesciunt quia id neque accusantium, facilis corrupti aspernatur.
                                        </p>
                                        <div className='flex flex-row gap-4 justify-center md:justify-normal items-center' >
                                            <div
                                                className='p-3 border border-zinc-700 rounded-full not-dark:hover:bg-zinc-900 dark:hover:bg-zinc-400 not-dark:text-zinc-900 dark:text-zinc-400 not-dark:hover:text-white dark:hover:text-zinc-900 hover:text-zinc-900 cursor-pointer'
                                                onClick={() => openInNewTab('https://facebook.com')}
                                            ><FaFacebook size={20} /></div>
                                            <div
                                                className='p-3 border border-zinc-700 rounded-full not-dark:hover:bg-zinc-900 dark:hover:bg-zinc-400 not-dark:text-zinc-900 dark:text-zinc-400 not-dark:hover:text-white dark:hover:text-zinc-900 hover:text-zinc-900 cursor-pointer'
                                                onClick={() => openInNewTab('https://instagram.com')}
                                            >
                                                <FaInstagram size={15} /></div>
                                            <div
                                                className='p-3 border border-zinc-700 rounded-full not-dark:hover:bg-zinc-900 dark:hover:bg-zinc-400 not-dark:text-zinc-900 dark:text-zinc-400 not-dark:hover:text-white dark:hover:text-zinc-900 hover:text-zinc-900 cursor-pointer'
                                                onClick={() => openInNewTab('https://linkedin.com')}
                                            >
                                                <FaLinkedin size={15} /></div>
                                        </div>
                                    </div>
                                </div>

                                <div className='w-1/2 flex flex-col sm:flex-row items-center sm:items-start justify-center gap-0 sm:gap-20 text-center sm:text-start not-dark:text-zinc-900 dark:text-zinc-400' >
                                    <div className='flex flex-col gap-5 mb-10 w-full sm:w-auto' >
                                        <div className='flex flex-col gap-5' >
                                            <h3 className='text-2xl' >
                                                Contact
                                            </h3>
                                            <p className='text-sm cursor-pointer hover:underline' ><a href="tel:+1234567890">
                                                +1 (234) 567 890
                                            </a></p>
                                            <p className='text-sm cursor-pointer hover:underline' ><a href="mailto:RCI@gmail.com">
                                                RCI@gmail.com
                                            </a></p>
                                        </div>
                                        <div className='flex flex-col gap-5 w-full sm:w-[14rem]' >
                                            <h3 className='text-2xl' >
                                                Address
                                            </h3>
                                            <p className='text-sm leading-loose' >
                                                1234 Lorem Ipsum, Denisville Minnesota 01118
                                            </p>
                                            <p className='text-sm' >
                                                07:00 AM - 19:00 PM
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-5 mb-10 w-full sm:w-auto' >
                                        <h3 className='text-2xl'>
                                            Explore
                                        </h3>
                                        {navbar && navbar.map((item, index) => (
                                            <p key={index} className='text-sm cursor-pointer hover:underline' >
                                                <Link
                                                    to={item.to}
                                                    smooth={true}
                                                    duration={500}
                                                >
                                                    {item?.title}
                                                </Link>
                                            </p>
                                        ))}
                                    </div>
                                    {/* <div className='flex flex-col gap-5 w-full sm:w-auto' >
                                <h3 className='text-2xl' >Support</h3>
                                <p className='text-sm cursor-pointer hover:underline' >Help Center</p>
                                <p className='text-sm cursor-pointer hover:underline' >Refunds</p>
                                <p className='text-sm cursor-pointer hover:underline' >Career</p>
                                <p className='text-sm cursor-pointer hover:underline' >FAQs</p>
                                <p className='text-sm cursor-pointer hover:underline' >Privacy Policy</p>
                                <p className='text-sm cursor-pointer hover:underline' >Contact</p>
                            </div> */}
                                </div>

                            </div>

                            <div className='flex flex-col sm:flex-row items-center gap-5 sm:gap-0 sm:items-start justify-between py-5 not-dark:text-zinc-900 dark:text-zinc-400' >
                                <div><p className='text-sm font-light' >
                                    Copyright &copy; 2025 RCI
                                </p></div>
                                <div className='flex flex-col sm:flex-row items-center gap-5 sm:gap-10' >
                                    <p className='text-sm font-light cursor-pointer hover:underline' >
                                        Privacy Policy
                                    </p>
                                    <p className='text-sm font-light cursor-pointer hover:underline' >
                                        Terms & Services
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div >
            )}
        </>
    );
};

export default Footer;