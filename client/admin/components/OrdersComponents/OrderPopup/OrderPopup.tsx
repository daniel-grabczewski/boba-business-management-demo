import { useEffect, useRef } from 'react'
import { useQuery } from 'react-query'
import LoadError from '../../../../user/components/LoadError/LoadError'
import { getOrderById } from '../../../../services/orders'
import { Order } from '../../../../../models/Orders'

interface OrderPopupProps {
  orderId: number
  order: Order
  closeOrderPopup: () => void
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
}

const OrderPopup = ({ orderId, order, closeOrderPopup }: OrderPopupProps) => {

  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        closeOrderPopup()
      }
    }

    window.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closeOrderPopup])

  const { status } = useQuery(
    ['getOrderById', orderId],
    async () => {
      return getOrderById(orderId)
    },
    {
      refetchOnWindowFocus: false,
    }
  )

  //!NEED ADDITIONAL FUNCTIONS HERE TO GET USER DETAILS AND ADDITIONAL PRODUCT DETAILS. MAYBE A NEW DISPLAY ORDER SERVICE FUNCTION IS NEEDED?
  return (
    <> </>
    /*
    <>
      <LoadError status={status} />
      {status === 'success' && order && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div
            ref={popupRef}
            className="bg-white p-8 w-[70%] max-w-full max-h-[80%] overflow-y-auto shadow-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Order #{order.id}</h2>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Information:</h3>
              <p>
                Name: {order.userFirstName} {order.userLastName}
              </p>
              <p>Address: {order.userAddress}</p>
              <p>City: {order.userCity}</p>
              <p>Country: {order.userCountry}</p>
              <p>Zip Code: {order.userZipCode}</p>
              <p>Email: {order.userEmail}</p>
              <p>Phone Number: {order.userPhoneNumber}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold">Order Items:</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4 border">Product Name</th>
                    <th className="py-2 px-4 border">Item Quantity</th>
                    <th className="py-2 px-4 border">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item) => (
                    <tr key={item.productSale} className="border-b">
                      <td className="py-2 px-4 border">
                        <div className="flex items-center">
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-16 h-16 object-contain mr-2"
                          />
                          {item.productName}
                        </div>
                      </td>
                      <td className="py-2 px-4 border">{item.itemQuantity}</td>
                      <td className="py-2 px-4 border">$ {item.productSale}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-200">
                    <td className="py-2 px-4 border">
                      <span className="font-bold">Shipping: </span>
                      {order.shippingType}
                    </td>
                    <td className="py-2 px-4 border"></td>
                    <td className="py-2 px-4 border">
                      {formatCurrency(order.shippingPrice)}
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="py-2 px-4 border font-bold text-xl">
                      Total Cost:
                    </td>
                    <td className="py-2 px-4 border"></td>
                    <td className="bg-gray-300 py-2 px-4 border">
                      {formatCurrency(
                        order.orderItems.reduce(
                          (total, item) => total + item.productSale,
                          0
                        ) + order.shippingPrice
                      )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <hr className="border-t border-gray-300" />
            <div className="mt-4 text-right">
              <button
                onClick={closeOrderPopup}
                className="px-2 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Back to orders
              </button>
            </div>
          </div>
        </div>
      )}
        
    </>
    */
  )
}

export default OrderPopup
