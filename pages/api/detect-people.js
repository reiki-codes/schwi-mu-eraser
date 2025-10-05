// pages/api/detect-people.js

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "authorization, x-client-info, apikey, content-type"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).send("ok");
  }

  try {
    // 🔑 API Key aus Environment
    const REPLICATE_API_KEY = process.env.REPLICATE_API_KEY;
    if (!REPLICATE_API_KEY) {
      throw new Error("REPLICATE_API_KEY is not set in Vercel");
    }

    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Missing required field: imageUrl" });
    }

    console.log("Detecting people in:", imageUrl);

    const MODEL_ID =
      "ultralytics/yolov8-l-seg:bde6834d8583487c67c293701a2c3dbf949c8f6154562086e33054b419409849";

    // Anfrage an Replicate
    const replicateResponse = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${REPLICATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: MODEL_ID,
        input: {
          image: imageUrl,
          classes: "0", // Nur Personen
        },
      }),
    });

    if (!replicateResponse.ok) {
      const errorText = await replicateResponse.text();
      console.error("Replicate API error:", errorText);
      return res.status(500).json({ error: "Replicate API error", details: errorText });
    }

    const result = await replicateResponse.json();
    console.log("Detection response:", result);

    return res.status(200).json({ detections: result });
  } catch (error) {
    console.error("Error in detect-people handler:", error);
    return res
      .status(500)
      .json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
}
