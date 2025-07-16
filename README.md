# AiUML
[![React CI](https://github.com/thelaibaasif/AiUML/actions/workflows/ci.yml/badge.svg)](https://github.com/thelaibaasif/AiUML/actions/workflows/ci.yml)

**AiUML** is an AI-powered system designed to automate the generation of UML diagrams directly from natural language requirements. By leveraging Large Language Models, AiUML simplifies software design by providing clear, accurate UML diagrams that assist developers and engineers during system design.

## Demo Video
[![Watch Demo Video](https://github.com/Vaneeza-7/AiUML/blob/main/thumbnail.png.png?raw=true)](https://vimeo.com/1101900475)

---

## 🚀 Features

- **Natural Language Input**: Accepts unrestricted, ambiguous, and complex textual requirements.
- **Automated Diagram Generation**: Converts natural language input directly into UML diagrams.
- **AI-Powered Optimization**: Refines diagrams using modeling best practices and domain heuristics.
- **Diagram Customizer & Editor**: Allows real-time customization and editing in a built-in DSL editor.
- **Multi-Diagram Support**: Generates Class, Use Case, Sequence, and ERD diagrams.
- **Multiple Export Formats**: Supports exporting diagrams as SVG, PNG, and PlantUML code.
- **Session & Diagram Storage**: Saves diagrams and sessions for future access and editing.
- **User-Friendly Interface**: Web-based, minimalistic, and responsive interface.

---

## 🛠️ Tech Stack

- **Large Language Models (LLM)**: Mistral Large via Hugging Face
- **Retrieval-Augmented Generation (RAG)**: FAISS + Sentence Transformers
- **Backend**: FastAPI
- **Frontend**: React.js
- **Database**: Firebase
- **Deployment**: Render.com + Hugging Face Spaces
- **Diagram Rendering**: PlantUML

---

## Instructions

First clone repo or pull changes and then do the following:

```
cd backend
```

```
python -m venv venv
```

```
venv\Scripts\activate
```

(if you get execution policy error do this)

```
Set-ExecutionPolicy Unrestricted -Scope Process
```

(and then try activate again)

```
pip install -r requirements.txt
```

After this, To start the FastAPI server and run the model locally, do the following:
```
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```


## Contributors

- [Laiba Asif](https://github.com/thelaibaasif) – Frontend Engineer  
- [Rabail Nasir](https://github.com/Rabail-RN) – Backend Engineer  
- [Vaneeza Ahmad](https://github.com/Vaneeza-7) – Generative AI Engineer

## License

This project is licensed under the [Apache 2.0 License](LICENSE).
