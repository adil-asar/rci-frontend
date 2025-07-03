import React from "react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  itemName,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white w-full max-w-sm mx-auto rounded-lg p-6 relative shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Confirm Delete
        </h3>
        <p className="mb-4 text-gray-700">
          Are you sure you want to delete <strong>{itemName}</strong>'s order?
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
