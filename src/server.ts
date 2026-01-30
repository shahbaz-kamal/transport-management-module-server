import { Server } from "node:http";
import { app } from "./app";
import { envVars } from "./config/env";

const startServer = async () => {
  let server: Server;
  try {
    server = app.listen(envVars.PORT, () => {
      console.log(`🚌 Server is running on port ${envVars.PORT}`);
    });
  } catch (error) {
    console.error("Error during server startup:", error);
    process.exit(1);
  }
};

(async () => {
  await startServer();
})();
