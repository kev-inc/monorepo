import DB from "../../../db/database"

const CRUD = {
    fetchAll: async (collection) => {
        try {
            return DB.read(collection)
        } catch (error) {
            throw new Error(error)
        }
    },
    fetchOneById: async (collection, id) => {
        try {
            return DB.readOneById(collection, id)
        } catch (error) {
            throw new Error(error)
        }
    },
    fetchOneByFilter: async (collection, filter) => {
        try {
            return DB.readOneByFilter(collection, filter)
        } catch (error) {
            throw new Error(error)
        }
    },
    createOne: async (collection, toCreate) => {
        try {
            return DB.create(collection, toCreate).then(resp => resp.insertedId)
        } catch (error) {
            throw new Error(error)
        }
    },
    updateOne: async (collection, id, toUpdate) => {
        try {
            return DB.updateOne(collection, id, toUpdate).then(resp => resp.modifiedCount > 0)
        } catch (error) {
            throw new Error(error)
        }
    },
    deleteOne: async (collection, id) => {
        try {
            return DB.deleteOne(collection, id).then(resp => resp.deletedCount > 0)
        } catch (error) {
            throw new Error(error)
        }
    }
} 

export default CRUD