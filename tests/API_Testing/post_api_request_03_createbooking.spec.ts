import { expect, test } from "@playwright/test";
import {DateTime} from "luxon";
import {faker} from "@faker-js/faker"


test("Create Booking - API - POST", async ({request}) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int({min:500, max:5000});
    const depositpaid = faker.datatype.boolean();
    const additionalneeds = "Breakfast";

    const checkindate = DateTime.now().toFormat("yyyy-MM-dd");
    const checkoutdate = DateTime.now().plus({day:5}).toFormat("yyyy-MM-dd");

    const requestBody = {
        "firstname": firstName,
        "lastname": lastName,
        "totalprice": totalPrice,
        "depositpaid": depositpaid,
        "bookingdates": {
            "checkin": checkindate,
            "checkout": checkoutdate
        },
        "additionalneeds": additionalneeds
    }

    const response = await request.post("/booking", {data: requestBody});

    const responseBody = await response.json();

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody).toHaveProperty("booking");

    const booking = responseBody.booking;

    expect(booking).toMatchObject({
        "firstname": firstName,
        "lastname": lastName,
        "totalprice": totalPrice,
        "depositpaid": depositpaid,
        "additionalneeds": additionalneeds
    });

    expect(booking.bookingdates).toMatchObject({
        "checkin": checkindate,
        "checkout": checkoutdate
    });
});