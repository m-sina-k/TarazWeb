import type { VercelRequest, VercelResponse } from "@vercel/node";
import connctDatabase from "../../src/config/database.config";
import { processRecurringTransactions } from "../../src/crons/jobs/transaction.job";

let dbConnected = false;
const ensureDbConnection = async () => {
  if (!dbConnected) {
    await connctDatabase();
    dbConnected = true;
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Verify cron secret (optional but recommended for security)
  const authHeader = req.headers.authorization;
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    await ensureDbConnection();
    const result = await processRecurringTransactions();

    if (result.success) {
      res.status(200).json({
        success: true,
        message: "Cron job executed successfully",
        processedCount: result.processedCount,
        failedCount: result.failedCount,
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error || "Cron job failed",
      });
    }
  } catch (error) {
    console.error("Cron job error:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Cron job failed",
    });
  }
}
