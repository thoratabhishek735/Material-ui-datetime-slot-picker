import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import DateTimeSlotPicker from "../Components/DateTimeSlotPicker/DateTimeSlotPicker";

const stories = storiesOf("AppTest", module);

stories.add("App", () => {
  const [responses, setResponses] = useState([]);
  return (
    <div>
      <DateTimeSlotPicker
        responses={responses}
        setResponses={setResponses}
        minTimeSlots={0}
        maxTimeSlots={5}
        containerStyles={{borderRadius:"2px"}}
      />
      
    </div>
  );
});
