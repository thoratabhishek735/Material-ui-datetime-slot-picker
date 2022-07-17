
import { styled } from "@mui/material/styles";
import {PickersDay} from '@mui/x-date-pickers/PickersDay';

export const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: prop => prop !== "selected",
})(({ theme, selected, enabled,colors }) => ({
  ...(selected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),

  fontWeight: "bold",
  margin: "6px",
  ...(enabled &&
    !selected && {
      backgroundColor: theme.palette.grey[300],
      color: theme.palette.primary.main,
      "&:focus": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
      borderTopLeftRadius: "50%",
      borderBottomLeftRadius: "50%",
      borderTopRightRadius: "50%",
      borderBottomRightRadius: "50%",
    }),
  ...(!enabled && {
    backgroundColor: "transparent",
    color: theme.palette.text.disabled,
  }),
}));
