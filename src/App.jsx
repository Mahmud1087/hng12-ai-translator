import { useContext, useEffect, useRef, useState } from "react";
import AppContext from "./context/app-context";
import useApis from "./use-apis";
import Navbar from "./components/navbar";
import { Button, Flex, Form, Input, Select } from "antd";
import ContainerWrapper from "./components/container-wrapper";
import { GrSend } from "react-icons/gr";
import { FaRobot, FaUser } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";

const TranslatorApp = () => {
  const [form] = Form.useForm();
  const [userOutput, setUserOutput] = useState("");
  const [selectedLang, setSelectedLang] = useState("");

  const languages = [
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    { label: "Portuguese", value: "pt" },
    { label: "French", value: "fr" },
    { label: "Turkish", value: "tr" },
    { label: "Russian", value: "ru" },
  ];

  const {
    detectedLanguage,
    setDetector,
    isTranslationSupported,
    setIsTranslationSupported,
    translatedText,
    summarizedText,
    confidence,
    isTranslatingLanguage,
    isDetectingLanguage,
    isSummarizing,
  } = useContext(AppContext);

  const { translatorAPI, detectorAPI, summarizerAPI } = useApis();

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

  const handleTranslate = (values) => {
    // translatorAPI(inputRef.current.value, languageRef.current.value);
    detectorAPI(values.inputText);
    setUserOutput(values.inputText);
    console.log(values);
    // form.resetFields();
  };

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
          {/* <div className="absolute bottom-0 mb-4 w-[inherit] mx-auto"> */}
          <div className="h-screen flex flex-col-reverse">
            <Form form={form} onFinish={(values) => handleTranslate(values)}>
              <div className="relative">
                <Form.Item name="inputText">
                  <Input.TextArea
                    rows={5}
                    style={{
                      resize: "none",
                      // paddingRight: "3rem",
                    }}
                    placeholder="Insert text here..."
                  />
                </Form.Item>
                <div className="absolute right-0 bottom-0 p-2">
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    style={{
                      borderRadius: "50px",
                    }}
                  >
                    <GrSend />
                  </Button>
                </div>
              </div>
            </Form>

            <section className="flex flex-col-reverse h-[calc(60vh)]">
              <div className="mb-8 overflow-scroll flex flex-col gap-8">
                {/* User Output */}
                {userOutput && (
                  <aside className="w-full flex items-start gap-4 justify-end">
                    <Flex vertical gap={7} align="end">
                      <div className="w-[17rem] py-4 px-4 relative bg-white/80 text-black mt-3 rounded-lg md:w-[20rem] lg:w-[26rem]">
                        <p className="absolute -right-3 top-1 h-0 w-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[12px] border-gray-200/80"></p>
                        <p className="mb-3">{userOutput}</p>
                        <Flex gap={5}>
                          <Select
                            placeholder={detectedLanguage}
                            style={{
                              width: 110,
                            }}
                            options={languages.map((lang) => ({
                              label: lang.label,
                              value: lang.value,
                            }))}
                            onChange={(val) => setSelectedLang(val)}
                          />
                          <Button
                            type="primary"
                            onClick={() =>
                              translatorAPI(userOutput, selectedLang)
                            }
                          >
                            Translate
                          </Button>
                        </Flex>
                        {userOutput.length >= 150 &&
                          detectedLanguage === "English" && (
                            <Button className="mt-2" type="primary">
                              Summarize
                            </Button>
                          )}
                      </div>
                      <p className="text-xs text-orange-400">
                        {isDetectingLanguage
                          ? "detecting language..."
                          : detectedLanguage}
                      </p>
                    </Flex>
                    <div className="w-10 h-10 rounded-full bg-gray-50/60 flex items-center justify-center">
                      <FaUser className="text-blue-950" />
                    </div>
                  </aside>
                )}
                {/* Translated Text */}
                {isTranslatingLanguage && (
                  <Flex align="center" gap={7}>
                    <p>Translating</p>
                    <VscLoading className="animate-spin" />
                  </Flex>
                )}{" "}
                {translatedText && (
                  <aside className="w-full flex justify-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50/60 flex items-center justify-center">
                      <FaRobot className="text-blue-950" />
                    </div>
                    <Flex vertical gap={3}>
                      <div className="w-[17rem] py-4 px-4 relative bg-white/80 text-black mt-3 rounded-lg md:w-[20rem] lg:w-[26rem]">
                        <p className="absolute -left-3 top-1 h-0 w-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[12px] border-gray-200/80"></p>
                        <p>{translatedText}</p>
                      </div>
                      <p className="text-xs text-orange-400">Translated Text</p>
                    </Flex>
                  </aside>
                )}
                {/* Summarized Text */}
                {isSummarizing && (
                  <Flex align="center" gap={7}>
                    <p>Summarizing</p>
                    <VscLoading className="animate-spin" />
                  </Flex>
                )}{" "}
                {summarizedText && (
                  <aside className="w-full flex justify-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50/60 flex items-center justify-center">
                      <FaRobot className="text-blue-950" />
                    </div>
                    <Flex vertical gap={3}>
                      <div className="w-[17rem] py-4 px-4 relative bg-white/80 text-black mt-3 rounded-lg md:w-[20rem] lg:w-[26rem]">
                        <p className="absolute -left-3 top-1 h-0 w-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[12px] border-gray-200/80"></p>
                        <p>{summarizedText}</p>
                      </div>
                      <p className="text-xs text-orange-400">Summarized Text</p>
                    </Flex>
                  </aside>
                )}
              </div>
            </section>
          </div>
        </ContainerWrapper>
      </section>
    </>
  );
};

export default TranslatorApp;
