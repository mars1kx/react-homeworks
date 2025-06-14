import React from "react";
import BackgroundWrapper from "../components/BackgroundWrapperMenu/BackgroundWrapperMenu";
import OrderSection from "../components/OrderSection/OrderSection";

const Order: React.FC = () => {

return (
    <BackgroundWrapper>
      <main>
        <OrderSection />
      </main>
    </BackgroundWrapper>
  );
};

export default Order;