const form = document.getElementById('commentForm');
const commentsDiv = document.getElementById('comments');

// Create a message element for best wishes
const wishMsg = document.createElement('div');
wishMsg.id = 'wishMsg';
document.body.insertBefore(wishMsg, commentsDiv);

// Fetch and display comments
async function loadComments() {
  const res = await fetch('/api/comments');
  const comments = await res.json();
  commentsDiv.innerHTML = comments.map(c => `
    <div class="comment">
      <strong>${c.name}</strong> <small>(${new Date(c.date).toLocaleString()})</small>
      <p>${c.message}</p>
    </div>
  `).join('');
}

// Submit new comment
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !message) return alert('Please fill all fields');

  const res = await fetch('/api/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, message })
  });

  if (res.ok) {
    form.reset();
    loadComments();
    showBestWishes(name);
  } else {
    alert('Error posting your comment. Please try again.');
  }
});

// Function to show the “Best Wishes” message
function showBestWishes(name) {
  const messages = [
    `🪔 Best Wishes, ${name}! May this Diwali bring light and joy!`,
    `🎆 Happy Diwali ${name}! Wishing you prosperity and happiness!`,
    `✨ ${name}, may your life shine as bright as the diyas this Diwali!`,
    `🎇 ${name}, sending you warm Diwali greetings and love!`
  ];

  const randomMsg = messages[Math.floor(Math.random() * messages.length)];
  wishMsg.textContent = randomMsg;
  wishMsg.classList.add('show');

  // Hide message after 4 seconds
  setTimeout(() => {
    wishMsg.classList.remove('show');
  }, 4000);
}

// Initial load
loadComments();
