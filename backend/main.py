import zlib
import base64
import requests
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
#from transformers import pipeline
from gradio_client import Client

app = FastAPI()

# Allow CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model pipeline with a max length of 1024
#pipe = pipeline("text2text-generation", model="vinzur/results", max_length=1024)
#pipe = pipeline("text2text-generation", model="vinnyy/results", max_length=1024)

PLANTUML_SERVER = "http://www.plantuml.com/plantuml"  


def plantuml_encode(uml_text):
    """
    Encode PlantUML text into a URL-safe string.
    """
    # UTF-8 encoding
    utf8_bytes = uml_text.encode('utf-8')
    
    # Deflate compression
    compressed_data = zlib.compress(utf8_bytes)[2:-4]  # Strip zlib header and checksum
    
    # Base64-like encoding
    encoded_data = encode_plantuml_base64(compressed_data)
    
    return encoded_data

def encode_plantuml_base64(data):
    """
    Encode bytes to PlantUML's custom base64 format.
    """
    base64_chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_"
    encoded = []
    for i in range(0, len(data), 3):
        chunk = data[i:i+3]
        if len(chunk) == 3:
            b1, b2, b3 = chunk
            encoded.append(base64_chars[b1 >> 2])
            encoded.append(base64_chars[((b1 & 0x03) << 4) | (b2 >> 4)])
            encoded.append(base64_chars[((b2 & 0x0F) << 2) | (b3 >> 6)])
            encoded.append(base64_chars[b3 & 0x3F])
        elif len(chunk) == 2:
            b1, b2 = chunk
            encoded.append(base64_chars[b1 >> 2])
            encoded.append(base64_chars[((b1 & 0x03) << 4) | (b2 >> 4)])
            encoded.append(base64_chars[(b2 & 0x0F) << 2])
        elif len(chunk) == 1:
            b1 = chunk[0]
            encoded.append(base64_chars[b1 >> 2])
            encoded.append(base64_chars[(b1 & 0x03) << 4])
    return ''.join(encoded)

def generate_plantuml_url(uml_text):
    """
    Generate the full PlantUML URL.
    """
    base_url = "https://www.plantuml.com/plantuml/svg/"
    encoded_text = plantuml_encode(uml_text)
    return base_url + encoded_text


@app.post("/process")
async def process_text(request: Request):
    data = await request.json()
    text = data.get("text", "")
    print("Input:", text)
    if not text:
        return {"result": "No input provided."}
    
    try:
        print("Processing the request...")
        # Generate PlantUML code using the model
        #result = pipe(text)
        #generated_code = result[0]["generated_text"]

        # Call the hosted API endpoint on Hugging Face Spaces via gradio_client
        client = Client("vinzur/Prompt-to-PlantUML", hf_token="REVOKED_TOKEN")
        result = client.predict(query=text, api_name="/predict")
        generated_code = result
        
        print("Generated PlantUML Code:", generated_code)

        # Encode the generated code for PlantUML rendering
        diagram_url = generate_plantuml_url(generated_code)
        

        return {
            "generated_code": generated_code,
            "diagram_url": diagram_url
        }
    except Exception as e:
        return {"error": f"Failed to process the request: {str(e)}"}