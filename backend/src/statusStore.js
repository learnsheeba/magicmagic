const store = new Map();

function nowIso() {
  return new Date().toISOString();
}

const statusStore = {
  get(userId) {
    return store.get(userId) || null;
  },
  set(userId, mode) {
    const value = { mode, updatedAt: nowIso() };
    store.set(userId, value);
    return value;
  },
  reset(userId) {
    const value = { mode: null, updatedAt: nowIso() };
    store.set(userId, value);
    return value;
  }
};

module.exports = { statusStore };

