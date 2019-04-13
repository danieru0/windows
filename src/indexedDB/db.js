import Dexie from 'dexie';

const db = new Dexie('windowsDatabase');
db.version(1).stores({
    videos: 'title, index'
});

export default db;