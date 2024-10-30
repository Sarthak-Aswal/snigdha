const content = [
    "Sorry Snigdha!!!",
    "Maafi dedo",
    "Pleaseeee!!!",
    "Pleaseeee Pleaseeeee!!!",
    "对不起",
    "我非常非常抱歉",
    "Last Chance Pleaseeee",
    "Please na yaar!!!",
    "Yahi dosti yahi Pyaar???",
    "Aisa karoge??",
    "Maafi Dedo na pleaseeee!!!",
    "请索取",
    "Sorry na yaar",
    "对不起宝贝",
    "Forgive me!!",
    "Please accept my apologies!!",
    "Lo siento",
    "Maaf Kardo",
];
const message = document.getElementById("message");
const image = document.getElementById("gif");
const yes = document.getElementById("yes");
const no = document.getElementById("no");
const option = document.getElementById("option");
const maafi = document.getElementById("maafi");
// Generate a random number for the GIF path
let randomNumber = Math.floor(Math.random() * 15) + 1;
let gif = `${randomNumber}.gif`;
image.src = `./images/${gif}`; // Ensure this path is correct

let randomMessageIndex = Math.floor(Math.random() * content.length);

let randomMessage = content[randomMessageIndex];
message.innerText = randomMessage;
randomNumber = Math.floor(Math.random() * 15) + 1;
randomMessageIndex = Math.floor(Math.random() * content.length);
no.addEventListener("click", function () {
    gif = `${randomNumber}.gif`;
    image.src = `./images/${gif}`;
    
    randomMessage = content[randomMessageIndex];
   
    message.innerText = randomMessage;
    randomMessageIndex = Math.floor(Math.random() * content.length);
    randomNumber = Math.floor(Math.random() * 15) + 1;
});

yes.addEventListener('click', () => {
    message.innerText = "Thanks a lot babe a kissi for you";
    image.src = `./images/kiss.gif`; // Ensure this path is correct
    option.style.display = "none";
    maafi.style.display = "none";
    image.style.height = "450px"; // Adjust if needed
});
