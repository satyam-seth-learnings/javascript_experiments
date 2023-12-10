class InputContainer {
  inputId = "email-input";
  items: string[] = [];

  ///// handlers

  isInList(email: string) {
    return this.items.includes(email);
  }

  isEmail(email: string) {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  }

  handleDelete = (email: string) => {
    this.items = this.items.filter((i) => i !== email);
  };

  isValid(email: string) {
    let error = "";

    if (this.isInList(email)) {
      error = `${email} has already been added.`;
    }

    if (!this.isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }

    this.setErrorText(error);

    return error === "" ? true : false;
  }

  setErrorText(text: string) {
    const errorTextElement = document.querySelector(
      ".error-text"
    )! as HTMLElement;
    errorTextElement.innerText = text;
  }

  removeEmailChips() {
    const emailChips = document.querySelectorAll(".chip");
    emailChips.forEach((chip) => chip.remove());
  }

  clearInputElementValue() {
    const inputElement = document.getElementById(
      this.inputId
    )! as HTMLInputElement;
    inputElement.value = "";
  }

  getInputElementValue() {
    const inputElement = document.getElementById(
      this.inputId
    )! as HTMLInputElement;
    return inputElement.value.trim();
  }

  appendEmailChip(email: string) {
    const chipsContainer = document.querySelector("label")!;
    chipsContainer.appendChild(this.getChipElement(email));
  }

  handlePaste = (event: any) => {
    event.preventDefault();

    const paste = event.clipboardData.getData("text");
    const emails: string[] = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      const toBeAdded = emails.filter((email) => !this.isInList(email));
      this.items = [...this.items, ...toBeAdded];
      this.removeEmailChips();
      this.items.forEach((email) => this.appendEmailChip(email));
    }
  };

  handleKeyDown = (event: any) => {
    if (["Enter", "Tab", ",", " "].includes(event.key)) {
      event.preventDefault();

      const value = this.getInputElementValue();

      if (value && this.isValid(value)) {
        this.items = [...this.items, value];
        this.appendEmailChip(value);
        this.clearInputElementValue();
      }
    }
  };

  ///// skeletons

  getChipElement(email: string): HTMLDivElement {
    const chipElement = document.createElement("div");
    chipElement.className = "chip";

    const textElement = document.createElement("span");
    textElement.className = "text-element";
    textElement.innerText = email;

    const removeButton = document.createElement("button");
    removeButton.innerText = "x";

    // Add click event listener
    removeButton.onclick = (e: any) => {
      e.target.parentElement.remove();
      this.handleDelete(email);
    };

    chipElement.appendChild(textElement);
    chipElement.appendChild(removeButton);

    return chipElement;
  }

  getInputElement() {
    const inputElement = document.createElement("input");
    inputElement.type = "email";
    inputElement.id = this.inputId;

    inputElement.onpaste = this.handlePaste;
    inputElement.onkeydown = this.handleKeyDown;

    return inputElement;
  }

  getErrorTextElement() {
    const errorElement = document.createElement("p");
    errorElement.className = "error-text";
    return errorElement;
  }

  getLabelElement() {
    const labelElement = document.createElement("label");
    labelElement.setAttribute("for", this.inputId);

    labelElement.appendChild(this.getInputElement());

    return labelElement;
  }

  skeleton() {
    const inputContainer = document.createElement("div");
    inputContainer.className = "input-container";

    inputContainer.appendChild(this.getLabelElement());
    inputContainer.appendChild(this.getErrorTextElement());

    return inputContainer;
  }
}

window.onload = function () {
  const inputContainer = new InputContainer();

  const mainElement = document.querySelector("main")!;
  mainElement.appendChild(inputContainer.skeleton());
};
