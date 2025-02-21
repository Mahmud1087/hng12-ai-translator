import { Button, Flex } from "antd";
import ContainerWrapper from "./container-wrapper";
import { useContext } from "react";
import AppContext from "../context/app-context";

const Navbar = ({ goHome }) => {
  const { clearChat, isSummarizing } = useContext(AppContext);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-2xl bg-blue-950/70 py-3.5">
      <ContainerWrapper>
        <Flex align="center" justify="space-between">
          <h1
            className="[font-family:monospace] text-xl"
            onClick={() => goHome()}
          >
            Lingua<span className="text-orange-400 italic">AI</span>
          </h1>
          <Button
            onClick={() => {
              clearChat();
            }}
            disabled={isSummarizing}
          >
            <span className={`${isSummarizing && "text-white"}`}>
              Clear Chat
            </span>
          </Button>
        </Flex>
      </ContainerWrapper>
    </nav>
  );
};

export default Navbar;
