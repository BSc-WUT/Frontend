import PageLayout from "@/components/PageLayout/PageLayout";
import React, { ReactNode } from "react";
import PageAction from "../PageAction/PageAction";

interface ModelsLayoutProps {
  children: ReactNode;
}

const ModelsLayout: React.FC<ModelsLayoutProps> = ({ children }) => {
  return (
    <PageLayout title="Models">
      <div className="flex-col space-y-20">
        <PageAction />
        <div>{children}</div>
      </div>
    </PageLayout>
  );
};

export default ModelsLayout;
