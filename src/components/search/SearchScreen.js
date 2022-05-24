import { useForm } from "../../hooks/useForm";
import { getHeroesByName } from "../../selectors/getHeroesByName";
import { HeroCard } from "../../components/hero/HeroCard";
import { useNavigate, useLocation } from "react-router-dom";

import queryString from "query-string";
import { useMemo } from "react";

export const SearchScreen = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);

  const [formValues, handleInputChange] = useForm({
    searchText: q,
  });

  const { searchText } = formValues;

  const heroesFiltered =  useMemo(() => getHeroesByName(q), [q]); 

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`?q=${searchText}`);
  }

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>buscar</h4>
          <hr />

          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Buscar héroe"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={handleInputChange}
            >
            </input>

            <button
              type="submit"
              className="btn btn-outline-primary mt-1"
              onClick={handleSearch}>
              Buscar
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Resultados</h4>
          <hr />

          {
            (q === '')
              ? <div className="alert alert-info">Busca un héroe</div>
              : (heroesFiltered.length === 0) && <div className="alert alert-danger">No hay resultados: {q}</div>
          }

          {
            heroesFiltered.map(hero => (
              <HeroCard
                key={hero.id}
                {...hero} />
            ))
          }

        </div>
      </div>
    </>
  )
}
