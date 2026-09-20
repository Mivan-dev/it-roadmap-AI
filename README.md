# IT Roadmap AI — API

Backend de la aplicación **IT Roadmap AI**, construida con NestJS.

## 🎯 Motivo del proyecto

Proveer un endpoint que recibe el perfil del usuario y genera un roadmap de skills personalizado consultando el mercado laboral en tiempo real mediante IA.

## 📦 Scope

- Endpoint `POST /roadmap` que recibe parámetros del perfil
- Integración con OpenRouter usando el modelo DeepSeek con web search habilitado
- Prompt engineering orientado a habilidades transversales y tendencias 2030
- Parser robusto de respuestas JSON de la IA

## 🛠 Stack

- **NestJS 11** — ESM
- **OpenRouter API** — modelo `deepseek/deepseek-chat` con plugin web
- **TypeScript 6**

## 🚀 Cómo correr el proyecto

### Requisitos
- Node.js 20+
- Cuenta en [OpenRouter](https://openrouter.ai) con API key

### Instalación

```bash
npm install
```

### Variables de entorno

Creá un archivo `.env` en la raíz:

```env
OPENROUTER_API_KEY=tu-key-aqui
```

### Desarrollo

```bash
npm run start:dev
```

La API queda disponible en `http://localhost:3000`.

## 📡 Endpoints

### `POST /roadmap`

Genera un roadmap de skills personalizado.

**Body:**
```json
{
  "experienceLevel": "none | basic | intermediate",
  "language": "JavaScript, TypeScript, React",
  "objective": "frontend | backend | fullstack",
  "timeframe": "6months | 1year | 2years"
}
```

**Response:** objeto `RoadmapResponse` con fases y cards.

- [it-roadmap-front](https://github.com/Mivan-dev/it-roadmap-AI-front.git) — Frontend Angular + Tailwind