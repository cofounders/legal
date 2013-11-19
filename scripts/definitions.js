/** Definition highlighting widget
 **/

(function (window, undefined) {

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

  // Traverse the DOM to find matching text ranges
  var getKeywords = function (root, label) {
    var matches = [];
    var boundary = /\W/;
    var walker = document.createTreeWalker(
      root[0],
      NodeFilter.SHOW_TEXT
    );
    while (walker.nextNode()) {
      var textNode = walker.currentNode;
      var text = textNode.data;
      var offset = text.indexOf(label);
      if (offset !== -1 &&
        // Do not match inside certain elements
        !nearestAncestor(textNode, ['DFN', 'A', 'H1']) &&
        // Prevent starting match mid-word
        (offset === 0 ||
          boundary.test(text.charAt(offset - 1))
        ) &&
        // Prevent ending match mid-word
        (offset + label.length === text.length ||
          boundary.test(text.charAt(offset + label.length))
        )
      ) {
        var range = document.createRange();
        range.setStart(textNode, offset);
        range.setEnd(textNode, offset + label.length);
        matches.push(range);
      }
    }
    return matches;
  };

  var hideTooltip = function () {
    // Clean up old tooltip
    var old = document.getElementById('tooltip');
    if (old) {
      old.parentNode.removeChild(old);
    }
  };

  var showTooltip = function (anchor, fragment) {
    hideTooltip();
    // Create new tooltip
    var tooltip = document.createElement('aside');
    tooltip.setAttribute('id', 'tooltip');
    tooltip.appendChild(fragment);
    // tooltip.appendChild(document.createTextNode(fragment.textContent));

    var ancestor = nearestAncestor(anchor, ['P', 'LI', 'DL', 'TABLE', 'ARTICLE']);
    var anchorBounds = anchor.getBoundingClientRect();
    var ancestorBounds = ancestor.getBoundingClientRect();
    var left = ancestorBounds.left;
    var right = ancestorBounds.right;
    var top = document.documentElement.scrollTop + anchorBounds.bottom;
    var maxwidth = right - left;
    tooltip.style.left = left + 'px';
    tooltip.style.maxWidth = maxwidth + 'px';
    tooltip.style.top = top + 'px';

    document.body.appendChild(tooltip);
    console.log(tooltip, left, right);
  };

  var article = $('section > article');

  $(article, 'dfn')
    .map(function (dfn) {
      return {
        dfn: dfn,
        label: getTerm(dfn),
        fragment: getDefinition(dfn)
      };
    })
    .sort(function (a, b) {
      return b.label.length - a.label.length;
    })
    .forEach(function (definition) {
      // Set the target
      definition.dfn.setAttribute('id', 'define-' + definition.label);
      // Inject the reference anchors
      var ranges = getKeywords(article, definition.label);
      ranges.forEach(function (range) {
        var anchor = document.createElement('a');
        anchor.classList.add('defining-term');
        anchor.href = '#define-' + definition.label;
        anchor.addEventListener('mouseover', function (event) {
          showTooltip(anchor, definition.fragment.cloneNode(true));
        });
        anchor.addEventListener('mouseout', function (event) {
          hideTooltip();
        });
        range.surroundContents(anchor);
      });
    });

})(this);
