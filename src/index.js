let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//fetches toy api
fetch('http://localhost:3000/toys')
.then((res) => res.json())
.then((json)=> json.forEach(toy =>createAToy(toy)))


function createAToy(toy){
  console.log(toy)
    const creatediv = document.createElement('div')
    const selectToyCollection = document.querySelector('#toy-collection')
    creatediv.className = 'card'
    creatediv.innerHTML = `
      <h2>${toy.name}</h2>
      <img src= ${toy.image} class='toy-avatar'>
      <p>Likes: ${toy.likes}</p>
      <button class='like-btn' id='${toy.id}'> Like ❤️ </button>
    `
    //Add likes
     selectToyCollection.appendChild(creatediv)

     document.querySelector(`.like-btn`).addEventListener('click',()=>{
      toy.likes++
      creatediv.querySelector('p').textContent =toy.likes
      updateLikes(toy.id,toy.likes)
    })
}

document.querySelector('.add-toy-form').addEventListener('submit',handleNewToy)
//Add New Toy
function handleNewToy(e){
  e.preventDefault
  let toyObj={
    name: e.target.name.value,
    image: e.target.name.value
  }
  console.log(toyObj)
}

()=> console.log.querySelector('.add-toy-form')

//like button
function updateLikes(toyId,likes){
fetch(`http://localhost:3000/toys/${toyId}`,{
  method: 'PATCH',
  headers:{
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  body: JSON.stringify({
    'likes': likes
  })
})
.then((res)=>res.json())
.then((data)=> console.log(data))
}



// add a new toy
function postNewToy(name, image){
  fetch('http://localhost:3000/toys'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      'name': name,
      'image': image,
      'likes': 0
    })
  }
  .then (res => res.json())
}
