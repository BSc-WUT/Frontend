import React, { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, title }) => {
  return (
    <div className="flex flex-col p-10 pt-24 space-y-12">
      <h1 className="text-4xl">{title}</h1>
      <div className="">{children}</div>
    </div>
  );
};

export default PageLayout;
