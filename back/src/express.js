const express = require('express');
const messagesRoutes = require('./routes/messages');
const bodyParser = require('body-parser');

const startServer = () => {    
    const app = express();
    const port = process.env.APP_PORT;

    const jsonParser = bodyParser.json();
    app.use(jsonParser);

    app.use(messagesRoutes);

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
};

module.exports = {
    startServer
}