interface UploadStatusProps {
  status: "start" | "processing" | "success" | "error";
}

const UploadStats: React.FC<UploadStatusProps> = ({ status }) => {
  if (status === "success") {
    return <p>✅ File uploaded successfully!</p>;
  } else if (status === "error") {
    return <p>❌ File upload failed!</p>;
  } else if (status === "processing") {
    return <p>⏳ Uploading selected file...</p>;
  } else {
    return null;
  }
};

export default UploadStats;
