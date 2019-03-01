const express = require('express')
const bodyParser = require('body-parser')
const Hoek = require('hoek')
const user = require('./helpers/user')
const app = express()
const port = 3000


app.use(bodyParser.json()); // for parsing application/json

app.get('/users/:userId/likes/', function (req, res) {
    const version = Hoek.reach(req.headers, 'version');

    if (version && version >= 2){
        //Version 2 is much more concise just returning the number
        res.json(user.get(req.params.userId).likes)
    } else {
        //Version 1 wouldn't take headers and would return the below response
        res.json({
            userId: req.params.userId,
            likes: user.get(req.params.userId).likes
        })
    }
    
})

app.post('/users/:userId/edit', function(req, res) {
    const version = Hoek.reach(req.headers, 'version');

    if (version && version >= 2) {
        //Version 2 is much more concise just returning the number
        res.json(user.update(req.params.userId, req.body))
    } else {
        //Version 1 wouldn't take headers and would return the below response
        res.json(user.update(req.params.userId, req.body))
    }
    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))