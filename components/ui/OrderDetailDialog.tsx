import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Button } from "./button";
import Link from "next/link";
import {
  TableHeader,
  TableRow,
  Table,
  TableHead,
  TableBody,
  TableCell,
} from "./table";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceFormatter from "./PriceFormatter";
import { ScrollArea, ScrollBar } from "./scroll-area";

interface OrderDetailDialogProps {
  order: MY_ORDERS_QUERYResult[number] | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailDialog = ({
  order,
  isOpen,
  onClose,
}: OrderDetailDialogProps) => {
  if (!order) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex max-h-[90vh] flex-col">
        <DialogHeader>
          <DialogTitle className="mr-5">
            Order Details - {order?.orderNumber}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p>
            <strong>Customer:</strong> {order.customerName}
          </p>
          <p>
            <strong>Email:</strong> {order.email}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {order.orderDate && new Date(order.orderDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="font-medium text-green-600 capitalize">
              {order.status}
            </span>
          </p>
          <p>
            <strong>Invoice Number:</strong> {order?.invoice?.number}
          </p>
          {order?.invoice && (
            <Button className="text-shop_darkColor/80 hover:text-shop_darkColor hover:border-shop_darkColor hover:bg-shop_darkColor/10 hoverEffect mt-2 border bg-transparent">
              {order?.invoice?.hosted_invoice_url && (
                <Link href={order?.invoice?.hosted_invoice_url} target="_blank">
                  Download Invoice
                </Link>
              )}
            </Button>
          )}
        </div>
        <ScrollArea className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead></TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {order.products?.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {product?.product?.images && (
                      <Image
                        src={urlFor(product?.product?.images[0]).url()}
                        alt="productImage"
                        width={50}
                        height={50}
                        className="rounded-sm border"
                      />
                    )}
                  </TableCell>
                  <TableCell className="pr-4">
                    {product?.product && product?.product?.name}
                  </TableCell>
                  <TableCell>{product?.quantity}</TableCell>
                  <TableCell>
                    <PriceFormatter
                      amount={product?.product?.price}
                      className="font-medium text-black"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="mt-4 flex items-center justify-end text-right">
          <div className="flex w-44 flex-col gap-1">
            {order?.amountDiscount !== 0 && (
              <div className="flex w-full items-center justify-between">
                <strong>Discount: </strong>
                <PriceFormatter
                  amount={order?.amountDiscount}
                  className="font-bold text-black"
                />
              </div>
            )}
            {order?.amountDiscount !== 0 && (
              <div className="flex w-full items-center justify-between">
                <strong>Subtotal: </strong>
                <PriceFormatter
                  amount={
                    (order?.totalPrice as number) +
                    (order?.amountDiscount as number)
                  }
                  className="font-bold text-black"
                />
              </div>
            )}
            <div className="flex w-full items-center justify-between">
              <strong>Total: </strong>
              <PriceFormatter
                amount={order?.totalPrice}
                className="font-bold text-black"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;
