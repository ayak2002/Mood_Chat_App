import admin, { credential as _credential} from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {firebaseConfig} from '../src/firebase';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

describe('Firestore Data Tests', () => {
  afterAll(async () => {
    // Clean up any resources if needed
    // E.g., close Firestore connection
    await app().delete();
  });

  it('should save data to Firestore', async () => {
    const data = {
      // Your data to save
      field1: 'value1',
      field2: 'value2',
    };

    const docRef = db.collection('test_collection').doc('test_document');

    // Attempt to write data to Firestore
    await docRef.set(data);

    const snapshot = await docRef.get();
    const retrievedData = snapshot.data();

    expect(retrievedData).toEqual(data);
  });

  it('should fail to save data with invalid data', async () => {
    const invalidData = {
      // Invalid data
      field1: 123, // Field1 should be a string, not a number
    };

    const docRef = db.collection('test_collection').doc('invalid_document');

    // Attempt to write invalid data to Firestore
    await expect(docRef.set(invalidData)).rejects.toThrow();
  });
});
