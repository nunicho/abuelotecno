import React, { useState, useEffect } from "react";
import { useGetPromotionsQuery } from "../slices/promotionsApiSlice"; // Importa el hook
import "../assets/styles/promotionBanner.css"; // Asegúrate de importar tu archivo CSS

const PromotionBanner = () => {
  const { data: promotions, error, isLoading } = useGetPromotionsQuery();
  const [activePromotion, setActivePromotion] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    if (promotions) {
      const currentPromotion = promotions.find(
        (promo) => promo.active && new Date(promo.endDate) > new Date()
      );
      setActivePromotion(currentPromotion);
    }
  }, [promotions]);

  useEffect(() => {
    if (!activePromotion || !activePromotion.endDate) return;

    const calculateTimeLeft = () => {
      const endDate = new Date(activePromotion.endDate);
      const now = new Date();
      const difference = endDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [activePromotion]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading promotions</div>;
  if (!activePromotion) return null;

  return (
    <div className="promotion-banner">
      <h1>¡PROMOCIÓN!</h1>
      <h2>{activePromotion.name}</h2>
      <div className="timer">
        <span>{String(timeLeft.days).padStart(2, "0")}d</span>
        <span>{String(timeLeft.hours).padStart(2, "0")}h</span>
        <span>{String(timeLeft.minutes).padStart(2, "0")}m</span>
        <span>{String(timeLeft.seconds).padStart(2, "0")}s</span>
      </div>
    </div>
  );
};

export default PromotionBanner;
