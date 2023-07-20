import { useState } from "react";

//falta solucionar tema estilos.
const StarRating = () => {
  const [rating, setRating] = useState(0);
  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        const starNumber = index + 1;
        return (
          <button
            key={starNumber}
            type="button"
            onClick={() => handleRating(starNumber)}
          >
            <svg
              className={`h-6 w-6 ${
                starNumber <= rating ? "text-yellow-500" : "text-gray-400"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2l2.928 6.786L20 7.582l-5 4.351 1.286 6.627L10 15.457l-6.286 3.103L4 11.933l-5-4.351L7.072 8.786 10 2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
