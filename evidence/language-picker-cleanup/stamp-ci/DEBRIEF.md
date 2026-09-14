# Release-stamp CI ordering repair

Moved mandatory artifact verification from the pre-build unit glob to the end of npm run build. It requires exactly one stamp matching package.json version and actual git short HEAD, not merely a seven-character pattern; missing dist still fails the post-build check. No product change.

All53 pre-build units pass; strict210-file build and exact0.1.1+21e5de3 stamp pass. Author <=1 minute from separate picker20 allocation, prior18 retained. Future builds check their own current revision; reviewed inventory is a dated build receipt, not a claim about an unbuilt later commit.
