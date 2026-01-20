import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavoriteFilm } from "../api/favorites";
import { deleteFavoriteFilm } from "../api/favorites";

export const useAddFavoriteFilm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFavoriteFilm,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

export const useDeleteFavoriteFilm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFavoriteFilm,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};
