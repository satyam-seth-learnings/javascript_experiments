/**
 * This function calculates the duration between two dates
 * @param startingDate The starting date
 * @param endingDate The ending date
 * @returns Duration between two dates in format of "XX days, XX hours, XX minutes, XX seconds"
 */
function calculateDuration(startingDate: Date, endingDate: Date): string {

    // Get the difference in milliseconds
    let difference = endingDate.getTime() - startingDate.getTime();

    console.log(`difference => ${difference}`);

    // Convert milliseconds to days
    let days = Math.floor(difference / (1000 * 60 * 60 * 24));

    console.log(`days => ${days}`);

    // Convert milliseconds to hours
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    console.log(`hours => ${hours}`);

    // Convert milliseconds to minutes
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    console.log(`minutes => ${minutes}`);

    // Convert milliseconds to seconds
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    console.log(`seconds => ${seconds}`);

    if (days > 0) {
        return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    } else if (hours > 0) {
        return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    } else if (minutes > 0) {
        return `${minutes} minutes, ${seconds} seconds`;
    } else {
        return `${seconds} seconds`;
    }

}

window.onload = () => {
    // Add submit event listener to the form
    document.querySelector('form')!.addEventListener('submit', (e: Event) => {
        // Prevent the default action
        e.preventDefault();

        // Get the starting date and ending date
        const startingDateValue = (document.getElementById('starting-date') as HTMLInputElement).value;
        const endingDateValue = (document.getElementById('ending-date') as HTMLInputElement).value;

        console.log(`Starting Date Value => ${startingDateValue}`);
        console.log(`Ending Date Value => ${endingDateValue}`);

        // Convert the starting date and ending date to Date objects
        let startingDate = new Date(startingDateValue);
        let endingDate = new Date(endingDateValue);

        if (startingDate < endingDate) {

            // Calculate the duration
            const duration = calculateDuration(startingDate, endingDate);

            console.log(`Duration => ${duration}`);

            // Display the duration
            document.getElementById("duration")!.innerHTML = duration;
        } else {
            window.alert("Starting date must be less than ending date");
        }
    });
};