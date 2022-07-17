import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import startOfDay from "date-fns/startOfDay";
import { CustomPickersDay } from "./styles";
import { Box, Grid, Button, Divider, ClickAwayListener } from "@mui/material";
import TimePicker from "./TimePicker";
import {
  convertFormattedStringToDate,
  getFormattedDate,
} from "../../utils/date";
import { ThemeProvider, useTheme } from "@mui/material";

export default function DateTimeSlotPicker({
  responses,
  setResponses,
  minTimeSlots,
  maxTimeSlots,
  containerStyles,
  customTheme,
}) {
  const [times, setTimes] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const theme = customTheme || useTheme();

  const findDate = (dates, date) => {
    const dateTime = date.getTime();
    return dates.find((item) => item.getTime() === dateTime);
  };
  const dateEnabled = (date) => {
    return date.getTime() > startOfDay(new Date()).getTime();
  };
  const renderPickerDay = (date, selectedDates, pickersDayProps) => {
    const values = responses.map((item) =>
      convertFormattedStringToDate(item.date, "YYYY-MM-DD")
    );

    const selected = findDate(values, date);
    const enabled = dateEnabled(startOfDay(date));
    return (
      <CustomPickersDay
        {...pickersDayProps}
        selected={selected}
        enabled={enabled}
      />
    );
  };

  const handleResponseUpdates = (date) => {
    const responsesData = [...responses];
    const responseIndex = responsesData.findIndex((item) => item.date === date);
    if (responseIndex >= 0) {
      if (responsesData[responseIndex].times.length) {
        setTimes(responsesData[responseIndex].times);
      } else {
        responsesData.splice(responseIndex, 1);
      }
    } else {
      setTimes([]);
    }
    setResponses(responsesData);
  };

  const handleTimesUpdate = (currentDate, newTimes) => {
    const responsesData = [...responses];
    const responseIndex = responsesData.findIndex(
      (item) => item.date === currentDate
    );
    if (responseIndex >= 0) {
      if (newTimes.length) {
        setTimes(newTimes);
        responsesData[responseIndex].times = newTimes;
      } else {
        setTimes(newTimes);
        responsesData.splice(responseIndex, 1);
        setSelectedDate(null);
      }
    } else {
      responsesData.push({ date: currentDate, times: [...newTimes] });
      setTimes([...newTimes]);
    }
    setResponses(responsesData);
  };

  React.useEffect(() => {
    if (!selectedDate) {
      if (!responses.length) {
        setTimes([]);
      } else {
        setSelectedDate(convertFormattedStringToDate(responses[0].date));
        setTimes(responses[0].times);
      }
    } else {
      if (!responses.length) {
        setTimes([]);
      } else {
        let responsesData = [...responses];
        const index = responsesData.findIndex(
          (item) => item.date === getFormattedDate(selectedDate, "YYYY-MM-DD")
        );
        if (index >= 0) {
          let element = responsesData[index];
          setTimes(element.times);
        } else {
          setTimes([]);
        }
      }
    }
  }, [responses]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{ ...containerStyles }} spacing={4}>
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              value={responses.map((item) =>
                convertFormattedStringToDate(item.date, "YYYY-MM-DD")
              )}
              onChange={(newValue) => {
                const date = startOfDay(newValue);
                //  Select date only if its greater that todays date
                if (dateEnabled(date)) {
                  setSelectedDate(date);

                  handleResponseUpdates(getFormattedDate(date, "YYYY-MM-DD"));
                }
              }}
              renderDay={renderPickerDay}
              renderInput={(params) => <TextField {...params} />}
              inputFormat="'Week of' MMM d"
            />
          </LocalizationProvider>
        </Grid>
        <Grid item>
          <Box>
            {selectedDate && (
              <TimePicker
                selectedDate={selectedDate}
                times={times}
                handleTimesUpdate={handleTimesUpdate}
                minTimeSlots={minTimeSlots}
                maxTimeSlots={maxTimeSlots}
                theme={theme}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}