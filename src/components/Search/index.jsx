import { useState } from "react"
import "./styles.css"
import React from "react"

export default function Search({ sendToProductsComponent }) {
  const [searchData, setSearchData] = useState("")

  const handleChangeInput = (e) => {
    setSearchData(e.target.value)
    sendToProductsComponent(e.target.value)
  }

  return (
    <input
      type="search"
      id="search"
      value={searchData}
      placeholder="Search for a product..."
      onChange={handleChangeInput}
    />
  )
}
