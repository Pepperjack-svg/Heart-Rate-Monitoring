const { SerialPort, ReadlineParser } = require("serialport");
const axios = require("axios");

const portPath = "COM4"; // your Arduino port
const baudRate = 9600;
const apiUrl = "http://localhost:3000/api/heartbeat";

let port;
let parser;
let reconnectTimer = null;

// Function to start serial connection
function connectSerial() {
  try {
    console.log(`🔌 Trying to connect to Arduino on ${portPath}...`);
    port = new SerialPort({ path: portPath, baudRate });

    parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

    port.on("open", () => {
      console.log(`✅ Connected to Arduino on ${portPath}`);
      clearTimeout(reconnectTimer);
    });

    parser.on("data", async (line) => {
      const bpm = parseInt(line.trim());
      if (!isNaN(bpm) && bpm > 0 && bpm < 250) {
        console.log("❤️ BPM:", bpm);
        try {
          await axios.post(apiUrl, { bpm });
          console.log("📡 Sent to:", apiUrl);
        } catch (err) {
          console.error("⚠️ API Error:", err.message);
        }
      }
    });

    port.on("close", () => {
      console.log("⚠️ Serial port closed. Retrying in 5 seconds...");
      reconnect();
    });

    port.on("error", (err) => {
      console.error("❌ Serial error:", err.message);
      reconnect();
    });

  } catch (error) {
    console.error("💥 Connection failed:", error.message);
    reconnect();
  }
}

// Reconnect logic
function reconnect() {
  if (reconnectTimer) return; // avoid multiple timers
  reconnectTimer = setTimeout(() => {
    console.log("🔁 Attempting to reconnect to Arduino...");
    reconnectTimer = null;
    connectSerial();
  }, 5000);
}

// Start connection
connectSerial();
