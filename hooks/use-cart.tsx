import { CardProductType } from "@/@types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

type CartContextType = {
  paymentIntent: string | null;
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CardProductType[] | null;
  increaseProductQuantity: (product: CardProductType) => void;
  decreaseProductQuantity: (product: CardProductType) => void;
  handleProductToCart: (product: CardProductType) => void;
  removeProductToCart: (productId: string) => void;
  handleRemoveAllProducts: () => void;
  handleSetPaymentIntent: (val: string | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmout] = useState(0);
  const [cartProducts, setCartProducts] = useState<CardProductType[] | null>(
    null,
  );
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    const eShopPaymentIntent: any = localStorage.getItem("eShopPaymentIntent");
    const cartItems: any = localStorage.getItem("cart-storage");
    if (cartItems) {
      setCartProducts(() => JSON.parse(cartItems));
    }
    const paymentIntent: string | null = JSON.parse(eShopPaymentIntent);

    setPaymentIntent(paymentIntent);
  }, []);

  useEffect(() => {
    if (cartProducts) {
      const getTotals = () => {
        const { quantity, total } = cartProducts.reduce(
          (acc, item) => {
            const totalAmount = item.quantity * item.price;
            acc.total += totalAmount;
            acc.quantity += item.quantity;
            return acc;
          },
          {
            total: 0,
            quantity: 0,
          },
        );

        setCartTotalQty(quantity);
        setCartTotalAmout(total);
      };

      getTotals();
    }
  }, [cartProducts]);

  const handleProductToCart = useCallback((product: CardProductType) => {
    setCartProducts((prev) => {
      let updatedCart;

      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }

      toast.success("Product added to cart");
      localStorage.setItem("cart-storage", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const increaseProductQuantity = useCallback(
    (product: CardProductType) => {
      let updatedCart;

      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingProduct = cartProducts.findIndex(
          (item) => item.id === product.id,
        );

        if (existingProduct === -1) {
          return toast.error("Something went wrong !");
        }

        updatedCart[existingProduct].quantity = ++updatedCart[existingProduct]
          .quantity;

        setCartProducts(updatedCart);
        localStorage.setItem("cart-storage", JSON.stringify(updatedCart));
      }
    },
    [cartProducts],
  );

  const removeProductToCart = useCallback(
    (productId: string) => {
      if (cartProducts) {
        const filteredProduct = cartProducts.filter(
          (item) => item.id !== productId,
        );
        setCartProducts(filteredProduct);
        toast.success("Product removed from cart");
        localStorage.setItem("cart-storage", JSON.stringify(filteredProduct));
      }
    },
    [cartProducts],
  );

  const decreaseProductQuantity = useCallback(
    (product: CardProductType) => {
      let updatedCart;

      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingProduct = cartProducts.findIndex(
          (item) => item.id === product.id,
        );

        if (existingProduct === -1) {
          return toast.error("Something went wrong !");
        }

        updatedCart[existingProduct].quantity = --updatedCart[existingProduct]
          .quantity;

        setCartProducts(updatedCart);
        localStorage.setItem("cart-storage", JSON.stringify(updatedCart));
      }
    },
    [cartProducts],
  );

  const handleSetPaymentIntent = useCallback((val: string | null) => {
    setPaymentIntent(val);
    localStorage.setItem("eShopPaymentIntent", JSON.stringify(val));
  }, []);

  const handleRemoveAllProducts = useCallback(() => {
    setCartProducts(null), setCartTotalQty(0);

    localStorage.removeItem("cart-storage");
  }, []);

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    paymentIntent,
    handleProductToCart,
    removeProductToCart,
    increaseProductQuantity,
    decreaseProductQuantity,
    handleRemoveAllProducts,
    handleSetPaymentIntent,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("UseCart must be used within a CartContextProvider");
  }

  return context;
};
