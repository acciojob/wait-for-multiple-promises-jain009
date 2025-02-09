document.addEventListener("DOMContentLoaded", function() {
    const outputTable = document.getElementById("output");
    cy.get("tbody#output").then(($tbody) => {
  console.log($tbody.html()); // Check if "loading" is inside
});
    // Initially display Loading row
    outputTable.innerHTML = `<tr><td colspan="2">Loading...</td></tr>`;
    
    function createPromise(id) {
        return new Promise(resolve => {
            const time = (Math.random() * 2 + 1).toFixed(3); // Random time between 1-3 sec
            setTimeout(() => resolve({ id, time }), time * 1000);
        });
    }
    
    const promises = [createPromise(1), createPromise(2), createPromise(3)];
    
    const startTime = performance.now();
    
    Promise.all(promises).then(results => {
        const endTime = performance.now();
        const totalTime = ((endTime - startTime) / 1000).toFixed(3);
        
        // Remove loading row
        outputTable.innerHTML = "";
        
        results.forEach(result => {
            const row = `<tr><td>Promise ${result.id}</td><td>${result.time} sec</td></tr>`;
            outputTable.innerHTML += row;
        });
        
        // Add total row
        outputTable.innerHTML += `<tr><td>Total</td><td>${totalTime} sec</td></tr>`;
    });
});
