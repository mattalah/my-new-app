import Api from "./utils";

const getArticle = async (query?: any) => {
  const { data: response } = await Api.get(
    `/articles`
  );
  return response;
};

export {
  getArticle,
}