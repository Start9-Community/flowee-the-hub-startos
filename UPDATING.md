# Updating the upstream version

This package compiles **Flowee the Hub** from a git checkout of the upstream source. Upstream publishes no
release binaries and no container image, so there is nothing to re-tag — the Dockerfile does the
build.

## Determining the upstream version

Releases are tagged `YYYY.MM.patch` on Codeberg:

```sh
curl -s 'https://codeberg.org/api/v1/repos/Flowee/thehub/tags?limit=1' | jq -r '.[0].name'
```

The pin lives in `startos/manifest/index.ts` under `images.flowee.source.dockerBuild.buildArgs`,
as a pair: `VERSION` is the release tag, `COMMIT` is the full commit SHA it resolves to. The build
clones the tag, checks out `COMMIT`, and fails unless the tag points to it, so a moved tag breaks
the build instead of changing what it compiles. Upstream's tags are unsigned, so there is no
signature to check.

Resolve a tag to its commit with:

```sh
git ls-remote https://codeberg.org/Flowee/thehub.git 'refs/tags/<tag>*'
```

For an annotated tag the listing has two lines; take the commit from the one ending `^{}`.

## Applying the bump

1. Set both `VERSION` and `COMMIT` in `startos/manifest/index.ts` to the new tag and its commit.
2. Set `version` in `startos/versions/current.ts` to `<upstream>:0`, dropping the leading zero
   from the month — upstream `2026.05.2` is ExVer `2026.5.2`.
3. A compile failure after a bump usually means a new dependency, which goes in the builder stage
   of `Dockerfile`.
