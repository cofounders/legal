// DOM querying utility
var $ = function (root, query) {
  if (arguments.length === 1) {
    // Ignore repeated calls
    if (Array.isArray(root)) {
      return root;
    }
    // Optional root
    else {
      query = root;
      root = window.document;
    }
  }
  if (typeof root === 'string') {
    root = $(root);
  }
  var parents = [];
  if (root.length && !Array.isArray(root)) {
    parents = parents.concat(Array.prototype.slice.call(root));
  }
  else if (Array.isArray(root)) {
    parents = parents.concat(root);
  }
  else {
    parents.push(root);
  }
  var results = [];
  parents.forEach(function (parent) {
    var nodelist = parent.querySelectorAll(query);
    results = results.concat(Array.prototype.slice.call(nodelist));
  });
  return results;
};

// Finds the first tag, matched by name, up the ancestry chain
$.nearestAncestor = function (descendant, tagNames) {
  if (!Array.isArray(tagNames)) {
    tagNames = [tagNames];
  }
  var ancestor = descendant;
  do {
    ancestor = ancestor.parentNode;
  } while (ancestor && tagNames.indexOf(ancestor.tagName) === -1);
  return ancestor;
};
