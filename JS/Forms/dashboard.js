const content = document.getElementById("content")
const status = document.getElementById("status")

const usersBtn = document.getElementById("loadUsers")
const postsBtn = document.getElementById("loadPosts")
const logoutBtn = document.getElementById("logout")

function setLoading(message) {
    status.textContent = message
    content.innerHTML = ""
}

function fetchData(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error("Network error")
            }
            const data = await response.json()
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

async function loadUsers() {
    try {
        setLoading("Loading Users...")
        const users = await fetchData("https://jsonplaceholder.typicode.com/users")
        status.textContent = "Users Loaded"
        renderUsers(users)
    } catch (err) {
        status.textContent = "Error Loading Data"
    }
}

async function loadPosts() {
    try {
        setLoading("Loading Posts...")
        const posts = await fetchData("https://jsonplaceholder.typicode.com/posts")
        status.textContent = "Posts Loaded"
        renderPosts(posts.slice(0, 9))
    } catch (err) {
        status.textContent = "Error Loading Data"
    }
}

function renderUsers(users) {
    content.innerHTML = ""
    users.forEach(user => {
        const card = document.createElement("div")
        card.className = "bg-white p-4 rounded shadow"
        card.innerHTML = `
        <h3 class="font-bold">${user.name}</h3>
        <p class="text-sm text-gray-500">${user.email}</p>
        <p class="text-sm">${user.company.name}</p>
        `
        content.appendChild(card)
    })
}

function renderPosts(posts) {
    content.innerHTML = ""
    posts.forEach(post => {
        const card = document.createElement("div")
        card.className = "bg-white p-4 rounded shadow"
        card.innerHTML = `
        <h3 class="font-bold mb-2">${post.title}</h3>
        <p class="text-sm text-gray-600">${post.body}</p>
        `
        content.appendChild(card)
    })
}

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser")
    window.location.href = "login.html"
})

usersBtn.addEventListener("click", loadUsers)
postsBtn.addEventListener("click", loadPosts)