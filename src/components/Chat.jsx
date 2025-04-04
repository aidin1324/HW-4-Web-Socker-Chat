import { useState, useEffect, useRef } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);
  
  const ws = useRef(null);
  const chatContainerRef = useRef(null);

  // Initialize WebSocket connection
  useEffect(() => {
    // Connect to WebSocket server
    ws.current = new WebSocket('ws://localhost:3000');
    
    // Connection opened
    ws.current.onopen = () => {
      console.log('Connected to WebSocket server');
      setConnected(true);
      setError(null);
    };
    
    // Listen for messages
    ws.current.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      
      if (receivedData.type === 'history') {
        // Process the history data
        setMessages(receivedData.data.map(msg => msg.data));
      } else if (receivedData.type === 'message') {
        // Add new message
        setMessages(prev => [...prev, receivedData.data]);
      }
    };
    
    // Handle connection errors
    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('Failed to connect to the chat server');
      setConnected(false);
    };
    
    // Connection closed
    ws.current.onclose = () => {
      console.log('Disconnected from WebSocket server');
      setConnected(false);
    };
    
    // Clean up on unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);
  
  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  // Handle sending messages
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!inputValue.trim() || !connected) return;
    
    const messageData = {
      type: 'message',
      data: inputValue
    };
    
    // Send the message to the server
    ws.current.send(JSON.stringify(messageData));
    
    // Clear the input field
    setInputValue('');
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4 max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
        {/* Chat header */}
        <div className="bg-indigo-600 text-white p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">WebSocket Chat</h2>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${connected ? 'bg-green-400' : 'bg-red-500'}`}></div>
            <span className="text-sm">{connected ? 'Connected' : 'Disconnected'}</span>
          </div>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-2 rounded">
            {error}
          </div>
        )}
        
        {/* Messages container */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-3"
        >
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((message, index) => (
              <div 
                key={index} 
                className="bg-indigo-50 p-3 rounded-lg max-w-xs md:max-w-md break-words"
              >
                {message}
              </div>
            ))
          )}
        </div>
        
        {/* Message input form */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
          <div className="flex">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={!connected}
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400"
              disabled={!connected || !inputValue.trim()}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;