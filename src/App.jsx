import { useContext, useEffect, useRef } from "react";
import AppContext from "./context/app-context";
import Navbar from "./components/navbar";
import ContainerWrapper from "./components/container-wrapper";
import UserOutput from "./components/user-output";
import BotOutput from "./components/bot-output";
import ApiLoading from "./components/api-loading";
import UserInput from "./components/user-input";
import { toast } from "react-toastify";
import { VscLoading } from "react-icons/vsc";
import { Button } from "antd";

const TranslatorApp = ({ goHome }) => {
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
    isCheckingTranslationSupport,
    setIsCheckingTranslationSupport,
  } = useContext(AppContext);

  useEffect(() => {
    const initializeTranslation = async () => {
      setIsCheckingTranslationSupport(true);
      try {
        const isTranslationAvailable = await self.ai.translator.capabilities()
          .available;
        if (isTranslationAvailable === "no") {
          setIsTranslationSupported(false);
          return;
        }
        setIsTranslationSupported(true);
        const newDetector = await self.ai.languageDetector.create();
        setDetector(newDetector);
      } catch (error) {
        console.log(error);
      } finally {
        setIsCheckingTranslationSupport(false);
      }
    };

    initializeTranslation();
  }, []);

  return (
    <>
      {isCheckingTranslationSupport && (
        <div className="h-screen w-screen flex flex-col gap-8 items-center justify-center">
          <VscLoading className="animate-spin text-4xl" />
        </div>
      )}
      {!isTranslationSupported && (
        <div className="h-screen w-screen flex flex-col gap-8 items-center justify-center">
          <p className="text-red-300 text-center italic text-2xl px-2.5">
            Chrome Built-in API is not supported on this browser. <br />
          </p>
          <Button
            type="primary"
            onClick={() => {
              goHome();
            }}
          >
            Go back
          </Button>
        </div>
      )}

      <section>
        <Navbar goHome={goHome} />
        <ContainerWrapper>
          <div className="h-screen flex flex-col-reverse">
            <div>
              <UserInput />
            </div>

            <section className="flex flex-col-reverse h-[68vh]">
              <div className="pb-8 overflow-y-scroll flex flex-col gap-8 no-scrollbar">
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
