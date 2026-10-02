import {
  IconAlertCircle,
  IconCash,
  IconCheck,
  IconCreditCard,
  IconPackage,
  IconTruck,
} from "@tabler/icons-react";

type OrderStatusBadgeProps = {
  type: "payment" | "delivery" | "method";
  value: boolean | string;
};

export default function OrderStatusBadge({ type, value }: OrderStatusBadgeProps) {
  if (type === "payment") {
    const isPaid = Boolean(value);
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
          isPaid
            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
            : "bg-amber-50 text-amber-700 border border-amber-200"
        }`}
      >
        {isPaid ? (
          <>
            <IconCheck stroke={2.5} className="h-3.5 w-3.5" />
            <span>Paid</span>
          </>
        ) : (
          <>
            <IconAlertCircle stroke={2} className="h-3.5 w-3.5" />
            <span>Pending Payment</span>
          </>
        )}
      </span>
    );
  }

  if (type === "delivery") {
    const isDelivered = Boolean(value);
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
          isDelivered
            ? "bg-blue-50 text-blue-700 border border-blue-200"
            : "bg-purple-50 text-purple-700 border border-purple-200"
        }`}
      >
        {isDelivered ? (
          <>
            <IconPackage stroke={2} className="h-3.5 w-3.5" />
            <span>Delivered</span>
          </>
        ) : (
          <>
            <IconTruck stroke={2} className="h-3.5 w-3.5" />
            <span>In Transit</span>
          </>
        )}
      </span>
    );
  }

  if (type === "method") {
    const isCard = value === "card";
    return (
      <span className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
        {isCard ? (
          <>
            <IconCreditCard className="h-3.5 w-3.5 text-primary-600" />
            <span>Card</span>
          </>
        ) : (
          <>
            <IconCash className="h-3.5 w-3.5 text-emerald-600" />
            <span>Cash</span>
          </>
        )}
      </span>
    );
  }

  return null;
}
