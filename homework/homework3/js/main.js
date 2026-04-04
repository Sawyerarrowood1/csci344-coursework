const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "sarrowo2";
let password = "password";

async function initializeScreen() {
  token = await getAccessToken(rootURL, username, password);
  showNav();
  await showProfile();
  await showSuggestions();
  showStories();
  showPosts();
}

async function fetchData(endpoint) {
  const response = await fetch(`${rootURL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return await response.json();
}

async function showProfile() {
  const data = await fetchData("/api/profile");
  document.querySelector("#sidebar").insertAdjacentHTML(
    "afterbegin",
    `
    <header class="flex gap-4 items-center">
      <img src="${data.image_url}" class="rounded-full w-16 h-16 object-cover" alt="${data.username}'s profile picture">
      <h2 class="font-Comfortaa font-bold text-2xl">${data.username}</h2>
    </header>
    <div class="mt-4">
      <p class="text-base text-gray-400 font-bold mb-4">Suggestions for you</p>
      <div id="suggestions"></div>
    </div>
    `
  );
}

async function showSuggestions() {
  const container = document.querySelector("#suggestions");
  if (!container) return;

  const data = await fetchData("/api/suggestions");
  data.forEach((user) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
      <section class="flex justify-between items-center mb-4 gap-2">
        <img src="${user.image_url}" class="rounded-full w-10 h-10 object-cover" alt="${user.username}'s profile picture">
        <div class="w-[180px]">
          <p class="font-bold text-sm">${user.username}</p>
          <p class="text-gray-500 text-xs">suggested for you</p>
        </div>
        <button class="text-blue-500 text-sm py-2">follow</button>
      </section>
      `
    );
  });
}

async function showStories() {
  const data = await fetchData("/api/stories");
  const container = document.querySelector("#stories");
  data.forEach((story) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="flex flex-col justify-center items-center">
        <img src="${story.user.image_url}" class="w-12 h-12 object-cover rounded-full border-4 border-gray-300" alt="${story.user.username}'s story">
        <p class="text-xs text-gray-500">${story.user.username}</p>
      </div>
      `
    );
  });
}

async function showPosts() {
  const posts = await fetchData("/api/posts/");
  const container = document.querySelector("#postsContainer");
  container.innerHTML = "";
  posts.slice(0, 10).forEach((post) => {
    container.insertAdjacentHTML("beforeend", postToHTML(post));
  });
}

function postToHTML(post) {
  return `
  <section class="bg-white border mb-10">
    <div class="p-4 flex justify-between">
      <h3 class="text-lg font-Comfortaa font-bold">${post.user.username}</h3>
      <button><i class="fas fa-ellipsis-h"></i></button>
    </div>

    <img src="${post.image_url}" class="w-full bg-cover" alt="Post by ${post.user.username}">

    <div class="p-4">
      <div class="flex justify-between text-2xl mb-3">
        <div class="flex gap-3">
          ${getLikeButton(post)}
          <button aria-label="Comment"><i class="far fa-comment"></i></button>
          <button aria-label="Share"><i class="far fa-paper-plane"></i></button>
        </div>
        <div>
          ${getBookmarkButton(post)}
        </div>
      </div>

      <p class="font-bold mb-3">${post.likes.length} likes</p>

      <div class="text-sm mb-3">
        <p>
          <strong>${post.user.username}</strong>
          ${post.caption || ""}
        </p>
      </div>

      ${getCommentsHTML(post)}
    </div>

    <div class="flex justify-between items-center p-3 border-t">
      <div class="flex items-center gap-3 w-full">
        <i class="far fa-smile text-lg"></i>
        <input 
          id="comment-${post.id}"
          type="text" 
          class="w-full focus:outline-none" 
          placeholder="Add a comment..."
          onkeypress="if(event.key === 'Enter'){ handleComment(${post.id}) }"
        >
      </div>
      <button 
        class="text-blue-500 py-2"
        onclick="handleComment(${post.id})"
      >
        Post
      </button>
    </div>
  </section>
  `;
}

function getCommentsHTML(post) {
  if (post.comments.length > 1) {
    const last = post.comments[post.comments.length - 1];
    return `
      <button class="text-sm mb-3 text-blue-500">
        View all ${post.comments.length} comments
      </button>
      <p class="text-sm">
        <strong>${last.user.username}</strong> ${last.text}
      </p>
    `;
  }

  if (post.comments.length === 1) {
    const c = post.comments[0];
    return `
      <p class="text-sm">
        <strong>${c.user.username}</strong> ${c.text}
      </p>
    `;
  }

  return "";
}

function getLikeButton(post) {
  if (post.current_user_like_id) {
    return `
      <button onclick="unlikePost(${post.current_user_like_id})" aria-label="Unlike this post">
        <i class="fas fa-heart text-red-500"></i>
      </button>
    `;
  }
  return `
    <button onclick="likePost(${post.id})" aria-label="Like this post">
      <i class="far fa-heart"></i>
    </button>
  `;
}

function getBookmarkButton(post) {
  if (post.current_user_bookmark_id) {
    return `
      <button onclick="unBookmark(${post.current_user_bookmark_id})" aria-label="Remove bookmark">
        <i class="fas fa-bookmark"></i>
      </button>
    `;
  }
  return `
    <button onclick="bookmark(${post.id})" aria-label="Bookmark this post">
      <i class="far fa-bookmark"></i>
    </button>
  `;
}

async function likePost(postID) {
  await fetch(`${rootURL}/api/likes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ post_id: postID }),
  });
  showPosts();
}

async function unlikePost(id) {
  await fetch(`${rootURL}/api/likes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  showPosts();
}

async function bookmark(postID) {
  await fetch(`${rootURL}/api/bookmarks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ post_id: postID }),
  });
  showPosts();
}

async function unBookmark(id) {
  await fetch(`${rootURL}/api/bookmarks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  showPosts();
}

async function createComment(postID, text) {
  await fetch(`${rootURL}/api/comments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      post_id: postID,
      text: text,
    }),
  });

  showPosts();
}

function handleComment(postID) {
  const input = document.querySelector(`#comment-${postID}`);
  const text = input.value.trim();
  if (!text) return;
  createComment(postID, text);
}

function showNav() {
  document.querySelector("#nav").innerHTML = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
      <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
      <ul class="flex gap-4 text-sm items-center">
        <li><a href="${rootURL}/api" class="text-blue-700">API Docs</a></li>
        <li>${username}</li>
        <li><button class="text-blue-700 py-2">Sign out</button></li>
      </ul>
    </nav>
  `;
}

initializeScreen();