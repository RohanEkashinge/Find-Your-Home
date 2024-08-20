document.addEventListener("DOMContentLoaded", function () {

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

    fetchProperties();
});

function fetchProperties() {
    fetch('http://localhost:8080/api/properties')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Inspect the data structure
            const rentContainer = document.getElementById('rent-properties-container');
            const saleContainer = document.getElementById('sale-properties-container');

            // Clear containers before adding new data
            rentContainer.innerHTML = '';
            saleContainer.innerHTML = '';

            data.forEach(property => {
                const imageUrl = property.property_images.length > 0
                    ? `${property.property_images[0].base64}`
                    : 'path/to/placeholder-image.jpg'; // Fallback image if no property images

                const cardHTML = `
                    <div class="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="${300}>
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
                                            <i class="fas fa-phone"></i> +91${(property.owner_phone)}
                                        </p>
                                        <p class="card-text">
                                            <i class="fas fa-home"></i> ${escapeHTML(property.property_type)}
                                        </p>
                                        <p class="card-text">
                                            <i class="fas fa-tag"></i> ₹${(property.price)}
                                        </p>
                                        <button class="btn btn-primary" onclick="showPropertyDetails(${property.id})">View Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                if (property.property_for === 'rent') {
                    rentContainer.innerHTML += cardHTML;
                } else if (property.property_for === 'sale') {
                    saleContainer.innerHTML += cardHTML;
                }
            });
        })
        .catch(error => console.error('Error fetching properties:', error));
}

function showPropertyDetails(id) {
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
                : '<p>No images available.</p>'; // Display a message if no property images are available

            // Create HTML for owner image
            const ownerImageHtml = property.owner_image
                ? `<img src="${property.owner_image.base64}" class="img-fluid mb-2" alt="Owner Image">`
                : '<p>No owner image available.</p>'; // Display a message if no owner image is available

            // Populate modal with property details
            modalBody.innerHTML = `
                <div class="row">
                    <div class="col-md-6">
                        <h3>${escapeHTML(property.property_description)}</h3>
                        <p><strong>Location:</strong> ${escapeHTML(property.location)}</p>
                        <p><strong>Price:</strong> ₹${(property.price)}</p>
                        <p><strong>Negotiable:</strong> ${property.negotiable ? 'Yes' : 'No'}</p>
                        <p><strong>Size:</strong> ${(property.property_size)} sq. ft.</p>
                        <p><strong>Description:</strong> ${escapeHTML(property.property_description)}</p>
                        <p><strong>Owner's Phone:</strong> +91${(property.owner_phone)}</p>
                        <p><strong>Agreement Duration:</strong> ${(property.agreement_duration)}</p>
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

// Helper function to escape HTML special characters to prevent XSS
function escapeHTML(text) {
    if (typeof text !== 'string') {
        return ''; // Return empty string for non-string types
    }
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const query = encodeURIComponent(document.getElementById('searchInput').value.trim());

    // Redirect to search.html with the query parameter
    window.location.href = `http://127.0.0.1:5500/frontend/src/search.html?query=${query}`;
});

const addPropertyButton = document.getElementById('addPropertyButton');

// Add click event listener to the button
addPropertyButton.addEventListener('click', () => {
    // Redirect to the specified URL
    window.location.href = 'http://127.0.0.1:5500/frontend/src/sell.html';
});