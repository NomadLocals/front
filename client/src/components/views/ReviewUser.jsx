import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { reviewUser } from "../../Redux trad/actions";
import { FaStar } from "react-icons/fa";

const UserReview = ({ user }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [type, setType] = useState("");
  const [userId, setUserId] = useState("");
  const [userNameUserReview, setUserNameUserReview] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleUserNameUserReviewChange = (event) => {
    setUserNameUserReview(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !rating ||
      rating < 1 ||
      rating > 5 ||
      !comment ||
      !userId ||
      !userNameUserReview
    ) {
      setIsError(true);
      setIsSuccess(false);
      return;
    }

    const review = {
      type,
      description: comment,
      score: rating,
      UserNameUserReview: userNameUserReview,
      userId: userId,
    };

    dispatch(reviewUser(review));

    setIsSuccess(true);
    setIsError(false);

    setRating(0);
    setComment("");
    setUserId("");
    setUserNameUserReview("");
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Hacer una reseña al usuario
      </h2>
      {isSuccess && (
        <div className="text-green-600 mb-2">¡Reseña enviada con éxito!</div>
      )}
      {isError && (
        <div className="text-red-600 mb-2">
          Error al enviar la reseña. Por favor, proporcione toda la información
          requerida.
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Calificación:</label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                name="rating"
                onClick={() => handleRatingChange(value)}
                className={`w-6 h-6 mr-1 ${
                  value <= rating ? "text-yellow" : "text-black"
                }`}
              >
                <FaStar />
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Tipo de revisión:</label>
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="block w-min px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          >
            <option value="Opciones">Elige una opción</option>
            <option value="Estafa">Estafa</option>
            <option value="Honestidad">Honestidad</option>
            <option value="Puntualidad">Puntualidad</option>
            <option value="Confiable">Confiable</option>
            <option value="Falsa publicidad">Falsa publicidad</option>
            <option value="Violencia">Violencia</option>
            <option value="Excelente servicio">Excelente servicio</option>
            <option value="Buena comunicación">Buena comunicación</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Comentario:</label>
          <textarea
            className="block w-min px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            value={comment}
            onChange={handleCommentChange}
            rows="4"
            cols="50"
            required
          />
        </div>
        <div className="flex justify">
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-blue text-black font-semibold hover:bg-indigo-700"
          >
            Enviar reseña
          </button>
          <button
            type="button"
            onClick={() => {
              setRating(0);
              setComment("");
              setUserId("");
              setUserNameUserReview("");
              setIsSuccess(false);
              setIsError(false);
            }}
            className="px-6 py-2 rounded-lg bg-blue text-black font-semibold hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserReview;
