document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    const currentyear = document.querySelector("#currentyear");
    const today = new Date();
    currentyear.textContent = today.getFullYear();

    // Set last modified date
    let oLastModif = new Date(document.lastModified);
    const lastModified = document.querySelector("#lastModified");

    function addLeadingZero(number) {
        return number < 10 ? '0' + number : number;
    }

    let formattedDate = addLeadingZero(oLastModif.getMonth() + 1) + '/' +
        addLeadingZero(oLastModif.getDate()) + '/' +
        oLastModif.getFullYear() + ' ' +
        addLeadingZero(oLastModif.getHours()) + ':' +
        addLeadingZero(oLastModif.getMinutes()) + ':' +
        addLeadingZero(oLastModif.getSeconds());

    lastModified.textContent = "Last Modification: " + formattedDate;

     // Fetch weather data
     fetchWeatherData();

    // Fetch member data
    fetchMemberData();

    const gridView = document.querySelector('.grid-view');
    const listView = document.querySelector('.list-view');
    const toggleButton = document.getElementById('toggle-view');
    const directory = document.getElementById('directory');

    function toggleView() {
        gridView.classList.toggle('hidden');
        listView.classList.toggle('hidden');
        toggleButton.textContent = gridView.classList.contains('hidden') ? 'Switch to Grid View' : 'Switch to List View';
    }

    // Show/hide the toggle button based on screen size
    function checkScreenSize() {
        if (window.innerWidth > 768) {
            toggleButton.style.display = 'block';
        } else {
            toggleButton.style.display = 'none';
        }
    }

    // Initial check
    checkScreenSize();

    // Check on resize
    window.addEventListener('resize', checkScreenSize);

    toggleButton.addEventListener('click', () => {
        directory.classList.toggle('grid-view');
        directory.classList.toggle('list-view');
    });

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navigation = document.querySelector('.navigation');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navigation.classList.toggle('active');
        hamburger.textContent = hamburger.classList.contains('active') ? '✕' : '☰'; // Unicode for 'X' and hamburger menu
    });
});

async function fetchWeatherData() {
    const apiKey = '63fd71280537dece5bc28ee2eb59fcc0';
    const city = 'Sao Paulo';
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        document.getElementById('current-temp').textContent = Math.round(data.main.temp);
        document.getElementById('weather-description').textContent = data.weather[0].description;

        // Fetch forecast
        await fetchForecastData(city, apiKey);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

async function fetchForecastData(city, apiKey) {
    try {
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
        if (!forecastResponse.ok) throw new Error('Network response was not ok');
        const forecastData = await forecastResponse.json();

        const forecastContainer = document.getElementById('forecast');
        forecastContainer.innerHTML = ''; // Clear previous content

        // Display three-day forecast
        for (let i = 0; i < 3; i++) {
            const dayData = forecastData.list[i * 8]; // Get the forecast for each day
            const day = new Date(dayData.dt * 1000).toLocaleDateString();
            const temp = Math.round(dayData.main.temp);
            forecastContainer.innerHTML += `<p>${day}: ${temp}°C</p>`;
        }
    } catch (error) {
        console.error('Error fetching forecast data:', error);
    }
}

async function fetchMemberData() {
    const response = await fetch('data/member.json');
    const data = await response.json();
    displayMembers(data);
}

function displayMembers(members) {
    const directory = document.getElementById('directory');
    directory.innerHTML = '';
    // Check if we are on the index.html page
    if (window.location.pathname.endsWith('index.html')) {
        directory.style.display = 'none'; // Hide the directory
        return; // Exit the function early
    } else {
        directory.classList.add('grid-view'); // Default view
    }

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'member-card';

        memberCard.innerHTML = `
            <h2>${member.name}</h2>
            <p>${member.description}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone_number}</p>
            <p><strong>Email:</strong> <a href="mailto:${member.email}">${member.email}</a></p>
            <p><strong>Website:</strong> <a href="${member.website_url}" target="_blank">${member.website_url}</a></p>
            <img src="images/${member.image_icon}" alt="${member.name} logo">
            <p><strong>Membership Level:</strong> ${member.membership_level}</p>
        `;

        directory.appendChild(memberCard);
    });

    displaySpotlights(members);
}

function displaySpotlights(members) {
    const spotlightList = document.getElementById('spotlight-list');
    spotlightList.innerHTML = ''; // Clear previous content

    // Filter for Gold (3) or Silver (2) members
    const qualifiedMembers = members.filter(member => member.membership_level === 3 || member.membership_level === 2);
    
    if (qualifiedMembers.length > 0) {
        // Randomly select one member
        const randomIndex = Math.floor(Math.random() * qualifiedMembers.length);
        const selectedMember = qualifiedMembers[randomIndex];

        // Display the selected member
        spotlightList.innerHTML = `
            <div class="spotlight">
                <h3>${selectedMember.name}</h3>
                <img src="images/${selectedMember.image_icon}" alt="${selectedMember.name} logo">
                <p>Phone: ${selectedMember.phone_number}</p>
                <p>Address: ${selectedMember.address}</p>
                <p><a href="${selectedMember.website_url}" target="_blank">Visit Website</a></p>
                <p>Membership Level: ${selectedMember.membership_level === 3 ? 'Gold' : 'Silver'}</p>
            </div>
        `;
    } else {
        spotlightList.innerHTML = `<p>No qualified members available for spotlight.</p>`;
    }
}