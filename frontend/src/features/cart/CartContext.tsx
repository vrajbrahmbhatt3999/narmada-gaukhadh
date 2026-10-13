// Cart state management using localStorage for persistence
// No external state library — uses React context + useReducer

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from 'react'
import type { CartItem, CartState, OrderSummary } from '@/types'
import { SITE_CONFIG } from '@/config/products'

const CART_STORAGE_KEY = 'ng_cart_v1'

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; variantId: string } }
  | {
      type: 'UPDATE_QUANTITY'
      payload: { productId: string; variantId: string; quantity: number }
    }
  | {
      type: 'UPDATE_VARIANT'
      payload: {
        productId: string
        oldVariantId: string
        newVariantId: string
        newVariantLabel: string
        newPricePerUnit: number
        newSku: string
      }
    }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; payload: CartState }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return action.payload

    case 'ADD_ITEM': {
      const existing = state.items.find(
        (i) =>
          i.productId === action.payload.productId &&
          i.variantId === action.payload.variantId
      )
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === action.payload.productId &&
            i.variantId === action.payload.variantId
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        }
      }
      return { items: [...state.items, action.payload] }
    }

    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(
          (i) =>
            !(
              i.productId === action.payload.productId &&
              i.variantId === action.payload.variantId
            )
        ),
      }

    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          items: state.items.filter(
            (i) =>
              !(
                i.productId === action.payload.productId &&
                i.variantId === action.payload.variantId
              )
          ),
        }
      }
      return {
        items: state.items.map((i) =>
          i.productId === action.payload.productId &&
          i.variantId === action.payload.variantId
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      }

    case 'UPDATE_VARIANT':
      return {
        items: state.items.map((i) =>
          i.productId === action.payload.productId &&
          i.variantId === action.payload.oldVariantId
            ? {
                ...i,
                variantId: action.payload.newVariantId,
                variantLabel: action.payload.newVariantLabel,
                pricePerUnit: action.payload.newPricePerUnit,
                sku: action.payload.newSku,
              }
            : i
        ),
      }

    case 'CLEAR_CART':
      return { items: [] }

    default:
      return state
  }
}

interface CartContextValue {
  cart: CartState
  addItem: (item: CartItem) => void
  removeItem: (productId: string, variantId: string) => void
  updateQuantity: (productId: string, variantId: string, quantity: number) => void
  updateVariant: (
    productId: string,
    oldVariantId: string,
    newVariantId: string,
    newVariantLabel: string,
    newPricePerUnit: number,
    newSku: string
  ) => void
  clearCart: () => void
  itemCount: number
  orderSummary: OrderSummary
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] })

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as CartState
        if (parsed?.items?.length) {
          dispatch({ type: 'HYDRATE', payload: parsed })
        }
      }
    } catch {
      // ignore corrupt storage
    }
  }, [])

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch {
      // ignore storage errors
    }
  }, [cart])

  const addItem = (item: CartItem) => dispatch({ type: 'ADD_ITEM', payload: item })
  const removeItem = (productId: string, variantId: string) =>
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, variantId } })
  const updateQuantity = (productId: string, variantId: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, variantId, quantity } })
  const updateVariant = (
    productId: string,
    oldVariantId: string,
    newVariantId: string,
    newVariantLabel: string,
    newPricePerUnit: number,
    newSku: string
  ) =>
    dispatch({
      type: 'UPDATE_VARIANT',
      payload: {
        productId,
        oldVariantId,
        newVariantId,
        newVariantLabel,
        newPricePerUnit,
        newSku,
      },
    })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = cart.items.reduce(
    (sum, i) => sum + i.pricePerUnit * i.quantity,
    0
  )
  const deliveryCharge =
    subtotal === 0
      ? 0
      : subtotal >= SITE_CONFIG.freeDeliveryAbove
      ? 0
      : SITE_CONFIG.defaultDeliveryCharge

  const orderSummary: OrderSummary = {
    subtotal,
    deliveryCharge,
    total: subtotal + deliveryCharge,
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        updateVariant,
        clearCart,
        itemCount,
        orderSummary,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
