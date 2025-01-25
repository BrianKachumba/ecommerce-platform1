// Sample user data structure
let user = {
    name: "",
    gender: "",
    location: "",
    uploadedItems: [],
    purchasedItems: []
};

// DOM Elements
const userName = document.getElementById('user-name');
const userGender = document.getElementById('user-gender');
const userLocation = document.getElementById('user-location');
const uploadFormSection = document.getElementById('upload-form-section');
const historySection = document.getElementById('history-section');
const uploadedItemsList = document.getElementById('uploaded-items-list');
const purchasedItemsList = document.getElementById('purchased-items-list');
const profileForm = document.getElementById('profile-form');
const profileFormSection = document.getElementById('profile-setup');
const profileName = document.getElementById('profile-name');
const profileLocation = document.getElementById('profile-location');
const profileDescription = document.getElementById('profile-description');
const profilePicture = document.getElementById('profile-picture');
const uploadForm = document.getElementById('upload-form');
const productList = document.getElementById('user-product-list');

// Display User Data
function displayUserData() {
    userName.textContent = user.name;
    userGender.textContent = user.gender;
    userLocation.textContent = user.location;
    profileName.textContent = user.name;
    profileLocation.textContent = user.location;
    profileDescription.textContent = user.description || 'No description provided';
    if (user.picture) {
        profilePicture.src = user.picture;
    } else {
        profilePicture.alt = 'No profile picture';
    }
}

// Show Profile Form
function showProfileForm() {
    profileFormSection.classList.remove('hidden');
}

// Handle Profile Form Submission
profileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    user.name = document.getElementById('profile-name-input').value;
    user.gender = document.getElementById('profile-gender-input').value;
    user.location = document.getElementById('profile-location-input').value;
    user.picture = URL.createObjectURL(document.getElementById('profile-picture-input').files[0]);

    profileFormSection.classList.add('hidden');
    displayUserData();
});

// Handle Upload Item Button
document.getElementById('upload-item-btn').addEventListener('click', () => {
    uploadFormSection.classList.toggle('hidden');
    historySection.classList.add('hidden');
});

// Handle View History Button
document.getElementById('view-history-btn').addEventListener('click', () => {
    historySection.classList.toggle('hidden');
    uploadFormSection.classList.add('hidden');
    renderHistory();
});

// Handle Upload Form Submission
uploadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const price = document.getElementById('product-price').value;

    user.uploadedItems.push({ name, description, price });
    alert('Item uploaded successfully!');
    event.target.reset();
});

// Render History
function renderHistory() {
    // Render uploaded items
    uploadedItemsList.innerHTML = user.uploadedItems.map(item =>
        `<li>${item.name} - Ksh ${item.price}</li>`).join('');

    // Render purchased items
    purchasedItemsList.innerHTML = user.purchasedItems.map(item =>
        `<li>${item.name} - Ksh ${item.price}</li>`).join('');
}

// Initialize User Profile
showProfileForm();

// Handle Product Upload
uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    const productImage = document.getElementById('product-image').files[0];

    const newProduct = {
        name: productName,
        price: productPrice,
        image: productImage ? URL.createObjectURL(productImage) : null,
    };

    user.uploadedItems.push(newProduct);
    displayUploadedProducts(user.uploadedItems);
    alert('Product uploaded successfully!');
    uploadForm.reset();
});

// Display Uploaded Products
function displayUploadedProducts(products) {
    productList.innerHTML = ''; // Clear existing products
    products.forEach((product, index) => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <img src="${product.image || 'placeholder.jpg'}" alt="${product.name}" class="product-image">
            <div class="product-details">
                <h3>${product.name}</h3>
                <p>Price: Ksh ${product.price}</p>
            <button class="btn delete-btn" data-index="${index}">Delete</button>
            </div>
        `;
        productList.appendChild(productItem);
    });

    // Add Delete Functionality
    document.querySelectorAll('.delete-btn').forEach((button) => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            user.uploadedItems.splice(index, 1);
            displayUploadedProducts(user.uploadedItems);
        });
    });
}

// Convert image file to a base64 string for storage
document.getElementById('upload-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const price = document.getElementById('product-price').value;
    const imageInput = document.getElementById('product-image');
    const imageFile = imageInput.files[0];

    const reader = new FileReader();
    reader.onload = function (e) {
        const productImage = e.target.result;

        // Add the new product
        user.uploadedItems.push({ name, description, price, image: productImage });

        alert('Item uploaded successfully!');
        event.target.reset(); // Reset the form
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile); // Read the file
    } else {
        alert('Please select an image file!');
    }
});
