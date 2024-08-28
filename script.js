document.addEventListener('DOMContentLoaded', function () {
    const display = document.querySelector('input[name="display"]');
    const historyContainer = document.getElementById('history');
    const clearButton = document.querySelector('#clearBtn');

    // Function to add the 'active' class
    function triggerButtonEffect(key) {
        const button = document.querySelector(`input[value="${key}"]`);
        if (button) {
            button.classList.add('active');
            setTimeout(() => {
                button.classList.remove('active');
            }, 100);
        }
    }

    // Function to save result to local storage
    function saveResult(result) {
        if (result === null || result === undefined || result === "") {
            return;
        }
    
        let history = JSON.parse(localStorage.getItem('calcHistory')) || [];
        history.push(result);
        localStorage.setItem('calcHistory', JSON.stringify(history));
        displayHistory();
    }

    // Function to display history
    function displayHistory() {
        let history = JSON.parse(localStorage.getItem('calcHistory')) || [];
        historyContainer.innerHTML = '';
        history.forEach((item, index) => {
            let div = document.createElement('div');
            div.className = 'res-box px-4';
            
            // Alternate background color
            if (index % 2 === 0) {
                div.style.backgroundColor = '#292929';
            } else {
                div.style.backgroundColor = '#3b3b3b';
            }
            
            div.innerHTML = `<p>${item}</p>`;
            historyContainer.appendChild(div);
        });
    }
    
    // Function to clear history
    function clearHistory() {
        let history = JSON.parse(localStorage.getItem('calcHistory')) || [];
    
        if (history.length === 0) {
            alert('No history to clear.');
        } else {
            if (confirm('Are you sure you want to clear the history?')) {
                localStorage.removeItem('calcHistory');
                displayHistory();
            }
        }
    }
    
    
    // Handle keyboard input Button Pressing
    document.addEventListener('keydown', function (event) {
        const key = event.key;

        if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '.'].includes(key)) {
            if (display.value === "") {
                display.value = key;
            } else {
                display.value += key;
            }
            triggerButtonEffect(key);
        } else if (key === 'Enter') {
            let result = eval(display.value);
            display.value = result;
            display.value = "";
            triggerButtonEffect('=');
            saveResult(result);
        } else if (key === 'Backspace') {
            display.value = display.value.slice(0, -1);
            triggerButtonEffect('DEL');
        } else if (key === 'Escape') {
            display.value = "";
            triggerButtonEffect('AC');
        }
    });

    // Handle mouse clicks
    const buttons = document.querySelectorAll('input[type="button"]');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function () {
            button.classList.add('active');
        });

        button.addEventListener('mouseup', function () {
            button.classList.remove('active');
        });

        button.addEventListener('mouseleave', function () {
            button.classList.remove('active');
        });

        button.addEventListener('click', function () {
            if (this.value === '=') {
                let result = eval(display.value);
                display.value = result;
                display.value = "";

                saveResult(result);
            }
        });
    });

    // Display history on page load
    displayHistory();

    // Handle clear button click
    clearButton.addEventListener('click', function () {
        clearHistory();
    });
});
