const getPostsEl = document.getElementById('get-posts-btn');
const outputEl = document.getElementById('output');
const formEl = document.getElementById('form-submit');

// Get Posts
async function addPostsHandler() {
    try {
        const res = await fetch('http://localhost:8080/api/posts');
        if(!res.ok) {
            throw new Error('Failed to fetch posts');
        }
    
        const posts = await res.json();
        console.log(posts);
        outputEl.innerHTML = '';
        posts.forEach((post) =>  {
            const postEl = document.createElement('div');
            postEl.textContent = post.title;
            outputEl.appendChild(postEl);
        });
    } catch (error) {
        console.log(error, "error...");
    }
}

// Add Post
async function submitBtnHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    // console.log(formData.get('title'));
    const title = formData.get('title');

    try {
        const res = await fetch('http://localhost:8080/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        });
        if(!res.ok) {
            throw new Error('Error in adding post');
        }
    
        const posts = await res.json();
        // console.log(posts);
        addPostsHandler();   
    } catch (error) {
        console.log(error, "error");
    }
}

getPostsEl.addEventListener('click', addPostsHandler);
formEl.addEventListener('submit', submitBtnHandler);