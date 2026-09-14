# Optional manifest status correction

A known failed optional Spanish audio manifest is passed as explicit null, while an omitted LanguagesPanel prop retains initial bundled availability. The status reads complete with optional chaining. This changes no loading, source, audio or global banner behavior.

Native verification: intercept the actual manifest URL including its hash query with HTTP503. Spanish Guide text still opens, and returning to Languages reports narration not yet prepared without a null exception. Initial English picker retains bundled status. The first route omitted the query suffix and did not intercept; its failed receipt remains as evidence.

Fetched remote PR20 before editing: a45fda5, with no Autofix commit. Author charge at most two minutes under additive correction3; independent review precedes public push.
