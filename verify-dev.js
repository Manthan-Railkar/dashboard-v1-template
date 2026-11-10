const http = require('http');

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function verifyPage(path) {
  console.log(`\n================ Testing ${path} ================`);
  const pageRes = await get(`http://localhost:3000${path}`);
  console.log(`Page status: ${pageRes.status} (body length: ${pageRes.body.length})`);
  if (pageRes.status !== 200) {
    throw new Error(`Page ${path} returned status ${pageRes.status}`);
  }

  // Find all CSS and JS URLs in the HTML
  const cssRegex = /href="(\/_next\/static\/[^"]+\.css[^"]*)"/g;
  const jsRegex = /src="(\/_next\/static\/[^"]+\.js[^"]*)"/g;

  const assets = new Set();
  let m;
  while ((m = cssRegex.exec(pageRes.body)) !== null) assets.add(m[1]);
  while ((m = jsRegex.exec(pageRes.body)) !== null) assets.add(m[1]);

  console.log(`Found ${assets.size} static assets to verify on ${path}:`);
  for (const asset of assets) {
    const assetRes = await get(`http://localhost:3000${asset}`);
    console.log(`  [${assetRes.status}] ${asset} (${assetRes.body.length} bytes)`);
    if (assetRes.status !== 200) {
      throw new Error(`Asset ${asset} failed with status ${assetRes.status}`);
    }
  }
}

async function run() {
  try {
    await verifyPage('/');
    await verifyPage('/profile');
    await verifyPage('/saved');
    console.log('\n>>> ALL PAGES AND STATIC ASSETS LOADED WITH STATUS 200 OK! <<<');
  } catch (err) {
    console.error('Verification failed:', err.message);
    process.exit(1);
  }
}

run();

