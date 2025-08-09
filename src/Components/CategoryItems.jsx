import { useLoaderData } from "react-router";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Loading from "./Loading";

const CategoryItems = () => {
  const loadedData = useLoaderData();

  if (!loadedData) {
    return (
      <Loading/>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 p-4 space-y-4">
      {loadedData.map((card) => {
        const rating = Math.round(card?.rating || 0);
        return (
          <div key={card._id} className="break-inside-avoid w-full">
            <div className="card bg-base-100 shadow-md rounded-md border h-full flex flex-col justify-between">
              <figure className=" w-full overflow-hidden">
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-full object-cover"
                />
              </figure>

              <div className="card-body flex flex-col gap-3">
                <h2 className="card-title text-lg font-semibold">
                  {card.name}
                </h2>

                <div className="flex justify-between items-center text-sm">
                  <p className="font-medium">Price: ${card?.price}</p>
                  <div className="rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <input
                        key={star}
                        type="radio"
                        name={`rating-${card._id}`}
                        className="mask mask-star bg-orange-300 w-4"
                        checked={rating === star}
                        readOnly
                        data-tooltip-id={`tooltip-${card._id}`}
                        data-tooltip-content={`Rated ${rating} stars`}
                      />
                    ))}
                    <Tooltip id={`tooltip-${card._id}`} />
                  </div>
                </div>

                <p className="text-sm text-gray-600">{card.description}</p>

                <div className="flex flex-wrap gap-2 text-xs">
                  <div className="badge badge-outline badge-primary">
                    {card?.brand}
                  </div>
                  <div className="badge badge-outline badge-secondary">
                    {card?.stock} in stock
                  </div>
                </div>

                <button className="btn btn-primary w-full rounded mt-4">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryItems;
