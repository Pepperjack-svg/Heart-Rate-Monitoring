import { SerialPort, ReadlineParser } from "serialport";
import axios from "axios";

const portPath = "COM4"; // your Arduino port
const baudRate = 9600;
const apiUrl = "http://localhost:3000/api/heartbeat";

const port = new SerialPort({ path: portPath, baudRate });
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

port.on("open", () => console.log(`🔌 Connected to Arduino on ${portPath}`));

parser.on("data", async (line: string) => {
  const bpm = parseInt(line.trim());
  if (!isNaN(bpm) && bpm > 0 && bpm < 250) {
    console.log("❤️ BPM:", bpm);
    try {
      await axios.post(apiUrl, { bpm });
      console.log("✅ Sent to:", apiUrl);
    } catch (err: any) {
      console.error("❌ Failed to send:", err.message);
    }
  }
});

port.on("error", (err: Error) => console.error("Serial error:", err.message));
