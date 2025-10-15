import { cn } from "@/lib/utils";

export const Title = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={cn("text-3xl font-bold text-shop_dark_green capitalize tracking-wide", className)}>{children}</h2>
  );
};
export const SubTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3 className={cn("font-semibold text-gray-900", className)}>{children}</h3>
  );
};

export const SubText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={cn("text-gray-600 text-sm", className)}>{children}</p>
  );
};