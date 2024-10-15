import { quiz_potion_reward, quiz_food_reward, trader_shop, search_house, raiders_lair, game_over } from "./events.js"

export class Start {
    constructor() {
        this.name = 'Starting village'
        this.description = 'Quiet town, surrounded by dense forest'
        this.choices = [
            { text: 'Enter the forest', next_location: Forest },
            { text: 'Take a look at the market', next_location: Market },
        ]
    }
}

export class Forest {
    constructor() {
        this.name = 'Forest'
        this.description = 'Dangerous forest, full of mysteries and treasures'
        this.choices = [
            { text: 'Search for berries', event: quiz_food_reward },
            { text: 'Go deeper into the forest', next_location: DarkForest },
            { text: 'Go to village', next_location: Start },
        ]
    }
}

export class Market {
    constructor() {
        this.name = 'Market'
        this.description = 'Village square with vendors and puzzles'
        this.choices = [
            { text: 'Back to the village', next_location: Start },
            { text: 'Math quiz', event: quiz_potion_reward },
            { text: 'Trader shop', event: trader_shop },
        ]
    }
}

export class DarkForest {
    constructor() {
        this.name = 'Dark forest'
        this.description = 'Even more dangerous forest'
        this.choices = [
            { text: 'Back to the start of the forest', next_location: Forest },
            { text: 'Take a look at the small hut', event: search_house },
            { text: 'Rock puzzles', event: quiz_food_reward },
            { text: 'Attack a raiders\' lair', event: raiders_lair },
        ]
    }
}

export class Hell {
    constructor() {
        this.name = 'Purgatory'
        this.description = 'End of the game'
        this.choices = [
            { text: 'Enter the Heaven', event: game_over }
        ]
    }
}