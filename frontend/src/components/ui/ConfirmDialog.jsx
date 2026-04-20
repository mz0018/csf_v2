import * as Dialog from '@radix-ui/react-dialog'
import { Buttons } from './Buttons'

export const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  onConfirm
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />

        <Dialog.Content
        className="fixed left-1/2 top-1/2 w-[320px] -translate-x-1/2 -translate-y-1/2 rounded bg-white p-4 shadow z-[60]"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <Dialog.Title className="text-sm font-semibold">
          {title}
        </Dialog.Title>

        <Dialog.Description className="text-xs text-gray-500 mt-1">
          Please confirm this action before continuing.
        </Dialog.Description>

        <div className="mt-4 flex justify-end gap-2">
          <Dialog.Close asChild>
            <button className="w-full px-3 py-1 border rounded">
              Cancel
            </button>
          </Dialog.Close>

          <Buttons
            onClick={onConfirm}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Confirm
          </Buttons>
        </div>
      </Dialog.Content>
      
      </Dialog.Portal>
    </Dialog.Root>
  )
}