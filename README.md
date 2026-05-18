# Flux Daily — App Móvil

> Combina cualquier color con cualquier frase. Tu estado, hoy.

---

## Contexto del proyecto

**Tipo:** App móvil (React Native + Expo)
**Plataformas:** iOS y Android
**Estado:** MVP en desarrollo — FASE 1 funcional
**Objetivo inmediato:** Publicar en App Store y Google Play lo antes posible para vivir la experiencia de lanzamiento

**Concepto:** App minimalista donde el usuario elige un color de fondo, escribe una frase libre y elige tipografía y color de texto. El resultado es una pantalla personalizada que refleja cómo se siente hoy. Puede editar cuando quiera y compartir su estado.

**Público:** Personas que cambian frecuentemente de humor o estado emocional.

---

## Público objetivo

**Primario (18–35):** Personas que sienten intensamente y quieren expresarlo visual y simple, sin el compromiso de un diario escrito.

**Secundario (35–45):** Personas que buscan una pausa creativa en su día.

**Motivación:** desahogarse, expresarse creativamente, registrar cómo se sienten.

**No es:** app de terapia, meditación ni seguimiento clínico.

---

## Posicionamiento

**Categoría en tiendas:** Lifestyle / Entertainment — NO salud mental.

**Palabras que NO usar en tiendas:**
salud mental · terapia · ansiedad · depresión · bienestar clínico

---

## Archivos de referencia

- `TERMS.md` — términos y privacidad en ES/EN/PT
- `ICONOGRAFIA.md` — assets visuales y prompts
- TODO: revisar CONTRIBUTING.md antes de nuevos cambios de colaboracion/documentacion.

---

## Nombre y marca

- **Nombre:** Flux Daily
- **Slug:** flux-daily
- **Bundle ID iOS:** com.fluxdailyapp
- **Package Android:** com.fluxdailyapp
- **Dominio:** fluxdaily.app (libre — PENDIENTE REGISTRAR)
- **Marca verificada libre en:** WIPO, USPTO, IMPI, App Store, Play Store

---

## Stack técnico

- **Framework:** React Native con Expo SDK 50
- **Navegación:** @react-navigation/native-stack
- **Persistencia local:** @react-native-async-storage/async-storage
- **Fuentes:** expo-google-fonts (Inter, Playfair Display, Quicksand, Space Mono)
- **Compartir:** Share nativo de React Native

---

## Paleta y tipografías

**Colores de fondo (hex):**
| ID | Hex | Nombre |
|---|---|---|
| red | #FF6B6B | Rojo cálido |
| teal | #4ECDC4 | Turquesa |
| yellow | #FFE66D | Amarillo |
| green | #95E1D3 | Verde suave |
| lavender | #C7CEEA | Lavanda |

**Colores de texto:** #FFFFFF, #1A1A1A, #555555, #F5F0E8

**Tipografías (Google Fonts open source):**
- Inter_400Regular
- PlayfairDisplay_400Regular
- Quicksand_400Regular
- SpaceMono_400Regular

**Color acento UI:** #4ECDC4

---

## Idiomas

| Código | Idioma | Prioridad |
|---|---|---|
| es | Español | Principal |
| en | English | Secundario |
| pt | Português (BR) | Secundario |

Cambio de idioma funcional, persiste en AsyncStorage.

---

## Estructura de archivos

```
flux-daily/
├── App.js                     # Entry point: carga fuentes, detecta ruta inicial
├── app.json                   # Config Expo
├── package.json
├── babel.config.js
├── context/
│   └── AppContext.js          # Estado global: userConfig + language + t()
├── constants/
│   ├── colors.js              # BG_COLORS, TEXT_COLORS, FONTS, ACCENT
│   └── strings.js             # Textos completos en ES, EN, PT
└── screens/
    ├── ConfigScreen.js        # Selección color+frase+fuente+colorTexto (reutilizable)
    ├── ResultScreen.js        # Pantalla completa con estado actual
    ├── MenuScreen.js          # Lista de opciones de menú
    ├── ContentScreen.js       # Componente base para pantallas de texto
    ├── TermsScreen.js         # Términos (contenido mínimo, listo)
    ├── PrivacyScreen.js       # Privacidad (contenido mínimo, listo)
    ├── InfoScreen.js          # Acerca de (contenido mínimo, listo)
    ├── DonationsScreen.js     # Donaciones (contenido mínimo, listo)
    └── LanguageScreen.js      # Selector de idioma (funcional)
```

---

## Flujo de navegación

```
App abre
  ├── Sin config guardada → ConfigScreen (primera vez)
  └── Config guardada    → ResultScreen

ResultScreen
  ├── [Editar]    → ConfigScreen (isEditing: true) → goBack()
  ├── [Compartir] → Share nativo del SO
  └── [☰]        → MenuScreen
                      ├── Inicio     → ResultScreen
                      ├── Info       → InfoScreen
                      ├── Términos   → TermsScreen
                      ├── Privacidad → PrivacyScreen
                      ├── Idioma     → LanguageScreen → goBack()
                      └── Donaciones → DonationsScreen
```

---

## Fases de desarrollo

### ✅ FASE 1 — Configuración y resultado (COMPLETA)
- Color picker (5 colores)
- Input de frase libre (max 140 chars)
- Selector de tipografía (4 fuentes)
- Selector de color de texto (4 opciones)
- Preview en tiempo real
- Guardar con AsyncStorage

### ✅ FASE 2 — Persistencia y edición (COMPLETA)
- Carga config al abrir app
- Flujo de edición reutiliza ConfigScreen
- Guardado manual con botón Guardar
- Si la app pasa a segundo plano durante edición, se persisten cambios de edición actuales

### ✅ FASE 3 — Menú y contenido (COMPLETA)
- Menú navegable completo
- Todas las pantallas con contenido mínimo usable
- Cambio de idioma funcional (ES/EN/PT)

### 🔲 FASE 4 — Compartir como imagen (PENDIENTE)
- Instalar expo-view-shot
- Capturar ResultScreen como imagen
- Compartir imagen con Share nativo

### 🔲 FASE 5 — Assets visuales (PENDIENTE)
- Ícono de la app (1024x1024)
- Splash screen
- Screenshots para tiendas

### 🔲 FASE 6 — Publicación (PENDIENTE)
- Cuentas Apple Developer y Google Play Console
- Build con EAS (eas-cli)
- Metadata de tiendas (descripción, categoría, keywords)

### 🔲 FASE FUTURA — Post lanzamiento
- Historial de estados anteriores
- Cloud sync (Firebase anon auth)
- Color picker libre (cualquier color)

---

## Instalación y desarrollo

```bash
npm install
npx expo start
```

Escanear QR con Expo Go en el celular.

---

## Prompt para continuar en nueva sesión

```
Estoy desarrollando Flux Daily, una app móvil en React Native + Expo SDK 50.

Concepto: el usuario elige cualquier color de fondo, escribe una frase libre,
elige tipografía y color de texto. La pantalla resultante es su estado del día.
Puede editar cuando quiera y compartir.

Stack: React Native, Expo 50, React Navigation native-stack, AsyncStorage,
expo-google-fonts (Inter, Playfair Display, Quicksand, Space Mono).

Fases completadas: Config screen, Result screen, persistencia local, menú
completo con términos/privacidad/info/donaciones/idioma. Cambio de idioma
funcional en ES/EN/PT.

El README completo del proyecto está en README.md con toda la arquitectura,
estructura de archivos, flujo de navegación y fases pendientes.

Próxima fase a trabajar: [DESCRIBE LO QUE NECESITAS]
```
