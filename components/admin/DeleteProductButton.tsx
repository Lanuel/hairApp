"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/lib/admin/actions";

type DeleteProductButtonProps = {
  productId: string;
  productName: string;
};

export default function DeleteProductButton({
  productId,
  productName,
}: DeleteProductButtonProps) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className="admin-icon-btn admin-icon-btn-danger"
      disabled={pending}
      aria-label={`Delete ${productName}`}
      onClick={() => {
        const confirmed = window.confirm(
          `Delete "${productName}"? This action cannot be undone.`,
        );
        if (!confirmed) return;

        startTransition(async () => {
          await deleteProduct(productId);
        });
      }}
    >
      <Trash2 size={16} />
    </button>
  );
}
