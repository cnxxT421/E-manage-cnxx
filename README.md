# E-manage

E-manage is a full-stack **Event Management Platform** frontend built with **React, TypeScript, Socket.IO, Zod, TailwindCSS**. It provides a responsive interface for users to view, create, and manage events in real-time, as well as manage categories and authentication.

## Overview

This plateform allows users to create, view, and manage events. It also allows users to create, view, and manage categories. It also allows users to login and logout. Here are the main features of the platform:

### Home page

This is the landing page of the platform. It shows a list of events and categories.

![Home Page](/client/public/home.png)

### Signup page

This is the signup page of the platform. It allows users to create an account.

![Signup Page](/client/public/signup.png)

### Profile page

After signup or login, users can view their profile page. Here they can manage their events and categories.

![Profile Page](/client/public/profile.png)

### Create Event page

This is the create event page of the platform. It allows users to create an event.

![Create Event Page](/client/public/create-event.png)

### Explore page

After creation of an event, users can view the explore page. Here they can view all the events.

![Explore Page](/client/public/explore.png)

Here is the pagination component that is used in the explore page.

![Pagination Component](/client/public/explore2.png)

## Event Details page

This is the event details page of the platform. It allows users to view the details of an event.

![Event Details Page](/client/public/event-details.png)

## Tech Stacks

### Frontend

-   **Frontend:** React.js (Vite), TypeScript
-   **HTTP Requests:** Axios
-   **Real-time Communication:** Socket.IO
-   **Form Validation:** Zod with React Hook Form
-   **Styling:** TailwindCSS
-   **Deployment:** Vercel

### Backend

-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB (Atlas)
-   **Authentication:** JWT (JSON Web Token)
-   **Real-time:** Socket.IO
-   **Deployment:** Render / Railway.app

## Setup and Installation

### Pre-requisites

-   Node.js
-   npm

### **1️⃣ Clone the Repository**

Clone the repository to your local machine:

```bash
git clone https://github.com/alok-x0s1/E-manage.git
cd E-manage
```

### **2️⃣ Install Dependencies**

Run the following command to install all the necessary dependencies:

```bash
cd server && npm install
cd ../client && npm install
```

### **3️⃣ Configure Environment Variables**

Refer to the [Backend README](/server/README.md) and [Frontend README](/client/README.md) for environment variable setup instructions.

### **4️⃣ Run the Application**

Run the following command to start the application:

```bash
cd server && npm run dev
cd ../client && npm run dev
```

### **5️⃣ Access the Application**

The application will be accessible at [http://localhost:5173](http://localhost:5173) in your browser.

## API Endpoints

Refer to the [Backend README](/server/README.md) for detailed API documentation.

## Contributing

Feel free to submit pull requests and open issues. Contributions are always welcome!

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## Support

For any issues, contact : **[@contact_me](https://instagram.com/mr_x0s1)**

## Thank You!

Thanks for using E-manage! If you have any questions or feedback, don't hesitate to reach out. Happy event planning!
