document.addEventListener("DOMContentLoaded", () => {
  // Get the 'id' from the URL query string
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");

  if (projectId) {
    fetch("projects.json")
      .then(response => response.json())
      .then(projects => {
        // Find the project in the array that matches the id
        const project = projects.find(p => p.id === projectId);

        if (project) {
          // Now we have the project data, let's fill the page
          
          // 1. Set the page title
          document.title = `${project.title} — Project`;

          // 2. Fill in the header info
          document.getElementById("project-title").textContent = project.title;
          document.getElementById("project-type").textContent = project.projectType;
          document.getElementById("project-date").textContent = project.dateCompleted;

          // 3. Create the links (conditionally)
          const linksContainer = document.getElementById("project-links");
          
          if (project.githubURL) {
            linksContainer.innerHTML += `
              <a class="btn btn-ghost" href="${project.githubURL}" target="_blank" rel="noopener">GitHub</a>
            `;
          }
          if (project.gameURL) {
            linksContainer.innerHTML += `
              <a class="btn btn-primary" href="${project.gameURL}" target="_blank" rel="noopener">Live Demo</a>
            `;
          }
          
          // 4. Fill in the media
          const mediaContainer = document.getElementById("project-media");
          
          // Add Video (if it exists)
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
          
          // Add Images
          project.media.images.forEach(imgSrc => {
            mediaContainer.innerHTML += `<img src="${imgSrc}" alt="${project.imgAlt}" class="project-image card">`;
          });

          // 5. Fill in the feature lists
          const featuresList = document.getElementById("project-features");
          project.features.forEach(feature => {
            featuresList.innerHTML += `<li>${feature}</li>`;
          });

          // 6. Fill in "My Contributions" (conditionally)
          if (project.myFeatures && project.myFeatures.length > 0) {
            const myFeaturesCard = document.getElementById("my-features-card");
            const myFeaturesList = document.getElementById("my-features");
            
            project.myFeatures.forEach(feature => {
              myFeaturesList.innerHTML += `<li>${feature}</li>`;
            });
            
            // Show the card
            myFeaturesCard.style.display = "block";
          }

        } else {
          // Handle case where project ID isn't found
          document.getElementById("project-title").textContent = "Project not found";
        }
      })
      .catch(error => console.error("Error fetching project details:", error));
  }
});