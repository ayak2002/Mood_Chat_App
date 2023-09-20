# Mood_Chat_App
The Mood Chat App is a real-time chat application designed to facilitate communication between users. It leverages Firebase for user authentication and Firestore for storing chat data. In this documentation report, we'll explore the project's various components, their implementation techniques, and the design decisions made to ensure an efficient and user-friendly experience.

### To run the app ###

1. Navigate to the `node_server` repository, and run `node server.js`.
2. Navigate to the `mood_chat_app` repository, and run `npm start`.
3. In your browser, enter 'http://localhost:3000/'.
   
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

### **MoodFilter.js**

#### **Implementation Techniques:**

The `MoodFilter.js` component is responsible for enabling users to filter chat messages based on mood, providing an additional layer of interaction and organization within the Mood Chat App.

- **Filtering Options:** The code dynamically generates a dropdown menu that lists various mood options, ranging from extremely negative to extremely positive, as well as an "Unknown" category. Users can select a mood from the dropdown to filter messages.
  
- **'onFilterChange' Prop:** The component utilizes a callback prop, onFilterChange, to notify the parent component (in this case, ChatBox.js) of the selected mood filter. This interaction ensures that the chat messages are dynamically filtered based on the user's selection.

#### **Design Decisions:**

- **User-Friendly Filtering:** The MoodFilter.js component enhances the user experience by providing an intuitive way to filter messages based on mood. This feature allows users to focus on specific types of content within the chat, improving readability and usability.

- **All Moods Option:** The inclusion of an "All Moods" option in the dropdown ensures that users can easily revert to viewing all messages, providing flexibility and convenience.

- **Real-Time Filtering:** The design of the mood filtering feature ensures that changes take effect in real time. When a user selects a mood, the chat messages are immediately updated to reflect the chosen filter, creating a responsive and interactive interface.

### **server.js**

#### **Implementation Techniques:**

The `server.js` file represents the server-side code responsible for handling sentiment analysis requests from the Mood Chat App's frontend. It serves as a bridge between the frontend application and the sentiment analysis service.

- **Express.js Server:** The code leverages the Express.js framework to create a lightweight and efficient server that listens for incoming HTTP requests.

- **Sentiment Analysis Endpoint:** An HTTP POST endpoint is defined, typically accessible at a route like /analyze-text. This endpoint expects a JSON request containing the text to be analyzed.

- **Sentiment Analysis Service Integration:** The server communicates with a sentiment analysis service, which performs the actual mood analysis of the text. It sends the text data to this service, awaits a response, and returns the result to the frontend.

#### **Design Decisions:**

- **Separation of Concerns:** The decision to create a dedicated server for sentiment analysis requests adheres to the principle of separation of concerns. It isolates this specific functionality from the main frontend application, promoting maintainability and scalability.

- **HTTP POST Method:** The use of the HTTP POST method for sentiment analysis requests is a common and secure approach. It ensures that sensitive text data is transmitted securely to the server for analysis.

- **Error Handling:** The server code incorporates error handling to address potential issues, such as communication errors with the sentiment analysis service or invalid requests. Robust error handling ensures that the server responds gracefully to unexpected situations.

- **Modular Design:** The server code is designed to be modular and can be easily extended to support additional functionality or endpoints in the future.
  
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





## Testing

The tests below collectively cover key aspects of the Mood Chat App, including authentication, Firestore data storage, mood filtering, and sentiment analysis. They help ensure the reliability and correctness of the application's functionality. Additionally, we leveraged **GitHub Actions** for continuous integration to automate the testing process and ensure code quality.

### Environment Setup:

The @jest-environment jsdom comment indicates that the tests are run in a JavaScript DOM environment, which is suitable for testing React components.

### auth.test.js

**Purpose:**

The `auth.test.js` file contains tests related to user authentication in the Mood Chat App. It focuses on rendering the application and checking the presence of the sign-in button when the user is not authenticated.

**Implementation Details:**

- **Firebase Authentication Mocking:** The file effectively mocks the Firebase authentication module to simulate authentication-related functions. Mocking allows for controlled testing without actual authentication actions.

- **App Rendering Test:** The first test verifies that the App component renders without errors. It uses the render function from the testing library to render the component and checks if the container is present in the document.

- **Sign-In Button Test:** The second test ensures that the sign-in button is displayed when the user is not authenticated. It uses the render function to render the App component and checks for the presence of the "Please sign in to use the chat" text.

- **Mocking User Interaction:** The file also mocks the AddUser function, which is called when a user signs in. The mocked implementation logs information about the function call, providing a way to monitor the execution of this critical function.

### firebase.test.js

**Purpose:**

The `firebase.test.js` file contains tests related to Firestore data storage in the Mood Chat App. It focuses on saving data to Firestore and handling data validation.

**Implementation Details:**

- **Firebase Initialization:** The file initializes Firebase using the provided firebaseConfig and sets up a connection to Firestore. This setup ensures that Firestore operations can be tested.

- **Data Saving Test:** The primary test in this file checks if data can be successfully saved to Firestore. It creates a sample data object, sets it in a Firestore document, retrieves the data, and asserts that the retrieved data matches the original.

- **Invalid Data Test:** The second test verifies the system's ability to handle invalid data. It attempts to save data with an incorrect format and checks if the system throws an error.

### MoodFilter.test.js

**Purpose:**

The `MoodFilter.test.js` file contains tests related to the mood filtering functionality in the Mood Chat App. It checks whether the MoodFilter component renders correctly and whether the filter change callback is triggered when a mood is selected.

**Implementation Details:**

- **Rendering Test:** The file's first test checks if the MoodFilter component renders correctly. It uses the testing library to render the component and verifies the presence of the "Filter by Mood:" label.

- **Filter Change Test:** The second test ensures that selecting a mood triggers the filter change callback. It simulates a mood selection and checks if the callback function is called with the selected mood.

### sentimentAnalysis.test.js

**Purpose:** 

The `sentimentAnalysis.test.js` file contains tests related to sentiment analysis of text messages in the Mood Chat App. It tests whether the sentiment analysis function correctly categorizes text messages into sentiment categories.

**Implementation Details:** 

- **Sentiment Mapping**: The file defines a mapping of different moods to sentiment categories. This mapping is used to categorize the results of sentiment analysis.

- **Sentiment Analysis Tests:** The file dynamically generates tests based on the mood mapping. For each mood, it tests whether the analyzeText function categorizes a text message correctly.

### Disclaimer
While a substantial amount of independent work and effort went into the development and testing of this project on our end to demonstrate a well-rounded and self-driven approach, ChatGPT and online resources were a valuable source of help when working on this project. Such resources were a great guide to understand the workflow of making an app such as the Mood Chat App and make all the appropriate choices to end up with a robust result.

### Video Demo
https://drive.google.com/file/d/1uUcBuRjz2N5oscLRS17DiKEEinPMLORc/view?usp=sharing
