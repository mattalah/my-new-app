import Api from "./utils";

const getArticle = async (query?: any) => {
  const { data: response } = await Api.get(
    `/articles?${query}`
  );
  return response;
};

export {
  getArticle,
}