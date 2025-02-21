import { useRef, useState } from "react";
import AppContext from "./app-context";

const AppProvider = ({ children }) => {
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [confidence, setConfidence] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslationSupported, setIsTranslationSupported] = useState(false);
  const [detector, setDetector] = useState(null);
  const [summarizedText, setSummarizedText] = useState("");
  const [userOutput, setUserOutput] = useState("");

  // Refs for scroll to view
  const translateRef = useRef(null);
  const summarizeRef = useRef(null);

  // Loading states
  const [isDetectingLanguage, setIsDetectingLanguage] = useState(false);
  const [isTranslatingLanguage, setIsTranslatingLanguage] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isCheckingTranslationSupport, setIsCheckingTranslationSupport] =
    useState(false);

  // Clear Chat
  const clearChat = () => {
    setTranslatedText("");
    setSummarizedText("");
    setUserOutput("");
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
