import { Page } from "../layout/page";

/**
 * 
 * Utilities
 * 
 */
export class Utils {
    /**
     * 
     * generate unique namespace string for given length
     * 
     * @param length {number} - length of namespace
     * 
     * @returns {string}
     */
    static makeRandomNamespace(length: number): string {
        let result = '';
        let counter = 0;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;

        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    /**
     * 
     * build new page
     * 
     * @param parentElement {HTMLElement} - parent element for build
     * 
     */
    static buildPage(parentElement: HTMLElement): void {
        const namespace = Utils.makeRandomNamespace(10);
        const page = new Page({ namespace });
        page.build(parentElement);
    }
}