import { CornerDownRight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type props = {
    buttonTitle: string,
    onClick?: React.MouseEventHandler<HTMLDivElement>
};

const FancyButton = ({ buttonTitle, onClick }: props) => {

    const message = `${buttonTitle}`.replace(/ /g, '\u00A0');
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="flex gap-5" onClick={onClick} >
            <motion.h1
                initial="initial"
                animate={isHovered ? "hovered" : "initial"}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="relative tracking-widest rounded-md not-dark:text-zinc-900 dark:text-zinc-400 cursor-pointer text-center uppercase overflow-hidden whitespace-nowrap text-xs"
            >
                <div>
                    {message.split('').map((item, index) => (
                        <motion.span
                            className={`inline-block ${item === '\u00A0' ? 'w-4' : ''}`}
                            variants={{
                                initial: { y: 0 },
                                hovered: { y: "-100%" },
                            }}
                            transition={{
                                duration: 0.5,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            key={index}
                        >
                            {item === '\u00A0' ? ' ' : item}
                        </motion.span>
                    ))}
                </div>

                <div className='absolute inset-0'>
                    {message.split('').map((item, index) => (
                        <motion.span
                            className={`inline-block ${item === '\u00A0' ? 'w-4' : ''}`}
                            variants={{
                                initial: { y: "100%" },
                                hovered: { y: 0 },
                            }}
                            transition={{
                                duration: 0.5,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            key={index}
                        >
                            {item === '\u00A0' ? ' ' : item}
                        </motion.span>
                    ))}
                </div>

            </motion.h1>

            <motion.div
                initial="initial"
                animate={isHovered ? "hovered" : "initial"}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="relative overflow-hidden cursor-pointer not-dark:text-zinc-900 dark:text-zinc-400"
            >
                <motion.div
                    variants={{
                        initial: { y: 0 },
                        hovered: { y: "-100%" },
                    }}
                    transition={{
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                >
                    <CornerDownRight size={14} />
                </motion.div>

                <motion.div
                    className="absolute inset-0 not-dark:text-zinc-900 dark:text-zinc-400"
                    variants={{
                        initial: { y: "100%" },
                        hovered: { y: 0 },
                    }}
                    transition={{
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                >
                    <CornerDownRight size={14} />
                </motion.div>
            </motion.div>
        </div>
    )
}

export default FancyButton