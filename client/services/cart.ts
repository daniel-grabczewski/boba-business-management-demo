import { CartItem, DisplayCartItem } from '../../models/Cart'
import { getAllProductsAdmin } from './products'



// Replace existing localStorage cart data with given cart data
export function setCartInLocalStorage(cart: CartItem[]): void {
  try {
    localStorage.setItem('cart', JSON.stringify(cart))
  } catch (error) {
    console.error('Failed to set cart in localStorage:', error)
  }
}

// Retrieve array of objects 'cart' from localStorage
export function getCartFromLocalStorage(): CartItem[] {
  try {
    const cart = localStorage.getItem('cart')
    return cart ? JSON.parse(cart) : []
  } catch (error) {
    console.error('Failed to get cart from localStorage:', error)
    return []
  }
}

// Retrieve all the cart data, combine it with product data, and return DisplayCartItem[]
export function getDisplayCartItems(): DisplayCartItem[] {
  try {
    const cart = getCartFromLocalStorage()
    const products = getAllProductsAdmin()
    const displayCart = cart.map(cartItem => {
      const product = products.find(product => product.id === cartItem.productId)
      if (product) {
        return {
          id: cartItem.id,
          image: product.image,
          name: product.name,
          quantity: cartItem.quantity,
          price: product.price,
          totalPrice: product.price * cartItem.quantity,
          productId: product.id
        }
      }
      return undefined
    }).filter(item => item !== undefined) as DisplayCartItem[] 

    return displayCart
  } catch (error) {
    console.error('Error retrieving display cart items:', error)
    return []
  }
}

// Returns new cart id, unique from every other cart id
export function generateNewCartItemId(): number {
  const cartItems = getCartFromLocalStorage()
  const newId =
  cartItems.length > 0
      ? Math.max(...cartItems.map((cartItem) => cartItem.id)) + 1
      : 1

  return newId
}


// Add a product to the cart by given productId and given quantity
export function addProductToCartById(productId: number, quantity = 1): void {
  try {
    const cart = getCartFromLocalStorage()
    const index = cart.findIndex((item) => item.productId === productId)
    const products = getAllProductsAdmin()

    if (index !== -1) {
      cart[index].quantity += quantity
    } else {
      const product = products.find((item) => item.id === productId)
      if (product) {
        const newItem: CartItem = {
          image: product.image,
          name: product.name,
          quantity: quantity,
          price: product.price,
          totalPrice: product.price * quantity,
          productId: product.id,
        }
        cart.push(newItem)
      }
    }
    setCartInLocalStorage(cart)
  } catch (error) {
    console.error('Failed to add product to cart:', error)
  }
}

// Delete a product from the cart by given productId
export function deleteProductFromCart(productId: number): void {
  try {
    const cart = getCartFromLocalStorage()
    const updatedCart = cart.filter((item) => item.productId !== productId)
    setCartInLocalStorage(updatedCart)
  } catch (error) {
    console.error(`Failed to delete product from cart with ID: ${productId}`, error)
  }
}

// Remove all the items in the cart
export function clearCart(): void {
  try {
    setCartInLocalStorage([])
  } catch (error) {
    console.error('Failed to clear cart:', error)
  }
}

// Change quantity of a product in cart by given productId and quantity
export function modifyCartProductQuantity(productId: number, quantity: number): void {
  try {
    const cart = getCartFromLocalStorage()
    const index = cart.findIndex((item) => item.productId === productId)

    if (index !== -1) {
      cart[index].quantity = quantity
      setCartInLocalStorage(cart)
    } else {
      console.error(`Product with ID: ${productId} not found in cart`)
    }
  } catch (error) {
    console.error(`Failed to modify quantity of product in cart with ID: ${productId}`, error)
  }
}
