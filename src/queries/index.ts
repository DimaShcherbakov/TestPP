import axios from "../utils/axios";

interface IData {
  title: string;
  body: string;
}

interface IObj {
  page: number;
  limit: string;
}

interface IEditData {
  body: string;
  title: string;
  id: string;
}

export const getDataToTable = async (obj:IObj) => {
  const { page, limit } = obj;
  try {
    const res = await axios.get(`/articles?page=${page}&limit=${limit}`);
    return res.data;
  } catch (err) {
    throw new Error(err)
  }
};

export const addNote = async (data: IData) => {
  try {
    const res = await axios.post("/articles", data);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const editNote = async (data: IEditData) => {
  try {
    const { id, body, title } = data;
    const res = await axios.put(`/articles/${id}`, {
      body,
      title,
    });
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};
