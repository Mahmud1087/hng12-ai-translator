import { useRef, useState, useEffect } from "react";
import AppContext from "./app-context";

const AppProvider = ({ children }) => {
  const [detectedLanguage, setDetectedLanguage] = useState(
    localStorage.getItem("detectedLanguage") || ""
  );
  const [confidence, setConfidence] = useState("");
  const [translatedText, setTranslatedText] = useState(
    localStorage.getItem("translatedText") || ""
  );
  const [isTranslationSupported, setIsTranslationSupported] = useState(false);
  const [detector, setDetector] = useState(null);
  const [summarizedText, setSummarizedText] = useState(
    localStorage.getItem("summarizedText") || ""
  );
  const [userOutput, setUserOutput] = useState(
    localStorage.getItem("userOutput") || ""
  );

  // Refs for scroll to view
  const translateRef = useRef(null);
  const summarizeRef = useRef(null);

  // Loading states
  const [isDetectingLanguage, setIsDetectingLanguage] = useState(false);
  const [isTranslatingLanguage, setIsTranslatingLanguage] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isCheckingTranslationSupport, setIsCheckingTranslationSupport] =
    useState(false);

  useEffect(() => {
    localStorage.setItem("translatedText", translatedText);
    localStorage.setItem("summarizedText", summarizedText);
    localStorage.setItem("userOutput", userOutput);
    localStorage.setItem("detectedLanguage", detectedLanguage);
  }, [translatedText, summarizedText, userOutput, detectedLanguage]);

  // Clear Chat
  const clearChat = () => {
    setTranslatedText("");
    setSummarizedText("");
    setUserOutput("");
    setDetectedLanguage("");

    localStorage.removeItem("translatedText");
    localStorage.removeItem("summarizedText");
    localStorage.removeItem("userOutput");
    localStorage.removeItem("detectedLanguage");
  };

  // Scroll to output section
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <AppContext.Provider
      value={{
        detectedLanguage,
        confidence,
        translatedText,
        isTranslationSupported,
        detector,
        summarizedText,
        isSummarizing,
        isTranslatingLanguage,
        isDetectingLanguage,
        userOutput,
        translateRef,
        summarizeRef,
        isCheckingTranslationSupport,
        setIsCheckingTranslationSupport,
        scrollToSection,
        setUserOutput,
        clearChat,
        setIsDetectingLanguage,
        setIsSummarizing,
        setIsTranslatingLanguage,
        setDetectedLanguage,
        setConfidence,
        setTranslatedText,
        setIsTranslationSupported,
        setDetector,
        setSummarizedText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
