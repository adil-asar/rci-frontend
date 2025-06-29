import { useLocation, useNavigate } from "react-router-dom";
import CustomBadge from "./global/CustomBadge";
import Carousel from "./Carousel";
import { useEffect } from "react";
import FancyButton from "./FancyButton";
import { TextAnimate } from "./magicui/text-animate";
import { BlurFade } from "./magicui/blur-fade";

const Services = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const services = [
        {
            title: 'Legal & Firm Documents Form',
            message: 'Contracts, agreements, legal forms.',
            buttonName: 'Go To Form',
            imgSrc: location?.state?.imgSrc,
            slug: 'legalFirmForm',
        },
        {
            title: 'Construction Form',
            message: 'Construction Site Forms',
            buttonName: 'Go To Form',
            imgSrc: location?.state?.imgSrc,
            slug: 'constructionForm'
        },
    ];

    useEffect(() => {
        window.scroll(0, 0);
    }, [])


    const handleNavigation = (slug: string) => {
        navigate(`/services/${slug}`, { state: location?.state });
    };
    return (
        <div className="max-w-7xl mx-auto py-3 px-10 sm:px-2 mt-20 mb-20" >
            <div className="w-full sm:w-auto space-y-6 px-5" >
                <CustomBadge title={"Our Services"} />
                <h1 className="text-center sm:text-start text-4xl sm:text-5xl text-zinc-400" >
                    <TextAnimate animation="blurIn" as="h1" once duration={0.6} startOnView >{`Select ${location && location?.state?.title} Form`}</TextAnimate>
                </h1>
            </div>
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 mt-20 px-5" >
                {services && services.map((item, index) => (
                    <div key={index} className="w-full md:w-auto flex flex-col items-center md:items-start space-y-3" >
                        <BlurFade delay={0.25 * index} inView ><img className="w-40" src={item?.imgSrc} alt="documentPrint" /></BlurFade>
                        <BlurFade delay={0.25 * index} inView ><h3 className="text-center md:text-start text-xl font-medium text-zinc-400" >{item?.title}</h3></BlurFade>
                        <BlurFade delay={0.25 * index} inView ><p className="text-center md:text-start text-sm text-neutral-400" >{item?.message}</p></BlurFade>
                        <BlurFade delay={0.25 * index * 2} inView >
                            <FancyButton
                                buttonTitle={"Go To Form"}
                                onClick={() => handleNavigation(item?.slug)}
                            />
                        </BlurFade>
                    </div>
                ))}
            </div>
            <div className="block md:hidden mt-20" >
                <Carousel >
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
                                <FancyButton
                                    buttonTitle={"Go To Form"}
                                    onClick={() => handleNavigation(item?.slug)}
                                />
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}

export default Services