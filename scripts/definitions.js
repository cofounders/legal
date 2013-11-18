/** Definition highlighting widget
 **/

(function (window, undefined) {

  var $ = function (context, query) {
    if (arguments.length === 1) {
      query = context;
      context = window.document;
    }
    if (typeof context === 'string') {
      context = $(context);
    }
    var parents = [];
    if (context.length && !Array.isArray(context)) {
      parents = parents.concat(Array.prototype.slice.call(context));
    }
    else if (Array.isArray(context)) {
      parents = parents.concat(context);
    }
    else {
      parents.push(context);
    }
    var results = [];
    parents.forEach(function (parent) {
      var nodelist = parent.querySelectorAll(query);
      results = results.concat(Array.prototype.slice.call(nodelist));
    });
    return results;
  };

  var article = $('section > article');

  $(article, 'dfn').forEach(function (definition) {
    console.log(definition.innerText);
  });

})(this);
