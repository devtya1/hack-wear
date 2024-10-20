var code = `
<?php
echo "danbulant.eu presents...";
$someVar[0] = "Hacker Typer..";
echo "Loading system files...";
echo "Connecting to the server...";
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
/*
 * The UUID is defined in the PCI Firmware Specification available here:
 * https://www.pcisig.com/members/downloads/pcifw_r3_1_13Dec10.pdf
 */
const u8 pci_acpi_dsm_uuid[] = {
    0xd0, 0x37, 0xc9, 0xe5, 0x53, 0x35, 0x7a, 0x4d,
    0x91, 0x17, 0xea, 0x4d, 0x19, 0xc3, 0x43, 0x4d
};
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
function displayCode(code) {
    var terminal = document.getElementById("terminal");
    var lines = code.split('\n'); // Split code into lines
    var currentLine = 0;

    // Function to append a line to the terminal
    function appendLine() {
        if (currentLine < lines.length) {
            // Check for special 'confirm' action
            if (lines[currentLine].includes("<?php echo 'Send virus?' ?>")) {
                // If confirm action, pause and ask the user
                if (confirm("Send virus?")) {
                    terminal.innerText += "[CONFIRMED] Virus sent...\n";
                } else {
                    terminal.innerText += "[CANCELED] Action aborted.\n";
                }
            } else {
                // Add the normal line to terminal
                terminal.innerText += lines[currentLine] + '\n';
            }
            currentLine++; // Move to the next line
            setTimeout(appendLine, 200); // Call appendLine again after 200ms
        }
    }

    appendLine(); // Start appending lines
}

// Play sound when the button is clicked
function playSound() {
    var audio = new Audio('sound.mp4');
    audio.play();
}

document.getElementById("hack").addEventListener("click", function() {
    // Hide the button
    this.style.display = "none";

    // Play the sound
    playSound();

    // Display the code line by line
    displayCode(code);
    setTimeout(function() {
        displayCode(OLDcode); // Display OLDcode after code is done
    }, code.split('\n').length * 200); // Adjust the timing based on code length
});

// Scroll terminal to the bottom every 100ms
setInterval(function() {
    var term = document.getElementById("terminal");
    term.scrollTop = term.scrollHeight;
}, 100);
