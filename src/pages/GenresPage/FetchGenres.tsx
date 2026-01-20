import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../../api/movies";
import { Loader } from "../../components/ui-components/Loader/Loader";
import { GenresBlock } from "../../components/blocks-components/GenresListBlock/GenresListBlock";

export const FetchGenres = () => {
  const genresQuery = useQuery({
    queryFn: getGenres,
    queryKey: ["genres"],
  });

  switch (genresQuery.status) {
    case "pending":
      return <Loader />;
    case "success":
      return <GenresBlock genresList={genresQuery.data} />;
    case "error":
      return (
        <div>
          <span>Произошла ошибка:</span>
          <button onClick={() => genresQuery.refetch()}>
            Повторить запрос
          </button>
        </div>
      );
  }
};
