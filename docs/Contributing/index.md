# How to Contribute

Would you like to help construct a language specification for Wolfram Language? It's as easy as writing some [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).


* **Slack Workspace:** https://wolfr.am/y0c73dZg
* **GitHub:** [https://github.com/WLTools](https://github.com/WLTools) Unfortunately, GitHub requires organization members to be "invited" by email or GitHub username, but I intend it to be open to anyone who wishes to participate. Hit us up on Slack.


## Writing Content

### Get the Content

Fork the [repository on GitHub](https://github.com/WLTools). Then grab a local copy of your fork:

```bash
$ git clone git@github.com:yourusername/LanguageSpec.git
```

### Writing

The content is written in Markdown files in a folder hierarchy in the docs directory. We have a [style guide](Style-Guide.md) to help us write consistently. The style guide also explains how to typeset mathematics and other special content. If you add a file and want it to appear in the navigation menu, edit the mkdocs.yml file in the repository's root directory and include the file you want to add under `nav` following the existing examples.

### Giving Back

Finally, commit and push your changes:

```bash
$ git commit -m "A meaningful commit message about the changes here."
$ git push origin master
```

Then create a [pull request](https://help.github.com/articles/about-pull-requests/) on GitHub. Done!

## Modifying the Website Theme or Structure

You probably won't need to modify the theme or structure of the website.
The site is statically generated with [MkDocs](https://www.mkdocs.org/). We use a custom theme based on the [MkDocs Bootswatch Flatly](https://github.com/mkdocs/mkdocs-bootswatch/tree/master/mkdocs_bootswatch/flatly) and [ReadTheDocs Dropdown](https://github.com/cjsheets/mkdocs-rtd-dropdown) themes.

MkDocs is Python based, so we need a few `pip install`'s. As usual, you will want to create a new Python 3 virtual environment. Then install MkDocs and a couple of libraries for code highlighting and Markdown extensions:

```bash
$ pip install mkdocs pygments pymdown-extensions
```

If you haven't already, fork the [repository on GitHub](https://github.com/WLTools), and grab a local copy of your fork:

```bash
$ git clone git@github.com:yourusername/LanguageSpec.git
```

The left hand navigation and top navigation menu are specified in the `mkdocs.yml` file.
