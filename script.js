var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

// Audio elements
const irisAudio = document.getElementById("iris-audio");
const heavenAudio = document.getElementById("heaven-audio");
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("startButton");

// Slideshow elements
const slideshowContainer = document.getElementById("slideshow-container");
const slides = document.querySelectorAll(".slide");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const currentSlideSpan = document.querySelector(".current-slide");
const totalSlidesSpan = document.querySelector(".total-slides");
const finalMessage = document.getElementById("final-message");

let currentSlideIndex = 0;
let slideshowInterval = null;
const SLIDE_DURATION = 6000; // 6 seconds per slide

// Color scheme: Turquoise and Red (alternating)
const colors = [
    { color: "rgba(64, 224, 208", shadow: "rgba(64, 224, 208, 1)" }, // Turquoise
    { color: "rgba(220, 20, 60", shadow: "rgba(220, 20, 60, 1)" }     // Crimson Red
];
let currentColorIndex = 0;

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize stars with random opacity values
for (var i = 0; i < stars; i++) {
    var x = Math.random() * canvas.offsetWidth;
    var y = Math.random() * canvas.offsetHeight;
    var radius = Math.random() * 1.2;
    var hue = colorrange[getRandom(0, colorrange.length - 1)];
    var sat = getRandom(50, 100);
    var opacity = Math.random();
    starArray.push({ x, y, radius, hue, sat, opacity });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

var baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);

function drawStars() {
    for (var i = 0; i < stars; i++) {
        var star = starArray[i];

        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 360);
        context.fillStyle = "hsla(" + star.hue + ", " + star.sat + "%, 88%, " + star.opacity + ")";
        context.fill();
    }
}

function updateStars() {
    for (var i = 0; i < stars; i++) {
        if (Math.random() > 0.99) {
            starArray[i].opacity = Math.random();
        }
    }
}

// Start button functionality
startButton.addEventListener("click", () => {
    startScreen.style.opacity = "0";
    startScreen.style.transition = "opacity 1s ease";

    setTimeout(() => {
        startScreen.style.display = "none";
        // Start Iris music with fade in
        fadeInAudio(irisAudio, 1.5);
    }, 1000);
});

// Audio fade functions
function fadeInAudio(audio, duration) {
    audio.volume = 0;
    audio.play().catch(e => console.log("Audio play failed:", e));

    let vol = 0;
    const step = 0.05;
    const fadeAudioIn = setInterval(() => {
        if (vol < 1) {
            vol += step;
            audio.volume = Math.min(vol, 1);
        } else {
            clearInterval(fadeAudioIn);
        }
    }, (duration * 1000) / (1 / step));
}

function fadeOutAudio(audio, duration) {
    let vol = audio.volume;
    const step = 0.05;
    const fadeAudioOut = setInterval(() => {
        if (vol > 0) {
            vol -= step;
            audio.volume = Math.max(vol, 0);
        } else {
            clearInterval(fadeAudioOut);
            audio.pause();
            audio.currentTime = 0;
        }
    }, (duration * 1000) / (1 / step));
}

// Get current color for messages
function getCurrentColor() {
    return colors[currentColorIndex];
}

function nextColor() {
    currentColorIndex = (currentColorIndex + 1) % colors.length;
}

const button = document.getElementById("valentinesButton");

button.addEventListener("click", () => {
    // Fade out canvas and button
    canvas.style.transition = "opacity 1s ease";
    canvas.style.opacity = "0";
    button.style.transition = "opacity 1s ease";
    button.style.opacity = "0";

    // Fade out Iris, fade in Heaven
    fadeOutAudio(irisAudio, 2);

    setTimeout(() => {
        canvas.style.display = "none";
        button.style.display = "none";

        // Show slideshow
        slideshowContainer.style.display = "block";
        slideshowContainer.style.opacity = "0";
        setTimeout(() => {
            slideshowContainer.style.transition = "opacity 1s ease";
            slideshowContainer.style.opacity = "1";
        }, 50);

        // Start Heaven music
        fadeInAudio(heavenAudio, 2);

        // Initialize slideshow
        showSlide(0);
        startSlideshow();
    }, 1000);
});

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    lines.forEach((line, index) => {
        context.fillText(line, x, y + index * (fontSize + lineHeight));
    });
}

function drawText() {
    var fontSize = Math.min(30, window.innerWidth / 24);
    var lineHeight = 8;

    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";

    if(frameNumber < 250){
        const color = getCurrentColor();
        context.shadowColor = color.shadow;
        context.shadowBlur = 8;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.fillStyle = `${color.color}, ${opacity})`;
        context.fillText("everyday I cannot believe how lucky I am", canvas.width/2, canvas.height/2);
        opacity = opacity + 0.01;
    }
    if(frameNumber >= 250 && frameNumber < 500){
        const color = getCurrentColor();
        context.shadowColor = color.shadow;
        context.shadowBlur = 8;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.fillStyle = `${color.color}, ${opacity})`;
        context.fillText("everyday I cannot believe how lucky I am", canvas.width/2, canvas.height/2);
        opacity = opacity - 0.01;
    }

    if(frameNumber == 500){
        opacity = 0;
        nextColor();
    }
    if(frameNumber > 500 && frameNumber < 750){
        const color = getCurrentColor();
        context.shadowColor = color.shadow;
        context.shadowBlur = 8;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.fillStyle = `${color.color}, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["amongst trillions and trillions of stars,", "over billions of years"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("amongst trillions and trillions of stars, over billions of years", canvas.width/2, canvas.height/2);
        }

        opacity = opacity + 0.01;
    }
    if(frameNumber >= 750 && frameNumber < 1000){
        const color = getCurrentColor();
        context.shadowColor = color.shadow;
        context.shadowBlur = 8;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.fillStyle = `${color.color}, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["amongst trillions and trillions of stars,", "over billions of years"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("amongst trillions and trillions of stars, over billions of years", canvas.width/2, canvas.height/2);
        }

        opacity = opacity - 0.01;
    }

    if(frameNumber == 1000){
        opacity = 0;
        nextColor();
    }
    if(frameNumber > 1000 && frameNumber < 1250){
        const color = getCurrentColor();
        context.shadowColor = color.shadow;
        context.shadowBlur = 8;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.fillStyle = `${color.color}, ${opacity})`;
        context.fillText("to be alive, and to get to spend this life with you", canvas.width/2, canvas.height/2);
        opacity = opacity + 0.01;
    }
    if(frameNumber >= 1250 && frameNumber < 1500){
        const color = getCurrentColor();
        context.shadowColor = color.shadow;
        context.shadowBlur = 8;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.fillStyle = `${color.color}, ${opacity})`;
        context.fillText("to be alive, and to get to spend this life with you", canvas.width/2, canvas.height/2);
        opacity = opacity - 0.01;
    }

    if(frameNumber == 1500){
        opacity = 0;
        nextColor();
    }
    if(frameNumber > 1500 && frameNumber < 1750){
        const color = getCurrentColor();
        context.shadowColor = color.shadow;
        context.shadowBlur = 8;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.fillStyle = `${color.color}, ${opacity})`;
        context.fillText("is so incredibly, unfathomably unlikely", canvas.width/2, canvas.height/2);
        opacity = opacity + 0.01;
    }
    if(frameNumber >= 1750 && frameNumber < 2000){
        const color = getCurrentColor();
        context.shadowColor = color.shadow;
        context.shadowBlur = 8;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.fillStyle = `${color.color}, ${opacity})`;
        context.fillText("is so incredibly, unfathomably unlikely", canvas.width/2, canvas.height/2);
        opacity = opacity - 0.01;
    }

    if(frameNumber == 2000){
        opacity = 0;
        nextColor();
    }
    if(frameNumber > 2000 && frameNumber < 2250){
        const color = getCurrentColor();
        context.shadowColor = color.shadow;
        context.shadowBlur = 8;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.fillStyle = `${color.color}, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["and yet here I am to get the impossible", "chance to get to know you"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("and yet here I am to get the impossible chance to get to know you", canvas.width/2, canvas.height/2);
        }

        opacity = opacity + 0.01;
    }
    if(frameNumber >= 2250 && frameNumber < 2500){
        const color = getCurrentColor();
        context.shadowColor = color.shadow;
        context.shadowBlur = 8;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.fillStyle = `${color.color}, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["and yet here I am to get the impossible", "chance to get to know you"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("and yet here I am to get the impossible chance to get to know you", canvas.width/2, canvas.height/2);
        }

        opacity = opacity - 0.01;
    }

    if(frameNumber == 2500){
        opacity = 0;
        nextColor();
    }
    if(frameNumber > 2500 && frameNumber < 99999){
        const color = getCurrentColor();
        context.shadowColor = color.shadow;
        context.shadowBlur = 8;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.fillStyle = `${color.color}, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["I love you so much Aly, more than", "all the time and space in the universe can contain"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("I love you so much Aly, more than all the time and space in the universe can contain", canvas.width/2, canvas.height/2);
        }

        opacity = opacity + 0.01;
    }

    if(frameNumber >= 2750 && frameNumber < 99999){
        const color = colors[(currentColorIndex + 1) % colors.length];
        context.shadowColor = color.shadow;
        context.shadowBlur = 8;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.fillStyle = `${color.color}, ${secondOpacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["and I can't wait to spend all the time in", "the world to share that love with you!"], canvas.width / 2, (canvas.height/2 + 60), fontSize, lineHeight);
        } else {
            context.fillText("and I can't wait to spend all the time in the world to share that love with you!", canvas.width/2, (canvas.height/2 + 50));
        }

        secondOpacity = secondOpacity + 0.01;
    }

    if(frameNumber >= 3000 && frameNumber < 99999){
        const color = getCurrentColor();
        context.shadowColor = color.shadow;
        context.shadowBlur = 8;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.fillStyle = `${color.color}, ${thirdOpacity})`;
        context.fillText("Happy Valentine's Day <3", canvas.width/2, (canvas.height/2 + 120));
        thirdOpacity = thirdOpacity + 0.01;

        button.style.display = "block";
    }

     // Reset the shadow effect after drawing the text
     context.shadowColor = "transparent";
     context.shadowBlur = 0;
     context.shadowOffsetX = 0;
     context.shadowOffsetY = 0;
}

function draw() {
    context.putImageData(baseFrame, 0, 0);

    drawStars();
    updateStars();
    drawText();

    if (frameNumber < 99999) {
        frameNumber++;
    }
    window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);
});

// Slideshow Functions
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        if (i === index) {
            slide.classList.add("active");

            // Handle video playback
            const video = slide.querySelector("video");
            if (video) {
                video.currentTime = 0;
                video.play().catch(e => console.log("Video play failed:", e));

                // Auto-advance when video ends
                video.onended = () => {
                    nextSlide();
                };
            }
        } else {
            // Pause video if not active
            const video = slide.querySelector("video");
            if (video) {
                video.pause();
            }
        }
    });

    currentSlideIndex = index;
    currentSlideSpan.textContent = index + 1;
}

function nextSlide() {
    let nextIndex = currentSlideIndex + 1;

    if (nextIndex >= slides.length) {
        // End of slideshow, show final message
        clearInterval(slideshowInterval);
        transitionToFinalMessage();
    } else {
        showSlide(nextIndex);
    }
}

function prevSlide() {
    let prevIndex = currentSlideIndex - 1;
    if (prevIndex < 0) {
        prevIndex = slides.length - 1;
    }
    showSlide(prevIndex);

    // Reset auto-advance timer
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        startSlideshow();
    }
}

function startSlideshow() {
    slideshowInterval = setInterval(() => {
        // Check if current slide has a video
        const currentSlide = slides[currentSlideIndex];
        const video = currentSlide.querySelector("video");

        // Only auto-advance if it's not a video (videos handle their own advancement)
        if (!video) {
            nextSlide();
        }
    }, SLIDE_DURATION);
}

function transitionToFinalMessage() {
    slideshowContainer.style.transition = "opacity 1s ease";
    slideshowContainer.style.opacity = "0";

    setTimeout(() => {
        slideshowContainer.style.display = "none";
        finalMessage.style.display = "flex";
        finalMessage.classList.add("active");
        finalMessage.style.opacity = "0";

        setTimeout(() => {
            finalMessage.style.transition = "opacity 1s ease";
            finalMessage.style.opacity = "1";
        }, 50);
    }, 1000);
}

// Navigation button event listeners
prevButton.addEventListener("click", prevSlide);
nextButton.addEventListener("click", () => {
    nextSlide();
    // Reset auto-advance timer
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        startSlideshow();
    }
});

// Set total slides
totalSlidesSpan.textContent = slides.length;

// Start the animation
window.requestAnimationFrame(draw);
