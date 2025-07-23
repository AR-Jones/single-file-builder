const fs = require("fs");
const path = require("path");

function buildSinglePage(options = {}) {
  const {
    input = "index.html",
    output = "index-single.html",
    src = "src",
  } = options;

  // Read the original HTML file
  let html = fs.readFileSync(input, "utf8");
  const srcDir = path.join(process.cwd(), src);

  // Check if src directory exists
  if (!fs.existsSync(srcDir)) {
    throw new Error(`Source directory '${src}' does not exist`);
  }

  // Discover all CSS files in /src
  const cssFiles = fs
    .readdirSync(srcDir)
    .filter((file) => file.endsWith(".css"))
    .sort(); // Sort for consistent ordering

  // Discover all JS files in /src
  const jsFiles = fs
    .readdirSync(srcDir)
    .filter((file) => file.endsWith(".js"))
    .sort(); // Sort for consistent ordering

  console.log(`📁 Found ${cssFiles.length} CSS files: ${cssFiles.join(", ")}`);
  console.log(`📁 Found ${jsFiles.length} JS files: ${jsFiles.join(", ")}`);

  // Inline all CSS files
  let combinedCSS = "";
  cssFiles.forEach((cssFile) => {
    const cssPath = path.join(srcDir, cssFile);
    const css = fs.readFileSync(cssPath, "utf8");
    combinedCSS += `/* ${cssFile} */\n${css}\n\n`;
  });

  // Add combined CSS to head if not already present
  if (combinedCSS && !html.includes("<style>")) {
    html = html.replace(
      "</head>",
      `    <style>\n${combinedCSS.trim()}\n    </style>\n  </head>`
    );
  }

  // Inline all JS files
  let combinedJS = "";
  jsFiles.forEach((jsFile) => {
    const jsPath = path.join(srcDir, jsFile);
    const js = fs.readFileSync(jsPath, "utf8");
    combinedJS += `// ${jsFile}\n${js}\n\n`;
  });

  // Add combined JS before closing body tag if not already present
  if (combinedJS && !html.includes("<script>")) {
    html = html.replace(
      "</body>",
      `\n<script>\n${combinedJS.trim()}\n    </script>\n  </body>`
    );
  }

  // Write the single-page version
  fs.writeFileSync(output, html);
  console.log(`✅ Built single-page version: ${output}`);
}

// Run the build if this file is executed directly
if (require.main === module) {
  buildSinglePage();
}

module.exports = { buildSinglePage };
