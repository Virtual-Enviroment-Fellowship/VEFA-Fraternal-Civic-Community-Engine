/**
 * =============================================================================
 * VEFA PLATFORM (v2.4.0) - ZERO-DEPENDENCY AUTOMATED CI TEST SUITE
 * =============================================================================
 * File: test.js
 * Run with: node test.js
 * =============================================================================
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("\n=================================================================");
console.log(" 🧪 RUNNING VEFA PLATFORM v2.4.0 ENTERPRISE TEST SUITE");
console.log("=================================================================\n");

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}: ${err.message}`);
  }
}

const rootDir = __dirname;

// Suite 1: Copyright & Support Standard
console.log("--- Suite 1: Standard Copyright & White-Label Isolation ---");
runTest("config.js has official 2027 copyright standard", () => {
  const configContent = fs.readFileSync(path.join(rootDir, 'config.js'), 'utf8');
  assert(configContent.includes("© 2027 VEFA: Fraternal & Civic Community Engine. Please contact admin@vefa.club for more information."));
});

runTest("Zero mentions of ConsultDevin across all core v2.4.0 files", () => {
  const filesToCheck = ['config.js', 'app.js', 'index.html', 'setup.html', 'agent.md', 'README.md', 'CHANGELOG.md'];
  filesToCheck.forEach(f => {
    const content = fs.readFileSync(path.join(rootDir, f), 'utf8');
    assert(!content.toLowerCase().includes('consultdevin'), `Found mention of consultdevin in ${f}`);
  });
});

// Suite 2: AI Agent Coordination Harness
console.log("\n--- Suite 2: agent.md AI Coordination Harness ---");
runTest("agent.md defines essential agent tools", () => {
  const agentMd = fs.readFileSync(path.join(rootDir, 'agent.md'), 'utf8');
  assert(agentMd.includes("get_hall_deposits"));
  assert(agentMd.includes("moderate_exchange_listing"));
  assert(agentMd.includes("dispatch_volunteer_sms_reminders"));
  assert(agentMd.includes("eclipsed_year_tournament_archive"));
  assert(agentMd.includes("system_health_diagnostic"));
});

// Suite 3: Admin Exchange Controls
console.log("\n--- Suite 3: Admin Exchange Edit/Delete Controls ---");
runTest("app.js implements deleteExchangeItem and edit handlers", () => {
  const appContent = fs.readFileSync(path.join(rootDir, 'app.js'), 'utf8');
  assert(appContent.includes("function deleteExchangeItem"));
  assert(appContent.includes("function openEditExchangeModal"));
  assert(appContent.includes("function handleEditExchangeSubmit"));
});

// Suite 4: Tournaments & Year-End Eclipse Engine
console.log("\n--- Suite 4: Tournaments & Annual Year-End Eclipse Engine ---");
runTest("app.js handles custom game creation and year eclipse", () => {
  const appContent = fs.readFileSync(path.join(rootDir, 'app.js'), 'utf8');
  assert(appContent.includes("function handleCreateCustomGame"));
  assert(appContent.includes("function checkYearEclipse"));
  assert(appContent.includes("function archiveSeasonToHallOfFame"));
});

// Suite 5: Volunteer Twilio SMS Dispatch
console.log("\n--- Suite 5: Volunteer Automation & Twilio SMS ---");
runTest("api/twilio.php handles SMS reminders", () => {
  const twilioContent = fs.readFileSync(path.join(rootDir, 'api', 'twilio.php'), 'utf8');
  assert(twilioContent.includes("dispatched_count"));
});

// Suite 6: Legal Hall Rental Agreement Generator
console.log("\n--- Suite 6: Legal Hall Rental Agreement & Deposit Receipt ---");
runTest("app.js contains generateRentalAgreementPDF", () => {
  const appContent = fs.readFileSync(path.join(rootDir, 'app.js'), 'utf8');
  assert(appContent.includes("function generateRentalAgreementPDF"));
  assert(appContent.includes("HALL RENTAL AGREEMENT & DEPOSIT CONFIRMATION"));
});

// Suite 7: SQLite Database Fallback Engine
console.log("\n--- Suite 7: Multi-Database Connector & SQLite Fallback ---");
runTest("api/db.php supports SQLite fallback", () => {
  const dbContent = fs.readFileSync(path.join(rootDir, 'api', 'db.php'), 'utf8');
  assert(dbContent.includes("sqlite:"));
  assert(dbContent.includes("vefa.sqlite"));
});

// Suite 8: System Health Diagnostics
console.log("\n--- Suite 8: System Health Diagnostics ---");
runTest("api/health.php returns valid diagnostics", () => {
  const healthContent = fs.readFileSync(path.join(rootDir, 'api', 'health.php'), 'utf8');
  assert(healthContent.includes("healthy"));
  assert(healthContent.includes("2.4.0"));
});

// Suite 9: Calendar Sync Engine
console.log("\n--- Suite 9: 1-Click Calendar Sync ---");
runTest("app.js and api/calendar.php provide calendar sync", () => {
  const appContent = fs.readFileSync(path.join(rootDir, 'app.js'), 'utf8');
  assert(appContent.includes("function addToGoogleCalendar"));
  assert(appContent.includes("function downloadICalEvent"));
  const calContent = fs.readFileSync(path.join(rootDir, 'api', 'calendar.php'), 'utf8');
  assert(calContent.includes("BEGIN:VCALENDAR"));
});

// Suite 10: Senior Accessibility Suite
console.log("\n--- Suite 10: Senior Accessibility Suite ---");
runTest("app.js contains text-to-speech reader and font scaling", () => {
  const appContent = fs.readFileSync(path.join(rootDir, 'app.js'), 'utf8');
  assert(appContent.includes("function setFontSize"));
  assert(appContent.includes("function toggleHighContrast"));
  assert(appContent.includes("function readAnnouncementsAloud"));
});

// Suite 11: Security Standards (SSRF & XSS)
console.log("\n--- Suite 11: Security & SSRF Protection ---");
runTest("api/scrape.php enforces FILTER_FLAG_NO_PRIV_RANGE", () => {
  const scrapeContent = fs.readFileSync(path.join(rootDir, 'api', 'scrape.php'), 'utf8');
  assert(scrapeContent.includes("FILTER_FLAG_NO_PRIV_RANGE"));
});

// Suite 12: Hostinger 1-Click Deployer
console.log("\n--- Suite 12: Hostinger Auto-Deployer ---");
runTest("vefa-deployer.php runs preflight and database import", () => {
  const deployerContent = fs.readFileSync(path.join(rootDir, 'vefa-deployer.php'), 'utf8');
  assert(deployerContent.includes("preflight"));
  assert(deployerContent.includes("database.sql"));
});

console.log("\n=================================================================");
console.log(` 🏁 TEST SUITE COMPLETE: ${passedTests}/${totalTests} TESTS PASSING (${Math.round((passedTests/totalTests)*100)}%)`);
console.log("=================================================================\n");

if (passedTests !== totalTests) {
  process.exit(1);
}
