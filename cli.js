#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Import the build function
const { buildSinglePage } = require("./build.js");

function showHelp() {
  console.log(`
single-file-builder - Build tool to combine multiple JS/CSS files into a single HTML file

Usage:
  single-file-builder [options]

Options:
  -h, --help          Show this help message
  -i, --input <file>  Input HTML file (default: index.html)
  -o, --output <file> Output HTML file (default: index-single.html)
  -s, --src <dir>     Source directory (default: src)

Examples:
  single-file-builder
  single-file-builder -i template.html -o dist.html
  single-file-builder --src assets --output build.html
`);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    input: "index.html",
    output: "index-single.html",
    src: "src",
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "-h" || arg === "--help") {
      showHelp();
      process.exit(0);
    } else if (arg === "-i" || arg === "--input") {
      options.input = args[++i];
    } else if (arg === "-o" || arg === "--output") {
      options.output = args[++i];
    } else if (arg === "-s" || arg === "--src") {
      options.src = args[++i];
    }
  }

  return options;
}

function main() {
  const options = parseArgs();

  try {
    buildSinglePage(options);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
