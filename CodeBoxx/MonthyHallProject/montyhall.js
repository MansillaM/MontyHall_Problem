class Statistics {
    constructor() {
        this.gamesWithSameDoorWon = [];
        this.gamesWithSameDoorLost = [];
        this.gamesWithDoorChangeWon = [];
        this.gamesWithDoorChangeLost = [];
    }
    
    //Percentage of games wonw tih same door
     sameDoorWonPercent(){
        // console.log(this.gamesWithSameDoorWon.length)
        // console.log(this.gamesWithSameDoorLost.length)
        return Math.round((this.gamesWithSameDoorWon.length / (this.gamesWithSameDoorWon.length + this.gamesWithSameDoorLost.length)) * 100);
        
     }
        
     diffDoorWonPercent(){
        return Math.round((this.gamesWithDoorChangeWon.length / (this.gamesWithDoorChangeWon.length + this.gamesWithDoorChangeLost.length)) * 100);
     }
}

class Game {
    constructor(playerSwitches) {
        
        this.doors = []; // door array
        this.doorPicked; // door
        this.openedGoatDoor;// door
        this.doorNotPickedAndClosed; //door
        this.finalPick; // door
        this.won; // boolean
        this.initDoors();
        this.simulate(playerSwitches);
    }

    simulate(playerSwitches) {
        this.doorPicked = this.pickDoor();
        this.openedGoatDoor = this.doorGoatOpen();
        this.doorNotPickedAndClosed = this.closedDoorNotPicked();
        this.finalPlay(playerSwitches)
    }

    // Initializes doors
    initDoors() {
        this.doors.push(new Door(1, false));
        this.doors.push(new Door(2, false));
        this.doors.push(new Door(3, false));

        let doorTrue = Math.floor(Math.random() * this.doors.length)
        this.doors[doorTrue].isCar = true;
        
    }

    // Player pick a random door
    pickDoor() {
        let doorIndex = Math.floor(Math.random() * this.doors.length);
        return this.doors[doorIndex]
    }

    //Open a door with goat
    doorGoatOpen() {
        for(let i = 0; i < this.doors.length; ++i) {
            let currentDoor = this.doors[i];

            if(currentDoor.number != this.doorPicked.number && currentDoor.isCar == false) {
                currentDoor.opened = true;
                return currentDoor;
            }
        } 
    }

    //Get door that isn't picked and opened
    closedDoorNotPicked() {
        for(let i = 0; i < this.doors.length; ++i) {
            let currentDoor = this.doors[i];

            if(currentDoor.number != this.doorPicked.number && currentDoor.opened == false) {
                return currentDoor;
            }
        }               
    }

    // param playerSwitches: true if player switches, false otherwise
    finalPlay(playerSwitches) {
        this.finalPick = playerSwitches ? this.doorNotPickedAndClosed : this.doorPicked;
        this.won = this.finalPick.isCar ? true : false;
    }
}

class Door {
    constructor(number, isCar) {
        this.number = number;
        this.isCar = isCar;
        this.opened = false;
    }
}

let stats = new Statistics();

for (let i = 0; i < 1000; i++) {
    
    let gameSwitch = new Game(true);
    if(gameSwitch.won == true) {
        stats.gamesWithDoorChangeWon.push(gameSwitch);
    } else {
        stats.gamesWithDoorChangeLost.push(gameSwitch);
    }

    let gameKeep = new Game(false);
    if(gameKeep.won == true) {
        stats.gamesWithSameDoorWon.push(gameKeep);
    } else {
        stats.gamesWithSameDoorLost.push(gameKeep);
    }
}

//console.log(stats)
console.log(stats.sameDoorWonPercent() + "% of games were won when not switching door.")
console.log(stats.diffDoorWonPercent() + "% of games were won when switching door.")
// console.log(stats.gamesWithDoorChangeWon)
// console.log(stats.gamesWithDoorChangeLost)
// console.log(stats.gamesWithSameDoorWon)
// console.log(stats.gamesWithSameDoorLost)