import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TableDatePicker() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <DatePicker
        selected={startDate}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        onChange={(date) => setStartDate(date)}
      />
      {/* <DatePicker
        selected={endDate}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        onChange={(date) => setEndDate(date)}
      /> */}
    </div>
  );
}
