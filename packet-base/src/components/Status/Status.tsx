interface StatusProps {
  message: string;
}

const Status: React.FC<StatusProps> = ({ message }) => {
  return (
    <div className="flex items-center hover:text-blue-700 hover:bg-white outline rounded-md px-4 py-2 hover:outline-blue-700 text-white bg-blue-700 outline-white">
      <h3>{`Label: ${message}`}</h3>
    </div>
  );
};

export default Status;
