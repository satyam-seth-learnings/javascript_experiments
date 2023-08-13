(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const events_1 = require("../common/events");
/**
 *
 * App
 *
 */
class App {
    constructor(name) {
        this.name = name;
    }
    /**
     *
     * basic app skeleton
     *
     * @returns {HTMLElement}
     *
     */
    get skeleton() {
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
    get openPageButton() {
        const button = document.createElement('button');
        button.className = 'open-page-btn';
        button.innerText = 'Open New Page';
        // add click event listener
        button.addEventListener('click', () => {
            console.log(`opening new page - app name -> ${this.name}`);
            window.dispatchEvent(events_1.openNewPageEvent);
        });
        return button;
    }
    /**
     *
     * unique app id
     *
     * @returns {string}
     *
     */
    get id() {
        return `app-${this.name}`;
    }
    /**
     *
     * querySelect for app
     *
     * @returns {HTMLElement}
     *
     */
    get element() {
        return document.getElementById(this.id);
    }
    /**
     *
     * append app skeleton into dom body
     *
     */
    build() {
        document.body.appendChild(this.skeleton);
    }
}
exports.App = App;

},{"../common/events":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openNewPageEvent = exports.OPEN_NEW_PAGE_EVENT = void 0;
// event name for open new page
exports.OPEN_NEW_PAGE_EVENT = 'open-new-page-event';
// event to open new page
exports.openNewPageEvent = new Event(exports.OPEN_NEW_PAGE_EVENT);

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const page_1 = require("../layout/page");
/**
 *
 * Utilities
 *
 */
class Utils {
    /**
     *
     * generate unique namespace string for given length
     *
     * @param length {number} - length of namespace
     *
     * @returns {string}
     */
    static makeRandomNamespace(length) {
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
    static buildPage(parentElement) {
        const namespace = Utils.makeRandomNamespace(10);
        const page = new page_1.Page({ namespace });
        page.build(parentElement);
    }
}
exports.Utils = Utils;

},{"../layout/page":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
const events_1 = require("../common/events");
/**
 *
 * Page
 *
 */
class Page {
    constructor(config) {
        this.config = config;
    }
    /**
     *
     * page skeleton
     *
     * @returns {HTMLDivElement}
     *
     */
    skeleton() {
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
    get contentContainer() {
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
    get emptyContainer() {
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
    get content() {
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
    get openPageButton() {
        const button = document.createElement('button');
        button.className = 'open-page-btn';
        button.innerText = 'Open New Page';
        // add click event listener
        button.addEventListener('click', () => {
            console.log(`opening new page - namespace -> ${this.config.namespace}`);
            window.dispatchEvent(events_1.openNewPageEvent);
        });
        return button;
    }
    /**
     *
     * button to close current page
     *
     * @returns {HTMLButtonElement}
     *
     */
    get closePageButton() {
        const button = document.createElement('button');
        button.className = 'close-page-btn';
        button.innerText = 'Close This Page';
        // add click event listener
        button.addEventListener('click', () => {
            console.log(`closing current page - namespace -> ${this.config.namespace}`);
            this.pageCloseHandler();
        });
        return button;
    }
    /**
     *
     * Unique id for page
     *
     * @returns {string}
     *
     */
    get id() {
        return `page-${this.config.namespace}`;
    }
    /**
     *
     * querySelect for app
     *
     * @returns {HTMLElement}
     *
     */
    get element() {
        return document.getElementById(this.id);
    }
    /**
     *
     * Remove page skeleton from dom
     *
     */
    destroy() {
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
        contentContainer === null || contentContainer === void 0 ? void 0 : contentContainer.classList.add('slide-out');
        // remove page from dom after slide out animation complete
        contentContainer === null || contentContainer === void 0 ? void 0 : contentContainer.addEventListener('animationend', () => {
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
    build(parentElement) {
        parentElement.appendChild(this.skeleton());
    }
}
exports.Page = Page;

},{"../common/events":2}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app/app");
const utils_1 = require("./common/utils");
const events_1 = require("./common/events");
window.onload = () => {
    // build app
    const app = new app_1.App('demo');
    app.build();
    // Add event to open page
    window.addEventListener(events_1.OPEN_NEW_PAGE_EVENT, () => utils_1.Utils.buildPage(app.element));
};

},{"./app/app":1,"./common/events":2,"./common/utils":3}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdHMvYXBwL2FwcC50cyIsInNyYy90cy9jb21tb24vZXZlbnRzLnRzIiwic3JjL3RzL2NvbW1vbi91dGlscy50cyIsInNyYy90cy9sYXlvdXQvcGFnZS50cyIsInNyYy90cy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQUEsNkNBQW9EO0FBRXBEOzs7O0dBSUc7QUFDSCxNQUFhLEdBQUc7SUFJWixZQUFZLElBQVk7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILElBQVksUUFBUTtRQUNoQixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNqQixHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUV0QixxQkFBcUI7UUFDckIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFckMsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsSUFBSSxjQUFjO1FBQ2QsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQztRQUNuQyxNQUFNLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQztRQUVuQywyQkFBMkI7UUFDM0IsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDM0QsTUFBTSxDQUFDLGFBQWEsQ0FBQyx5QkFBZ0IsQ0FBQyxDQUFDO1FB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UUFFN0MsMERBQTBEO1FBQzFELGdCQUFnQixhQUFoQixnQkFBZ0IsdUJBQWhCLGdCQUFnQixDQUFFLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUU7WUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxhQUEwQjtRQUM1QixhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Q0FDSjtBQXhMRCxvQkF3TEM7Ozs7O0FDaE1ELG1DQUFnQztBQUNoQywwQ0FBdUM7QUFDdkMsNENBQXNEO0FBRXRELE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO0lBQ2pCLFlBQVk7SUFDWixNQUFNLEdBQUcsR0FBRyxJQUFJLFNBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QixHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7SUFFWix5QkFBeUI7SUFDekIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLDRCQUFtQixFQUFFLEdBQUcsRUFBRSxDQUFDLGFBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDckYsQ0FBQyxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgb3Blbk5ld1BhZ2VFdmVudCB9IGZyb20gXCIuLi9jb21tb24vZXZlbnRzXCI7XHJcblxyXG4vKipcclxuICogXHJcbiAqIEFwcFxyXG4gKiBcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBcHAge1xyXG4gICAgLy8gdW5pcXVlIGFwcCBuYW1lIFxyXG4gICAgcHJpdmF0ZSBuYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogYmFzaWMgYXBwIHNrZWxldG9uXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH1cclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldCBza2VsZXRvbigpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgY29uc3QgYXBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWFpbicpO1xyXG4gICAgICAgIGFwcC5pZCA9IHRoaXMuaWQ7XHJcbiAgICAgICAgYXBwLmNsYXNzTmFtZSA9ICdhcHAnO1xyXG5cclxuICAgICAgICAvLyBhcHBlbmQgcGFnZSBidXR0b25cclxuICAgICAgICBhcHAuYXBwZW5kQ2hpbGQodGhpcy5vcGVuUGFnZUJ1dHRvbik7XHJcblxyXG4gICAgICAgIHJldHVybiBhcHA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIGJ1dHRvbiB0byBvcGVuIG5ldyBwYWdlXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIHtIVE1MQnV0dG9uRWxlbWVudH1cclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBnZXQgb3BlblBhZ2VCdXR0b24oKTogSFRNTEJ1dHRvbkVsZW1lbnQge1xyXG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGJ1dHRvbi5jbGFzc05hbWUgPSAnb3Blbi1wYWdlLWJ0bic7XHJcbiAgICAgICAgYnV0dG9uLmlubmVyVGV4dCA9ICdPcGVuIE5ldyBQYWdlJztcclxuXHJcbiAgICAgICAgLy8gYWRkIGNsaWNrIGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgb3BlbmluZyBuZXcgcGFnZSAtIGFwcCBuYW1lIC0+ICR7dGhpcy5uYW1lfWApO1xyXG4gICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChvcGVuTmV3UGFnZUV2ZW50KTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gYnV0dG9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiB1bmlxdWUgYXBwIGlkXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgZ2V0IGlkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGBhcHAtJHt0aGlzLm5hbWV9YFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBxdWVyeVNlbGVjdCBmb3IgYXBwXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgZ2V0IGVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKSE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIGFwcGVuZCBhcHAgc2tlbGV0b24gaW50byBkb20gYm9keVxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGJ1aWxkKCkge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5za2VsZXRvbilcclxuICAgIH1cclxufSIsIi8vIGV2ZW50IG5hbWUgZm9yIG9wZW4gbmV3IHBhZ2VcclxuZXhwb3J0IGNvbnN0IE9QRU5fTkVXX1BBR0VfRVZFTlQgPSAnb3Blbi1uZXctcGFnZS1ldmVudCc7XHJcblxyXG4vLyBldmVudCB0byBvcGVuIG5ldyBwYWdlXHJcbmV4cG9ydCBjb25zdCBvcGVuTmV3UGFnZUV2ZW50ID0gbmV3IEV2ZW50KE9QRU5fTkVXX1BBR0VfRVZFTlQpOyIsImltcG9ydCB7IFBhZ2UgfSBmcm9tIFwiLi4vbGF5b3V0L3BhZ2VcIjtcclxuXHJcbi8qKlxyXG4gKiBcclxuICogVXRpbGl0aWVzXHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFV0aWxzIHtcclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBnZW5lcmF0ZSB1bmlxdWUgbmFtZXNwYWNlIHN0cmluZyBmb3IgZ2l2ZW4gbGVuZ3RoXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBsZW5ndGgge251bWJlcn0gLSBsZW5ndGggb2YgbmFtZXNwYWNlXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBtYWtlUmFuZG9tTmFtZXNwYWNlKGxlbmd0aDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XHJcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG4gICAgICAgIGNvbnN0IGNoYXJhY3RlcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xyXG4gICAgICAgIGNvbnN0IGNoYXJhY3RlcnNMZW5ndGggPSBjaGFyYWN0ZXJzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgd2hpbGUgKGNvdW50ZXIgPCBsZW5ndGgpIHtcclxuICAgICAgICAgICAgcmVzdWx0ICs9IGNoYXJhY3RlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnNMZW5ndGgpKTtcclxuICAgICAgICAgICAgY291bnRlciArPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBidWlsZCBuZXcgcGFnZVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gcGFyZW50RWxlbWVudCB7SFRNTEVsZW1lbnR9IC0gcGFyZW50IGVsZW1lbnQgZm9yIGJ1aWxkXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGJ1aWxkUGFnZShwYXJlbnRFbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG5hbWVzcGFjZSA9IFV0aWxzLm1ha2VSYW5kb21OYW1lc3BhY2UoMTApO1xyXG4gICAgICAgIGNvbnN0IHBhZ2UgPSBuZXcgUGFnZSh7IG5hbWVzcGFjZSB9KTtcclxuICAgICAgICBwYWdlLmJ1aWxkKHBhcmVudEVsZW1lbnQpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgb3Blbk5ld1BhZ2VFdmVudCB9IGZyb20gXCIuLi9jb21tb24vZXZlbnRzXCI7XHJcbmltcG9ydCB7IFBhZ2VDb25maWcgfSBmcm9tIFwiLi90eXBlXCI7XHJcblxyXG4vKipcclxuICogXHJcbiAqIFBhZ2UgXHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFBhZ2Uge1xyXG4gICAgLy8gcGFnZSBjb25maWd1cmF0aW9uXHJcbiAgICBwcml2YXRlIGNvbmZpZzogUGFnZUNvbmZpZztcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBQYWdlQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIHBhZ2Ugc2tlbGV0b25cclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMge0hUTUxEaXZFbGVtZW50fVxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2tlbGV0b24oKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIGNvbnN0IHBhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBwYWdlLmlkID0gdGhpcy5pZDtcclxuICAgICAgICBwYWdlLmNsYXNzTmFtZSA9ICdwYWdlJztcclxuXHJcbiAgICAgICAgLy8gYXBwZW5kIGVtcHR5IGNvbnRhaW5lclxyXG4gICAgICAgIHBhZ2UuYXBwZW5kQ2hpbGQodGhpcy5lbXB0eUNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIC8vIGFwcGVuZCBjb250ZW50IGNvbnRhaW5lclxyXG4gICAgICAgIHBhZ2UuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50Q29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIENvbnRlbnQgY29udGFpbmVyXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIHtIVE1MRGl2RWxlbWVudH1cclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldCBjb250ZW50Q29udGFpbmVyKCk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgICAgICBjb25zdCBjb250ZW50Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgICAgIC8vIGFwcGx5IHNsaWRlLWluIGNsYXNzIGZvciBvcGVuaW5nIGFuaW1hdGlvblxyXG4gICAgICAgIGNvbnRlbnRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgncGFnZV9fY29udGVudC1jb250YWluZXInLCAnc2xpZGUtaW4nKTtcclxuXHJcbiAgICAgICAgLy8gYXBwZW5kIGNvbnRlbnRcclxuICAgICAgICBjb250ZW50Q29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuY29udGVudCk7XHJcblxyXG4gICAgICAgIC8vIGFwcGVuZCBvcGVuIHBhZ2UgYnV0dG9uXHJcbiAgICAgICAgY29udGVudENvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLm9wZW5QYWdlQnV0dG9uKTtcclxuXHJcbiAgICAgICAgLy8gYXBwZW5kIGNsb3NlIHBhZ2UgYnV0dG9uXHJcbiAgICAgICAgY29udGVudENvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmNsb3NlUGFnZUJ1dHRvbik7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250ZW50Q29udGFpbmVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBFbXB0eSBjb250YWluZXIgZm9yIG92ZXJsYXkgZWZmZWN0XHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIHtIVE1MRGl2RWxlbWVudH1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXQgZW1wdHlDb250YWluZXIoKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIGNvbnN0IGVtcHR5Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgZW1wdHlDb250YWluZXIuY2xhc3NOYW1lID0gJ3BhZ2VfX2VtcHR5LWNvbnRhaW5lcic7XHJcbiAgICAgICAgcmV0dXJuIGVtcHR5Q29udGFpbmVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBjb250ZW50IHNob3cgcGFnZSBuYW1lXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIHtIVE1MUGFyYWdyYXBoRWxlbWVudH1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXQgY29udGVudCgpOiBIVE1MUGFyYWdyYXBoRWxlbWVudCB7XHJcbiAgICAgICAgY29uc3QgY29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgY29udGVudEVsZW1lbnQuY2xhc3NOYW1lID0gJ3BhZ2VfX2NvbnRlbnQnO1xyXG4gICAgICAgIGNvbnRlbnRFbGVtZW50LmlubmVyVGV4dCA9IGBQYWdlIC0gJHt0aGlzLmNvbmZpZy5uYW1lc3BhY2V9YDtcclxuICAgICAgICByZXR1cm4gY29udGVudEVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIGJ1dHRvbiB0byBvcGVuIG5ldyBwYWdlXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIHtIVE1MQnV0dG9uRWxlbWVudH1cclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBnZXQgb3BlblBhZ2VCdXR0b24oKTogSFRNTEJ1dHRvbkVsZW1lbnQge1xyXG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGJ1dHRvbi5jbGFzc05hbWUgPSAnb3Blbi1wYWdlLWJ0bic7XHJcbiAgICAgICAgYnV0dG9uLmlubmVyVGV4dCA9ICdPcGVuIE5ldyBQYWdlJztcclxuXHJcbiAgICAgICAgLy8gYWRkIGNsaWNrIGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgb3BlbmluZyBuZXcgcGFnZSAtIG5hbWVzcGFjZSAtPiAke3RoaXMuY29uZmlnLm5hbWVzcGFjZX1gKTtcclxuICAgICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQob3Blbk5ld1BhZ2VFdmVudCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIGJ1dHRvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogYnV0dG9uIHRvIGNsb3NlIGN1cnJlbnQgcGFnZVxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJucyB7SFRNTEJ1dHRvbkVsZW1lbnR9XHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgZ2V0IGNsb3NlUGFnZUJ1dHRvbigpOiBIVE1MQnV0dG9uRWxlbWVudCB7XHJcbiAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgYnV0dG9uLmNsYXNzTmFtZSA9ICdjbG9zZS1wYWdlLWJ0bic7XHJcbiAgICAgICAgYnV0dG9uLmlubmVyVGV4dCA9ICdDbG9zZSBUaGlzIFBhZ2UnO1xyXG5cclxuICAgICAgICAvLyBhZGQgY2xpY2sgZXZlbnQgbGlzdGVuZXJcclxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBjbG9zaW5nIGN1cnJlbnQgcGFnZSAtIG5hbWVzcGFjZSAtPiAke3RoaXMuY29uZmlnLm5hbWVzcGFjZX1gKTtcclxuICAgICAgICAgICAgdGhpcy5wYWdlQ2xvc2VIYW5kbGVyKCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIGJ1dHRvbjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIFVuaXF1ZSBpZCBmb3IgcGFnZVxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGdldCBpZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgcGFnZS0ke3RoaXMuY29uZmlnLm5hbWVzcGFjZX1gO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBxdWVyeVNlbGVjdCBmb3IgYXBwXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgZ2V0IGVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKSE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIFJlbW92ZSBwYWdlIHNrZWxldG9uIGZyb20gZG9tXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdoZWxsbycpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQWRkIHNsaWRlIG91dCBhbmltYXRpb24gb24gY29udGVudCBjb250YWluZXJcclxuICAgICAqIEFuZCByZW1vdmUgcGFnZSBza2VsZXRvbiBmcm9tIGRvbSBvbmNlIGFuaW1hdGlvbiBpcyBjb21wbGV0ZWRcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBwYWdlQ2xvc2VIYW5kbGVyKCkge1xyXG4gICAgICAgIC8vIHNlbGVjdGluZyBjb250ZW50IGNvbnRhaW5lclxyXG4gICAgICAgIGNvbnN0IGNvbnRlbnRDb250YWluZXIgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2VfX2NvbnRlbnQtY29udGFpbmVyJyk7XHJcblxyXG4gICAgICAgIC8vIGFwcGx5IHNpZGxlLW91dCBjbGFzcyBmb3IgY2xvc2luZyBhbmltYXRpb25cclxuICAgICAgICBjb250ZW50Q29udGFpbmVyPy5jbGFzc0xpc3QuYWRkKCdzbGlkZS1vdXQnKTtcclxuXHJcbiAgICAgICAgLy8gcmVtb3ZlIHBhZ2UgZnJvbSBkb20gYWZ0ZXIgc2xpZGUgb3V0IGFuaW1hdGlvbiBjb21wbGV0ZVxyXG4gICAgICAgIGNvbnRlbnRDb250YWluZXI/LmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Nsb3NpbmcgYW5pbWF0aW9uIGNvbXBsZXRlZCByZW1vdmluZyBwYWdlIGZyb20gZG9tJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBBcHBlbmQgY3VycmVudCBwYWdlIHNrZWxldG9uIGludG8gcGFyZW50IGVsZW1lbnQgXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBwYXJlbnRFbGVtZW50IHtIVE1MRWxlbWVudH1cclxuICAgICAqL1xyXG4gICAgYnVpbGQocGFyZW50RWxlbWVudDogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICBwYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc2tlbGV0b24oKSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBBcHAgfSBmcm9tIFwiLi9hcHAvYXBwXCI7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIi4vY29tbW9uL3V0aWxzXCI7XHJcbmltcG9ydCB7IE9QRU5fTkVXX1BBR0VfRVZFTlQgfSBmcm9tIFwiLi9jb21tb24vZXZlbnRzXCI7XHJcblxyXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xyXG4gICAgLy8gYnVpbGQgYXBwXHJcbiAgICBjb25zdCBhcHAgPSBuZXcgQXBwKCdkZW1vJyk7XHJcbiAgICBhcHAuYnVpbGQoKTtcclxuXHJcbiAgICAvLyBBZGQgZXZlbnQgdG8gb3BlbiBwYWdlXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihPUEVOX05FV19QQUdFX0VWRU5ULCAoKSA9PiBVdGlscy5idWlsZFBhZ2UoYXBwLmVsZW1lbnQpKTtcclxufSJdfQ==
