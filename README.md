## 🧠 Idea Central del Proyecto

**Una aplicación web tipo flashcard para practicar vocabulario en inglés, que permita al usuario aprender palabras por niveles o categorías, recibir retroalimentación inmediata, seguir su progreso, y repetir las palabras que más le cuestan.**

---

## 🧩 Componentes principales de la aplicación

### 1. **Home / Dashboard**
- Presenta un resumen del progreso.
- Botón para iniciar práctica.
- Selección de nivel o categoría.

### 2. **Flashcard Practice View**
- Muestra la palabra en inglés.
- El usuario escribe la traducción.
- Retroalimentación inmediata (✅/❌).
- Botón para siguiente tarjeta.

### 3. **Feedback / Animaciones**
- Colores verde o rojo según acierto/fallo.
- Posibilidad de mostrar la respuesta correcta si falló.
- Transiciones suaves entre tarjetas.

### 4. **Sistema de puntuación / progreso**
- Contador de aciertos y fallos.
- Barra de progreso (visual).
- Al finalizar: resumen de desempeño.

### 5. **Base de datos o almacenamiento**
- Por ahora puedes usar un JSON local o `localStorage`.
- Luego, puedes conectarte a Supabase (ya lo conoces).

### 6. **Extras opcionales**
- Modo oscuro.
- Soporte de audio (pronunciación).
- Repetición automática de palabras falladas.
- Logros o recompensas.

---

## 🎯 Siguiente paso recomendado

Para avanzar de forma sólida, te propongo que trabajemos en **una sesión de práctica con retroalimentación visual** como primer paso. Esto incluye:

- Validar si la palabra es correcta (ignorar espacios, mayúsculas).
- Mostrar retroalimentación verde o roja.
- Mostrar la palabra correcta si falló.
- Permitir avanzar a la siguiente.
- Más adelante puedes configurar un proxy en vite.config.ts si deseas omitir http://localhost:3001.
