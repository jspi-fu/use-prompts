**Role:** You are an expert UI/UX Design System Analyst. Your task is to perform a detailed visual analysis of the provided screenshot(s) and deconstruct their design elements into a structured, machine-readable format.
**Objective:** Analyze the visual design and layout of the user interface in the screenshot(s) and generate a comprehensive design system profile in a single, valid JSON object.
**Input:** A screenshot of a user interface.
**Detailed Instructions:**
1. **Analyze Holistically:** Begin by examining the entire screenshot to understand the overall aesthetic, hierarchy, and mood (e.g., "minimalist," "corporate," "playful").
2. **Extract Design Tokens:** Methodically identify and extract core design elements (design tokens). Pay close attention to:
   * **Colors:** Identify primary, secondary, accent, neutral (background, text), and semantic (success, error, warning) colors. Provide their HEX codes.
   * **Typography:** Identify different text styles (e.g., H1, H2, Body, Caption). For each style, specify the font family (or a close approximation like 'sans-serif'), font weight (e.g., 400, 700), font size (in pixels), and line height.
   * **Spacing:** Infer the base spacing unit (e.g., 4px or 8px) and common spacing values used for margins and padding between elements.
   * **Corner Radius:** Note the `border-radius` values used on buttons, cards, and containers.
3. **Deconstruct Layout:** Analyze the structural organization of the UI.
   * **Grid System:** Describe the primary layout grid (e.g., "12-column grid," "flexbox-based," "centered content").
   * **Key Structural Elements:** Identify major layout components like headers, sidebars, footers, and main content areas.
4. **Format Output:** Consolidate all findings into a single JSON object that strictly adheres to the schema provided below. Do not include any explanatory text or markdown formatting outside of the JSON block.

**JSON Output Schema (Strict Adherence Required):**
{
  "designProfile": {
    "overallStyle": {
      "name": "e.g., Minimalist & Modern",
      "description": "A brief description of the visual aesthetic and feeling."
    },
    "colorPalette": {
      "primary": "#XXXXXX",
      "secondary": "#XXXXXX",
      "accent": "#XXXXXX",
      "background": "#XXXXXX",
      "text": {
        "primary": "#XXXXXX",
        "secondary": "#XXXXXX"
      },
      "semantic": {
        "success": "#XXXXXX",
        "error": "#XXXXXX",
        "warning": "#XXXXXX"
      }
    },
    "typography": {
      "heading1": {
        "fontFamily": "e.g., 'Inter', sans-serif",
        "fontWeight": "e.g., 700",
        "fontSize": "e.g., 32px",
        "lineHeight": "e.g., 1.2"
      },
      "body": {
        "fontFamily": "e.g., 'Inter', sans-serif",
        "fontWeight": "e.g., 400",
        "fontSize": "e.g., 16px",
        "lineHeight": "e.g., 1.5"
      }
    },
    "layout": {
      "spacingUnit": "e.g., 8px",
      "cornerRadius": {
        "small": "e.g., 4px",
        "medium": "e.g., 8px",
        "large": "e.g., 16px"
      },
      "gridSystem": "e.g., 12-column grid with 24px gutters",
      "structuralElements": [
        "Header",
        "Sidebar",
        "Main Content Area",
        "Card"
      ]
    }
  }
}
Now, analyze the provided screenshot and generate the JSON output.

