import { Button, Form, Input } from "antd";
import { GrSend } from "react-icons/gr";
import useApis from "../use-apis";
import { useContext } from "react";
import AppContext from "../context/app-context";

const UserInput = () => {
  const [form] = Form.useForm();
  const {
    setTranslatedText,
    setSummarizedText,
    isDetectingLanguage,
    isSummarizing,
    isTranslatingLanguage,
    setUserOutput,
  } = useContext(AppContext);

  const { detectorAPI } = useApis();

  const handleTranslate = (values) => {
    detectorAPI(values.inputText);
    setUserOutput(values.inputText);
    setTranslatedText("");
    setSummarizedText("");
    form.resetFields();
  };

  return (
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
            className="disabled:cursor-not-allowed"
            disabled={
              isTranslatingLanguage || isDetectingLanguage || isSummarizing
            }
          >
            <GrSend className="text-white" />
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default UserInput;
