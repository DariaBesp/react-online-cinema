import { useQuery } from "@tanstack/react-query";
import { getTop10Films } from "../../api/movies";
import { Loader } from "../../components/ui-components/Loader/Loader";
import { Top10FilmsList } from "../../components/blocks-components/Top10FilmsList/Top10FilmsList";

export const FetchTop10Films = () => {
  const top10FilmsQuery = useQuery({
    queryFn: getTop10Films,
    queryKey: ["top10Films"],
  });

  switch (top10FilmsQuery.status) {
    case "pending":
      return <Loader />;
    case "success":
      //возвращает блок с отрисованными фильмом
      return <Top10FilmsList listFilms={top10FilmsQuery.data} />;
    case "error":
      return (
        <div>
          <span>Произошла ошибка:</span>
          <button onClick={() => top10FilmsQuery.refetch()}>
            Повторить запрос
          </button>
        </div>
      );
  }
};
