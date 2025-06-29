import { animate, KeyframeOptions, useInView, useIsomorphicLayoutEffect } from "motion/react";
import { useRef } from "react";


type AnimatedCounterProps = {
    from: number,
    to: number,
    animationOptions?: KeyframeOptions,
    className?: string,
    style?: React.CSSProperties,
    percent?: string,
};

const AnimatedCounter = ({
    from,
    to,
    animationOptions,
    className,
    style,
    percent,
}: AnimatedCounterProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });

    useIsomorphicLayoutEffect(() => {
        const element = ref.current;

        if (!element) return;
        if (!inView) return;

        if (window.matchMedia("(prefers-reduced-motion)").matches) {
            element.textContent = String(to);
            return;
        }

        element.textContent = String(from)

        const controls = animate(from, to, {
            duration: 10,
            ease: "easeOut",
            ...animationOptions,
            onUpdate(value) {
                element.textContent = `${value.toFixed(0)} ${percent || ''}`;
            },
        });

        return () => {
            controls.stop();
        }

    }, [ref, inView, from, to]);

    return <div style={style} className={className} ref={ref} />
};

export default AnimatedCounter;