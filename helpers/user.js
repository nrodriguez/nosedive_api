'use strict'
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./data/db.json')
const db = low(adapter)

exports.get = (id) => {
    return db.get('users')
        .find({
            id: parseInt(id)
        })
        .value()

}

exports.update = (id, payload) => {
    console.log('p', payload)
    return db.get('users')
        .find({
            id: parseInt(id)
        })
        .assign(payload)
        .write()
}