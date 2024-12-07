document.addEventListener("DOMContentLoaded", () => {
    const restaurantList = document.getElementById("restaurantList");

    // Fetch posts from localStorage
    const posts = JSON.parse(localStorage.getItem("restaurantPosts")) || [];

    // Display posts dynamically
    posts.forEach(post => {
        const listItem = document.createElement("li");
        listItem.className = "restaurant-item";

        // Create card HTML without displaying the email
        listItem.innerHTML = `
            <img src="${post.imageUrl}" alt="${post.restaurantName}">
            <h3>${post.restaurantName}</h3>
            <p>${post.description}</p>
            <button class="schedule-btn" data-name="${post.restaurantName}" data-email="${post.email}">Schedule</button>
        `;

        restaurantList.appendChild(listItem);
    });

    // Add event listeners to schedule buttons
    document.querySelectorAll(".schedule-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const restaurantName = e.target.getAttribute("data-name");
            const restaurantEmail = e.target.getAttribute("data-email");

            // Redirect to schedule page with restaurant details in query parameters
            window.location.href = `schedule.html?restaurant=${encodeURIComponent(restaurantName)}&email=${encodeURIComponent(restaurantEmail)}`;
        });
    });
});