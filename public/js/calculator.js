async function calculatePrice() {
    const rawMaterialCost = parseFloat(document.getElementById('rawMaterialCost').value);
    const profitMarginPercent = parseFloat(document.getElementById('profitMargin').value);
    const taxRate = parseFloat(document.getElementById('taxRate').value);
    const expectedSales = parseInt(document.getElementById('expectedSales').value);

    try {
        const response = await fetch('/calculate-price', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rawMaterialCost,
                profitMarginPercent,
                expectedSales,
                taxRate
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            displayResult(data);
        } else {
            throw new Error(data.error || 'Failed to calculate price');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function displayResult(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    
    resultDiv.innerHTML = `
        <div class="result-section">
            <h2>Price Breakdown</h2>
            <div class="price-item">
                <span>Raw Material Cost:</span>
                <span>$${data.priceBreakdown.rawMaterialCost.toFixed(2)}</span>
            </div>
            <div class="price-item">
                <span>Profit Margin:</span>
                <span>$${data.priceBreakdown.profitMargin.toFixed(2)}</span>
            </div>
            <div class="price-item">
                <span>Subtotal:</span>
                <span>$${data.priceBreakdown.subtotal.toFixed(2)}</span>
            </div>
            <div class="price-item">
                <span>Taxes (${data.priceBreakdown.taxRate}%):</span>
                <span>$${data.priceBreakdown.taxes.toFixed(2)}</span>
            </div>
            <div class="price-item final-price">
                <span>Final Price:</span>
                <span>$${data.priceBreakdown.finalPrice.toFixed(2)}</span>
            </div>
        </div>

        <div class="result-section">
            <h2>Profit Projections</h2>
            <div class="price-item">
                <span>Expected Sales:</span>
                <span>${data.profitProjections.expectedSales} units</span>
            </div>
            <div class="price-item">
                <span>Profit per Unit:</span>
                <span>$${data.profitProjections.profitPerUnit.toFixed(2)}</span>
            </div>
            <div class="price-item final-price">
                <span>Total Expected Profit:</span>
                <span>$${data.profitProjections.totalProfit.toFixed(2)}</span>
            </div>
        </div>
    `;
}