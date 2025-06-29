import { motion } from "motion/react"
import croppedlogo from '../assets/croppedlogo.jpg';
import { useState } from "react";

const ComingSoon = () => {
    // Replace normal spaces with non-breaking spaces to preserve them
    const message = 'Replica Copy Industries'.replace(/ /g, '\u00A0');
    const message2 = 'Coming Soon.'.replace(/ /g, '\u00A0');
    const message3part1 = "We're working on our website. ".replace(/ /g, '\u00A0');
    const message3part2 = "Stay tuned.".replace(/ /g, '\u00A0');


    const DURATION = 0.2;
    const STAGGER = 0.02;
    const [isHovered, setIsHovered] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);

    return (
        <div className="relative w-full min-h-screen bg-zinc-300 select-none overflow-hidden flex flex-col justify-center">
            {/* Logo container */}
            <div className='w-full p-2 md:p-4 flex justify-center'>
                <img
                    src={croppedlogo}
                    alt="logo"
                    className='w-[12rem] sm:w-[16rem] md:w-[20rem] lg:w-[24rem] object-center object-cover'
                />
            </div>

            {/* Main content */}
            <div className='w-full h-full px-4 space-y-2 sm:space-y-4 md:space-y-6'>
                {/* Title */}
                <motion.h1
                    initial="initial"
                    animate={isHovered ? "hovered" : "initial"}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    className="relative tracking-widest rounded-md text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-primary font-extrabold text-zinc-700 text-center uppercase overflow-hidden whitespace-nowrap"
                >
                    <div>
                        {message.split('').map((item, index) => (
                            <motion.span
                                className={`inline-block ${item === '\u00A0' ? 'w-4' : ''}`} // Add width for spaces
                                variants={{
                                    initial: { y: 0 },
                                    hovered: { y: "-100%" },
                                }}
                                transition={{
                                    duration: DURATION,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: STAGGER * index,
                                    positionTransition: true
                                }}
                                key={index}
                            >
                                {item === '\u00A0' ? ' ' : item} {/* Render normal space */}
                            </motion.span>
                        ))}
                    </div>

                    <div className='absolute inset-0'>
                        {message.split('').map((item, index) => (
                            <motion.span
                                className={`inline-block ${item === '\u00A0' ? 'w-4' : ''}`} // Add width for spaces
                                variants={{
                                    initial: { y: "100%" },
                                    hovered: { y: 0 },
                                }}
                                transition={{
                                    duration: DURATION,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: STAGGER * index,
                                    positionTransition: true
                                }}
                                key={index}
                            >
                                {item === '\u00A0' ? ' ' : item} {/* Render normal space */}
                            </motion.span>
                        ))}
                    </div>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial="initial"
                    animate={isHovered2 ? "hovered" : "initial"}
                    onHoverStart={() => setIsHovered2(true)}
                    onHoverEnd={() => setIsHovered2(false)}
                    className="relative tracking-widest rounded-md text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-primary font-extrabold text-zinc-700 text-center overflow-hidden uppercase"
                >
                    <div>
                        {message2.split('').map((item, index) => (
                            <motion.span
                                className={`inline-block ${item === '\u00A0' ? 'w-4' : ''}`} // Add width for spaces
                                variants={{
                                    initial: { y: 0 },
                                    hovered: { y: "-100%" },
                                }}
                                transition={{
                                    duration: DURATION,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: STAGGER * index,
                                    positionTransition: true
                                }}
                                key={index}
                            >
                                {item === '\u00A0' ? ' ' : item} {/* Render normal space */}
                            </motion.span>
                        ))}
                    </div>

                    <div className='absolute inset-0'>
                        {message2.split('').map((item, index) => (
                            <motion.span
                                className={`inline-block ${item === '\u00A0' ? 'w-4' : ''}`} // Add width for spaces
                                variants={{
                                    initial: { y: "100%" },
                                    hovered: { y: 0 },
                                }}
                                transition={{
                                    duration: DURATION,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: STAGGER * index,
                                    positionTransition: true
                                }}
                                key={index}
                            >
                                {item === '\u00A0' ? ' ' : item} {/* Render normal space */}
                            </motion.span>
                        ))}
                    </div>
                </motion.p>

                {/* Message */}
                <motion.div
                    initial="initial"
                    animate={isHovered3 ? "hovered" : "initial"}
                    onHoverStart={() => setIsHovered3(true)}
                    onHoverEnd={() => setIsHovered3(false)}
                    className="relative tracking-widest rounded-md text-base sm:text-xl md:text-2xl font-primary text-zinc-700 text-center overflow-hidden"
                >
                    <div className="inline">
                        {/* First part - normal weight */}
                        {message3part1.split('').map((item, index) => (
                            <motion.span
                                className={`inline-block ${item === '\u00A0' ? 'w-2' : ''}`}
                                variants={{
                                    initial: { y: 0 },
                                    hovered: { y: "-100%" },
                                }}
                                transition={{
                                    duration: DURATION * 0.7, // Faster duration
                                    ease: [0.22, 1, 0.36, 1], // Snappier easing
                                    delay: STAGGER * 0.5 * index, // Reduced stagger delay
                                    positionTransition: true
                                }}
                                key={`part1-${index}`}
                            >
                                {item === '\u00A0' ? ' ' : item}
                            </motion.span>
                        ))}

                        {/* Second part - bold */}
                        {message3part2.split('').map((item, index) => (
                            <motion.span
                                className={`inline-block font-extrabold ${item === '\u00A0' ? 'w-2' : ''}`}
                                variants={{
                                    initial: { y: 0 },
                                    hovered: { y: "-100%" },
                                }}
                                transition={{
                                    duration: DURATION * 0.7, // Faster duration
                                    ease: [0.22, 1, 0.36, 1], // Snappier easing
                                    delay: STAGGER * 0.5 * (index + message3part1.length), // Reduced stagger delay
                                    positionTransition: true
                                }}
                                key={`part2-${index}`}
                            >
                                {item === '\u00A0' ? ' ' : item}
                            </motion.span>
                        ))}
                    </div>

                    <div className='absolute inset-0'>
                        {/* First part - normal weight */}
                        {message3part1.split('').map((item, index) => (
                            <motion.span
                                className={`inline-block ${item === '\u00A0' ? 'w-2' : ''}`}
                                variants={{
                                    initial: { y: "100%" },
                                    hovered: { y: 0 },
                                }}
                                transition={{
                                    duration: DURATION * 0.7, // Faster duration
                                    ease: [0.22, 1, 0.36, 1], // Snappier easing
                                    delay: STAGGER * 0.5 * index, // Reduced stagger delay
                                    positionTransition: true
                                }}
                                key={`part1-${index}`}
                            >
                                {item === '\u00A0' ? ' ' : item}
                            </motion.span>
                        ))}

                        {/* Second part - bold */}
                        {message3part2.split('').map((item, index) => (
                            <motion.span
                                className={`inline-block font-extrabold ${item === '\u00A0' ? 'w-2' : ''}`}
                                variants={{
                                    initial: { y: "100%" },
                                    hovered: { y: 0 },
                                }}
                                transition={{
                                    duration: DURATION * 0.7, // Faster duration
                                    ease: [0.22, 1, 0.36, 1], // Snappier easing
                                    delay: STAGGER * 0.5 * (index + message3part1.length), // Reduced stagger delay
                                    positionTransition: true
                                }}
                                key={`part2-${index}`}
                            >
                                {item === '\u00A0' ? ' ' : item}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ComingSoon;