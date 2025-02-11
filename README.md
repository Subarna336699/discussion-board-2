# Discussions App

## Overview
This is a simple discussions application built using React and React Router. Users can create discussions, view them, and react with likes and dislikes. The application utilizes `localStorage` to persist discussions and user interactions.

## Features
- View a list of discussions
- Post a new discussion
- Like and dislike discussions
- Data persistence using `localStorage`

## Installation

### Prerequisites
Ensure you have Node.js and npm installed on your system.

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/discussions-app.git
   cd discussions-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the application:
   ```sh
   npm start
   ```

## File Structure
```
.
├── src
│   ├── components
│   │   ├── Discussions.js  # Displays all discussions with like/dislike functionality
│   │   ├── NewDiscussion.js  # Form to create a new discussion
│   ├── App.js  # Main application component with routing
│   ├── index.js  # Entry point
│   ├── styles.css  # Global styles (optional)
├── public
│   ├── index.html
├── package.json
├── README.md
```

## Usage
### Viewing Discussions
- Navigate to `/discussions` to see a list of all discussions.
- Click on a discussion title to view details (if implemented).

### Creating a Discussion
- Navigate to `/new-discussion`.
- Fill in the title and content fields.
- Click "Post Discussion" to save.

### Reacting to Discussions
- Click the ❤️ **Like** button to like a discussion.
- Click the 👎 **Dislike** button to dislike a discussion.
- Clicking the same button again will remove your reaction.

## Technologies Used
- React.js
- React Router
- Bootstrap for UI styling
- LocalStorage for persistence

## Future Enhancements
- Implement discussion detail pages.
- Add user authentication.
- Improve UI with better styling.
- Enable comment functionality.

# Credit 
- develope by subarna poudel  with some Ai assistance