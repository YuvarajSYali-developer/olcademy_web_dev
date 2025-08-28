const http = require('http');

console.log('🔍 Checking application health...\n');

// Check backend health
const checkBackend = () => {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:5000/api/health', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const health = JSON.parse(data);
          resolve({
            status: '✅ Backend is running',
            details: health,
            code: res.statusCode
          });
        } catch (e) {
          resolve({
            status: '⚠️ Backend responded but with invalid JSON',
            details: data,
            code: res.statusCode
          });
        }
      });
    });

    req.on('error', (err) => {
      resolve({
        status: '❌ Backend is not running',
        details: err.message,
        code: 'N/A'
      });
    });

    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        status: '⏰ Backend request timed out',
        details: 'No response within 5 seconds',
        code: 'TIMEOUT'
      });
    });
  });
};

// Check frontend health
const checkFrontend = () => {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:5173', (res) => {
      resolve({
        status: '✅ Frontend is running',
        details: `Status: ${res.statusCode}`,
        code: res.statusCode
      });
    });

    req.on('error', (err) => {
      resolve({
        status: '❌ Frontend is not running',
        details: err.message,
        code: 'N/A'
      });
    });

    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        status: '⏰ Frontend request timed out',
        details: 'No response within 5 seconds',
        code: 'TIMEOUT'
      });
    });
  });
};

// Main health check
async function runHealthCheck() {
  console.log('📊 Backend Status:');
  const backendHealth = await checkBackend();
  console.log(`   ${backendHealth.status}`);
  console.log(`   Details: ${JSON.stringify(backendHealth.details, null, 2)}`);
  console.log(`   Code: ${backendHealth.code}\n`);

  console.log('🌐 Frontend Status:');
  const frontendHealth = await checkFrontend();
  console.log(`   ${frontendHealth.status}`);
  console.log(`   Details: ${frontendHealth.details}`);
  console.log(`   Code: ${frontendHealth.code}\n`);

  // Summary
  console.log('📋 Summary:');
  if (backendHealth.status.includes('✅') && frontendHealth.status.includes('✅')) {
    console.log('🎉 All systems are running! Your app should be working.');
    console.log('🌐 Visit: http://localhost:5173');
  } else if (backendHealth.status.includes('❌') && frontendHealth.status.includes('❌')) {
    console.log('🚨 Both servers are down. Please start them first.');
    console.log('💡 Run: start-app.bat or start-app.ps1');
  } else if (backendHealth.status.includes('❌')) {
    console.log('⚠️ Backend is down. Frontend may show demo data.');
    console.log('💡 Start backend: cd backend && npm run dev');
  } else if (frontendHealth.status.includes('❌')) {
    console.log('⚠️ Frontend is down. Backend is running.');
    console.log('💡 Start frontend: cd frontend && npm run dev');
  }

  console.log('\n💡 Tips:');
  console.log('- Use start-app.bat (Windows) or start-app.ps1 (PowerShell)');
  console.log('- Check SETUP_INSTRUCTIONS.md for detailed help');
  console.log('- Backend health: http://localhost:5000/api/health');
}

runHealthCheck();
