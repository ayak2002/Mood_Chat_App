# Mood_Chat_App
The Mood Chat App is a real-time chat application designed to facilitate communication between users. It leverages Firebase for user authentication and Firestore for storing chat data. In this documentation report, we'll explore the project's various components, their implementation techniques, and the design decisions made to ensure an efficient and user-friendly experience.

### **AddUser.js**

#### **Implementation Techniques:**

The `AddUser.js` module is responsible for adding users to the Firestore database. It integrates Firebase Firestore's modular features to handle database operations efficiently. 

- **Firebase Integration:** The code incorporates Firebase Firestore's features by utilizing modular imports. It imports necessary functions for adding users to the database, creating references, and handling real-time updates.

- **User Addition:** The heart of the module is the `AddUser` function, which adds user data, including name, email, avatar, and UID, to Firestore. This function also checks for duplicate users by comparing name and email to members of the collection before adding them.

#### **Design Decisions:**

- **Error Handling:** To ensure robustness, the code includes comprehensive error handling. Any errors that occur during the user addition process are captured and logged for debugging.

- **Uniqueness Check:** One of the critical design decisions is the implementation of a check for existing users with the same name and email. This design choice helps prevent duplicate entries in the database in hopes to prevent the incorrect querying of messages and chats

### **ChatBox.js**

#### **Implementation Techniques:**

The `ChatBox.js` component plays a pivotal role in displaying chat messages and managing user interactions as it poses as the platform for the rendering of the chat functionality.

- **Firebase Realtime Updates:** The code adeptly harnesses Firebase Firestore's `onSnapshot` method to monitor and display real-time updates in chat messages. Messages are sorted by their `createdAt` timestamp, ensuring that the latest messages are displayed first.

- **Message Sorting:** It organizes messages by timestamp, creating an intuitive chat flow for users. Additionally, it introduces mood filtering, allowing users to sort messages based on their mood by leveraging our sentiment analysis module.

#### **Design Decisions:**

- **Component Modularity:** The `ChatBox.js` component embraces a modular design approach. It breaks down complex functionalities into smaller, reusable components, including `MoodFilter`, `Message`, and `SendMessage`, enhancing code maintainability.

- **Smooth Scrolling:** To enhance the user experience, the code incorporates smooth scrolling. When a new message is sent or received, the screen automatically scrolls down to display the new message, ensuring users don't miss any updates.

### **Message.js**

#### **Implementation Techniques:**

The `Message.js` module handles the display of individual chat messages and integrates sentiment analysis for mood interpretation.

- **Firebase Authentication:** It adeptly employs Firebase Authentication (`auth`) and the `useAuthState` hook to determine the current user.

- **Sentiment Analysis:** The code demonstrates the use of asynchronous operations by sending message text to a local server for sentiment analysis using the Axios library.

#### **Design Decisions:**

- **Real-time Display:** Messages, including user avatars, names, text, and mood analysis results, are dynamically displayed in real-time. This design choice ensures that users can engage in seamless conversations.

- **Loading Indicator:** A loading indicator is thoughtfully added while sentiment analysis is being performed, providing a responsive and informative user experience.

### **MessageUsers.js**

#### **Implementation Techniques:**

The `MessageUsers.js` component governs user interactions, chat creation, and user management.

- **Firebase Integration:** Firebase Firestore (`db`) and Firebase Authentication (`auth`) are effectively integrated for user management and chat data storage.

- **Chat Creation:** The code features a `newChat` function for initiating chat conversations between users. It also includes a check to ensure that the chat collection is empty before adding data. This way the users previous chat will be maintained and displayed on returning to the chat. 

#### **Design Decisions:**

- **User Interaction:** `MessageUsers.js` thoughtfully handles user interactions by enabling users to initiate conversations with others. It also introduces a button to create predefined chatrooms, enhancing the versatility of the app, thus coupling the ability to have one on one "DMs" or direct messaging along with a larger more open live chat room for all users.

- **Array Sorting:** A notable design decision is the sorting of user names alphabetically, ensuring consistency in chatroom creation and allowing for chat history to be pulled regardless if the current user was previously the sender and is now the receiver. 

### **SearchUsers.js**

#### **Implementation Techniques:**

The `SearchUsers.js` component focuses on user search functionality, providing a user-friendly way to discover and engage with other users.

- **Firebase Integration:** It effectively interacts with Firebase Firestore (`db`) to search for users based on their names or emails.

- **Case-Insensitive Search:** The code introduces a case-insensitive search function, enhancing the flexibility of search queries.

#### **Design Decisions:**

- **User Interface:** The search bar in `SearchUsers.js` is designed with a user-friendly interface, allowing users to find and initiate conversations with others seamlessly.

- **Results Display:** Search results, including user names, emails, and buttons to start conversations with selected users, are presented in a clear and organized manner, ensuring a smooth user experience.

### **SendMessage.js**

#### **Implementation Techniques:**

The `SendMessage.js` component is responsible for sending chat messages and managing message-related functionalities.

- **Firebase Integration:** Firebase Firestore (`db`) and Firebase Authentication (`auth`) are effectively integrated for adding messages to the chat database.

- **Sentiment Analysis:** The code handles asynchronous operations by making an HTTP request to a local server for sentiment analysis of messages, utilizing the Axios library.

#### **Design Decisions:**

- **Message Sending:** A user-friendly interface for sending messages, complete with a send button, ensures effortless communication within the app.

- **Error Handling:** Comprehensive error handling is in place, covering various scenarios, such as sending empty messages or encountering errors during sentiment analysis. This design choice prioritizes user satisfaction and smooth communication.

### **TextAnalysis.js**

#### **Implementation Techniques:**

The `TextAnalysis.js` module provides a utility function, `analyzeText`, which is crucial for sentiment analysis.

- **Axios Usage:** The code exhibits modular thinking by separating text analysis functionality into its own file, enhancing code organization and reusability.

#### **Design Decisions:**

- **Modular Code:** By separating the text analysis functionality into a separate module, the codebase is kept clean and maintainable. This design decision adheres to best practices in code organization.

### **App.js**

#### **Implementation Techniques:**

The `App.js` component serves as the entry point to the application, handling user authentication and rendering other components.

- **Firebase Authentication:** Firebase Authentication (`auth`) and the Google Sign-In API are integrated to manage user authentication.

- **User Initialization:** The code calls the `AddUser` function to add authenticated users to Firestore when they sign in, ensuring that user data is available for chat functionalities.

#### **Design Decisions:**

- **User Sign-In/Sign-Out:** The design of the user sign-in and sign-out features is user-friendly and intuitive. Users can sign in with Google, and the app smoothly handles sign-out actions.

- **Conditional Rendering:** The conditional rendering of the `MessageUsers` component based on user authentication status and conversation initiation ensures that users have a seamless and personalized experience.

---

The Mood Chat App project showcases a well-thought-out combination of Firebase, Axios, and modular React components. Each module levels Firebase Firestore for real-time updates and user management. Firebase and Firestore were chosen due to their exceptional real-time capabilities, scalability, and offline support, all of which are vital for a chat application. Firebase's robust authentication system ensures secure user management, while Firestore's developer-friendly SDKs simplify frontend development. The serverless architecture eliminates server management concerns, and the integration of sentiment analysis seamlessly aligns with Firebase's scalability and real-time features. Furthermore, Firestore's fine-grained security rules provide essential data protection. Overall, Firebase and Firestore offer a powerful combination of features that cater to the specific needs of a real-time chat application, making them the preferred choice for this project. Also, the project's design decisions prioritize user experience, error handling, and code organization, resulting in an engaging and user-friendly chat application leading to a well rounded and robust chat app.
