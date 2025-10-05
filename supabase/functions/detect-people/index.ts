import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Replicate from "https://esm.sh/replicate@0.25.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 1️⃣ API-Key aus Secrets holen
    const REPLICATE_API_KEY = Deno.env.get('REPLICATE_API_KEY');
    if (!REPLICATE_API_KEY) {
      throw new Error('REPLICATE_API_KEY is not set');
    }

    const replicate = new Replicate({ auth: REPLICATE_API_KEY });

    // 2️⃣ JSON Body prüfen
    let body;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const { imageUrl } = body;
    if (!imageUrl) {
      return new Response(
        JSON.stringify({ error: "Missing required field: imageUrl" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    console.log("Detecting people in image:", imageUrl);

    // 3️⃣ Aktuelles YOLOv8 Modell verwenden
    const output = await replicate.run(
      "meta/sam-2:fe97b453d0628e93297a7a508f7586a076717f9035174092b76174a7ed6a21e4",
      {
        input: { image: imageUrl },
      },
    );

    console.log("Detection response:", output);

    return new Response(JSON.stringify({ detections: output }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error("Error in detect-people function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
