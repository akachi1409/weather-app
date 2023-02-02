    import axios from "axios";

const BACKEND = "http://127.0.0.1:5000/";

export async function getCitys() {
  const result = await axios.get(BACKEND + "books");
  console.log("result", result);
  return result.data;
}

export async function addCity(newCity) {
  const data = {
    newBook: newCity,
  };
  const result = await axios.post(BACKEND + "books", data);
  return result.uid;
}

export async function removeCity(uid) {
  const result = await axios.delete(BACKEND + "books/" + uid);
  return result;
}

export async function updateCity(uid, value) {
  const data = {
    newBook: value,
  };
  const result = await axios.put(BACKEND + "books/" + uid, data);
  return result;
}
