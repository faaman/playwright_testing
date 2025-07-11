import { test, expect } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

const csvData = fs.readFileSync('../../data/data_01restful_create.csv');
const records = parse(csvData, {
  columns: true,
  skip_empty_lines: true
});

// Authenticate before running tests
let authToken;

test.beforeAll(async ({ request }) => {
  const authResponse = await request.post('http://localhost:3001/auth', {
    data: {
      username: 'admin',
      password: 'password123'
    }
  });

  expect(authResponse.status()).toBe(200);
  const { token } = await authResponse.json();
  expect(token).toBeDefined();

  authToken = token;
});

for (const { firstname, lastname } of records) {

  test(`Create booking for ${firstname} ${lastname}`, async ({ request }) => {
    const bookingData = {
      firstname,
      lastname,
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: '2018-01-01',
        checkout: '2019-01-13'
      },
      additionalneeds: 'Breakfast'
    };

    const response = await request.post('http://localhost:3001/booking', {
      data: bookingData
    });

    // Verify the booking creation is successful
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.bookingid).toBeDefined();
    const bookingId = responseBody.bookingid;

    expect(responseBody.booking.firstname).toBe(firstname);
    expect(responseBody.booking.lastname).toBe(lastname);
  

    // Verify the delete of the booking
    console.log(`Booking ID is: ${bookingId}`);
    const delResponse = await request.delete(`http://localhost:3001/booking/${bookingId}`, {
    headers: {
      Cookie: `token=${authToken}`  
    }
    });
    expect(delResponse.status()).toBe(201);
    // Verify delete using Get booking by ID
    const notFoundResponse = await request.post('http://localhost:3001/booking/${bookingId}', {
      data: bookingData
    });
    expect(notFoundResponse.status()).toBe(404);
  });
}