import {
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
} from "@tabler/icons-react";

export default function Rating({ rating }: { rating: number }) {
  const normalizedRating = Math.max(0, Math.min(5, rating));

  function renderStar(position: number) {
    if (normalizedRating >= position) {
      return <IconStarFilled aria-hidden="true" size={16} />;
    }

    if (normalizedRating >= position - 0.5) {
      return <IconStarHalfFilled aria-hidden="true" size={16} />;
    }

    return <IconStar aria-hidden="true" size={16} stroke={2} />;
  }

  return (
    <div
      className="stars flex items-center gap-0.5 text-yellow-400"
      aria-label={`${normalizedRating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((position) => (
        <span key={position}>{renderStar(position)}</span>
      ))}
    </div>
  );
}
