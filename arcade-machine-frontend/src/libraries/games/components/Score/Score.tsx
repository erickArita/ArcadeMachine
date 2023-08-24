import "./Score.css";
const ScoreBase = () => (
  <svg
    width="inherit"
    height="inherit"
    viewBox="0 0 363 109"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute z-30"
  >
    <rect x="1" y="12" width="362" height="97" rx="48.5" fill="#E8D7FC" />
    <rect y="6" width="362" height="97" rx="48.5" fill="#C89FFA" />
    <rect x="1" width="362" height="97" rx="48.5" fill="#9B57F0" />
  </svg>
);

interface ScoreProps {
  scoreLeft?: number;
  scoreRight?: number;
}

export const Score = ({ scoreLeft, scoreRight }: ScoreProps) => {
  return (
    <div className="flex   flex-col relative h-[100px]  items-top w-[250px] ">
      <ScoreBase />
      <div className=" z-50 flex justify-evenly bottom-1 w-full items-center ">
        <p className="score_value left-5 "> {scoreLeft}</p>
        <div  >
          <img src="/trofeo.svg"   width={60} />
        </div>
        <p className="score_value right-5">{scoreRight}</p>
      </div>
    </div>
  );
};
