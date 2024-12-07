document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const restaurantName = urlParams.get("restaurant");
    const restaurantEmail = urlParams.get("email");

    if (restaurantName) {
        document.getElementById("restaurantName").value = restaurantName;
    }
    if (restaurantEmail) {
        document.getElementById("restaurantEmail").value = restaurantEmail;
    }

    // Handle form submission
    const scheduleForm = document.getElementById("scheduleForm");
    scheduleForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const userName = document.getElementById("userName").value;
        const userEmail = document.getElementById("userEmail").value;
        const eventDate = document.getElementById("eventDate").value;
        const eventTime = document.getElementById("eventTime").value;
        const eventLocation = document.getElementById("eventLocation").value;
        const guestCount = document.getElementById("guestCount").value;
        const specialRequests = document.getElementById("specialRequests").value;

        // Create a schedule request object
        const scheduleRequest = {
            restaurantName,
            restaurantEmail,
            userName,
            userEmail,
            eventDate,
            eventTime,
            eventLocation,
            guestCount,
            specialRequests,
        };

        // Store the schedule request in localStorage
        const scheduleRequests = JSON.parse(localStorage.getItem("scheduleRequests")) || [];
        scheduleRequests.push(scheduleRequest);
        localStorage.setItem("scheduleRequests", JSON.stringify(scheduleRequests));

        // Confirmation alert
        alert(`Your request to schedule an event at ${restaurantName} has been submitted.`);

        // Optionally redirect to another page or clear the form
        scheduleForm.reset();
    });
});