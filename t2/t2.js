
// Mock restaurant data
const mockRestaurants = [
  { id: 1, name: "Restaurant A", address: "Address A", postalCode: "1000AA", city: "City A", phone: "1234567890", company: "Company A" },
  { id: 2, name: "Restaurant B", address: "Address B", postalCode: "1000AB", city: "City B", phone: "0987654321", company: "Company B" },
];







document.addEventListener('DOMContentLoaded', function() {
  fetchRestaurantData();
});

async function fetchRestaurantData() {
  const url = 'https://10.120.32.94/restaurant/api/v1';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const restaurants = await response.json();
    populateRestaurantList(restaurants);
  } catch (error) {
    console.error('Fetch error: ', error);
  }
}
function populateRestaurantList(restaurants) {
  const table = document.createElement('table');
  let tableBody = table.querySelector("tbody");
  if (!tableBody) {
    tableBody = document.createElement('tbody');
    table.appendChild(tableBody);
  } else {
    tableBody.innerHTML = '';
  }
}


restaurants.sort((a, b) => a.name.localeCompare(b.name));

restaurants.forEach(restaurant => {
  const row = document.createElement('tr');
  row.addEventListener('click', () => {
    removeHighlight();
    row.classList.add('highlight');
    showDialog(restaurant);
  });



  const namecel = document.createElement('td');
  namecel.textContent = restaurant.name;
  const addressCell = document.createElement('td');
  addressCell.textContent=restaurant.address;
  row.appendChild(namecel);
  row.appendChild(addressCell);
  tableBody.appendChild(row);
});

async function fetchMenuAndShowDialog(restaurant) {
  const menuUrl = `https://10.120.32.94/restaurant/api/v1/menus/${restaurant.id}`;
  try {
    const menuResponse = await fetch(menuUrl)
    if (!menuResponse.ok) {
      throw new Error (`HTTTP error status: ${menuResponse.status}`);
    }
    const menu = await menuResponse.json();
    showDialog(restaurant, menu); // pass menu dataa to showDialog
  } catch (e) {
    console.error('Fetch menu error!: ', e);
  }
}

document.getElementById('closeDialog').addEventListener('click', () => {
  document.getElementById('restaurantDetailsDialog').close();
});



// function to remove highlight
function removeHighlight() {
  document.querySelectorAll('tr').forEach(row => {
    row.classList.remove('highlight');
  });
}
//function to populate and show modal
function showDialog(restaurant, menu) {
  const dialog = document.getElementById('restaurantDetailsDialog');
  const dialogContent = document.getElementById('dialogContent');

  dialogContent.innerHTML = `
  <p>Name: ${restaurant.name}</p>
  <p>Address: ${restaurant.address}</p>
  <p>Postal Code: ${restaurant.postalCode}</p>
  <p>City: ${restaurant.city}</p>
  <p>Phone: ${restaurant.phone}</p>
  <p>Company: ${restaurant.company}</p>
  <p>Menu: ${menu.items.join(', ')}</p>
`;
  dialog.showModal();
}
