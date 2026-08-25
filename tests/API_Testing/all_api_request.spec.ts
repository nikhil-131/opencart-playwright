import { expect, test } from "@playwright/test";
import fs from "fs"

async function readJSONFile(filePath: string) {
    const data = await JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return data;
}

test("API Test - GET, POST, PUT, PATCH, DELETE", async ({ request }) => {
    const baseURL: String = "https://restful-booker.herokuapp.com";

    // 1. POST Request
    const requestBody = await readJSONFile("data/post_createbooking.json");

    const postResponse = await request.post(`${baseURL}/booking`, { data: requestBody });
    const postResponseBody = await postResponse.json();

    // Status validation
    expect(postResponse.ok()).toBeTruthy();
    expect(postResponse.status()).toBe(200);

    // boooking checking
    expect(postResponseBody).toHaveProperty("bookingid");
    expect(postResponseBody).toHaveProperty("booking");

    const postBooking = postResponseBody.booking;

    // validate the inner json object
    expect(postBooking).toMatchObject({
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "additionalneeds": "Breakfast"
    });

    expect(postBooking.bookingdates).toMatchObject({
        "checkin": "2026-10-10",
        "checkout": "2026-10-15"
    });

    // 2. GET Request
    const bookingID: string = postResponseBody.bookingid;
    const getResponse = await request.get(`${baseURL}/booking/${bookingID}`);
    const getResponseBody = await getResponse.json();

    // Status validation
    expect(getResponse.ok()).toBeTruthy();
    expect(getResponse.status()).toBe(200);

    // validate the inner json object
    expect(getResponseBody).toMatchObject({
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "additionalneeds": "Breakfast"
    });

    expect(getResponseBody.bookingdates).toMatchObject({
        "checkin": "2026-10-10",
        "checkout": "2026-10-15"
    });

    // Token generation
    const tokenRequestBody = await readJSONFile("data/post_token.json");
    const tokenResponse = await request.post(`${baseURL}/auth`, { data: tokenRequestBody });
    const tokenResponseBody = await tokenResponse.json();
    const tokenKey: string = tokenResponseBody.token;

    // 3. PATCH Request
    const patchRequestBody = await readJSONFile("data/patch_booking.json");

    const patchResponse = await request.patch(`${baseURL}/booking/${bookingID}`, {
        headers: {
            "Content-Type": "application/json",
            "Cookie": `token=${tokenKey}`
        },
        data: patchRequestBody
    });
    const patchResponseBody = await patchResponse.json();

    // Status validation
    expect(patchResponse.ok()).toBeTruthy();
    expect(patchResponse.status()).toBe(200);

    // validate the inner json object
    expect(patchResponseBody).toMatchObject({
        "firstname": "Haseena",
        "lastname": "Dilbar",
        "totalprice": 221,
        "additionalneeds": "Sauna"
    });

    // 4. PUT Request
    const putRequestBody = await readJSONFile("data/put_booking.json");

    const putResponse = await request.put(`${baseURL}/booking/${bookingID}`, {
        headers: {
            "Content-Type": "application/json",
            "Cookie": `token=${tokenKey}`
        },
        data: putRequestBody
    });
    const putResponseBody = await putResponse.json();

    // Status validation
    expect(putResponse.ok()).toBeTruthy();
    expect(putResponse.status()).toBe(200);

    // validate the inner json object
    expect(putResponseBody).toMatchObject({
        "firstname": "Narang",
        "lastname": "Saxena",
        "totalprice": 999,
        "depositpaid": true,
        "additionalneeds": "Shock"
    });

    const bookingDates = putResponseBody.bookingdates;
    expect(bookingDates).toMatchObject({
        "checkin": "2026-10-10",
        "checkout": "2026-10-15"
    });

    // 5. DELETE Request
    const deleteResonse = await request.delete(`${baseURL}/booking/${bookingID}`, {
        headers: {
            "Content-Type": "application/json",
            "Cookie": `token=${tokenKey}`
        }
    });

    expect(deleteResonse.ok()).toBeTruthy();
    expect(deleteResonse.status()).toBe(201);

})