import React from "react";

import BreadCrumb from "../../components/breadcrumb";

const Comments = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <BreadCrumb
        title={'Comments'}
        list={[
          {title: 'Comments', path: '', active: true},
        ]}
      />

      <div className="w-full h-full flex"></div>
    </div>
  );
};

export default Comments;
