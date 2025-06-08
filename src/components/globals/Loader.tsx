import LoaderIcon from "../Icons/LoaderIcon";

const Loader = () => {
  return (
    <div className="h-screen absolute z-50 top-0 left-0 w-screen bg-bg-1 grid place-items-center">
      <LoaderIcon className="animate-spin text-primary stroke-current" />
    </div>
  );
};

export default Loader;
