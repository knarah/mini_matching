
// Fetch the items from the JSON file
function loadItems() {
    return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items);
}

// Update the list with the given items
function displayItems(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

// Create HTML list from the given data
function createHTMLString(item) {
    return `
    <li class="item">
      <img src="${item.image}" alt="${item.type}" class="item_thumbnail" />
      <span class="item_description">${item.gender}. ${item.size}</span>
    </li>
    `;
}

function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    if (key == null || value == null) {
        return;
    }
    
    displayItems(items.filter(item => item[key] === value));
}


function setEventListner(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items));
}
//main
loadItems() 
.then(items => {
    console.log(items)
    displayItems(items);
    setEventListner(items);
})
.catch(console.log)