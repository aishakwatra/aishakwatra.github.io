document.addEventListener("DOMContentLoaded", () => {
  const projectGrid = document.getElementById("project-grid");

  if (projectGrid) {
    fetch("projects.json")
      .then(response => response.json())
      .then(projects => {
        projects.forEach(project => {
          
          const tagsHTML = project.tags.map(tag => `<span>${tag}</span>`).join("");

          // This card structure is identical to your original HTML,
          // so it will work perfectly with your existing style.css
          // The 'project.href' now comes from the JSON file.
          const cardHTML = `
            <a class="card card-link" href="${project.href}">
              <div class="card-media">
                <img src="${project.imgSrc}" alt="${project.imgAlt}" />
              </div>
              <div class="card-body">
                <div class="card-top">
                  <h3>${project.title}</h3>
                  <span class="year">${project.year}</span>
                </div>
                <p class="muted">${project.description}</p>
                <div class="tags">
                  ${tagsHTML}
                </div>
              </div>
            </a>
          `;
          
          projectGrid.innerHTML += cardHTML;
        });
      })
      .catch(error => console.error("Error fetching projects:", error));
  }
});