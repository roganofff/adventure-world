import readlineSync from 'readline-sync';

import { Potion, Food, Weapon, Artifact } from './items.js'
import { Trader, BaseEnemy } from './npc.js';
import { Hell } from './locations.js';


export const quiz_potion_reward = (player) => {
    const health_potion = new Potion('Healing Salve', 'A magical salve that can quickly mend even the deepest of wounds', 50, 50)
    
    math_quiz(player, health_potion)
}

export const quiz_food_reward = (player) => {
    const tango = new Food('Tango', 'Forage to survive on the battlifield', 15, 20)
    
    math_quiz(player, tango)
}

const math_quiz = (player, reward) => {
    console.log('<< You got to the math quiz! >>')
    console.log('<< Your goal is to solve 3 equations >>')

    // 1st problem
    const first = Math.floor(Math.random() * 1000 + 1)
    const second = Math.floor(Math.random() * 1000 + 1)
    const correct_answer = first + second
    console.log(`<< 1) ${first} + ${second} = x >>`)
    const user_answer = readlineSync.question('<< What is the answer to the given problem? >>\nx = ')
    if (correct_answer == user_answer) {
        console.log('<< +1 point! >>')
    } else {
        console.log(`<< Wrong! Correct answer is ${correct_answer} >>`)
        return
    }

    // 2nd problem
    const divisble = Math.floor(Math.random() * 240 + 1)
    const quotient = Math.floor(Math.random() * 120 + 1)
    const gross_answer = divisble / quotient
    const divisor = +(Math.round(gross_answer + "e+2")  + "e-2")
    console.log(`<< 2) ${divisble} / x = ${quotient} >>`)
    const second_answer = readlineSync.question('<< What is the divisor for the equation? (Round to two decimals) >>\nx = ')
    if (divisor == second_answer) {
        console.log('<< +1 point! >>')
    } else {
        console.log(`<< Wrong! Correct answer is ${divisor} >>`)
        return
    }

    // 3rd problem
    const first_multiplier = Math.floor(Math.random() * 500)
    const second_multiplier = Math.floor(Math.random() * 500)
    const product = first_multiplier * second_multiplier
    console.log(`<< 3) ${first_multiplier} * ${second_multiplier} = x >>`)
    const third_answer = readlineSync.question('<< What is the product of two numbers? >>\nx = ')
    if (product == third_answer) {
        console.log('<< +1 point! >>')
    } else {
        console.log(`<< Wrong! Correct answer is ${divisor} >>`)
        return
    }

    console.log('<< All problems solved! You\'ve got a gift. >>')

    player.pick_up_item(reward)
    return
}

const trader = new Trader('Petya')
const sword = new Weapon('The Sword of a Thousand Truths', 'From South Park', 0.5, 30, 7, 124000)
const dodge_ring = new Artifact('King\'s Ring', 'Gives you dodge rate', 0, 21, 120)

export const trader_shop = (player) => {
    if (player.inventory.length == 0) {
        console.log('<< You have nothing to offer to me, get out! >>')

        return
    }

    if (player.inventory.includes(sword) && player.inventory.includes(dodge_ring)){
        console.log(`<< You have collected all the legendary artifacts! >>`)
        console.log(`<< Congratulations, ${player.name}! >>`)
        console.log('\t\t** YOU WIN **')
        player.location = new Hell()

        return
    }

    console.log(`<< Welcome to ${trader.name}'s shop! >>`)

    console.log('<< Your inventory: >>')
    player.inventory.forEach((item, index) => {
        console.log(`\t${index+1} ${item.str()}`)
    });

    const to_sell_index = readlineSync.question('Which item do you want to sell? ')

    trader.sell(player, to_sell_index)
    player.stats()    
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const base_enemy = new BaseEnemy()
const raiders = new BaseEnemy(170, 33)

export const search_house = async (player) => {
    if (player.inventory.includes(sword)) {
        console.log('<< Only dead bandit rots in this quiet hut... >>')
        return
    }

    console.log('<< You sneak into the hut and see a robber taking a nap. >>')
    console.log('<< Unfortunately you stepped on the board and broke it and a bandit woke up. >>')
    await base_figth(player, base_enemy, sword)

}

export const raiders_lair = async (player) => {
    if (player.inventory.includes(dodge_ring)) {
        console.log('<< Nothing left here... >>')
        return
    }

    console.log('<< You stumbled upon raiders lair and now have to fight. >>')
    await base_figth(player, raiders, dodge_ring)
    await sleep(1000)
}

const base_figth = async (player, enemy, reward) => {
    while (true) {
        await sleep(1000)
        console.log('<< You try to hit the bandit.. >>')
        await sleep(1500)
        console.log(`<< .. and deal ${player.damage} damage >>`)
        enemy.health -= player.damage
        if (enemy.health < 1) { break }

        await sleep(2000)
        console.log('<< Enemy hits you back but you try to dodge it.. >>')
        await sleep(2000)
        if ((Math.random() * 100 + 1) <= player.dodge_chance) {
            console.log('<< .. and enemy misses >>')
        } else {
            console.log(`<< And an enemy stabed you! >>`)
            player.take_damage(enemy.damage)    
        }
        if (player.health < 1) { return }
    }

    await sleep(1000)
    console.log(`<< You have competed a bandit and earned a reward! >>`)
    player.pick_up_item(reward)
}

export const game_over = async (player) => {
    await sleep(1500)
    console.log('** Game is over! ** ')
    await sleep(1500)
    console.log('** Your statistics: **')
    player.stats()
    while (true) {}
}