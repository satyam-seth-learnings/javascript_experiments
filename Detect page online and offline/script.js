// Add Event Listener for page online
window.addEventListener('online', () => {
    console.log("You are now connected to the network.");
    const statusBar = document.querySelector('.status-bar');
    statusBar.innerText = 'You are now connected to the network.';
    statusBar.classList.remove('offline');
    statusBar.classList.add('online');

    window.setTimeout(() => {
        statusBar.classList.add('hidden');
    }, 5000);
});

// Add Event Listener for page offline
window.addEventListener('offline', () => {
    console.log("You are disconnected to the network.");
    const statusBar = document.querySelector('.status-bar');
    statusBar.innerText = 'You are disconnected to the network.';
    statusBar.classList.remove('hidden', 'online');
    statusBar.classList.add('offline');
});
