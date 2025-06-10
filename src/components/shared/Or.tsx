interface Props {
  text: string;
}

const Or = ({ text }: Props) => {
  return (
    <div className="relative h-5">
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-border-2 h-[1px] w-full"></div>
      <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 px-4 bg-bg-1 text-text-2 text-sm">
        {text}
      </span>
    </div>
  );
};

export default Or;
