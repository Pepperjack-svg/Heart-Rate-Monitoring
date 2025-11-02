import { SerialPort, ReadlineParser } from "serialport";

let latestBpm = 0;

// Adjust COM port and baud rate
const port = new SerialPort({ path: "COM4", baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

parser.on("data", (line: string) => {
  const bpm = parseInt(line.trim());
  if (!isNaN(bpm) && bpm > 0 && bpm < 250) {
    latestBpm = bpm;
    console.log("❤️ BPM:", bpm);
  }
});

port.on("open", () => console.log("🔌 Connected to Arduino (COM4)"));
port.on("error", (err) => console.error("Serial error:", err.message));

export function getLatestBpm() {
  return latestBpm;
}
