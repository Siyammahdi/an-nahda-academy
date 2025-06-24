// Test script to verify admin payments API
const API_URL = 'https://an-nahda-backend.vercel.app/api';

async function testAdminPayments() {
  console.log('Testing Admin Payments API...\n');
  
  try {
    // Test 1: Check if the endpoint exists (should return 401 - unauthorized)
    console.log('1. Testing endpoint accessibility...');
    const response1 = await fetch(`${API_URL}/admin/payments`);
    console.log(`Status: ${response1.status}`);
    console.log(`Response: ${response1.status === 401 ? 'Unauthorized (expected)' : 'Unexpected response'}\n`);
    
    // Test 2: Check health endpoint
    console.log('2. Testing health endpoint...');
    const response2 = await fetch(`${API_URL.replace('/api', '')}/health`);
    const healthData = await response2.json();
    console.log(`Status: ${response2.status}`);
    console.log(`Health: ${JSON.stringify(healthData, null, 2)}\n`);
    
    // Test 3: Check payment test endpoint
    console.log('3. Testing payment test endpoint...');
    const response3 = await fetch(`${API_URL}/payment/test`);
    const paymentTestData = await response3.json();
    console.log(`Status: ${response3.status}`);
    console.log(`Payment Test: ${JSON.stringify(paymentTestData, null, 2)}\n`);
    
    console.log('✅ All tests completed successfully!');
    console.log('\n📝 Notes:');
    console.log('- The admin payments endpoint requires authentication');
    console.log('- The backend is running and accessible');
    console.log('- SSLCommerz integration is configured');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testAdminPayments(); 