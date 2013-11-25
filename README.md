# Legal Boilerplate

This is a service to browse and customise the growing collection of legal templates for startups in Singapore.

<http://legal.cf.sg>

## FAQ

###### Who is running this?

The service is being offered by Cofounders Pte Ltd. However, the legal agreements are authored and published by others.

###### So can I use these templates for free?

You sure can! Check out [LICENSE.md](LICENSE.md) for the copyright terms.

###### Why is this needed?

Startups have ninety-nine problems but legal expenses shouldn't be one. Let's face it, lawyers are expensive and startups don't have much money.

By sharing solid boilerplate contracts for common issues, a lot of repetitive legal work can be avoided.

###### Why are you doing this?

We want to contribute to the startup ecosystem in Singapore. As it grows stronger, we all benefit.

###### But won't you upset the lawyers?

Actually we have some awesome startup-loving lawyers contributing legal templates. And the Old Guard probably doesn't care about poor startups, let alone know about GitHub.

###### How do I help out?

See [`CONTRIBUTING.md`](CONTRIBUTING.md)

###### You rock!

Thanks.

## Disclaimer

Cofounders Pte Ltd is not a law firm, and the contributors to this service are not acting as your attorney.

The templates are free for use, however the authors (Bernard and Huifen) and Cofounders Pte Ltd cannot be responsible for the consequences of use.

Startups and investors alike should read and understand the templates and determine the suitability for their particular situation. If in doubt, you should consult professional advisors.

The authors welcome questions and comments to improve the templates but they are not able to consult for free as they have their day jobs.

## Installing Dependencies

Run all commands from within the source code folder (use `cd <path>` to get there).

    gem update --system
    gem install jekyll
    gem install bundler
    bundle install

#### Apple OS X

If `bundle` complains about `RedCloth`, install that gem manually by running `gem install RedCloth`.

If `gem install` cannot compile native extensions, you might still need to agree to the Xcode EULA. This is typically needed after installing or updating Xcode. Open Xcode to accept the terms, or run `sudo cpp` for the license prompt. Follow the on-screen instructions.

Try running the commands with `sudo` if anything else complains.

#### Windows

Use Ruby 1.9.3 and Pygments.rb 0.5.0

After installing dependencies, run:

    gem uninstall pygments.rb
    gem install pygments.rb  -v 0.5.0

And in `Gemfile.lock` edit as follows:

    pygments.rb (0.5.0)

## Local Development

1. Run Jekyll

        bundle exec jekyll serve --watch

1. Visit [http://localhost:4000](http://localhost:4000)
