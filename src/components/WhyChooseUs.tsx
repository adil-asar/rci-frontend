import background3 from '../assets/background3.png'
import CustomBadge from './global/CustomBadge';

const chooseUs = [
    { title: 'Fast Turnaround', desc: "Built for high-pressure litigation timelines", width: '90%', number: '90' },
    { title: 'Confidential & Secure', desc: "Your data and documents are handled with full discretion", width: '85%', number: '85' },
    { title: 'Courtroom-Ready Deliverables', desc: "From digital evidence to trial boards, we cover every stage of the case Please provide an seo-optimized headline and short introduction to this section​", width: '80%', number: '80' },
];

const WhyChooseUs = () => {
    return (
        <div className="max-w-screen h-full mt-20 bg-black">
            <div className="flex flex-col md:flex-row justify-between">
                <div className="hidden md:block w-full h-[40rem] md:w-1/2">
                    <img
                        src={background3}
                        alt="background"
                        className="w-full h-full object-cover object-center"
                    />
                </div>

                <div className="text-white w-full md:w-1/2 py-10 md:py-0 px-5">
                    <div className="max-w-2xl flex flex-col justify-evenly h-full w-full space-y-3">
                        <CustomBadge title={'Why Choose Us'} className={'bg-yellow-500 py-2 text-base font-bold text-zinc-700 px-5'} />
                        <h1 className="text-3xl md:text-4xl leading-snug text-zinc-400">
                            Reliable Legal Replication Services You Can Trust in South Florida
                        </h1>
                        <p className="text-xs sm:text-sm text-zinc-400">
                            Choosing the right partner for your legal document replication matters. We support law firms across Palm Beach County and South Florida with fast, secure, and accurate services tailored for litigation. From tight trial deadlines to sensitive client materials, we understand the stakes—and deliver with precision every time.
                        </p>
                        {chooseUs && chooseUs.map((item, index) => (
                            <div key={index} className="space-y-6 sm:space-y-3">
                                <ul>
                                    <li>
                                        <p className='text-sm sm:text-base font-bold text-zinc-400' >
                                            {item?.title}
                                        </p>
                                        <p className='text-xs font-normal text-zinc-400' >
                                            {item?.desc}
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;