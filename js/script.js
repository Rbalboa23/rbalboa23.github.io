// MOBILE FUNCTION 
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function() {
    var video = document.querySelector('.back-video');
    video.play().catch(function(error) {
        console.log("Autoplay failed: ", error);
        // Optional: Add a manual play button or retry logic here
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Strain data
    const strains = [
        { name: "Blue Champagne", category: "premium", img: "images/weed-ex.jpg", pdf: "pdfs/blue-champagne.pdf" },
        { name: "Black Ice", category: "exotic", img: "images/weed-ex.jpg", pdf: "pdfs/black-ice.pdf" },
        { name: "Black Truffle", category: "candy", img: "images/weed-ex.jpg", pdf: "pdfs/black-truffle.pdf" },
        { name: "Bust Down", category: "basic", img: "images/weed-ex.jpg", pdf: "pdfs/bust-down.pdf" },
        { name: "Double Diesel", category: "exotic", img: "images/weed-ex.jpg", pdf: "pdfs/double-diesel.pdf" },
        { name: "Jealousy Mintz", category: "premium", img: "images/weed-ex.jpg", pdf: "pdfs/jealousy-mintz.pdf" },
        { name: "Pink Sherbert", category: "candy", img: "images/weed-ex.jpg", pdf: "pdfs/pink-sherbert.pdf" },
        { name: "Rainbow Zoap", category: "basic", img: "images/weed-ex.jpg", pdf: "pdfs/rainbow-zoap.pdf" },
        { name: "Real Runtz", category: "basic", img: "images/weed-ex.jpg", pdf: "pdfs/real-runtz.pdf" },
        { name: "Super Charger", category: "basic", img: "images/weed-ex.jpg", pdf: "pdfs/super-charger.pdf" },
    ];

    let currentFilter = "all";

    // Function to filter strains
    window.filterStrains = function(category) {
        currentFilter = category;
        let searchQuery = document.getElementById("searchBar").value;
        displayStrains(currentFilter, searchQuery);
    };

    // Function to search strains
    window.searchStrains = function() {
        let searchQuery = document.getElementById("searchBar").value;
        displayStrains(currentFilter, searchQuery);
    };

    // Default load
    displayStrains("all");

    function displayStrains(filter, searchQuery = "") {
        let container = document.getElementById("strain-container");
        container.innerHTML = ""; // Clear previous list
    
        // Sort alphabetically and filter
        let filteredStrains = strains.filter(strain =>
            (filter === "all" || strain.category === filter) &&
            strain.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    
        filteredStrains.sort((a, b) => a.name.localeCompare(b.name));
    
        // Ensure section keeps minimum height
        let strainListSection = document.querySelector(".strain-list");
        strainListSection.style.minHeight = "100vh";
    
        // Group strains alphabetically
        let currentLetter = "";
        let rowDiv = null;

        if (filteredStrains.length === 0) {
            container.innerHTML = `<p style="text-align: center; font-size: 20px; color: #bbb;">No results found.</p>`;
        } else {
            filteredStrains.forEach((strain, index) => {
                let firstLetter = strain.name[0].toUpperCase();
    
                // Create a new section for each letter
                if (firstLetter !== currentLetter) {
                    currentLetter = firstLetter;
                    let letterHeader = document.createElement("h2");
                    letterHeader.textContent = currentLetter;
                    letterHeader.style.color = "#ffcc00";
                    letterHeader.style.marginTop = "20px";
                    container.appendChild(letterHeader);
                    
                    // Create a new row for strains under this letter
                    rowDiv = document.createElement("div");
                    rowDiv.classList.add("strain-row");
                    container.appendChild(rowDiv);
                }
    
                // Create the strain div as a clickable link
                let strainDiv = document.createElement("a");
                strainDiv.classList.add("strain");
                strainDiv.href = strain.pdf;
                strainDiv.target = "_blank"; // Opens PDF in a new tab
                
                strainDiv.innerHTML = `
                    <img src="${strain.img}" alt="${strain.name}" class="strain-image">
                    <h3>${strain.name}</h3>
                    <p>Category: ${strain.category}</p>
                `;
                
                rowDiv.appendChild(strainDiv);
            });
        }
    }
});
