import axios from "../utils/axios";

interface IData {
  title: string;
  body: string;
}

interface IObj {
  page: number;
  limit: string;
}

export const getDataToTable = async (obj:IObj) => {
  const { page, limit } = obj;
  console.log(obj)
  try {
    const res = await axios.get(`/articles?page=${page}&limit=${limit}`);
    console.log(res.data);
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
