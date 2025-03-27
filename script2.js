document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-btn');
    const resultsContainer = document.getElementById('results');
    
    calculateBtn.addEventListener('click', calculateSolarNeeds);
    
    function calculateSolarNeeds() {
        // Get input values
        const stateFactor = parseFloat(document.getElementById('state').value);
        const monthlyBill = parseFloat(document.getElementById('bill').value);
        const customerType = document.querySelector('input[name="customer"]:checked').value;
        
        // Validate inputs
        if (isNaN(monthlyBill) || monthlyBill <= 0) {
            alert('Please enter a valid monthly electricity bill amount');
            return;
        }
        
        // Constants for calculation (India specific)
        const residentialCostPerKWh = 6.0;    // Average for residential
        const commercialCostPerKWh = 8.0;     // Average for commercial
        const industrialCostPerKWh = 7.0;     // Average for industrial
        
        // Determine cost per kWh based on customer type
        let costPerKWh;
        switch(customerType) {
            case 'residential':
                costPerKWh = residentialCostPerKWh;
                break;
            case 'commercial':
                costPerKWh = commercialCostPerKWh;
                break;
            case 'industrial':
                costPerKWh = industrialCostPerKWh;
                break;
            default:
                costPerKWh = residentialCostPerKWh;
        }
        
        // Solar panel specifications (India market)
        const panelWattage = 330;             // Common panel size in India
        const panelEfficiency = 0.80;         // System efficiency factor (80%)
        const costPerWatt = 45;               // Average cost per watt installed in INR
        const panelArea = 1.8;                // Square meters per panel
        
        // Calculate monthly kWh usage
        const monthlyKWh = monthlyBill / costPerKWh;
        
        // Calculate required system size in kW
        const dailyKWh = monthlyKWh / 30;
        const systemSizeKW = dailyKWh / (stateFactor * panelEfficiency);
        
        // Calculate number of panels
        const panelCount = Math.ceil((systemSizeKW * 1000) / panelWattage);
        
        // Calculate roof space
        const roofSpace = panelCount * panelArea;
        
        // Calculate estimated cost
        const systemCost = systemSizeKW * 1000 * costPerWatt;
        
        // Calculate payback period (years)
        const annualSavings = monthlyBill * 12;
        const paybackPeriod = systemCost / annualSavings;
        
        // Display results
        document.getElementById('monthly-kwh').textContent = `${monthlyKWh.toFixed(0)} kWh`;
        document.getElementById('system-size').textContent = `${systemSizeKW.toFixed(2)} kW`;
        document.getElementById('panel-count').textContent = panelCount;
        document.getElementById('roof-space').textContent = `${roofSpace.toFixed(1)} m² (${(roofSpace * 10.764).toFixed(1)} sq ft)`;
        document.getElementById('system-cost').textContent = `₹${systemCost.toLocaleString('en-IN')}`;
        document.getElementById('payback-period').textContent = `${paybackPeriod.toFixed(1)} years`;
        
        // Show results
        resultsContainer.style.display = 'block';
        
        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }
});