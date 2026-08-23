import { expect, test } from "@playwright/test";

test("Create Booking - API - POST", async ({ request }) => {

    const requestBody = {
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Breakfast"
    };

    const response = await request.post("/booking", {data: requestBody});

    const responseBody = await response.json();

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody).toHaveProperty("booking");
    // expect(responseBody).toHaveProperty("additionalneeds");

    const booking = responseBody.booking;

    expect(booking).toMatchObject({
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "additionalneeds": "Breakfast"
    });

    expect(booking.bookingdates).toMatchObject({
        "checkin": "2018-01-01",
        "checkout": "2019-01-01"
    });
});