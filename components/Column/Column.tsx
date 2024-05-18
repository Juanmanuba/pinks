import { getItemCounts } from '@/lib/utils'
import s from './Column.module.scss'
import { Order } from '@/dtos/Order.dto'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleLeft,
  faCircleRight,
} from '@fortawesome/free-regular-svg-icons'

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

function getNextState(state: Order['state']) {
  switch (state) {
    case 'PENDING':
      return 'IN_PROGRESS'
    case 'IN_PROGRESS':
      return 'READY'
    case 'READY':
      return 'DELIVERED'
    default:
      return 'DELIVERED'
  }
}

function getPreviousState(state: Order['state']) {
  switch (state) {
    case 'IN_PROGRESS':
      return 'PENDING'
    case 'READY':
      return 'IN_PROGRESS'
    case 'DELIVERED':
      return 'READY'
    default:
      return 'PENDING'
  }
}

export default function Column({ title, orders, moveCard }: ColumnProps) {
  return (
    <div className={s['pk-column']}>
      <div className={s['pk-column__title']}>
        <h3>{title}</h3>
      </div>
      {orders.map((order) => {
        console.log(getItemCounts(order.items))
        return (
          <div className={s['pk-card']}>
            <div>
              <span>
                Orden: <b>{order.id}</b>
              </span>
            </div>
            <div className={s['pk-card-content']}>
              <div className={s['pk-order-items']}>{printItems(order)}</div>
              <div className={s['pk-moving-buttons']}>
                <button
                  onClick={() => moveCard(order, getNextState(order.state))}
                >
                  <FontAwesomeIcon className="fa-2xl" icon={faCircleRight} />
                </button>
                <button
                  onClick={() => moveCard(order, getPreviousState(order.state))}
                >
                  <FontAwesomeIcon className="fa-2xl" icon={faCircleLeft} />
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
