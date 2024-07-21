document.addEventListener('DOMContentLoaded', () => {
    // Set timestamp for the form
    const timestampInput = document.getElementById('timestamp');
    if (timestampInput) {
        const now = new Date();
        timestampInput.value = now.toISOString();
    }

    // Weather Data
    const apiKey = '63fd71280537dece5bc28ee2eb59fcc0';
    const city = 'São Paulo';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('current-temp').textContent = `${data.main.temp}°C`;
            document.getElementById('weather-description').textContent = data.weather[0].description;
        })
        .catch(error => console.error('Error fetching current weather:', error));

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            const forecast = document.getElementById('forecast');
            forecast.innerHTML = ''; // Clear previous forecast data
            
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const today = new Date().getDay();

            for (let i = 0; i < 7; i++) {
                const forecastDayIndex = (today + i) % 7;
                const forecastData = data.list[i * 8]; // Forecast data for every 24 hours
                
                const forecastDay = document.createElement('div');
                forecastDay.textContent = `Day ${i + 1}: ${daysOfWeek[forecastDayIndex]} - ${forecastData.main.temp}°C, ${forecastData.weather[0].description}`;
                forecast.appendChild(forecastDay);
            }
        })
        .catch(error => console.error('Error fetching weather forecast:', error));

    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const modalLinks = document.querySelectorAll('.modal-link');
    const closeButtons = document.querySelectorAll('.close');

    modalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = document.querySelector(link.getAttribute('href'));
            modal.style.display = 'block';
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.parentElement.parentElement.style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navigation = document.querySelector('.navigation');
    const closeBtn = document.querySelector('.close');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navigation.classList.toggle('open');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            navigation.classList.remove('open');
        });
    }

    // Company Spotlights
    fetch('data/member.json')
        .then(response => response.json())
        .then(members => {
            const spotlightList = document.getElementById('spotlight-list');
            const spotlightMembers = members.filter(member => member.membership_level === 2 || member.membership_level === 3);
            const selectedSpotlights = spotlightMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

            selectedSpotlights.forEach(member => {
                const memberCard = document.createElement('div');
                memberCard.classList.add('member-card');
                memberCard.innerHTML = `
                    <img src="images/${member.image_icon}" alt="${member.name} logo">
                    <h3>${member.name}</h3>
                    <p>Phone: ${member.phone_number}</p>
                    <p>Address: ${member.address}</p>
                    <p><a href="${member.website_url}" target="_blank">Visit Website</a></p>
                    <p>Membership: ${member.membership_level === 3 ? 'Gold' : 'Silver'}</p>
                `;
                spotlightList.appendChild(memberCard);
            });
        })
        .catch(error => console.error('Error fetching members:', error));

    // Toggle View Button
    const toggleViewButton = document.getElementById('toggle-view');
    const directory = document.querySelector('.directory');
    let isGridView = true;

    if (toggleViewButton) {
        toggleViewButton.addEventListener('click', () => {
            if (isGridView) {
                directory.classList.remove('grid-view');
                directory.classList.add('list-view');
                toggleViewButton.textContent = 'Switch to Grid View';
            } else {
                directory.classList.remove('list-view');
                directory.classList.add('grid-view');
                toggleViewButton.textContent = 'Switch to List View';
            }
            isGridView = !isGridView;
        });

        // Only show toggle button on desktop view
        const handleResize = () => {
            if (window.innerWidth > 768) {
                toggleViewButton.style.display = 'block';
            } else {
                toggleViewButton.style.display = 'none';
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
    }
});
