/**
 * This function calculates the duration between two dates
 * @param startingDate The starting date
 * @param endingDate The ending date
 * @returns Duration between two dates in format of "XX days, XX hours, XX minutes, XX seconds"
 */
function calculateDuration(startingDate, endingDate) {
    // Get the difference in milliseconds
    var difference = endingDate.getTime() - startingDate.getTime();
    console.log("difference => ".concat(difference));
    // Convert milliseconds to days
    var days = Math.floor(difference / (1000 * 60 * 60 * 24));
    console.log("days => ".concat(days));
    // Convert milliseconds to hours
    var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    console.log("hours => ".concat(hours));
    // Convert milliseconds to minutes
    var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    console.log("minutes => ".concat(minutes));
    // Convert milliseconds to seconds
    var seconds = Math.floor((difference % (1000 * 60)) / 1000);
    console.log("seconds => ".concat(seconds));
    if (days > 0) {
        return "".concat(days, " days, ").concat(hours, " hours, ").concat(minutes, " minutes, ").concat(seconds, " seconds");
    }
    else if (hours > 0) {
        return "".concat(hours, " hours, ").concat(minutes, " minutes, ").concat(seconds, " seconds");
    }
    else if (minutes > 0) {
        return "".concat(minutes, " minutes, ").concat(seconds, " seconds");
    }
    else {
        return "".concat(seconds, " seconds");
    }
}
window.onload = function () {
    // Add submit event listener to the form
    document.querySelector('form').addEventListener('submit', function (e) {
        // Prevent the default action
        e.preventDefault();
        // Get the starting date and ending date
        var startingDateValue = document.getElementById('starting-date').value;
        var endingDateValue = document.getElementById('ending-date').value;
        console.log("Starting Date Value => ".concat(startingDateValue));
        console.log("Ending Date Value => ".concat(endingDateValue));
        // Convert the starting date and ending date to Date objects
        var startingDate = new Date(startingDateValue);
        var endingDate = new Date(endingDateValue);
        if (startingDate < endingDate) {
            // Calculate the duration
            var duration = calculateDuration(startingDate, endingDate);
            console.log("Duration => ".concat(duration));
            // Display the duration
            document.getElementById("duration").innerHTML = duration;
        }
        else {
            window.alert("Starting date must be less than ending date");
        }
    });
};
