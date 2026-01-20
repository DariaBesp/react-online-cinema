import { useQuery } from "@tanstack/react-query";
import { getFilterGenre, getFilterGenreCount } from "../../api/movies";
import { Loader } from "../../components/ui-components/Loader/Loader";
import { FilterByGenreListFilms } from "../../components/blocks-components/FilterByGenreListFilms/FilterByGenreListFilms";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export const FetchFilterGenre = () => {
  const count = 15;
  const [searchParams] = useSearchParams();
  const genre = searchParams.get("genre");
  const [currentCount, setCurrentCount] = useState(count);

  const filterGenreCountQuery = useQuery({
    queryFn: () => getFilterGenreCount(genre, currentCount),
    queryKey: ["filterCountGenre", genre, currentCount],
    enabled: !!genre,
  });

  const filterGenreQuery = useQuery({
    queryFn: () => getFilterGenre(genre),
    queryKey: ["filterGenre", genre],
    enabled: !!genre,
  });

  console.log(filterGenreQuery.data?.length);

  const isViewBtn =
    filterGenreQuery.status === "success" &&
    filterGenreQuery.data?.length > 0 &&
    currentCount < filterGenreQuery.data.length;

  const handleShowMore = () => {
    setCurrentCount((prev) => prev + 10);
  };

  switch (filterGenreCountQuery.status) {
    case "pending":
      return <Loader />;
    case "success":
      return (
        <FilterByGenreListFilms
          filteredList={filterGenreCountQuery.data}
          genre={genre}
          count={currentCount}
          onShowMore={handleShowMore}
          isViewBtn={isViewBtn}
        />
      );
    case "error":
      return (
        <div>
          <span>Произошла ошибка:</span>
          <button onClick={() => filterGenreCountQuery.refetch()}>
            Повторить запрос
          </button>
        </div>
      );
  }
};
