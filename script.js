// Function to handle reservation form submission
function handleReservationForm() {
    const form = document.getElementById('reservation-form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

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
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                alert('Thank you for your reservation!');
                form.reset();
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
        });
    } else {
        console.error('The reservation form was not found in the DOM.');
    }
}


// Function to load menu items from the database
function loadMenuItems() {
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer) {
        fetch('get-menu-items.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(menuItems => {
                menuContainer.innerHTML = '';
                menuItems.forEach(item => {
                    const itemElement = document.createElement('div');
                    itemElement.classList.add('menu-item');
                    // Make the entire itemElement clickable and open product.php with the item's ID
                    itemElement.innerHTML = `
                        <a href="product.php?id=${item.id}" class="menu-item-link">
                            <h3>${item.name} - $${item.price}</h3>
                            <p>${item.description}</p>
                            <img src="${item.image}" alt="${item.name}" style="width: 100px; height: auto;">
                        </a>
                    `;
                    menuContainer.appendChild(itemElement);
                });
            })
            .catch(error => {
                console.error('Error loading menu items:', error);
            });
    } else {
        console.error('The menu container was not found in the DOM.');
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.menu-item'); // Ensure this selector matches your menu items

    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            const itemId = this.dataset.id; // Assuming you're using a data-id attribute
            if (itemId) {
                window.location.href = `product.php?id=${itemId}`;
            } else {
                console.error('Item ID is undefined');
            }
        });
    });
});



// Example function to filter menu items by category
function filterMenu(category) {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.style.display = item.getAttribute('data-category') === category || category === 'all' ? '' : 'none';
    });
}

// Event listeners for category buttons
function setupCategoryButtons() {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filterMenu(btn.getAttribute('data-category'));
        });
    });
}

// Initialize functions after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    loadMenuItems();
    handleReservationForm();
    setupCategoryButtons();
});
