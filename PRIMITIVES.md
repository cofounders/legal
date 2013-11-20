# Legal Template Primitives

The legal templates are structured using these defined HTML structures. They are the building blocks, or grammar, of legalese.

Restricting document authors is necessary to aid the end user. Some benefits of a defined markup are design consistency, improved legibility. Having a fixed format also makes it possible to build advanced tools around these documents.

#### Content Formatting

This document does not define any guidelines for the readable content of legal templates. That is left up to authors. It is recommended that any adopted rules are applied consistently throughout the same document. [Style guides](http://en.wikipedia.org/wiki/Style_guide) exist for specific languages, cultures, academic fields, industries, and institutions.

#### Suggestion: W3C Web Components

Turn some of these semantic HTML structures into Web Components. Custom elements would allow both cleaner semantics, and richer design/behaviour extensions.

## Text Content

### Document Title

    <h1>Document Title</h1>

Document titles can be used at the top of the template.

### Attachment Titles

    <h2>Attachment Title</h2>

Related documents can be schedules, appendices, or other included documents that are used to support the main template.

### Section Titles

    <h3>Section Title</h3>

Used for major sections in the document.

### Paragraphs

    <p>General text</p>

Paragraphs can be added to explicitly separate blocks of content within a section.

### Emphasised Content

    <b>This is very important</b>

Typically the start of a particularly important paragraph.

## Numbered Sections

### Section Numbering

Displaying nested sections follows rules from the [CSS Lists and Counters Module Level 3](http://www.w3.org/TR/css3-lists/) specification.

1. The first level is `decimal` and ends in a period (`.`).

    Example: `15.` (Section 15)

1. The second level is also `decimal` and ends in a period (`.`). In the document viewer it is shown appended to the first level number.

    Example: `15.3.` (Section 15, subsection 3)

1. The third level drops is `lower-latin` and wrapped in parenthesis.

    Example: `(b)` (Subsection 2)

1. The fourth and consecutive levels are `lower-roman` and wrapped in parenthesis.

    Example: `(xiv)` (Subsection 14)

To reference a nested level, concatenate all the counters.

Example: `15.3(b)(xiv)` (Section 15, subsection 3, subsection 2, subsection 14)

### Top Level Sections

    <ol>
      <li>The first section</li>
      <li>The second section</li>
    </ol>

If the numbered section has a title it should be formatted as follows:

    <ol>
      <li>
        <h4>The first section</h4>
        More clauses and other content.
      </li>
    </ol>

### Nested Subsections

    <ol>
      <li> <!-- section -->
        The first section
        <ol>
          <li>The first subsection</li> <!-- subsection -->
          <li>The second subsection</li> <!-- subsection -->
        </ol>
      </li>
      <li>The second section</li> <!-- section -->
    </ol>

If the numbered section has a title it should be formatted as follows:

    <ol>
      <li> <!-- section -->
        <ol>
          <li> <!-- subsection -->
            <h5>The first subsection</h5>
            Followed by more text.
          </li>
        </ol>
      </li>
    </ol>

## Defined Terms

### Inline Term Definition

    This line of text defines <dfn>Some Term</dfn> in the document.

### List of Term Definitions

Wrap text in a `<dfn>` tag to identify instances of the same word throughout the template. The [defining term algorithm](http://www.w3.org/TR/html5/text-level-semantics.html#defining-term) is used to determine the matched string.

    <dl>
      <dt><dfn>Some Term</dfn> means</dt>
      <dd>something specific.</dd>
      <dt><dfn>Another Term</dfn> means</dt>
      <dd>either this;</dd>
      <dd>or else this.</dd>
    </dl>

### Term Lookup

A tooltip shows the definition of defined terms used elsewhere in the template.

    This line references <a href="#define-Something">Something</a> defined elsewhere.

Lookup anchors are added automatically. There is no need to manually add them to the template source code.

## Table Listing

Typically used in schedules to an agreement.

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>123</td>
          <td>Foo</td>
          <td>10</td>
        </tr>
        <tr>
          <td>456</td>
          <td>Bar</td>
          <td>20</td>
        </tr>
      </tbody>
    </table>

## Template Variables

### Signatures

    <ol>
      <li>
        <p><b>The Consultant</b></p>
        <p><input placeholder="Company Name" /></p>
        <p><label>By: <input alt="Signature" type="image" /></label></p>
        <p><label>Name: <input placeholder="Name" /></label></p>
        <p><label>Title: <input placeholder="Title" /></label></p>
        <p><label>Witnessed by: <input alt="Signature" type="image" /></label></p>
        <p><label>Name of witness: <input placeholder="Name" /></label></p>
      </li>
    </ol>

### Text Blocks

    <textarea placeholder="Some Description"></textarea>

### Text Fields

    <input placeholder="Some Description" />

### Numbers

    <input type="number" />

### Date

    <input type="date" />

## Annotations

Add easy to understand comments to explain the intention behind complex legalese. Depending on the containing HTML element, use either `<span class="aside">` or `<aside>` elements.

The `<aside>` element is *Flow content* and therefore not allowed inside `<p>`, `<dd>` elements or other elements that expect *Phrasing content*. Use it only inside `<li>` elements or the top-level container.

Examples:

    <li>
      <aside>This is easy to read and makes people happy.</aside>
      Here is the long and dry legalese section that no one ever bothers reading anyway.
    </li>

    <p>
      <span class="aside">No worries, just read this.</span>
      Yet another complicated section which may as well be lorem ipsum to most people.
    </p>    
