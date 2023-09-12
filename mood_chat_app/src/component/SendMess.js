import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { createDMRef, names } from "./MessageUsers";

const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter a valid message");
      return;
    }
    const { uid, displayName, photoURL, email } = auth.currentUser;
    const [firstName, secondName] = names;
    const DMRef = createDMRef(db, firstName, secondName);

    // Make an HTTP request to your server to analyze the sentiment
    try {
      const response = await fetch(" http://localhost:3001/analyze-text ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: message }),
      });

      if (response.ok) {
        const { mood } = await response.json();

        // Add the message along with the mood to Firestore
        await addDoc(DMRef, {
          text: message,
          name: displayName,
          email: email,
          avatar: photoURL,
          createdAt: serverTimestamp(),
          uid,
          mood, // Include mood in the message data
        });

        setMessage("");
        scroll.current.scrollIntoView({ behavior: "smooth" });
      } else {
        console.error("Failed to analyze sentiment");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
