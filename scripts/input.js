/** Input fields
 **/

(function (window, undefined) {

var document = window.document;

$('input').forEach(function (input) {
  input.addEventListener('input', function (event) {
    console.log('hilarity');
    $('input')
      .filter(function (target) {
        return target.placeholder === input.placeholder;
      })
      .forEach(function (target) {
        target.value = input.value;
      });
  });
});

})(this);
