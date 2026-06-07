// Get DOM elements
const itemInput = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const itemList = document.getElementById('itemList');

// Function to create a new list item
function createListItem(itemText) {
    // Create list item element
    const li = document.createElement('li');
    li.className = 'list-item';
    
    // Create span for item text
    const span = document.createElement('span');
    span.className = 'item-text';
    span.textContent = itemText;
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    
    // Add event listener to delete button
    deleteBtn.addEventListener('click', function() {
        // Add fade-out effect before removing
        li.style.opacity = '0';
        li.style.transform = 'translateX(-20px)';
        
        // Remove the item after animation
        setTimeout(() => {
            li.remove();
            checkEmptyList();
        }, 300);
    });
    
    // Append text and button to list item
    li.appendChild(span);
    li.appendChild(deleteBtn);
    
    return li;
}

// Function to add item to list
function addItem() {
    const itemText = itemInput.value.trim();
    
    // Validate input
    if (itemText === '') {
        alert('Please enter an item name!');
        itemInput.focus();
        return;
    }
    
    // Remove empty message if it exists
    const emptyMessage = document.querySelector('.empty-message');
    if (emptyMessage) {
        emptyMessage.remove();
    }
    
    // Create and add new list item
    const newItem = createListItem(itemText);
    itemList.appendChild(newItem);
    
    // Clear input field and focus
    itemInput.value = '';
    itemInput.focus();
}

// Function to check if list is empty and show message
function checkEmptyList() {
    if (itemList.children.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'empty-message';
        emptyMessage.textContent = 'No items yet. Add your first item!';
        itemList.appendChild(emptyMessage);
    }
}

// Event listener for Add button
addBtn.addEventListener('click', addItem);

// Event listener for Enter key in input field
itemInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addItem();
    }
});

// Initialize with empty message
checkEmptyList();
