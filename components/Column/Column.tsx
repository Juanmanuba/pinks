import { getItemCounts, getNextState, getPreviousState } from '@/lib/utils'
import s from './Column.module.scss'
import { Order } from '@/dtos/Order.dto'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleLeft,
  faCircleRight,
} from '@fortawesome/free-regular-svg-icons'
import { useRiders } from '@/contexts/Riders.context'

export type ColumnProps = {
  orders: Array<Order>
  title: string
  moveCard: (order: Order, state: Order['state']) => void
}

function printItems(order: Order) {
  const orderItems = getItemCounts(order.items)
  return Object.keys(orderItems).map((itemName) => (
    <div>
      <span>
        <b>{orderItems[itemName]}</b> x {itemName}
      </span>
    </div>
  ))
}

export default function Column({ title, orders, moveCard }: ColumnProps) {
  const { sendRiderAway } = useRiders()
  return (
    <div className={s['pk-column']}>
      <div className={s['pk-column__title']}>
        <h3>{title}</h3>
      </div>
      {orders.map((order) => {
        return (
          <div className={s['pk-card']}>
            <div>
              <span>
                Orden: <b>{order.id}</b>
              </span>
            </div>
            <div className={s['pk-card-content']}>
              <FontAwesomeIcon
                onClick={() => moveCard(order, getPreviousState(order.state))}
                className="fa-2xl"
                icon={faCircleLeft}
              />

              <div className={s['pk-order-items']}>{printItems(order)}</div>

              <FontAwesomeIcon
                onClick={() => {
                  if (order.state !== 'READY') {
                    {
                      moveCard(order, getNextState(order.state))
                    }
                  } else if (
                    window.confirm(
                      '¿Está seguro de que desea marcar la orden como entregada al conductor?'
                    )
                  ) {
                    moveCard(order, getNextState(order.state))
                    sendRiderAway(order)
                  }
                }}
                className="fa-2xl"
                icon={faCircleRight}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
