import { request } from '@playwright/test';

export class BookingApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL || 'https://restful-booker.herokuapp.com';
  }

  async createBooking(bookingData) {
    const context = await request.newContext();
    const response = await context.post(`${this.baseURL}/booking`, {
      data: bookingData,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    return await response.json();
  }

  async getBooking(bookingId) {
    const context = await request.newContext();
    const response = await context.get(`${this.baseURL}/booking/${bookingId}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    return await response.json();
  }
}