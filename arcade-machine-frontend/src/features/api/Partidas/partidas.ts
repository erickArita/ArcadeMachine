import { baseApi } from "../../../store";
import { Minijuego } from "./models/Minijuego";
import { Partida } from "./models/Partida";
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
        juegoId: string;
        ia?:boolean
      }
    >({
      query: ({ userId, juegoId ,ia}) => ({
        url: `api/game/emparejar?userId=${userId}&juegoId=${juegoId}&useIA=${ia}`,
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
          usuarioId: jugadorId,
        },
      }),
    }),
    obtenerJuegos: builder.query<Minijuego[], void>({
      query: () => ({
        url: `${controllerName}/ObtenerMiniJuegos`,
      }),
    }),
    obtenerJuegoPorId: builder.query<Minijuego, { slug?: string }>({
      query: ({ slug }) => ({
        url: `${controllerName}/ObtenerMiniJuego?juegoId=${slug}`,
      }),
    }),
    obtenerPartidas: builder.query<Partida, { partidaId: string }>({
      query: ({ partidaId }) => ({
        url: `${controllerName}/ObtenerPartida?partidaId=${partidaId}`,
      }),
    }),
  }),
});

export const {
  useLazyEmparejarQuery,
  useValidarGanadorMutation,
  useLazySincronizarJugadaQuery,
  useTerminarPartidaMutation,
  useObtenerJuegosQuery,
  useObtenerJuegoPorIdQuery,
  useObtenerPartidasQuery
} = gamesApi;
