"use client";

import { useState, useEffect, useTransition } from "react";
import { getOrders } from "@/lib/action";
import {
  Eye,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Filter,
  Package,
  Calendar,
  CreditCard,
  User,
  MapPin,
  ArrowUpRight,
  Phone,
} from "lucide-react";
import Image from "next/image";

// --- LUXURY HELPERS ---
const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NP", { style: "currency", currency: "NPR" }).format(
    amount
  );

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

// Elegant Status Badge
const StatusBadge = ({
  status,
  isPaid,
}: {
  status: string;
  isPaid: boolean;
}) => {
  if (status === "PAID" || isPaid) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
        <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-emerald-900 font-medium">
          Payment Confirmed
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
      <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-amber-700 font-medium">
        Pending Payment
      </span>
    </div>
  );
};

export default function OrdersTab() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal State
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Fetch Data
  const fetchData = async () => {
    setLoading(true);
    const data = await getOrders(page, search, statusFilter);
    setOrders(data.orders);
    setTotalPages(data.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(() => fetchData());
    }, 300);
    return () => clearTimeout(timer);
  }, [search, statusFilter, page]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20 w-full">
      {/* --- HEADER --- */}
      {/* <div className="mb-12 border-l-2 border-black pl-6 flex justify-between">
        <div>
          <h2 className="font-serif italic text-6xl leading-[0.9]">Orders</h2>
        </div>
        <div className="hidden md:block text-right">
          <p className="font-serif text-2xl">
            {orders.length}{" "}
            <span className="text-gray-400 text-lg italic">Entries</span>
          </p>
        </div>
      </div> */}
      <div className="flex w-full justify-between">
        <h1 className="font-serif font-medium italic text-4xl md:text-6xl mb-8 md:mb-12 border-l-2 border-black pl-6">
          Orders
        </h1>

        <p className="font-serif text-2xl">
          {orders.length}{" "}
          <span className="text-gray-400 text-lg italic">Entries</span>
        </p>
      </div>

      {/* --- TOOLBAR --- */}
      <div className="bg-white p-2 mb-8 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        {/* Search Input */}
        <div className="relative flex-grow w-full md:w-auto">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search Order ID, Email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none font-serif text-lg focus:ring-0 focus:bg-[#F9F8F4] transition-colors placeholder:font-sans placeholder:text-xs placeholder:uppercase placeholder:tracking-widest"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative min-w-[180px]">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Filter size={14} className="text-gray-400" />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 font-sans text-[10px] uppercase tracking-widest focus:outline-none focus:border-black cursor-pointer appearance-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="PAID">Confirmed</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>
      </div>

      {/* --- TABLE --- */}
      <div className="bg-white border border-gray-100 shadow-sm overflow-hidden rounded-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-[#FBFBF9]">
                {["Order Details", "Customer", "Amount", "Status", ""].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-8 py-5 font-sans text-[9px] uppercase tracking-[0.25em] text-gray-400 font-medium whitespace-nowrap"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-20 font-serif text-gray-400 animate-pulse"
                  >
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-20 font-serif text-gray-400 italic"
                  >
                    No orders found matching your criteria.
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-[#F9F8F4] transition-colors group cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      {/* Order Details */}
                      <td className="px-8 py-6 align-top">
                        <div className="flex flex-col gap-1">
                          <span className="font-mono text-xs text-gray-900 group-hover:text-[#B0A285] transition-colors">
                            #{order.id.slice(0, 8)}...
                          </span>
                          <div className="flex items-center gap-2 text-gray-400">
                            <Calendar size={12} />
                            <span className="font-sans text-[9px] uppercase tracking-wide">
                              {formatDate(order.createdAt)}
                            </span>
                          </div>
                        </div>
                      </td>
                      {/* Customer */}
                      <td className="px-8 py-6 align-top">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                            <User size={14} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-serif text-lg leading-none mb-1 text-gray-900">
                              {order.customerEmail?.split("@")[0]}
                            </span>
                            <span className="font-sans text-[10px] text-gray-400 tracking-wide">
                              {order.customerEmail}
                            </span>
                          </div>
                        </div>
                      </td>
                      {/* Phone Number
                            <td className="px-8 py-6 align-top">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                                        <Phone size={14} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-serif text-lg leading-none mb-1 text-gray-900">
                                            {order.customerPhone}
                                        </span>
                                    </div>
                                </div>
                            </td> */}
                      {/* Amount */}
                      <td className="px-8 py-6 align-top">
                        <div className="flex flex-col">
                          <span className="font-serif text-xl">
                            {formatCurrency(order.total)}
                          </span>
                          <span className="font-sans text-[9px] text-gray-400 tracking-wide">
                            {order.items.length} Items
                          </span>
                        </div>
                      </td>
                      {/* Status */}
                      <td className="px-8 py-6 align-top">
                        <StatusBadge
                          status={order.status}
                          isPaid={order.isPaid}
                        />
                      </td>
                      {/* Action */}
                      <td className="px-8 py-6 align-middle text-right">
                        <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                          <ArrowUpRight size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center p-6 border-t border-gray-100 bg-[#FBFBF9]">
          <span className="font-sans text-[10px] uppercase tracking-widest text-gray-400">
            Page {page} / {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 bg-white border border-gray-200 text-[10px] uppercase tracking-widest hover:bg-black hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-400 transition-colors"
            >
              Previous
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-white border border-gray-200 text-[10px] uppercase tracking-widest hover:bg-black hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-400 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* --- DETAILED MODAL --- */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#1C1B1A]/60 backdrop-blur-md transition-opacity">
          <div
            className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-300 flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* LEFT: Summary & Address */}
            <div className="w-full md:w-1/3 bg-[#F9F8F4] p-8 border-r border-gray-100 flex flex-col gap-6">
              <div>
                <p className="font-sans text-[9px] uppercase tracking-widest text-gray-400 mb-2">
                  Order Reference
                </p>
                <h3 className="font-mono text-lg tracking-tight text-gray-900">
                  #{selectedOrder.id}
                </h3>
                <p className="font-serif text-sm text-gray-500 mt-1">
                  {formatDate(selectedOrder.createdAt)}
                </p>
              </div>

              <div className="h-px bg-gray-200 w-full" />

              <div>
                <div className="flex items-center gap-2 mb-3 text-gray-900">
                  <User size={14} />
                  <span className="font-sans text-[10px] uppercase tracking-widest font-bold">
                    Customer
                  </span>
                </div>
                <p className="font-serif text-md">
                  {selectedOrder.customerEmail}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3 text-gray-900">
                  <Phone size={14} />
                  <span className="font-sans text-[10px] uppercase tracking-widest font-bold">
                    Phone Number
                  </span>
                </div>
                <p className="font-serif text-md">
                  {selectedOrder.customerPhone}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3 text-gray-900">
                  <MapPin size={14} />
                  <span className="font-sans text-[10px] uppercase tracking-widest font-bold">
                    Shipping Address
                  </span>
                </div>
                <div className="font-serif text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedOrder.address ? (
                    (() => {
                      try {
                        const addr = JSON.parse(selectedOrder.address);
                        return (
                          <>
                            {addr.line1} <br />
                            {addr.line2 && (
                              <>
                                {addr.line2}
                                <br />
                              </>
                            )}
                            {addr.city}, {addr.state} {addr.postal_code} <br />
                            {addr.country}
                          </>
                        );
                      } catch {
                        return "Address format error";
                      }
                    })()
                  ) : (
                    <span className="italic text-gray-400">
                      No address provided
                    </span>
                  )}
                </div>
              </div>

              <div className="h-px bg-gray-200 w-full" />

              <div>
                <div className="flex items-center gap-2 mb-3 text-gray-900">
                  <CreditCard size={14} />
                  <span className="font-sans text-[10px] uppercase tracking-widest font-bold">
                    Payment
                  </span>
                </div>
                <StatusBadge
                  status={selectedOrder.status}
                  isPaid={selectedOrder.isPaid}
                />
              </div>
            </div>

            {/* RIGHT: Items & Totals */}
            <div className="w-full md:w-2/3 p-8 flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <h2 className="font-serif text-3xl">Item Manifest</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto pr-2 space-y-6">
                {selectedOrder.items.map((item: any, i: number) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-16 h-20 bg-gray-100 relative overflow-hidden flex-shrink-0 border border-gray-100">
                      {item.product?.images?.[0] && (
                        <Image
                          src={item.product.images[0]}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-lg leading-tight">
                          {item.product?.name || "Unknown Product"}
                        </h4>
                        <span className="font-mono text-sm text-gray-900">
                          {formatCurrency(item.price)}
                        </span>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="font-sans text-[10px] uppercase tracking-widest text-gray-400">
                          Qty: {item.quantity}
                        </span>
                        <span className="font-sans text-[10px] uppercase tracking-widest text-gray-900 font-bold">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-dashed border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-gray-400">
                    Subtotal
                  </span>
                  <span className="font-serif text-lg">
                    {formatCurrency(selectedOrder.total)}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-gray-400">
                    Shipping
                  </span>
                  <span className="font-serif text-lg">Free</span>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-black">
                  <span className="font-sans text-xs uppercase tracking-widest font-bold">
                    Total Paid
                  </span>
                  <span className="font-serif text-3xl">
                    {formatCurrency(selectedOrder.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
