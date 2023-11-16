interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="rounded-lg text-red-700 bg-red-200 border-2 border-red-700 px-4 py-2 pointer-events-none shadow-md shadow-red-700 my-2">
      <h3 className="text-2xl">{message}</h3>
    </div>
  );
};

export default Error;
