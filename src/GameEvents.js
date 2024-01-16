import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { updateUserName, updateUserCredits, updateUserExperience, updateUserItems , updateUserInventory, updateUserLife } from './userReducer';


// TODO: add reward % per path - survival %
// TODO: add user info (credits, life, armor, items details and values)
// TODO: items details and values and shops
// TODO: implement roll feature
// item in store to buy: respanwer / teleport to a position - refer to map
// map

// FYI: type 0 = regular -- type 1 = inside an event -- type 2 = inside event + input needed

import './App.css';

const objectsPath = [
  {id:0, type: 99, name:"forest", description: "in an abandoned forest, here you are, alone, trying to find an escape after being chased by monsters. Your only option, keep moving forward", options:[{info:'continue', nextId:1}] },
  {id:1, type: 1, name:"forest", description: "there is a road, no turning point, only option is to go straigth.", options:[{info:'follow the path', nextId:101}] },
  {id:10, type: 1, name:"forest", description: "there is a road, no turning point, only option is to go straigth.", options:[{info:'follow the path'}] },
  {id:101, type: 1, name:"forest", description: "there is a bag on the floor", options:[{info:'take it', nextId:102}] },
  {id:102, type: 1, name:"forest", description: "You look at the bag, big enough to be an inventory, and find a corn!", options:[{info:'blow in it', nextId:103, inventory:50}] },
  {id:103, type: 2, name:"forest", description: "ah, it seems it calls a lutin! He greats you and asks for your name", options:[{info:'continue', placeholder:'enter my name', input:true, nameInput:"name",nextId:104}] },
  {id:104, type: 1, name:"forest", description: "He explains to you that in possession of the corn, when you blow in it, it calls him and allow you to trade with him", options:[{info:'ah cool!', nextId:105}] },
  {id:105, type: 1, name:"forest", description: "He explains you that each time you make an action, you gain some experience!", options:[{info:'noted!', nextId:106}] },
  {id:106, type: 1, name:"forest", description: "but that weird creatures are roaming in the forest...!", options:[{info:'ah...', nextId:107}] },
  {id:107, type: 1, name:"forest", description: "He salutes you and wish you good luck!", options:[{info:'thank him!', nextId:10}] },
  {id:2, type: 0, name:"lake Johishoy", description: "there is a left turn, it seems to go near a lake, do you want to go there?",  options:[{info:'left', nextId:201}, {info:'forward'}] },
  {id:201, type: 1, name:"lake Johishoy", description: "the lake is in front of you. A jacket is floating on the water.",  options:[{info:'approach', nextId:202, credits:20, items:1}, {info:'leave'}] },
  {id:202, type: 1, name:"lake Johishoy", description: "you see a gold watch in the pocket of the jacket and some credits!",  options:[{info:'continue your path'}] },
  {id:3, type: 0, name:"thief", description: "You're facing a thief", options:[{info:'fight', nextId:301, credits:-20, monster:1}, {info:'run and leave'} ] },
  {id:301, type: 1, name:"thief", description: "You are not strong enough to fight, you loose some credits if you had some but gain some xp!", options:[{info:'forward'}] },
  {id:4, type: 0, name:"myst", description: "a strange myst appears in front of you",  options:[{info:'go through it', nextId:401}, {info:'avoid it'}] },
  {id:401, type: 1, name:"myst", description: "you loose consciousness and wakes you up in a room",  options:[{info:'watch around', nextId:402, items:2}] },
  {id:402, type: 1, name:"myst", description: "A sword was visible on a table and you took it",  options:[{info:'forward', nextId:403}] },
  {id:403, type: 1, name:"myst", description: "there are two doors in front of you",  options:[{info:'take the left one', nextId:404}, {info:'take the right one', nextId:405, items:3}] },
  {id:404, type: 1, name:"myst", description: "you left the house", options:[{info:'forward'}] },
  {id:405, type: 1, name:"myst", description: "You see an armor on the floor and took it", options:[{info:'leave through the window'}] },
  {id:5, type: 0, name:"pool", description: "there is a swimming pool",  options:[{info:'take a swim', nextId:501, experience:20}, {info:'continue the road'}] },
  {id:501, type: 1, name:"pool", description: "You enjoy a quick swim, it's great! You gain some exp! but you stink way more though as the pool was really dirty", options:[{info:'go back on the road'}] },
  {id:6, type: 0, name:"pool", description: "A monster appears suddenly!",  options:[{info:'fight this ?&*$#&*', nextId:601, monster:3}, {info:'ruuuuuuun!'}] },
  {id:601, type: 1, name:"pool", description: "it hurts! but let's go on!",  options:[{info:'continue'}] },
]

const itemsList = [
  {id:1, name:"gold watch"},
  {id:2, name:"sword"},
  {id:3, name:"armor"}
]

const monsters = [
  {id:1, name:"Lutin", attack:0, credits:0, experience:10},
  {id:2, name:"Thief", attack:0, credits:-20, experience:10},
  {id:3, name:"Thief", attack:-50, credits:0, experience:20}
]

function generateRandom () {
  const objectsPathOnlyMain = objectsPath.filter(i => i.type === 0)
  const randomItem = objectsPathOnlyMain[Math.floor(Math.random()*objectsPathOnlyMain.length)];
  return randomItem
}

function checkIfMonster(user, pathLeg, dispatch) {
  if (pathLeg.hasOwnProperty("monster")) {
    const monster = monsters.filter(i => i.id === pathLeg.monster )[0]
    const newExp = user.experience+monster.experience
    if (newExp > 0) {
      dispatch(updateUserExperience(newExp))
    }
    const newCredits = user.credits+monster.credits
    if (newCredits > 0) {
      dispatch(updateUserCredits(newCredits))
    }
    const newLife = user.life+monster.attack
    if (newLife > 0) {
      dispatch(updateUserLife(newLife))
    }
  } 
}

function checkIfExperience(experience, pathLeg, dispatch) {
  if (pathLeg.hasOwnProperty("experience")) {
    dispatch(updateUserExperience(experience+pathLeg.experience))
  } else {
    dispatch(updateUserExperience(experience+1))

  }
}

function checkIfCredits(credits, pathLeg, dispatch) {
  if (pathLeg.hasOwnProperty("credits")) {
    const newCredits = credits+pathLeg.credits
    if (newCredits >= 0) {
      dispatch(updateUserCredits(newCredits))
    } else {
      dispatch(updateUserCredits(0))
    }
  } 
}


function checkIfInventory(inventory, pathLeg, dispatch) {
  if (pathLeg.hasOwnProperty("inventory")) {
    dispatch(updateUserInventory(inventory+pathLeg.inventory))
  } 
}

function checkIfItems(items, pathLeg, dispatch) {
  if (pathLeg.hasOwnProperty("items")) {
    // TODO: check if item already in inventory or allow several
    const itemToAdd = itemsList.filter(i => i.id === pathLeg.items)
    dispatch(updateUserItems(itemToAdd[0]))
  }
}

function checkIfInput(item, setInputNeded) {
  if (item.options[0].hasOwnProperty("input")) {
    setInputNeded(item.options[0].input)
  } else {
    setInputNeded(false)
  }
}

function checkIfSpecificEvent(event, pathLeg, setInputNeded) {
  if (pathLeg.hasOwnProperty("nextId")) {
    const itemToReceive = objectsPath.filter(i => i.id === pathLeg.nextId)
    checkIfInput(itemToReceive[0],setInputNeded)
    return itemToReceive[0]
  } else {
    let item = generateRandom()
    while (item === event ) {
      item = generateRandom()
    }
    checkIfInput(item, setInputNeded)
    return item
  }
}

function checkIfInputDataToSave(eData, dispatch) {
  if (eData) {
    if (eData.name === "name") {
      dispatch(updateUserName(eData.value))
    }
  }
}


function GameEvents({user}) {

  const dispatch = useDispatch()

  const [ event, setEvent ] = useState(objectsPath.filter(i => i.type === 99)[0])
  const [ inputNeded, setInputNeded ] = useState(false)


  const handleClick = (pathLeg,e) => {
    // console.log(itemReceived)
    // console.log(pathLeg)
    
    checkIfInventory(user.inventory, pathLeg, dispatch)
    checkIfInputDataToSave(e.target[0], dispatch)
    checkIfItems(user.items, pathLeg, dispatch)
    checkIfCredits(user.credits, pathLeg, dispatch)
    checkIfExperience(user.experience, pathLeg, dispatch)
    checkIfMonster(user, pathLeg, dispatch)

    const newItem = checkIfSpecificEvent(event, pathLeg, setInputNeded)
    setEvent(newItem)
  }

 
  return (
    <div className="App">
      <header className="App-header">
        <p className="" >{event.description}</p>
        <div className="Buttons-game" >
          {event.options.map((i, index) =>
          <div key={i.info} className="Buttons-individual-game">
            {inputNeded ?
            <form onSubmit={(e) => handleClick(i,e)}>
              <input type="text" id={i.nameInput}  name={i.nameInput} placeholder={i.placeholder} required />
              <button className="Button-game" >{i.info}</button>
            </form > :
            <button className="Button-game" onClick={(e) => handleClick(i,e)}>{i.info}</button> }
            </div> ) }
        </div>
      </header>
    </div>
  );
}

export default GameEvents;
