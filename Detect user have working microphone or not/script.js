window.onload = async () => {
    navigator.mediaDevices.getUserMedia({ audio: false })
        .then((stream) => {
            console.log('have permission')
        }).catch((err) => {
            console.error(`you got an error: ${err}`)
        });;

    navigator.mediaDevices.enumerateDevices()
        .then((devices) => {
            devices.forEach((device) => {
                console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
            });
        })
        .catch((err) => {
            console.error(`${err.name}: ${err.message}`);
        });
}