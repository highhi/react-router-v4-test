import Firebase from 'firebase/app';
import { EventEmitter } from 'events';
import 'firebase/database';

Firebase.initializeApp({
  databaseURL: 'https://hacker-news.firebaseio.com',
});

const api = Firebase.database().ref('/v0');
const PER_PAGE = 30;
const itemsCache = Object.create(null);
const store = new EventEmitter();
let topStoryIds = [];

api.child('topstories').on('value', snapshot => {
  topStoryIds = snapshot.val();
  store.emit('topstories-updated');
});

store.loading = (loading = false) => {
  store.emit('loading', loading);
};

store.fetchItem = id => {
  return new Promise((resolve, reject) => {
    if (itemsCache[id]) return resolve(itemsCache[id]);

    api.child(`item/${id}`).once('value', snapshot => {
      const story = itemsCache[id] = snapshot.val();
      resolve(story);
    }, reject);
  });
};

store.fetchItems = ids => {
  if (!ids || !ids.length) return Promise.resolve([]);
  return Promise.all(ids.map(id => store.fetchItem(id)));
};

store.fetchItemsByPage = page => {
  const start = (page - 1) * PER_PAGE;
  const end = page * PER_PAGE;
  const ids = topStoryIds.slice(start, end);
  return store.fetchItems(ids);
};

export default store;
