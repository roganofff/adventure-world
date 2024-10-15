import { artifact_classes } from "./items.js"

export class Trader {
    constructor(name) {
        this.name = name
    }

    sell(player, item_index) {
        if (player.inventory.length >= item_index) {            
            let item = player.inventory[item_index-1]  // -1 т.к. игрок выбирает номер из списка, а не индекс
            player.gold += item.price
            player.inventory.splice(item_index-1, 1)

            console.log(`{{ Item '${item.name}' sold, +${item.price}G }}`)

            const is_artifact = (artifact) => item instanceof artifact
            if (artifact_classes.some(is_artifact)) {
                player.cancel_buffs(item)
            }
        } else {
            console.log('!{ There is no such item in the inventory }!')
        }
    }
}

export class BaseEnemy {
    constructor(health = 80, damage = 15) {
        this.health = health
        this.damage = damage
    }
}