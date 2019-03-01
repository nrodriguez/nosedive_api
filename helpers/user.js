'use strict'
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./data/db.json')
const db = low(adapter)
const rating = require('../helpers/rating')

const getUser = (id) => {
    return db.get('users')
        .find({
            id: parseInt(id)
        })
}

const currentDate = () => {
    const date = new Date();
    return date.toUTCString();
}

const addMatch = (user, matchingUserId) => {
    const payload = {
        id: matchingUserId,
        date: currentDate()
    }

    //Only add in a like if it doesn't exist
    const matchExists = user.value().matches.findIndex(element => element.id === matchingUserId)

    if (matchExists < 0) {
        user.value().matches.push(payload)
        user.write()
    }
}

exports.get = (id) => {
    return getUser(id)
        .value()

}

exports.update = (id, payload) => {
    return getUser(id)
        .assign(payload)
        .write()
}

exports.like = (id, likedUserId) => {
    const userWhoLikedId = parseInt(id);

    const user = getUser(likedUserId);
    const payload = {
        id: userWhoLikedId,
        date: currentDate()
    }

    //Only add in a like if it doesn't exist
    const likeExists = user.value().likes.findIndex(element => element.id === userWhoLikedId)

    if(likeExists < 0){
        user.value().likes.push(payload)
        user.write()
    }

    return user.value();
}

exports.block = (id, blockedUserId) => {
    const userId = parseInt(id);

    const user = getUser(id);
    const payload = {
        id: blockedUserId,
        date: currentDate()
    }

    //Only add in a like if it doesn't exist
    const blockExists = user.value().blocked.findIndex(element => element.id === userId)

    if (blockExists < 0) {
        user.value().blocked.push(payload)
        user.write()
    }

    return user.value();
}

exports.match = (userId, matchedUserId) => {
    const matchUserAId = parseInt(userId);
    const matchUserBId = parseInt(matchedUserId);
    
    const matchUserA = getUser(userId);
    const matchUserB = getUser(matchedUserId);

    addMatch(matchUserA, matchUserBId)
    addMatch(matchUserB, matchUserAId)

    return matchUserA.value();
}

exports.rating = (id, givenRating) => {
    const userId = parseInt(id);

    const user = getUser(userId);

    let ratings = user.value().ratingsCount

    //Add another count to the current rating
    ratings[givenRating.rating].count += 1;

    user
        .assign({
            rating: rating.calculate(ratings)
        })
        .write()
    
    return user.value();
}

exports.backport = (payload) => {
    const transformedLikes = payload.likes.map((like) => {
        return {
            [like.id]: {
                creationDate: like.date,
                previouslyUnliked: false
            }
        }
    })

    payload.likes = transformedLikes;

    return payload;
}