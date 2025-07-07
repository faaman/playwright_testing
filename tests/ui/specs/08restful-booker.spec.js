import { test, expect, request } from '@playwright/test';

// These tests are on the RESTful Booker API run locally on port 3001

test('01 - Ping Status code', async ({ request }) => {
  const response = await request.get('http://localhost:3001/ping'); 
  if (response.status() == 200) {
    console.log('Ping successful with accurate status code 200');
  } else if (response.status() == 201) {
    console.log('Ping is successful but the application supplied status code 201 Created');
  } else {
    console.log('Ping failed with unexpected status code:', response.status());
  }
});