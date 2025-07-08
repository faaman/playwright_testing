import { test, expect } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

const csvData = fs.readFileSync('../../data/data_01restful_create.csv');
const records = parse(csvData, {
  columns: true,
  skip_empty_lines: true
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

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.booking.firstname).toBe(firstname);
    expect(responseBody.booking.lastname).toBe(lastname);
  });
}