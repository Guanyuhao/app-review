#!/usr/bin/env node

import { execSync } from "child_process";
import { readdirSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");

const IPHONE_DIR = "iphone_65_1242x2688";
const IPAD_DIR = "ipad_13_2064x2752";
const IPAD_SIZE = "2064x2752";

function generateImages(appSlug) {
  const appDir = join(ROOT, "appstore", appSlug);
  const inputDir = join(appDir, "img", IPHONE_DIR);
  const outputDir = join(appDir, "img", IPAD_DIR);

  if (!existsSync(inputDir)) {
    console.error(`❌ Input directory not found: ${inputDir}`);
    process.exit(1);
  }

  const files = readdirSync(inputDir).filter((f) => f.endsWith(".png"));
  if (files.length === 0) {
    console.error(`❌ No PNG files found in ${inputDir}`);
    process.exit(1);
  }

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  console.log(`📱 Generating iPad ${IPAD_SIZE} images for ${appSlug}...`);

  for (const file of files) {
    const inputPath = join(inputDir, file);
    const outputFile = file.replace("_1242x2688", `_${IPAD_SIZE.replace("x", "x")}`);
    const outputPath = join(outputDir, outputFile);

    try {
      // ImageMagick: 等比缩放（不裁切）+ 居中 + 黑边填充到目标尺寸
      execSync(
        `magick "${inputPath}" -resize "${IPAD_SIZE}" -gravity center -background "#000000" -extent ${IPAD_SIZE} "${outputPath}"`,
        { stdio: "inherit" }
      );
      console.log(`✅ Generated: ${outputFile}`);
    } catch (error) {
      console.error(`❌ Failed to process ${file}:`, error.message);
    }
  }

  console.log(`\n✨ Done! Generated ${files.length} iPad images in ${outputDir}`);
}

// 解析命令行参数
const args = process.argv.slice(2);
const appIndex = args.indexOf("--app");
if (appIndex === -1 || !args[appIndex + 1]) {
  console.error("Usage: node gen-review-images.mjs --app <app-slug>");
  console.error("Example: node gen-review-images.mjs --app cold-wallet");
  process.exit(1);
}

const appSlug = args[appIndex + 1];
generateImages(appSlug);
