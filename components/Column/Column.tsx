import { getItemCounts, getNextState, getPreviousState } from '@/lib/utils'
import s from './Column.module.scss'
import { Order } from '@/dtos/Order.dto'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleLeft,
  faCircleRight,
} from '@fortawesome/free-regular-svg-icons'
import { useRiders } from '@/contexts/Riders.context'
import { useOrders } from '@/contexts/Orders.context'

export type ColumnProps = {
  orders: Array<Order>
  title: string
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

export default function Column({ title, orders }: ColumnProps) {
  const { riders, sendRiderAway } = useRiders()
  const { changeOrderState } = useOrders()

  function handleForwardButtonClick(order: Order) {
    const requiredRider = riders.find((rider) => rider.orderWanted === order.id)

    if (order.state !== 'READY')
      changeOrderState(order, getNextState(order.state))
    else if (!requiredRider) alert('No ha llegado el conductor asignado')
    else if (window.confirm('¿Entregar pedido al rider?')) {
      changeOrderState(order, getNextState(order.state))
      sendRiderAway(order)
    }
  }

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
                onClick={() =>
                  changeOrderState(order, getPreviousState(order.state))
                }
                className="fa-2xl"
                icon={faCircleLeft}
              />

              <div className={s['pk-order-items']}>{printItems(order)}</div>

              <FontAwesomeIcon
                onClick={() => handleForwardButtonClick(order)}
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
