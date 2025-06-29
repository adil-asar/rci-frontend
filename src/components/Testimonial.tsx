import CustomBadge from "./global/CustomBadge";
import CustomButton from "./global/CustomButton";
import avatar1 from '../assets/testimonial1.png';
import avatar2 from '../assets/testimonial2.png';
import avatar3 from '../assets/testimonial3.png';
import imageStyle from '../assets/imageStyle.png';
import Biofarm from '../assets/Biofarm.png';
import multi from '../assets/multi.png';
import mountain from '../assets/mountain.png';
import phoenix from '../assets/phoenix.png';
import lionhead from '../assets/lionhead.png';
import Carousel from "./Carousel";
import { TextAnimate } from "./magicui/text-animate";
import { BlurFade } from "./magicui/blur-fade";

const testimonialData = [
    {
        title: 'Best print quality',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dignissimos libero velit magnam.',
        imgSrc: avatar1,
        name: 'Linda Smith',
        profession: 'Teacher'
    },
    {
        title: 'Best Service Ever',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dignissimos libero velit magnam.',
        imgSrc: avatar2,
        name: 'Paula Deans',
        profession: 'Teacher'
    },
    {
        title: 'Amazing end result',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dignissimos libero velit magnam.',
        imgSrc: avatar3,
        name: 'Amanda Lawson',
        profession: 'Marketing'
    },
];

const companyLogo = [
    { imgSrc: Biofarm },
    { imgSrc: multi },
    { imgSrc: mountain },
    { imgSrc: phoenix },
    { imgSrc: lionhead },
]

const Testimonial = () => {
    return (
        <div className="w-screen bg-zinc-800 pt-20 mt-10" >
            <div className="max-w-7xl mx-auto px-3 py-2" >
                <div className="flex flex-col" >
                    <div className="flex flex-row justify-between items-center" >
                        <CustomBadge title={"Testimonials"} />
                        <CustomButton
                            title={"View More"}
                            className={"hidden md:flex px-8 py-5 cursor-pointer uppercase text-xs hover:text-black hover:bg-white border hover:border-black"}
                        />
                    </div>
                    <h1 className="text-center sm:text-start text-4xl sm:text-5xl mt-8 text-zinc-400" ><TextAnimate animation="blurIn" as="h1" once duration={0.6} startOnView>Reviews From Clients</TextAnimate></h1>
                    <div className="hidden md:flex flex-col sm:flex-row flex-wrap justify-around gap-10 sm:gap-0 items-start sm:items-center mt-14 sm:mt-20" >
                        {testimonialData && testimonialData.map((item, index) => (
                            <div key={index} className="flex flex-col gap-4 p-2 w-full sm:w-[20rem]" >
                                <BlurFade delay={0.25} inView><img src={imageStyle} alt="imagestyle" className="w-16 object-center object-contain" /></BlurFade>
                                <h3 className="text-2xl font-medium text-zinc-400" ><TextAnimate animation="blurIn" as="h1" once delay={0.25} duration={0.6} startOnView>{`"${item?.title}"`}</TextAnimate></h3>
                                <p className="text-lg text-zinc-500" ><TextAnimate animation="blurIn" as="h1" once delay={0.25} duration={0.6} startOnView>{item?.description}</TextAnimate></p>
                                <div className="flex flex-row items-center gap-4" >
                                    <BlurFade delay={0.25} inView><img src={item?.imgSrc} alt="avatar" className="size-16" /></BlurFade>
                                    <div>
                                        <p className="text-lg text-gray-500" ><TextAnimate animation="blurIn" as="h1" once delay={0.25} duration={0.6} startOnView>{item?.name}</TextAnimate></p>
                                        <p className="text-base text-gray-500" ><TextAnimate animation="blurIn" as="h1" once delay={0.25} duration={0.6} startOnView>{item?.profession}</TextAnimate></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="block md:hidden mt-20" >
                        <Carousel>
                            {testimonialData && testimonialData.map((item, index) => (
                                <div key={index} className="flex flex-col gap-4 p-2 w-full sm:w-[20rem] space-y-2.5 px-20" >
                                    <img src={imageStyle} alt="imagestyle" className="w-12 md:w-16 object-center object-contain" />
                                    <h3 className="text-xl md:text-2xl font-medium text-zinc-400" >"{item?.title}"</h3>
                                    <p className="text-sm md:text-lg text-gray-500" >{item?.description}</p>
                                    <div className="flex flex-row items-center gap-4" >
                                        <img src={item?.imgSrc} alt="avatar" className="size-12 md:size-16" />
                                        <div>
                                            <p className="text-sm md:text-lg text-gray-500" >{item?.name}</p>
                                            <p className="text-xs md:text-base text-gray-500" >{item?.profession}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
                <div className="flex flex-col mt-40 items-center" >
                    <CustomBadge title={"Trusted by 1000+ Clients"} />
                </div>
                <div className="flex flex-col flex-wrap sm:flex-row items-center gap-10 sm:gap-20 justify-center mt-20" >
                    {companyLogo && companyLogo.map((item, index) => (
                        <BlurFade key={index} delay={0.25 * index} inView>
                            <img src={item?.imgSrc} alt="companyLogo" className="w-40 object-center object-cover" />
                        </BlurFade>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonial;