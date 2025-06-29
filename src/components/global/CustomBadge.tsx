import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

type props = {
    title: string,
    className?: string,
};

const CustomBadge = ({ title, className }: props) => {
    return (
        <Badge className={cn('bg-zinc-900 text-neutral-400 px-6 py-2 text-base font-bold tracking-widest', className)} >
            {title}
        </Badge>
    );
};

export default CustomBadge;