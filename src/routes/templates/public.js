import React from "react";

const PublicTemplate = ({ children }) => {
  return (
    <div>
      <header>Public</header>
      {children}
    </div>
  );
};

export default PublicTemplate;
