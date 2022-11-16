window.onload = async () => {
    // MicroPhone detection
    if (!navigator.mediaDevices.enumerateDevices) {
        console.log('enumerateDevices() not supported.');
    } else {
        // List cameras and microphones.
        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                // console all devices info
                devices.forEach((device) => {
                    console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
                });

                // filter all audioinput devices
                const audioinput = devices.find(device => device.kind === 'audioinput');

                // if microphones not found
                if (audioinput === undefined) {
                    console.log('Microphone Not Found');
                }

                // filter all videoinput devices
                const videoinput = devices.find(device => device.kind === 'videoinput');

                // if microphones not found
                if (videoinput === undefined) {
                    console.log('Camera Not Found');
                }
            })
            .catch((err) => {
                console.error(`${err.name}: ${err.message}`);
            });
    }
}