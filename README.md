# EDDIE: Evaluation-Driven Development for LLMs (VS Code Extension)

This VS Code extension brings **LangSmith trace visualization** and **evaluation-driven development** directly into your editor. Part of the EDDIE Framework and designed to support multi-microservice GenAI applications like ARIA.

## ✨ Features

- View your **latest LangSmith traces** in a clean, formatted WebView
- Show prompt, response, latency, and token usage
- Supports **dark mode**
- Auto-loads environment context via `eddie.config.json` or fallback `.env`
- Designed to support **multi-service architectures**

## 📦 Installation

To use this extension locally:

1. Clone the repo or copy the extension files into a folder
2. Run `npm install`
3. Open the project in VS Code
4. Press `F5` to launch the **Extension Development Host**

## 🔧 Configuration

### Preferred: `eddie.config.json`

```json
{
  "application": "ARIA",
  "environment": "Dev",
  "service": "retriever-service"
}
```

### Fallback: `.env`

```env
EDDIE_APPLICATION=ARIA
EDDIE_ENVIRONMENT=Dev
EDDIE_SERVICE=retriever-service
```

## 🔁 Commands

- `EDDIE: View Latest Trace` — Opens the most recent LangSmith trace tagged with your application, environment, and service

## 🔍 Roadmap

- Prompt versioning support
- Evaluation dataset runner
- Arize integration for post-deployment evaluation

## 💡 Tip

Use LangChain with LangSmith tracing enabled to populate your traces:
```python
import os
os.environ["LANGCHAIN_API_KEY"] = "your-key"
os.environ["LANGCHAIN_PROJECT"] = "ARIA"
```

## 🛠️ Requirements

- Node.js
- LangSmith account + API key
- TypeScript (for dev)

## 📄 License

MIT — use it, fork it, contribute to it!