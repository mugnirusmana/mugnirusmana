import React from "react";

const UnauthedTemplate = ({ children }) => {
  return (
    <div>
      <header>Unauthed</header>
      {children}
    </div>
  );
};

export default UnauthedTemplate;
