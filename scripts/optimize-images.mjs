import sharp from "sharp";
import { readdir, rename, stat } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FOTO_DIR  = join(__dirname, "../public/foto");
const MAX_SIZE  = 1920;
const QUALITY   = 82;
const THRESHOLD = 500 * 1024; // skip jika sudah < 500KB (sudah dioptimasi)

const files = await readdir(FOTO_DIR);
const jpgs  = files.filter((f) => /\.(jpg|jpeg)$/i.test(f)).sort();

console.log(`\nMengoptimasi foto (skip jika sudah kecil)...\n`);

let totalBefore = 0;
let totalAfter  = 0;
let skipped     = 0;

for (const file of jpgs) {
  const input = join(FOTO_DIR, file);
  const info  = await stat(input);

  if (info.size < THRESHOLD) {
    console.log(`  ${file.padEnd(22)} — sudah kecil (${(info.size / 1024).toFixed(0)} KB), skip`);
    totalAfter += info.size;
    totalBefore += info.size;
    skipped++;
    continue;
  }

  const tmp = join(FOTO_DIR, "_tmp_" + file);
  const before = info.size;

  try {
    // Proses satu-satu, destroy instance setelah selesai
    const instance = sharp(input, { limitInputPixels: false });
    await instance
      .resize(MAX_SIZE, MAX_SIZE, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
      .toFile(tmp);
    instance.destroy();

    await rename(tmp, input);
    const after = (await stat(input)).size;
    const pct   = Math.round((1 - after / before) * 100);

    console.log(
      `  ${file.padEnd(22)} ${(before / 1048576).toFixed(1)} MB → ${(after / 1024).toFixed(0)} KB  (-${pct}%)`
    );

    totalBefore += before;
    totalAfter  += after;

    // Beri jeda kecil agar GC bisa berjalan
    await new Promise((r) => setTimeout(r, 100));
  } catch (err) {
    console.error(`  ✗ ${file}: ${err.message}`);
    // Hapus tmp jika ada
    try { await rename(tmp, tmp + ".err"); } catch {}
  }
}

const saved = totalBefore - totalAfter;
console.log(`\n✓ Selesai!`);
console.log(`  Diproses : ${jpgs.length - skipped} foto | Di-skip: ${skipped} foto`);
console.log(`  Sebelum  : ${(totalBefore / 1048576).toFixed(1)} MB`);
console.log(`  Sesudah  : ${(totalAfter  / 1048576).toFixed(1)} MB`);
console.log(`  Hemat    : ${(saved / 1048576).toFixed(1)} MB (${Math.round((saved / totalBefore) * 100)}%)\n`);
