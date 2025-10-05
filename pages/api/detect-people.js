export default async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(200).send("ok");

  try {
    const REPLICATE_API_KEY = process.env.REPLICATE_API_KEY;
    if (!REPLICATE_API_KEY) throw new Error("REPLICATE_API_KEY missing");

    const { imageUrl } = req.body; // ggf. Body parsing prüfen

    // Replicate request
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${REPLICATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "ultralytics/yolov8-l-seg:bde6834d8583487c67c293701a2c3dbf949c8f6154562086e33054b419409849",
        input: { image: imageUrl, classes: "0" },
      }),
    });

    const result = await response.json();
    return res.status(200).json({ detections: result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
