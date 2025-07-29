const express = require('express');
const { processInputArray } = require('./utils');

const app = express();
app.use(express.json());

const FULL_NAME = 'john_doe';
const DOB = '17091999';
const EMAIL = 'john_doe@example.com';
const ROLL_NUMBER = '123456';

const USER_ID = `${FULL_NAME.toLowerCase()}_${DOB}`;

app.post('/bfhl', (req, res) => {
  try {
    const inputArray = req.body.data;

    if (!Array.isArray(inputArray)) {
      return res.status(400).json({
        is_success: false,
        user_id: USER_ID,
        error: "Invalid input. 'data' should be an array."
      });
    }

    const result = processInputArray(inputArray);

    res.status(200).json({
      is_success: true,
      user_id: USER_ID,
      email_id: EMAIL,
      college_roll_number: ROLL_NUMBER,
      even_numbers: result.evenNumbers,
      odd_numbers: result.oddNumbers,
      alphabets: result.alphabetsUppercase,
      special_characters: result.specialChars,
      sum: result.sum,
      final_string: result.reversedAltCapsString
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      is_success: false,
      user_id: USER_ID,
      error: "Internal server error"
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
