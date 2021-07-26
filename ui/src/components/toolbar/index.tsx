import * as React from "react";
import { hot } from "react-hot-loader/root";
import { FC } from "react";
import "./style.scss";
import { Mode } from "../report";
import {
  ENHANCE_CLASS,
  ENHANCE_ID,
  ENHANCE_NS,
  HTML_CONTENT,
  IFRAME_ID,
} from "../../utils/constant";
import httpClient from "../../utils/httpClient";
import { toast } from "react-toastify";

interface ToolBarProps {
  name: string;
  mode: Mode;
  setMode: (mode: Mode) => unknown;
}

const covertEnhancedToSpec = (myDocument: Document) => {
  while (myDocument.getElementsByClassName(ENHANCE_CLASS).length) {
    const enhancedInput = myDocument.getElementsByClassName(
      ENHANCE_CLASS,
    )[0] as HTMLInputElement;
    const inputValue = enhancedInput.value;
    const enhanceId = enhancedInput.getAttributeNS(ENHANCE_NS, ENHANCE_ID);
    enhancedInput.remove();
    const original = myDocument.querySelector(
      `[${ENHANCE_ID}="${enhanceId}"]`,
    ) as HTMLElement;
    original.removeAttributeNS(ENHANCE_NS, ENHANCE_ID);
    original.innerHTML = inputValue;
    original.style.removeProperty("display");
  }
};

const ToolBar: FC<ToolBarProps> = ({ mode, setMode, name }) => {
  const modeConfig = {
    VIEW: {
      actionButton: {
        displayText: "Experiment",
        icon: "edit",
        onClick: () => setMode(Mode.EXPERIMENT),
      },
    },
    EXPERIMENT: {
      actionButton: {
        displayText: "Try it out",
        icon: "play_arrow",
        onClick: () => {
          setMode(Mode.VIEW);
          const iframeDoc = (
            document.getElementById(IFRAME_ID) as HTMLIFrameElement
          ).contentWindow?.document!;

          covertEnhancedToSpec(iframeDoc);

          httpClient
            .post(
              `/experiments/${name}`,
              iframeDoc.getElementsByTagName("html")[0].innerHTML,
              {
                headers: {
                  "Content-Type": HTML_CONTENT,
                },
              },
            )
            .then(() =>
              toast.success(
                "Your experiment has been triggered. It might takes some time to run this test, you'll able to see the report once it's finished.",
              ),
            )
            .catch((err) =>
              toast.error(`Unable to submit experiment due to ${err.message}`),
            );
        },
      },
    },
  };
  const { actionButton } = modeConfig[mode];

  return (
    <>
      <div className="toolbar" data-testid="toolbar">
        <button
          className="button"
          onClick={actionButton.onClick}
          data-testid={`actionButton-${Mode}`}
        >
          <div className="button-wrapper">
            <span className="material-icons icon">{actionButton.icon}</span>
            <span>{actionButton.displayText}</span>
          </div>
        </button>
      </div>
    </>
  );
};

export default hot(ToolBar);
