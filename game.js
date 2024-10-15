import readlineSync from 'readline-sync';

import { Player } from './player.js'

const get_player = () => {
    const username = readlineSync.question('May I have your name? ')
    console.log(`Greetings, ${username}!\n\n`)
    return new Player(username)
}

const get_user_choice = async (player) => {
    const choices_num = player.location.choices.length
    let reply = 0

    while (!Number.isInteger(reply) || reply > choices_num || reply < 1) {
        reply = readlineSync.question('Which way would you pick? ')
        if (reply.toLowerCase() == 'stats' || reply.toLowerCase() == 'inv') {
            player.stats()
            await use_item_prompt(player)
        }
        reply = Number(reply)
    }

    return reply
}

const use_item_prompt = async (player) => {
    if (player.inventory.length != 0) {
        const choice_item_index = Number(readlineSync.question('Choose active item to heal yourself: '))
        if (Number.isInteger(choice_item_index)) {
            await player.use(choice_item_index)
        }
    } else {
        console.log('\tYour inventory is empty')
    }
}

const delay_print = (text, delay) => {
    setTimeout(() => {
        console.log(text)
    }, delay)
}

const prologue = () => {
    delay_print('** You woke up in the house unknown to you...', 1000)
    delay_print('** The only thing you remember is your name.', 2500)
    delay_print('** You went outside and looked around:', 4200)
    delay_print('** a couple of shabby houses and the market visible in the distance.', 5400)
}

const change_player_location = (player, choice) => {
    const next_location = new choice.next_location()
    const loc_name = next_location.name
    const loc_description = next_location.description

    console.log(`** ${player.name} have entered the ${loc_name}. ${loc_description}. **`)
    player.location = next_location
}

const player = get_player()
prologue()

setTimeout(async () => {
    while (true) {
        console.log('You have a choice where to go:')
        player.location.choices.forEach((choice, index) => {
            console.log(`\t${index+1} ( ${choice['text']} )`)
        })

        const reply = await get_user_choice(player) - 1
        const choice = player.location.choices[reply]
        if (choice.event) {
            await choice.event(player)
        } else {
            change_player_location(player, choice)
        }
    }    
}, 5401)
