import React from "react";

const AuthedTemplate = ({ children }) => {
  return (
    <div>
      <header>Authed</header>
      {children}
    </div>
  );
};

export default AuthedTemplate;
