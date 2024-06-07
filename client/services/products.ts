import { UserProduct, UpsertProduct, AdminProduct } from '../../models/Products'
import initialProducts from '../data/productsData'

//Needed apis:
//set products in localStorage
//get products from localStorage
//!fetchProductByIdAdmin(id : number)
//fetchProductByIdShopper(id : number)
//!fetchAllProductsAdmin()
//fetchAllProductsShopper()
//!countProductsBelowStockThreshold(stockThreshold : number)
//!modifyProductById(id: number, updatedProduct: UpsertProduct)
//!createProduct(newProduct: UpsertProduct)
//!deleteProduct(productId)

// If localStorage is empty, initialize localStorage to be equal to initialProducts
export function setProductsInLocalStorageInitial(): void {
  const productsInStorage = localStorage.getItem('products')

  if (!productsInStorage) {
    localStorage.setItem('products', JSON.stringify(initialProducts))
  }
}

// Retrieve array of objects 'products' from localStorage
function getProductsFromLocalStorage(): AdminProduct[] {
  const products = localStorage.getItem('products')
  return products ? JSON.parse(products) : []
}

//! Get all products from localStorage for admin use, INCLUDING the isEnabled field
export function getAllProductsAdmin() : AdminProduct[] {
  return getProductsFromLocalStorage()
}

// Get all products from localStorage for shopper use, WITHOUT the isEnabled field
export function getAllProductsShopper() : UserProduct[] {
  const products = getProductsFromLocalStorage()
  const enabledProducts = products.filter((product) => product.isEnabled)
  const shopperProducts = enabledProducts.map(({ isEnabled, ...rest }) => rest)
  return shopperProducts
}


//! Get product that matches given id
export function fetchProductByIdAdmin(id : number) : AdminProduct {
  const products = getAllProductsAdmin()
  const [product] = products.filter((product) => product.id === id)
  return product
}
