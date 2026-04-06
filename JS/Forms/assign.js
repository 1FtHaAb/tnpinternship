const form = document.getElementById("signup")

const container = document.createElement("div")
container.className = "flex justify-center items-center w-screen h-screen bg-violet-300"
form.appendChild(container)

const formCard = document.createElement("div")
formCard.className = "w-150 h-100 bg-blue-400 rounded-2xl"
container.appendChild(formCard)