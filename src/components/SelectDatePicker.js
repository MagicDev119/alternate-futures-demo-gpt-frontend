import React, { useState, useMemo } from "react"
import CustomSelect from './CustomSelect';
import {
  Box,
  Input,
  MenuItem,
  Select
} from '@mui/material'
const SelectDatePicker = ({ handleDate, birthday }) => {
  const birthObj = birthday ? birthday.split('-') : []

  const [curMonth, setMonth] = useState(birthObj[1] || null);
  const [curDate, setDate] = useState(birthObj[2] || null);
  const [curYear, setYear] = useState(birthObj[0] || null);

  const [dateLimit, setDateLimit] = useState(31);

  const changeValue = (val, cate) => {
    switch (cate) {
      case 'Month':
        setMonth(val)
        handleDate(curYear + '-' + val + '-' + curDate)
        break
      case 'Date':
        setDate(val)
        handleDate(curYear + '-' + curMonth + '-' + val)
        break
      case 'Year':
        setYear(val)
        handleDate(val + '-' + curMonth + '-' + curDate)
        break
      default:
        break
    }
  }

  useMemo(() => {
    if (curMonth || curYear) {
      var month = 0;
      var d = new Date(curYear, curMonth, 0);
      setDateLimit(d.getDate())
    }
  }, [curMonth, curYear])

  const nowYear = (new Date()).getFullYear()
  return (
    <>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <CustomSelect min={1} max={12} changeValue={changeValue} category="Month" uData={birthObj[1]} />
        <CustomSelect min={1} max={dateLimit} changeValue={changeValue} category="Date" uData={birthObj[2]} />
        <CustomSelect min={1900} max={nowYear} changeValue={changeValue} category="Year" uData={birthObj[0]} />
      </Box>
    </>
  );
};
export default SelectDatePicker;