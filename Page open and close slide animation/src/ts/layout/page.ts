import { openNewPageEvent } from "../common/events";
import { PageConfig } from "./type";

/**
 * 
 * Page 
 * 
 */
export class Page {
    // page configuration
    private config: PageConfig;


    constructor(config: PageConfig) {
        this.config = config;
    }

    /**
     * 
     * page skeleton
     * 
     * @returns {HTMLDivElement}
     * 
     */
    private skeleton(): HTMLDivElement {
        const page = document.createElement('div');
        page.id = this.id;
        page.className = 'page';

        // append empty container
        page.appendChild(this.emptyContainer);

        // append content container
        page.appendChild(this.contentContainer);

        return page;
    }

    /**
     * 
     * Content container
     * 
     * @returns {HTMLDivElement}
     * 
     */
    private get contentContainer(): HTMLDivElement {
        const contentContainer = document.createElement('div');

        // apply slide-in class for opening animation
        contentContainer.classList.add('page__content-container', 'slide-in');

        // append content
        contentContainer.appendChild(this.content);

        // append open page button
        contentContainer.appendChild(this.openPageButton);

        // append close page button
        contentContainer.appendChild(this.closePageButton);

        return contentContainer;
    }

    /**
     * 
     * Empty container for overlay effect
     * 
     * @returns {HTMLDivElement}
     */
    private get emptyContainer(): HTMLDivElement {
        const emptyContainer = document.createElement('div');
        emptyContainer.className = 'page__empty-container';
        return emptyContainer;
    }

    /**
     * 
     * content show page name
     * 
     * @returns {HTMLParagraphElement}
     */
    private get content(): HTMLParagraphElement {
        const contentElement = document.createElement('p');
        contentElement.className = 'page__content';
        contentElement.innerText = `Page - ${this.config.namespace}`;
        return contentElement;
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
            console.log(`opening new page - namespace -> ${this.config.namespace}`);
            window.dispatchEvent(openNewPageEvent);
        })

        return button;
    }

    /**
     * 
     * button to close current page
     * 
     * @returns {HTMLButtonElement}
     * 
     */
    get closePageButton(): HTMLButtonElement {
        const button = document.createElement('button');
        button.className = 'close-page-btn';
        button.innerText = 'Close This Page';

        // add click event listener
        button.addEventListener('click', () => {
            console.log(`closing current page - namespace -> ${this.config.namespace}`);
            this.pageCloseHandler();
        })

        return button;
    }


    /**
     * 
     * Unique id for page
     * 
     * @returns {string}
     * 
     */
    get id(): string {
        return `page-${this.config.namespace}`;
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
     * Remove page skeleton from dom
     * 
     */
    private destroy(): void {
        console.log('hello');
        this.element.remove();
    }

    /**
     * 
     * Add slide out animation on content container
     * And remove page skeleton from dom once animation is completed
     * 
     */
    pageCloseHandler() {
        // selecting content container
        const contentContainer = this.element.querySelector('.page__content-container');

        // apply sidle-out class for closing animation
        contentContainer?.classList.add('slide-out');

        // remove page from dom after slide out animation complete
        contentContainer?.addEventListener('animationend', () => {
            console.log('closing animation completed removing page from dom');
            this.destroy();
        });
    }

    /**
     * 
     * Append current page skeleton into parent element 
     * 
     * @param parentElement {HTMLElement}
     */
    build(parentElement: HTMLElement) {
        parentElement.appendChild(this.skeleton());
    }
}