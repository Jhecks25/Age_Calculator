// Get form inputs
const myDay = document.querySelector(".day");
const myMonth = document.querySelector(".month");
const myYear = document.querySelector(".year");
const arrowIcon = document.querySelector(".arrow-icon");
const displayinfo = document.querySelectorAll(".displayinfo");
const errorMessage = document.querySelectorAll(".errormessage");

// Get today's date
function todaysDate() {
  return new Date();
}

// Validate user input
function validateUserData(day, month, year) {
  const currentDate = todaysDate();
  const thirtyDaysMonth = [3, 5, 8, 10]; // April, June, Sept, Nov (0-indexed)
  const thirtyOneDaysMonth = [0, 2, 4, 6, 7, 9, 11]; // Jan, Mar, etc.

  // Clear old errors
  errorMessage.forEach((err) => (err.textContent = ""));

  let isValid = true;

  if (year > currentDate.getFullYear()) {
    errorMessage[2].textContent = "Must be a valid year";
    isValid = false;
  }

  if (
    month < 0 ||
    month > 11 ||
    (year === currentDate.getFullYear() && month > currentDate.getMonth())
  ) {
    errorMessage[1].textContent = "Must be a valid month";
    isValid = false;
  }

  if (
    (thirtyDaysMonth.includes(month) && (day < 1 || day > 30)) ||
    (month === 1 && (day < 1 || day > 29)) ||
    (thirtyOneDaysMonth.includes(month) && (day < 1 || day > 31))
  ) {
    errorMessage[0].textContent = "Must be a valid date";
    isValid = false;
  }

  return isValid;
}

// Show required field errors
function showRequiredFieldErrors(day, month, year) {
  if (day === "") errorMessage[0].textContent = "This field is required";
  if (month === "") errorMessage[1].textContent = "This field is required";
  if (year === "") errorMessage[2].textContent = "This field is required";
}

// Display final age
function displayUsersInfo(days, months, years) {
  displayinfo[0].firstElementChild.textContent = years;
  displayinfo[0].lastChild.textContent = years === 1 ? " year" : " years";

  displayinfo[1].firstElementChild.textContent = months;
  displayinfo[1].lastChild.textContent = months === 1 ? " month" : " months";

  displayinfo[2].firstElementChild.textContent = days;
  displayinfo[2].lastChild.textContent = days === 1 ? " day" : " days";
}

// Calculate age
function calculateAge() {
  const dayValue = parseInt(myDay.value);
  const monthValue = parseInt(myMonth.value) - 1; // 0-based month
  const yearValue = parseInt(myYear.value);

  if (!myDay.value || !myMonth.value || !myYear.value) {
    showRequiredFieldErrors(myDay.value, myMonth.value, myYear.value);
    return;
  }

  const isValid = validateUserData(dayValue, monthValue, yearValue);
  if (!isValid) return;

  const birthDate = new Date(yearValue, monthValue, dayValue);
  const today = todaysDate();

  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  // Adjust days
  if (ageDays < 0) {
    ageMonths--;
    const prevMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();
    ageDays += prevMonth;
  }

  // Adjust months
  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  displayUsersInfo(ageDays, ageMonths, ageYears);
}

// Trigger on icon click
arrowIcon.addEventListener("click", calculateAge);
