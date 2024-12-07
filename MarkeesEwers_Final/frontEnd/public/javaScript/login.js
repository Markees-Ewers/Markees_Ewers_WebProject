// Show the login modal
function showLoginModal(role) {
    document.getElementById('loginModal').style.display = 'flex';
    document.getElementById('role').value = role; // Pre-fill the role
    document.getElementById('modalTitle').textContent = `Login as ${role}`;
}

// Close the modal
function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
}

// Handle the login form submission
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission

    const role = document.getElementById('role').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Send login data to the backend
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            // Handle successful login
            alert(`Welcome, ${role}! Redirecting to your dashboard.`);
            if (role === 'CATERER') {
                window.location.href = 'restaurants.html';
            } else if (role === 'DINER') {
                window.location.href = 'schedule.html';
            }
        } else {
            // Handle login errors
            alert(data.message || 'Login failed. Please try again.');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('An error occurred. Please try again later.');
    }
});