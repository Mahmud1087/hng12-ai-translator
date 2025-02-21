import { Flex } from "antd";
import React from "react";
import { VscLoading } from "react-icons/vsc";

const ApiLoading = ({ text }) => {
  return (
    <Flex align="center" gap={7}>
      <p>{text}</p>
      <VscLoading className="animate-spin" />
    </Flex>
  );
};

export default ApiLoading;
