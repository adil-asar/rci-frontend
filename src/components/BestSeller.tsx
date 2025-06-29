import CustomBadge from "./global/CustomBadge";
import book from '../assets/book.png';
import mockup from '../assets/mockup.png';
import square from '../assets/square.png';
import sneaker from '../assets/sneaker.png';
import Carousel from "./Carousel";
import { TextAnimate } from "./magicui/text-animate";
import { BlurFade } from "./magicui/blur-fade";

const bestSellerGridData = [
    { imgSrc: book, button: 'Print | Books', title: 'Monthly Design Magazine', price: '230.50' },
    { imgSrc: mockup, button: 'Product | Design', title: 'Product Packaging Design', price: '230.50' },
    { imgSrc: sneaker, button: 'Print | Product', title: 'Canvas Shoes Print', price: '230.50' },
    { imgSrc: square, button: 'Print | Books', title: 'Square Flyer Print', price: '230.50' },
]

const BestSeller = () => {
    return (
        <div className="max-w-7xl mx-auto px-3 py-2 mt-20" >
            <div className="flex flex-col gap-8 items-center" >
                <CustomBadge title={"Best Seller"} />
                <h2 className="text-4xl text-zinc-400 " ><TextAnimate animation="blurIn" as="h1" once duration={0.6} startOnView>You May Also Like</TextAnimate></h2>

                <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 gap-20 mt-20" >
                    {bestSellerGridData && bestSellerGridData.map((item, index) => (
                        <div key={index} className="flex flex-col gap-4" >
                            <BlurFade delay={0.25} inView ><img className="w-[30rem]" src={item?.imgSrc} alt="book" /></BlurFade>
                            <div className="flex gap-5 uppercase items-center" >
                                <BlurFade delay={0.25} inView ><div className="opacity-50" ><p className="text-sm text-zinc-400" >{item?.button.split('|')[0]}</p></div></BlurFade>
                                <BlurFade delay={0.25 * 2} inView ><div className="bg-gray-200 py-2 px-3 rounded-xs" ><p className="text-sm font-medium text-zinc-800" >{item?.button.split('|')[1]}</p></div>
                                </BlurFade>
                            </div>
                            <p className="font-semibold text-xl sm:text-2xl text-zinc-400" ><TextAnimate animation="blurIn" as="h1" once duration={0.6} startOnView>{item?.title}</TextAnimate></p>
                            <p className="font-semibold text-lg sm:text-xl text-zinc-400" ><TextAnimate animation="blurIn" as="h1" once duration={0.6} startOnView>{`$ ${item?.price}`}</TextAnimate></p>
                        </div>
                    ))}
                </div>

            </div>
            <div className="md:hidden mt-10" >
                <Carousel top="40%" >
                    {bestSellerGridData && bestSellerGridData.map((item, index) => (
                        <div key={index} className="flex flex-col gap-4 items-center w-full" >
                            <img className="w-full mb-4" src={item?.imgSrc} alt="book" />
                            <div className="flex gap-5 uppercase items-center p-2" >
                                <div className="opacity-50" ><p className="text-sm text-zinc-400" >{item?.button.split('|')[0]}</p></div>
                                <div className="bg-gray-200 py-2 px-3 rounded-xs" ><p className="text-sm font-medium" >{item?.button.split('|')[1]}</p></div>
                            </div>
                            <p className="font-semibold text-xl sm:text-2xl p-1 text-zinc-400" >{item?.title}</p>
                            <p className="font-semibold text-lg sm:text-xl p-1 text-zinc-400" >$ {item?.price}</p>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default BestSeller;