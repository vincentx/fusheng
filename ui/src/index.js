const enhance2InputBox = () => {
  const elements = document.getElementsByClassName("variable");
  for (let i = 0; i < elements.length; i++) {
    const originalInput = elements[i];
    originalInput.insertAdjacentElement(
      "beforebegin",
      createEnhancedInputBox(originalInput)
    );
    originalInput.className = `${originalInput.className} enhanced`;
  }
};

const createEnhancedInputBox = (originalInput) => {
  const newInputBox = document.createElement("input");
  newInputBox.defaultValue = originalInput.innerHTML;
  newInputBox.attributes = originalInput.attributes;
  newInputBox.className = "enhance";
  return newInputBox;
};

const createExperimentButton = () => {
  const btn = document.createElement("button");
  btn.id = "experiment";
  btn.innerHTML = "Experiment";
  btn.onclick = () => {
    enhance2InputBox();
    btn.disabled = true;
    document.getElementById("back").disabled = false;
  };
  return btn;
};

const clearEnhancement = () => {
  while (true) {
    let element = document.getElementsByClassName("enhance")[0];
    if (!element) {
      break;
    }
    element.remove();
  }

  while (true) {
    let element = document.getElementsByClassName("enhanced")[0];
    if (!element) {
      break;
    }
    element.className = element.className.replace(" enhanced", "");
  }
};

const createBackButton = () => {
  const backBtn = document.createElement("button");
  backBtn.id = "back";
  backBtn.innerHTML = "Back";
  backBtn.disabled = true;
  backBtn.onclick = () => {
    clearEnhancement();
    document.getElementById("experiment").disabled = false;
    backBtn.disabled = false;
  };
  return backBtn;
};

const addExperimentButton = () => {
  document.body.appendChild(createExperimentButton());
  document.body.appendChild(createBackButton());
};

window.addEventListener("load", () => {
  addExperimentButton();
});
