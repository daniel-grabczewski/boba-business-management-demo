import { CartItem } from '../../models/Cart'
import products from '../data/productsData'

// Retrieve array of objects 'cart' from localStorage
function getCartFromLocalStorage(): CartItem[] {
  const cart = localStorage.getItem('cart')
  return cart ? JSON.parse(cart) : []
}

// Replace existing localStorage cart data with given cart data
function setCartInLocalStorage(cart: CartItem[]): void {
  localStorage.setItem('cart', JSON.stringify(cart))
}

// Get cart from localStorage
export function getCart(): CartItem[] {
  return getCartFromLocalStorage()
}

// Add a product to the cart by given productId and given quantity (which has a default value of 1, should no quantity be given)
export function addProductToCartById(productId: number, quantity = 1): void {
  // Retrieve cart from localStorage
  const cart = getCartFromLocalStorage()

  // Find index of cart array that matches given productId
  const index = cart.findIndex((item) => item.productId === productId)

  // If the product is already in the cart, increase its quantity by the specified amount
  if (index !== -1) {
    cart[index].quantity += quantity
  } else {
    // If the product is not in the cart, add it with the specified quantity

    // Search through products data to find product that matches given productId
    const product = products.find((item) => item.id === productId)
    if (product) {
      // If product is found, assign desired data to newItem, matching CartItem interface
      const newItem: CartItem = {
        image: product.image,
        name: product.name,
        quantity: quantity,
        price: product.price,
        totalPrice: product.price * quantity,
        productId: product.id,
      }

      // Add newItem to the cart array
      cart.push(newItem)
    }
  }
  // Replace cart in localStorage with new cart
  setCartInLocalStorage(cart)
}

// Delete a product from the cart by given productId
export function deleteProductFromCart(productId: number): void {
  // Retrieve cart from localStorage
  const cart = getCartFromLocalStorage()

  // Filter out product from cart that matches given productId, then assign result to new updatedCart
  const updatedCart = cart.filter((item) => item.productId !== productId)

  // Replace cart in localStorage with updatedCart
  setCartInLocalStorage(updatedCart)
}

// Remove all the items in the cart
export function clearCart(): void {
  // Set cart in localStorage to be an empty array, effectively clearing the cart
  setCartInLocalStorage([])
}

// Change quantity of a product in cart by given productId and given quantity
export function modifyCartProductQuantity(
  productId: number,
  quantity: number
): void {
  // Retrieve cart from localStorage
  const cart = getCartFromLocalStorage()

  // Find index of cart array that matches given productId
  const index = cart.findIndex((item) => item.productId === productId)

  if (index !== -1) {
    // If item in cart with given productId exists, update the quantity of it with given quantity
    cart[index].quantity = quantity

    // Replace cart in localStorage with new cart
    setCartInLocalStorage(cart)
  }

  // If given productId isn't found in cart, then do nothing
}