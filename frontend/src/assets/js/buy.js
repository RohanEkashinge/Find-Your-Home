document.addEventListener('DOMContentLoaded', function () {

    // Function to check if user is logged in
    function checkUserId() {
        const userId = sessionStorage.getItem('userId');
        if (!userId) {
            // Redirect to login or another page if userId is null
            window.location.href = 'http://127.0.0.1:5500/frontend/src/index.html';
        }
    }

    // Calling checkUserId when the page loads
    checkUserId();

    const logoutButton = document.getElementById('logoutButton');

    // Add click event-listener for logout
    logoutButton.addEventListener('click', () => {
        // Remove userId from session storage
        sessionStorage.removeItem('userId');

        // Redirect to the specified URL
        window.location.href = 'http://127.0.0.1:5500/frontend/src/index.html';
    });


    const navItems = document.querySelectorAll('#custom-navbar-nav li');
    const featuredRentals = document.querySelector('.featured-rentals .container .row');

    let properties = [];

    // Function to fetch properties from the API
    function fetchProperties() {
        fetch('http://localhost:8080/api/properties/property-for?propertyFor=sale')
            .then(response => response.json())
            .then(data => {
                properties = data;
                displayProperties('all'); // Showing 'All' properties by default
            })
            .catch(error => console.error('Error fetching properties:', error));
    }

    // Function to escape HTML entities
    function escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Function to display properties
    function displayProperties(category) {
        featuredRentals.innerHTML = ''; // Clear previous content

        const filteredProperties = category === 'all'
            ? properties
            : properties.filter(property => property.property_type === category);
        console.log(properties);
        console.log(filteredProperties);

        if (filteredProperties.length === 0) {
            featuredRentals.innerHTML = `
                <div class="col-12 text-center">
                    <p class="fw-bold">No properties available for the selected category.</p>
                </div>

            `;
            return;
        }

        filteredProperties.forEach(property => {
            const imageUrl = property.property_images.length > 0
                ? `${property.property_images[0].base64}`
                : 'path/to/placeholder-image.jpg'; // Fallback image if no property images

            const cardHTML = `
                <div class="col-md-3 mb-4">
                    <div class="card">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <img src="${imageUrl}" class="card-img" alt="Property Image">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${escapeHTML(property.property_description)}</h5>
                                    <p class="card-text">
                                        <i class="fas fa-map-marker-alt"></i> ${escapeHTML(property.location)}
                                    </p>
                                    <p class="card-text">
                                        <i class="fas fa-phone"></i> +91${property.owner_phone ? escapeHTML(property.owner_phone) : 'N/A'}
                                    </p>
                                    <p class="card-text">
                                        <i class="fas fa-home"></i> ${escapeHTML(property.property_type)}
                                    </p>
                                    <p class="card-text">
                                        <i class="fas fa-tag"></i> ₹${escapeHTML(property.price)}
                                    </p>
                                    <button class="btn btn-primary" onclick="showPropertyDetails(${property.id})">View Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            featuredRentals.innerHTML += cardHTML;
        });
    }

    // Function to show property details in a modal
    window.showPropertyDetails = function (id) {
        fetch(`http://localhost:8080/api/properties/${id}`)
            .then(response => response.json())
            .then(property => {
                const modalBody = document.querySelector('#propertyDetailsModal .modal-body');

                // Create HTML for property images
                const imagesHtml = property.property_images.length > 0
                    ? property.property_images.map(img => `
                        <div class="col-12 col-md-4 mb-2">
                            <img src="${img.base64}" class="img-fluid" alt="Property Image">
                        </div>
                    `).join('')
                    : '<p>No images available.</p>';

                // Create HTML for owner image
                const ownerImageHtml = property.owner_image
                    ? `<img src="${property.owner_image.base64}" class="img-fluid mb-2" alt="Owner Image">`
                    : '<p>No owner image available.</p>';

                // Populate/create modal with property details
                modalBody.innerHTML = `
                    <div class="row">
                        <div class="col-md-6">
                            <h3>${escapeHTML(property.property_description)}</h3>
                            <p><strong>Location:</strong> ${escapeHTML(property.location)}</p>
                            <p><strong>Price:</strong> ₹${escapeHTML(property.price)}</p>
                            <p><strong>Negotiable:</strong> ${property.negotiable ? 'Yes' : 'No'}</p>
                            <p><strong>Size:</strong> ${escapeHTML(property.property_size)} sq. ft.</p>
                            <p><strong>Description:</strong> ${escapeHTML(property.property_description)}</p>
                            <p><strong>Owner's Phone:</strong> +91${property.owner_phone ? escapeHTML(property.owner_phone) : 'N/A'}</p>
                            <p><strong>Agreement Duration:</strong> ${escapeHTML(property.agreement_duration)}</p>
                            <h5>Images:</h5>
                            <div class="row">
                                ${imagesHtml}
                            </div>
                            <h5>Owner's Image:</h5>
                            ${ownerImageHtml}
                        </div>
                    </div>
                `;

                const modal = new bootstrap.Modal(document.getElementById('propertyDetailsModal'));
                modal.show();
            })
            .catch(error => console.error('Error fetching property details:', error));
    }

    // Event listener for category clicks
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            
            // Remove 'active' class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));

            // Add 'active' class to the clicked item
            this.classList.add('active');

            // Get selected category and display corresponding properties
            const category = this.querySelector('h5').textContent.toLowerCase();

            console.log("category chosen : ");
            console.log(category);
            displayProperties(category);
        });
    });

    document.getElementById('searchForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        const query = encodeURIComponent(document.getElementById('searchInput').value.trim());

        // Redirect to search.html with the query parameter
        window.location.href = `http://127.0.0.1:5500/frontend/src/search.html?query=${query}`;
    });

    // Add click event listener to the button
    addPropertyButton.addEventListener('click', () => {
        // Redirect to the specified URL
        window.location.href = 'http://127.0.0.1:5500/frontend/src/sell.html';
    });
    // Initial data fetch
    fetchProperties();
});
