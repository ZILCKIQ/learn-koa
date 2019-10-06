import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;

export default class MongoDB {

    constructor(DB_URL, DB_NAME, COLLECTION_NAME) {
        this.DB_URL = DB_URL;
        this.DB_NAME = DB_NAME;
        this.COLLECTION_NAME = COLLECTION_NAME;
        this.Client = null;
        this.DB = null;
        this.COLLECTION = null;
    }

    async connect() {
        if (!this.Client) {
            try {
                this.Client = await MongoClient.connect(this.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
            } catch (error) {
                throw error;
            }
        }
        return this.Client;
    }

    async close() {
        const client = await this.connect();
        client.close();
    }

    async db() {
        const client = await this.connect();
        if (!this.DB) {
            try {
                this.DB = client.db(this.DB_NAME);
            } catch (error) {
                throw error;
            }
        }
        return this.DB;
    }

    async collection() {
        const db = await this.db();
        if (!this.COLLECTION) {
            try {
                this.COLLECTION = db.collection(this.COLLECTION_NAME);
            } catch (error) {
                throw error;
            }
        }
        return this.COLLECTION;
    }

    async rename(newName, options = {}) {
        const document = await this.collection();
        try {
            return await document.rename(newName, options);
        } catch (error) {
            return error
        }
    }

    async createIndex(fieldOrSpec, options) {
        const document = await this.collection();
        try {
            return await document.createIndex(fieldOrSpec, options);
        } catch (error) {
            return error
        }
    }

    async dropIndex(indexName, options = {}) {
        const document = await this.collection();
        try {
            return await document.dropIndex(indexName, options);
        } catch (error) {
            return error
        }
    }

    async listIndexes(options = {}) {
        const document = await this.collection();
        const result = document.listIndexes(options);
        try {
            return await result.toArray();
        } catch (error) {
            return error
        }
    }

    async findMany(query = {}, options = {}) {
        const document = await this.collection();
        const result = document.find(query, options);
        try {
            return await result.toArray();
        } catch (error) {
            return error
        }
    }

    async findOne(query, options = {}) {
        const document = await this.collection();
        try {
            return await document.findOne(query, options);
        } catch (error) {
            return error
        }
    }

    async insterOne(doc, options = {}) {
        const document = await this.collection();
        try {
            return await document.insertOne(doc, options);
        } catch (error) {
            return error
        }
    }

    async insterMany(docs, options = {}) {
        const document = await this.collection();
        try {
            return await document.insertMany(docs, options);
        } catch (error) {
            return error
        }
    }

    async deleteOne(filter, options = {}) {
        const document = await this.collection();
        try {
            return await document.deleteOne(filter, options);
        } catch (error) {
            return error
        }
    }

    async deleteMany(filter, options = {}) {
        const document = await this.collection();
        try {
            return await document.deleteMany(filter, options);
        } catch (error) {
            return error
        }
    }

    async replaceOne(filter, doc, options = {}) {
        const document = await this.collection();
        try {
            return await document.replaceOne(filter, doc, options);
        } catch (error) {
            return error
        }
    }

    async updateOne(filter, update, options = {}) {
        const document = await this.collection();
        try {
            return await document.updateOne(filter, update, options);
        } catch (error) {
            return error
        }
    }

    async updateMany(filter, update, options = {}) {
        const document = await this.collection();
        try {
            return await document.updateMany(filter, update, options);
        } catch (error) {
            return error
        }
    }

}
