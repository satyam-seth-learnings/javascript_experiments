async function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.register("/Service Worker API/sw.js", {
                scope: "/Service Worker API/",
            });
            if (registration.installing) {
                console.log("Service worker installing");
            } else if (registration.waiting) {
                console.log("Service worker installed");
            } else if (registration.active) {
                console.log("Service worker active");
            }
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    }
};

window.onload = function () {
    const registerSwBtn = document.getElementById('sw-register');
    registerSwBtn.addEventListener('click', registerServiceWorker);
}