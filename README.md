# Real-Time Chat Application

A real-time chat application built using **Next.js** (Client) and **Express + Socket.IO** (Server).  
The project runs with **two separate servers**.

---

## Project Structure

my-chat-app/
├── client/ # Next.js frontend
├── server/ # Express + Socket.IO backend
├── .gitignore
└── README.md

yaml
Copy code

---

## Getting Started

Follow the steps below to run the project locally.

---

## Step 1: Clone the Repository

```bash
git clone <your-github-repository-url>
cd my-chat-app
Step 2: Install Server Dependencies
bash
Copy code
cd server
npm install
Step 3: Install Client Dependencies
bash
Copy code
cd ../client
npm install
Step 4: Start the Server (Run This First)
bash
Copy code
cd ../server
npm run dev
The server will start on:

arduino
Copy code
http://localhost:3000
Step 5: Start the Client
Open a new terminal window and run:

bash
Copy code
cd client
npm run dev
The client will start on:

arduino
Copy code
http://localhost:3001
How It Works
The backend server uses Express and Socket.IO for real-time communication

The frontend is built with Next.js

The client connects directly to the Socket.IO server

No proxy or rewrites are used for WebSocket connections

Important Notes
Always start the server before the client

Both servers must be running for the application to work

Socket.IO requires a direct connection (no HTTP proxy)

Tech Stack
Frontend: Next.js, React, Redux Toolkit, Tailwind CSS

Backend: Express.js, Socket.IO

Communication: WebSockets

Running URLs
Service	URL
Backend (Socket.IO)	http://localhost:3000
Frontend (Next.js)	http://localhost:3001

Author
Built with ❤️ using JavaScript

yaml
Copy code

---

This is **100% valid Markdown**, properly formatted, and ready for GitHub.

If you want:
- badges (Node, Next.js)
- screenshots section
- deployment instructions

Just tell me 👌

### Personal Dev Mode 
<img width="1091" height="192" alt="image" src="https://github.com/user-attachments/assets/e52b0d87-d2c6-4851-927d-55a091ffe668" />

### Private and group message at same point 
<img width="1918" height="566" alt="image" src="https://github.com/user-attachments/assets/b8dd8a2a-d728-4bb3-b761-125e50e7132f" />

### Realtime typing update
<img width="1913" height="368" alt="image" src="https://github.com/user-attachments/assets/456039ae-dc73-4266-ae50-07913984f889" />

