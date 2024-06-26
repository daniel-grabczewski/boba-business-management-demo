import { useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  deleteEmailById,
  getEmailById,
  updateEmailReadStatusById,
} from '../../../services/emails'
import LoadError from '../../../user/components/LoadError/LoadError'
import { Email } from '../../../../models/Emails'
import { formatDateToDDMMYYYY } from '../../../utils/formatDate'

interface EmailPopupProps {
  emailId: number
  closeEmailPopup: () => void
}

const ReviewPopup = ({ emailId, closeEmailPopup }: EmailPopupProps) => {
  const queryClient = useQueryClient()

  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        closeEmailPopup()
      }
    }

    window.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closeEmailPopup])

  const { data: email, status } = useQuery(
    ['getEmailById', emailId],
    async () => {
      return (getEmailById(emailId)) as Email
    },
    {
      refetchOnWindowFocus: false,
    }
  )

  const updateEmailStatusMutation = useMutation(
    async (data: { emailId: number; isRead: boolean }) => {
      return updateEmailReadStatusById(data.emailId, data.isRead)
    },
    {
      onSuccess: () => {
        //Need to check the api function
        queryClient.invalidateQueries('getEmailById')
        queryClient.invalidateQueries('getEmailsFromLocalStorage')
      },
    }
  )
  const deleteEmailMutation = useMutation(
    async (emailId: number) => {
      return deleteEmailById(emailId)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getEmailById')
        queryClient.invalidateQueries('getEmailsFromLocalStorage')
      },
    }
  )

  const updateEmailStatus = async (emailId: number, isRead: boolean) => {
    updateEmailStatusMutation.mutate({ emailId, isRead })
  }

  return (
    <>
      <LoadError status={status} />
      {status === 'success' && email && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => updateEmailStatus(email.id, !email.isRead)}
        >
          <div
            ref={popupRef}
            className="bg-white p-5 rounded-lg flex flex-col justify-between w-4/5 max-w-lg min-h-[400px]"
          >
            <div>
              <div className=" flex flex-row justify-between">
                <button
                  onClick={closeEmailPopup}
                  className="px-2 py-1 text-white bg-blue-600 rounded hover:bg-blue-700 mb-5"
                >
                  Back to inbox
                </button>
                <button
                  onClick={() => deleteEmailMutation.mutate(emailId)}
                  className="px-2 py-1 text-white bg-blue-600 rounded hover:bg-blue-700 mb-5"
                >
                  Delete
                </button>
              </div>
              <div className="flex justify-between text-lg">
                <div>
                  <h2 className="font-bold">{email.title}</h2>
                  <p className="text-md">From {email.userId}</p>
                </div>

                <p>{formatDateToDDMMYYYY(email.createdAt)}</p>
              </div>
            </div>
            <div>
              <h2 className="font-bold mb-2">Description:</h2>
              <p>{email.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ReviewPopup
