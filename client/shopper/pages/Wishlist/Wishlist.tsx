import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  deleteWishlistItemByProductId,
  getDisplayWishlistItems,
} from '../../../services/wishlist'
import LoadError from '../../components/LoadError/LoadError'
import { DisplayWishlistItem } from '../../../../models/Wishlist'
import { addItemToCartByProductId } from '../../../services/cart'
import { useState } from 'react'
import { formatCurrency } from '../../../utils/formatCurrency'

const Wishlist = () => {
  const queryClient = useQueryClient()
  const [buttonStatus, setButtonStatus] = useState<{
    [key: number]: { text: string; color: string; disabled: boolean }
  }>({})

  const wishListQuery = useQuery('getDisplayWishlistItems', async () =>
    getDisplayWishlistItems()
  )

  const cartMutation = useMutation(
    async (productId: number) => addItemToCartByProductId(productId),
    {
      onSuccess: (data, variables) => {
        setButtonStatus((prevStatus) => ({
          ...prevStatus,
          [variables]: {
            text: 'Item added',
            color: 'bg-gray-500',
            disabled: true,
          },
        }))
        setTimeout(() => {
          setButtonStatus((prevStatus) => ({
            ...prevStatus,
            [variables]: {
              text: 'Add to cart',
              color: 'bg-black hover:bg-gray-700',
              disabled: true,
            },
          }))
          setTimeout(() => {
            setButtonStatus((prevStatus) => ({
              ...prevStatus,
              [variables]: {
                ...prevStatus[variables],
                disabled: false,
              },
            }))
          }, 200)
        }, 1000)
      },
      onError: (error) => {
        console.error('An error occurred:', error)
      },
    }
  )

  const removeMutation = useMutation(
    async ({ productId }: { productId: number }) =>
      deleteWishlistItemByProductId(productId),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries('getDisplayWishlistItems')
      },
    }
  )

  const handleAddToCart = (productId: number) => {
    if (buttonStatus[productId]?.disabled) return
    cartMutation.mutate(productId)
  }

  async function removeFromWishList(productId: number) {
    removeMutation.mutate({ productId })
  }

  return (
    <>
      <LoadError status={wishListQuery.status} />
      <div className="bg-white w-full flex flex-col items-center py-8">
        <div className="w-10/12 text-center mb-4">
          <h1 className="text-4xl font-semibold text-black">WISHLIST</h1>
        </div>
        {wishListQuery.data && wishListQuery.data.length === 0 ? (
          <div className="bg-white w-10/12 flex flex-row gap-10 items-center border-b border-gray-300 py-4">
            <h1 className="text-2xl font-medium text-black">
              Your wishlist is empty 😔
            </h1>
          </div>
        ) : (
          <div className="bg-white w-10/12 flex flex-col items-center">
            {!wishListQuery.isLoading &&
              wishListQuery.data &&
              wishListQuery.data.map((item: DisplayWishlistItem) => (
                <div
                  key={item.id}
                  className="bg-white w-3/4 flex flex-row gap-10 items-center justify-between border-b border-gray-300 py-4"
                >
                  <div className="flex gap-8 items-center">
                    <div style={{ width: '80px' }}>
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        style={{ maxHeight: '100px', maxWidth: '80px' }}
                        className="w-full h-48 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-black">
                        {item.productName}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-8 items-center">
                    <p className="font-semibold">
                      {formatCurrency(item.productPrice)}
                    </p>
                    <button
                      style={{ minWidth: '100px', width: '100px' }}
                      className={` text-sm text-white p-2 rounded-md ${
                        buttonStatus[item.productId]?.color ||
                        'bg-black hover:bg-gray-700'
                      }`}
                      onClick={() => handleAddToCart(item.productId)}
                      disabled={
                        cartMutation.isLoading ||
                        buttonStatus[item.productId]?.disabled
                      }
                    >
                      {buttonStatus[item.productId]?.text || 'Add to cart'}
                    </button>
                    <button
                      className="flex flex-col items-center text-black hover:text-red-500 transition"
                      onClick={() => removeFromWishList(item.productId)}
                    >
                      <FontAwesomeIcon icon={faHeart} className="text-2xl" />
                      <p className="text-sm mt-1">Remove</p>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Wishlist
