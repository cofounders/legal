# Legal Template Primitives

The legal templates are structured using these defined HTML structures. They are the building blocks, or grammar, of legalese.

Restricting document authors is necessary to aid the end user. Some benefits of a defined markup are design consistency, improved legibility. Having a fixed format also makes it possible to build advanced tools around these documents.

#### Content Formatting

This document does not define any guidelines for the readable content of legal templates. This is left up to the author. It is recommended that any adopted rules are applied consistently throughout the same document. [Style guides](http://en.wikipedia.org/wiki/Style_guide) exist for specific languages, cultures, academic fields, industries, and institutions.

#### Note: Web Components

Turn these semantic HTML structures into Web Components. Custom elements would allow both cleaner semantics, and richer design/behaviour extensions.

## Document Title

    <h1>Document Title</h1>

Document titles can be used at the top of the template.

## Attachment Titles

    <h2>Attachment Title</h2>

Related documents can be schedules, appendices, or other included documents that are used to support the main template.

## Section Titles

    <h3>Section Title</h3>

Used for major sections in the document.

## Paragraphs

    <p>General text</p>

Paragraphs can be added to explicitly separate blocks of content within a section.

## Emphasised Content

    <strong>This is very important</strong>

Typically the start of a particularly important paragraph.

## Numbered Section

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

## Numbered Subsection

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

## Inline Term Definition

    This line of text defines <dfn id="some-term">Some Term</dfn> in the document.

## List of Term Definitions

    <dl>
      <dt id="some-term"><dfn>Some Term</dfn> means</dt>
      <dd>something specific.</dd>
      <dt id="another-term"><dfn>Another Term</dfn> means</dt>
      <dd>either this;</dd>
      <dd>or else this.</dd>
    </dl>

## Term Lookup

    This line references <a href="#some-term">Some Term</a> defined elsewhere.

## Table Listing

Typically used in schedules to an agreement.

    <table>
      <thead>
        <tr>
          <td>ID</td>
          <td>Name</td>
          <td>Quantity</td>
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
        <p><strong>The Consultant</strong></p>
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
