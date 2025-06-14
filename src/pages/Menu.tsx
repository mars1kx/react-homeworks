import React, { useEffect } from "react";
import MenuSection from "../components/MenuSection/MenuSection";
import BackgroundWrapper from "../components/BackgroundWrapperMenu/BackgroundWrapperMenu";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchMeals } from "../store/slices/mealsSlice";
import { MealsState } from "../store/types";

const Menu: React.FC = () => {
  const dispatch = useAppDispatch();
  const { meals, loading, error } = useAppSelector(state => state.meals) as MealsState;

  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  const isLoading = loading;
  const isError = !!error;

  const fetchMealsData = (): void => {
    dispatch(fetchMeals());
  };

  return (
    <BackgroundWrapper>
      <main>
        {isLoading && <div className="loading">Data loading</div>}
        {isError && (
          <div className="error">
            <div>Error: {error}</div>
            <button onClick={fetchMealsData}>Try again</button>
          </div>
        )}
        {!isLoading && !isError && <MenuSection products={meals} />}
      </main>
    </BackgroundWrapper>
  );
};

export default Menu; 