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
    "Dedo na pleaseeee!!!",
    "请索取",
    "Sorry na yaar",
    "对不起宝贝",
    "Forgive me!!",
    "Please accept my apologies!!",
    "Lo siento",


];

// Generate a random number between 1 and 16 for the GIF path
let randomNumber = Math.floor(Math.random() * 15) + 1;

// Generate a random index for the message (0 to 6)
let randomMessageIndex = Math.floor(Math.random() * content.length);

// Get the corresponding message
let randomMessage = content[randomMessageIndex];

// Set the GIF path
let gif = `${randomNumber}.gif`;

// Get the elements by their IDs
const message = document.getElementById("message");
const image = document.getElementById("gif");
const yes = document.getElementById("yes");
const no = document.getElementById("no");
const option=document.getElementById("option");
const maafi=document.getElementById("maafi");
// Set the message and image source
message.innerText = randomMessage;
image.src = `./images/${gif}`;

no.addEventListener("click", function() {
    randomMessageIndex = Math.floor(Math.random() * content.length);

// Get the corresponding message
randomMessage = content[randomMessageIndex];
randomNumber = Math.floor(Math.random() * 22) + 1;
message.innerText = randomMessage;
gif = `${randomNumber}.gif`;
image.src = `./images/${gif}`;   
});

yes.addEventListener('click',()=>{
message.innerText="Thanks a lot babe a kissi for you";
image.src = `./images/kiss.gif`;
option.style.display="none";
maafi.style.display="none";
image.style.height="450px";

});
