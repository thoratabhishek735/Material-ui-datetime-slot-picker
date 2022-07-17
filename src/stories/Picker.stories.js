import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import DateTimeSlotPicker from "../Components/DateTimeSlotPicker/DateTimeSlotPicker";

const stories = storiesOf("AppTest", module);

stories.add("App", () => {
  const [responses, setResponses] = useState([]);
  const handleChange=(data)=>{
    setResponses(data)
  }
  return (
    <div>
      {console.log("parent",responses)}
      <DateTimeSlotPicker
        responses={responses}
        onChange={(data)=>handleChange(data)}
        minTimeSlots={0}
        maxTimeSlots={5}
        containerStyles={{borderRadius:"2px"}}
        startTime={"08:00"}
        endTime={"23:00"}
        slotDuration={30}
      />

    </div>
  );
});
