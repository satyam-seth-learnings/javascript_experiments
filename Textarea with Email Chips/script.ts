class TextAreaInputContainer {
  textAreaId = "email-input";
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

  resetChipsContainer() {
    const chipsContainer = document.querySelector(
      ".chips-container"
    )! as HTMLElement;
    chipsContainer.innerHTML = "";
  }

  resetTextAreaElementValue() {
    const textAreaElement = document.getElementById(
      this.textAreaId
    )! as HTMLTextAreaElement;
    textAreaElement.value = "";
  }

  getTextAreaElementValue() {
    const textAreaElement = document.getElementById(
      this.textAreaId
    )! as HTMLTextAreaElement;
    return textAreaElement.value.trim();
  }

  appendEmailChip(email: string) {
    const chipsContainer = document.querySelector(".chips-container")!;
    chipsContainer.appendChild(this.getChipElement(email));
  }

  handlePaste = (event: any) => {
    event.preventDefault();

    const paste = event.clipboardData.getData("text");
    const emails: string[] = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      const toBeAdded = emails.filter((email) => !this.isInList(email));
      this.items = [...this.items, ...toBeAdded];
      this.resetChipsContainer();
      this.items.forEach((email) => this.appendEmailChip(email));
    }
  };

  handleKeyDown = (event: any) => {
    if (["Enter", "Tab", ",", " "].includes(event.key)) {
      event.preventDefault();

      const value = this.getTextAreaElementValue();

      if (value && this.isValid(value)) {
        this.items = [...this.items, value];
        this.appendEmailChip(value);
        this.resetTextAreaElementValue();
      }
    }
  };

  ///// skeletons

  getChipElement(email: string): HTMLDivElement {
    const chipContainer = document.createElement("div");
    chipContainer.innerText = email;

    const removeButton = document.createElement("button");
    removeButton.innerText = "x";

    // Add click event listener
    removeButton.onclick = (e: any) => {
      e.target.parentElement.remove();
      this.handleDelete(email);
    };

    chipContainer.appendChild(removeButton);

    return chipContainer;
  }

  getTextAreaElement() {
    const textAreaInputElement = document.createElement("textarea");
    textAreaInputElement.id = this.textAreaId;

    textAreaInputElement.onpaste = this.handlePaste;
    // textAreaInputElement.onchange = this.handleChange;
    textAreaInputElement.onkeydown = this.handleKeyDown;

    return textAreaInputElement;
  }

  getChipsContainer() {
    const chipsContainer = document.createElement("div");
    chipsContainer.className = "chips-container";
    return chipsContainer;
  }

  getErrorTextElement() {
    const errorElement = document.createElement("p");
    errorElement.className = "error-text";
    return errorElement;
  }

  getLabelElement() {
    const labelElement = document.createElement("label");
    labelElement.setAttribute("for", this.textAreaId);

    labelElement.appendChild(this.getChipsContainer());
    labelElement.appendChild(this.getTextAreaElement());
    labelElement.appendChild(this.getErrorTextElement());

    return labelElement;
  }

  skeleton() {
    return this.getLabelElement();
  }
}

window.onload = function () {
  const textAreaInputContainer = new TextAreaInputContainer();

  const mainElement = document.querySelector("main")!;
  mainElement.appendChild(textAreaInputContainer.skeleton());
};
