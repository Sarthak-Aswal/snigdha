// Birthday Configuration
// Set your girlfriend's birthday here
const BIRTHDAY_CONFIG = {
  // Format: Month (0-11), Day, Year
  // Example: December 25, 2024 would be:
  // date: new Date(2024, 11, 25), // Month is 0-based (0 = January, 11 = December)
  date: new Date(2025, 4, 20), // Change this to her actual birthday!
  
  // Birthday person's name
  name: "Sweetheart",
  
  // Custom messages to display randomly
  messages: [
    "I can't wait to celebrate the day you came into this world, because that day changed mine forever. ❤️",
    "Counting down the moments until I can celebrate the most special person in my life!",
    "Every second that passes brings me closer to celebrating you. I can't wait!",
    "Your birthday is my favorite day of the year, because it's the day you were born!",
    "The universe became more beautiful the day you were born, and I'm counting down until we celebrate!",
  ],
  
  // Change the photo URL to a photo of you two together
  photoUrl: "https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg",
  
  // Background music URL - you can change this to a song she likes
  musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
};

// Don't change anything below this line unless you know what you're doing
// -----------------------------------------------------------------------

// Validate the birthday date
if (isNaN(BIRTHDAY_CONFIG.date.getTime())) {
  console.error("Error: Please set a valid date in the config.js file!");
  // Set a default date (example: 30 days from now)
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 30);
  BIRTHDAY_CONFIG.date = defaultDate;
}

// Calculate next occurrence of the birthday
function getNextBirthday(birthdayDate) {
  const today = new Date();
  const nextBirthday = new Date(today.getFullYear(), birthdayDate.getMonth(), birthdayDate.getDate());
  
  // If the birthday has already occurred this year, set it for next year
  if (today > nextBirthday) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  
  return nextBirthday;
}

// Export the configuration
const CONFIG = {
  birthday: getNextBirthday(BIRTHDAY_CONFIG.date),
  name: BIRTHDAY_CONFIG.name,
  messages: BIRTHDAY_CONFIG.messages,
  photoUrl: BIRTHDAY_CONFIG.photoUrl,
  musicUrl: BIRTHDAY_CONFIG.musicUrl
};