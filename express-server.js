const express = require('express');

const port = 8081
const app = express();

app.get('/', function (req, res) {
    res.send('Hello Express!')
})

//additional routes
app.route('/book')
    .get(function (req, res) {
        res.send('Get a random book')
    })
    .post(function (req, res) {
        res.send('Add a book')
    })
    .put(function (req, res) {
        res.send('Update the book')
    })
    .delete(function (req, res) {
        res.send('Delete the book')
    })



app.listen(port, () => console.log(`Express Server is listening on port 8081`))