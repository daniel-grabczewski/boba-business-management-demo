import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getDisplayCartItems } from '../../../services/cart'
import { DisplayCartItem } from '../../../../models/Cart'
import { getShippingOptionsFromLocalStorage } from '../../../services/shipping'
import { ShippingOption } from '../../../../models/ShippingOptions'
import { useState } from 'react'
import { transferDemoUserCartToOrders } from '../../../services/orders'
import { getDemoUserDetails } from '../../../services/users'
import { useNavigate } from 'react-router-dom'
import {
  DeliveryAddress,
  PaymentMethod,
  ShippingMethod,
  OrderSummary,
} from '../../components'
import LoadError from '../../components/LoadError/LoadError'

function Checkout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [cartProducts, setCartProduct] = useState([] as DisplayCartItem[])

  const ShippingQuery = useQuery('fetchAllShippingOptions', async () => {
    return getShippingOptionsFromLocalStorage()
  })

  const UserDetailsQuery = useQuery('fetchUserDetails', async () => {
    return getDemoUserDetails()
  })

  const [userDetails, setUserDetails] = useState({
    userId: 'auth0|demoUser',
    firstName: '',
    lastName: '',
    userName: 'demo.user',
    phoneNumber: '',
    emailAddress: 'DemoUser@example.com',
    address: '',
    city: '',
    country: '',
    zipCode: '',
  })
  const [selectedShipping, setSelectedShipping] = useState({
    id: 0,
    type: '',
    price: 0,
  })

  const [emptyFields, setEmptyFields] = useState<string[]>([])
  const [invalidFields, setInvalidFields] = useState<string[]>([])

  const CartQuery = useQuery(
    'fetchCart',
    async () => {
      const cartData = getDisplayCartItems()
      return cartData
    },
    {
      onSuccess: (data: DisplayCartItem[]) => {
        setCartProduct(data)
      },
    }
  )

  const statuses = [ShippingQuery.status, CartQuery.status]

  const purchaseMutation = useMutation(
    async ({ shippingId }: { shippingId: number }) =>
      transferDemoUserCartToOrders(shippingId),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries('fetchOrderByOrderId')
        queryClient.invalidateQueries('fetchAllOrders')
      },
    }
  )

  const fillDetailsWithDefaults = () => {
    if (UserDetailsQuery.data) {
      setEmptyFields([])
      setInvalidFields([])
      setUserDetails(UserDetailsQuery.data)
    }
  }

  const handleShippingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const shippingOption = ShippingQuery.data?.find(
      (option: ShippingOption) => option.id === Number(e.target.value)
    )

    if (shippingOption) {
      setSelectedShipping({
        id: shippingOption.id,
        type: shippingOption.shippingType,
        price: shippingOption.price,
      })
    }
  }

  const handleUserDetailsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }))
    if (value !== '') {
      setEmptyFields((prevFields) =>
        prevFields.filter((field) => field !== name)
      )
    }
  }

  const handleNumberOnlyFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target
    handleUserDetailsChange(event)
    if (/^[\d\s]*$/.test(value)) {
      setInvalidFields((prevFields) =>
        prevFields.filter((field) => field !== name)
      )
    } else {
      setInvalidFields((prevFields) => {
        if (!prevFields.includes(name)) {
          return [...prevFields, name]
        }
        return prevFields
      })
    }
  }

  const subtotal = cartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  )
  const total = subtotal + selectedShipping.price

  const checkValues = (obj: { [key: string]: string }) => {
    const emptyKeys = Object.keys(obj).filter((key) => obj[key] === '')
    setEmptyFields(emptyKeys)
    return emptyKeys.length === 0 && invalidFields.length === 0
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const shippingId = selectedShipping.id

    if (checkValues(userDetails)) {
      purchaseMutation.mutate({ shippingId })
      navigate('/thankyou')
    } else {
      alert('Please fill all empty fields and correct invalid inputs.')
    }
  }

  return (
    <>
      <LoadError status={statuses} />
      <div className="text-4xl font-bold text-center mt-12">
        <h1>Checkout</h1>
      </div>
      <div className="text-black p-8 flex justify-center items-center min-h-screen">
        <form onSubmit={handleSubmit} className="w-3/5">
          <DeliveryAddress
            handleUserDetailsChange={handleUserDetailsChange}
            handleNumberOnlyFieldChange={handleNumberOnlyFieldChange}
            fillDetailsWithDefaults={fillDetailsWithDefaults}
            userDetails={userDetails}
            emptyFields={emptyFields}
            invalidFields={invalidFields}
          />
          <div className="flex flex-col mb-8">
            <PaymentMethod />
            {!ShippingQuery.isLoading && ShippingQuery.data && (
              <ShippingMethod
                shippingData={ShippingQuery.data}
                handleShippingChange={handleShippingChange}
              />
            )}
          </div>
          <OrderSummary
            cartProducts={cartProducts}
            subtotal={subtotal}
            selectedShipping={selectedShipping}
            total={total}
          />
          <button
            className="bg-gray-500 text-white p-4 w-half text-lg font-bold rounded-md transition-colors hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 mt-4"
            type="submit"
          >
            COMPLETE ORDER
          </button>
        </form>
      </div>
    </>
  )
}

export default Checkout
