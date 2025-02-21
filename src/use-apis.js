import { useContext } from "react";
import AppContext from "./context/app-context";
import { toast } from "react-toastify";

const useApis = () => {
  const {
    setDetectedLanguage,
    setConfidence,
    setSummarizedText,
    detector,
    detectedLanguage,
    setTranslatedText,
    setIsTranslatingLanguage,
    setIsDetectingLanguage,
    setIsSummarizing,
  } = useContext(AppContext);

  // Translator API
  const translatorAPI = async (textToTranslate, targetLang) => {
    const isDetectorAvailable = (await self.ai.languageDetector.capabilities())
      .available;
    if (!detector || isDetectorAvailable === "no") {
      toast.error("This browser is not supported yet, use chrome");
    }

    setIsTranslatingLanguage(true);
    try {
      const sourceLanguage = (await detector.detect(textToTranslate))[0]
        .detectedLanguage;

      if (
        detectedLanguage ===
          languageTagToHumanReadable(targetLang, detectedLanguage) ||
        !["en", "es", "fr", "tr", "pt", "ru"].includes(sourceLanguage)
      ) {
        toast.warn(
          "Cannot translate the same language, select a different language"
        );
        return;
      }

      const translator = await self.ai.translator.create({
        sourceLanguage,
        targetLanguage: targetLang,
      });

      setTranslatedText(await translator.translate(textToTranslate));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsTranslatingLanguage(false);
    }
  };

  // Language Detector
  const detectorAPI = async (textToDetect) => {
    if (!detector || !textToDetect) {
      setDetectedLanguage("Not sure what language this is");
      return;
    }
    setIsDetectingLanguage(true);
    try {
      const { detectedLanguage, confidence } = (
        await detector.detect(textToDetect)
      )[0];
      setDetectedLanguage(languageTagToHumanReadable(detectedLanguage, "en"));
      setConfidence(`${(confidence * 100).toFixed(1)}% sure`);
    } catch (error) {
      toast.error("Error detecting language");
      console.error("Detection error:", error);
    } finally {
      setIsDetectingLanguage(false);
    }
  };

  // Summarize API
  const summarizerAPI = async (textToSummarize) => {
    const options = {
      // sharedContext: 'This is a scientific article',
      type: "teaser",
      format: "markdown",
      length: "medium",
    };

    const available = (await self.ai.summarizer.capabilities()).available;
    setIsSummarizing(true);
    try {
      let summarizer;
      if (available === "no") {
        toast.error("Summarizer not supported in this browser");
        return;
      }
      if (available === "readily") {
        summarizer = await self.ai.summarizer.create(options);
        const summary = await summarizer.summarize(textToSummarize);
        setSummarizedText(summary);
      } else {
        summarizer = await self.ai.summarizer.create(options);
        const summary = await summarizer.summarize(textToSummarize);
        setSummarizedText(summary);
        summarizer.addEventListener("downloadprogress", (e) => {
          console.log(e.loaded, e.total);
        });
        await summarizer.ready;
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setIsSummarizing(false);
    }
  };

  const languageTagToHumanReadable = (languageTag, targetLanguage) => {
    const displayNames = new Intl.DisplayNames([targetLanguage], {
      type: "language",
    });
    return displayNames.of(languageTag);
  };

  return {
    detectorAPI,
    summarizerAPI,
    translatorAPI,
    languageTagToHumanReadable,
  };
};

export default useApis;
