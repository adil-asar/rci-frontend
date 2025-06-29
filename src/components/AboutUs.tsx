import background from '../assets/Background2.png'
import CustomBadge from './global/CustomBadge';
import { IoDiamondOutline } from "react-icons/io5";
import { BsCopy } from "react-icons/bs";
import { GoThumbsup } from "react-icons/go";
import { GrGallery } from "react-icons/gr";

const aboutUs = [
    { icon: <IoDiamondOutline size={30} className='text-neutral-400' />, title: 'Court-Tested Expertise', description: 'We specialize in legal replication with precision that stands up in court. Our experience ensures your materials meet all procedural and evidentiary standards.' },
    { icon: <GoThumbsup size={30} className='text-neutral-400' />, title: 'Iron-clad Confidentiality', description: 'Your documents are handled with absolute discretion. Secure processes and trained staff ensure client confidentiality at every step.' },
    { icon: <GrGallery size={30} className='text-neutral-400' />, title: 'White-glove service', description: 'We deliver personalized, proactive service with attention to detail—seamless support tailored to the unique demands of your firm.' },
    { icon: <BsCopy size={30} className='text-neutral-400' />, title: 'Fast turnaround times', description: 'Legal deadlines are non-negotiable. We move fast, with efficient workflows that get your materials ready exactly when you need them.' },
];

const AboutUs = () => {
    return (
        <div className='not-dark:bg-zinc-200 dark:bg-zinc-800' >
            <div className='max-w-7xl mx-auto py-20 px-10 sm:px-2 mt-20'>
                <div className="flex flex-col md:flex-row items-center justify-between gap-20" >
                    <div className=' w-full md:w-1/2' >
                        <img src={background} alt="background" className='w-full h-full object-center object-cover' />
                    </div>
                    <div className='w-full md:w-1/2 space-y-6 px-5 md:px-0' >
                        <CustomBadge className='not-dark:bg-zinc-900 not-dark:text-zinc-200 dark:text-zinc-400 dark:bg-zinc-700' title={'About Us'} />
                        <h1 className='leading-snug text-center sm:text-start text-3xl sm:text-5xl capitalize mt-4 text-zinc-400' >
                            Trusted Legal Replication Experts
                        </h1>
                        <p className='text-center sm:text-start text-xs sm:text-sm text-zinc-400' >
                            At the heart of our business is a simple promise: to provide law firms in Palm Beach County with reliable, secure, and expert-level replication services. Backed by years of courtroom-tested experience, we deliver confidential, high-quality results with white-glove service and rapid turnaround times. Whether you're preparing for trial, filing court documents, or managing sensitive case materials, we're the partner you can count on—every time.
                        </p>
                        <div className='grid grid-cols-2 gap-10 p-4' >
                            {aboutUs && aboutUs.map((item, index) => (
                                <div key={index} className='space-y-3' >
                                    {item?.icon}
                                    <h3 className='text-lg sm:text-xl font-medium text-zinc-400' >
                                        {item?.title}
                                    </h3>
                                    <p className='text-xs sm:text-base text-neutral-400' >
                                        {item?.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AboutUs;