document.addEventListener("DOMContentLoaded", function() {
    const slider = document.getElementById("rangeSlider");
    const icon = document.getElementById("sliderIcon");

    // Function to update the icon's position and image source
    function updateIcon() {
        const value = slider.value;
        const min = slider.min ? slider.min : 0;
        const max = slider.max ? slider.max : 100;
        const percent = (value - min) / (max - min) * 100;

        // Update the icon's position
        const sliderWidth = slider.offsetWidth;
        const iconWidth = icon.offsetWidth;
        const offset = ((percent / 100) * sliderWidth - (iconWidth / 100));
        icon.style.left = `${offset}px`;

        // Update the icon's image source based on the slider value
        if (value < 40) {
            icon.src = 'images/icons/poop.png';  // Image for values below 40
        } else if (value < 80) {
            icon.src = 'images/icons/heart.png';  // Image for values between 40 and 80
        } else {
            icon.src = 'images/icons/lips.png';  // Image for values above 80
        }
    }

    // Update the icon when the slider is moved
    slider.addEventListener("input", updateIcon);

    // Initial position and icon
    updateIcon();
});
