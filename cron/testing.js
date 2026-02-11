import cron from "node-cron";
import artifact from "../models/artifact";
export const testing =() => {
    console.log("Testing cron job setup...");
    cron.schedule("15 19 * * *", () => {//minute hour day month weekday
        console.log("Running a task every minute");
    });
}

