import React, { useEffect } from "react";
import MenuSection from "../components/MenuSection/MenuSection";
import BackgroundWrapper from "../components/BackgroundWrapperMenu/BackgroundWrapperMenu";
import { getMealsApi } from "../__mocks__/api";
import { useFetch } from "../hooks";

interface Meal {
  id: string;
  meal: string;
  price: number;
  img: string;
  description?: string;
  instructions?: string;
  category: string;
}

interface Product {
  id: string;
  meal: string;
  price: number;
  img: string;
  description?: string;
  instructions?: string;
  category: string;
}


const Menu: React.FC = () => {
  const { url } = getMealsApi();
  const { data: mealsData, status, error } = useFetch<Meal[]>(url);

  const isLoading = !mealsData && !error;
  const isError = !!error;


  const fetchMealsData = (): void => {
    window.location.reload();
  };

  const meals: Product[] = mealsData || [];


  return (
    <BackgroundWrapper>
      <main>
        {isLoading && <div className="loading">Data loading</div>}
        {isError && (
          <div className="error">
            <div>Error: {(error as Error).message}</div>
            <button onClick={fetchMealsData}>Try again</button>
          </div>
        )}
        {!isLoading && !isError && <MenuSection products={meals} />}
      </main>
    </BackgroundWrapper>
  );
};

export default Menu; 