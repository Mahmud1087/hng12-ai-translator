import { useEffect, useState } from "react";
import TranslatorApp from "../App";
import Homepage from "./homepage";

const RenderApp = () => {
  const [getStarted, setGetStarted] = useState(
    JSON.parse(localStorage.getItem("start")) || false
  );

  useEffect(() => {
    const start = localStorage.getItem("start");
    if (start !== null) {
      setGetStarted(JSON.parse(start));
    } else {
      localStorage.setItem("start", JSON.stringify(false));
      setGetStarted(false);
    }
  }, []);

  const goToChat = () => {
    localStorage.setItem("start", JSON.stringify(true));
    setGetStarted(true);
  };

  const goHome = () => {
    localStorage.setItem("start", JSON.stringify(false));
    setGetStarted(false);
  };

  return (
    <>
      {getStarted ? (
        <TranslatorApp goHome={goHome} />
      ) : (
        <Homepage goToChat={goToChat} />
      )}
    </>
  );
};

export default RenderApp;
