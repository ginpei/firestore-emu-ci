import {
  clearFirestoreData,
  firestore,
  initializeAdminApp,
  initializeTestApp,
} from "@firebase/rules-unit-testing";
import "babel-polyfill";

export type FirestoreEmu = firestore.Firestore & {
  admin: firestore.Firestore;
  cleanUp: () => void;
  projectId: string;
};

export function prepareFirestore(
  uid: string | undefined,
  projectId = randomName()
): FirestoreEmu {
  const auth = uid ? { uid } : undefined;
  const app = initializeTestApp({ projectId, auth });
  const adminApp = initializeAdminApp({ projectId });

  const fs = app.firestore() as FirestoreEmu;
  fs.admin = adminApp.firestore();
  fs.projectId = projectId;

  fs.cleanUp = () => {
    app.delete();
    adminApp.delete();
    cleanUpFirestore(projectId);
  };

  return fs;
}

export function prepareAdminFirestore(
  projectId = randomName()
): firestore.Firestore {
  const adminApp = initializeAdminApp({ projectId });
  const fs = adminApp.firestore();
  return fs;
}

export function cleanUpFirestore(projectId = randomName()): Promise<void> {
  return clearFirestoreData({ projectId });
}

function randomName() {
  const n = Math.random().toString().slice(2);
  return `project-${n}`;
}
