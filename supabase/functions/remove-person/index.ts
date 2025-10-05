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
    const REPLICATE_API_KEY = Deno.env.get('REPLICATE_API_KEY');
    if (!REPLICATE_API_KEY) {
      throw new Error('REPLICATE_API_KEY is not set');
    }

    const replicate = new Replicate({ auth: REPLICATE_API_KEY });
    const { imageUrl, maskUrl } = await req.json();

    if (!imageUrl || !maskUrl) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: imageUrl and maskUrl" }), 
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    console.log("Removing person from image:", imageUrl);
    
    // Use LaMa for inpainting
    const output = await replicate.run(
      "andreasjansson/lama-cleaner:d783dc5c1e9e70d5c0ca4f564c44c9f37a08e7b39ff6b28ba88e0f74ca80d3e2",
      {
        input: {
          image: imageUrl,
          mask: maskUrl,
        }
      }
    );

    console.log("Removal response:", output);
    
    return new Response(JSON.stringify({ result: output }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error("Error in remove-person function:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
