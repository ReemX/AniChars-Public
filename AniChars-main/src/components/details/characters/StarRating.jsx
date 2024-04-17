import { useState } from "react";
import { HiOutlineStar, HiMiniStar } from "react-icons/hi2";
import { cn } from "../../../utils/helpers";

export default function StarRating({
  maxRating = 5,
  messages = [],
  defaultRating = 0,
  onSetRating = () => {},
  containerClass = "",
  textClass = "",
  starClass = "",
  starContainerClass = "",
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleRating = function (ratingInput) {
    if (rating === ratingInput) return;
    setRating(ratingInput);
    onSetRating(ratingInput);
  };

  return (
    <div className={cn("flex items-center", containerClass)}>
      <div className="group flex">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            id={i}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            full={tempRating ? i + 1 <= tempRating : i + 1 <= rating}
            starClass={starClass}
            starContainerClass={starContainerClass}
          />
        ))}
      </div>
      <p className={textClass}>
        {messages.length === maxRating
          ? messages[(tempRating || rating) - 1]
          : `${tempRating || rating || 0}/${maxRating}`}
      </p>
    </div>
  );
}

function Star({
  onRate,
  onHoverIn,
  onHoverOut,
  full,
  starClass,
  starContainerClass,
}) {
  return (
    <span
      className={cn("cursor-pointer", starContainerClass)}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <HiMiniStar className={starClass} />
      ) : (
        <HiOutlineStar className={starClass} />
      )}
    </span>
  );
}
