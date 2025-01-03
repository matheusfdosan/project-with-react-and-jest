import React from "react"
import "./styles.css"

export default function Card({ data, onClickCard }) {
  const { id, image, title, description, price, rating } = data

  const handleClickCard = () => {
    onClickCard(data)
  }

  return (
    <div className="card" id={`card-number-${id}`} onClick={handleClickCard}>
      <img src={image} alt="illustration" className="illustration" />
      <div className="card-description">
        <h3>{title}</h3>
        <p>{description}</p>

        <div className="card-footer">
          <span>${price}</span>
          <span>
            <img
              src="https://www.iconpacks.net/icons/2/free-star-icon-2768-thumb.png"
              alt="star"
            />{" "}
            {rating.rate}
          </span>
        </div>
      </div>
    </div>
  )
}
