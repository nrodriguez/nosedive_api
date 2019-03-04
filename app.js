const express = require('express')
const bodyParser = require('body-parser')
const Hoek = require('hoek')
const user = require('./helpers/user')
const app = express()
const port = 3000

app.use(bodyParser.json()); // for parsing application/json

app.get('/users/:userId/', function (req, res) {
    const version = Hoek.reach(req.headers, 'version');

    if (version && version >= 2) {
        //Version 2 is much more concise
        res.json(user.get(req.params.userId))
    } else {
        //Version 1 wouldn't take headers and would return the below response
        res.json({
            userId: req.params.userId,
            likes: user.get(req.params.userId)
        })
    }
})

app.get('/users/:userId/likes/', function (req, res) {
    const version = Hoek.reach(req.headers, 'version');

    if (version && version >= 2){
        //Version 2 is much more concise
        res.json(user.get(req.params.userId).likes)
    } else {
        //Version 1 wouldn't take headers and would return the below response
        res.json({
            userId: req.params.userId,
            likes: user.get(req.params.userId).likes
        })
    }
});

app.post('/users/:userId/likes/:likedUserId', function (req, res) {
    const version = Hoek.reach(req.headers, 'version');

    if (version && version >= 2) {
        //Version 2 is much more concise just returning the number
        res.json(user.like(req.params.userId, req.params.likedUserId))
    } else {
        //Version 1 wouldn't take headers and would return the below response
        res.json({
            userId: req.params.userId,
            likes: user.get(req.params.userId).likes
        })
    }
})

app.post('/users/:userId/blocks/:blockedUserId', function (req, res) {
    const version = Hoek.reach(req.headers, 'version');

    if (version && version >= 2) {
        //Version 2 is much more concise just returning the number
        res.json(user.block(req.params.userId, req.params.blockedUserId))
    } else {
        //Version 1 wouldn't take headers and would return the below response
        res.json({
            userId: req.params.userId,
            blocked: user.get(req.params.userId).blocked
        })
    }
})

app.post('/users/:userId/matches/:matchUserId', function (req, res) {
    const version = Hoek.reach(req.headers, 'version');

    if (version && version >= 2) {
        //Version 2 is much more concise just returning the number
        res.json(user.match(req.params.userId, req.params.matchUserId))
    } else {
        //Version 1 wouldn't take headers and would return the below response
        res.json({
            userId: req.params.userId,
            matches: user.get(req.params.userId).matches
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
        const currentUser = user.update(req.params.userId, req.body)
        res.json(user.backport(currentUser))
    }
    
})

app.post('/users/:userId/rating', function (req, res) {
    const version = Hoek.reach(req.headers, 'version');

    if (version && version >= 2) {
        //Version 2 is much more concise just returning the number
        res.json(user.rating(req.params.userId, req.body))
    } else {
        //Version 1 wouldn't take headers and would return the below response
        const currentUser = user.update(req.params.userId, req.body)
        res.json(user.backport(currentUser))
    }

})

const routes = app._router.stack // registered routes
    .filter(r => r.route) // take out all the middleware
    .map((r) => {
        const path = Object.keys(r.route.methods)[0].toUpperCase()
        return JSON.stringify({
            action: path,
            path: r.route.path
        });
    }) // get all the paths

console.log('Routes:\n',routes)
app.listen(port, () => console.log(`Api is listening on port ${port}`))