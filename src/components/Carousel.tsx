import { ReactNode } from "react";
import Slider from "react-slick";

type Props = {
    children: ReactNode,
    right?: string,
    left?: string,
    top?: string,
}

const Carousel = ({ children, right, left, top }: Props) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow onClick={() => { }} right={right} top={top} />,
        prevArrow: <SamplePrevArrow onClick={() => { }} left={left} top={top} />
    };

    function SampleNextArrow(props: {
        onClick?: React.MouseEventHandler<HTMLDivElement>,
        right: string | undefined,
        left?: string,
        top?: string,
    }) {
        const { onClick, right, top } = props;
        return (
            <div
                onClick={onClick}
                style={{
                    position: 'absolute',
                    top: top ? top : '50%',
                    right: right ? right : '0%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    transition: 'background-color 0.3s ease',
                    color: '#9c9c9c',
                }}
            >
                &#10095;
            </div>
        );
    }

    function SamplePrevArrow(props: {
        onClick?: React.MouseEventHandler<HTMLDivElement>,
        left: string | undefined
        top?: string
    }) {
        const { onClick, left, top } = props;
        return (
            <div
                onClick={onClick}
                style={{
                    position: 'absolute',
                    top: top ? top : '50%',
                    left: left ? left : '0%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    transition: 'background-color 0.3s ease',
                    color: '#9c9c9c',
                }}
            >
                &#10094;
            </div>
        );
    }

    return (
        <Slider {...settings}>{children}</Slider>
    )
}

export default Carousel;