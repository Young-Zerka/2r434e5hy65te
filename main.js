// Module 1: Typewriter effect
const textElement = document.getElementById('typer');
const textsToType = [
    "Web Designer",
    "Back-end Developer",
    "Software Engineer",
    "3D Artist",
    "Electronic Engineer",
    "Electronics Repair Technician"
];
let textIndex = 0;
let charIndex = 0;

function typeText() {
    // Starts here
    if (textIndex < textsToType.length) {
        if (charIndex < textsToType[textIndex].length) {
            textElement.textContent += textsToType[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 100);
        } else {
            setTimeout(eraseText, 1000);
        }
    }
    // Ends here
}

function eraseText() {
    // Starts here
    if (charIndex >= 0) {
        textElement.textContent = textsToType[textIndex].substring(0, charIndex);
        charIndex--;
        setTimeout(eraseText, 50);
    } else {
        textIndex++;
        if (textIndex >= textsToType.length) {
            textIndex = 0;
        }
        setTimeout(typeText, 1000);
    }
    // Ends here
}

typeText();