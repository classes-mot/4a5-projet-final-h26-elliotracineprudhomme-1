import Star from "../../assets/img/star.png";

export default function RatingScale({ value }) {
  const range = [1, 2, 3, 4, 5];
  const scale = <img src={Star} alt="star-icon" />;
  return (
    <div className="song-star-scale">
      {range.map((elem) =>
        value >= elem ? <span key={elem.toString()}>{scale}</span> : null,
      )}
    </div>
  );
}
