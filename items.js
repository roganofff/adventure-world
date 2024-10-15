export class Food {
    constructor(name, description, heal_value, price) {
        this.name = name
        this.description = description
        this.heal_value = heal_value
        this.price = price
    }

    str() {
        return `[ ${this.name}. ${this.description}. Price: ${this.price}G ]`
    }
}

export class Potion {
    constructor(name, description, heal_value, price) {
        this.name = name
        this.description = description
        this.heal_value = heal_value
        this.price = price
    }
    
    str() {
        return `[ ${this.name}. ${this.description}. Price: ${this.price}G ]`
    }
}

export class Artifact {
    constructor(name, description, hp_coeff = 1, agil_buff = 0, dodge_buff = 0, price) {
        this.name = name
        this.description = description
        this.hp_coeff = hp_coeff,  // к здоворью прибавится процент от максимального здоровья
        this.buffs = {
            damage: 0,
            agility: agil_buff,
            dodge_chance: dodge_buff,
        }
        this. price = price
    }
        
    str() {
        return `  ${this.name}. ${this.description}. Price: ${this.price}G`
    }
}

export class Weapon {
    constructor(name, description, hp_coeff = 1, dmg_buff = 0, agil_buff = 0, price) {
        this.name = name
        this.description = description
        this.hp_coeff = hp_coeff
        this.buffs = {
            damage: dmg_buff,
            agility: agil_buff,
            dodge_chance: 0
        }
        this.price = price
    }
        
    str() {
        return `  ${this.name}. ${this.description}. Price: ${this.price}G`
    }
}


export const edible_classes = [Food, Potion]
export const artifact_classes = [Artifact, Weapon]
