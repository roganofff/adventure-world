import { Potion, edible_classes, artifact_classes } from './items.js'
import { Start, Hell } from './locations.js'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export class Player {
    constructor(name, health = 100, inventory = [], location = new Start()) {
        this.name = name
        this.health = health
        this.base_max_hp = health
        this.max_hp = this.base_max_hp
        this.inventory = inventory
        this.capacity = 6
        this.location = location
        this.gold = 0
        this.damage = 25
        this.agility = 17
        this.dodge_chance = 9
    };

    stats() {
        console.log(`-- ${this.name}'s statistics:`)
        console.log(`-- Health: ${this.health}/${this.max_hp} HP\tGold: ${this.gold}G`)
        console.log(`-- Damage: ${this.damage}  Agility: ${this.agility}  Dodge rate: ${this.dodge_chance}%`)
        console.log(`-- Inventory:`)
        
        this.inventory.forEach((item, index) => { 
            console.log(`\t${index+1} ${item.str()}`)
        })
    }

    #apply_buffs(item) {
        const hp_coeff = item.hp_coeff
        const stat_buffs = Object.values(item.buffs)

        this.max_hp += Math.round(this.base_max_hp * hp_coeff)
        this.damage += stat_buffs[0]
        this.agility += stat_buffs[1]
        this.dodge_chance += stat_buffs[2]
    }

    cancel_buffs(item) {
        const hp_coeff = item.hp_coeff
        const stat_buffs = Object.values(item.buffs)

        this.max_hp -= Math.round(this.base_max_hp * hp_coeff)
        this.damage -= stat_buffs[0]
        this.agility -= stat_buffs[1]
        this.dodge_chance -= stat_buffs[2]
    }

    pick_up_item(item) {
        const items_amount = this.inventory.length
        if (items_amount == this.capacity) {
            console.log('{{ Inventory is full (6/6) }}')
        } else {
            console.log(`{{ Added to the inventory: '${item.name}' }}`)

            const is_artifact = (artifact) => item instanceof artifact
            if (artifact_classes.some(is_artifact)) {  
                this.#apply_buffs(item)
            }
            
            this.inventory.push(item)            
        }
    }

    take_damage(damage) {
        console.log(`{{ Taken ${damage} damage }}`)

        if (this.health > damage) {
            this.health -= damage
        } else {
            console.log('\t\t** YOU DIED! **')
            this.health = 0
            this.location = new Hell()
        }
    }

    #heal(source, health_points) {
        console.log(`{{ Restored ${health_points} HP }}`)

        this.health += health_points

        if (this.health >= this.max_hp && !(source instanceof Potion)) {
            this.health = this.max_hp
        }
    }

    async use(item_index) {
        const item = this.inventory[item_index-1]
        const is_healing = (healing_item) => item instanceof healing_item 

        if (edible_classes.some(is_healing)) {
            console.log(`{{ Used '${item.name}' }}`)
            await sleep(400)
            console.log('{{ Health is restoring... }}')

            const health_points = item.heal_value
            await sleep(2000)
            this.#heal(item, health_points)


            this.inventory.splice(item_index-1, 1)
        } else {
            console.log('{{ You cannot use this item }}')
        }
    }
}