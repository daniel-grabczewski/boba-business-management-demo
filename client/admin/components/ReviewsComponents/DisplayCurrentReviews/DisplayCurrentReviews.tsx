import { AdminDisplayReview } from '../../../../../models/Reviews'
import {
  format24HourTo12Hour,
  formatDateToDDMMYYYY,
} from '../../../../utils/formatDate'
interface DisplayCurrentReviewsProps {
  getPaginatedReviews: () => AdminDisplayReview[]
  setSelectedReviewById: (reviewId: number) => void
}

const DisplayCurrentReviews = ({
  getPaginatedReviews,
  setSelectedReviewById,
}: DisplayCurrentReviewsProps) => {
  return (
    <>
      {getPaginatedReviews().length === 0 ? (
        <p className="text-center mt-4 font-semi-bold">No reviews found</p>
      ) : (
        <div className="divBody text-gray-600 text-sm font-light">
          {getPaginatedReviews().map((review) => (
            <div
              key={review.reviewId}
              className="divRow border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
              onClick={() => setSelectedReviewById(review.reviewId)}
            >
              <div
                className="divCell py-3 px-8 text-left whitespace-nowrap"
                style={{ minWidth: '200px' }}
              >
                {review.reviewerUserName}
              </div>
              <div
                className="divCell py-3 px-8 text-left"
                style={{ minWidth: '300px' }}
              >
                {review.productName}
              </div>
              <div
                className="divCell py-3 px-8 text-left"
                style={{ minWidth: '100px' }}
              >
                {review.reviewRating}
              </div>
              <div
                className="divCell py-3 px-8 text-left"
                style={{ minWidth: '100px' }}
              >
                {review.reviewIsEnabled ? 'Enabled' : 'Disabled'}
              </div>
              <div
                className="divCell py-3 px-8 text-left"
                style={{ minWidth: '200px' }}
              >
                {format24HourTo12Hour(review.reviewCreatedAt)}{' '}
                {formatDateToDDMMYYYY(review.reviewCreatedAt)}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default DisplayCurrentReviews
