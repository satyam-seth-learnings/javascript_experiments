function showGeolocationInfomation(position) {
    const { latitude, longitude } = position.coords;
    document.getElementById('latitude').innerText = latitude;
    document.getElementById('longitude').innerText = longitude;
    document.getElementById('timestamp').innerText = position.timestamp;
}
window.onload = () => {
    window.navigator.geolocation.getCurrentPosition(showGeolocationInfomation);
}