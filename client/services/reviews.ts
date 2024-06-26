import {
  CreateReview ,
  Review,
  ProductPageDisplayReview,
  AdminDisplayReview,
  ShopperDisplayReview,
} from '../../models/Reviews'
import initialReviews from '../data/reviewsData'
import { formatDateToDDMMYYYY } from '../utils/formatDate'
import { generateCurrentDateTime } from '../utils/generateDate'
import { getDemoUserDetails } from '../utils/getDemoUserDetails'
import {
  getAllProductsAdmin,
  getProductByIdAdmin,
  setProductsInLocalStorage,
} from './products'
import { getUserByUserId } from './users'

//!What if we have a system where we add a bunch of reviews as soon as the user boots up the app, so they are each added with the current date, with a time that is before the current time. So that way, when the user goes into the admin dashboard, it isn't competely empty.

// Initialize new key 'reviews' to be equal to value of initialReviews IF localStorage 'reviews' key doesn't exist
export function setReviewsInLocalStorageInitial(): void {
  try {
    const reviewsInStorage = localStorage.getItem('reviews')

    if (!reviewsInStorage) {
      localStorage.setItem('reviews', JSON.stringify(initialReviews))
    }
  } catch (error) {
    console.error('Failed to initialize reviews in localStorage:', error)
  }
}

// Replace localStorage reviews with given reviews
export function setReviewsInLocalStorage(reviews: Review[]): void {
  try {
    localStorage.setItem('reviews', JSON.stringify(reviews))
  } catch (error) {
    console.error('Failed to set reviews in localStorage:', error)
  }
}

// Retrieve array of objects 'reviews' from localStorage
export function getReviewsFromLocalStorage(): Review[] {
  try {
    const reviews = localStorage.getItem('reviews')
    return reviews ? JSON.parse(reviews) : []
  } catch (error) {
    console.error('Failed to get reviews from localStorage:', error)
    return []
  }
}

// Get all reviews associated with given product id as ProductPageDisplayReview[]
export function getReviewsByProductId(productId: number): ProductPageDisplayReview[] {
  try {
    const reviews = getReviewsFromLocalStorage()
    const reviewsForProduct = reviews
      .filter((review) => review.productId === productId)
      .map(({ productId, userId, rating, createdAt, description }) => {
        try {
          const userName =
            getUserByUserId(userId)?.userName || 'Error Retrieving User'
          return { productId, userName, rating, createdAt, description }
        } catch (userError) {
          console.error(
            `Failed to retrieve user details for userId ${userId}:`,
            userError
          )
          return {
            productId,
            userName: 'Error Retrieving User',
            rating,
            createdAt,
            description,
          }
        }
      })
    return reviewsForProduct
  } catch (error) {
    console.error('Failed to get reviews for product id:', error)
    return []
  }
}

// Get review associated with given id as AdminDisplayReview
export function getAdminDisplayReviewById(id: number): AdminDisplayReview | undefined {
  try {
    const reviews = getReviewsFromLocalStorage()
    const review = reviews.find((review) => review.id === id)
    if (!review) {
      console.log(`Review with id ${id} not found`)
      return undefined
    }

    const userName =
      getUserByUserId(review.userId)?.userName || 'Error retrieving user'
    const product = getProductByIdAdmin(review.productId)

    return {
      reviewId: review.id,
      productName: product?.name || 'Error retrieving product',
      productImage: product?.image || 'Error retrieving product',
      reviewDescription: review.description,
      reviewRating: review.rating,
      reviewIsEnabled: review.isEnabled,
      reviewerUserName: userName,
      reviewCreatedAt: review.createdAt,
    }
  } catch (error) {
    console.error(`Failed to get admin display review for id ${id}:`, error)
    return undefined
  }
}

// Get all reviews as AdminDisplayReview[]
export function getAllAdminDisplayReviews(): AdminDisplayReview[] {
  try {
    const reviews = getReviewsFromLocalStorage()
    const adminDisplayReviews = reviews.map(({ id }) => {
      const adminDisplayReview = getAdminDisplayReviewById(id)
      return adminDisplayReview
    }).filter(review => review !== undefined) as AdminDisplayReview[] 

    return adminDisplayReviews
  } catch (error) {
    console.error('Failed to get all admin display reviews:', error)
    return [] 
  }
}

// Returns new review id, unique from every other review id
export function generateNewReviewId(): number {
  const reviews = getReviewsFromLocalStorage()
  const newId =
    reviews.length > 0
      ? Math.max(...reviews.map((review) => review.id)) + 1
      : 1

  return newId
}

// Get count of amount of reviews that were created on given date in DD/MM/YYYY format.
export function getCountOfReviewsFromDate(date: string): number {
  try {
    const reviews = getReviewsFromLocalStorage()
    const count = reviews.reduce((accumulator, review) => {
      const convertedDateOfReview = formatDateToDDMMYYYY(review.createdAt)
      if (convertedDateOfReview === date) {
        accumulator++
      }
      return accumulator
    }, 0)

    return count
  } catch (error) {
    console.error('Failed to get count of reviews from date:', error)
    return 0
  }
}

// Recalculate rating of a product associated with the given product id
export function recalculateAverageRatingOfProductById(productId: number): void {
  try {
    const reviews = getReviewsByProductId(productId) // Reviews are as ProductReview[]
    const products = getAllProductsAdmin()
    const productIndex = products.findIndex(
      (product) => product.id === productId
    )

    if (productIndex === -1) {
      console.log(`Product with id ${productId} not found`)
      return
    }

    if (reviews.length === 0) {
      console.log(`No reviews found for product with id ${productId}`)
      products[productIndex].averageRating = 0
    } else {
      const sumOfRatings = reviews.reduce(
        (accumulator, review) => review.rating + accumulator,
        0
      )

      const newAverageRating = sumOfRatings / reviews.length
      products[productIndex].averageRating = newAverageRating
    }

    setProductsInLocalStorage(products)
  } catch (error) {
    console.error(
      'Failed to recalculate average rating for product id:',
      productId,
      error
    )
  }
}


// Recalculate all products' average ratings
export function recalculateAllProductsAverageRating(): void {
  try {
    const products = getAllProductsAdmin()
    for (const product of products) {
      recalculateAverageRatingOfProductById(product.id)
    }
  } catch (error) {
    console.error('Failed to recalculate all products average ratings:', error)
  }
}

// Get all reviews associated with given userId as ShopperDisplayReview[]
export function getReviewsByUserId(userId: string): ShopperDisplayReview[] {
  try {
    const reviews = getReviewsFromLocalStorage()
    const userReviews = reviews
      .filter(review => review.userId === userId)
      .map(({ productId, description, rating, createdAt }) => {
        const reviewProduct = getProductByIdAdmin(productId)
        if (reviewProduct) {
          return {
            productId,
            productName: reviewProduct.name,
            productImage: reviewProduct.image,
            reviewDescription: description,
            reviewerUserName: userId,
            reviewRating: rating,
            reviewCreatedAt: createdAt
          }
        }
        return undefined 
      })
      .filter(review => review !== undefined) 

    return userReviews as ShopperDisplayReview[] 
  } catch (error) {
    console.error(`Failed to get user ${userId} reviews`, error)
    return []
  }
}

// Add review from demo user as CreateReview to reviews in localStorage. Only allow to add a review if the demo user hasn't reviewed the associated product yet Then, recalculates average rating of the product they reviewed.
export function addDemoUserReview(newReview: CreateReview ): void {
  try {
    const reviews = getReviewsFromLocalStorage()
    const demoUserId = getDemoUserDetails().userId
    
    // Check if the demo user has already reviewed this product
    const alreadyReviewed = reviews.some(review => review.productId === newReview.productId && review.userId === demoUserId)
    
    if (!alreadyReviewed) {
      const review = {
        id: generateNewReviewId(),
        productId: newReview.productId,
        description: newReview.description,
        rating: newReview.rating,
        isEnabled: true,
        userId: demoUserId,
        createdAt: generateCurrentDateTime()
      }
      reviews.push(review)
      setReviewsInLocalStorage(reviews)
      recalculateAverageRatingOfProductById(newReview.productId)
    } else {
      console.log(`Cannot add review ${JSON.stringify(newReview)}, as ${demoUserId} already has a review associated with product id ${newReview.productId}`)
    }
  } catch (error) {
    console.error(`Error adding new review ${JSON.stringify(newReview)}`, error)
  }
}

// Update isEnabled status of review associated with given id, to the given status
export function updateReviewStatusById(id : number, status : boolean) : void {
  try {
    const reviews = getReviewsFromLocalStorage()
    const reviewIndex = reviews.findIndex(review => review.id === id)
    if (reviewIndex !== -1) {
      reviews[reviewIndex].isEnabled = status
      setReviewsInLocalStorage(reviews)
    } else {
      console.log(`Review with id ${id} not found`)
    }
  } catch (error) {
    console.error(`Error updating review of id ${id} isEnabled to status of ${status}`, error)
  }
}

// Delete review associated with given userId and productId, then recalculates average rating of the product associated with given productId
export function deleteUserReviewByProductId(productId : number, userId : string) : void {
  try {
    const reviews = getReviewsFromLocalStorage()
    const newReviews = reviews.filter(review => !(review.productId === productId && review.userId === userId))
    setReviewsInLocalStorage(newReviews)
    recalculateAverageRatingOfProductById(productId)
  } catch (error) {
    console.error(`Error deleting review for product id ${productId} of user id ${userId}`, error)
  }
}

