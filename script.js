const profileContainer = document.getElementById("profile");

async function getProfile() {
  const username = document.getElementById("username").value.trim();

  if (username === "") {
    profileContainer.innerHTML = `<p class="error">⚠️ Please enter a username!</p>`;
    return;
  }

  const url = `https://api.github.com/users/${username}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      profileContainer.innerHTML = `<p class="error">❌ User not found!</p>`;
      return;
    }

    const data = await response.json();

    profileContainer.innerHTML = `
      <div class="profile-card">
        <img src="${data.avatar_url}" alt="Profile Picture" />
        <h2>${data.name || "No Name Available"}</h2>
        <p>@${data.login}</p>
        <p>${data.bio || "No bio available"}</p>

        <div class="stats">
          <div><strong>${data.followers}</strong><br>Followers</div>
          <div><strong>${data.following}</strong><br>Following</div>
          <div><strong>${data.public_repos}</strong><br>Repos</div>
        </div>

        <a class="profile-link" href="${data.html_url}" target="_blank">View Profile</a>
      </div>
    `;
  } catch (error) {
    profileContainer.innerHTML = `<p class="error">⚠️ Something went wrong. Try again!</p>`;
  }
}
