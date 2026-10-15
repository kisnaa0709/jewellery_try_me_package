'use client';

import { useEffect, useRef } from 'react';

interface ShellProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// Native <dialog> handles modal stacking, ESC dismiss, and focus trapping.
// We add: backdrop click to close + body scroll lock while open.
export default function Shell({ open, onClose, children }: ShellProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (open && !dlg.open) {
      dlg.showModal();
      document.body.style.overflow = 'hidden';
    } else if (!open && dlg.open) {
      dlg.close();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="bytive-tryon bytive-dialog"
      onClose={onClose}
      onClick={(e) => {
        // Backdrop is the dialog element itself; the inner shell stops
        // propagation. So a click on the dialog (but not its contents) closes.
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="bytive-shell" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </dialog>
  );
}
