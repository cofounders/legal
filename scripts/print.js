/** Print the document
 **/

(function (window, undefined) {

var document = window.document;

with(document.querySelector('button.action.print')) {
  addEventListener('click', function (event) {
    window.print();
  });
  removeAttribute('disabled');
}

})(this);
