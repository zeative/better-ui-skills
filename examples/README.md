# Before and after

Each folder holds one prompt (`prompt.txt`) and the two pages built from it by the same model:

- `without-skill/index.html`: a headless session in an empty folder with no skills installed.
- `with-better-ui/index.html`: the same, with the better-ui skill installed. The session was never told about the skill.

Nothing was edited afterwards. Open either file in a browser; the apps keep their sample data in localStorage.
