# C++ RTC Practice Lab: local learning website design

## Goal

Add a local-only learning website for the existing 30 C++ SIP/WebRTC exercises.
The site uses a C++20 Crow HTTP server and unbundled HTML/JavaScript, following
the source-layout style of `csms-test-service`: a C++ server exposes routes and
serves a `web/` directory directly. It complements, rather than replaces, the
terminal/TUI workflow.

The first release is a single-user local study tool. It lets the learner select
one exercise, read its task and starter code, edit the code in a local editor,
and run only that exercise's GoogleTest acceptance case from the browser.

## Non-goals

- Editing source files from the browser.
- User authentication, collaboration, or remote access.
- Persisting progress on the server; completion state lives in browser
  `localStorage`.
- Running arbitrary commands, tests, paths, or CMake arguments supplied by the
  browser.
- Building a frontend bundle or adding a JavaScript framework.

## Architecture

`practice_web_server` is a new C++20 executable in `snippets/basic`. It starts
Crow on loopback only (`127.0.0.1`) and serves:

- `web/index.html` and `web/app.js` as static application assets;
- a JSON index of all 30 exercises;
- a JSON detail object containing the selected README, `starter.hpp`, and
  `starter.cpp`;
- a controlled request to run the selected exercise's acceptance test.

The server is composed into four narrow units:

| Unit | Responsibility |
| --- | --- |
| `web_server` | Crow setup, static assets, HTTP status and JSON responses. |
| `exercise_repository` | Maps day `01`–`30` to a known exercise directory and reads approved files. |
| `test_runner` | Maps a valid day to a fixed GoogleTest filter, starts CTest, captures bounded output and enforces a timeout. |
| `server_config` | Resolves the project/build paths once at startup and validates them. |

The browser has no source-writing endpoint. `app.js` renders the exercise
directory, task/code tabs, and the latest local result. It stores completion
markers by day in `localStorage`.

## User flow

1. Opening `/` loads the 30-day navigation and selects Day 01 by default.
2. Selecting a day calls its detail endpoint and renders Requirements,
   How-to-start, Given/When/Then acceptance criteria, `starter.hpp`, and
   `starter.cpp` with explicit TODOs.
3. The learner opens and edits the local `starter.cpp` in their editor, then
   saves it.
4. Clicking **Run Day NN acceptance** refreshes the selected files and calls
   the fixed-day test endpoint.
5. The result pane reports pass, fail, skip/TODO, build error, timeout, or
   server error, along with elapsed time and bounded process output.
6. The learner may manually mark a passed day complete; the browser persists
   that marker locally.

## API contract

| Endpoint | Response / behavior |
| --- | --- |
| `GET /health` | `{ "ok": true }` for local health checks. |
| `GET /api/exercises` | Ordered 30-day metadata: day, title, topic, and local TODO/completion indicator. |
| `GET /api/exercises/<day>` | `200` with README and two source texts for an allowlisted two-digit day; `404` otherwise. |
| `POST /api/exercises/<day>/run` | Validates the day, launches only its fixed acceptance filter, then returns result state, elapsed milliseconds and truncated output. |

`<day>` must match an existing, two-digit catalog entry. The response content
type for API routes is `application/json; charset=utf-8`; static files use
explicit safe content types.

## Security and process constraints

- Bind to `127.0.0.1`; no external interface is configured.
- Resolve the exercise root at startup and permit reads only of the 30 known
  `README.md`, `starter.hpp`, and `starter.cpp` files below it. Reject path
  traversal and symlink escapes.
- Never concatenate request data into shell commands. Use a fixed executable
  and argument vector for the selected day, with no request-controlled command,
  directory, filter, environment, or timeout.
- Do not expose directory listings, arbitrary static file reads, secrets, or
  environment variables.
- Cap captured stdout/stderr and kill/reap the child process at a conservative
  timeout. Return a generic server error without internal filesystem details.
- The server is intended only for a trusted developer's local checkout. It does
  not claim to sandbox C++ compilation or user-written test code.

## Build and dependencies

The existing CMake project remains the entry point. A dedicated
`snippets/basic/conanfile.py` pins `crowcpp-crow/1.2.1` with SSL disabled, as in
the reference service. `conan install` generates CMakeDeps/CMakeToolchain files
and CMake uses `find_package(Crow CONFIG REQUIRED)`. `practice_web_server`
links Crow separately from `practice_core`. GoogleTest continues to be used for
the acceptance targets.

Build instructions will document a separate web-server target and a startup
command. The server accepts a documented build-directory option so it can run
against the existing `build/basic` CTest configuration without modifying the
practice exercises.

## Verification

- Unit tests cover day validation, approved-file resolution, rejection of
  traversal/unknown days, and construction of the fixed test invocation.
- HTTP tests cover `/health`, the exercise index, valid/invalid detail routes,
  and invalid run requests.
- A runner test uses a short deterministic fixture to verify pass, skip/fail,
  output truncation, and timeout classification without executing arbitrary
  commands.
- Manual smoke test: build, start loopback server, load `/`, inspect Day 01,
  edit and save its local source, run Day 01 only, and verify that the result
  panel changes.
- Existing `ctest --test-dir build/basic --output-on-failure` must continue to
  pass; the 30 unsolved acceptance cases remain skipped until implemented.

## Acceptance criteria

- Given the project is built, when the learner starts the server, then the
  browser can open the local site and navigate all 30 exercises.
- Given a valid day, when the learner selects it, then only its approved README
  and starter files are returned and displayed.
- Given a path-traversal or unknown day request, when it reaches the server,
  then it receives a safe client error and no unintended file is read.
- Given a selected day, when the learner clicks Run, then only that day's fixed
  GoogleTest acceptance filter is executed and a bounded result is displayed.
- Given a source is saved in the local editor, when the learner runs its day,
  then the new build/test outcome is displayed without a browser-side upload.
