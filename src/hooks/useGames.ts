import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import { GameQuery } from "../App"; // Adjust the import path as necessary
import APIClient, { FetchResponse } from "../services/api-client"; // Adjust the import path as necessary
import { Platform } from "./usePlatforms"; // Adjust the import path as necessary

const apiClient = new APIClient<Game>("/games");

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

const useGames = (gameQuery: GameQuery) =>
  useInfiniteQuery<FetchResponse<Game>, Error>({
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

export default useGames;
