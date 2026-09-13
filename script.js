const repositoryList = document.querySelector("#repository-list");
const repositoryCount = document.querySelector("#repository-count");

function createRepository(repository) {
  const article = document.createElement("article");
  article.className = "repository";

  const details = document.createElement("div");
  const link = document.createElement("a");
  link.className = "repository-name";
  link.href = repository.url;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = `${repository.owner} / ${repository.name}`;

  const description = document.createElement("p");
  description.className = "repository-description";
  description.textContent = repository.description;

  const meta = document.createElement("div");
  meta.className = "repository-meta";
  meta.innerHTML = `<span>${repository.language}</span><span>${repository.stars} stars</span>`;

  details.append(link, description, meta);

  const stars = document.createElement("span");
  stars.className = "repository-stars";
  stars.textContent = "★ starred";

  article.append(details, stars);
  return article;
}

async function renderRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Unable to load repositories: ${response.status}`);
    }

    const repositories = await response.json();
    repositoryList.replaceChildren(...repositories.map(createRepository));
    repositoryCount.textContent = `${repositories.length} saved`;
  } catch (error) {
    repositoryList.replaceChildren();
    const message = document.createElement("p");
    message.className = "status-message";
    message.textContent = "The repository log could not be loaded. Please try again.";
    repositoryList.append(message);
    repositoryCount.textContent = "Unavailable";
    console.error(error);
  }
}

renderRepositories();