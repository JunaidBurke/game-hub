import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient, { FetchResponse } from "../services/api-client"; // Adjust the import path as necessary
import { useGameQueryStore } from "../store";
import Game from "../entities/Game";

const apiClient = new APIClient<Game>("/games");

const useGames = () => {
  const gameQuery = useGameQueryStore((s) => s.gameQuery);
  return useInfiniteQuery<FetchResponse<Game>, Error>({
    queryKey: ["games", gameQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await apiClient.getAll({
        params: {
          genres: gameQuery.genreId,
          parent_platforms: gameQuery.platformId,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
          page: pageParam,
        },
      });
      return response;
    },
    getNextPageParam: (lastPage) => {
      // Assuming 'next' contains the page number for the next page.
      // You may need to adjust this logic based on how your API formats the 'next' URL.
      const nextPage = lastPage.next
        ? parseInt(lastPage.next.split("page=")[1])
        : undefined;
      return nextPage;
    },
    staleTime: ms("24h"),
  });
};

export default useGames;
