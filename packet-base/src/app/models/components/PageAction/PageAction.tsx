"use client";

import Button from "@/components/Button/Button";
import Link from "next/link";
import React, { useState } from "react";

interface PageActionProps {}

const PageAction: React.FC<PageActionProps> = ({}) => {
  const chooseModelButtonTitle: string = "Choose Model";
  const chooseModelHref: string = "/models";
  const createModelButtonTitle: string = "Create Model";
  const createModelHref: string = "/models/create";
  const [activeButton, setActiveButton] = useState<string>(
    chooseModelButtonTitle
  );

  return (
    <div className="flex space-x-4">
      <Link href={chooseModelHref}>
        <Button
          title={chooseModelButtonTitle}
          onClick={() => setActiveButton(chooseModelButtonTitle)}
          isClicked={activeButton == chooseModelButtonTitle}
          hoverStyle="hover_blue"
          type="button"
        />
      </Link>
      <Link href={createModelHref}>
        <Button
          title={createModelButtonTitle}
          onClick={() => setActiveButton(createModelButtonTitle)}
          isClicked={activeButton == createModelButtonTitle}
          hoverStyle="hover_blue"
          type="button"
        />
      </Link>
    </div>
  );
};

export default PageAction;
