const { addUserToFirestore, createChatRoom } = require('../src/firebase');
const { db } = require('../src/firebase'); // Import the Firebase Firestore instance

describe('Firestore Database Operations', () => {
  it('should add a user to the Firestore database', async () => {
    const user = {
      uid: 'testuid',
      displayName: 'Test User',
      email: 'test@example.com',
    };

    const addedUser = await addUserToFirestore(user);

    // Retrieve the added user from Firestore and compare
    const userDoc = await db.collection('users').doc(addedUser.uid).get();
    expect(userDoc.data()).toEqual(user);
  });

  it('should create a new chat room in Firestore', async () => {
    const chatRoomName = 'Chat Room 1';
    const members = ['User1', 'User2'];

    const createdChatRoom = await createChatRoom(chatRoomName, members);

    // Retrieve the created chat room from Firestore and compare
    const chatRoomDoc = await db.collection('chatRooms').doc(createdChatRoom.id).get();
    expect(chatRoomDoc.data().name).toBe(chatRoomName);
    expect(chatRoomDoc.data().members).toEqual(members);
  });
});
