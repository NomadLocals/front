import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reviewUser } from "../../Redux trad/actions";
import { useNavigate, useParams } from "react-router-dom";


const UserReview = () => {
  const [comment, setComment] = useState("");
  const [type, setType] = useState("");
  const [userId, setUserId] = useState("");
  const [userNameUserReview, setUserNameUserReview] = useState("");
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const {id} = useParams();
  const user = useSelector(state=> state.user);
  const userName = user.userName;
  const navigate = useNavigate();
  


  useEffect(()=>{
    setUserId(id)
    setUserNameUserReview(userName)
  },[])

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !comment ||
      !userId ||
      !userNameUserReview ||
      comment.length > 200
    ) {
      setIsError(true);
      return;
    }

    const review = {
      type,
      description: comment,
      UserNameUserReview: userNameUserReview,
      idUserReview: userId,
    };

    dispatch(reviewUser(review));
    console.log(review);
    setIsError("");
    setComment("");
    setUserId(id);
    setUserNameUserReview(userId);
    navigate("/home");
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Hacer una reseña al usuario
      </h2>
        <div className="text-blue-600 bg-yellow mb-2"> {isError} </div>
      <form onSubmit={handleSubmit}>
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
              setComment("");
              setUserId(userId);
              setUserNameUserReview(userName);
              setIsError("");
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
