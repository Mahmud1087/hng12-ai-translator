import { useContext, useEffect, useRef } from "react";
import AppContext from "./context/app-context";
import Navbar from "./components/navbar";
import ContainerWrapper from "./components/container-wrapper";
import UserOutput from "./components/user-output";
import BotOutput from "./components/bot-output";
import ApiLoading from "./components/api-loading";
import UserInput from "./components/user-input";

const TranslatorApp = () => {
  const {
    setDetector,
    isTranslationSupported,
    setIsTranslationSupported,
    translatedText,
    summarizedText,
    isTranslatingLanguage,
    isSummarizing,
    userOutput,
    translateRef,
    summarizeRef,
  } = useContext(AppContext);

  useEffect(() => {
    const initializeTranslation = async () => {
      const isTranslationAvailable = await self.ai.translator.capabilities()
        .available;
      if (isTranslationAvailable === "no") {
        setIsTranslationSupported(false);
        return;
      }
      setIsTranslationSupported(true);
      const newDetector = await self.ai.languageDetector.create();
      setDetector(newDetector);
    };

    initializeTranslation();
  }, []);

  return (
    <>
      {!isTranslationSupported && (
        <p className="text-red-300 text-center italic text-2xl px-2.5 h-screen w-screen flex flex-col gap-8 items-center justify-center">
          Chrome Built-in API is not supported on this browser. <br />
          <span className="text-gray-300 text-xl">
            Please use Google Chrome or Chrome Canary
          </span>
        </p>
      )}

      <section>
        <Navbar />
        <ContainerWrapper>
          <div className="h-screen flex flex-col-reverse">
            <UserInput />

            <section className="flex flex-col-reverse h-[calc(60vh)]">
              <div className="mb-8 overflow-y-scroll flex flex-col gap-8 no-scrollbar">
                {/* User Output */}
                {userOutput && <UserOutput />}

                {/* Translated Output */}
                <div ref={translateRef}>
                  {isTranslatingLanguage && <ApiLoading text={"Translating"} />}
                  {translatedText && (
                    <BotOutput text={"Translated Text"} type={translatedText} />
                  )}
                </div>

                {/* Summarized Output */}
                <div ref={summarizeRef}>
                  {isSummarizing && <ApiLoading text={"Summarizing"} />}
                  {summarizedText && (
                    <BotOutput text={"Summarized Text"} type={summarizedText} />
                  )}
                </div>
              </div>
            </section>
          </div>
        </ContainerWrapper>
      </section>
    </>
  );
};

export default TranslatorApp;
