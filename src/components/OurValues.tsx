import CustomBadge from "./global/CustomBadge";
import background4 from '../assets/background4.png';

const OurValues = () => {
    return (
        <div className="max-w-7xl mx-auto px-3 py-2 mt-20 mb-20" >
            <div className="flex flex-col md:flex-row justify-center gap-20 px-5 sm:px-0" >
                <div className="hidden md:block" >
                    <img src={background4} alt="background" className="w-full h-full object-center object-cover" />
                </div>
                <div className="flex flex-col gap-10 w-full md:max-w-2xl py-5 px-10" >
                    <CustomBadge className="not-dark:bg-zinc-900 not-dark:text-zinc-200 dark:text-zinc-400 dark:bg-zinc-700" title={"FOUNDER's NOTE"} />
                    <h1 className="text-center sm:text-start text-4xl sm:text-5xl text-zinc-400" >
                        Led by Integrity, Backed by Experience
                    </h1>
                    <p className="text-center sm:text-start text-sm sm:text-base text-gray-400" >
                        With over 8 years of hands-on experience in litigation support services, I’ve built a reputation rooted in trust, precision, and results. I understand the high standards law firms demand - and I meet them with unwavering work ethic, moral integrity, and deep industry knowledge. When you work with us, you're partnering with someone who treats your case like their own.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OurValues;