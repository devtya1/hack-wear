var code = `
<?php
echo "danbulant.eu presents...";
$someVar[0] = "Hacker Typer..";
echo "Loading system files...";
for ($i = 0; $i < 100; $i++) {
    echo "Line $i - Loading more files...\\n";
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
    printk("PCI system loading... Step " + i + "\\n");
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
    var lines = code.split('\n');
    var currentLine = 0;

    function appendLine() {
        if (currentLine < lines.length) {
            if (lines[currentLine].includes("<?php echo 'Send virus?' ?>")) {
                stopSound(); // Stop sound after 9 seconds
                setTimeout(() => {
                    document.getElementById("yes").style.display = "inline-block";
                    document.getElementById("no").style.display = "inline-block";
                }, 9000); // Show buttons after 9 seconds
            } else {
                terminal.innerText += lines[currentLine] + '\n';
            }
            currentLine++;
            setTimeout(appendLine, 200); // Continue after 200ms delay for each line
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
    playSound(); // Play sound

    setTimeout(stopSound, 9000); // Stop sound after 9 seconds
    setTimeout(() => {
        displayCode(code, function() {
            displayCode(OLDcode, stopSound); // Stop sound after OLDcode finishes
        });
    }, 9000); // Start showing the code after 9 seconds
});

// Handle "Yes" and "No" button clicks
document.getElementById("yes").addEventListener("click", function() {
    document.getElementById("terminal").innerText += "[CONFIRMED] Virus sent...\n";
    document.getElementById("yes").style.display = "none";
    document.getElementById("no").style.display = "none";
    playSound(); // Resume sound after confirmation
    displayCode(OLDcode, stopSound); // Continue showing the next set of code
});

document.getElementById("no").addEventListener("click", function() {
    document.getElementById("terminal").innerText += "[CANCELED] Virus not sent.\n";
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
