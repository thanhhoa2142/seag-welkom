import sharp from "sharp";
import path from "path";
import fs from "fs";

const ICONS_DIR = path.join(process.cwd(), "public", "icons");
const SOURCE_ICON = path.join(process.cwd(), "public", "app-icon.png");

const SIZES = [72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
  // Create icons directory if it doesn't exist
  if (!fs.existsSync(ICONS_DIR)) {
    fs.mkdirSync(ICONS_DIR, { recursive: true });
  }

  // Generate icons for each size
  for (const size of SIZES) {
    await sharp(SOURCE_ICON)
      .resize(size, size)
      .toFile(path.join(ICONS_DIR, `icon-${size}x${size}.png`));

    console.log(`Generated ${size}x${size} icon`);
  }

  console.log("All PWA icons generated successfully!");
}

generateIcons().catch(console.error);
