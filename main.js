// Custom code to simulate the output of a hacking sequence
var code = `
Connecting to satellite...
Verifying connection...
Retrieving authentication token...
Decrypting data stream...
Data stream decrypted successfully...
Loading system configurations...
Attempting to establish remote access...
Remote access granted...
Confirm...`;

var OLDcode = `
Connecting to secondary system...
Verifying connection stability...
Loading additional modules...
Establishing remote link...
Process completed.`;

// Function to display code line by line
function displayCode(code, callback) {
    var terminal = document.getElementById("terminal");
    var lines = code.split('\n');
    var currentLine = 0;

    function appendLine() {
        if (currentLine < lines.length) {
            terminal.innerText += lines[currentLine] + '\n';

            // Show buttons when "Confirm..." is displayed
            if (lines[currentLine].includes("Confirm...")) {
                document.getElementById("yes").style.display = "inline-block";
                document.getElementById("no").style.display = "inline-block";
            }

            currentLine++;
            setTimeout(appendLine, 200); // Delay between lines
        } else if (callback) {
            callback();
        }
    }

    appendLine();
}

// Function to play sound
var audio;
function playSound() {
    audio = new Audio('sound.mp3');
    audio.play();
}

// Function to stop sound
function stopSound() {
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
}

document.getElementById("hack").addEventListener("click", function() {
    this.style.display = "none"; // Hide the "Start" button
    playSound(); // Play sound immediately
    displayCode(code, function() {
        displayCode(OLDcode, stopSound); // Display the OLDcode after the first sequence
    });

    // Make Yes and No buttons visible after 19 seconds
    setTimeout(() => {
        if (!document.getElementById("yes").style.display.includes('inline-block')) {
            document.getElementById("yes").style.display = "inline-block";
            document.getElementById("no").style.display = "inline-block";
        }
    }, 19000);
});

// Handle "Yes" and "No" button clicks
document.getElementById("yes").addEventListener("click", function() {
    document.getElementById("terminal").innerText += "[CONFIRMED] Satellite connection established...\n";
    document.getElementById("yes").style.display = "none";
    document.getElementById("no").style.display = "none";
    playSound(); // Resume sound after confirmation
    displayCode(OLDcode, stopSound); // Continue showing the next set of code
});

document.getElementById("no").addEventListener("click", function() {
    document.getElementById("terminal").innerText += "[CANCELED] Satellite connection aborted.\n";
    document.getElementById("yes").style.display = "none";
    document.getElementById("no").style.display = "none";
    playSound(); // Resume sound after cancellation
    displayCode(OLDcode, stopSound); // Continue showing the next set of code
});

// Scroll terminal to bottom every 100ms
setInterval(function() {
    var term = document.getElementById("terminal");
    term.scrollTop = term.scrollHeight;
}, 100);
