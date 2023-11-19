import React from "react";

import BreadCrumb from "../../components/breadcrumb";

const ScanQr = () => {

  return (
    <div className="w-full h-full flex flex-col">
      <BreadCrumb
        title={'Scan Qr'}
        list={[
          {title: 'Scan Qr', path: '', active: true},
        ]}
      />

      <div className="w-full h-full flex items-center justify-center bg-white">

      </div>
    </div>
  );
};

export default ScanQr;
