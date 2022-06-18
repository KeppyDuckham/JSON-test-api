let postWrapper = document.querySelector('#post-holder');
let postForm = document.querySelector('#post-form')
let title = document.querySelector('#title')
let body = document.querySelector('#body')


// const url = 'https://jsonplaceholder.typicode.com/posts'

let postBox = [];



function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => {
            console.log(postBox)
            postBox = data
            renderUI(postBox)
        })
}

getPosts();

postForm.addEventListener('submit', createPost)

// Method: POST
function createPost(e) {
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title.value,
            body: body.value,
            userId: 2
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            postBox.unshift(data);
            console.log(postBox)
            let postHolder = '';
            postBox.forEach(post => {
                postHolder += `
                < div class = "col-lg-6 col-md-6mb-3" >
                    <div class="card h-100">
                        <div class="bg-light card-body">
                            <p>${post.id}</p>
                            <h6 class="post-title">${post.title}</h6>
                            <p class="post-body">${post.body}</p>
                            <a href="#" class="card-link bi bi-arrows-angle-expand" onclick="openSingle(${post.id})"></a>
                            <a href="#" class="card-link bi bi-pencil-square" onclick="updatePost(${post.id})"></a>
                            <a href="#" class="card-link bi bi-trash3" onclick="deletePost(${post.id})"></a>
                        </div>
                    </div>
                </>
            `
            });

            postWrapper.innerHTML = postHolder;
        })
}

function updatePost(id) {
    console.log(id)

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: title.value,
            body: body.value,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {

            console.log(data)
            let postTitles = document.querySelectorAll('.post-title')
            let postBodies = document.querySelectorAll('.post-body')
            console.log(postTitles)
            postTitles.forEach((postTitle, index) => {
                if (index + 1 === id) {
                    if (data.title !== "") {
                        postTitle.innerHTML = data.title
                    }
                }

            })

            postBodies.forEach((postBody, index) => {
                if (index + 1 === id) {
                    if (data.body !== "") {
                        postBody.innerHTML = data.body
                    }
                }
            })
        });
}

function openSingle(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            localStorage.setItem('viewedPost', JSON.stringify(data))
            window.location.href = 'single.html'
            // console.log(data)
        });
}

function deletePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            postBox = postBox.filter(post => post.id !== id)
            console.log(postBox)
            renderUI(postBox)  
        })

}

function renderUI (arr) {
    let postHolder = '';
            arr.forEach(post => {
                postHolder += `
                    <div class="col-lg-6 col-md-6 mb-3">
                        <div class="card h-100">
                            <div class="bg-light card-body">
                                <p>${post.id}</p>
                                <h6 class="post-title">${post.title}</h6>
                                <p class="post-body">${post.body}</p>
                                <a href="#" class="card-link bi bi-arrows-angle-expand" onclick="openSingle(${post.id})"></a>
                                <a href="#" class="card-link bi bi-pencil-square" onclick="updatePost(${post.id})"></a>
                                <a href="#" class="card-link bi bi-trash3" onclick="deletePost(${post.id})"></a>
                            </div>
                        </div>
                    </div>
                `
            });
            postWrapper.innerHTML = postHolder;
}