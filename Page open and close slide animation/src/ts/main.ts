import { App } from "./app/app";
import { Utils } from "./common/utils";
import { OPEN_NEW_PAGE_EVENT } from "./common/events";

window.onload = () => {
    // build app
    const app = new App('demo');
    app.build();

    // Add event to open page
    window.addEventListener(OPEN_NEW_PAGE_EVENT, () => Utils.buildPage(app.element));
}