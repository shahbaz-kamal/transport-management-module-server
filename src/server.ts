import { Server } from "node:http";
import { app } from "./app";
import { envVars } from "./config/env";

const startServer = async () => {
  let server: Server;
  try {
    server = app.listen(envVars.PORT, () => {
      console.log(`🚌 Server is running on port ${envVars.PORT}`);
    });

    // Function to gracefully shut down the server
    const exitHandler = () => {
      if (server) {
        server.close(() => {
          console.log("Server closed gracefully.");
          process.exit(1); // Exit with a failure code
        });

        // Handle unhandled promise rejections
        process.on("unhandledRejection", (error) => {
          console.log("Unhandled Rejection is detected, we are closing our server...");
          if (server) {
            server.close(() => {
              console.log(error);
              process.exit(1);
            });
          } else {
            process.exit(1);
          }
        });
      } else {
        process.exit(1);
      }
    };
  } catch (error) {
    console.error("Error during server startup:", error);
    process.exit(1);
  }
};

(async () => {
  await startServer();
})();
