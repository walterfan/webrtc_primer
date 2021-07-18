###########################
WebRTC Tutorial
###########################

.. contents::
   :local:



About the tutorial
===========================

The tutorial is just for primer of WebRTC developing.


Build the tutorial
===========================

To build and view
-------------------

**Build requirements**

#. `Python3`_

   -  Mac: brew install python

#. `Make`_ toolchain

   -  Mac: xcode-select --install # on terminal
   -  Win: Install cygwin

#. Install sphinx and theme

::

   pip install sphinx
   pip install sphinx_rtd_theme
   pip install recommonmark

   sphinx-quickstart

   vi source/conf.py

   #Repalce alabaster with sphinx_rtd_theme
  
#. build

::

   make clean html
   open build/html/index.html

To edit docs
---------------------

::

   cd source
   <make-edits-and-save>
   (cd ..; make html)

To publish tutorial
---------------------

::

   git pull # Pull the latest changes
   git push # Push the changes back up


.. _Python3: https://docs.python.org/3/
.. _Make: https://www.gnu.org/software/make/


Tips
===========================

refer to `Sphinx-doc <https://www.sphinx-doc.org/en/master/index.html>`_

Tip 1: support Markdown
---------------------------

The `pandoc`_ tool is excellent to convert from markdown or HTML into RST.
However, the tool isn't perfect and usually a read through is required with
some hand editing. One item which can be problematic is tables. See
`Tip 3: Tables`_.

.. code-block:: shell

  # convert markdown to reStructuredText
  pandoc xxx.rst -o xxx.md
  # convert reStructuredText to markdown 
  pandoc --to RST --reference-links xxx.md > xxx.rst


Let Spinx support recommonmark

.. code-block:: shell

    pip install recommonmark
    pip install sphinx_rtd_theme

    vi conf.py

    source_suffix = ['.rst', '.md', '.MD']
    html_theme = 'sphinx_rtd_theme'
    
    source_parsers = {
      '.md': CommonMarkParser,
      '.MD': CommonMarkParser,
    }


Tip 2: Editors
---------------------------

Any text editor will do, but the `Visual Stuido Code`_ editor plus the
`reStructuredText extension`_ provides the best support this author has found
for the RST language.

It includes syntax highlighting, linting and sphinx-doc.org support.

Useful commands include, "Reflow text" to re-wrap paragraphs.

Tip 3: Tables
---------------------------

The RST language supports `four types of tables`_. The "simple" can quickly
become unwieldy. The python `rstdoc`_ package provides the "rstlisttable"
command to convert grid tables into list-tables. 

for example,

.. code-block::

   .. list-table::
      :widths: 15 10 25 50
      :header-rows: 1

      * - Class
        - Responsibility
        - Collaborator
        - Comment
      * - AudioReceiveStream
        - deal with audio receive stream
        - parent: webrtc::AudioReceiveStream
        - file: audio_receive_stream.h


.. _github/markup: https://github.com/github/markup
.. _Visual Stuido Code: https://code.visualstudio.com/
.. _reStructuredText extension: https://docs.restructuredtext.net/
.. _pandoc: https://pandoc.org/
.. _four types of tables: https://www.sphinx-doc.org/en/master/usage/restructuredtext/directives.html#tables
.. _rstdoc: https://pypi.org/project/rstdoc/

