// There is a warning generated in running the test which says, (node:3393) ExperimentalWarning: 
// Importing JSON modules is an experimental feature and might change at any time
// I am using this code because the alternative is convoluted and I couldn't fully understand it

import { test, expect } from '@playwright/test';
import { BookingApiClient } from '../../utils/api-client';
import bookingData from '../../data/bookingData.json' assert { type: 'json' };

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Booking API Tests', () => {
  let bookingApi;
  let bookingId;

  test.beforeEach(async () => {
    bookingApi = new BookingApiClient();
  });

  test('Create and verify booking', async () => {
    // Create booking
    const createResponse = await bookingApi.createBooking(bookingData.validBooking);
    console.log('Creation Response:', JSON.stringify(createResponse, null, 2));

    bookingId = createResponse.bookingid;
    console.log(`Booking ID: ${bookingId}`);

    // Verify response
    expect(createResponse.booking).toEqual(bookingData.validBooking);
    expect(bookingId).toBeGreaterThan(0);

    // Get booking
    const getResponse = await bookingApi.getBooking(bookingId);
    console.log('Retrieved Booking:', JSON.stringify(getResponse, null, 2));
    
    // Verify details
    expect(getResponse).toEqual(bookingData.validBooking);
  });

  test('Create booking with minimum required fields', async () => {
    const minResponse = await bookingApi.createBooking(bookingData.minimalBooking);
    expect(minResponse.bookingid).toBeDefined();
    expect(minResponse.booking).toMatchObject(bookingData.minimalBooking);
    bookingId = minResponse.bookingid;
    console.log(`Booking ID: ${bookingId}`);
    console.log('Min Creation Response:', JSON.stringify(bookingData.minimalBooking, null, 2));
  });

  test.skip('Create booking with minimum required fields missing', async () => {
    const response = await bookingApi.createBooking(bookingData.invalidBooking);
    //expect(response.bookingid).toBeDefined();
    //expect(response.booking).toMatchObject(bookingData.invalidBooking);
    //console.log(`Booking ID: ${bookingId}`);
   // console.log('Min Creation Response:', JSON.stringify(minimalBooking, null, 2));
  });
});