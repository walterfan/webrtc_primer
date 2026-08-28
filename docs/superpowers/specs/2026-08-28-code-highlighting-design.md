# Local C++ source highlighting design

## Goal

Add readable C++ syntax highlighting to the `starter.hpp` and `starter.cpp`
tabs of the local RTC Practice Lab website. The site must remain usable without
internet access and without a JavaScript build step.

## Design

- Vendor a pinned Prism.js distribution and its default light theme under
  `snippets/basic/web/vendor/`.
- Serve the two fixed assets from explicit Crow routes with JavaScript and CSS
  content types; do not introduce a user-controlled static-file route.
- Load the Prism theme in `index.html`, then load Prism after `app.js`.
- Keep README and test-output panes as plain text. Only the two C++ tabs call
  Prism with the `cpp` grammar.
- Before every highlighted render, assign the fetched source to `textContent`
  and let Prism operate on that DOM node. The app must never insert exercise
  source with `innerHTML`.
- If the Prism script fails to load, the preformatted source remains readable
  as plain text; navigation and testing continue to work.

## Verification

- Browser smoke test: Day 01 header/source tabs show distinct C++ token colors;
  README and test output stay plain text.
- Browser safety test: a source string containing `<script>` is displayed as
  text and does not create an executable DOM node.
- Existing `node --check`, CMake build, and CTest suite remain green.
