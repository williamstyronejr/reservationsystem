import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

const {
  FIREBASE_API,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} = process.env;

const firebaseApp = initializeApp({
  apiKey: FIREBASE_API,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
});

const storage = getStorage(firebaseApp);
export const defaultUrls: {
  profileImage: string;
  storeHeader: string;
  storeIcon: string;
} = { profileImage: '', storeIcon: '', storeHeader: '' };

/**
 * Gets a url for a file in firebase storage.
 * @param fileLoc File location (most cases just the name)
 * @returns Returns a promise to resolve with a url to access the file.
 */
export async function getFileUrl(fileLoc: string): Promise<string> {
  const fileRef = ref(storage, fileLoc);
  return getDownloadURL(fileRef);
}

export async function uploadFirebaseFile(
  file: any,
  fileName: string,
  path = '',
): Promise<{ name: string; url: string; fieldName: string }> {
  if (!file) throw new Error('No file was provided.');

  const storageRef = ref(storage, `${path}${fileName}`);
  await uploadBytes(storageRef, file.buffer, {
    contentType: file.mimetype,
  });

  const fileUrl = await getDownloadURL(storageRef);

  return {
    name: fileName,
    url: fileUrl,
    fieldName: file.fieldname,
  };
}

export async function removeFirebaseFile(fileUrl: string) {
  console.log(fileUrl);
  const fileRef = ref(storage, fileUrl);
  const results = await deleteObject(fileRef);

  return results;
}

export async function initDefaults() {
  const res = await Promise.all([
    getFileUrl('defaultProfileImage.jpeg'),
    getFileUrl('defaultStoreHeader.jpeg'),
    getFileUrl('defaultStoreIcon.jpeg'),
  ]);

  [defaultUrls.profileImage, defaultUrls.storeHeader, defaultUrls.storeIcon] =
    res;
}
