import { Order } from '@/dtos/Order.dto'
import { OrderOrchestrator } from '@/lib'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

export type OrdersContextProps = {
  orders: Array<Order>
  setOrders: (orders: Array<Order>) => void
  changeOrderState: (order: Order, state: string) => void
  pickup: (order?: Order) => void
}

export const OrdersContext = createContext<OrdersContextProps>(
  // @ts-ignore
  {}
)

export type OrdersProviderProps = {
  children: ReactNode
}

export function OrdersProvider(props: OrdersProviderProps) {
  const [orders, setOrders] = useState<Array<Order>>([])

  const changeOrderState = (order: Order, state: string) => {
    const newOrders = orders.map((o) => {
      if (o.id === order.id) {
        return { ...o, state }
      }
      return o
    })
    setOrders(newOrders as Order[])
  }

  useEffect(() => {
    const orderOrchestrator = new OrderOrchestrator()
    const listener = orderOrchestrator.run()
    listener.on('order', (order) => {
      setOrders((prev) => [...prev, order])
    })
  }, [])

  const pickup = (order?: Order) => {
    if (order?.state === 'DELIVERED') {
      const newOrders = orders.filter((o) => o.id !== order.id)
      setOrders(newOrders)
    }
  }

  const context = {
    orders,
    setOrders,
    changeOrderState,
    pickup,
  }

  return (
    <OrdersContext.Provider value={context}>
      {props.children}
    </OrdersContext.Provider>
  )
}

export const useOrders = () => useContext(OrdersContext)
