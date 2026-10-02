"use client";

import { appState } from "@/store/store";
import {
  IconArrowLeft,
  IconReceipt2,
  IconRefresh,
  IconSearch,
} from "@tabler/icons-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import EmptyOrders from "../components/EmptyOrders";
import OrderCard from "../components/OrderCard";
import { getUserOrders } from "../server/checkout.server";
import { UserOrder } from "../types/checkout.types";

type OrdersScreenProps = {
  initialOrders?: UserOrder[];
  initialError?: string;
};

export default function OrdersScreen({
  initialOrders = [],
  initialError,
}: OrdersScreenProps) {
  const authState = useSelector((state: appState) => state.authReducer);

  const [orders, setOrders] = useState<UserOrder[]>(() => {
    return [...initialOrders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(initialError || null);

  // Filters
  const [filterStatus, setFilterStatus] = useState<
    "all" | "paid" | "pending" | "cash" | "card"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setError(null);

    try {
      const response = await getUserOrders(authState.userInfo?.id);

      if (response.status === "success" && Array.isArray(response.data)) {
        const sorted = [...response.data].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        setOrders(sorted);
      } else {
        setError(response.message || "Failed to load orders");
      }
    } catch {
      setError("An unexpected error occurred while fetching your orders.");
    } finally {
      setIsRefreshing(false);
    }
  };

  // Filtered orders computation
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Status filter
      if (filterStatus === "paid" && !order.isPaid) return false;
      if (filterStatus === "pending" && order.isPaid) return false;
      if (filterStatus === "cash" && order.paymentMethodType !== "cash")
        return false;
      if (filterStatus === "card" && order.paymentMethodType !== "card")
        return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesId = String(order.id).toLowerCase().includes(query);
        const matchesCity = order.shippingAddress?.city
          ?.toLowerCase()
          .includes(query);
        const matchesProduct = order.cartItems?.some((item) =>
          item.product?.title?.toLowerCase().includes(query),
        );

        return matchesId || matchesCity || matchesProduct;
      }

      return true;
    });
  }, [orders, filterStatus, searchQuery]);

  return (
    <div className="bg-gray-50/50 py-10 min-h-[calc(100vh-200px)]">
      <div className="container max-w-5xl">
        {/* Header and Back Link */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <Link
                href="/"
                className="hover:text-primary-600 transition-colors flex items-center gap-1"
              >
                <IconArrowLeft className="h-3.5 w-3.5" />
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-gray-800">My Orders</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                <IconReceipt2 className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Order History
                </h1>
                <p className="text-xs text-gray-500">
                  Track and review all your past and active orders
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 shadow-2xs hover:bg-gray-50 transition-colors active:scale-[0.98] disabled:opacity-60"
          >
            <IconRefresh
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            <span>Refresh</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        {orders.length > 0 && (
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {(
                [
                  { id: "all", label: `All (${orders.length})` },
                  {
                    id: "paid",
                    label: `Paid (${orders.filter((o) => o.isPaid).length})`,
                  },
                  {
                    id: "pending",
                    label: `Pending (${orders.filter((o) => !o.isPaid).length})`,
                  },
                  {
                    id: "card",
                    label: `Card (${orders.filter((o) => o.paymentMethodType === "card").length})`,
                  },
                  {
                    id: "cash",
                    label: `Cash (${orders.filter((o) => o.paymentMethodType === "cash").length})`,
                  },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterStatus(tab.id)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    filterStatus === tab.id
                      ? "bg-primary-600 text-white shadow-2xs"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-56">
              <IconSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ID or product..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2 pl-9 pr-3 text-xs text-gray-800 placeholder-gray-400 focus:border-primary-600 focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Content States */}
        {error ? (
          <div className="mx-auto max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold text-red-600">{error}</p>
            <button
              onClick={handleRefresh}
              className="mt-4 rounded-xl bg-primary-600 px-5 py-2 text-xs font-semibold text-white hover:bg-primary-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : orders.length === 0 ? (
          <EmptyOrders />
        ) : filteredOrders.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
            <p className="text-sm font-semibold text-gray-700">
              No orders match your filter criteria.
            </p>
            <button
              onClick={() => {
                setFilterStatus("all");
                setSearchQuery("");
              }}
              className="mt-3 text-xs font-semibold text-primary-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredOrders.map((order) => (
              <OrderCard key={order._id || order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
