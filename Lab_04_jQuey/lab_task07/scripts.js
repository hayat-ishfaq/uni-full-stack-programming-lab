const sortableList = document.getElementById('sortableList');
const newItemInput = document.getElementById('newItemInput');
const addItemBtn = document.getElementById('addItemBtn');
const resetBtn = document.getElementById('resetBtn');
const orderText = document.getElementById('orderText');

const defaultItems = [
    'Complete project documentation',
    'Review code changes',
    'Update team on progress',
    'Fix reported bugs',
    'Attend daily standup meeting',
    'Write unit tests'
];

let draggedElement = null;

function initializeList() {
    sortableList.innerHTML = '';
    defaultItems.forEach((item, index) => {
        createListItem(item);
    });
    updateOrderDisplay();
}

function createListItem(text) {
    const li = document.createElement('li');
    li.className = 'list-item';
    li.draggable = true;
    
    li.innerHTML = `
        <div class="item-content">
            <span class="drag-handle">☰</span>
            <span class="item-number">1</span>
            <span class="item-text">${text}</span>
        </div>
        <button class="delete-btn">Delete</button>
    `;
    
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        li.remove();
        updateItemNumbers();
        updateOrderDisplay();
    });
    
    li.addEventListener('dragstart', handleDragStart);
    li.addEventListener('dragend', handleDragEnd);
    li.addEventListener('dragover', handleDragOver);
    li.addEventListener('drop', handleDrop);
    li.addEventListener('dragenter', handleDragEnter);
    li.addEventListener('dragleave', handleDragLeave);
    
    sortableList.appendChild(li);
    updateItemNumbers();
}

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    
    const items = sortableList.querySelectorAll('.list-item');
    items.forEach(item => {
        item.classList.remove('drag-over');
    });
    
    updateItemNumbers();
    updateOrderDisplay();
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    if (this !== draggedElement) {
        this.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    if (draggedElement !== this) {
        const allItems = Array.from(sortableList.querySelectorAll('.list-item'));
        const draggedIndex = allItems.indexOf(draggedElement);
        const targetIndex = allItems.indexOf(this);
        
        if (draggedIndex < targetIndex) {
            this.parentNode.insertBefore(draggedElement, this.nextSibling);
        } else {
            this.parentNode.insertBefore(draggedElement, this);
        }
    }
    
    this.classList.remove('drag-over');
    return false;
}

function updateItemNumbers() {
    const items = sortableList.querySelectorAll('.list-item');
    items.forEach((item, index) => {
        const numberBadge = item.querySelector('.item-number');
        numberBadge.textContent = index + 1;
    });
}

function updateOrderDisplay() {
    const items = sortableList.querySelectorAll('.list-item');
    
    if (items.length === 0) {
        orderText.innerHTML = '<span class="empty-state">No items in the list</span>';
        return;
    }
    
    const orderArray = Array.from(items).map((item, index) => {
        const text = item.querySelector('.item-text').textContent;
        return `${index + 1}. ${text}`;
    });
    
    orderText.textContent = orderArray.join(' → ');
}

function addNewItem() {
    const text = newItemInput.value.trim();
    
    if (text === '') {
        newItemInput.focus();
        newItemInput.style.borderColor = '#f44336';
        setTimeout(() => {
            newItemInput.style.borderColor = '#e0e0e0';
        }, 1000);
        return;
    }
    
    createListItem(text);
    newItemInput.value = '';
    newItemInput.focus();
    updateOrderDisplay();
}

function resetList() {
    if (confirm('Are you sure you want to reset the list to default items?')) {
        initializeList();
    }
}

addItemBtn.addEventListener('click', addNewItem);
resetBtn.addEventListener('click', resetList);

newItemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addNewItem();
    }
});

initializeList();