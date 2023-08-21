import { baseApi } from "../../../store";
import { AuthenticationResponse } from "./models/AutenticationResponse";

const gamesApiWithTags = baseApi.enhanceEndpoints({
  addTagTypes: ["Autorizacion"],
});

const authenticationApi = gamesApiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getUserData: builder.query<AuthenticationResponse, void>({
      query: () => ({
        url: `api/authentication`,
      }),
    }),
  }),
});

export const { useGetUserDataQuery } = authenticationApi;
