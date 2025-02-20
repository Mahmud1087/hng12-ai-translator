import { useEffect, useRef, useState } from "react";

const TranslatorApp = () => {
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [confidence, setConfidence] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslationSupported, setIsTranslationSupported] = useState(false);
  const [detector, setDetector] = useState(null);
  const [summarizedText, setSummarizedText] = useState("");

  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const languageRef = useRef(null);

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

  const detectLanguage = async () => {
    if (!detector || !inputRef.current.value.trim()) {
      setDetectedLanguage("Not sure what language this is");
      return;
    }

    try {
      const { detectedLanguage, confidence } = (
        await detector.detect(inputRef.current.value.trim())
      )[0];
      setDetectedLanguage(languageTagToHumanReadable(detectedLanguage, "en"));
      setConfidence(`${(confidence * 100).toFixed(1)}% sure`);
    } catch (error) {
      console.error("Detection error:", error);
    }
  };

  const handleSummarize = async (text) => {
    const options = {
      // sharedContext: 'This is a scientific article',
      type: "key-points",
      format: "markdown",
      length: "medium",
    };

    const available = (await self.ai.summarizer.capabilities()).available;
    try {
      let summarizer;
      if (available === "no") {
        alert("Summarizer not supported in this browser");
        return;
      }
      if (available === "readily") {
        summarizer = await self.ai.summarizer.create(options);
        const summary = await summarizer.summarize(text);
        setSummarizedText(summary);
      } else {
        summarizer = await self.ai.summarizer.create(options);
        const summary = await summarizer.summarize(text);
        setSummarizedText(summary);
        summarizer.addEventListener("downloadprogress", (e) => {
          console.log(e.loaded, e.total);
        });
        await summarizer.ready;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTranslate = async (e) => {
    e.preventDefault();

    const isDetectorAvailable = (await self.ai.languageDetector.capabilities())
      .available;
    if (!detector || isDetectorAvailable === "no") return;

    try {
      const sourceLanguage = (
        await detector.detect(inputRef.current.value.trim())
      )[0].detectedLanguage;

      if (
        detectedLanguage ===
          languageTagToHumanReadable(
            languageRef.current.value.trim(),
            detectedLanguage
          ) ||
        !["en", "es", "fr", "tr", "pt", "ru"].includes(sourceLanguage)
      ) {
        setTranslatedText(
          "Can only translate English ↔ Spanish and English ↔ Japanese."
        );
        return;
      }

      const translator = await self.ai.translator.create({
        sourceLanguage,
        targetLanguage: languageRef.current.value,
      });

      setTranslatedText(
        await translator.translate(inputRef.current.value.trim())
      );
    } catch (err) {
      // if (
      //   detectedLanguage ===
      //   languageTagToHumanReadable(
      //     languageRef.current.value.trim(),
      //     detectedLanguage
      //   )
      // ) {
      //   setTranslatedText(
      //     "Cannot Translate English to English. Please select a different language"
      //   );
      // } else {
      setTranslatedText("An error occurred. Please try again.");
      console.error(err.name, err.message);
      // }
    }
  };

  const languageTagToHumanReadable = (languageTag, targetLanguage) => {
    const displayNames = new Intl.DisplayNames([targetLanguage], {
      type: "language",
    });
    return displayNames.of(languageTag);
  };

  return (
    <div>
      {!isTranslationSupported && (
        <p className="not-supported-message">
          Translation is not supported on this browser.
        </p>
      )}

      {isTranslationSupported && (
        <form onSubmit={handleTranslate} style={{ visibility: "visible" }}>
          <textarea
            ref={inputRef}
            onInput={detectLanguage}
            placeholder="Type something..."
          />
          <p>
            {confidence} {detectedLanguage}
          </p>

          <select ref={languageRef}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="pt">Portuguese</option>
            <option value="tr">Turkish</option>
            <option value="ru">Russian</option>
          </select>

          <button type="submit">Translate</button>
        </form>
      )}

      <output ref={outputRef}>{translatedText}</output>
      <button onClick={() => handleSummarize(inputRef.current.value.trim())}>
        Summarize
      </button>
      <summary>{summarizedText}</summary>
    </div>
  );
};

export default TranslatorApp;
