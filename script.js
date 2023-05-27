// Function to fetch data from API using .then
function fetchDataWithThen() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        .then(response => response.json())
        .then(data => renderTable(data))
        .catch(error => console.error(error));
}

// Function to fetch data from API using async/await
async function fetchDataWithAsyncAwait() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        renderTable(data);
    } catch (error) {
        console.error(error);
    }
}


// Function to render the table
function renderTable(data) {
    const tableBody = document.getElementById('coinTableBody');
    tableBody.innerHTML = '';

    data.forEach(coin => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
          <div class="coin-info">
            <img class="coin-icon" src="${coin.image}" alt="${coin.name}">
            <span class="coin-name">${coin.name}</span>
          </div>
        </td>
        <td>${coin.symbol}</td>
        <td>${coin.current_price}</td>
        <td>${coin.total_volume}</td>
        <td>${coin.price_change_percentage.toFixed(2)}%</td>
        <td>${coin.market_cap}</td>
      `;
        tableBody.appendChild(row);
    });
}


// Function to filter data based on search input
function search() {
    const searchInput = document.getElementById('searchInput');
    const searchValue = searchInput.value.toUpperCase();
    const rows = document.querySelectorAll('#coinTableBody tr');

    rows.forEach(row => {
        const name = row.querySelector('td:first-child').innerText.toUpperCase();
        row.style.display = name.includes(searchValue) ? '' : 'none';
    });
}

// Function to sort data based on column index
function sort(columnIndex) {
    const tableBody = document.getElementById('coinTableBody');
    const rows = Array.from(tableBody.querySelectorAll('tr'));

    rows.sort((rowA, rowB) => {
        const valueA = rowA.children[columnIndex].innerText;
        const valueB = rowB.children[columnIndex].innerText;

        if (columnIndex === 4) {
            // Sort by Market Cap
            const numericA = parseFloat(valueA.replace(/[^0-9.-]+/g, ''));
            const numericB = parseFloat(valueB.replace(/[^0-9.-]+/g, ''));
            return numericA - numericB;
        } else if (columnIndex === 5) {
            // Sort by Percentage Change
            const numericA = parseFloat(valueA.replace(/[^0-9.-]+/g, ''));
            const numericB = parseFloat(valueB.replace(/[^0-9.-]+/g, ''));
            return numericA - numericB;
        } else {
            // Sort for other columns (text-based sorting)
            return valueA.localeCompare(valueB);
        }
    });

    // Clear the table body
    tableBody.innerHTML = '';

    // Append sorted rows to the table body
    rows.forEach(row => {
        tableBody.appendChild(row);
    });
}


// Add event listener to the search button
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', search);

// Add event listener to the sort button for market cap
const sortButton = document.getElementById('sortButton');
sortButton.addEventListener('click', () => sort(4));

// Add event listener to the sort button for percentage change
const sortButtonPer = document.getElementById('sortButtonPer');
sortButtonPer.addEventListener('click', () => sort(5));

// Fetch initial data
fetchDataWithAsyncAwait();
