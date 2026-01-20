import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./layout/Header/Header";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient";
import { MainPage } from "./pages/MainPage/MainPage";
import { Footer } from "./layout/Footer/Footer";
import { GenresPage } from "./pages/GenresPage/GenresPage";
import { FilterGenre } from "./pages/FilterGenre/FilterGenre";
import { FilmPage } from "./pages/FilmPage/FilmPage";
import { AccountPage } from "./pages/AccountPage/AccountPage";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/genres" element={<GenresPage />} />
          <Route path="/movie" element={<FilterGenre />} />
          <Route path="/profile" element={<AccountPage />} />
          <Route path="/movie/:movieId" element={<FilmPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
