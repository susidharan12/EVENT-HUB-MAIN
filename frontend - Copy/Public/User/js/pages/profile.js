const API_BASE = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', () => {
    console.log("Profile Page Loaded. Fetching data...");
    fetchUserProfile();
    setupUpdateForm();
});

// 1. Fetch User Details from Database
async function fetchUserProfile() {
    const token = localStorage.getItem('token');
    
    if (!token) {
        console.error("No token found in localStorage");
        window.location.href = 'profile.html'; 
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/auth/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log("Response Status:", response.status);

        if (response.ok) {
            const user = await response.json();
            console.log("User Data Received:", user); // Check your console (F12) to see the keys

            // Update the UI Text (Display)
            // Added fallbacks in case your backend uses different names like 'name' or 'full_name'
            document.getElementById('user-name').textContent = user.username || user.name || user.full_name || 'N/A';
            document.getElementById('user-mobile').textContent = user.mobile || user.phone || 'Not set';
            document.getElementById('user-email').textContent = user.email || 'N/A';
            document.getElementById('user-category').textContent = user.role || 'User';

            // Pre-fill the Form Inputs
            document.getElementById('mobile').value = user.mobile || user.phone || '';
            document.getElementById('email').value = user.email || '';
            
            lucide.createIcons();
        } else {
            const errorData = await response.json();
            console.error("Backend Error:", errorData);
            // If unauthorized, go back to login
            if (response.status === 401 || response.status === 403) {
                localStorage.removeItem('token');
                window.location.href = 'login.html';
            }
        }
    } catch (error) {
        console.error("Connection Error:", error);
        document.getElementById('user-category').textContent = "OFFLINE";
        showModal("Connection Error", "Could not connect to the backend server at " + API_BASE);
    }
}

// 2. Handle Profile Update
function setupUpdateForm() {
    const form = document.getElementById('update-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        const updatedData = {
            mobile: document.getElementById('mobile').value,
            email: document.getElementById('email').value
        };

        try {
            const response = await fetch(`${API_BASE}/auth/update-profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });

            if (response.ok) {
                showModal("Success", "Your profile has been updated successfully.");
                fetchUserProfile(); 
            } else {
                const error = await response.json();
                showModal("Update Failed", error.message || "Something went wrong.");
            }
        } catch (error) {
            showModal("Error", "Connection lost. Please try again.");
        }
    });
}

// 3. Modal Helper
function showModal(title, message) {
    const modal = document.getElementById('modal');
    if (!modal) {
        alert(title + ": " + message);
        return;
    }
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-message').textContent = message;
    
    modal.style.display = 'flex';
    
    document.getElementById('modal-confirm').onclick = () => {
        modal.style.display = 'none';
    };
}