import React, { ReactNode } from "react";

interface MyComponentProps {
  children: ReactNode;
}

const MainComponent: React.FC<MyComponentProps> = ({ children }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-950 max-w-[90wh]">{children}</div>
  );
};

export default MainComponent;
