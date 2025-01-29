# Scissor URL Shortener

## Overview

Scissor is a URL shortening service that allows users to convert long URLs into short, easy-to-share links. It also provides features such as QR code generation, analytics tracking, user authentication, and link management.

## Features

- **User Authentication**: Secure login and registration system.
- **URL Shortening**: Convert long URLs into short, shareable links.
- **Custom URLs**: Option to create custom short URLs.
- **QR Code Generation**: Automatically generate a QR code for each shortened URL.
- **Link Analytics**: Track the number of clicks, and see analytics for each shortened URL.
- **Link History**: Users can view a history of all their shortened URLs.
- **Redis Caching**: Improved performance through caching frequently accessed URLs.


## Installation

### Prerequisites

- **Node.js** (version 14.x or higher)
- **MongoDB**: Make sure MongoDB is installed and running.
- **Redis**: Make sure Redis is installed and running.
- **npm** or **yarn**

### Backend Setup

1. Navigate to the `backend` directory:

   ```bash
   cd scissor/backend
   Install the required dependencies:
   npm install

Create a .env file in the root of the backend directory and configure the environment variables:

PORT=8000
MONGODB_URI=mongodb://localhost:27017/scissor
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
BASE_URL=http://localhost:8000

Start the backend server:
npm start

The backend will run on http://localhost:8000.

Frontend Setup
Navigate to the frontend directory:
cd scissor/frontend

Install the required dependencies:
npm install

Create a .env file in the root of the frontend directory and configure the environment variables:
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_QR_CODE_API=https://api.qrserver.com/v1/create-qr-code/

Start the frontend server:
npm start

The frontend will run on http://localhost:3000. (the one I hosted online is: https://scissor-url-shortner.hostless.app )

Usage
User Registration and Login
Register: Navigate to http://localhost:3000/ and register a new account.
Login: Use the credentials to log in.

URL Shortening
After logging in, you can shorten URLs by entering them in the input field on the home page.
You can also generate a custom short URL by providing an alias.
A QR code will be generated automatically for the shortened URL.

Link History and Analytics
View your shortened URLs and their analytics by navigating to the "Link History" section.
You can also view detailed analytics for each URL.

Testing
Running Tests
To run tests, make sure you have jest and other test dependencies installed. Then, execute:
npm test


Contributing
If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

License
This project is licensed under the ISC License.

Acknowledgments
QR Code API: QRServer.com
Icons: FontAwesome

Contact
For any inquiries or support, please reach out to cbokesman@gmail.com


### Notes:

- Replace placeholders like `your-mongodb-uri`, `your-redis-url`, `your-jwt-secret`, and `your-email@example.com` with your actual values.
- The `README.md` covers installation, usage, testing, deployment, and contribution guidelines, providing a comprehensive overview of your project.
- Make sure to keep the `README.md` up-to-date as the project evolves.
