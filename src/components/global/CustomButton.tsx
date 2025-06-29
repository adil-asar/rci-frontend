import { Button } from '../ui/button';

type props = {
    title: string,
    className: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
};

const CustomButton = ({ title, className, onClick }: props) => {
  return (
    <Button className={className} onClick={onClick} >{title}</Button>
  )
}

export default CustomButton