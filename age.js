const myDay = document.querySelector(".day");
const myMonth = document.querySelector(".month");
const myYear = document.querySelector(".year");
const arrowIcon = document.querySelector(".arrow-icon");
const displayinfo = document.querySelectorAll(".displayinfo");
// const label = document.querySelectorAll("label");
const errorMessage = document.querySelectorAll(".errormessage");

let calcDateTime,
  day,
  totalDays,
  totalYears,
  daysLeft,
  totalMonths,
  totalDaysLeft;

// Get todays date
const todaysDate = function () {
  const today = new Date();
  const getDay = today.getDate();
  const getMonth = today.getMonth();
  const getYear = today.getFullYear();

  return (setNewDate = new Date(getYear, getMonth, getDay));
};

// Set user's date of birth
const dateofBirth = function (year, month, day) {
  const birthDay = day;
  const birthMonth = month;
  const birthYear = year;

  return new Date(birthYear, birthMonth, birthDay);
};

// Validate user's data
function validateUserData(day, month, year) {
  for (let i = 0; i < errorMessage.length; i++) {
    const currentDate = todaysDate();

    // validating months with thirty days
    const thirtyDaysMonth = [3, 5, 8, 10];

    if (thirtyDaysMonth.includes(month)) {
      if (day < 1 || day > 30) {
        errorMessage[0].style.fontSize = "1rem";
        return (errorMessage[0].textContent = "Must be a valid date");
      }
    }

    // validating month of February
    if (month == 1) {
      if (day < 1 || day > 29) {
        errorMessage[0].style.fontSize = "1rem";
        return (errorMessage[0].textContent = "Must be a valid date");
      }
    }

    // validating months with thirty one days
    const thirtyOneDaysMonth = [0, 2, 4, 6, 7, 9, 11];
    if (thirtyOneDaysMonth.includes(month)) {
      if (day < 1 || day > 31) {
        errorMessage[0].style.fontSize = "1rem";
        return (errorMessage[0].textContent = "Must be a valid date");
      }
    }

    // validating current year
    if (year > currentDate.getFullYear()) {
      errorMessage[2].style.fontSize = "1rem";
      return (errorMessage[2].textContent = "Must be a valid year");
    }

    // validating month with current year
    if (
      month >= 12 ||
      (month > currentDate.getMonth() && year >= currentDate.getFullYear())
    ) {
      errorMessage[1].style.fontSize = "1rem";
      return (errorMessage[1].textContent = "Must be a valid month");
    }
  }
}

// Check empty fields and display error message
const errMessage = function (day, month, year) {
  for (let i = 0; i < errorMessage.length; i++) {
    if (day === "" && month === "" && year === "") {
      errorMessage[i].textContent = "This field is required";
    } else if (day === "" && i === 0) {
      errorMessage[0].textContent = "This field is required";
    } else if (month == "" && i === 1) {
      errorMessage[1].textContent = "This field is required";
    } else if (year === "" && i === 2) {
      errorMessage[2].textContent = "This field is required";
    }
  }
};

// Calculate the user's age
const calculateAge = function () {
  const getTodaysDate = todaysDate();
  const dayValue = myDay.value;
  let monthValue = myMonth.value;
  const yearValue = myYear.value;

  if (dayValue !== "" && monthValue !== "" && yearValue !== "") {
    monthValue--;

    let validData = validateUserData(dayValue, monthValue, yearValue);

    // console.log(validData);
    if (!validData) {
      const setDateOfBirth = dateofBirth(yearValue, monthValue, dayValue);
      // console.log(setDateOfBirth);
      // console.log(getMonthValue);

      calcDateTime = getTodaysDate.getTime() - setDateOfBirth.getTime();

      day = 24 * 3600 * 1000;

      totalDays = Math.floor(calcDateTime / day);
      // console.log(totalDays);
      totalYears = Math.floor(totalDays / 365);

      daysLeft = totalDays - totalYears * 365;

      totalMonths = Math.floor(daysLeft / 31);

      totalDaysLeft = daysLeft - totalMonths * 31;

      displayUsersInfo(totalDaysLeft, totalMonths, totalYears);
    }
  } else {
    errMessage(dayValue, monthValue, yearValue);
  }
};

// Display user's information
function displayUsersInfo(totalDays, totalMonths, totalYears) {
  for (let i = 0; i < displayinfo.length; i++) {
    if (totalDays >= 2) {
      displayinfo[2].firstElementChild.textContent = totalDays;
    } else {
      `${(displayinfo[2].firstElementChild.textContent =
        totalDays)}  ${(displayinfo[2].lastChild.textContent = " day")}`;
    }

    if (totalMonths >= 2) {
      displayinfo[1].firstElementChild.textContent = totalMonths;
    } else {
      `${(displayinfo[1].firstElementChild.textContent =
        totalMonths)}  ${(displayinfo[1].lastChild.textContent = " month")}`;
    }

    if (totalYears >= 2) {
      displayinfo[0].firstElementChild.textContent = totalYears;
    } else {
      `${(displayinfo[0].firstElementChild.textContent =
        totalYears)}   ${(displayinfo[0].lastChild.textContent = " year")}`;
    }
  }
}

arrowIcon.addEventListener("click", calculateAge);
