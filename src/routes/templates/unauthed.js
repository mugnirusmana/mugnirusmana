import React from "react";

const UnauthedTemplate = ({ children }) => {
  return (
    <div className="w-screen h-screen bg-sky-400 flex items-center justify-center text-md px-5 tablet:px-[unset]">
      {children}
    </div>
  );
};

export default UnauthedTemplate;
