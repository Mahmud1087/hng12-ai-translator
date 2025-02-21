import { Flex } from "antd";
import { FaRobot } from "react-icons/fa";

const BotOutput = ({ text, type }) => {
  return (
    <>
      <aside className="w-full flex justify-start gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-50/60 flex items-center justify-center">
          <FaRobot className="text-blue-950" />
        </div>
        <Flex vertical gap={3}>
          <div className="w-[17rem] py-4 px-4 relative bg-white/80 text-black mt-3 rounded-lg md:w-[20rem] lg:w-[26rem]">
            <p className="absolute -left-3 top-1 h-0 w-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[12px] border-gray-200/80"></p>
            <p>{type}</p>
          </div>
          <p className="text-xs text-orange-400">{text}</p>
        </Flex>
      </aside>
    </>
  );
};

export default BotOutput;
