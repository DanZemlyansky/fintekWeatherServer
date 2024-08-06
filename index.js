const express = require('express');
const weatherRoutes = require('./routes');

const app = express();

app.get('/', (req, res) => {
    res.send('Server is up and running');
});

app.use('/api', weatherRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
