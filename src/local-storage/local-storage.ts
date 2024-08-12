const VERSION = "1.0.1";
const LOCAL_STORAGE_VERSION_KEY = "VERSION";
export const LOCAL_STORAGE_STATE_KEY = "TODO_APP_STATE";

export const localStorageStateManager = {value: {}};
const initLocalStorage = () => {
  if (localStorage.getItem(LOCAL_STORAGE_VERSION_KEY) === VERSION) {
    localStorageStateManager.value =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY) as string) || {};
  } else {
    localStorage.setItem(LOCAL_STORAGE_VERSION_KEY, VERSION);
    localStorage.setItem(LOCAL_STORAGE_STATE_KEY, JSON.stringify({}));
    localStorageStateManager.value = {};
  }
};

initLocalStorage();