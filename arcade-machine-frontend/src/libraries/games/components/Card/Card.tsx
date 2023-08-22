export interface CardProps {
  title: string;
  img: string;
  color: string;
  shadowColor: string;

}

import "./card.css";

export const Card = ({ title, img, color, shadowColor }: CardProps) => {
  return (
    <div
      className="GameCard"
      style={{
        backgroundColor: color,
        boxShadow: `-10px 10px 2px ${shadowColor}`,
      }}
    >
      <h2>{title}</h2>
      <img src={img} alt={`img del juego ${title}`} />
    </div>
  );
};
