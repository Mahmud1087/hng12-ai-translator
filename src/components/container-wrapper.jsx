import React from "react";

const ContainerWrapper = ({ children }) => {
  return (
    <div className="w-[90%] mx-auto md:w-[85%] lg:w-[70%]">{children}</div>
  );
};

export default ContainerWrapper;
