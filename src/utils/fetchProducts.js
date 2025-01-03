import axios from "axios"

export default async function fetchProducts() {
  const url = "https://fakestoreapi.com/products"
  return await axios
    .get(url)
    .then((response) => response.data)
    .catch((err) => console.log("Error to fecth products: " + err))
}
