'use strict'
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./data/db.json')
const db = low(adapter)

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

exports.match = (userId, matchedUserId) => {
    const matchUserAId = parseInt(userId);
    const matchUserBId = parseInt(matchedUserId);
    
    const matchUserA = getUser(userId);
    const matchUserB = getUser(matchedUserId);

    addMatch(matchUserA, matchUserBId)
    addMatch(matchUserB, matchUserAId)

    return matchUserA.value();
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