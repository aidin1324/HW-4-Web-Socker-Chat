# WebSocket Chat Application HW-4

This project is a real-time chat application built with React and WebSocket. The application allows users to send and receive messages in real-time, load message history, and interact with other users.

## 📋 Features

- ✅ Real-time messaging using WebSocket
- ✅ Message history loading on page refresh
- ✅ Instant message updates from other users
- ✅ Styled interface using TailwindCSS
- ✅ Responsive design for various devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server (available at [chat-back](https://github.com/DimitriosKhristoforidi/chat-back.git))

### Installation

1. Clone the backend repository:
```bash
git clone https://github.com/DimitriosKhristoforidi/chat-back.git
cd chat-back
npm install
npm start
```

2. Clone this frontend repository:
```bash
git clone <your-repository-url>
cd <repository-name>
npm install
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## 💻 Technical Implementation

### WebSocket Connection

The application connects to the WebSocket server when loaded and handles these message types:

- **History** - Received upon connection:
```json
{
    "type": "history",
    "data": [
        { "data": "Message 1" },
        { "data": "Message 2" }
    ]
}
```

- **New Message** - Received when a new message arrives:
```json
{
    "type": "message",
    "data": "New message content"
}
```

- **Send Message** - Format for sending messages:
```json
{
    "type": "message",
    "data": "Message text"
}
```

### UI Components

- Chat window with scrollable message history
- Message input field
- Send button
- User-friendly interface styled with TailwindCSS



## 🎯 Completion Criteria

- [x] WebSocket server connection
- [x] Message history loading and display
- [x] Real-time message reception
- [x] Message sending via WebSocket
- [x] Attractive UI with TailwindCSS

## 🛠️ Technologies Used

- React.js
- WebSocket API
- TailwindCSS
- JavaScript ES6+
