document.addEventListener('DOMContentLoaded', function () {

    function checkUserId() {
        const userId = sessionStorage.getItem('userId');
        if (!userId) {
            // Redirect to login or another page if userId is null
            window.location.href = 'http://127.0.0.1:5500/frontend/src/index.html';
        }
    }

    // Call checkUserId when the page loads
    checkUserId();

    const logoutButton = document.getElementById('logoutButton');

    // Add click event listener for logout
    logoutButton.addEventListener('click', () => {
        // Remove userId from session storage
        sessionStorage.removeItem('userId');

        // Redirect to the specified URL
        window.location.href = 'http://127.0.0.1:5500/frontend/src/index.html';
    });

    const navItems = document.querySelectorAll('#custom-navbar-nav li');
    const featuredRentals = document.querySelector('.featured-rentals .container .row');
    const searchInput = document.querySelector('.searchBox-input');
    let properties = [];
    let filteredProperties = [];



    // Function to fetch properties from the API
    function fetchProperties() {


        fetch('http://localhost:8080/api/properties')
            .then(response => response.json())
            .then(data => {
                properties = data;
                filteredProperties = properties; // Set initial filtered properties to all properties
                // displayProperties(properties); // Show all properties by default

            })
            .catch(error => {
                console.error('Error fetching properties:', error);
            });
    }

    // Function to escape HTML entities
    function escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Function to display properties
    function displayProperties(propertiesToDisplay) {
        featuredRentals.innerHTML = ''; // Clear previous content

        if (propertiesToDisplay.length === 0) {
            featuredRentals.innerHTML = `
                <div class="col-12 text-center">
                    <p class="fw-bold">No properties available for the selected category.</p>
                </div>
            `;
            return;
        }

        propertiesToDisplay.forEach(property => {
            const imageSrc = property.property_images.length > 0
                ? property.property_images[0].base64
                : 'path/to/default-image.jpg'; // Use a default image if none available

            const cardHTML = `
                <div class="col-md-3 mb-4">
                    <section class="property-card">
                        <div class="property-card__outer-wrap">
                            <div class="property-card__image-gallery">
                                <img src="${imageSrc}" class="property-card__image" alt="Property Image">
                            </div>
                            <div class="property-card__content-wrap">
                                <div class="property-card__header">
                                    <h1 class="property-card__title">
                                        <a href="#" title="${escapeHTML(property.property_description)}">${escapeHTML(property.property_description)}</a>
                                    </h1>
                                    <div class="property-card__ribbon">
                                        ${property.property_for === 'sale' ? 'For Sale' : 'For Rent'}
                                    </div>
                                </div>
                                <div class="property-card__details">
                                    <p class="property-card__detail">
                                        <i class="fas fa-map-marker-alt"></i> ${escapeHTML(property.location)}
                                    </p>
                                    <p class="property-card__detail">
                                        <i class="fas fa-phone"></i> +91${property.owner_phone ? escapeHTML(property.owner_phone) : 'N/A'}
                                    </p>
                                    <p class="property-card__detail">
                                        <i class="fas fa-home"></i> ${escapeHTML(property.property_type)}
                                    </p>
                                    <p class="property-card__detail">
                                        <i class="fas fa-tag"></i> ₹${escapeHTML(property.price)}
                                    </p>
                                </div>
                                <div class="property-card__actions">
                                    <button class="btn btn-primary" onclick="showPropertyDetails(${property.id})">View Details</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            `;

            featuredRentals.innerHTML += cardHTML;
        });
    }

    // Function to manually search properties
    // Function to manually search properties
    // Function to manually search properties
    function searchProperties(query) {
        query = query.toLowerCase().trim(); // Normalize query by trimming whitespace
        return properties.filter(property => {
            // Convert each field to string for case-insensitive comparison
            return (
                (property.property_description || '').toLowerCase().includes(query) ||
                (property.location || '').toLowerCase().includes(query) ||
                (property.property_type || '').toLowerCase().includes(query) ||
                (property.property_for || '').toLowerCase().includes(query) ||
                (property.price || 0).toString().toLowerCase().includes(query) ||
                (property.negotiable || 'no').toString().toLowerCase().includes(query) ||
                (property.property_size || 0).toString().toLowerCase().includes(query) ||
                (property.owner_phone || '').toLowerCase().includes(query) ||
                (property.agreement_duration || '').toLowerCase().includes(query)
            );
        });
    }


    // Function to show property details in a modal
    window.showPropertyDetails = function (id) {
        fetch(`http://localhost:8080/api/properties/${id}`)
            .then(response => response.json())
            .then(property => {
                const modalBody = document.querySelector('#propertyDetailsModal .modal-body');

                const imagesHtml = property.property_images.length > 0
                    ? property.property_images.map(img => `
                        <div class="swiper-slide"><img src="${img.base64}" class="img-fluid" alt="Property Image"></div>
                    `).join('')
                    : '<p>No images available.</p>';

                const ownerImageHtml = property.owner_image
                    ? `<img src="${property.owner_image.base64}" class="img-fluid mb-2" alt="Owner Image">`
                    : '<p>No owner image available.</p>';

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
                            <div class="swiper-container">
                                <div class="swiper-wrapper">
                                    ${imagesHtml}
                                </div>
                                <!-- Add Pagination -->
                                <div class="swiper-pagination"></div>
                                <!-- Add Navigation -->
                                <div class="swiper-button-next"></div>
                                <div class="swiper-button-prev"></div>
                            </div>
                            <h5>Owner's Image:</h5>
                            ${ownerImageHtml}
                        </div>
                    </div>
                `;

                const modal = new bootstrap.Modal(document.getElementById('propertyDetailsModal'));
                modal.show();

                // Initialize Swiper in modal
                new Swiper(document.querySelector('#propertyDetailsModal .swiper-container'), {
                    loop: true,
                    autoplay: {
                        delay: 5000,
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                });
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
            const filteredResultProperties = category === 'all'
                ? filteredProperties
                : filteredProperties.filter(property => property.property_type.toLowerCase() === category);
            displayProperties(filteredResultProperties);
        });
    });

    function removeCountryCode(phoneNumber) {
        // Check if the phoneNumber starts with "+91"
        if (phoneNumber.startsWith("+91")) {
            // Remove the "+91" prefix
            return phoneNumber.slice(3);
        }
        // Return the original phoneNumber if it does not start with "+91"
        return phoneNumber;
    }

    // Event listener for search
    document.querySelector('form[role="search"]').addEventListener('submit', function (event) {

        console.log("clicked");
        event.preventDefault(); // Prevent the form from submitting the traditional way

        let query = searchInput.value.trim();
        console.log("before removing the country code : " + query);
        if (query.startsWith("+91")) {
            query = removeCountryCode(query);
            console.log("after removing country code : " + query);
        }
        query = removeCountryCode(query);


        if (query) {
            filteredProperties = searchProperties(query);
            displayProperties(filteredProperties); // Display search results
        } else {
            filteredProperties = properties; // Show all properties if the search is cleared
            displayProperties(filteredProperties);
        }
    });

    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Get the search query from URL
    const query = getQueryParam('query');
    console.log("Search Query from URL: " + query);

    // Assuming search.js has functions defined like searchProperties and displayProperties
    if (query) {
        let cleanedQuery = query.trim();
        if (cleanedQuery.startsWith("+91")) {
            cleanedQuery = removeCountryCode(cleanedQuery);
        }

        // Perform the search and display results
        const filteredProperties = searchProperties(cleanedQuery);
        displayProperties(filteredProperties); // Update this function to use the appropriate display logic
    } else {
        // Show all properties or handle case where no query is present
        const filteredProperties = properties; // Make sure 'properties' is defined
        displayProperties(filteredProperties);
    }


    // Add click event listener to the button
    addPropertyButton.addEventListener('click', () => {
        // Redirect to the specified URL
        window.location.href = 'http://127.0.0.1:5500/frontend/src/sell.html';
    });

    // Fetch and display properties on page load
    fetchProperties();
});
