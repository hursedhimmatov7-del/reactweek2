import React from 'react'

const Modal = ({ ref, ModalName, children, close }) => {
  return (
    <dialog
      ref={ref}
      onClick={(e) => e.target === e.currentTarget && close()} 
      className="m-auto w-[420px] max-w-[92vw] rounded-2xl border border-gray-200 p-0 shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm"
    >
      <div className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">{ModalName}</h1>
          <button
            type="button"
            onClick={close}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-black"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </dialog>
  )
}

export default Modal