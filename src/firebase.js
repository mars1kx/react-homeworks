import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import logger from "./utils/logger";

const firebaseConfig = {
  apiKey: "AIzaSyCC2oPuG1oKPsxjZ0xtEqN4t4oS0_urWNM",
  authDomain: "foodik-7be91.firebaseapp.com",
  projectId: "foodik-7be91",
  storageBucket: "foodik-7be91.firebasestorage.app",
  messagingSenderId: "205195014612",
  appId: "1:205195014612:web:cedc5f291b31596621a641",
  measurementId: "G-5H4G4P4N08"
};

let app;
let auth;

try {
  logger.info("Initializing Firebase app");
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  logger.info("Firebase initialized successfully");
} catch (error) {
  logger.error("Error initializing Firebase", error);
  throw error;
}

export { auth };
export default app; 