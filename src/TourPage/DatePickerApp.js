import React, {useState} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function DatePickerApp() {
    const [selectDate, setSelectdate] = useState(null);

    return (
        <div>
          <span>Select Date on Calender   </span>
          <DatePicker selected = {selectDate} onChange = {(Date) => { setSelectdate(Date)}}
           dateFormat = 'dd/MM/yyyy'
           filterDate = {date => date.getDay() !== 0}
           isClearable
           showYearDropdown
           scrollableMonthYearDropdown
          />  
          <br></br> <br></br>
        </div>
    )
}
export default DatePickerApp;
