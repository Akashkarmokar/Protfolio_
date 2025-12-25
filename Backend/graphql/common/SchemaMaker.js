import nid from 'nid'

import { Schema } from 'mongoose'

export const Id = new Schema ({
    _id: {
        type: String,
        immutable: true
    },
    id: {
        type: String,
        immutable: true,
        unique: true,
    }
})

Id.pre('save', function (next) {
    const id = nid(17);
    this._id = id
    this.id = id
    next()
})

export const SchemaMaker = (SchemaObject = {}, options = {}) => {

    const unique_id = nid(17);
    const Id = new Schema ({
        _id: {
            type: String,
            immutable: true,
            default: unique_id
        },
        id: {
            type: String,
            // immutable: true,
            unique: unique_id
        },
        ...SchemaObject
    }, {
        ...options,
    })

    Id.pre('save', function (next) {
        const id = nid(17);
        this._id = id
        this.id = id
        next()
    })

    return Id
}

