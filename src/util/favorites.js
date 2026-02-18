const STORAGE_KEY = "favorite_quotes";

export const getFavorites = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveFavorites = (favorites) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};