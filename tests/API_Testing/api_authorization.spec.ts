import dotenv from "dotenv";
import { Buffer } from "buffer";
import { expect, test } from "@playwright/test";

dotenv.config();

// 2. Basic Auth
test("Basic Auth", async ({request}) => {
    const username = process.env.BASIC_AUTH_USERNAME;
    const password = process.env.BASIC_AUTH_PASSWORD;

    const base64Credentials:string = Buffer.from(`${username}:${password}`).toString("base64");
    console.log("Encoded String:", base64Credentials);

    const response = await request.get("https://postman-echo.com/basic-auth", {
        headers: {
            Authorization: `Basic ${base64Credentials}`
        }
    });
    const responseBody = await response.json();
    console.log(responseBody);
    
    expect(response.status()).toBe(200);
    expect(responseBody.authenticated).toBe(true);
    
});

// 3. API Auth
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
test("API AUTH", async({request}) => {
    const apikey = process.env.OPENWEATHER_API_KEY;
    const city = "Delhi";

    const response = await request.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
            q: city,
            appid: apikey!
        }
    });
    const responseBody = await response.json();
    console.log("Response Received:", responseBody);

    expect(response.status()).toBe(200);

});

// 4. Bearer (JWT) Auth
test.only("Bearer (JWT - JSON Web Token)", async({request}) => {
    const token = process.env.GITHUB_AUTH;

    const response = await request.get("https://api.github.com/user/repos", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const responseBody = await response.json();
    // console.log(responseBody);
    const length = responseBody.length;

    for(let i=0; i<length; i++) {
        console.log("Repostiory Name:", responseBody[i].name);
        
    }
    
    expect(response.status()).toBe(200);
})