import createExpressApp from "./app.js";
import config from "./config/config.js";
async function startServer() {
    console.log("Starting server...");
    const expressApp = createExpressApp();
    expressApp.listen(config.server.port, () => {
        console.log(`Server is running on http://localhost:${config.server.port}`);
    });
}
// Start the server and catch if any errors
startServer().catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
});
