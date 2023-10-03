import React, { useState } from 'react';
import styles from './App.module.css';
import { Button, TextField, Typography } from '@mui/material';


function App() {
  const [days, setDays] = useState();
  const [dayError, setDayError] = useState("");
  const [months, setMonths] = useState();
  const [monthError, setMonthError] = useState("");
  const [years, setYears] = useState();
  const [yearError, setYearError] = useState("");
  const [result, setResult] = useState([]);

  const getCurrentDate = new Date();

  const getDay = getCurrentDate.getDate();
  const getMonth = getCurrentDate.getMonth() + 1;
  const getYear = getCurrentDate.getFullYear();

  const calculateAge = () => {
    const results: any = [];

    // Ensure that days, months, and years are provided
    if (!days || !months || !years) {
      setDayError("Enter day");
      setMonthError("Enter month");
      setYearError("Enter year");
      return;
    }

    // Validate days, months, and years ranges
    if (days < 1 || days > 31) {
      setDayError("Enter a valid day");
      return;
    }

    if (months < 1 || months > 12) {
      setMonthError("Enter a valid month");
      return;
    }

    // Validate February days
    if (months === 2) {
      const isLeapYear = (years % 4 === 0 && years % 100 !== 0) || (years % 400 === 0);

      if (days < 1 || (isLeapYear && days > 29) || (!isLeapYear && days > 28)) {
        setDayError("Enter a valid day for February");
        return;
      }
    }

    // Validate years
    const currentYear = new Date().getFullYear();
    if (years <= 0 || years > currentYear) {
      setYearError("Enter a valid year");
      return;
    }

    // Calculate age
    const dayDifference = days - getDay;
    const monthDifference = getMonth - months;
    const yearDifference = getYear - years;

    results.push(dayDifference, monthDifference, yearDifference);
    setResult(results);
  };


  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <div className={styles.first}>
          <div className={styles.inputs}>
            <TextField
              error={dayError !== ''}
              variant='outlined'
              label={'DAY'}
              style={{ width: "100px", height: "30px", fontWeight: "bold" }}
              value={days}
              placeholder="DD"
              onChange={(e: any) => {
                setDays(e.target.value);
                setDayError("")
              }}
              helperText={dayError !== '' ? dayError : ''}
            />
          </div>
          <div className={styles.inputs}>
            <TextField
              error={monthError !== ''}
              variant='outlined'
              label={'MONTH'}
              style={{ width: "100px", height: "30px", fontWeight: "bold" }}
              value={months}
              placeholder="MM"
              onChange={(e: any) => {
                setMonths(e.target.value);
                setMonthError("")
              }}
              helperText={monthError !== '' ? monthError : ''}
            />
          </div>
          <div className={styles.inputs}>
            <TextField
              error={yearError !== ''}
              variant='outlined'
              label={'YEAR'}
              style={{ width: "100px", height: "30px", fontWeight: "bold" }}
              value={years}
              placeholder="YYYY"
              onChange={(e: any) => {
                setYears(e.target.value);
                setYearError("")
              }}
              helperText={yearError !== '' ? yearError : ''}
            />
          </div>
        </div>

        <div className={styles.CalculateButton}>
          <hr className={styles.divider} />
          <Button style={{
            height: '3rem',
            width: '3rem',
            border: '0.5px solid black',
            borderRadius: '100%',
            backgroundColor: '#6a5acd',
          }}
            variant='contained'
            onClick={calculateAge}>
            ∑
          </Button>
        </div>

        <div className={styles.results}>
          <div className={styles.resultAge}>
            <Typography variant='h3' fontWeight={'900'} fontStyle='italic' className={styles.age}>
              {result[2] !== undefined ? result[2] : "--"}
            </Typography>
            <Typography variant='h3' fontWeight={'900'} fontStyle='italic'>
              years
            </Typography>
          </div>
          <div className={styles.resultAge}>
            <Typography variant='h3' fontWeight={'900'} fontStyle='italic' className={styles.age}>
              {result[1] !== undefined ? result[1] : "--"}
            </Typography>
            <Typography variant='h3' fontWeight={'900'} fontStyle='italic'>
              months
            </Typography>
          </div>
          <div className={styles.resultAge}>
            <Typography variant='h3' fontWeight={'900'} fontStyle='italic' className={styles.age}>
              {result[0] !== undefined ? result[0] : "--"}
            </Typography>
            <Typography variant='h3' fontWeight={'900'} fontStyle='italic'>
              days
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
