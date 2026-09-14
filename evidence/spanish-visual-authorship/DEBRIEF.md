# Shared visual authorship identity

Spanish visual records use id, while original English records use content_id. The authored-context lookup now accepts the Spanish identity only when the original record ID, source commit and source body SHA match the retained English original. Differently named derived records do not gain an inferred mapping. Existing English mapping is unchanged.

Spanish details label this material explicitly as existing authored context in English, not original Spanish source text. Original Spanish/translated notices and immutable source records remain intact. The existing attribution section deduplicates the description and disclaimer; no preview paragraph is added.

Native Spanish c197 and a111 checks pass: one attribution section, one explicit English-context label, one original authorship disclaimer. The unit test rejects wrong source hash and renamed derived IDs. Remote PR20 remained2e53ea8 on fetch; no Autofix changes to reconcile. No audio/provider changes. Author2 allocation consumed; exact build follows frozen commit.
