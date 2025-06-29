import CustomBadge from "./global/CustomBadge";
import CustomButton from "./global/CustomButton";
import blog1 from '../assets/blog1.png';
import blog2 from '../assets/blog2.png';
import blog3 from '../assets/blog3.png';
import Carousel from "./Carousel";
import FancyButton from "./FancyButton";
import { TextAnimate } from "./magicui/text-animate";
import { BlurFade } from "./magicui/blur-fade";

const blogNewsData = [
    {
        imgSrc: blog1,
        date: 'November 14, 2022',
        title: 'Color-Logics and Ecofoil Digital',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum officia quasi ea natus dolorum reiciendis debitis.',
        button: 'Read More'
    },
    {
        imgSrc: blog2,
        date: 'November 14, 2022',
        title: 'Ken Freek Honoured at the 16th',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum officia quasi ea natus dolorum reiciendis debitis.',
        button: 'Read More'
    },
    {
        imgSrc: blog3,
        date: 'November 14, 2022',
        title: 'H.B. Fullersand W+Ds Team Up',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum officia quasi ea natus dolorum reiciendis debitis.',
        button: 'Read More'
    },
];

const BlogNews = () => {
    return (
        <div className="w-screen bg-zinc-800 pt-20 mt-10 pb-10" >
            <div className="max-w-7xl mx-auto px-3 py-2" >
                <div className="flex flex-col" >
                    <div className="flex flex-row justify-between items-center" >
                        <CustomBadge title={"Blog News"} />
                        <CustomButton title={"View More"} className={"hidden md:flex px-8 py-5 cursor-pointer uppercase text-xs hover:text-black hover:bg-white border hover:border-black"} />
                    </div>
                    <h1 className="text-4xl sm:text-5xl mt-8 capitalize text-zinc-400" >
                        <TextAnimate animation="blurIn" as="h1" once delay={0.25} duration={0.6} startOnView>Take a Look at Our Articles</TextAnimate>
                    </h1>
                    <div className="hidden md:flex flex-col md:flex-row flex-wrap items-center justify-center gap-10 mt-20" >
                        {blogNewsData && blogNewsData.map((item, index) => (
                            <div key={index} className="flex flex-col border-2 border-zinc-900 max-w-[24rem] min-h-[20rem] rounded-sm" >
                                <BlurFade delay={0.25} duration={0.6} inView >
                                    <img src={item?.imgSrc} alt="blog" className="w-full h-[12rem] object-center object-cover" />
                                </BlurFade>
                                <div className="flex flex-col gap-5 px-5 py-8 w-full h-full" >
                                    <p className="text-sm text-zinc-400" >
                                        <TextAnimate animation="blurIn" as="h1" once delay={0.25} duration={0.6} startOnView>
                                            {item?.date}
                                        </TextAnimate>
                                    </p>
                                    <h3 className="text-xl font-medium text-zinc-400" >
                                        <TextAnimate animation="blurIn" as="h1" once delay={0.25} duration={0.6} startOnView>
                                            {item?.title}
                                        </TextAnimate>
                                    </h3>
                                    <p className="text-sm text-zinc-400 line-clamp-2" >
                                        <TextAnimate animation="blurIn" as="h1" once delay={0.25} duration={0.6} startOnView>
                                            {item?.desc}
                                        </TextAnimate>
                                    </p>
                                    <BlurFade delay={0.25} duration={0.6} inView >
                                        <div className="w-fit flex items-center justify-center gap-2 uppercase text-sm font-semibold border-b border-b-zinc-700 cursor-pointer py-1" >
                                            <FancyButton buttonTitle={item?.button} />
                                        </div>
                                    </BlurFade>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="block md:hidden mt-20" >
                        <Carousel>
                            {blogNewsData && blogNewsData.map((item, index) => (
                                <div key={index} className="flex flex-col px-7" >
                                    <div className="border-2" >
                                        <img src={item?.imgSrc} alt="blog" className="w-full h-[12rem] object-center object-cover" />
                                        <div className="flex flex-col gap-5 px-5 py-8 w-full h-full" >
                                            <p className="text-sm text-zinc-400" >{item?.date}</p>
                                            <h3 className="text-xl font-medium text-zinc-400" >{item?.title}</h3>
                                            <p className="text-sm text-zinc-400 line-clamp-2" >{item?.desc}</p>
                                            <div className="w-fit uppercase text-sm font-semibold border-b-2 border-b-gray-300 cursor-pointer text-zinc-400" >
                                                <FancyButton buttonTitle={item?.button} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div >
        </div>
    );
};

export default BlogNews;