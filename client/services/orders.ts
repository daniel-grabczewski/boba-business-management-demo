import { Order, OrderInitial } from '../../models/Orders'
import initialOrders from '../data/ordersData'

//NEEDED:
//!(are some of these more appropriate to be written in the cart services?)
//setOrdersInLocalStorageInitial
//setOrdersInLocalStorage
//getOrdersFromLocalStorage
// transferDemoUserCartToOrders(cart) (copies the demo user's cart into the orders data, then clears the cart of the demo user)
// getLatestOrderIdOfDemoUser (returns the latest orderId from the order the demo user made)
// getOrderCountFromDate (gets count of the amount of orders that were made on the given date 'DD/MM/YYYY' format)
// getOrdersOfDemoUser (gets all orders of demo user, with interface of UserOrderSummary[])
// getAllOrders (gets all orders as AdminOrderSummary[])
// getOrderById (given order id, returns order as Order interface)

// If localStorage 'orders' key doesn't exist, initialize new key 'orders' to be equal to value of initialOrders
export function setOrdersInLocalStorageInitial(): void {
  try {
    const ordersInStorage = localStorage.getItem('orders')

    if (!ordersInStorage) {
      localStorage.setItem('orders', JSON.stringify(initialOrders))
    }
  } catch (error) {
    console.error('Failed to initialize orders in localStorage:', error)
  }
}

export function setOrdersInLocalStorage(orders: OrderInitial[]): void {
  try {
    localStorage.setItem('orders', JSON.stringify(orders))
  } catch (error) {
    console.error('Failed to set orders in localStorage:', error)
  }
}



export async function moveCartToPurchases(shippingId: number, token: string) {
  try {
    await request
      .post(baseUrl)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send({ shippingId })
  } catch (error) {
    console.error('Error creating new Purchase:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

export async function fetchLatestOrderId(token: string) {
  try {
    const res = await request
      .get(baseUrl + '/latest-order')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
    return res.body
  } catch (error) {
    console.error(
      'Error fetching latest purchase order:',
      (error as Error).message
    )
    throw { error: (error as Error).message }
  }
}

// fetches orders by user id
export async function fetchUserOrders(token: string) {
  try {
    const response = await request
      .get(`${baseUrl}/user-orders`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
    return response.body.orders
  } catch (error) {
    console.error('Error fetching user orders:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

// fetches all orders
export async function fetchAllOrders(token: string) {
  try {
    const response = await request
      .get(`${baseUrl}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
    return response.body.orders
  } catch (error) {
    console.error('Error fetching user orders:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

export async function fetchOrderById(orderId: number, token: string) {
  try {
    const response = await request

      .get(`${baseUrl}/order/${orderId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')

    if (response.status === 200) {
      return response.body.order
    } else {
      console.error('Error fetching order by ID:', response.text)
      throw { error: response.text }
    }
  } catch (error) {
    console.error('Error fetching user orders:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

// fetOrderbyDate

export async function fetchAmountOfOrdersByDate(date: string, token: string) {
  try {
    const response = await request
      .get(`${baseUrl}/orders-by-date/${date}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')

    return response.body.amountOfOrders
  } catch (error) {
    console.error('Error fetching user orders:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}
