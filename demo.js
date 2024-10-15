import { Player } from './player.js'
import { Food, Potion, Weapon } from './items.js'
import { Trader } from './npc.js'
import { Start, Market, Forest, DarkForest } from './locations.js'


let yegor = new Player('Егор')

let apple = new Food('Яблоко', 'Зелёное и кислящее', 12, 5)
let health_potion = new Potion('Зелье здоровья', 'Сосуд с ярко-красной жидкостью', 50, 32)
let sword = new Weapon('Меч тысячи Истин', 'Крутямбовый такой меч прям', 0.1, 5, 2, 66)

yegor.stats()

yegor.take_damage(10)

yegor.pick_up_item(apple)
yegor.pick_up_item(health_potion)
yegor.pick_up_item(sword)

yegor.stats()

const trader = new Trader('Петя')

trader.sell(yegor, 3)

yegor.use(2)
new Promise(() => {setTimeout(() => {yegor.stats()}, 2100)})
