import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const iconMasterSvg = join(projectRoot, 'src-tauri', 'icons', 'icon-source.svg');
const iconMasterPng = join(projectRoot, 'icon.png');
const iconsDir = join(projectRoot, 'src-tauri', 'icons');

const sizes = [32, 64, 128, 256];
const icoSizes = [16, 24, 32, 48, 64, 128, 256];
const storeSizes = [
  { name: 'StoreLogo.png', size: 50 },
  { name: 'Square30x30Logo.png', size: 30 },
  { name: 'Square44x44Logo.png', size: 44 },
  { name: 'Square71x71Logo.png', size: 71 },
  { name: 'Square89x89Logo.png', size: 89 },
  { name: 'Square107x107Logo.png', size: 107 },
  { name: 'Square142x142Logo.png', size: 142 },
  { name: 'Square150x150Logo.png', size: 150 },
  { name: 'Square284x284Logo.png', size: 284 },
  { name: 'Square310x310Logo.png', size: 310 },
];

function getIconSource() {
  if (existsSync(iconMasterSvg)) return iconMasterSvg;
  if (existsSync(iconMasterPng)) return iconMasterPng;
  throw new Error('Icon source not found. Create src-tauri/icons/icon-source.svg or icon.png at project root.');
}

function resizeFromSource(iconSrc, size) {
  return sharp(iconSrc, { density: 384 })
    .resize(size, size, { fit: 'contain', kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 9, adaptiveFiltering: true });
}

async function generateIcons() {
  const iconSrc = getIconSource();
  console.log('Generating icons from:', iconSrc);

  // PNG outputs for Tauri bundle
  for (const size of sizes) {
    const filename = size === 256 ? '128x128@2x.png' : `${size}x${size}.png`;
    const output = join(iconsDir, filename);
    await resizeFromSource(iconSrc, size).toFile(output);
    console.log(`Created: ${filename}`);
  }

  // Base icon used by some platforms/tools
  await resizeFromSource(iconSrc, 512).toFile(join(iconsDir, 'icon.png'));
  console.log('Created: icon.png');

  // Windows tray icon
  await resizeFromSource(iconSrc, 32).toFile(join(iconsDir, 'tray-icon.png'));
  console.log('Created: tray-icon.png');

  // ICO with multiple embedded sizes for crisp desktop rendering
  const pngBuffers = await Promise.all(
    icoSizes.map((size) => resizeFromSource(iconSrc, size).toBuffer())
  );
  const icoBuffer = await pngToIco(pngBuffers);
  writeFileSync(join(iconsDir, 'icon.ico'), icoBuffer);
  console.log('Created: icon.ico');

  // Windows store logos
  for (const { name, size } of storeSizes) {
    await resizeFromSource(iconSrc, size).toFile(join(iconsDir, name));
    console.log(`Created: ${name}`);
  }

  console.log('\nDone! All icons generated.');
}

generateIcons().catch(console.error);
