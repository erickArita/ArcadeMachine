export interface CardProps {
  title: string;
  img: string;
  color: string;
  shadowColor: string;
  oncClick?: () => void;
}

import "./card.css";

export const Card = ({
  title,
  img,
  color,
  shadowColor,
  oncClick,
}: CardProps) => (
  <div
    className="GameCard"
    style={{
      backgroundColor: color,
      boxShadow: `-10px 10px 2px ${shadowColor}`,
    }}
    onClick={oncClick}
  >
    <h2>{title}</h2>
    <img src={img} alt={`img del juego ${title}`} />
  </div>
);
