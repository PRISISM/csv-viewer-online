/* global FileReader, Papa, Handsontable */

var input = document.getElementById('input-file')
var handsontableContainer = document.getElementById('handsontable-container')

input.onchange = function () {
  var file = this.files[0]
  var reader = new FileReader()

  reader.onload = function (e) {
    var csv = e.target.result
    var data = Papa.parse(csv, {
      header: true,
      skipEmptyLines: true
    })

    data.data.forEach(e => {
      e.text = e.text.replace('\\n', '<br/>');
    });

    // reset container
    handsontableContainer.innerHTML = ''
    handsontableContainer.className = ''

    Handsontable(handsontableContainer, {
      data: data.data,
      rowHeaders: true,
      colHeaders: ['Name', 'Text', 'Translation'],
      columnSorting: true,
      columns: [
        {data: 'name'},
        {data: 'text', renderer:'html'}
      ]
    })
  }

  file && reader.readAsText(file)
}
