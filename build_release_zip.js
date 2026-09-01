/**
 * =============================================================================
 * VEFA PLATFORM (v2.3.1) - RELEASE ZIP PACKAGER
 * =============================================================================
 * Command: node build_release_zip.js
 * Creates: VEFA_v2.3.1_Hostinger_Release.zip
 * =============================================================================
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("\n=======================================================");
console.log(" 📦 COMPILING VEFA v2.3.1 HOSTINGER RELEASE PACKAGE");
console.log("=======================================================\n");

const rootDir = __dirname;
const zipName = 'VEFA_v2.3.1_Hostinger_Release.zip';
const zipPath = path.join(rootDir, zipName);

// Clean up existing zip if any
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

// Use PowerShell Compress-Archive to create standard zip
const psCommand = `powershell -Command "Compress-Archive -Path '${rootDir}\\*' -Exclude '${rootDir}\\${zipName}', '${rootDir}\\build_release_zip.js' -DestinationPath '${zipPath}' -Force"`;

try {
  console.log("Creating standard ZIP archive via PowerShell...");
  execSync(psCommand, { stdio: 'inherit' });
  const stats = fs.statSync(zipPath);
  console.log(`\n✓ SUCCESS: Created ${zipName} (${(stats.size / 1024).toFixed(2)} KB)`);
  console.log(`Location: ${zipPath}`);
  console.log("\nReady for 1-Click Upload to Hostinger public_html!\n");
} catch (e) {
  console.error("Error creating zip archive:", e);
}
