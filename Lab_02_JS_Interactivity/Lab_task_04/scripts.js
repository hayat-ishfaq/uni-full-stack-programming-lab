function addColorBox(inputNumber) {
    const colorInput = document.getElementById(`color${inputNumber}`);
    const colorValue = colorInput.value.trim();
    
    if (!colorValue) {
        alert('Please enter a color!');
        return;
    }
    
    if (!isValidColor(colorValue)) {
        alert('Invalid color! Use color names (red, blue), hex (#ff0000), or rgb(255,0,0)');
        return;
    }
    
    createBox(colorValue, inputNumber);
    colorInput.value = '';
    updateBoxCount();
}

function isValidColor(color) {
    const tempElement = document.createElement('div');
    tempElement.style.color = color;
    return tempElement.style.color !== '';
}

function createBox(color, inputNumber) {
    const boxesContainer = document.getElementById('boxes-container');
    
    const boxWrapper = document.createElement('div');
    boxWrapper.className = 'box-wrapper';
    
    const colorBox = document.createElement('div');
    colorBox.className = 'color-box';
    colorBox.style.backgroundColor = color;
    
    const colorLabel = document.createElement('div');
    colorLabel.className = 'color-label';
    colorLabel.textContent = color;
    
    const inputLabel = document.createElement('div');
    inputLabel.className = 'input-label';
    inputLabel.textContent = `From Input ${inputNumber}`;
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-box-btn';
    removeBtn.textContent = '×';
    removeBtn.onclick = function() {
        removeBox(boxWrapper);
    };
    
    colorBox.appendChild(removeBtn);
    boxWrapper.appendChild(colorBox);
    boxWrapper.appendChild(colorLabel);
    boxWrapper.appendChild(inputLabel);
    
    boxesContainer.appendChild(boxWrapper);
    
    boxWrapper.style.animation = 'slideIn 0.4s ease';
}

function removeBox(boxElement) {
    boxElement.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
        boxElement.remove();
        updateBoxCount();
    }, 300);
}

function clearAllBoxes() {
    const boxesContainer = document.getElementById('boxes-container');
    const allBoxes = boxesContainer.querySelectorAll('.box-wrapper');
    
    if (allBoxes.length === 0) {
        alert('No boxes to clear!');
        return;
    }
    
    for (let i = 0; i < allBoxes.length; i++) {
        allBoxes[i].style.animation = 'slideOut 0.3s ease';
    }
    
    setTimeout(() => {
        boxesContainer.innerHTML = '';
        updateBoxCount();
    }, 300);
}

function updateBoxCount() {
    const boxesContainer = document.getElementById('boxes-container');
    const boxCount = boxesContainer.querySelectorAll('.box-wrapper').length;
    const boxCountElement = document.getElementById('box-count');
    boxCountElement.textContent = `Total Boxes: ${boxCount}`;
}

function updateBOMInfo() {
    document.getElementById('window-width').textContent = window.innerWidth + 'px';
    document.getElementById('window-height').textContent = window.innerHeight + 'px';
    document.getElementById('screen-width').textContent = window.screen.width + 'px';
    document.getElementById('screen-height').textContent = window.screen.height + 'px';
    
    const userAgent = navigator.userAgent;
    let browserName = 'Unknown';
    
    if (userAgent.indexOf('Firefox') > -1) {
        browserName = 'Mozilla Firefox';
    } else if (userAgent.indexOf('Chrome') > -1) {
        browserName = 'Google Chrome';
    } else if (userAgent.indexOf('Safari') > -1) {
        browserName = 'Safari';
    } else if (userAgent.indexOf('Edge') > -1) {
        browserName = 'Microsoft Edge';
    } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) {
        browserName = 'Internet Explorer';
    }
    
    document.getElementById('browser-name').textContent = browserName;
    document.getElementById('platform').textContent = navigator.platform;
    document.getElementById('language').textContent = navigator.language;
    document.getElementById('online-status').textContent = navigator.onLine ? 'Online ✓' : 'Offline ✗';
}

document.getElementById('color1').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addColorBox(1);
    }
});

document.getElementById('color2').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addColorBox(2);
    }
});

document.getElementById('color3').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addColorBox(3);
    }
});

window.onload = function() {
    updateBoxCount();
    updateBOMInfo();
};

window.onresize = function() {
    updateBOMInfo();
};