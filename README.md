# Charity Donation Platform

This project is a web application for managing a charity donation platform. It allows users to make donations via various methods, view fundraising progress, and provides an admin dashboard for managing donations, newsletters, and messages.

## Features

- User-facing donation pages with dynamic counters and progress bars.
- Support for multiple donation methods including crypto and gift cards.
- Newsletter sign-up and message submission forms.
- Admin dashboard to view and manage uploaded gift cards, crypto donations, newsletter sign-ups, and messages.
- File uploads for payment receipts and crypto QR codes.
- Responsive design using Tailwind CSS.
- Backend built with Node.js and Express.
- Data models for users, donations, newsletters, messages, and more.

## Project Structure

- `app.js` - Main application entry point.
- `config/` - Configuration files (e.g., Cloudinary setup).
- `middlewares/` - Express middleware (e.g., file upload handling).
- `models/` - Mongoose data models for various entities.
- `routes/` - Express route handlers for different parts of the app.
- `views/` - EJS templates for rendering frontend pages.
- `public/` - Static assets (CSS, JavaScript, images).
- `uploads/` - Uploaded files storage.
- `.env` - Environment variables (not included in repo).

## Setup and Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd charity
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and configure necessary environment variables (e.g., database URI, Cloudinary credentials).

4. Start the application:
   ```
   npm start
   ```
   or for development with auto-reload:
   ```
   npm run dev
   ```

5. Access the application in your browser at `http://localhost:3000`.

## Usage

- Users can visit the donation pages to contribute via crypto, gift cards, or bank transfer.
- Admins can log in to the admin dashboard to manage donations, view messages, and newsletter sign-ups.
- The site features dynamic counters and progress bars to display fundraising status.

## Dependencies

- Node.js
- Express
- Mongoose
- EJS
- Tailwind CSS
- Other dependencies as listed in `package.json`.

## License

This project is licensed under the MIT License.

---

For any questions or support, please contact the project maintainer.
