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
        // append page button
        contentContainer.appendChild(this.openPageButton);
        return contentContainer;
    }
    /**
     *
     * Empty container to close the page
     *
     * @returns {HTMLDivElement}
     */
    get emptyContainer() {
        const emptyContainer = document.createElement('div');
        emptyContainer.className = 'page__empty-container';
        // add click event listener
        emptyContainer.addEventListener('click', () => {
            console.log(`closing current page - namespace -> ${this.config.namespace}`);
            this.pageCloseHandler();
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdHMvYXBwL2FwcC50cyIsInNyYy90cy9jb21tb24vZXZlbnRzLnRzIiwic3JjL3RzL2NvbW1vbi91dGlscy50cyIsInNyYy90cy9sYXlvdXQvcGFnZS50cyIsInNyYy90cy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQUEsNkNBQW9EO0FBRXBEOzs7O0dBSUc7QUFDSCxNQUFhLEdBQUc7SUFJWixZQUFZLElBQVk7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILElBQVksUUFBUTtRQUNoQixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNqQixHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUV0QixxQkFBcUI7UUFDckIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFckMsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsSUFBSSxjQUFjO1FBQ2QsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQztRQUNuQyxNQUFNLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQztRQUVuQywyQkFBMkI7UUFDM0IsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDM0QsTUFBTSxDQUFDLGFBQWEsQ0FBQyx5QkFBZ0IsQ0FBQyxDQUFDO1FB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SSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDL0MsQ0FBQztDQUNKO0FBdEtELG9CQXNLQzs7Ozs7QUM5S0QsbUNBQWdDO0FBQ2hDLDBDQUF1QztBQUN2Qyw0Q0FBc0Q7QUFFdEQsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7SUFDakIsWUFBWTtJQUNaLE1BQU0sR0FBRyxHQUFHLElBQUksU0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUVaLHlCQUF5QjtJQUN6QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsNEJBQW1CLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUNyRixDQUFDLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgeyBvcGVuTmV3UGFnZUV2ZW50IH0gZnJvbSBcIi4uL2NvbW1vbi9ldmVudHNcIjtcclxuXHJcbi8qKlxyXG4gKiBcclxuICogQXBwXHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFwcCB7XHJcbiAgICAvLyB1bmlxdWUgYXBwIG5hbWUgXHJcbiAgICBwcml2YXRlIG5hbWU6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBiYXNpYyBhcHAgc2tlbGV0b25cclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMge0hUTUxFbGVtZW50fVxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0IHNrZWxldG9uKCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICBjb25zdCBhcHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdtYWluJyk7XHJcbiAgICAgICAgYXBwLmlkID0gdGhpcy5pZDtcclxuICAgICAgICBhcHAuY2xhc3NOYW1lID0gJ2FwcCc7XHJcblxyXG4gICAgICAgIC8vIGFwcGVuZCBwYWdlIGJ1dHRvblxyXG4gICAgICAgIGFwcC5hcHBlbmRDaGlsZCh0aGlzLm9wZW5QYWdlQnV0dG9uKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFwcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogYnV0dG9uIHRvIG9wZW4gbmV3IHBhZ2VcclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMge0hUTUxCdXR0b25FbGVtZW50fVxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGdldCBvcGVuUGFnZUJ1dHRvbigpOiBIVE1MQnV0dG9uRWxlbWVudCB7XHJcbiAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgYnV0dG9uLmNsYXNzTmFtZSA9ICdvcGVuLXBhZ2UtYnRuJztcclxuICAgICAgICBidXR0b24uaW5uZXJUZXh0ID0gJ09wZW4gTmV3IFBhZ2UnO1xyXG5cclxuICAgICAgICAvLyBhZGQgY2xpY2sgZXZlbnQgbGlzdGVuZXJcclxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBvcGVuaW5nIG5ldyBwYWdlIC0gYXBwIG5hbWUgLT4gJHt0aGlzLm5hbWV9YCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG9wZW5OZXdQYWdlRXZlbnQpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiBidXR0b247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIHVuaXF1ZSBhcHAgaWRcclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBnZXQgaWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYGFwcC0ke3RoaXMubmFtZX1gXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIHF1ZXJ5U2VsZWN0IGZvciBhcHBcclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMge0hUTUxFbGVtZW50fSBcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBnZXQgZWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpITtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogYXBwZW5kIGFwcCBza2VsZXRvbiBpbnRvIGRvbSBib2R5XHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgYnVpbGQoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnNrZWxldG9uKVxyXG4gICAgfVxyXG59IiwiLy8gZXZlbnQgbmFtZSBmb3Igb3BlbiBuZXcgcGFnZVxyXG5leHBvcnQgY29uc3QgT1BFTl9ORVdfUEFHRV9FVkVOVCA9ICdvcGVuLW5ldy1wYWdlLWV2ZW50JztcclxuXHJcbi8vIGV2ZW50IHRvIG9wZW4gbmV3IHBhZ2VcclxuZXhwb3J0IGNvbnN0IG9wZW5OZXdQYWdlRXZlbnQgPSBuZXcgRXZlbnQoT1BFTl9ORVdfUEFHRV9FVkVOVCk7IiwiaW1wb3J0IHsgUGFnZSB9IGZyb20gXCIuLi9sYXlvdXQvcGFnZVwiO1xyXG5cclxuLyoqXHJcbiAqIFxyXG4gKiBVdGlsaXRpZXNcclxuICogXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVXRpbHMge1xyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIGdlbmVyYXRlIHVuaXF1ZSBuYW1lc3BhY2Ugc3RyaW5nIGZvciBnaXZlbiBsZW5ndGhcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGxlbmd0aCB7bnVtYmVyfSAtIGxlbmd0aCBvZiBuYW1lc3BhY2VcclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgc3RhdGljIG1ha2VSYW5kb21OYW1lc3BhY2UobGVuZ3RoOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSAnJztcclxuICAgICAgICBsZXQgY291bnRlciA9IDA7XHJcbiAgICAgICAgY29uc3QgY2hhcmFjdGVycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSc7XHJcbiAgICAgICAgY29uc3QgY2hhcmFjdGVyc0xlbmd0aCA9IGNoYXJhY3RlcnMubGVuZ3RoO1xyXG5cclxuICAgICAgICB3aGlsZSAoY291bnRlciA8IGxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXN1bHQgKz0gY2hhcmFjdGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVyc0xlbmd0aCkpO1xyXG4gICAgICAgICAgICBjb3VudGVyICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIGJ1aWxkIG5ldyBwYWdlXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBwYXJlbnRFbGVtZW50IHtIVE1MRWxlbWVudH0gLSBwYXJlbnQgZWxlbWVudCBmb3IgYnVpbGRcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYnVpbGRQYWdlKHBhcmVudEVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbmFtZXNwYWNlID0gVXRpbHMubWFrZVJhbmRvbU5hbWVzcGFjZSgxMCk7XHJcbiAgICAgICAgY29uc3QgcGFnZSA9IG5ldyBQYWdlKHsgbmFtZXNwYWNlIH0pO1xyXG4gICAgICAgIHBhZ2UuYnVpbGQocGFyZW50RWxlbWVudCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBvcGVuTmV3UGFnZUV2ZW50IH0gZnJvbSBcIi4uL2NvbW1vbi9ldmVudHNcIjtcclxuaW1wb3J0IHsgUGFnZUNvbmZpZyB9IGZyb20gXCIuL3R5cGVcIjtcclxuXHJcbi8qKlxyXG4gKiBcclxuICogUGFnZSBcclxuICogXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUGFnZSB7XHJcbiAgICAvLyBwYWdlIGNvbmZpZ3VyYXRpb25cclxuICAgIHByaXZhdGUgY29uZmlnOiBQYWdlQ29uZmlnO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IFBhZ2VDb25maWcpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogcGFnZSBza2VsZXRvblxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJucyB7SFRNTERpdkVsZW1lbnR9XHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBza2VsZXRvbigpOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgY29uc3QgcGFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHBhZ2UuaWQgPSB0aGlzLmlkO1xyXG4gICAgICAgIHBhZ2UuY2xhc3NOYW1lID0gJ3BhZ2UnO1xyXG5cclxuICAgICAgICAvLyBhcHBlbmQgZW1wdHkgY29udGFpbmVyXHJcbiAgICAgICAgcGFnZS5hcHBlbmRDaGlsZCh0aGlzLmVtcHR5Q29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgLy8gYXBwZW5kIGNvbnRlbnQgY29udGFpbmVyXHJcbiAgICAgICAgcGFnZS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnRDb250YWluZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gcGFnZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQ29udGVudCBjb250YWluZXJcclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMge0hUTUxEaXZFbGVtZW50fVxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0IGNvbnRlbnRDb250YWluZXIoKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAgICAgLy8gYXBwbHkgc2xpZGUtaW4gY2xhc3MgZm9yIG9wZW5pbmcgYW5pbWF0aW9uXHJcbiAgICAgICAgY29udGVudENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdwYWdlX19jb250ZW50LWNvbnRhaW5lcicsICdzbGlkZS1pbicpO1xyXG5cclxuICAgICAgICAvLyBhcHBlbmQgY29udGVudFxyXG4gICAgICAgIGNvbnRlbnRDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KTtcclxuXHJcbiAgICAgICAgLy8gYXBwZW5kIHBhZ2UgYnV0dG9uXHJcbiAgICAgICAgY29udGVudENvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLm9wZW5QYWdlQnV0dG9uKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnRDb250YWluZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEVtcHR5IGNvbnRhaW5lciB0byBjbG9zZSB0aGUgcGFnZVxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJucyB7SFRNTERpdkVsZW1lbnR9XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0IGVtcHR5Q29udGFpbmVyKCk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgICAgICBjb25zdCBlbXB0eUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGVtcHR5Q29udGFpbmVyLmNsYXNzTmFtZSA9ICdwYWdlX19lbXB0eS1jb250YWluZXInO1xyXG5cclxuICAgICAgICAvLyBhZGQgY2xpY2sgZXZlbnQgbGlzdGVuZXJcclxuICAgICAgICBlbXB0eUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYGNsb3NpbmcgY3VycmVudCBwYWdlIC0gbmFtZXNwYWNlIC0+ICR7dGhpcy5jb25maWcubmFtZXNwYWNlfWApO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VDbG9zZUhhbmRsZXIoKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gZW1wdHlDb250YWluZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIGNvbnRlbnQgc2hvdyBwYWdlIG5hbWVcclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMge0hUTUxQYXJhZ3JhcGhFbGVtZW50fVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldCBjb250ZW50KCk6IEhUTUxQYXJhZ3JhcGhFbGVtZW50IHtcclxuICAgICAgICBjb25zdCBjb250ZW50RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBjb250ZW50RWxlbWVudC5jbGFzc05hbWUgPSAncGFnZV9fY29udGVudCc7XHJcbiAgICAgICAgY29udGVudEVsZW1lbnQuaW5uZXJUZXh0ID0gYFBhZ2UgLSAke3RoaXMuY29uZmlnLm5hbWVzcGFjZX1gO1xyXG4gICAgICAgIHJldHVybiBjb250ZW50RWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogYnV0dG9uIHRvIG9wZW4gbmV3IHBhZ2VcclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMge0hUTUxCdXR0b25FbGVtZW50fVxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGdldCBvcGVuUGFnZUJ1dHRvbigpOiBIVE1MQnV0dG9uRWxlbWVudCB7XHJcbiAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgYnV0dG9uLmNsYXNzTmFtZSA9ICdvcGVuLXBhZ2UtYnRuJztcclxuICAgICAgICBidXR0b24uaW5uZXJUZXh0ID0gJ09wZW4gTmV3IFBhZ2UnO1xyXG5cclxuICAgICAgICAvLyBhZGQgY2xpY2sgZXZlbnQgbGlzdGVuZXJcclxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBvcGVuaW5nIG5ldyBwYWdlIC0gbmFtZXNwYWNlIC0+ICR7dGhpcy5jb25maWcubmFtZXNwYWNlfWApO1xyXG4gICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChvcGVuTmV3UGFnZUV2ZW50KTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gYnV0dG9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBVbmlxdWUgaWQgZm9yIHBhZ2VcclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBnZXQgaWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYHBhZ2UtJHt0aGlzLmNvbmZpZy5uYW1lc3BhY2V9YDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogcXVlcnlTZWxlY3QgZm9yIGFwcFxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9IFxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGdldCBlbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5pZCkhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBSZW1vdmUgcGFnZSBza2VsZXRvbiBmcm9tIGRvbVxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnaGVsbG8nKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEFkZCBzbGlkZSBvdXQgYW5pbWF0aW9uIG9uIGNvbnRlbnQgY29udGFpbmVyXHJcbiAgICAgKiBBbmQgcmVtb3ZlIHBhZ2Ugc2tlbGV0b24gZnJvbSBkb20gb25jZSBhbmltYXRpb24gaXMgY29tcGxldGVkXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgcGFnZUNsb3NlSGFuZGxlcigpIHtcclxuICAgICAgICAvLyBzZWxlY3RpbmcgY29udGVudCBjb250YWluZXJcclxuICAgICAgICBjb25zdCBjb250ZW50Q29udGFpbmVyID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlX19jb250ZW50LWNvbnRhaW5lcicpO1xyXG5cclxuICAgICAgICAvLyBhcHBseSBzaWRsZS1vdXQgY2xhc3MgZm9yIGNsb3NpbmcgYW5pbWF0aW9uXHJcbiAgICAgICAgY29udGVudENvbnRhaW5lcj8uY2xhc3NMaXN0LmFkZCgnc2xpZGUtb3V0Jyk7XHJcblxyXG4gICAgICAgIC8vIHJlbW92ZSBwYWdlIGZyb20gZG9tIGFmdGVyIHNsaWRlIG91dCBhbmltYXRpb24gY29tcGxldGVcclxuICAgICAgICBjb250ZW50Q29udGFpbmVyPy5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjbG9zaW5nIGFuaW1hdGlvbiBjb21wbGV0ZWQgcmVtb3ZpbmcgcGFnZSBmcm9tIGRvbScpO1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQXBwZW5kIGN1cnJlbnQgcGFnZSBza2VsZXRvbiBpbnRvIHBhcmVudCBlbGVtZW50IFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gcGFyZW50RWxlbWVudCB7SFRNTEVsZW1lbnR9XHJcbiAgICAgKi9cclxuICAgIGJ1aWxkKHBhcmVudEVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgcGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnNrZWxldG9uKCkpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQXBwIH0gZnJvbSBcIi4vYXBwL2FwcFwiO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuL2NvbW1vbi91dGlsc1wiO1xyXG5pbXBvcnQgeyBPUEVOX05FV19QQUdFX0VWRU5UIH0gZnJvbSBcIi4vY29tbW9uL2V2ZW50c1wiO1xyXG5cclxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuICAgIC8vIGJ1aWxkIGFwcFxyXG4gICAgY29uc3QgYXBwID0gbmV3IEFwcCgnZGVtbycpO1xyXG4gICAgYXBwLmJ1aWxkKCk7XHJcblxyXG4gICAgLy8gQWRkIGV2ZW50IHRvIG9wZW4gcGFnZVxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoT1BFTl9ORVdfUEFHRV9FVkVOVCwgKCkgPT4gVXRpbHMuYnVpbGRQYWdlKGFwcC5lbGVtZW50KSk7XHJcbn0iXX0=
