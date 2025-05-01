// Simple script to check if the frontend is working correctly
console.log('Checking frontend configuration...');

const fs = require('fs');

// Check if package.json exists
try {
  const packageJson = fs.readFileSync('./package.json', 'utf8');
  const packageData = JSON.parse(packageJson);
  
  console.log('Package name:', packageData.name);
  console.log('Package version:', packageData.version);
  
  if (packageData.scripts && packageData.scripts.start) {
    console.log('Start script found:', packageData.scripts.start);
  } else {
    console.error('Error: No start script found in package.json');
  }
  
  // Check if node_modules exists
  if (fs.existsSync('./node_modules')) {
    console.log('node_modules directory found');
  } else {
    console.error('Warning: node_modules directory not found. You may need to run npm install');
  }
  
  // Check if src directory exists
  if (fs.existsSync('./src')) {
    console.log('src directory found');
    
    // Check if App.js exists
    if (fs.existsSync('./src/App.js')) {
      console.log('App.js found');
    } else {
      console.error('Error: App.js not found in src directory');
    }
    
    // Check if index.js exists
    if (fs.existsSync('./src/index.js')) {
      console.log('index.js found');
    } else {
      console.error('Error: index.js not found in src directory');
    }
  } else {
    console.error('Error: src directory not found');
  }
  
  console.log('Frontend check completed');
} catch (error) {
  console.error('Error reading package.json:', error.message);
}
