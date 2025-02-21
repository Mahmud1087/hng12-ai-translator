import React, { useContext, useState } from "react";
import useApis from "../use-apis";
import AppContext from "../context/app-context";
import { Button, Flex, Select } from "antd";
import { FaUser } from "react-icons/fa";

const languages = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "French", value: "fr" },
  { label: "Turkish", value: "tr" },
  { label: "Russian", value: "ru" },
];

const UserOutput = () => {
  const [selectedLang, setSelectedLang] = useState("en");
  const {
    detectedLanguage,
    isDetectingLanguage,
    userOutput,
    scrollToSection,
    summarizeRef,
    translateRef,
  } = useContext(AppContext);
  const { translatorAPI, summarizerAPI } = useApis();

  return (
    <>
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
                defaultValue={"en"}
                options={languages.map((lang) => ({
                  label: lang.label,
                  value: lang.value,
                }))}
                onChange={(val) => setSelectedLang(val)}
              />
              <Button
                type="primary"
                onClick={() => {
                  translatorAPI(userOutput, selectedLang);
                  scrollToSection(translateRef);
                }}
              >
                Translate
              </Button>
            </Flex>
            {userOutput.length >= 150 && detectedLanguage === "English" && (
              <Button
                className="mt-2"
                type="primary"
                onClick={() => {
                  scrollToSection(summarizeRef);
                  summarizerAPI(userOutput);
                }}
              >
                Summarize
              </Button>
            )}
          </div>
          <p className="text-xs text-orange-400">
            {isDetectingLanguage ? "detecting language..." : detectedLanguage}
          </p>
        </Flex>
        <div className="w-10 h-10 rounded-full bg-gray-50/60 flex items-center justify-center">
          <FaUser className="text-blue-950" />
        </div>
      </aside>
    </>
  );
};

export default UserOutput;
