# E-manage | Backend

E-manage is a full-stack **Event Management Platform** backend built with **Node.js, Express, MongoDB, TypeScript, and Socket.IO**. It provides API endpoints for user authentication, event management, real-time attendee tracking, and category management.

## Tech Stack

-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB (Atlas)
-   **Authentication:** JWT (JSON Web Token)
-   **Real-time:** Socket.IO
-   **Deployment:** Render / Railway.app

## Setup and Installation

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/alok-x0s1/E-manage.git
cd E-manage/server
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Configure Environment Variables**

Create a `.env` file in the root directory and add the following:

```sh
  PORT=3000
  CLIENT_URL=your_frontend_url
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  NODE_ENV=development
  JWT_TOKEN_SECRET=your_jwt_secret
  CLOUDINARY_NAME=your_cloudinary_name
  CLOUDINARY_API_KEY=your_cloudinary_api_key
  CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### **4️⃣ Start the Server**

```sh
npm start
```

The backend will run at `http://localhost:3000`.

## 🔐 Authentication API (JWT-based)

Here are the API endpoints for user authentication:

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| POST   | /api/users/sign-up | Register a new user    |
| POST   | /api/users/sign-in | Login user & get token |
| POST   | /api/users/logout  | Logout user            |
| GET    | /api/users/profile | Get user profile       |

Example **User Registration:**

```sh
POST /api/auth/register
{
  "username": "john-doe",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securepassword"
  "avatar": "https://example.com/avatar.jpg"
}
```

Example **Login Response:**

```json
{
	"token": "your_jwt_token",
	"_id": "660b2c3d4e5f6g7h8i9j0k"
}
```

---

## 📅 Event Management API

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| GET    | /api/events           | Get all events     |
| GET    | /api/events/:id       | Get a single event |
| POST   | /api/events           | Create an event    |
| PATCH  | /api/events/:id       | Update an event    |
| DELETE | /api/events/:id       | Delete an event    |
| PATCH  | /api/events/join/:id  | Join an event      |
| PATCH  | /api/events/leave/:id | Leave an event     |

Example **Create Event:**

```sh
POST /api/events
{
  "title": "Tech Conference",
  "description": "An amazing tech event",
  "startDate": "2024-06-15",
  "endDate": "2024-06-17",
  "category": "660b2c3d4e5f6g7h8i9j0k",
  "location": "San Francisco"
  "price": "100",
  "isFree": false,
  "url": "https://example.com/event",
  "image": "https://example.com/event-image.jpg"
}
```

---

## 🏷 Category API

| Method | Endpoint      | Description        |
| ------ | ------------- | ------------------ |
| GET    | /api/category | Get all categories |
| POST   | /api/category | Create a category  |

Example **Create Category:**

```sh
POST /api/categories
{
  "_id": "660b2c3d4e5f6g7h8i9j0k",
  "name": "Technology",
  "description": "All tech events"
}
```

## Contributing

Feel free to submit pull requests and open issues. Contributions are always welcome!

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## Support

For any issues, contact : **[@contact_me](https://instagram.com/mr_x0s1)**

🎉 Thank You!
