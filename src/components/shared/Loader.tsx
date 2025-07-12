import { cn } from "@/utils/cn";
import LoaderIcon from "../Icons/LoaderIcon";

type Props = {
  className?: string;
};

const Loader = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "h-screen absolute z-50 top-0 left-0 w-screen bg-bg-1 grid place-items-center",
        className,
      )}
    >
      <LoaderIcon className="animate-spin text-primary stroke-current" />
    </div>
  );
};

export default Loader;
