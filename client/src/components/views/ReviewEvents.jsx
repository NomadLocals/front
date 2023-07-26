import { useEffect, useState } from "react";
import { reviewEvent } from "../../Redux trad/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import swal from "sweetalert";

const EventReview = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [type, setType] = useState("");
  const [idEventReview, setIdEventReview] = useState("");
  const [userNameUserReview, setUserNameUserReview] = useState("");
  const [isError, setIsError] = useState("");
  const user = useSelector((state) => state.user);
  const userName = user.userName;
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  useEffect(() => {
    setIdEventReview(id);
    setUserNameUserReview(userName);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !rating ||
      rating < 1 ||
      rating > 5 ||
      !comment ||
      comment.length > 200 ||
      !idEventReview ||
      !userNameUserReview
    ) {
      setIsError("Completa los campos correctamente");

      return;
    }

    const review = {
      type: type,
      description: comment,
      score: rating,
      UserNameUserReview: userNameUserReview,
      idEventReview: idEventReview,
    };

    dispatch(reviewEvent(review)).then(() => {
      swal({
        title: "Recibido",
        text: `¡Gracias por enviar tu reseña! Tu aporte es valioso para mejorar nuestros servicios y ofrecerte una mejor experiencia.`,
        icon: "success",
        buttons: true,
        closeModel: false,
      });
    });
    setIsError("");
    setRating(0);
    setComment("");
    setIdEventReview(id);
    setUserNameUserReview(userName);
    navigate(`/home/detail/${id}`);
  };

  return (
    <>
      <NavBar />
      <div className="bg-grey min-h-screen lg:min-w-52 flex justify-center font-quick">
        <div className="mt-10 lg:w-8/12 shadow-2xl rounded-lg overflow-hidden flex flex-col justify-center items-center p-5">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-center font-spartan">
            Hacer una reseña de evento:
          </h2>
          <div className="text-blue bg-yellow mb-3"> {isError} </div>
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
              <label className="block font-semibold mb-2">
                Tipo de revisión:
              </label>
              <select
                onChange={(event) => setType(event.target.value)}
                className="block px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
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
                className="w-full p-2 border border-gray-300 rounded"
                value={comment}
                onChange={handleCommentChange}
                rows="4"
                cols="30"
              />
            </div>
            <div className="flex justify">
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-blue text-white font-semibold hover:bg-indigo-700"
              >
                Enviar reseña
              </button>
              <button
                type="button"
                onClick={() => {
                  setRating(0);
                  setComment("");
                  setIdEventReview(id);
                  setUserNameUserReview(userName);
                  setIsError("");
                  navigate("/home");
                }}
                className="px-6 mx-3 py-2 rounded-lg bg-blue text-white font-semibold hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EventReview;
