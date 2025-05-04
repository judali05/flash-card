- Más adelante puedes configurar un proxy en vite.config.ts si deseas omitir http://localhost:3001.

GET /api/words           → Lista de palabras
POST /api/words          → Agregar nueva palabra
PUT /api/words/:id       → Editar palabra
DELETE /api/words/:id    → Eliminar palabra

GET /api/stats           → Ver todas las estadísticas
POST /api/stats/:id      → Registrar intento correcto/incorrecto
GET /api/stats?filter=X  → Ver solo las falladas/no practicadas/etc