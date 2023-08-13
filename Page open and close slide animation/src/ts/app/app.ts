import { openNewPageEvent } from "../common/events";

/**
 * 
 * App
 * 
 */
export class App {
    // unique app name 
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    /**
     * 
     * basic app skeleton
     * 
     * @returns {HTMLElement}
     * 
     */
    private get skeleton(): HTMLElement {
        const app = document.createElement('main');
        app.id = this.id;
        app.className = 'app';

        // append page button
        app.appendChild(this.openPageButton);

        return app;
    }

    /**
     * 
     * button to open new page
     * 
     * @returns {HTMLButtonElement}
     * 
     */
    get openPageButton(): HTMLButtonElement {
        const button = document.createElement('button');
        button.className = 'open-page-btn';
        button.innerText = 'Open New Page';

        // add click event listener
        button.addEventListener('click', () => {
            console.log(`opening new page - app name -> ${this.name}`);
            window.dispatchEvent(openNewPageEvent);
        })

        return button;
    }

    /**
     * 
     * unique app id
     * 
     * @returns {string}
     * 
     */
    get id(): string {
        return `app-${this.name}`
    }

    /**
     * 
     * querySelect for app
     * 
     * @returns {HTMLElement} 
     * 
     */
    get element(): HTMLElement {
        return document.getElementById(this.id)!;
    }

    /**
     * 
     * append app skeleton into dom body
     * 
     */
    build() {
        document.body.appendChild(this.skeleton)
    }
}