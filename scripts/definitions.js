/** Definition highlighting widget
 **/

(function (window, undefined) {

  // DOM querying utility
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

  // Finds the first tag, matched by name, up the ancestry chain
  var nearestAncestor = function (descendant, tagNames) {
    if (!Array.isArray(tagNames)) {
      tagNames = [tagNames];
    }
    var ancestor = descendant;
    do {
      ancestor = ancestor.parentNode;
    } while (ancestor && tagNames.indexOf(ancestor.tagName) === -1);
    return ancestor;
  };

  // Find the defining term for a <dfn/> element
  var getTerm = function (dfn) {

    // Defining Term algorithm
    // <http://www.w3.org/TR/html5/text-level-semantics.html#defining-term>

    // "If the dfn element has a title attribute, then the exact value of that 
    //  attribute is the term being defined."

    if (dfn.hasAttribute('title')) {
      return dfn.getAttribute('title');
    }

    // "Otherwise, if it contains exactly one element child node and no child 
    //  Text nodes, and that child element is an abbr element with a title 
    //  attribute, then the exact value of that attribute is the term being 
    //  defined."

    else if (dfn.childNodes.length === 1 &&
      dfn.firstChild.nodeType === Node.ELEMENT_NODE &&
      dfn.firstChild.tagName === 'ABBR' &&
      dfn.firstChild.hasAttribute('title')
    ) {
      return dfn.firstChild.getAttribute('title');
    }

    // "Otherwise, it is the exact textContent of the dfn element that gives 
    //  the term being defined."

    else {
      return dfn.textContent;
    }
  };

  // Find the definition for a <dfn/> element
  var getDefinition = function (dfn) {

    // Definitions are less clearly described in the spec:
    // "The paragraph, description list group, or section that is the nearest 
    //  ancestor of the dfn element must also contain the definition(s) for the
    //  term given by the dfn element."

    var fragment = document.createDocumentFragment();

    var ancestor = nearestAncestor(dfn, [
      // In the spec
      'P', 'DL', 'SECTION',
      // Not in the spec but just makes sense
      'LI',
      'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
      'TH', 'TD',
      'BLOCKQUOTE',
      'ARTICLE', 'HEADER', 'FOOTER', 'ASIDE', 'FIGURE'
    ]);

    if (ancestor) {
      // Special tactics for definition list groups
      if (ancestor.tagName === 'DL') {
        var cursor = nearestAncestor(dfn, 'DT');

        // Find the first DT for this term
        while (cursor.previousElementSibling &&
          cursor.previousElementSibling.tagName === 'DT'
        ) {
          cursor = cursor.previousElementSibling;
        }
        // Combine multiple DTs
        while (cursor && cursor.tagName === 'DT') {
          fragment.appendChild(cursor.cloneNode(true));
          cursor = cursor.nextElementSibling;
        }
        // Combine multiple DDs
        while (cursor && cursor.tagName === 'DD') {
          fragment.appendChild(cursor.cloneNode(true));
          cursor = cursor.nextElementSibling;
        }
      }
      // Otherwise just clone the ancestor's content
      else {
        Array.prototype.slice.call(ancestor.childNodes)
          .forEach(function (child) {
            fragment.appendChild(child.cloneNode(true));
          });
      }
    }

    return fragment;
  };

  var article = $('section > article');

  $(article, 'dfn').forEach(function (dfn) {
    var label = getTerm(dfn);
    var fragment = getDefinition(dfn);
    console.log(label, '=', fragment);
  });

})(this);
