let bc;
const logsTextarea = document.getElementById('logs');
const connectForm = document.getElementById('connect-form');
const channelNameInput = document.getElementById('channel-name');
const sendMessageForm = document.getElementById('send-msg-form');
const disconnectBtn = document.getElementById('disconnect-btn');
const messageInput = document.getElementById('msg');

function addLog(msg, type) {
    let msgPrefix;
    const now = new Date();

    if (type === 1) {
        msgPrefix = 'Sent';
    } else if (type === 2) {
        msgPrefix = 'Received';
    } else {
        msgPrefix = 'Info';
    }

    const log = `[${now.toLocaleString()}] [${msgPrefix}] => ${msg}\n`;
    logsTextarea.value += log;
}

function receivedMsgHandler(e) {
    console.log(e);
    const data = JSON.parse(e.data);
    const payload = { timeStamp: e.timeStamp, origin: e.origin, data: data };
    addLog(JSON.stringify(payload), 2);
}

function sendMsg(msg) {
    // We can send any object other than json
    const payload = JSON.stringify(msg);
    bc.postMessage(payload);
    addLog(msg, 1);
}

function initializeBroadcastChannel(channelName) {
    bc = new BroadcastChannel(channelName);
    console.log(bc);
    addLog(`Connected to a broadcast channel '${channelName}'`, 0)

    // Add event listener to receive message
    bc.onmessage = receivedMsgHandler;
    addLog("Register onmessage event handler", 0);
}

function toggleDisableForm(form, disabled) {
    const elements = form.elements;
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if ("readOnly" in element) {
            element.readOnly = disabled
        } else if ("disabled" in element) {
            element.disabled = disabled;
        }
    }
}

function disconnectHandler(e) {
    const channelName = channelNameInput.value;
    sendMessageForm.reset();
    messageInput.value = '';
    disconnectBtn.disabled = true;
    toggleDisableForm(connectForm, false);
    toggleDisableForm(sendMessageForm, true);
    disconnectBtn.disabled = true;
    bc.close();
    bc = undefined;
    logsTextarea.value = '';
    addLog(`Disconnected from the broadcast channel '${channelName}'`, 0)
    channelNameInput.focus();
}

function connectFormSubmitHandler(e) {
    e.preventDefault();
    toggleDisableForm(e.target, true);
    initializeBroadcastChannel(channelNameInput.value);
    toggleDisableForm(sendMessageForm, false);
    disconnectBtn.disabled = false;
    messageInput.focus();
}

function sendMsgFormSubmitHandler(e) {
    e.preventDefault();
    sendMsg(messageInput.value);
    messageInput.value = '';
}

window.onload = function () {
    connectForm.addEventListener('reset', disconnectHandler);
    connectForm.addEventListener('submit', connectFormSubmitHandler);
    sendMessageForm.addEventListener('submit', sendMsgFormSubmitHandler);
}
