document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target;
    const formData = new FormData(form);

    fetch('http://localhost:8080/api/signup', { 
        method: 'POST',
        body: JSON.stringify({
            email: formData.get('email'),
            password: formData.get('password')
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.message || 'Unknown error');
            });
        }
        return response.json();
    })
    .then(data => {
        // alert('Success: ' + data.message + ' User ID: ' + data.userId); // Display the message and userId
        sessionStorage.setItem('userId', data.userId);
        window.location.href = 'http://127.0.0.1:5500/frontend/src/home.html'; // Redirect to another page or reload
        form.reset();
    })
    .catch(error => {
        alert('Error: ' + error.message); // Display the error message
        console.log('Error:', error.message);
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect form data
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse JSON response
            } else {
                return response.json().then(data => {
                    throw new Error(data.message || 'Authentication failed');
                });
            }
        })
        .then(data => {
            // alert('Login successful! User ID: ' + data.userId);
            sessionStorage.setItem('userId', data.userId); // Display the userId
            loginForm.reset();
            window.location.href = 'http://127.0.0.1:5500/frontend/src/home.html'; // Redirect to another page or reload
        })
        .catch(error => {
            loginForm.reset(); // Reset the form on error
            alert('Login failed: ' + error.message); // Display the error message
        });
    });
});

