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
          const isIndividual = project.projectType === "Individual Project";
          const legend = document.querySelector('.feature-legend');
          

          if (legend) {
            legend.style.display = isIndividual ? 'none' : 'block';
          }
      

          const linksContainer = document.getElementById("project-links");
          
          linksContainer.innerHTML = ''; 

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
          mediaContainer.innerHTML = ''; // Clear existing content

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

          const lightbox = document.getElementById('lightbox');
          const lightboxImg = document.getElementById('lightbox-img');
          const closeBtn = document.querySelector('.lightbox-close');

          if (lightbox && lightboxImg && closeBtn) {
            mediaContainer.addEventListener('click', (e) => {
              if (e.target.classList.contains('project-image')) {
                lightbox.style.display = "block";
                lightboxImg.src = e.target.src;
              }
            });
            closeBtn.addEventListener('click', () => {
              lightbox.style.display = "none";
            });
            lightbox.addEventListener('click', (e) => {
              if (e.target === lightbox) {
                lightbox.style.display = "none";
              }
            });
          }
          // ------------------------------------------

          const featuresList = document.getElementById("project-features");
          featuresList.innerHTML = ''; 

          project.features.forEach(feature => {

            const isHighlighted = isIndividual ? false : feature.isMine;     
            const liClass = isHighlighted ? 'class="my-contribution"' : '';         
            featuresList.innerHTML += `<li ${liClass}>${feature.name}</li>`;
          });
   
        } else {
          document.getElementById("project-title").textContent = "Project not found";
        }
      })
      .catch(error => console.error("Error fetching project details:", error));
  }
});