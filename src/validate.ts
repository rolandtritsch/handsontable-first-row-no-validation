/* @module src/validate */

import { sheet } from './sheet'

const validateButton = document.getElementById('btn-validate')

validateButton!.addEventListener('click', function handleClick() {
  const reader = new FileReader()
  reader.addEventListener('load', () => loadRows(reader), false)

  const files = document.getElementById('csv-file') as HTMLInputElement | null
  const file = files!.files![0]
  if (file) {
    reader.readAsText(file)
  }
})

/**
 * Load csv into sheet.               .
 * @return {void}
 */
function loadRows(reader: FileReader): void {
  const rows = csvStrToArray(reader.result as string)
  sheet.loadData(rows)
  sheet.validateCells()
}

sheet.addHook('afterValidate', (isValid, _value, row, _prop) => {
  if (!isValid) {
    sheet.setDataAtCell([[row, 0, false]])
  }
})

/**
 * Turn a csv-string into and 2D array.
 * @return {string[][]} All the rows/cols (as an 2D array).
 */
function csvStrToArray(str: string, delimiter = ','): string[][] {
  const rawRows = str.split('\n')
  const rows = rawRows.map(function (rawRow) {
    const row = rawRow.split(delimiter)
    // Add the valid col. Default true
    row.unshift('true')
    return row
  })

  return rows
}

const resetButton = document.getElementById('btn-reset')

resetButton!.addEventListener('click', function handleClick() {
  sheet.clear()
  sheet.loadData([])
  const file = document.getElementById('csv-file') as HTMLInputElement | null
  file!.value = ''
})
