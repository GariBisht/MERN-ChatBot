import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // const handleSend = async () => {
  //   if (!input.trim()) return;
  //   const newMessages = [...messages, { role: "user", content: input }];
  //   setMessages(newMessages);

  //   try {
  //     const res = await axios.post("http://localhost:5000/api/chat", {
  //       message: input,
  //     });
  //     setMessages([...newMessages, { role: "bot", content: res.data.reply }]);
  //     setInput("");
  //   } catch (err) {
  //     console.error("Chat error:", err);
  //   }
  // };


  const handleSend = async () => {
    if (!input.trim()) return;
  
    setMessages([...messages, { type: "user", text: input }]);
    setInput("");
  
    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: input,
      });
  
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: res.data.reply },
      ]);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Something went wrong on the server.";
  
      // Show error as bot message
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: `❌ Error: ${errorMessage}` },
      ]);
    }
  };
  


  return (
    <div className="chat-wrapper">
    <div className="chat-container">
      <h2>AI Chatbot</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={msg.role}>
            <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}
          </div>
        ))}{messages.map((msg, index) => (
          <div
            key={index}
            className={msg.type === "user" ? "user" : msg.type === "bot" ? "bot" : "error"}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition">
         Send
        </button>
        
      </div>
      </div>
    </div>
  );
}

export default App;
