import { Link } from "react-router-dom";

const Activity = ({
  id,
  name,
  eventDate,
  image,
  location,
  minCost,
  minSizePeople,
  place
}) => {
  return (
    <Link to={`/home/detail/${id}`}>
      <div className="flex h-[150px] items-center bg-white shadow-lg rounded-lg max-h-28 mt-3 mb-1 font-quick md:min-h-[200px] col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1">
        <div className="w-1/2 h-full">
          <img
            style={{height: "110px"}}
            src={image}
            alt="Imagen de la actividad"
            className="h-full w-full object-cover rounded-l-lg md:min-h-[200px]"
          />
        </div>
        <div className="w-1/2 h-full p-2 overflow-hidden md:flex md:flex-col md:justify-center">
          <h2 className="text-base font-semibold mb-2 lg:text-lg overflow-ellipsis md:text-center">{name}</h2>
          <p className="text-xs text-gray-500 mb-2 lg:text-base">Fecha: {eventDate}</p>
          <p className="text-xs text-gray-500 lg:text-base">Localidad: {place} </p>
        </div>
      </div>
    </Link>
  );
};

export default Activity;
