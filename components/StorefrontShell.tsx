import { CartProvider } from "@/components/CartProvider";
import Navbar from "@/components/Navbar";
import { auth } from "@/auth";
import { getCartItemCount } from "@/lib/cart.server";

type StorefrontShellProps = {
  children: React.ReactNode;
};

export default async function StorefrontShell({
  children,
}: StorefrontShellProps) {
  const [session, initialItemCount] = await Promise.all([
    auth(),
    getCartItemCount(),
  ]);

  const user =
    session?.user?.role === "customer"
      ? {
          name: session.user.name,
          email: session.user.email,
        }
      : null;

  return (
    <CartProvider initialItemCount={initialItemCount}>
      <Navbar user={user} />
      {children}
    </CartProvider>
  );
}
