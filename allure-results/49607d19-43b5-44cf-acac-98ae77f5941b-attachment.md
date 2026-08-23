# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API_Testing\post_api_request_01_createbooking.spec.ts >> Create Booking - API - POST
- Location: tests\API_Testing\post_api_request_01_createbooking.spec.ts:3:5

# Error details

```
Error: expect(received).toHaveProperty(path)

Expected path: "additionalneeds"
Received path: []

Received value: {"booking": {"additionalneeds": "Breakfast", "bookingdates": {"checkin": "2018-01-01", "checkout": "2019-01-01"}, "depositpaid": true, "firstname": "Jim", "lastname": "Brown", "totalprice": 111}, "bookingid": 1185}
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | test("Create Booking - API - POST", async ({ request }) => {
  4  | 
  5  |     const requestBody = {
  6  |         "firstname": "Jim",
  7  |         "lastname": "Brown",
  8  |         "totalprice": 111,
  9  |         "depositpaid": true,
  10 |         "bookingdates": {
  11 |             "checkin": "2018-01-01",
  12 |             "checkout": "2019-01-01"
  13 |         },
  14 |         "additionalneeds": "Breakfast"
  15 |     };
  16 | 
  17 |     const response = await request.post("/booking", {data: requestBody});
  18 | 
  19 |     const responseBody = await response.json();
  20 | 
  21 |     expect(response.ok()).toBeTruthy();
  22 |     expect(response.status()).toBe(200);
  23 | 
  24 |     expect(responseBody).toHaveProperty("bookingid");
  25 |     expect(responseBody).toHaveProperty("booking");
> 26 |     expect(responseBody).toHaveProperty("additionalneeds");
     |                          ^ Error: expect(received).toHaveProperty(path)
  27 | 
  28 |     const booking = responseBody.booking;
  29 | 
  30 |     expect(booking).toMatchObject({
  31 |         "firstname": "Jim",
  32 |         "lastname": "Brown",
  33 |         "totalprice": 111,
  34 |         "depositpaid": true,
  35 |         "additionalneeds": "Breakfast"
  36 |     });
  37 | 
  38 |     expect(booking.bookingdates).toMatchObject({
  39 |         "checkin": "2018-01-01",
  40 |         "checkout": "2019-01-01"
  41 |     });
  42 | });
```