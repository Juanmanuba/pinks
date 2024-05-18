import s from './Kanban.module.scss'
import Column from '../Column'
import { useOrders } from '@/contexts/Orders.context'
import { Order } from '@/dtos/Order.dto'

export default function Kanban() {
  const { orders, changeOrderState, pickup } = useOrders()

  return (
    <section className={s['pk-kanban']}>
      <Column
        title="Pendiente"
        orders={orders.filter((i) => i.state === 'PENDING')}
        moveCard={(order: Order, state: Order['state']) => {
          changeOrderState(order, state)
        }}
      />
      <Column
        title="En preparación"
        orders={orders.filter((i) => i.state === 'IN_PROGRESS')}
        moveCard={(order: Order, state: Order['state']) => {
          changeOrderState(order, state)
        }}
      />
      <Column
        title="Listo"
        orders={orders.filter((i) => i.state === 'READY')}
        moveCard={(order: Order, state: Order['state']) => {
          changeOrderState(order, state)
        }}
      />
    </section>
  )
}
