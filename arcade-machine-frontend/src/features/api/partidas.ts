import { baseApi } from "../../store";

const gamesApiWithTags = baseApi.enhanceEndpoints({
  addTagTypes: ["Games"],
});

const gamesApi = gamesApiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    emparejar: builder.query<
      boolean,
      {
        userId: string;
      }
    >({
      query: ({ userId }) => ({
        url: `api/game?userId=${userId}`,
      }),
    }),
  }),
});

export const { useLazyEmparejarQuery } = gamesApi;
