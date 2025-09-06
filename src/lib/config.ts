export const config = {
dryRun: (process.env.DRY_RUN || "true").toLowerCase() === "true",
allowedRecipients: (process.env.ALLOWED_RECIPIENTS || "")
.split(",")
.map(s => s.trim())
.filter(Boolean)
};