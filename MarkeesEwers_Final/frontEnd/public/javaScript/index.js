document.addEventListener("DOMContentLoaded", () => {
    const dineBtn = document.getElementById("dineBtn");
    const advertiseBtn = document.getElementById("advertiseBtn");
    const postModal = document.getElementById("postModal");
    const closeModal = document.getElementById("closeModal");
    const postForm = document.getElementById("postForm");

    dineBtn.addEventListener("click", () => {
        window.location.href = "restaurants.html";
    });

    advertiseBtn.addEventListener("click", () => {
        postModal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        postModal.style.display = "none";
    });

    postForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const restaurantName = document.getElementById("restaurantName").value;
        const description = document.getElementById("description").value;
        const email = document.getElementById("email").value;
        const imageUpload = document.getElementById("imageUpload").files[0];
        const imageUrlInput = document.getElementById("imageUrl").value;

        let imageUrl = "";

        if (imageUpload) {
            // Convert the uploaded image to a base64 string
            imageUrl = await convertImageToBase64(imageUpload);
        } else if (imageUrlInput) {
            imageUrl = imageUrlInput;
        } else {
            alert("Please provide an image by uploading or entering a URL.");
            return;
        }

        // Create a post object
        const post = { restaurantName, description, imageUrl, email, timestamp: Date.now() };

        // Retrieve existing posts from localStorage
        const posts = JSON.parse(localStorage.getItem("restaurantPosts")) || [];

        // Add the new post to the existing array
        posts.push(post);

        // Save the updated posts array back to localStorage
        localStorage.setItem("restaurantPosts", JSON.stringify(posts));

        // Clear form and close modal
        postForm.reset();
        postModal.style.display = "none";

        alert("Your post has been created and will be featured on the Restaurants page.");
    });

    // Helper function to convert an image file to base64
    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };
});
document.addEventListener("DOMContentLoaded", () => {
  const restaurantList = document.getElementById("restaurantList");

  // Fetch posts from localStorage
  const posts = JSON.parse(localStorage.getItem("restaurantPosts")) || [];

  // Display posts dynamically
  posts.forEach((post) => {
    const listItem = document.createElement("li");
    listItem.className = "restaurant-item";

    listItem.innerHTML = `
            <img src="${post.imageUrl || "assets/placeholder.jpg"}" alt="${
      post.restaurantName
    }">
            <h3>${post.restaurantName}</h3>
            <p>${post.description}</p>
            <p>Email: <a href="mailto:${post.email}">${post.email}</a></p>
            <button class="schedule-btn" data-name="${
              post.restaurantName
            }" data-email="${post.email}">Schedule</button>
        `;

    restaurantList.appendChild(listItem);
  });

  // Add event listeners to schedule buttons
  document.querySelectorAll(".schedule-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const restaurantName = e.target.getAttribute("data-name");
      const restaurantEmail = e.target.getAttribute("data-email");

      // Redirect to schedule page with restaurant details in query parameters
      window.location.href = `schedule.html?restaurant=${encodeURIComponent(
        restaurantName
      )}&email=${encodeURIComponent(restaurantEmail)}`;
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const resetBtn = document.getElementById("resetBtn");

  // Add event listener to the reset button
  resetBtn.addEventListener("click", () => {
    // Confirm with the user before clearing localStorage
    const confirmReset = confirm(
      "Are you sure you want to reset the website? This will remove all saved data."
    );
    if (confirmReset) {
      // Clear localStorage
      localStorage.clear();

      // Optionally reload the page to reflect the changes
      alert("Website has been reset to default.");
      window.location.reload();
    }
  });
});
//reset button
document.addEventListener("DOMContentLoaded", () => {
    const resetBtn = document.getElementById("resetBtn");

    // Add event listener to the reset button
    resetBtn.addEventListener("click", () => {
        // Confirm with the user before clearing localStorage
        const confirmReset = confirm("Are you sure you want to reset the website? This will remove all saved data.");
        if (confirmReset) {
            // Clear localStorage
            localStorage.clear();

            // Optionally reload the page to reflect the changes
            alert("Website has been reset to default.");
            window.location.reload();
        }
    });
});
