import http from 'http';
import app from '../server/dist/index.js';

async function runHttpVerification() {
  console.log('--- Starting Real Production HTTP Server Verification ---');

  // Start production app on dynamic port (simulating Phusion Passenger)
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 5000;
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`✓ Production server running on dynamic port: ${port}`);

  const results = [];

  async function checkRoute(label, path, options = {}) {
    const expectedStatus = options.expectedStatus || 200;
    const expectedContentType = options.expectedContentType || 'text/html';
    const matchPattern = options.matchPattern || null;

    try {
      const res = await fetch(`${baseUrl}${path}`, { redirect: 'manual' });
      const contentType = res.headers.get('content-type') || '';
      const text = await res.text();

      const statusOk = res.status === expectedStatus;
      const typeOk = contentType.includes(expectedContentType);
      const matchOk = matchPattern ? matchPattern.test(text) : true;

      const passed = statusOk && typeOk && matchOk;

      results.push({
        label,
        path,
        status: res.status,
        expectedStatus,
        contentType,
        expectedContentType,
        passed,
        snippet: text.slice(0, 100).replace(/\n/g, ' '),
      });

      console.log(`${passed ? '✔' : '✖'} ${label} [${path}] -> ${res.status} (${contentType.split(';')[0]})`);
      if (!passed) {
        console.error(`  Failure details: statusOk=${statusOk}, typeOk=${typeOk}, matchOk=${matchOk}`);
      }
    } catch (err) {
      results.push({
        label,
        path,
        error: err.message,
        passed: false,
      });
      console.log(`✖ ${label} [${path}] -> Error: ${err.message}`);
    }
  }

  // Execute all required HTTP test scenarios
  await checkRoute('1. Homepage Prerender', '/', {
    expectedStatus: 200,
    expectedContentType: 'text/html',
    matchPattern: /معدنکو|Madan Co/,
  });

  await checkRoute('2. Blog Archive Page', '/blog', {
    expectedStatus: 200,
    expectedContentType: 'text/html',
    matchPattern: /دانشنامه|مقالات/,
  });

  await checkRoute('3. Article 1 (Energy Consumption)', '/blog/factors-affecting-energy-consumption-in-comminution', {
    expectedStatus: 200,
    expectedContentType: 'text/html',
    matchPattern: /عوامل مؤثر بر مصرف انرژی/,
  });

  await checkRoute('4. Article 2 (Flotation Principles)', '/blog/froth-flotation-principles-and-operational-parameters', {
    expectedStatus: 200,
    expectedContentType: 'text/html',
    matchPattern: /فلوتاسیون/,
  });

  await checkRoute('5. Article 3 (Crusher Comparison)', '/blog/jaw-vs-cone-vs-impact-crushers-comparison', {
    expectedStatus: 200,
    expectedContentType: 'text/html',
    matchPattern: /سنگ‌شکن/,
  });

  await checkRoute('6. Admin Login Route (SPA Fallback)', '/admin/login', {
    expectedStatus: 200,
    expectedContentType: 'text/html',
    matchPattern: /<div id="root">/,
  });

  await checkRoute('7. Health Endpoint (/health)', '/health', {
    expectedStatus: 200,
    expectedContentType: 'application/json',
    matchPattern: /"status":\s*"healthy"/,
  });

  await checkRoute('7b. API Health Endpoint (/api/health)', '/api/health', {
    expectedStatus: 200,
    expectedContentType: 'application/json',
    matchPattern: /"status":\s*"healthy"/,
  });

  await checkRoute('8. Sitemap XML', '/sitemap.xml', {
    expectedStatus: 200,
    expectedContentType: 'xml',
    matchPattern: /<urlset|<url>/,
  });

  await checkRoute('9. Robots.txt', '/robots.txt', {
    expectedStatus: 200,
    expectedContentType: 'text/plain',
    matchPattern: /User-agent:/,
  });

  await checkRoute('10. Valid Public API', '/api/settings/public', {
    expectedStatus: 200,
    expectedContentType: 'application/json',
    matchPattern: /09999196630|معدنکو/,
  });

  await checkRoute('11. Invalid API Route (Must return JSON 404, NEVER HTML)', '/api/unknown-non-existent-endpoint-test', {
    expectedStatus: 404,
    expectedContentType: 'application/json',
    matchPattern: /"success":\s*false/,
  });

  await checkRoute('12. Non-existent Route (SPA Fallback to index.html)', '/non-existent-page-path-random-xyz', {
    expectedStatus: 200,
    expectedContentType: 'text/html',
    matchPattern: /<div id="root">/,
  });

  await checkRoute('13. Uploads Path Handling (Missing media returns 404)', '/uploads/missing-image.png', {
    expectedStatus: 404,
  });

  // Close server
  await new Promise((resolve) => server.close(resolve));

  const allPassed = results.every((r) => r.passed);
  console.log('=======================================================');
  console.log(`Total HTTP Scenarios: ${results.length}`);
  console.log(`Passed: ${results.filter((r) => r.passed).length}`);
  console.log(`Failed: ${results.filter((r) => !r.passed).length}`);
  console.log(`HTTP Audit Verdict: ${allPassed ? 'ALL HTTP TESTS PASSED (100%)' : 'SOME TESTS FAILED'}`);
  console.log('=======================================================');

  if (!allPassed) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runHttpVerification().catch((err) => {
  console.error('HTTP Verification Fatal Error:', err);
  process.exit(1);
});
