/** Print the document
 **/

(function (window, undefined) {

var document = window.document;

with (document.querySelector('button.action.print')) {
  addEventListener('click', function (event) {
    window.print();
  });
  removeAttribute('disabled');
}

var formatContent = function (input, shadow) {
  if (input.validity.valid && input.value.length > 0) {
    switch (input.type) {
      case 'number':
        shadow.textContent = input.valueAsNumber.toLocaleString();
        break;
      case 'date':
        shadow.textContent = input.valueAsDate.toLocaleDateString();
        break;
      default:
        shadow.textContent = input.value;
    }
  } else {
    shadow.textContent = input.placeholder;
  }
};

$('input').forEach(function (input) {
  var shadow = document.createElement('span');
  shadow.classList.add('shadow-input');

  formatContent(input, shadow);

  input.addEventListener('input', function (event) {
    formatContent(input, shadow);
  });

  input.parentNode.insertBefore(shadow, input);
});

})(this);
