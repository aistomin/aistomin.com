#!/bin/bash

set -e

# Regenerates favicon.ico from favicon-source.svg.
#
# favicon.ico is a derived binary: three bitmaps (16/32/48) in one ICO
# container. Run this after editing favicon-source.svg, then commit the
# regenerated icon. Nothing in the site build or the test suite needs this
# script - it is a one-off asset step.

SOURCE="favicon-source.svg"
TARGET="favicon.ico"

echo "========================================="
echo "Building $TARGET from $SOURCE"
echo "========================================="

if [ ! -f "$SOURCE" ]; then
    echo ""
    echo "⚠️  ERROR: $SOURCE not found. Run this from the repository root."
    echo ""
    exit 1
fi

# ImageMagick does the downscaling and assembles the ICO container. It is not
# part of this repository's toolchain, so it has to be installed separately.
if ! command -v magick > /dev/null 2>&1; then
    echo ""
    echo "⚠️  ERROR: ImageMagick (magick) is not installed."
    echo ""
    echo "Install it with:"
    echo "  brew install imagemagick"
    echo ""
    exit 1
fi

# The SVG draws the letters as text, so it needs a real text-shaping engine -
# ImageMagick's built-in SVG renderer is not one. Chromium already ships with
# Playwright for the e2e suite, so reuse it instead of adding a dependency.
if [ ! -d "playwright/node_modules/@playwright/test" ]; then
    echo ""
    echo "⚠️  ERROR: Playwright is not installed, so there is no Chromium to render with."
    echo ""
    echo "Install it with:"
    echo "  cd playwright && npm install && npx playwright install --with-deps"
    echo ""
    exit 1
fi

WORK_DIR=$(mktemp -d)
trap 'rm -rf "$WORK_DIR"' EXIT

# At 16px the letters of the full-size design shrink into mush, so that entry
# gets its own artwork with the glyphs scaled up to fill the box. This is
# ordinary optical sizing: the 16px icon reads as the same mark, not as a
# proportionally identical one.
#
# Rewrite whatever values the <text> element currently carries rather than the
# ones it happens to have today, so editing the design cannot quietly disable
# the tweak.
sed -E '/<text/{ s/font-size="[0-9.]+"/font-size="64"/; s/y="[0-9.]+"/y="76"/; }' \
    "$SOURCE" > "$WORK_DIR/source-16.svg"

# Then check the rewrite actually landed. Asserting on the result catches the
# case a diff against the source does not: one substitution matching and the
# other silently missing, which yields a 16px entry with the wrong artwork.
if ! grep -q 'font-size="64"' "$WORK_DIR/source-16.svg" ||
   ! grep -q 'y="76"' "$WORK_DIR/source-16.svg"; then
    echo ""
    echo "⚠️  ERROR: could not build the enlarged 16px variant of $SOURCE."
    echo ""
    echo "The <text> element no longer looks the way the sed expression in this"
    echo "script expects. Update it to scale the glyphs up for the 16px entry."
    echo ""
    exit 1
fi

cat > "$WORK_DIR/render.js" <<'RENDER_JS'
const { chromium } = require('@playwright/test');
const fs = require('fs');

// Render an SVG to PNG at an exact pixel size. The caller renders large and
// downscales afterwards, because a good resampling filter treats antialiased
// text more kindly than the browser's own tiny-size text rendering does.
(async () => {
  const [, , svgPath, outPath, size] = process.argv;
  const px = Number(size);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: px, height: px }, deviceScaleFactor: 1 });
  await page.setContent(
    `<style>html,body{margin:0;padding:0}svg{display:block;width:${px}px;height:${px}px}</style>` +
    fs.readFileSync(svgPath, 'utf8')
  );
  await page.locator('svg').screenshot({ path: outPath });
  await browser.close();
})();
RENDER_JS

export NODE_PATH="$PWD/playwright/node_modules"

echo ""
echo "Rendering the vector source at 256px..."
node "$WORK_DIR/render.js" "$SOURCE" "$WORK_DIR/full-256.png" 256
node "$WORK_DIR/render.js" "$WORK_DIR/source-16.svg" "$WORK_DIR/small-256.png" 256

echo "Downscaling to 48, 32 and 16..."
magick "$WORK_DIR/full-256.png"  -filter Lanczos -resize 48x48 "$WORK_DIR/icon-48.png"
magick "$WORK_DIR/full-256.png"  -filter Lanczos -resize 32x32 "$WORK_DIR/icon-32.png"
magick "$WORK_DIR/small-256.png" -filter Lanczos -resize 16x16 "$WORK_DIR/icon-16.png"

echo "Assembling the ICO container..."
magick "$WORK_DIR/icon-16.png" "$WORK_DIR/icon-32.png" "$WORK_DIR/icon-48.png" "$TARGET"

echo ""
echo "========================================="
echo "Done. $TARGET is now:"
echo "========================================="
file "$TARGET"
echo ""
