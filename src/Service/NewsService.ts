import Api from "./utils";

const getNews = async (query?: any) => {
  const { data: response } = await Api.get(
    `/news`
  );
  return response.data;
};

export {
  getNews,
}