import { MongoClient, Db } from 'mongodb';
import { find, remove } from 'lodash';

interface DbEntry {
    url: string,
    ref?: Db
}

const dbs: DbEntry[] = [];

export async function getDb(url: string): Promise<Db> {
    const db = find(dbs, v => v.url === url);
    if (!db) {
        const dbListing: DbEntry = { url };
        dbListing.ref = await MongoClient.connect(url);
        dbs.push(dbListing);
        return dbListing.ref;
    }
    return db.ref;
}

export async function closeDb(url: string) {
    return Promise.all(remove(dbs, v => v.url === url).map(db => db.ref.close()));
}
