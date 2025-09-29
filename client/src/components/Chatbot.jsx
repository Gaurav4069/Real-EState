import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react"; 

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const API_KEY = "AIzaSyDvvdqVBlH0m8R_awO-336aaD1nn3SwKOQ";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

  const faqResponses = {
    "how do i create a listing": "To create a listing, log in, go to your dashboard, click 'Add Listing', fill in details and submit.",
    "how do i contact a landlord": "Open the listing and click 'Contact Landlord'. Fill the form and send your message.",
    "how does payment work": "Payments are handled via Razorpay. Select 'Book/Buy' on a listing and complete the payment securely.",
    "how do i register": "Click 'Sign Up', enter your details, and verify your email to register.",
    "how do i login": "Click 'Login', enter your credentials or use Google OAuth to sign in.",
    "what features does this project have": "This platform allows creating and managing property listings, searching/filtering properties, making payments, and interacting via a chatbot."
  };

  const checkFAQ = (query) => {
    const lowerQuery = query.toLowerCase();
    for (let key in faqResponses) {
      if (lowerQuery.includes(key)) {
        return faqResponses[key];
      }
    }
    return null;
  };

  const generateBotResponse = async () => {
    const faqAnswer = checkFAQ(input);
    if (faqAnswer) {
      setMessages((prev) => [...prev, { text: faqAnswer, sender: "bot" }]);
      return;
    }

    const projectContext = `
You are a helpful chatbot for a Real Estate Listing Platform.
Answer ONLY questions about:
- Property listings
- User authentication & profile
- Searching & filtering
- Booking/scheduling
- Payments
- Chatbot usage
Politely refuse to answer anything unrelated.
`;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          { parts: [{ text: projectContext }, { text: input }] },
        ],
      }),
    };

    try {
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message);

      setMessages((prev) => [
        ...prev,
        { text: data.candidates[0].content.parts[0].text, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, something went wrong. Try again.", sender: "bot" },
      ]);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    generateBotResponse();
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isChatOpen && (
        <button
          className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
          onClick={() => setIsChatOpen(true)}
        >
          <MessageCircle size={40} />
        </button>
      )}

      {isChatOpen && (
        <div className="w-80 h-96 flex flex-col bg-white shadow-lg rounded-lg fixed bottom-16 right-5">
          <div className="bg-blue-500 text-white p-3 flex justify-between items-center rounded-t-lg ">
            <h2 className="text-lg font-semibold ">Chat With Me</h2>
            <button onClick={() => setIsChatOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-3 flex flex-col">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-1 rounded-md max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white ml-auto text-right"
                    : "bg-gray-300 text-black mr-auto text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex border-t p-2">
            <input
              type="text"
              className="flex-grow border p-2 rounded-l-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;


