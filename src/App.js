import { useState } from "react";
import logo from "./assets/icon-arrow.svg";

function App() {
  const [getDisplayInfo, setDisplayInfo] = useState([]);

  function handleGetDisplayInfo(info) {
    setDisplayInfo((getDisplayInfo) => [...getDisplayInfo, info]);
  }

  return (
    <main>
      <InputAge onAddinfo={handleGetDisplayInfo} />
      <hr />
      <DisplayInfo getDisplayInfo={getDisplayInfo} />
    </main>
  );
}

function InputAge({ onAddinfo }) {
  const [myDays, setDays] = useState("");
  const [myMonths, setMonths] = useState("");
  const [myYear, setYears] = useState("");
  const [errMessage, setErrMessage] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    let dateData,
      newDate,
      calcDateTime,
      day,
      totalDays,
      totalMonths,
      totalYears,
      daysLeft,
      totalDaysLeft,
      getDateOfbirth;

    dateData = new Date();

    getDateOfbirth = [myDays, myMonths, myYear];

    const [md, mm, my] = getDateOfbirth;
    console.log(md, mm, my);
    setErrMessage([md, mm, my]);
    const myDateOfbirth = `${mm}/${md}/${my}`;

    if (md !== "" && mm !== "" && my !== "") {
      newDate = new Date(myDateOfbirth);

      calcDateTime = dateData.getTime() - newDate.getTime();

      day = 24 * 3600 * 1000;

      totalDays = Math.floor(calcDateTime / day);

      totalYears = Math.floor(totalDays / 365);

      daysLeft = totalDays - totalYears * 365;

      totalMonths = Math.floor(daysLeft / 31);

      totalDaysLeft = daysLeft - totalMonths * 31;

      const displayInfo = [totalYears, totalMonths, totalDaysLeft];

      onAddinfo(displayInfo);
    }
  }

  const msg = "This field is required";
  function myArr(a, b) {
    const newerrMessage = errMessage;
    const getIndexOfarr = newerrMessage[a];

    if (getIndexOfarr !== "") {
      if (b !== msg) {
        return <p className="label-color">{b}</p>;
      } else {
        return;
      }
    } else {
      if (b === msg) {
        return <p className="p-color-1">{b}</p>;
      } else {
        return <p className="label-color-1">{b}</p>;
      }
    }
  }

  return (
    <form className="inputButtons" onSubmit={handleSubmit}>
      <label>
        {myArr(0, "Day")}
        <input
          type="text"
          name="myDays"
          placeholder="dd"
          value={myDays}
          onChange={(e) => setDays(Number(e.target.value))}
        ></input>
        {myArr(0, msg)}
      </label>
      <label>
        {myArr(1, "Month")}
        <input
          type="text"
          name="month"
          placeholder="mm"
          value={myMonths}
          onChange={(e) => setMonths(Number(e.target.value))}
        ></input>
        {myArr(1, msg)}
      </label>

      <label>
        {myArr(2, "Year")}
        <input
          type="text"
          name="myYear"
          placeholder="yyyy"
          value={myYear}
          onChange={(e) => setYears(Number(e.target.value))}
        ></input>
        {myArr(2, msg)}
      </label>
      <button></button>
    </form>
  );
}

function DisplayInfo({ getDisplayInfo }) {
  return (
    <>
      <img className="logo" src={logo} alt="" />

      <div className="displayInfo">
        {getDisplayInfo.length === 0 ? (
          <ul className="span-colored">
            <li>
              <span>- -</span> years
            </li>
            <li>
              <span>- -</span> months
            </li>
            <li>
              <span>- -</span> days
            </li>
          </ul>
        ) : (
          getDisplayInfo.map((info) => (
            <ul className="span-colored">
              <li>
                <span>{info[0]}</span> {info[0] > 1 ? "years" : "year"}
              </li>
              <li>
                <span>{info[1]}</span> {info[1] > 1 ? "months" : "month"}
              </li>
              <li>
                <span>{info[2]}</span> {info[2] > 1 ? "days" : "day"}
              </li>
            </ul>
          ))
        )}
      </div>
    </>
  );
}

export default App;
