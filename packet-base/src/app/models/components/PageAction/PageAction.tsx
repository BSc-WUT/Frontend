"use client";

import Button from "@/components/Button/Button";
import Link from "next/link";
import { useState } from "react";

interface PageActionProps {}

const PageAction: React.FC<PageActionProps> = ({}) => {
  const chooseModelButtonTitle: string = "Choose Model";
  const chooseModelHref: string = "/models/choose";
  const createModelButtonTitle: string = "Create Model";
  const createModelHref: string = "/models/create";
  const [activeButton, setActiveButton] = useState<string>(
    createModelButtonTitle
  );

  const handleButtonClick = (value: string) => {
    setActiveButton(value);
  };

  return (
    <div className="flex space-x-4">
      <Link href={chooseModelHref}>
        <Button
          title={chooseModelButtonTitle}
          onClick={handleButtonClick.bind(null, chooseModelButtonTitle)}
          isClicked={activeButton == chooseModelButtonTitle}
          hoverStyle="hover_blue"
          type="button"
        />
      </Link>
      <Link href={createModelHref}>
        <Button
          title={createModelButtonTitle}
          onClick={handleButtonClick.bind(null, createModelButtonTitle)}
          isClicked={activeButton == createModelButtonTitle}
          hoverStyle="hover_blue"
          type="button"
        />
      </Link>
    </div>
  );
};

export default PageAction;
