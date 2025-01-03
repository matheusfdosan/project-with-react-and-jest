import React from "react"
import "./styles.css"

export default function LoadMoreButton({ onClickLoadMore }) {
  return <button onClick={onClickLoadMore} id="load-more">Load More</button>
}
