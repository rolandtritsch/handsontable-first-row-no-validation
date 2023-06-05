/* @module src/columns */

/* The array of all columns (and validators). */
export const columns = [
  {
    title: 'valid',
    type: 'checkbox',
    allowEmpty: false,
  },
  {
    title: 'phone_number',
    type: 'text',
    validator: /^1\d{10}$/,
    allowEmpty: false,
  },
  {
    title: 'opt_in_date',
    type: 'date',
    dateFormat: 'MM/DD/YYYY',
    allowEmpty: false,
  },
]
