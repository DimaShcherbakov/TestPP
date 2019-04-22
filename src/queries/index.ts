import axios from "../utils/axios";

interface IData {
  title: string;
  body: string;
}

export const getDataToTable = async (page: number, limit: number) => {
  console.log(page, limit);
  try {
    const data = await axios.get(`/articles?page=${page}&limit=${limit}`);
    console.log(data);
  } catch (err) {}
};

export const addNote = async (data: IData) => {
  try {
    const res = await axios.post("/articles", data);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};
