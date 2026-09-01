import { expect, test } from "@playwright/test";
import { executeQuery } from "../../utils/dbUtils";

test("DB Testing", async ({page}) => {
    const query:string = "SELECT first_name, last_name, age, location FROM employees WHERE age >= ?;";
    const queryAge = "28";
    const records = await executeQuery(query, [queryAge] as any []);
    
    for (const record of records) {
        console.log(`${record.first_name} ${record.last_name} ${record.age} ${record.location}`);
    }
});
