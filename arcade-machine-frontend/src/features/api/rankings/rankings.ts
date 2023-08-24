import { baseApi } from "../../../store";

const rankingApitags = baseApi.enhanceEndpoints({
  addTagTypes: ["Rankigns"],
});

const controllerName = "api/ranking";

interface RankingPorJuegoResponse {
  id: string;
  top: number;
  nombre: string;
}

interface RankingPorUsuarioResponse {
  id: string;
  contrincante: string;
  gano: boolean;
}

const rankingApi = rankingApitags.injectEndpoints({
  endpoints: (builder) => ({
    rankingPorJuego: builder.query<
      RankingPorJuegoResponse[],
      { juegoId?: string }
    >({
      query: ({ juegoId }) => ({
        url: `${controllerName}/obtenerRankingPorJuego?juegoId=${juegoId}`,
      }),
    }),
    wankingPorUsuario: builder.query<
      RankingPorUsuarioResponse[],
      {
        jugadorId?: string;
        juegoId?: string;
      }
    >({
      query: ({ jugadorId, juegoId }) => ({
        url: `${controllerName}/obtenerRankingPorJugador?jugadorId=${jugadorId}&juegoId=${juegoId}`,
      }),
    }),
  }),
});

export const { useRankingPorJuegoQuery, useWankingPorUsuarioQuery } =
  rankingApi;
