import React from "react"
import "./styles.css"
// import closeModalCross from "../../assets/cross.png"

export default function Modal({ data, handleCloseModalClick }) {
  const handleCloseModal = () => {
    handleCloseModalClick(false)
  }

  const handleBuyProduct = () => {
    alert("Product purchased successfully!  ✅")
    handleCloseModalClick(false)
  }

  return (
    <div id="modal-overlay">
      <div id="modal-container">
        <div id="modal-header">
          <span>{data.category}</span>
          <button onClick={handleCloseModal}>
            <img src={"https://cdn-icons-png.flaticon.com/256/3917/3917759.png"} alt="close-modal" />
          </button>
        </div>
        <div id="modal-main">
          <div
            id="modal-illustration"
            style={{ backgroundImage: `url(${data.image})` }}
          ></div>

          <h2>{data.title}</h2>
          <p>{data.description}</p>

          <div id="price-rate">
            <span id="price">
              Price: <strong>${data.price}</strong>
            </span>
            <div id="rating">
              <span>
                <img
                  src="https://www.iconpacks.net/icons/2/free-star-icon-2768-thumb.png"
                  alt="star"
                />
                {data.rating.rate}
              </span>
              <span>{data.rating.count} reviews</span>
            </div>
          </div>

          <button id="buy-item" onClick={handleBuyProduct}>
            Buy
          </button>
        </div>
      </div>
    </div>
  )
}
