
# Find Your Home


Find Your Home is a comprehensive real estate platform designed to simplify the process of browsing, listing, and managing properties for rent or sale. With a user-centric design and a robust backend, this project ensures a seamless experience for users and efficient property management for sellers.


## Technologies Used


**Frontend:** HTML, CSS, Bootstrap, Bootstrap Icons, Animate on Scroll, JavaScript (Fetch API)

**Backend:** Java Spring Boot, MySQL

**Data Handling:** REST API, Base64 Encoding for Images


## Features

- **Dynamic Property Listings:** Interactive and filterable property cards.
- **Base64 Image Handling:** Efficient storage and display of images.

- **User Dashboard:** Intuitive interface for managing property listings.



## Project Structure

**Main Page (home.html):** 

- **Login/Signup:** Users can authenticate using email and password.
- **Property Listings:** Displays latest properties with options to view all or filter by rent/sell.
- **Action Options:** Navigate to sell.html for selling or renting a property.
- **Testimonials:** Featured user testimonials.
- **Footer:** Contains relevant links and information.

**Rent Page (rent.html):** 

- **Property Listings:** Shows all rental properties with filtering options (House, Rooms, Flat, Store).
- **Card Format:** Properties displayed in a card format with basic information and "View Details" button.
- **Footer and Testimonials:** Consistent with home.html.

**Buy Page (buy.html)**
- **Property Listings:** Displays properties available for purchase with similar filtering options as rent.html.
- **Card Format:** Similar layout to rent.html.
- **Footer and Testimonials:** Consistent with home.html.

**Sell Page (sell.html)**
- **Form for Listing:** Users can list properties with details including contact number, location, type, purpose, description, price, negotiability, photos, owner photo, and agreement duration.
- **Image Upload:** Supports image uploads encoded in Base64 format.

**Dashboard (dashboard.html)**
- **User Properties:** Displays all properties listed by the logged-in user.
- **Management:** Options to edit or delete property listings.
- **Footer and Testimonials:** Consistent with other pages.
## Functionality and Data Handling

- **Property Cards:** Display includes image, location, price, short description, negotiability, phone number, and a "View Details" button.
- **View Details:** Shows complete property details upon clicking the button.
- **Image Handling:** Base64 encoding for image storage and decoding for display.
##  Backend Implementation

**Framework:** Spring Boot with Spring Data JPA

**Architecture:**

- **Controller:** Manages requests and responses.
- **DTO (Data Transfer Object):** Encapsulates data for transfer.
- **Service:** Contains business logic.
- **Repository:** Handles data persistence.
- **Entity:** Maps Java objects to database tables.
- **Configuration:** Manages settings and configurations.
## API Interaction

- **REST API:** Facilitates frontend-backend communication using JSON.
- **Fetch API:** For asynchronous requests in JavaScript.
## Getting Started Steps


- **Clone the Repository:**
```bash
git clone https://github.com/RohanEkashinge/Find-Your-Home
```

- **Set Up Backend:** Configure MySQL database properties in 'appliction.properties' file(set username and password according to your settings) and Spring Boot application properties.

 - **Run Backend:** You can use an IDE like IntelliJ IDEA or Eclipse to start the Spring Boot application. Alternatively, use the command line:
```bash
./mvnw spring-boot:run
```

- **Set Up Frontend:** Open home.html in a browser to view the application.

- **Install Dependencies:** Ensure all frontend dependencies (Bootstrap, Animate on Scroll) are available.(if you have stable internate it will loaded automatically.)

