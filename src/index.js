console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", function() {
  const dogImageContainer = document.getElementById("dog-image-container");
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  
  // Fetch and display dog images
  fetch(imgUrl)
    .then(res => res.json())
    .then(images => {
      images.message.forEach(image => {
        let imageContainer = document.createElement("img");
        imageContainer.src = image;
        imageContainer.style.width = "200px";
        imageContainer.style.height = "200px";
        dogImageContainer.appendChild(imageContainer);
      });
    });

  const dogBreeds = document.getElementById("dog-breeds");
  const breedUrl = "https://dog.ceo/api/breeds/list/all";

  // Fetch and display all dog breeds
  fetch(breedUrl)
    .then(res => res.json())
    .then(breeds => {
      Object.keys(breeds.message).forEach(breed => {
        const list = document.createElement("li");
        list.innerText = breed;
        dogBreeds.appendChild(list);
      });
    });

  // Change color of clicked breed
  dogBreeds.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      Array.from(dogBreeds.children).forEach(li => li.style.color = "");
      event.target.style.color = "green";
    }
  });

  // Filter breeds based on dropdown selection
  const breedDropdown = document.getElementById("breed-dropdown");
  breedDropdown.addEventListener("change", () => {
    dogBreeds.innerHTML = "";
    
    const selectedLetter = breedDropdown.value;
    fetch(breedUrl)
      .then(res => res.json())
      .then(data => {
        const breeds = Object.keys(data.message);
        const filteredBreeds = breeds.filter(breed => breed.startsWith(selectedLetter));
        
        filteredBreeds.forEach(breed => {
          const li = document.createElement("li");
          li.textContent = breed;
          dogBreeds.appendChild(li);
        });
      });
  });
});
