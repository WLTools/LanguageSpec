# WLTools: Language Specification

The purpose of this wiki is to rigorously describe Wolfram Language to assist authors of Wolfram Language tools and students of programming languages. Despite its widespread use in academia and industry, **Wolfram Language has no formal specification**. This website is an attempt to fix that. If you are looking for [user documentation](https://reference.wolfram.com/language/) or a [programming tutorial](http://www.wolfram.com/language/elementary-introduction/2nd-ed/), you are in the wrong place.

Would you like to help construct a language specification for Wolfram Language? We invite contributions from anyone. It's as easy as clicking "<a href="https://github.com/WLTools/LanguageSpec/edit/master/docs/index.md" class="icon icon-github"> Edit on GitHub</a>" and writing some [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet). A good place to start is the [Contributing](Contributing/index.md) page.

Hit us up on...

* **Slack Workspace:** https://wolfr.am/y0c73dZg
* **GitHub:** [https://github.com/WLTools](https://github.com/WLTools) Unfortunately, GitHub requires organization members to be "invited" by email or GitHub username, but I intend it to be open to anyone who wishes to participate. Hit us up on Slack.

## Table of Contents

<script>
//Close all details.
function closeDetails(){
    // Fetch all the details element.
    const details = Array.from(document.querySelectorAll("details"));

    details.forEach((detail) => {
        detail.removeAttribute("open");
    });
}
window.addEventListener("load", closeDetails);
</script>

- [ ] Language Specification
    - [ ] Syntax
{!Specification/Syntax/tasks.md!}

    - [ ] Semantics
{!Specification/Semantics/tasks.md!}

    - [ ] Standard Library
{!Specification/StandardLibrary/tasks.md!}

    - [ ] Interfaces
{!Specification/Interfaces/tasks.md!}

- [ ] Resources for implementors
{!Resources/tasks.md!}

This website and its authors are not affiliated with Wolfram LLC in any way.
