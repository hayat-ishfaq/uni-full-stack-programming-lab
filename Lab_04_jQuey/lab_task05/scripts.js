const text = document.getElementById('editableText');
const textBox = document.getElementById('textBox');
const boldBtn = document.getElementById('boldBtn');
const italicBtn = document.getElementById('italicBtn');
const underlineBtn = document.getElementById('underlineBtn');

function applyStyles(element, styles) {
    Object.keys(styles).forEach(key => {
        element.style[key] = styles[key];
    });
    return element;
}

function changeFontSize(size) {
    const sizes = {
        'small': '14px',
        'medium': '18px',
        'large': '24px',
        'xlarge': '32px'
    };
    
    applyStyles(text, {
        fontSize: sizes[size]
    });
}

function changeTextColor(color) {
    applyStyles(text, {
        color: color
    });
}

function changeBgColor(color) {
    applyStyles(textBox, {
        backgroundColor: color
    });
}

function toggleBold() {
    const currentWeight = text.style.fontWeight;
    
    applyStyles(text, {
        fontWeight: currentWeight === 'bold' ? 'normal' : 'bold'
    });
    
    boldBtn.classList.toggle('active');
}

function toggleItalic() {
    const currentStyle = text.style.fontStyle;
    
    applyStyles(text, {
        fontStyle: currentStyle === 'italic' ? 'normal' : 'italic'
    });
    
    italicBtn.classList.toggle('active');
}

function toggleUnderline() {
    const currentDecoration = text.style.textDecoration;
    
    applyStyles(text, {
        textDecoration: currentDecoration === 'underline' ? 'none' : 'underline'
    });
    
    underlineBtn.classList.toggle('active');
}

function applyPreset1() {
    applyStyles(text, {
        fontSize: '24px',
        color: '#e74c3c',
        fontWeight: 'bold',
        fontStyle: 'normal',
        textDecoration: 'none'
    });
    
    applyStyles(textBox, {
        backgroundColor: '#fff3cd'
    });
    
    updateToggleButtons();
}

function applyPreset2() {
    applyStyles(text, {
        fontSize: '18px',
        color: '#3498db',
        fontWeight: 'normal',
        fontStyle: 'italic',
        textDecoration: 'underline'
    });
    
    applyStyles(textBox, {
        backgroundColor: '#d1ecf1'
    });
    
    updateToggleButtons();
}

function applyPreset3() {
    applyStyles(text, {
        fontSize: '32px',
        color: '#9b59b6',
        fontWeight: 'bold',
        fontStyle: 'italic',
        textDecoration: 'none'
    });
    
    applyStyles(textBox, {
        backgroundColor: '#d4edda'
    });
    
    updateToggleButtons();
}

function resetStyles() {
    applyStyles(text, {
        fontSize: '16px',
        color: '#000000',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: 'none'
    });
    
    applyStyles(textBox, {
        backgroundColor: '#ffffff'
    });
    
    boldBtn.classList.remove('active');
    italicBtn.classList.remove('active');
    underlineBtn.classList.remove('active');
}

function updateToggleButtons() {
    if (text.style.fontWeight === 'bold') {
        boldBtn.classList.add('active');
    } else {
        boldBtn.classList.remove('active');
    }
    
    if (text.style.fontStyle === 'italic') {
        italicBtn.classList.add('active');
    } else {
        italicBtn.classList.remove('active');
    }
    
    if (text.style.textDecoration === 'underline') {
        underlineBtn.classList.add('active');
    } else {
        underlineBtn.classList.remove('active');
    }
}
