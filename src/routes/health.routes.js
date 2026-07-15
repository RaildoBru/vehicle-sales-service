import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor(uptime / 60);
  const seconds = Math.floor(uptime);
  const formattedUptime = `${hours} hours(s), ${Math.floor((uptime % 3600) / 60)} minutes(s) and ${Math.floor(uptime % 60)} seconds(s)`;

  res.status(200).json({
    status: 'ok',
    uptime: {
      hours,
      minutes,
      seconds
    },
    uptimeFormatted: formattedUptime,
    timestamp: new Date().toISOString(),
  });
});

export default router;

/***
 * 
 * "status": "ok",
  "uptime": 12.365529434,
  "uptimeFormatted": "0 hours(s), 0 minutes(s) and 12 seconds(s)",
  "timestamp": "2026-07-14T23:52:46.877Z"
 */