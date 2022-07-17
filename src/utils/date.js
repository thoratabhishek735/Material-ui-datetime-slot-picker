import moment from "moment";

export const getCurrentDate = (date) =>
  moment(date || new Date()).format("MMMM DD, YYYY");

export const getDate = (date) => moment(date).date();

export const getCharMonth = (date) => moment(date).format("MMM");

export const getCharDay = (date) => moment(date).format("dddd");

export const getCharDateMonth = (date) => moment(date).format("MMM DD");

export const getRemainingDays = (date) => moment(date).diff(new Date(), "days");

export const getFormattedDate = (date, format) => moment(date).format(format);

export const convertFormattedStringToDate = (string, format) =>
  moment(string, format).toDate();

export const getCurrentTime = (time) => {
  return moment(time, ["HH:mm"]).format("hh:mm A");
};

export const getGlobalTime = (time) => {
  return moment(time, ["HH:mm A"]).format("hh:mm");
};

export const getTimeSlots = (startTime, endTime, duration) => {
  let fromTime = moment(startTime, "HH:mm");
  let toTime = moment(endTime, "HH:mm");
  let slotArray = [];
  while (fromTime <= toTime) {
    const val = new moment(fromTime).format("HH:mm");
    slotArray.push({
      label: getCurrentTime(val),
      value: val,
    });
    fromTime.add(duration, "minutes");
  }
  return slotArray;
};
