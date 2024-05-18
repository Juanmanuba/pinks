import { Item } from '@/dtos/Item.dto'

export function getRandomId() {
  const length = 5
  let result = ''
  const characters = '0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export function getRandomInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRandomItem() {
  const items = ['Bebida', 'Hamburguesa', 'Hamburguesa secreta', 'Patatas']
  const randomIndex = getRandomInterval(0, items.length - 1)
  return items[randomIndex]
}

export function getRandomItems() {
  return Array.from({ length: getRandomInterval(1, 5) }).map(() => ({
    name: getRandomItem(),
  }))
}

export function getItemCounts(items: Item[]) {
  const itemCounts: Record<string, number> = {}
  for (const item of items) {
    const itemName = item.name
    if (itemCounts[itemName]) {
      itemCounts[itemName]++
    } else {
      itemCounts[itemName] = 1
    }
  }
  return itemCounts
}
