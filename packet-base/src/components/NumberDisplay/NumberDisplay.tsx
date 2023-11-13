interface NumberDisplayProps {
  number: number;
  title?: string;
  className?: string;
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({
  number,
  title,
  className,
}) => {
  return (
    <div
      className={`${className} w-full px-8 py-4 rounded-lg bg-blue-700/50 flex items-center`}
    >
      <h1>{`${title ? `${title}: ` : ""}${number}`}</h1>
    </div>
  );
};

export default NumberDisplay;
