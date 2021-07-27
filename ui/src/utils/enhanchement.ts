import {
  ENHANCE_CLASS,
  ENHANCE_ID,
  ENHANCE_NS,
  INPUT_CLASS,
  INSERT_POSITION,
} from "./constant";
import { v4 as uuidv4 } from "uuid";

export const enhance2InputBox = (myDocument: Document) => {
  const elements = myDocument.getElementsByClassName(
    INPUT_CLASS,
  ) as HTMLCollectionOf<HTMLElement>;
  for (let i = 0; i < elements.length; i++) {
    const enhanceId = uuidv4();
    const originalInput = elements[i];
    originalInput.insertAdjacentElement(
      INSERT_POSITION,
      createEnhancedInputBox(originalInput, myDocument, enhanceId),
    );
    originalInput.style.display = "none";
    originalInput.setAttributeNS(ENHANCE_NS, ENHANCE_ID, enhanceId);
  }
};

const createEnhancedInputBox = (
  originalInput: Element,
  myDocument: Document,
  enhanceId: string,
) => {
  const newInputBox = myDocument.createElement("input");
  newInputBox.defaultValue = originalInput.innerHTML;
  newInputBox.className = ENHANCE_CLASS;
  newInputBox.setAttributeNS(ENHANCE_NS, ENHANCE_ID, enhanceId);
  return newInputBox;
};

export const covertEnhancedToSpec = (myDocument: Document) => {
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
