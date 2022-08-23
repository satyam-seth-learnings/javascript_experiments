window.addEventListener('load', () => {
    const button = document.querySelector('button');

    if (window.self !== window.top) {
        // Ensure that if our document is in a frame, we get the user
        // to first open it in its own tab or window. Otherwise, it
        // won't be able to request permission to send notifications.
        button.textContent = "View live result of the example code above";
        button.addEventListener('click', () => window.open(location.href));
        return;
    }

    button.addEventListener('click', () => {
        if (Notification?.permission === "granted") {
            // If the user agreed to get notified
            // Let's try to send ten notifications
            let i = 0;
            // Using an interval cause some browsers (including Firefox) are blocking notifications if there are too much in a certain time.
            const interval = setInterval(() => {
                // Thanks to the tag, we should only see the "Hi! 9" notification
                const n = new Notification(`Hi! ${i}`, { tag: 'soManyNotification', icon: 'https://avatars.githubusercontent.com/u/63374020?v=4' });

                // Close the notification
                n.click = () => {
                    if (document.visibilityState !== "visible") {
                        // If the page is not visible, we want to focus it
                        // so the user can see the result of the notification
                        window.parent.focus();
                        notification.close();
                    }
                }

                if (i === 9) {
                    i++;
                    clearInterval(interval);
                }
            }, 200);
        } else if (Notification && Notification.permission !== "denied") {
            // If the user hasn't told if they want to be notified or not
            // Note: because of Chrome, we are not sure the permission property
            // is set, therefore it's unsafe to check for the "default" value.
            Notification.requestPermission((status) => {
                // If the user said okay
                if (status === "granted") {
                    let i = 0;
                    // Using an interval cause some browsers (including Firefox) are blocking notifications if there are too much in a certain time.
                    const interval = setInterval(() => {
                        // Thanks to the tag, we should only see the "Hi! 9" notification
                        const n = new Notification(`Hi! ${i}`, { tag: 'soManyNotification', icon: 'https://avatars.githubusercontent.com/u/63374020?v=4' });

                        // Close the notification
                        n.click = () => {
                            if (document.visibilityState !== "visible") {
                                // If the page is not visible, we want to focus it
                                // so the user can see the result of the notification
                                window.parent.focus();
                                notification.close();
                            }
                        }

                        if (i === 9) {
                            i++;
                            clearInterval(interval);
                        }
                    }, 200);
                } else {
                    // Otherwise, we can fallback to a regular modal alert
                    alert("Notification permission not granted");
                }
            });
        } else {
            // If the user refuses to get notified, we can fallback to a regular modal alert
            alert("Notification permission not granted");
        }
    });
});