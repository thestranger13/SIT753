document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('vehicle-form');
    const result = document.getElementById('result');
    const savedVehiclesLink = document.getElementById('saved-vehicles-link');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const vehicle = document.getElementById('vehicle').value;

        try {
            const response = await fetch(`/checker?vehicle=${vehicle}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            if (data.valid) {
                result.textContent = 'YES - Vehicle is registered';
                result.className = 'green-text';
            } else {
                result.textContent = 'Vehicle number saved!';
                result.className = 'blue-text';
            }
        } catch (error) {
            console.error('Error:', error); 
            result.textContent = 'An error occurred. Please try again.';
            result.className = 'red-text';
        }
    });

    if (savedVehiclesLink) {
        savedVehiclesLink.addEventListener('click', (event) => {
            event.preventDefault();
            loadSavedVehicles();
        });
    }
});

// Display saved vehicles
async function loadSavedVehicles() {
    console.log('Loading saved vehicles...');
    const vehicleList = document.getElementById('vehicleList');
    vehicleList.innerHTML = '<li class="collection-item">Loading...</li>';

    try {
        const response = await fetch('/checker/saved');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const vehicles = await response.json();
        console.log('Fetched vehicles:', vehicles);
        
        vehicleList.innerHTML = '';
        if (vehicles.length === 0) {
            vehicleList.innerHTML = '<li class="collection-item">No saved vehicles found.</li>';
        } else {
            vehicles.forEach(vehicle => {
                const li = document.createElement('li');
                li.className = 'collection-item';
                li.textContent = vehicle.vehicleNumber;
                vehicleList.appendChild(li);
            });
        }
        
        showSection('savedVehicles');
    } catch (error) {
        console.error('Error:', error);
        vehicleList.innerHTML = '<li class="collection-item red-text">Error loading saved vehicles</li>';
    }
}

function showSection(sectionId) {
    console.log('Showing section:', sectionId);
    document.querySelectorAll('main > section').forEach(section => {
        section.style.display = 'none';
    });
    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.style.display = 'block';
    } else {
        console.error('Section not found:', sectionId);
    }
}

// Checker section should always be displayed
showSection('checker');