# It's easy to help out.

Collaboration is key to this project. Legal templates are complex legal documents that become better through iteration and feedback.

### Discussion

The [cofounders/legal](https://github.com/cofounders/legal) repository on GitHub is where the legal templates are stored.

It is a public repo so anyone can participate in the discussion by creating and commenting on [issues](https://github.com/cofounders/legal/issues).

### Workflow

All you need is basic HTML familiarity. Everything can be done through the GitHub website right from your browser.

1. Fork the repository to edit the legal templates.

    How to: [Fork A Repo](https://help.github.com/articles/fork-a-repo)

1. Edit templates to your heart's content.

1. Use Pull Requests to share your tempalte.

    How to: [Using Pull Requests](https://help.github.com/articles/using-pull-requests)

1. Once reviewed by a committer, the contribution will be merged into the public repository and available to the world.

### Editing

These guidelines should help all templates live in peace and harmony.

1. Place your template in `_posts` and name it according to [Jekyll's file name format](http://jekyllrb.com/docs/posts/).

    The date will be taken as the date of publication for this document, regardless of when the commits were made.

    For example: `2013-12-25-christmas_letter.html`

1. Ensure the template has the correct YAML front-matter.

    Example:

    ```yaml
    ---
    layout: document
    title: Consulting Agreement
    license:
      name: Creative Commons Attribution 3.0 Singapore (CC BY 3.0 SG)
      url: http://creativecommons.org/licenses/by/3.0/sg/deed.en_US
    authors:
      - name: Cofounders Pte Ltd
        contact: http://www.cofounders.sg/
    tags:
      - consultant
      - entrepreneur
    ---
    ```

    1. The template property must be set to `document` to be rendered correctly.

    1. Document tags are used to filter the document listing. The currently supported tags are: `consultant`, `entrepreneur`, and `investor`.

    1. List the authors' names and email/web addresses in the YAML front-matter if they wish to be attributed.

    1. Yo dawg, we heard you like licenses so always specify a license for your license. The recommended license for legal documents in Singapore is [Creative Commons Attribution 3.0 Singapore (CC BY 3.0 SG)](http://creativecommons.org/licenses/by/3.0/sg/deed.en_US). It comes in many other country specific flavours.

1. Author your legal template by following the HTML structures as defined in [`PRIMITIVES.md`](PRIMITIVES.md).
