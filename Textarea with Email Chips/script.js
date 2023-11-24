class TextAreaInputContainer {
    constructor() {
        this.textAreaId = "email-input";
        this.items = [];
        this.handleDelete = (email) => {
            this.items = this.items.filter((i) => i !== email);
        };
        this.handlePaste = (event) => {
            event.preventDefault();
            const paste = event.clipboardData.getData("text");
            const emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);
            if (emails) {
                const toBeAdded = emails.filter((email) => !this.isInList(email));
                this.items = [...this.items, ...toBeAdded];
                this.resetChipsContainer();
                this.items.forEach((email) => this.appendEmailChip(email));
            }
        };
        this.handleKeyDown = (event) => {
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
    }
    ///// handlers
    isInList(email) {
        return this.items.includes(email);
    }
    isEmail(email) {
        return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
    }
    isValid(email) {
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
    setErrorText(text) {
        const errorTextElement = document.querySelector(".error-text");
        errorTextElement.innerText = text;
    }
    resetChipsContainer() {
        const chipsContainer = document.querySelector(".chips-container");
        chipsContainer.innerHTML = "";
    }
    resetTextAreaElementValue() {
        const textAreaElement = document.getElementById(this.textAreaId);
        textAreaElement.value = "";
    }
    getTextAreaElementValue() {
        const textAreaElement = document.getElementById(this.textAreaId);
        return textAreaElement.value.trim();
    }
    appendEmailChip(email) {
        const chipsContainer = document.querySelector(".chips-container");
        chipsContainer.appendChild(this.getChipElement(email));
    }
    ///// skeletons
    getChipElement(email) {
        const chipContainer = document.createElement("div");
        chipContainer.innerText = email;
        const removeButton = document.createElement("button");
        removeButton.innerText = "x";
        // Add click event listener
        removeButton.onclick = (e) => {
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
    const mainElement = document.querySelector("main");
    mainElement.appendChild(textAreaInputContainer.skeleton());
};
