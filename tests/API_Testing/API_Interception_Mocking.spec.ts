import { expect, test } from "@playwright/test";

// 01. Intercepting the request and sending the mock data
test("Mocking API and interception data before reaching servers...", async ({ page }) => {
    await page.route("**/api/v1/fruits", async (route) => {
        const mockResponseBody = [
            {
                "name": "test01",
                "id": 1
            },
            {
                "name": "test02",
                "id": 2
            },
            {
                "name": "test03",
                "id": 3
            },
            {
                "name": "test04",
                "id": 4
            }
        ];

        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(mockResponseBody)
        });
    });

    await page.goto("https://demo.playwright.dev/api-mocking/");
    await page.waitForTimeout(10000);
});

// 02. Intercepting the request, approving to intercept servers with additional details in headers
test("Interception response after reaching servers (NOT RESPONSE)...", async ({ page }) => {
    await page.route("**/api/v1/fruits", async (route) => {
        const header = {
            ...route.request().headers(),
            "X-Test-Header": "Playwright"
        };

        route.continue({ headers: header });
    });

    await page.goto("https://demo.playwright.dev/api-mocking/");
    await page.waitForTimeout(10000);
});


// 03. Intercepting the response, modifying the content
test.only("Interception response after reaching servers and sending modified response", async ({ page }) => {
    await page.route("**/api/v1/fruits", async (route) => {

        const response = await route.fetch();
        const responseBody: any = await response.json();

        responseBody.push({
            "name": "jennifer lopez",
            "id": 11
        });

        await route.fulfill({
            response,
            headers: {
                ...route.request().headers(),
                "X-Intercepted-Response": "Playwright"
            },
            body: JSON.stringify(responseBody)
        });
    });

    await page.goto("https://demo.playwright.dev/api-mocking/");
    await page.waitForTimeout(10000);
});