# Contribuir a Flux Daily

Este documento define como colaborar en el proyecto de forma consistente.

## Objetivo

- Mantener una base de codigo legible y estable.
- Reducir friccion al incorporar nuevos devs humanos.
- Estandarizar documentacion, ramas, commits, PRs y revisiones.

## Idioma y estilo general

- Idioma principal de trabajo: espanol.
- Mensajes al usuario final: usar las cadenas centralizadas en [constants/strings.js](constants/strings.js).
- Evitar hardcodear texto visible en pantallas.
- Priorizar cambios pequenos y enfocados.

## Formato de documentacion

## README

- [README.md](README.md) describe: vision del producto, stack, arquitectura, flujo y fases.
- Cualquier cambio estructural relevante debe reflejarse en [README.md](README.md).

## Documentos de producto y legales

- [TERMS.md](TERMS.md): terminos y privacidad.
- [ICONOGRAFIA.md](ICONOGRAFIA.md): guia de assets y lineamientos visuales.
- Si una decision afecta legal, contenido o marca, actualizar estos archivos en el mismo PR.

## Cambios tecnicos relevantes

- Si agregas una dependencia nueva, justificar en el PR: motivo, impacto en bundle y alternativa evaluada.
- Si cambias navegacion, persistencia o i18n, documentar el cambio en [README.md](README.md).

## Reglas de codigo

## Arquitectura

- Estado global y traducciones via [context/AppContext.js](context/AppContext.js).
- Constantes de UI y paleta en [constants/colors.js](constants/colors.js).
- Textos por idioma en [constants/strings.js](constants/strings.js).
- Cada pantalla vive en [screens](screens) y debe mantener una responsabilidad clara.

## Nombres y consistencia

- Nombres de componentes y archivos: claros y alineados con su pantalla o funcion.
- No duplicar logica de traduccion ni persistencia si ya existe una utilidad central.
- Evitar "magic numbers" cuando pueda usarse una constante.

## Comentarios de codigo (obligatorio en casos complejos)

Se espera que el codigo sea autoexplicativo. Los comentarios se usan para explicar intencion, no obviedades.

- Agregar comentario cuando una decision no sea evidente para alguien nuevo en el proyecto.
- Explicar "por que" se hace algo, no "que" hace una linea simple.
- Comentar bloques con logica de negocio, edge cases, workarounds o dependencias de plataforma.
- Si hay trade-offs, dejar una nota corta con contexto.
- Mantener comentarios breves y actualizados; eliminar comentarios desfasados.

Ejemplo recomendado:

```js
// Persistimos en background para no perder cambios si el usuario cierra la app al editar.
```

Ejemplo a evitar:

```js
// Asigna valor a la variable.
```

## Flujo de ramas y commits

- Rama principal: `main`.
- Crear ramas por tarea: `feature/...`, `fix/...`, `chore/...`, `docs/...`.
- Un PR debe resolver un solo objetivo funcional.

Formato sugerido de commit:

- `feat: agrega selector de idioma persistente`
- `fix: corrige guardado en segundo plano`
- `docs: actualiza flujo de navegacion en README`

## Pull Requests

Todo PR debe incluir:

- Contexto del problema.
- Solucion aplicada.
- Riesgos o impacto potencial.
- Evidencia minima de prueba (manual o automatizada).
- Capturas o video si cambia UI.

Checklist rapido:

- [ ] Sin texto hardcodeado para UI (usar [constants/strings.js](constants/strings.js)).
- [ ] Sin secretos o credenciales.
- [ ] Navegacion y flujo principal probados.
- [ ] README/documentos actualizados si aplica.
- [ ] Codigo legible para un dev nuevo.

## Revisiones de codigo

Prioridades de revision:

- Correctitud funcional y posibles regresiones.
- Claridad de codigo y mantenibilidad.
- Impacto en i18n, persistencia y navegacion.
- Calidad de comentarios en logica compleja.

Al revisar:

- Senalar problemas concretos y proponer alternativa accionable.
- Diferenciar bloqueantes de mejoras opcionales.
- Mantener feedback corto, tecnico y respetuoso.

## Pruebas minimas antes de merge

- Abrir app en Expo y recorrer flujo principal:
  - Primera apertura sin config.
  - Guardar configuracion y volver a abrir.
  - Editar desde resultado y validar persistencia.
  - Cambiar idioma y validar textos.
- Verificar que no haya errores en consola durante el flujo.

## Alcance de este documento

Si una regla de este archivo entra en conflicto con una necesidad tecnica puntual, documentar la excepcion en el PR con razon y alcance.