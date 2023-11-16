"use client";

import Button from "@/components/Button/Button";
import React, { useEffect, useRef, useState } from "react";
import UploadStats from "../UploadStatus/UploadStatus";
import useModels from "@/hooks/useModels";

interface CreateModelFormProps {}

const CreateModelForm: React.FC<CreateModelFormProps> = ({}) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadClick, setUploadClick] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<
    "start" | "processing" | "success" | "error"
  >("start");
  const { uploadModel, loading, error } = useModels();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const hanldeButtonClick = () => {
    hiddenFileInput.current!.click();
    setUploadClick(true);
  };

  const handleUpload = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (file) {
      setUploadStatus("start");
      uploadModel(file);
      setUploadClick(false);
      if (!error) {
        setUploadStatus("success");
      } else {
        setUploadStatus("error");
      }
    }
  };

  useEffect(() => {
    if (uploadClick) {
      if (loading) {
        setUploadStatus("processing");
      } else if (!!error) {
        setUploadStatus("error");
      }
    }
  }, [uploadClick, loading, error]);

  return (
    <form className="flex-col space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">Upload a file</h3>
        <p>Only files of *.pt type are accepted.</p>
      </div>
      <div>
        <Button
          title="Choose a File"
          type="button"
          onClick={hanldeButtonClick}
          hoverStyle="hover_white"
        />
        <input
          id="file"
          type="file"
          accept=".pt"
          ref={hiddenFileInput}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
      {file && (
        <div className="flex-col space-y-8">
          <section>
            <p>File to be uploaded: {file.name}</p>
          </section>
          <Button
            title="Upload a File"
            onClick={handleUpload}
            type="submit"
            hoverStyle="hover_blue"
          />
        </div>
      )}
      <UploadStats status={uploadStatus} />
    </form>
  );
};

export default CreateModelForm;
