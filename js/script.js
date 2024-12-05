document.addEventListener("DOMContentLoaded", function () {
    // Fetch KPI data
    fetchKpiData();
    // Fetch users for User Management table
    fetchUsers();
    // Fetch recent activity
    fetchActivityFeed();
});

function fetchKpiData() {
    document.getElementById("activeResolutions").textContent = "15"; // Example data
    document.getElementById("pendingResolutions").textContent = "5"; // Example data
    document.getElementById("departmentCount").textContent = "8"; // Example data
}

// Fetch and display all users
function fetchUsers() {
    const userTableBody = document.querySelector("#userTable tbody");

    fetch("http://localhost:4000/api/users/all")
        .then(response => response.json())
        .then(data => {
            userTableBody.innerHTML = "";
            data.forEach(user => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td><button onclick="deleteUser('${user.id}')">Delete</button></td>
                `;
                userTableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching users:", error));
}

// Delete user function
function deleteUser(userId) {
    if (confirm("Are you sure you want to delete this user?")) {
        fetch(`http://localhost:4000/api/users/${userId}`, {
            method: "DELETE"
        })
            .then(response => {
                if (response.ok) {
                    alert("User deleted successfully.");
                    fetchUsers(); // Refresh user list
                } else {
                    alert("Failed to delete user.");
                }
            })
            .catch(error => console.error("Error deleting user:", error));
    }
}

// Fetch recent activity
function fetchActivityFeed() {
    const activityList = document.getElementById("activityList");

    fetch("http://localhost:4000/api/activity") // Replace with actual API endpoint
        .then(response => response.json())
        .then(data => {
            activityList.innerHTML = "";
            data.forEach(activity => {
                const listItem = document.createElement("li");
                listItem.textContent = activity.description;
                activityList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error fetching activity feed:", error));
}
