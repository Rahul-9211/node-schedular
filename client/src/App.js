import React, { useState } from "react";
// import DateTimePicker from 'react-datetime-picker';
import "react-datetime-picker/dist/DateTimePicker.css";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import axios from "axios";

function App() {
  const [value, onChange] = useState(new Date());
  async function passDAte() {
    console.log("value printed", value);

    // await axios({
    //   method:"post",
    //   url:`http://localhost:8080/scheduletask`,
    //   body:JSON.stringify({
    //     value
    //   }) , 
    // }).then((res) => {
    //   const persons = res.data;
    //   console.log("response", persons);
    // });
    const ScheduleID = 2342342342;
    const OrganizationID = 3453453234;
    const  UserID = 3453453;
    const jobType = "instantJob";
    const  Feature = "Test feature";
    const response = await fetch("http://localhost:8080/scheduletask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ScheduleID,
        OrganizationID,
        UserID,
        Feature,
        value,
        jobType
      }),
    });
    const data = await response;
    console.log("revert data" , data)
  }
  return (
    <div className="App">
      <div>
        <DateTimePicker onChange={onChange} value={value} />
        {/* {console.log("date" , value)} */}
        <button type="submit" onClick={passDAte}>
          Click
        </button>
      </div>
    </div>
  );
}

export default App;
