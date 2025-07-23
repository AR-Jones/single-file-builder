# single-file-builder

A simple build tool to combine multiple JavaScript and CSS files into a single HTML file.

## Installation

```bash
npm install single-file-builder
```

## Usage

### As a CLI tool

```bash
# Basic usage (uses defaults: index.html -> index-single.html, src directory)
single-file-builder

# Custom input/output files
single-file-builder -i template.html -o dist.html

# Custom source directory
single-file-builder --src assets --output build.html

# Show help
single-file-builder --help
```

### As a library

```javascript
const { buildSinglePage } = require("single-file-builder");

// Basic usage
buildSinglePage();

// With options
buildSinglePage({
  input: "template.html",
  output: "dist.html",
  src: "assets",
});
```

## Options

- `input` (default: `index.html`) - Input HTML file path
- `output` (default: `index-single.html`) - Output HTML file path
- `src` (default: `src`) - Source directory containing JS/CSS files

## How it works

1. Reads your HTML file
2. Scans the source directory for `.js` and `.css` files
3. Combines all CSS files into a single `<style>` tag in the `<head>`
4. Combines all JS files into a single `<script>` tag before `</body>`
5. Outputs a self-contained HTML file

## File structure

```
your-project/
├── index.html          # Your HTML template
├── src/               # Source directory
│   ├── style.css      # CSS files
│   ├── script.js      # JS files
│   └── script2.js     # More JS files
└── index-single.html  # Generated output
```

## Features

- ✅ Automatic file discovery
- ✅ Consistent file ordering (alphabetical)
- ✅ File comments for debugging
- ✅ Error handling
- ✅ Flexible configuration
- ✅ Works as CLI or library

## License

MIT
