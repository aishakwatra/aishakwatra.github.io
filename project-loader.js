document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");

  if (projectId) {
    fetch("projects.json")
      .then(response => response.json())
      .then(projects => {

        const project = projects.find(p => p.id === projectId);

        if (project) {
    

          document.title = `${project.title} — Project`;

          document.getElementById("project-title").textContent = project.title;
          document.getElementById("project-type").textContent = project.projectType;
          document.getElementById("project-date").textContent = project.dateCompleted;
          

          document.getElementById("project-description").textContent = project.longDescription;

          const linksContainer = document.getElementById("project-links");
          
          if (project.githubURL) {
            linksContainer.innerHTML += `
              <a class="btn btn-ghost" href="${project.githubURL}" target="_blank" rel="noopener">GitHub</a>
            `;
          }
          if (project.gameURL) {
            linksContainer.innerHTML += `
              <a class="btn btn-primary" href="${project.gameURL}" target="_blank" rel="noopener">Demo</a>
            `;
          }
          
          const mediaContainer = document.getElementById("project-media");
          
          if (project.media.videoURL) {
            mediaContainer.innerHTML += `
              <div class="video-wrap card">
                <iframe
                  src="${project.media.videoURL}"
                  title="${project.title} Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen>
                </iframe>
              </div>
            `;
          }
          

          project.media.images.forEach(imgSrc => {
            mediaContainer.innerHTML += `<img src="${imgSrc}" alt="${project.imgAlt}" class="project-image card">`;
          });

          const featuresList = document.getElementById("project-features");
          
          project.features.forEach(feature => {
            // Check if 'feature.isMine' is true.
            // If it is, add the class. If not, add nothing.
            const liClass = feature.isMine ? 'class="my-contribution"' : '';
            
            // Add the list item with the conditional class
            featuresList.innerHTML += `<li ${liClass}>${feature.name}</li>`;
          });
   
          

        } else {
          // Handle case where project ID isn't found
          document.getElementById("project-title").textContent = "Project not found";
        }
      })
      .catch(error => console.error("Error fetching project details:", error));
  }
});