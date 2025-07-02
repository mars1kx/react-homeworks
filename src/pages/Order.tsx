import React from "react";
import BackgroundWrapper from "../components/BackgroundWrapperMenu/BackgroundWrapperMenu";
import OrderSection from "../components/OrderSection/OrderSection";
import { useTheme } from "../contexts/ThemeContext";

const Order: React.FC = () => {
  const { theme } = useTheme();

  return (
    <BackgroundWrapper>
      <main className={theme}>
        <OrderSection />
      </main>
    </BackgroundWrapper>
  );
};

export default Order;