const admin = require("firebase-admin");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const path = require("path");

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// Helper to format timestamp
function formatTimestamp(ts) {
  // Example: "July 9, 2025 at 9:58:51 PM UTC+5:30"
  const regex = /(\w+) (\d+), (\d+) at (\d+):(\d+):(\d+)\s([AP]M)/;
  const match = ts.match(regex);
  if (!match) return ts;
  const [_, month, day, year, hour, min, sec, ampm] = match;
  const months = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };
  let h = parseInt(hour, 10);
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return `${day.padStart(2, "0")}|${months[month]}|${year} ${h
    .toString()
    .padStart(2, "0")}:${min}:${sec}`;
}

async function exportCollection(collectionName, csvFileName) {
  const snapshot = await db.collection(collectionName).get();
  const records = [];
  let idx = 1;
  snapshot.forEach((doc) => {
    const data = doc.data();
    records.push({
      index: idx++,
      energy_kwh: data.energy_kwh,
      hostel: data.node_id,
      timestamp: formatTimestamp(data.timestamp),
    });
  });

  const csvWriter = createCsvWriter({
    path: path.join(__dirname, csvFileName),
    header: [
      { id: "index", title: "Index" },
      { id: "energy_kwh", title: "energy_kwh" },
      { id: "hostel", title: "hostel" },
      { id: "timestamp", title: "timestamp" },
    ],
  });

  await csvWriter.writeRecords(records);
  console.log(`Exported ${collectionName} to ${csvFileName}`);
}

(async () => {
  await exportCollection("energy_data_BH3", "energy_data_BH3.csv");
  await exportCollection("energy_data_BH4", "energy_data_BH4.csv");
  process.exit(0);
})();
