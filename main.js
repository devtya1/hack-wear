var code = `
<?php
echo "danbulant.eu presents...";
$someVar[0] = "Hacker Typer..";
echo "Loading system files...";
// Simulating lots of output for a longer time
for ($i = 0; $i < 100; $i++) {
    echo "Line $i - Loading more files...\n";
}
echo "Attempting to connect to a remote server...";
echo "<?php echo 'Send virus?' ?>";
?>`;

var OLDcode = `
#include <linux/delay.h>
#include <linux/init.h>
#include <linux/irqdomain.h>
#include <linux/pci.h>
#include <linux/msi.h>
#include <linux/pci_hotplug.h>
#include <linux/module.h>
#include <linux/pci-aspm.h>
#include <linux/pci-acpi.h>
#include <linux/pm_runtime.h>
#include <linux/pm_qos.h>
#include "pci.h"
/* Extended the code for a longer output */
const u8 pci_acpi_dsm_uuid[] = {
    0xd0, 0x37, 0xc9, 0xe5, 0x53, 0x35, 0x7a, 0x4d,
    0x91, 0x17, 0xea, 0x4d, 0x19, 0xc3, 0x43, 0x4d
};
for (int i = 0; i < 100; i++) {
    printk("PCI system loading... Step " + i + "\n");
}
phys_addr_t acpi_pci_root_get_mcfg_addr(acpi_handle handle)
{
    acpi_status status = AE_NOT_EXIST;
    unsigned long long mcfg_addr;
    if (handle)
        status = acpi_evaluate_integer(handle, METHOD_NAME__CBA,
                                       NULL, &mcfg_addr);
    if (ACPI_FAILURE(status))
        return 0;
    return (phys_addr_t)mcfg_addr;
}`;

// Function to display code line by line
function displayCode(code, callback) {
    var terminal = document.getElementById("terminal");
    var lines = code.split('\n'); // Split code into lines
    var currentLine = 0;

    // Function to append a line to the terminal
    function appendLine() {
        if (currentLine < lines.length) {
            // Special case for the 'Send virus?' line
            if (lines[currentLine].includes("<?php echo 'Send virus?' ?>")) {
                document.getElementById("yes").style.display = "inline-block";
                document.getElementById("no").style.display = "inline-block";
                stopSound(); // Stop sound on confirmation prompt
            } else {
                terminal.innerText += lines[currentLine] + '\n'; // Add line to terminal
            }
            currentLine++; // Move to next line
            setTimeout(appendLine, 200); // Call appendLine again after 200ms
        } else if (callback) {
            callback(); // When done, call the callback function if provided
        }
    }

    appendLine(); // Start appending lines
}

// Function to play sound
var audio;
function playSound() {
    audio = new Audio('sound.mp4');
    audio.play();
}

// Function to stop sound
function stopSound() {
    if (audio) {
        audio.pause();
        audio.currentTime = 0; // Reset the sound to start
    }
}

document.getElementById("hack").addEventListener("click", function() {
    // Hide the start button
    this.style.display = "none";

    // Play sound
    playSound();

    // Display the code
    displayCode(code, function() {
        // Continue with the old code after new code finishes
        displayCode(OLDcode, stopSound); // Stop sound once OLDcode finishes
    });
});

// Handle the "Yes" and "No" button clicks
document.getElementById("yes").addEventListener("click", function() {
    document.getElementById("terminal").innerText += "[CONFIRMED] Virus sent...\n";
    document.getElementById("yes").style.display = "none";
    document.getElementById("no").style.display = "none";
    displayCode(OLDcode, stopSound); // Continue after confirmation, stop sound when done
});

document.getElementById("no").addEventListener("click", function() {
    document.getElementById("terminal").innerText += "[CANCELED] Virus not sent.\n";
    document.getElementById("yes").style.display = "none";
    document.getElementById("no").style.display = "none";
    displayCode(OLDcode, stopSound); // Continue after cancellation, stop sound when done
});

// Scroll terminal to bottom every 100ms
setInterval(function() {
    var term = document.getElementById("terminal");
    term.scrollTop = term.scrollHeight;
}, 100);
