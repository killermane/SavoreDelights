// Function to load menu items from a JSON file
function loadMenuItems() {
    fetch('menu.json')
        .then(response => response.json())
        .then(menuItems => {
            const menuContainer = document.getElementById('menu-container');
            menuItems.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('menu-item');
                itemElement.innerHTML = `
          <h3>${item.name} - $${item.price}</h3>
          <p>${item.description}</p>
          <img src="${item.image}" alt="${item.name}" style="width: 100px; height: auto;">
        `;
                menuContainer.appendChild(itemElement);
            });
        })
        .catch(error => console.error('Error loading menu items:', error));
}

// Function to handle reservation form submission
function handleReservationForm() {
    const form = document.getElementById('reservation-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Here you would normally gather the form data and send it to the server
        // For now, we'll just log it to the console
        const formData = new FormData(form);
        const reservationData = {};
        formData.forEach((value, key) => {
            reservationData[key] = value;
        });
        console.log('Reservation Data:', reservationData);

        // Show a success message (or handle as needed)
        alert('Thank you for your reservation!');
        form.reset(); // Reset the form after submission
    });
}

// Function to load reviews (static data for now)
function loadReviews() {

    const reviews = [
        {
            name: "Jane Doe",
            review: "Great food and wonderful service!"
        },
        {
            name: "John Smith",
            review: "Loved the ambiance and the desserts."
        }
    ];

    const reviewsContainer = document.getElementById('reviews-container');
    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = `
      <h4>${review.name}</h4>
      <p>${review.review}</p>
    `;
        reviewsContainer.appendChild(reviewElement);
    });
}

// Example function to filter menu items by category
function filterMenu(category) {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.style.display = item.getAttribute('data-category') === category || category === 'all' ? '' : 'none';
    });
}

// Event listeners for category buttons
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        filterMenu(btn.getAttribute('data-category'));
    });
});

document.addEventListener('DOMContentLoaded', () => {
    loadMenuItems();
    handleReservationForm();
    loadReviews();
});


document.getElementById('reservation-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // ... form validation ...

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

fetch(this.action, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
})
.then(response => {
    if (!response.ok) {
        // Throw an error for non-OK responses to be caught in the catch block
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    // Handle the response data
    console.log(data);
})
.catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('There has been a problem with your fetch operation:', error);
    });
});
