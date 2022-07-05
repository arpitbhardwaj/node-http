const express = require('express');

const app = express();

app.get('/', function (req, res) {
res.send('Hello World!')
})

app.listen(8081, () => console.log(`Express Server is listening on port 8081`))