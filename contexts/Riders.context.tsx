import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useOrders } from './Orders.context'
import { getRandomInterval } from '@/lib/utils'
import { Rider } from '@/dtos/Rider.dto'
import { Order } from '@/dtos/Order.dto'

export type RidersContextProps = {
  riders: Array<Rider>
  setRiders: (riders: Array<Rider>) => void
  sendAway: boolean
  sendRiderAway: (order: Order) => void
}

export const RidersContext = createContext<RidersContextProps>(
  // @ts-ignore
  {}
)

export type RidersProviderProps = {
  children: ReactNode
}

export function RidersProvider(props: RidersProviderProps) {
  const [riders, setRiders] = useState<Array<Rider>>([])
  const [sendAway, setSendAway] = useState<boolean>(false)
  const [assignedOrders, setAssignedOrders] = useState<string[]>([])
  const { orders, pickup } = useOrders()

  useEffect(() => {
    const order = orders.find((order) => !assignedOrders.includes(order.id))
    if (order) {
      setAssignedOrders((prev) => [...prev, order.id])
      setTimeout(() => {
        setRiders((prev) => [
          ...prev,
          {
            orderWanted: order.id,
            pickup,
          },
        ])
      }, getRandomInterval(4_000, 10_000))
    }
  }, [orders])

  function sendRiderAway(order: Order) {
    const rider = riders.find((rider) => rider.orderWanted === order.id)

    setSendAway(false)
    if (rider) {
      rider.pickup(order)
      setRiders((prev) =>
        prev.filter((r) => r.orderWanted !== rider.orderWanted)
      )
      setSendAway(true)
    }
  }

  const context = { riders, setRiders, sendRiderAway, sendAway }
  return (
    <RidersContext.Provider value={context}>
      {props.children}
    </RidersContext.Provider>
  )
}

export const useRiders = () => useContext(RidersContext)
