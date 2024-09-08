// JavaScript for the Home section to simulate dynamic content
document.addEventListener('DOMContentLoaded', function() {
    // Populate home section with dynamic content
    const homeSection = document.querySelector('#home');

    const homeContent = document.createElement('p');
    homeContent.textContent = "Welcome to AgroSmart! Here, you can manage your crops, find nearby selling centers, and track ongoing market prices.";

    homeSection.appendChild(homeContent);
});

// JavaScript to handle form submission and validation for Crop Input
document.getElementById('crop-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent page refresh on form submit

    const cropName = document.getElementById('crop-name').value;
    const area = document.getElementById('area').value;
    const season = document.getElementById('season').value;

    if (cropName && area && season) {
        alert(`Crop: ${cropName}, Area: ${area} acres, Season: ${season} submitted successfully!`);
    } else {
        alert('Please fill out all the fields before submitting.');
    }
});

// JavaScript to dynamically update the Nearby Centers and Prices (simulated data)
const centersList = document.getElementById('centers-list');
const priceTableBody = document.getElementById('price-table-body');

function updateNearbyCenters() {
    centersList.innerHTML = `
        <li>Updated Center 1: New Address, 5km away</li>
        <li>Updated Center 2: New Address, 10km away</li>
        <li>Updated Center 3: New Address, 15km away</li>
    `;
}

function updatePrices() {
    priceTableBody.innerHTML = `
        <tr>
            <td>Wheat</td>
            <td>₹2,200</td>
            <td>Bangalore</td>
        </tr>
        <tr>
            <td>Rice</td>
            <td>₹2,600</td>
            <td>Hyderabad</td>
        </tr>
        <tr>
            <td>Cotton</td>
            <td>₹4,300</td>
            <td>Chennai</td>
        </tr>
    `;
}

// Call the update functions to simulate dynamic content update
updateNearbyCenters();
updatePrices();

// Add animations to new table rows
function animateTableRows() {
    const rows = document.querySelectorAll('.price-row');
    rows.forEach((row, index) => {
        row.style.opacity = '0';
        setTimeout(() => {
            row.style.transition = 'opacity 0.5s ease';
            row.style.opacity = '1';
        }, index * 150); // Delay each row for staggered effect
    });
}

// Call functions to simulate updates
updateNearbyCenters();
updatePrices();

// Chatbot functionality
document.getElementById('talk-to-ai').addEventListener('click', function() {
    const chatbotContainer = document.getElementById('chatbot-container');
    chatbotContainer.style.display = chatbotContainer.style.display === 'none' ? 'block' : 'none';
});

// Close chatbot when exit button is clicked
document.getElementById('exit-chatbot').addEventListener('click', function() {
    const chatbotContainer = document.getElementById('chatbot-container');
    chatbotContainer.style.display = 'none';
});

document.getElementById('send-message').addEventListener('click', function() {
    const userMessage = document.getElementById('chatbot-input').value;
    if (userMessage.trim()) {
        // Display user message
        const userMessageElement = document.createElement('div');
        userMessageElement.textContent = "You: " + userMessage;
        document.getElementById('chatbot-messages').appendChild(userMessageElement);

        // Clear input
        document.getElementById('chatbot-input').value = '';

        // Simulate AI response
        setTimeout(function() {
            const aiResponseElement = document.createElement('div');
            aiResponseElement.textContent = "AI: I'm here to help with your farming needs!";
            document.getElementById('chatbot-messages').appendChild(aiResponseElement);
        }, 1000); // Simulated delay for AI response
    }
    if(userMessage.trim()){
        const userMessageElement = document.createElement('div');
        userMessageElement.textContent = "You: " + "best season for growing apples";
        document.getElementById('chatbot-messages').appendChild(userMessageElement);

        setTimeout(function() {
            const aiResponseElement = document.createElement('div');
            aiResponseElement.textContent = "AI: It's January to Febbraury.";
            document.getElementById('chatbot-messages').appendChild(aiResponseElement);
        }, 1000); // Simulated delay for AI response
    }
});
document.getElementById('send-message').addEventListener('click', function() {
    const userMessage = document.getElementById('chatbot-input').value;
    if (userMessage.trim()) {
        // Display user message
        const userMessageElement = document.createElement('div');
        userMessageElement.textContent = "You: " + userMessage;
        document.getElementById('chatbot-messages').appendChild(userMessageElement);

        // Clear input
        document.getElementById('chatbot-input').value = '';

        // Send message to Flask backend
        fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => response.json())
        .then(data => {
            // Display AI response
            const aiResponseElement = document.createElement('div');
            aiResponseElement.textContent = "AI: " + data.reply;
            document.getElementById('chatbot-messages').appendChild(aiResponseElement);
        });
    }
});


