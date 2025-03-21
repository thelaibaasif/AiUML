import zlib
import base64
import requests
import re
from typing import Optional
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
#from transformers import pipeline
from gradio_client import Client
import os
from dotenv import load_dotenv

load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")
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


# ----------------------------------- Use Case Optimization --------------------------- #

def optimize_use_case_diagram(diagram_text):
    """
    Optimizes a use case diagram in PlantUML by adding appropriate sub-usecases.
    """
    lines = diagram_text.splitlines()

    # --- 1. Process the usecase definitions block ---
    # Locate the rectangle block.
    block_start_idx = None
    block_end_idx = None
    for i, line in enumerate(lines):
        if re.match(r'^\s*rectangle\s+\S+\s*{', line):
            block_start_idx = i
            break
    if block_start_idx is None:
        return diagram_text  # No rectangle block found; return unchanged.

    # Find the closing "}" of the rectangle block.
    for j in range(block_start_idx+1, len(lines)):
        if re.match(r'^\s*}\s*$', lines[j]):
            block_end_idx = j
            break
    if block_end_idx is None:
        return diagram_text  # Block not closed properly.

    # Process the block content
    block_lines = lines[block_start_idx+1:block_end_idx]
    new_block_lines = []
    sub_usecases_info = {}  # Track which usecases get sub-usecases

    # First, scan for existing sub-usecase definitions
    existing_subs = {}
    usecase_aliases = {}  # Track all usecase aliases
    
    for line in block_lines:
        m = re.search(r'usecase\s+"([^"]+)"\s+as\s+(\w+)', line)
        if m:
            description, alias = m.groups()
            usecase_aliases[alias] = description.lower()
            # Check if this is a sub-usecase (based on naming convention or proximity)
            if len(alias) > 1 and alias[-1].isalpha() and alias[-1].isupper():
                parent_alias = alias[:-1]
                existing_subs.setdefault(parent_alias, []).append(alias)

    # Now process each line in the block
    for line in block_lines:
        new_block_lines.append(line)
        m = re.search(r'usecase\s+"([^"]+)"\s+as\s+(\w+)', line)
        if m:
            description, alias = m.groups()
            desc_lower = description.lower()
            # Skip if sub-usecases already exist for this alias
            if alias in existing_subs:
                continue
                
            # Add sub-usecases based on description
            if "browse" in desc_lower:
                sub_usecases_info[alias] = "browse"
                new_block_lines.append(f"    usecase \"Browse by type\" as {alias}A")
                new_block_lines.append(f"    usecase \"Browse by <<add metric>>\" as {alias}B")
            elif "manage" in desc_lower:
                sub_usecases_info[alias] = "manage"
                new_block_lines.append(f"    usecase \"Add\" as {alias}A")
                new_block_lines.append(f"    usecase \"Update\" as {alias}B")
                new_block_lines.append(f"    usecase \"Delete\" as {alias}C")

    # Reassemble the diagram with the new block
    new_lines = lines[:block_start_idx+1] + new_block_lines + lines[block_end_idx:]

    # --- 2. Process the relationship lines ---
    # Add relationships for all use cases that got sub-usecases, regardless of existing relationships
    final_lines = []
    inserted_for = set()
    
    # First, pass through all lines
    for line in new_lines:
        final_lines.append(line)
        
    # Then append sub-usecase relationships at the end, before @enduml
    enduml_index = -1
    for i, line in enumerate(final_lines):
        if line.strip() == "@enduml":
            enduml_index = i
            break
    
    # Insert relationship lines before @enduml
    relationship_lines = []
    for alias, type_of in sub_usecases_info.items():
        if type_of == "browse":
            relationship_lines.append(f"{alias} --> {alias}A: <<extend>>")
            relationship_lines.append(f"{alias} --> {alias}B: <<extend>>")
        elif type_of == "manage":
            relationship_lines.append(f"{alias} --> {alias}A: <<include>>")
            relationship_lines.append(f"{alias} --> {alias}B: <<include>>")
            relationship_lines.append(f"{alias} --> {alias}C: <<include>>")
    
    if enduml_index >= 0:
        final_lines = final_lines[:enduml_index] + relationship_lines + final_lines[enduml_index:]
    else:
        final_lines.extend(relationship_lines)
        
    return "\n".join(final_lines)


# ---------------------------------------------- ERD optimization ---------------------------------- #

def optimize_ER_diagram(diagram_text):
    """
    Optimizes both connection lines and entity definitions in an ER diagram.

    1. Optimizes connection lines:
        - Swaps certain connections based on the relationship.
        - Groups connections by relationship.
        - Ensures proper spacing between groups.

    2. Optimizes entity definitions:
        - Replaces "name" and "address" fields with multi-line blocks.
        - Adds tags to fields like "phone" or "_status" where appropriate.
    """
    # Step 1: Optimizing Connections

    # Extract relationship names from relationship definitions.
    relationship_names = set(re.findall(r'relationship\s+(\w+)\s*{', diagram_text, re.IGNORECASE))

    # Regex to match connection lines, e.g. "Token -X- Token"
    conn_pattern = re.compile(r'^\s*(\w+)\s*-\s*([1N])\s*-\s*(\w+)\s*$', re.MULTILINE)

    # Find @startchen and @endchen markers.
    lines = diagram_text.splitlines()
    start_idx = None
    end_idx = None
    for i, line in enumerate(lines):
        if '@startchen' in line:
            start_idx = i
        if '@endchen' in line:
            end_idx = i
    if start_idx is None or end_idx is None:
        raise ValueError("Diagram text must contain @startchen and @endchen markers.")

    # Everything between the markers is our content.
    content_lines = lines[start_idx+1:end_idx]

    # Separate connection lines from other lines.
    non_conn_lines = []
    conn_lines = []
    for line in content_lines:
        if conn_pattern.match(line.strip()):
            conn_lines.append(line.strip())
        else:
            non_conn_lines.append(line)

    # Group connection lines by relationship name (determined by which token is in relationship_names).
    groups = {}
    group_order = []  # to preserve order of appearance
    for line in conn_lines:
        m = conn_pattern.match(line)
        if not m:
            continue
        left, card, right = m.groups()
        # Determine the relationship name:
        rel_name = None
        if left in relationship_names:
            rel_name = left
        elif right in relationship_names:
            rel_name = right
        if rel_name:
            if rel_name not in groups:
                groups[rel_name] = []
                group_order.append(rel_name)
            groups[rel_name].append((line, left, card, right))

    # Process each group:
    processed_groups = {}
    for rel in group_order:
        group = groups[rel]
        processed = []
        for i, (line, left, card, right) in enumerate(group):
            if i == 0 and left in relationship_names and right not in relationship_names:
                # Swap only the first occurrence.
                new_line = f"{right} -{card}- {left}"
                processed.append(new_line)
            else:
                processed.append(line)
        processed_groups[rel] = processed

    # Build the new connection block: join groups with exactly one blank line between.
    connection_block_lines = []
    for rel in group_order:
        for line in processed_groups[rel]:
            connection_block_lines.append(line)
        connection_block_lines.append("")  # add a blank line after each group
    if connection_block_lines and connection_block_lines[-1] == "":
        connection_block_lines.pop()

    # Clean up non-connection lines: collapse multiple blank lines into a single blank line.
    cleaned_non_conn = []
    previous_blank = False
    for line in non_conn_lines:
        if line.strip() == "":
            if not previous_blank:
                cleaned_non_conn.append("")
                previous_blank = True
        else:
            cleaned_non_conn.append(line)
            previous_blank = False

    # Rebuild the diagram after optimizing the connections
    new_content = cleaned_non_conn[:]
    if connection_block_lines:
        new_content.append("")  # one blank line to separate from connection block
        new_content.extend(connection_block_lines)

    if new_content and new_content[-1].strip() != "":
        new_content.append("")

    # Rebuild the entire diagram with the optimized connections
    diagram_text_optimized_connections = []
    diagram_text_optimized_connections.append(lines[start_idx])
    diagram_text_optimized_connections.extend(new_content)
    diagram_text_optimized_connections.append(lines[end_idx])

    # Step 2: Optimizing Entity Definitions

    def process_entity_block_lines(entity_lines):
        """
        Given the list of lines that form an entity block, process each top-level field:
          - Replace "name" and "address" with blocks.
          - Add " <<multi>>" to "phone" or "contact_info" if not present.
          - Add " <<derived>>" to fields ending with _status if not present.
        """
        new_lines = []
        nested_level = 0
        for line in entity_lines:
            indent = re.match(r'^(\s*)', line).group(1)
            stripped = line.strip()
            opens = stripped.count("{")
            closes = stripped.count("}")
            if nested_level == 0:
                if stripped == "name" or stripped=="Name":
                    new_lines.append(f"{indent}name {{")
                    new_lines.append(f"{indent}  Fname")
                    new_lines.append(f"{indent}  Lname")
                    new_lines.append(f"{indent}}}")
                    nested_level += opens - closes
                    continue
                if stripped == "address" or stripped=="Address":
                    new_lines.append(f"{indent}address{{")
                    new_lines.append(f"{indent}  City")
                    new_lines.append(f"{indent}  State")
                    new_lines.append(f"{indent}  Street")
                    new_lines.append(f"{indent}  ZipCode")
                    new_lines.append(f"{indent}}}")
                    nested_level += opens - closes
                    continue
                if stripped in ["phone", "contact_info", "Phone", "ContactInfo"]:
                    if "<<multi>>" not in stripped:
                        new_lines.append(f"{indent}{stripped} <<multi>>")
                    else:
                        new_lines.append(line)
                    nested_level += opens - closes
                    continue
                m_status = re.match(r'^(\w+_status)(.*)$', stripped)
                if m_status:
                    field_name = m_status.group(1)
                    remainder = m_status.group(2)
                    if "<<derived>>" not in remainder:
                        new_lines.append(f"{indent}{field_name} <<derived>>{remainder}")
                    else:
                        new_lines.append(line)
                    nested_level += opens - closes
                    continue
                new_lines.append(line)
            else:
                new_lines.append(line)
            nested_level += opens - closes
        return new_lines

    def optimize_ER_entities(diagram_text):
        lines = diagram_text.splitlines()
        output_lines = []
        i = 0
        while i < len(lines):
            line = lines[i]
            if re.match(r'^\s*entity\s+\w+\s*{', line):
                entity_start = i
                entity_lines = []
                brace_count = 0
                while i < len(lines):
                    current_line = lines[i]
                    entity_lines.append(current_line)
                    brace_count += current_line.count("{")
                    brace_count -= current_line.count("}")
                    i += 1
                    if brace_count == 0:
                        break
                header = entity_lines[0]
                footer = entity_lines[-1]
                inner_lines = entity_lines[1:-1]
                optimized_inner = process_entity_block_lines(inner_lines)
                output_lines.append(header)
                output_lines.extend(optimized_inner)
                output_lines.append(footer)
            else:
                output_lines.append(line)
                i += 1
        return "\n".join(output_lines)

    # Apply entity optimizations to the diagram after optimizing connections
    diagram_text_optimized_entities = optimize_ER_entities("\n".join(diagram_text_optimized_connections))

    return diagram_text_optimized_entities

# ------------------------------------ Class Diagram Optimization ---------------------------------- #

def optimize_class_diagram(plantuml_code: str) -> str:
    """
    Optimize a PlantUML class diagram by applying the Facade pattern and flipping inheritance relationships.
    
    Steps:
    1. Extract all class names from the diagram.
    2. Remove any direct dependency lines from User (using '..>').
    3. Flip any inheritance relationship (i.e., "Child --|> Parent" becomes "Parent <|-- Child").
    4. Insert a Facade class with management methods for each class.
    5. Add new relationships: 
         - Link User to Facade (User --> Facade)
         - Link Facade to all other classes (Facade ..> OtherClass)
    """
    lines = plantuml_code.splitlines()
    class_names = []

    # Identify class names (for both 'class' and 'abstract class' definitions)
    class_pattern = re.compile(r"^\s*(abstract\s+class|class)\s+(\w+)")
    for line in lines:
        match = class_pattern.match(line)
        if match:
            class_name = match.group(2)
            if class_name not in class_names:
                class_names.append(class_name)

    filtered_lines = []
    inheritance_pattern = re.compile(r"^\s*(\w+)\s+--\|>\s+(\w+)")
    dependency_pattern = re.compile(r"^\s*User\s+\.\.>\s+")
    
    # Process each line:
    for line in lines:
        # Skip dependency lines from User using '..>'
        if dependency_pattern.search(line):
            continue
        
        # If the line is an inheritance relationship, flip it.
        m = inheritance_pattern.match(line)
        if m:
            child = m.group(1)
            parent = m.group(2)
            # Flip the arrow: Parent <|-- Child
            new_line = f"{parent} <|-- {child}"
            filtered_lines.append(new_line)
            continue
        
        # Otherwise, keep the original line.
        filtered_lines.append(line)

    # Build the Facade class definition with manage methods for each class.
    facade_lines = []
    facade_lines.append("")
    facade_lines.append("class Facade {")
    for cname in class_names:
        facade_lines.append(f"  + manage{cname}(): void")
    facade_lines.append("}")

    # Insert the Facade definition immediately after @startuml.
    output_lines = []
    inserted_facade = False
    for line in filtered_lines:
        output_lines.append(line)
        if not inserted_facade and line.strip() == "@startuml":
            output_lines.extend(facade_lines)
            inserted_facade = True

    # Create relationship lines to be added before @enduml.
    relationship_lines = []
    relationship_lines.append("")
    relationship_lines.append("User --> Facade")
    for cname in class_names:
        if cname != "User":
            relationship_lines.append(f"Facade ..> {cname}")

    # Insert the new relationship lines before the closing @enduml.
    final_lines = []
    for line in output_lines:
        if line.strip() == "@enduml":
            final_lines.extend(relationship_lines)
            final_lines.append(line)
        else:
            final_lines.append(line)

    return "\n".join(final_lines)

# ------------------------------------- Themes ----------------------------- #

def apply_theme(diagram_text, theme_name):
    # Define the regex patterns for the start markers and the theme line
    start_pattern = r"(@start(?:uml|chen))"
    theme_pattern = r"(!theme\s+\S+)"

    # Check if the theme is already present after the start marker
    match_start = re.search(start_pattern, diagram_text)
    if match_start:
        start_index = match_start.start()

        # Look ahead after the start marker to find an existing theme and remove it
        match_theme = re.search(theme_pattern, diagram_text[start_index:])
        if match_theme:
            # Remove the existing theme and add the new one
            diagram_text = diagram_text[:start_index + match_theme.start()] + \
                           f"!theme {theme_name}\n" + \
                           diagram_text[start_index + match_theme.end():]
        else:
            # If no theme is found, just add the new theme
            diagram_text = diagram_text[:start_index + len(match_start.group(0))] + \
                           f"\n!theme {theme_name}\n" + \
                           diagram_text[start_index + len(match_start.group(0)):]

    return diagram_text

# -------------------------------------------- Colors -------------------------------------------#

def process_element_line(line: str, color: Optional[str]) -> str:
    """
    Processes an element definition line (for actors, classes, entities, etc.).
    It looks for an existing hex color (format "#xxxxxx") before a code block (i.e. before '{')
    and either replaces it with the new color or removes it.
    If no color is found and a new color is provided, it is appended.
    """
    # Check if there's a code block (indicated by '{')
    brace_index = line.find("{")
    if brace_index != -1:
        pre = line[:brace_index]
        post = line[brace_index:]
    else:
        pre = line
        post = ""
    # Remove any existing hex color from the "pre" part.
    pre = re.sub(r'\s*#[0-9a-fA-F]{6}', '', pre)
    pre = pre.rstrip()
    # If a new color is provided, append it (with a preceding space)
    if color:
        pre += " " + color
    return pre + post

def apply_color_to_plantuml(plantuml_code: str, color: Optional[str]) -> str:
    """
    Given a PlantUML diagram and a hex color string (e.g. "#32a852"),
    this function applies the color only to element definitions (like actors, classes,
    entities, rectangles, participants, and relationship blocks that use a code block).
    
    If an element already has a hex color, it is replaced with the new color.
    If color is None (or empty), any such color is removed.
    
    Lines that don't start with one of the target keywords (or lines such as relationship arrow lines)
    are left unchanged.
    """
    # Keywords to detect element definitions where color should be applied.
    keywords = [
        "abstract class",
        "class",
        "actor",
        "entity",
        "rectangle",
        "participant",
        "relationship"
    ]
    
    # Process the diagram line by line.
    lines = plantuml_code.splitlines()
    new_lines = []
    
    for line in lines:
        stripped = line.lstrip()
        # Do not modify lines starting with '@' (e.g., @startuml, @enduml, etc.)
        if stripped.startswith("@"):
            new_lines.append(line)
            continue
        
        lower_line = stripped.lower()
        processed = False
        for kw in keywords:
            if lower_line.startswith(kw):
                new_lines.append(process_element_line(line, color))
                processed = True
                break
        if not processed:
            # Leave any line that is not an element definition untouched.
            new_lines.append(line)
    
    return "\n".join(new_lines)


# ------------------------------ Generate diagrams and handle edits ----------------------------- #

@app.post("/process")
async def process_text(request: Request):
    data = await request.json()
    text = data.get("text", "")
    skip_model = data.get("skip_model", False)  # New flag
    data_diagram_type = data.get("diagram_type", "")

    print("Input:", text)
    print("Skip model:", skip_model)

    if not text:
        return {"result": "No input provided."}

    try:
        print("Processing the request...")

        if skip_model:
            #  Skip the model and directly encode the edited code
            generated_code = text
        else:
            #  Pass through the model for user-generated prompts
            client = Client("vinzur/Prompt-to-PlantUML", hf_token=HF_TOKEN)
            result = client.predict(query=text, diagram_type=data_diagram_type ,api_name="/predict")
            generated_code = result

        # Encode the generated code for PlantUML rendering
        diagram_url = generate_plantuml_url(generated_code)

        print("Generated PlantUML Code:", generated_code)
        print("Diagram URL:", diagram_url)

        return {
            "generated_code": generated_code,
            "diagram_url": diagram_url
        }
    except Exception as e:
        return {"error": f"Failed to process the request: {str(e)}"}
    
# ------------------------------------- Enhance diagrams ------------------------------- #

@app.post("/enhance")
async def enhance_diagram(request: Request):
    data = await request.json()
    code = data.get("code", "")
    diagram_type = data.get("diagram_type", "")
    print(f"Enhancing {diagram_type}...")
    print(f"Code: {code}")

    if not code:
        return {"error": "No code provided."}

    try:
        if diagram_type == "Use Case Diagram":
            enhanced_code = optimize_use_case_diagram(code)
        elif diagram_type == "ERD":
            enhanced_code = optimize_ER_diagram(code)
        elif diagram_type == "Class Diagram":
            enhanced_code = optimize_class_diagram(code)
        else:
            enhanced_code = code

        diagram_url = generate_plantuml_url(enhanced_code)

        return {
            "enhanced_code": enhanced_code,
            "diagram_url": diagram_url
        }
    except Exception as e:
        return {"error": f"Failed to enhance diagram: {str(e)}"}
    
# ------------------------------------ Apply the selected themes ---------------------------- #

@app.post("/apply-theme")
async def apply_theme_endpoint(request: Request):
    try:
        data = await request.json()
        diagram_code = data.get("text", "")
        theme = data.get("theme", "")

        if not diagram_code:
            return {"error": "No diagram code provided"}

        if not theme:
            return {"error": "No theme specified"}

        # Apply the theme
        updated_code = apply_theme(diagram_code, theme)

        # Generate the updated diagram URL
        diagram_url = generate_plantuml_url(updated_code)

        return {"updated_code": updated_code, "diagram_url": diagram_url}
    except Exception as e:
        return {"error": f"Failed to apply theme: {str(e)}"}

# --------------------------------- Applying Colors ------------------------------ #

@app.post("/set-color")
async def set_color(request: Request):
    try:
        data = await request.json()
        code = data.get("text", "")
        color = data.get("color", "")

        if not code:
            return {"error": "No diagram code provided"}

        # Apply color using the function
        updated_code = apply_color_to_plantuml(code, color)

        diagram_url = generate_plantuml_url(updated_code)

        return {"generated_code": updated_code, "diagram_url": diagram_url}

    except Exception as e:
        print(f"Failed to apply color: {e}")
        return {"error": f"Failed to apply colors: {str(e)}"}