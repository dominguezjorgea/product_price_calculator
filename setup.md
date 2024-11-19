# Setup Guide

## Development Environment Setup

### Prerequisites

1. Install Node.js

   - Download from [nodejs.org](https://nodejs.org)
   - Verify installation: `node --version`

2. Install npm (comes with Node.js)
   - Verify installation: `npm --version`

### Project Setup

1. Clone the repository

git clone [repository-url]
cd product-price-calculator

2. Install dependencies

npm install

3. Start development server

npm run dev

### Using the Calculator

1. Enter the required information:

   - Raw Material Cost ($)
   - Profit Margin (%)
   - Tax Rate (%) - defaults to 21% but can be modified
   - Expected Sales (units)

2. Click "Calculate" to see results

### Development

1. Backend changes

   - Edit files in `src/` directory
   - Server will automatically restart (nodemon)

2. Frontend changes
   - Edit files in `public/` directory
   - Refresh browser to see changes

### Testing

Currently, no automated tests are implemented. Future versions will include:

- Unit tests
- Integration tests
- E2E tests

### Building for Production

1. Ensure all dependencies are installed

2. Start production server

npm start

### Troubleshooting

Common issues and solutions:

1. Port already in use

   - Change port in src/index.js
   - Kill process using current port

2. Module not found errors

   - Delete node_modules and package-lock.json
   - Run npm install again

3. Calculation issues
   - Ensure all input fields have valid numbers
   - Tax rate and profit margin should be entered as percentages
   - Raw material cost should be greater than 0
