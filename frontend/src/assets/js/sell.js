


document.addEventListener('DOMContentLoaded', function () {

    AOS.init({
        duration: 1200,
        once: true,
    });

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

    // Phone number validation logic
    const phoneInput = document.getElementById('owner-phone');
    const feedback = document.getElementById('phone-feedback');

    phoneInput.addEventListener('input', function () {
        const phoneValue = phoneInput.value;
        const phonePattern = /^\d{10}$/;

        if (phonePattern.test(phoneValue)) {
            feedback.textContent = '';
            phoneInput.setCustomValidity('');
        } else {
            feedback.textContent = 'Phone number should be exactly 10 digits.';
            phoneInput.setCustomValidity('Invalid phone number format.');
        }
    });

    phoneInput.addEventListener('blur', function () {
        phoneInput.dispatchEvent(new Event('input'));
    });

    // Property image preview logic
    const propertyFileInput = document.getElementById('property-images');
    const propertyPreviewContainer = document.getElementById('image-preview-container');
    const maxImages = 5;

    propertyFileInput.addEventListener('change', function (event) {
        const files = Array.from(event.target.files);
        const currentImageCount = propertyPreviewContainer.children.length;
        const remainingSlots = maxImages - currentImageCount;

        if (remainingSlots <= 0) {
            alert('You can only upload up to 5 images.');
            propertyFileInput.value = '';
            return;
        }

        const filesToProcess = files.slice(0, remainingSlots);

        filesToProcess.forEach(file => {
            if (file && file.type.startsWith('image/') && file.size <= 3 * 1024 * 1024) { // 3 MB limit
                const reader = new FileReader();
                reader.onload = function (e) {
                    // Create elements for preview
                    const imgWrapper = document.createElement('div');
                    imgWrapper.classList.add('img-wrapper');

                    const imgElement = document.createElement('img');
                    imgElement.src = e.target.result;
                    imgElement.classList.add('img-thumbnail');
                    imgElement.style.maxWidth = '150px'; // Adjust as needed

                    const removeButton = document.createElement('button');
                    removeButton.innerHTML = '&times;';
                    removeButton.classList.add('btn-remove');
                    removeButton.onclick = function () {
                        imgWrapper.remove(); // Remove the image and its name
                    };

                    const fileName = document.createElement('div');
                    fileName.classList.add('file-name');
                    fileName.textContent = file.name;

                    imgWrapper.appendChild(removeButton);
                    imgWrapper.appendChild(imgElement);
                    imgWrapper.appendChild(fileName);

                    propertyPreviewContainer.appendChild(imgWrapper);
                };

                reader.readAsDataURL(file);
            } else if (file.size > 3 * 1024 * 1024) {
                alert(`File ${file.name} exceeds 3 MB and will not be added.`);
            } else {
                alert(`File ${file.name} is not a valid image.`);
            }
        });

        if (files.length > remainingSlots) {
            alert(`Only ${remainingSlots} more images can be uploaded.`);
            propertyFileInput.value = ''; // Clear the input
        }
    });

    // Owner image preview logic
    const ownerFileInput = document.getElementById('owner-image');
    const ownerImageContainer = document.getElementById('owner-image-container');

    ownerFileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];

        if (file && file.type.startsWith('image/') && file.size <= 3 * 1024 * 1024) { // 3 MB limit
            const reader = new FileReader();
            reader.onload = function (e) {
                // Create elements for owner image preview
                ownerImageContainer.innerHTML = ''; // Clear previous image

                const imgWrapper = document.createElement('div');
                imgWrapper.classList.add('img-wrapper');

                const imgElement = document.createElement('img');
                imgElement.src = e.target.result;
                imgElement.classList.add('img-thumbnail');
                imgElement.style.maxWidth = '150px'; // Adjust as needed

                const removeButton = document.createElement('button');
                removeButton.innerHTML = '&times;';
                removeButton.classList.add('btn-remove');
                removeButton.onclick = function () {
                    ownerImageContainer.innerHTML = ''; // Clear owner image
                    ownerFileInput.value = ''; // Clear file input
                };

                imgWrapper.appendChild(removeButton);
                imgWrapper.appendChild(imgElement);

                ownerImageContainer.appendChild(imgWrapper);
            };

            reader.readAsDataURL(file);
        } else if (file.size > 3 * 1024 * 1024) {
            alert(`File ${file.name} exceeds 3 MB and will not be added.`);
        } else {
            alert(`File ${file.name} is not a valid image.`);
        }
    });

    // Handle form submission
    const form = document.querySelector('.property-form');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        submitButton.disabled = true;

        const formData = new FormData(form);
        const data = {
            property_for: formData.get('property_for'),
            property_type: formData.get('property_type'),
            location: formData.get('location'),
            price: formData.get('price'),
            negotiable: formData.get('negotiable') ? true : false,
            property_size: formData.get('property_size'),
            property_description: formData.get('property_description'),
            // owner_name: formData.get('owner_name'),
            owner_phone: formData.get('owner_phone'),
            agreement_duration: formData.get('agreement_duration')
        };

        // Convert property images to base64
        const propertyImages = Array.from(propertyFileInput.files).slice(0, 5);
        data.property_images = await Promise.all(propertyImages.map(file =>
            convertToBase64(file).then(base64 => ({
                name: file.name,
                base64: base64
            }))
        ));

        // Convert owner image to base64
        const ownerImageFile = ownerFileInput.files[0];
        if (ownerImageFile) {
            const ownerImageBase64 = await convertToBase64(ownerImageFile);
            data.owner_image = {
                name: ownerImageFile.name,
                base64: ownerImageBase64
            };
        }



        try {
            const response = await fetch(`http://localhost:8080/api/properties?userId=${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                form.reset(); // Clear the form
                propertyPreviewContainer.innerHTML = ''; // Clear property image previews
                ownerImageContainer.innerHTML = ''; // Clear owner image preview
                alert('Property listed successfully!');
            } else {
                const errorData = await response.json(); // Assuming the response contains a JSON body
                console.error('Error details:', errorData);
                alert('Failed to list the property. Please try again.');
            }
        } catch (error) {
            console.error("An error occurred:", error);
            console.log("Data sent as JSON:");
            for (const key in data) {
                if (data.hasOwnProperty(key)) { // Check if the property is a direct property of the object
                    console.log(`${key}: ${data[key]}`);
                }
            }
            alert('An error occurred. Please try again.');
        } finally {
            submitButton.disabled = false;
        }
    });

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = function (error) {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    }

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
});

