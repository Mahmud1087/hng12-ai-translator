import { Button } from "antd";
import ContainerWrapper from "./container-wrapper";
import heroImg from "../assets/hero-img.jpg";

const Homepage = ({ goToChat }) => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
        <img src={heroImg} alt="Hero image" className="w-full h-full" />
      </div>
      <ContainerWrapper>
        <section className="relative bg-white/70 shadow-2xl backdrop-blur-[3px] rounded-xl py-8 px-6 lg:px-14 w-full mx-auto lg:w-[80%]">
          <h1 className="[font-family:monospace] text-5xl text-center text-blue-950 font-semibold">
            Lingua<span className="text-orange-800 italic">AI</span>
          </h1>
          <h2 className="text-center mt-6 text-blue-950 font-medium text-lg">
            This is a language{" "}
            <span className="text-orange-800">detector, </span>
            <span className="text-orange-800">translator, </span> and{" "}
            <span className="text-orange-800">summarizer</span> built using{" "}
            <a
              href="https://developer.chrome.com/docs/ai/built-in-apis"
              className="text-blue-800 underline"
              target="_blank"
            >
              chrome built-in API.
            </a>{" "}
            This is not supported on all browser yet so it might not work on
            your browser
          </h2>
          <div className="flex justify-center mt-7">
            <Button
              style={{
                padding: "0 3rem",
              }}
              type="primary"
              size="large"
              onClick={() => {
                goToChat();
              }}
            >
              Start
            </Button>
          </div>
        </section>
      </ContainerWrapper>
    </div>
  );
};

export default Homepage;
