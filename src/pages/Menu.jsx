import React from "react";
import MenuSection from "../components/MenuSection/MenuSection";
import BackgroundWrapper from "../components/BackgroundWrapperMenu/BackgroundWrapperMenu";
import { getMealsApi } from "../__mocks__/api";
import { useFetch } from "../hooks";

const Menu = () => {
  const { url } = getMealsApi();
  const { data: meals, status, error } = useFetch(url);

  const isLoading = !meals && !error;
  const isError = !!error;

  const fetchMealsData = () => {
    window.location.reload();
  };

  return (
    <BackgroundWrapper>
      <main>
        {isLoading && <div className="loading">Загрузка данных</div>}
        {isError && (
          <div className="error">
            <div>Ошибка: {error.message}</div>
            <button onClick={fetchMealsData}>Попробовать снова</button>
          </div>
        )}
        {!isLoading && !isError && <MenuSection products={meals} />}
      </main>
    </BackgroundWrapper>
  );
};

export default Menu;
