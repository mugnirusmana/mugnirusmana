import React from "react";

const PublicTemplate = ({ children }) => {
  return (
    <div className="w-screen min-h-screen h-screen font-anek-telugu font-normal">
      {children}
    </div>
  );
};

export default PublicTemplate;
