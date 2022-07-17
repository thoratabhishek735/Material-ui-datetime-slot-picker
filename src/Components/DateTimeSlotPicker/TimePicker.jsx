import { Box, Button, Typography } from "@mui/material";
import React from "react";

import { getCurrentDate, getFormattedDate, getCharDay,getTimeSlots } from "../../utils/date";


export default function TimePicker({
  selectedDate,
  times,
  handleTimesUpdate,
  minTimeSlots,
  maxTimeSlots,
  theme,
  startTime,
  endTime,
  duration
}) {
  const isSelected = item => {
    return times.some(time => item.value === time);
  };

  const handleTimeUpdate = item => {
    let timesArray = [...times];
    const timesIndex = timesArray.findIndex(time => time === item.value);
    if (timesIndex >= 0) {
      timesArray.splice(timesIndex, 1);
    } else {
      if (times.length < maxTimeSlots) {
        timesArray.push(item.value);
      }
    }

    handleTimesUpdate(getFormattedDate(selectedDate, "YYYY-MM-DD"), timesArray);
  };
  return (
    <Box>
      <Box sx={{ my: 2 }}>
        <Typography variant="title_medium">
          {selectedDate && getCurrentDate(selectedDate)}
        </Typography>
      </Box>

      <Box
        display={"grid"}
        gridTemplateColumns={"repeat(12, 1fr)"}
        gridAutoRows={"1fr"}
        gap={1}
        sx={{ maxHeight: "300px", overflow: "auto" }}
      >
        {getTimeSlots(startTime,endTime,duration).map(item => (
          <Button
            variant="outlined"
            sx={{
              gridColumn: {
                lg:"span 6",
                md:"span 6",
                sm:"span 6",
                xs:"span 6",
                backgroundColor: isSelected(item)
                  ? theme.palette.primary.light
                  : theme.palette.common.white,
                borderColor: isSelected(item)
                  ? theme.palette.common.black
                  : theme.palette.text.disabled,
                color:isSelected(item)
                ? theme.palette.common.white
                : theme.palette.primary.main,

                "&:focus": {
                  backgroundColor: isSelected(item)
                    ? theme.palette.primary.light
                    : "transparent",
                },
              },
            }}
            onClick={() => handleTimeUpdate(item)}
            
          >
            {item.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
