import { baseApi } from "../../../store";
import { ScoreResponse } from "./models/ScoresResponse";
import { SincronizarJugadaRequest } from "./models/SincronizarJugadaRequest";
import { ValidarGanadorRequest } from "./models/ValidarGanadorRequest";

const gamesApiWithTags = baseApi.enhanceEndpoints({
  addTagTypes: ["Games"],
});

const controllerName = "api/game";

const gamesApi = gamesApiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    emparejar: builder.query<
      boolean,
      {
        userId: string;
      }
    >({
      query: ({ userId }) => ({
        url: `api/game/emparejar?userId=${userId}`,
      }),
    }),
    sincronizarJugada: builder.query<void, SincronizarJugadaRequest>({
      query: (body) => ({
        url: `${controllerName}/sincronizarJugada?PartidaId=${body.PartidaId}&JugadorId=${body.JugadorId}&Jugada=${body.Jugada}`,
      }),
    }),
    validarGanador: builder.mutation<void, ValidarGanadorRequest>({
      query: (body) => ({
        url: `${controllerName}/validarGanador`,
        method: "PUT",
        body,
      }),
    }),
    terminarPartida: builder.mutation<
      ScoreResponse,
      { partidaId: string; jugadorId: string }
    >({
      query: ({ partidaId, jugadorId }) => ({
        url: `${controllerName}/terminarPartida`,
        method: "POST",
        body: {
          partidaId,
          jugadorId,
        },
      }),
    }),
  }),
});

export const {
  useLazyEmparejarQuery,
  useValidarGanadorMutation,
  useLazySincronizarJugadaQuery,
  useTerminarPartidaMutation,
} = gamesApi;
