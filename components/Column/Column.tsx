import { getItemCounts } from '@/lib/utils'
import s from './Column.module.scss'
import { Order } from '@/dtos/Order.dto'

export type ColumnProps = {
  orders: Array<Order>
  title: string
  onClick?: (order: Order) => void
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

export default function Column(props: ColumnProps) {
  return (
    <div className={s['pk-column']}>
      <div className={s['pk-column__title']}>
        <h3>{props.title}</h3>
      </div>
      {props.orders.map((order) => {
        console.log(getItemCounts(order.items))
        return (
          <div
            onClick={() => props.onClick && props.onClick(order)}
            className={s['pk-card']}
          >
            <div>
              <span>
                Orden: <b>{order.id}</b>
              </span>
            </div>
            <div>{printItems(order)}</div>
          </div>
        )
      })}
    </div>
  )
}
