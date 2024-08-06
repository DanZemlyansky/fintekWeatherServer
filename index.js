const express = require('express');
const weatherRoutes = require('./routes');

const app = express();

app.use('/api', weatherRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
