import { test, expect } from '@playwright/test';
import { BookingApiClient } from '../../utils/api-client';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Booking API Tests', () => {
  let bookingApi;
  let bookingId;
  const sampleBooking = {
    firstname: 'Playwright',
    lastname: 'Test',
    totalprice: 200,
    depositpaid: true,
    bookingdates: {
      checkin: '2024-06-01',
      checkout: '2024-06-05'
    },
    additionalneeds: 'Breakfast'
  };

  test.beforeEach(async () => {
    bookingApi = new BookingApiClient();
  });

  test('Create and verify booking', async () => {
    // Create booking
    const createResponse = await bookingApi.createBooking(sampleBooking);
    console.log('Creation Response:', JSON.stringify(createResponse, null, 2));
    bookingId = createResponse.bookingid;
    console.log(`Booking ID: ${bookingId}`);

    // Verify response
    expect(createResponse.booking).toEqual(sampleBooking);
    expect(bookingId).toBeGreaterThan(0);

    // Get booking
    const getResponse = await bookingApi.getBooking(bookingId);
    console.log('Retrieved Booking:', JSON.stringify(getResponse, null, 2));
    
    // Verify details
    expect(getResponse).toEqual(sampleBooking);
  });

  test('Create booking with minimum required fields', async () => {
    const minimalBooking = {
      firstname: 'Minimal',
      lastname: 'Test',
      totalprice: 100,
      depositpaid: false,
      bookingdates: {
        checkin: '2024-06-01',
        checkout: '2024-06-02'
      }
    };

    const response = await bookingApi.createBooking(minimalBooking);
    expect(response.bookingid).toBeDefined();
    expect(response.booking).toMatchObject(minimalBooking);
  });
});