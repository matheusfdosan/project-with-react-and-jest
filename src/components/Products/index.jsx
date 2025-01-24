import React from "react"
import "./styles.css"
import { useState, useEffect } from "react"
import fetchProducts from "../../utils/fetchProducts"
import Card from "../Card"
import Search from "../Search"
// import loadingGif from "../../assets/loading.gif"
import LoadMoreButton from "../LoadMoreButton"
import Modal from "../Modal"

export default function Products() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [productsPerPage, setProductsPerPage] = useState(10)
  const [showModal, setShowModal] = useState(false)
  const [specificProduct, setSpecificProduct] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true)
        const data = await fetchProducts()
        setProducts(data)
        setFilteredProducts(data)
        setLoading(false)
      } catch (err) {
        console.log(err)
      }
    }

    getProducts()
  }, [])

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }, [showModal])

  useEffect(() => {
    setFilteredProducts(
      products.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) +
          p.description.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search])

  const handleSearchInput = (inputData) => {
    setSearch(inputData)
  }

  const handleLoadMoreProducts = () => {
    setProductsPerPage((prev) => prev + 10)
  }

  const handleClickCard = (data) => {
    setSpecificProduct(data)
    setShowModal(true)
  }

  const handleCloseModal = (value) => {
    setShowModal(value)
  }

  return (
    <div id="products">
      <div id="products-container">
        <Search sendToProductsComponent={handleSearchInput} />
        <h2>All our Products:</h2>

        {loading && <img src={"https://camo.githubusercontent.com/bfb2b63eeb7b21626c1a896e6e58a55838135977ce8b5d7ee13a60080b56a1e7/68747470733a2f2f6173736574732d76322e6c6f7474696566696c65732e636f6d2f612f30336364633665302d313138622d313165652d626630382d3037643838613934316362642f696969774730764a514e2e676966"} alt="loadingGif" id="loading" />}

        <div id="cards-container">
          {filteredProducts.slice(0, productsPerPage).map((p) => {
            return <Card key={p.id} data={p} onClickCard={handleClickCard} />
          })}

          {search.length > 0 && filteredProducts.length === 0 && (
            <p id="not-foud">Products not found! ☹</p>
          )}
        </div>
        {filteredProducts.length !== 0 && productsPerPage < 20 && (
          <LoadMoreButton onClickLoadMore={handleLoadMoreProducts} />
        )}
      </div>

      {showModal && (
        <Modal
          data={specificProduct}
          handleCloseModalClick={handleCloseModal}
        />
      )}
    </div>
  )
}
