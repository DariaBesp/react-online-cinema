import { useQuery } from "@tanstack/react-query";
import { getFilterTitle } from "../api/movies";
import { useSearchParams } from "react-router-dom";
import { FilterByTitleListFilms } from "../components/blocks-components/FilterByTitleListFilms/FilterByTitleListFilms";

export const SearchResultsByTitle = () => {
  const [searchParams] = useSearchParams();
  const searchTitle = searchParams.get("searchTitle");

  const titleSearchQuery = useQuery({
    queryFn: () => getFilterTitle(searchTitle),
    queryKey: ["filterTitle", searchTitle],
    enabled: !!searchTitle,
  });

  switch (titleSearchQuery.status) {
    case "success":
      if (!titleSearchQuery.data?.length) {
        return <div>По вашему запросу ничего не найдено</div>;
      }

      return <FilterByTitleListFilms filteredList={titleSearchQuery.data} />;
    case "error":
      return (
        <div>
          <span>Произошла ошибка:</span>
          <button onClick={() => titleSearchQuery.refetch()}>
            Повторить запрос
          </button>
        </div>
      );
  }
};
