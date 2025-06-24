const myDay = document.querySelector(".day");
const myMonth = document.querySelector(".month");
const myYear = document.querySelector(".year");
const arrowIcon = document.querySelector(".arrow-icon");
const showYears = document.querySelector(".showYears");
const showMonths = document.querySelector(".showMonths");
const showDays = document.querySelector(".showDays");
const errorMessage = document.querySelectorAll(".errormessage");

let calcDateTime,
  day,
  totalDays,
  totalYears,
  daysLeft,
  totalMonths,
  totalDaysLeft;

let todaysDate = function () {
  const today = new Date();
  const getDay = today.getDate();
  const getMonth = today.getMonth();
  const getYear = today.getFullYear();

  return (setNewDate = new Date(getYear, getMonth, getDay));
};

const calculateAge = function () {
  const getTodaysDate = todaysDate();
  const getDayValue = myDay.value;
  let getMonthValue = myMonth.value;
  const getYearValue = myYear.value;

  const setDateOfBirth = new Date(getYearValue, getMonthValue, getDayValue);

  if (getDayValue !== "" && getMonthValue !== "" && getYearValue !== "") {
    if (getMonthValue >= 0) {
      getMonthValue--;

      calcDateTime = getTodaysDate.getTime() - setDateOfBirth.getTime();

      day = 24 * 3600 * 1000;

      totalDays = Math.floor(calcDateTime / day);
      // console.log(totalDays);
      totalYears = Math.floor(totalDays / 365);

      daysLeft = totalDays - totalYears * 365;

      totalMonths = Math.floor(daysLeft / 31);

      totalDaysLeft = daysLeft - totalMonths * 31;
      showYears.textContent = totalYears;
      showMonths.textContent = totalMonths;
      showDays.textContent = totalDaysLeft;
    }
  } else {
    for (let i = 0; i <= errorMessage.length; i++) {
      if (getDayValue === "" && getMonthValue === "" && getYearValue === "") {
        errorMessage[i].textContent = "This field cannot be empty";
      } else if (getDayValue === "" && i === 0) {
        errorMessage[0].textContent = "This field cannot be empty";
      } else if (getMonthValue === "" && i === 1) {
        errorMessage[1].textContent = "This field cannot be empty";
      } else if (getYearValue === "" && i === 2) {
        errorMessage[2].textContent = "This field cannot be empty";
      }
    }
  }
};

arrowIcon.addEventListener("click", calculateAge);
