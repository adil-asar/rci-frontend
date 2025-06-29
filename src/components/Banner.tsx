// import background from '../assets/Background.png';
import BannerImage from '../assets/BannerImage.png';
import CustomBadge from './global/CustomBadge';
import CustomButton from './global/CustomButton';
import biofarm from '../assets/Biofarm.png';
import multi from '../assets/multi.png';
import mountain from '../assets/mountain.png';
import { Link } from 'react-scroll';
import { useState } from 'react';

const Banner = () => {
    const [readMore, setReadMore] = useState<boolean>(false);
    const handleReadMore = () => {
        setReadMore(!readMore);
    };
    return (
        <div className='w-screen' >
            <div className="max-w-7xl mx-auto py-3 px-2" >
                <div className='flex flex-col-reverse md:flex-row items-center justify-between px-5 gap-10 md:gap-0' >

                    <div className='space-y-6 w-full md:w-1/2' >
                        <CustomBadge className='not-dark:bg-zinc-900 not-dark:text-zinc-200 dark:text-zinc-400 dark:bg-zinc-700'  title={"Welcome to RCI"} />
                        <p className='text-center md:text-start text-3xl sm:text-4xl md:text-6xl leading-snug' >
                            <p className='text-zinc-400' >Printing Precisely What You Need For Less</p>
                        </p>
                        <p className={`text-center md:text-start text-sm text-zinc-400 ${!readMore ? 'line-clamp-3' : 'line-clamp-none'}`} >
                            RCI is your trusted source for high-quality, affordable legal printing and document services in South Florida. We specialize in precision printing, professional scanning, trial boards, and comprehensive litigation support for law firms and legal professionals. Whether you're preparing for a courtroom presentation or need high-volume document replication, we deliver fast, reliable service tailored to your timeline. With in-house production, we maintain full control over quality, confidentiality, and turnaround—so you get exactly what you need, right when you need it. No minimums, no outsourcing, just dependable results from a team that understands the legal field inside and out.
                        </p>
                        <div className='flex flex-col md:flex-row gap-5' >
                            <Link
                                to={'services'}
                                smooth={true}
                                duration={500}
                            >
                                <CustomButton
                                    title={'Order Now'}
                                    className={'w-full md:w-auto px-8 py-5 cursor-pointer uppercase text-xs hover:text-black hover:bg-white border hover:border-black'}
                                />
                            </Link>
                            <CustomButton
                                title={'Read More'}
                                className={'w-full md:w-auto px-8 py-5 cursor-pointer uppercase text-xs hover:text-black hover:bg-white border hover:border-black'}
                                onClick={handleReadMore}
                            />
                        </div>
                        <div className='flex flex-row justify-around gap-10 items-center w-full' >
                            <img src={biofarm} alt="biofarm" className='w-20 sm:w-32 object-center object-contain' />
                            <img src={multi} alt="multi" className='w-20 sm:w-32 object-center object-contain' />

                            <img src={mountain} alt="mountain" className='w-20 sm:w-32 object-center object-contain' />
                        </div>
                    </div>

                    <div className='w-full md:w-1/2 min-h-full object-center object-cover' >
                        <img src={BannerImage} alt={"background"} className='w-full min-h-[20rem] object-center object-cover' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;