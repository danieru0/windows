import Dexie from 'dexie';

const db = new Dexie('windowsDatabase');
db.version(1).stores({
    videos: 'title'
});

export default db;