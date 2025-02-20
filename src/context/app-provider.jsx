import { useState } from "react";
import AppContext from "./app-context";

const AppProvider = ({ children }) => {
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [confidence, setConfidence] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslationSupported, setIsTranslationSupported] = useState(false);
  const [detector, setDetector] = useState(null);
  const [summarizedText, setSummarizedText] = useState("");

  // Loading states
  const [isDetectingLanguage, setIsDetectingLanguage] = useState(false);
  const [isTranslatingLanguage, setIsTranslatingLanguage] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);

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
