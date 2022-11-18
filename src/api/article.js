import { customAxios } from "../libraries/customAxios";

export const articleApi = {
  query: ({ authorId }) =>
    customAxios.get("/articles", {
      params: {
        searchType: "AUTHOR",
        authorId,
      },
    }),
};
