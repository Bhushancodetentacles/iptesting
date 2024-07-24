import React from 'react'

function DeletePopup({ onClose, confirmationMsg, onConfirm}) {
  return (
    <div>
       <div>
            <h6 className='modal-h6 text-white text-2xl'>{confirmationMsg}</h6>
            <div className='flex justify-center mt-5'>
            <button className='button mr-2'  onClick={()=>onClose(false)}>No</button>
            <button className='submit-button'onClick={onConfirm}>Yes</button>
            </div>
        </div>
    </div>
  )
}

export default DeletePopup
