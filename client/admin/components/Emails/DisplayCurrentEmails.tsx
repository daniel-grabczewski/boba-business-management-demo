import { Email } from '../../../../models/Emails'
import {
  format24HourTo12Hour,
  formatDateToDDMMYYYY,
} from '../../../utils/formatDate'
import { faEnvelope, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface DisplayCurrentEmailsProps {
  currentEmails: Email[]
  fetchAndShowEmailDetails: (emailId: number) => void
}

const DisplayCurrentEmails = ({
  currentEmails,
  fetchAndShowEmailDetails,
}: DisplayCurrentEmailsProps) => {
  return (
    <div className="text-gray-600 text-sm font-light">
      {currentEmails.map((email) => (
        <div
          key={email.id}
          onClick={() => fetchAndShowEmailDetails(email.id)}
          className="flex border border-gray-300 cursor-pointer "
        >
          <div className="pl-1 flex flex-col items-center justify-center ">
            <div>
              {email.isRead ? (
                <FontAwesomeIcon
                  icon={faEnvelopeOpen}
                  className="text-xl align-middle m-1"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-xl align-middle m-1"
                />
              )}
            </div>
          </div>

          <div className="flex-1 py-3 px-1 text-left whitespace-nowrap">
            {email.userId}
          </div>
          <div className="flex-1 py-3 text-left">{email.title}</div>
          <div className="flex-1 py-3 pl-6 text-left">
            {format24HourTo12Hour(email.createdAt)}{' '}
            {formatDateToDDMMYYYY(email.createdAt)}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DisplayCurrentEmails
