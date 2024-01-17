import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { updateUserName, updateUserCredits, updateUserExperience, updateUserItems , updateUserInventory, updateUserLife } from './userReducer';


// TODO: add reward % per path - survival % --  - between 0-10% chance
// TODO: add user info (credits, life, armor, items details and values)
// TODO: items details and values and shops
// TODO: implement roll feature
// TODO: life = 0 --> start again menu
// TODO: item in store to buy: respanwer / teleport to a position - refer to map
// TODO: map
// TODO: message based on what happened, if won or lose points for instance
// TODO: xp + level

// FYI:type 0 =  start of the game -- type 1 = regular, nothing spe ---  type 2 = start of an event --- type 3 = inside an event

import './App.css';

const objectsPath = [
  {id:0, type: 0, name:"forest", description: "in an abandoned forest, here you are, alone, trying to find an escape after being chased by monsters. Your only option, keep moving forward", options:[{info:'continue', nextId:1, image:"user"}] },
  {id:1, type: 3, name:"forest", description: "there is a road, no turning point, only option is to go straigth.", options:[{info:'follow the path', nextId:3, image:"path_forest"}] },
  {id:2, type: 1, name:"forest", description: "You're back on the road, no turning point, only option is to go straigth.", options:[{info:'follow the path', image:"path_forest"}] },
  {id:25, type: 1, name:"forest", description: "Still that road...", options:[{info:'follow the path', image:"path_forest"}] },
  {id:26, type: 1, name:"forest", description: "Endlessness path", options:[{info:'follow the path', image:"path_forest"}] },
  {id:3, type: 3, name:"forest", description: "there is a bag on the floor", options:[{info:'take it', nextId:4, image:"bag_floor"}] },
  {id:4, type: 3, name:"forest", description: "You look at the bag, big enough to be an inventory, and find a horn!", options:[{info:'blow in it', nextId:5, inventory:50, item:0, image:"horn_bag"}] },
  {id:5, type: 3, name:"forest", description: "ah, it seems it calls a goblin! He greats you and asks for your name", options:[{info:'continue', placeholder:'enter my name', input:true, nameInput:"name",nextId:6, image:"goblin"}] },
  {id:6, type: 3, name:"forest", description: "He explains to you that in possession of the horn, when you blow in it, it calls him and allow you to trade with him", options:[{info:'ah cool!', nextId:7, image:"shop_items"}] },
  {id:7, type: 3, name:"forest", description: "He explains you that each time you make an action, you gain some experience!", options:[{info:'noted!', nextId:8, image:"xp"}] },
  {id:8, type: 3, name:"forest", description: "but that weird creatures are roaming in the forest...!", options:[{info:'ah...', nextId:9, image:"creatures"}] },
  {id:9, type: 3, name:"forest", description: "ah weird, its appearance changed... He salutes you and wish you good luck!", options:[{info:'thank him!', nextId:2, image:"goblin_bye_luck"}] },
  {id:10, type: 2, name:"lake Johishoy", description: "there is a left turn, it seems to go near a lake, do you want to go there?",  options:[{info:'go near the lake', nextId:11, image:"lake"}, {info:'forward', image:"path_forest"}] },
  {id:11, type: 3, name:"lake Johishoy", description: "the lake is in front of you, with an abandoned jacket.",  options:[{info:'approach', nextId:12, credits:20, items:1, image:"jacket"}, {info:'leave', image:"leave"}] },
  {id:12, type: 3, name:"lake Johishoy", description: "you see a gold watch in the pocket of the jacket and some credits!",  options:[{info:'take it and continue', image:"gold_watch"}] },
  {id:13, type: 2, name:"thief", description: "You're facing a thief", options:[{info:'fight', nextId:14, credits:-20, creature:2}, {info:'run and leave'} ] },
  {id:14, type: 3, name:"thief", description: "You are not strong enough to fight, you loose some credits if you had some but gain some xp!", options:[{info:'forward'}] },
  {id:15, type: 2, name:"myst", description: "a strange myst appears in front of you",  options:[{info:'go through it', nextId:16}, {info:'avoid it'}] },
  {id:16, type: 3, name:"myst", description: "you loose consciousness and wakes you up in a room",  options:[{info:'watch around', nextId:17, items:2}] },
  {id:17, type: 3, name:"myst", description: "A sword was visible on a table and you took it",  options:[{info:'forward', nextId:18}] },
  {id:18, type: 3, name:"myst", description: "there are two doors in front of you",  options:[{info:'take the left one', nextId:19}, {info:'take the right one', nextId:20, items:3}] },
  {id:19, type: 3, name:"myst", description: "you left the house", options:[{info:'forward'}] },
  {id:20, type: 3, name:"myst", description: "You see an armor on the floor and took it", options:[{info:'leave through the window'}] },
  {id:21, type: 2, name:"pool", description: "there is a swimming pool",  options:[{info:'take a swim', nextId:22, experience:20}, {info:'continue the road'}] },
  {id:22, type: 3, name:"pool", description: "You enjoy a quick swim, it's great! You gain some exp! but you stink way more though as the pool was really dirty", options:[{info:'go back on the road'}] },
  {id:23, type: 2, name:"pool", description: "A monster appears suddenly!",  options:[{info:'fight this ?&*$#&*', nextId:24, creature:3, image:"monster"}, {info:'ruuuuuuun!', image:"run"}] },
  {id:24, type: 3, name:"pool", description: "it hurts! but let's go on!",  options:[{info:'continue'}] },
]

const itemsList = [
  {id:0, name:"Horn", type:"item", attack:0, defense: 0, credits:0, life:0},
  {id:1, name:"gold watch", type:"item", attack:0, defense: 0, credits:20, life:0},
  {id:2, name:"small broken sword", type:"weapon", attack:10, defense: 0, credits:2, life:0},
  {id:3, name:"old armor", type:"armor", attack:0, defense: 5, credits:2, life:0},
  {id:4, name:"small life potion", type:"potion", attack:0, defense: 0, credits:5, life:20},
]

const creatures = [
  {id:1, name:"Lutin", attack:0, credits:0, experience:10},
  {id:2, name:"Thief", attack:0, credits:-20, experience:10},
  {id:3, name:"Monster", attack:-50, credits:0, experience:20}
]


function generateRandom () {
  const randomValue = Math.random();
  const randomNumber = randomValue < 0.80 ? 1 : 2;
  const objectsPathOnlyMain = objectsPath.filter(i => i.type === randomNumber)
  const randomItem = objectsPathOnlyMain[Math.floor(Math.random()*objectsPathOnlyMain.length)];
  return randomItem
}

function checkIfCreature(user, pathLeg, dispatch) {
  if (pathLeg.hasOwnProperty("creature")) {
    const creature = creatures.filter(i => i.id === pathLeg.creature )[0]
    const newExp = user.experience+creature.experience
    if (newExp > 0) {
      dispatch(updateUserExperience(newExp))
    } else {
      dispatch(updateUserExperience(0))
    }
    const newCredits = user.credits+creature.credits
    if (newCredits > 0) {
      dispatch(updateUserCredits(newCredits))
    } else {
      dispatch(updateUserCredits(0))
    }
    const newLife = user.life+creature.attack
    if (newLife > 0) {
      dispatch(updateUserLife(newLife))
    } else {
      dispatch(updateUserLife(0))
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

function checkIfImages(setImageToShow, newItem) {
  const imagesItem = []
  newItem.options.forEach(itemOption => {
    if (itemOption.hasOwnProperty("image")) {
      imagesItem.push(itemOption.image)
    }
  });
  setImageToShow(imagesItem)
}

function checkIfSpecificEvent(event, pathLeg, setInputNeded, setImageToShow) {
  if (pathLeg.hasOwnProperty("nextId")) {
    const itemToReceive = objectsPath.filter(i => i.id === pathLeg.nextId)
    checkIfInput(itemToReceive[0],setInputNeded)
    checkIfImages(setImageToShow, itemToReceive[0])
    return itemToReceive[0]
  } else {
    let item = generateRandom()
    while (item === event ) {
      item = generateRandom()
    }
    checkIfInput(item, setInputNeded)
    checkIfImages(setImageToShow, item)
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

  const [ event, setEvent ] = useState(objectsPath.filter(i => i.type === 0)[0])
  const [ inputNeded, setInputNeded ] = useState(false)
  const [ imageToShow, setImageToShow ] = useState([objectsPath.filter(i => i.type === 0)[0].options[0].image])


  const handleClick = (pathLeg,e) => {
    // console.log(itemReceived)
    // console.log(pathLeg)
    
    checkIfInventory(user.inventory, pathLeg, dispatch)
    checkIfInputDataToSave(e.target[0], dispatch)
    checkIfItems(user.items, pathLeg, dispatch)
    checkIfCredits(user.credits, pathLeg, dispatch)
    checkIfExperience(user.experience, pathLeg, dispatch)
    checkIfCreature(user, pathLeg, dispatch)

    const newItem = checkIfSpecificEvent(event, pathLeg, setInputNeded, setImageToShow)
    setEvent(newItem)
  }


  return (
    <div className="App">
      <header className="App-header">

        <div key={event.id} className="Event-description fade-in" >
          <p>{event.description}</p>
        </div>

        <div className="Buttons-game" >
          
            {event.options.map((i, index) =>

              <div key={i.info} className=''>

                {imageToShow.length > 0 && <img src={require(`./images/${imageToShow[index]}.jpg`)} alt={imageToShow[index]} className="Image-options fade-inImage" />} 

                  <div className="Buttons-individual-game ">

                    {inputNeded ?
                    <form onSubmit={(e) => handleClick(i,e)} className='Form-Game-div fade-inButtons'>
                      <input type="text" id={i.nameInput}  name={i.nameInput} placeholder={i.placeholder} required />
                      <button className="Button-game" >{i.info}</button>
                    </form > :
                    <button className="Button-game fade-inButtons" onClick={(e) => handleClick(i,e)}>{i.info}</button> }

                  </div> 

              </div>
              )}
              
        </div>

      </header>
    </div>
  );
}

export default GameEvents;
