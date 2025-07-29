const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const FULL_NAME = 'john_doe'; 
const DOB = '17091999'; 
const EMAIL = 'john@xyz.com';
const ROLL_NUMBER = 'ABCD123';

function processData(data) {
  const even_numbers = [];
  const odd_numbers = [];
  const alphabets = [];
  const special_characters = [];
  let sum = 0;
  let alpha_concat = '';

  data.forEach(item => {
    if (/^\d+$/.test(item)) {
    
      const num = parseInt(item, 10);
      if (num % 2 === 0) {
        even_numbers.push(item);
      } else {
        odd_numbers.push(item);
      }
      sum += num;
    } else if (/^[a-zA-Z]+$/.test(item)) {
      alphabets.push(item.toUpperCase());
      alpha_concat += item;
    } else {
      special_characters.push(item);
    }
  });

  
  let concat_string = '';
  let chars = alpha_concat.split('').reverse();
  for (let i = 0; i < chars.length; i++) {
    concat_string += i % 2 === 0 ? chars[i].toUpperCase() : chars[i].toLowerCase();
  }

  return {
    is_success: true,
    user_id: `${FULL_NAME}_${DOB}`,
    email: EMAIL,
    roll_number: ROLL_NUMBER,
    odd_numbers,
    even_numbers,
    alphabets,
    special_characters,
    sum: sum.toString(),
    concat_string
  };
}

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: 'Invalid input' });
    }
    const result = processData(data);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ is_success: false, message: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
