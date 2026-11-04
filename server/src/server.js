require('dotenv').config();

const app = require('./app');


const { testConnection } = require("./config/database");

const port = process.env.PORT || 3000;

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

async function startServer() {
    try {
        await testConnection();

        app.listen(port, () => {
            console.log(
                `Candidate Screening API running at http://localhost:${port}`
            );
        });
    } catch (error) {
        console.error("Unable to start server:");
        console.error(error);
        process.exit(1);
    }
}

startServer();