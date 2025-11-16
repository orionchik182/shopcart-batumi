"use client";
import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import React, { useState } from "react";
import { TableBody, TableCell, TableRow } from "./table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { format } from "date-fns";
import PriceFormatter from "./PriceFormatter";
import { X } from "lucide-react";
import OrderDetailDialog from "./OrderDetailDialog";
import toast from "react-hot-toast";

const OrdersComponent = ({ orders }: { orders: MY_ORDERS_QUERYResult }) => {
  const [selectedOrder, setSelectedOrder] = useState<
    MY_ORDERS_QUERYResult[number] | null
  >(null);

  const handleDelete = () => {
    toast.error("Delete method applied for Admin");
  };

  return (
    <>
      <TableBody>
        <TooltipProvider>
          {orders?.map((order) => (
            <Tooltip key={order?._id}>
              <TooltipTrigger asChild>
                <TableRow
                  className="h-12 cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedOrder(order)}
                >
                  <TableCell className="font-medium">
                    {order.orderNumber?.slice(-10) ?? "N/A"}...
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order?.orderDate &&
                      format(new Date(order.orderDate), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {order.email}
                  </TableCell>
                  <TableCell>
                    <PriceFormatter
                      amount={order?.totalPrice}
                      className="font-medium text-black"
                    />
                  </TableCell>
                  <TableCell>
                    {order?.status && (
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${order.status === "paid" ? "bg-green-100 text-gray-800" : "bg-yellow-100 text-yellow-800"}`}
                      >
                        {order?.status.charAt(0).toLocaleUpperCase() +
                          order?.status.slice(1)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order?.invoice && (
                      <p className="line-clamp-1 font-medium">
                        {order?.invoice ? order?.invoice?.number : "----"}
                      </p>
                    )}
                  </TableCell>
                  <TableCell
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDelete();
                    }}
                    className="group flex items-center justify-center"
                  >
                    <X
                      size={20}
                      className="group-hover:text-shop_dark_green hoverEffect"
                    />
                  </TableCell>
                </TableRow>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to see order details</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </TableBody>
      <OrderDetailDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
};

export default OrdersComponent;
