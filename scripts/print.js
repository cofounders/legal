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

var getContent = function (input) {
  return input.validity.valid ?
    (input.value || input.placeholder) : '';
};

$('input').forEach(function (input) {
  var shadow = document.createElement('span');
  shadow.classList.add('shadow-input');
  shadow.textContent = getContent(input);
  input.parentNode.insertBefore(shadow, input);
  input.addEventListener('input', function (event) {
    shadow.textContent = getContent(input);
  });
});

})(this);
