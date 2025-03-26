const AdmZip = require('adm-zip');
const path = require('path');
const fs = require('fs');

const pkg = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8')
);
const distFolder = path.join(process.cwd(), 'dist');
const date = new Date().toISOString().slice(0, 10);
const outFileName = `${pkg.name}-v${pkg.version}-${date}.zip`;
const outPath = path.join(distFolder, outFileName);

if (!fs.existsSync(distFolder)) {
  console.error('❌ Dist folder not found! Run the build first.');
  process.exit(1);
}

if (fs.existsSync(outPath)) {
  fs.unlinkSync(outPath);
}

console.log(`Zipping ${distFolder} into ${outFileName} inside dist/...`);

const zip = new AdmZip();
zip.addLocalFolder(distFolder);
zip.writeZip(outPath);

console.log(`✅ Created ${outFileName} in dist/`);
