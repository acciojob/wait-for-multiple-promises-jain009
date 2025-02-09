document.addEventListener('DOMContentLoaded', () => {
            const output = document.getElementById('output');
            
            function createPromise() {
                const delayMs = Math.floor(Math.random() * 2001) + 1000; // Random between 1000-3000 ms
                const delay = delayMs / 1000; // Convert to seconds
                return new Promise(resolve => {
                    setTimeout(() => resolve(delay), delayMs);
                });
            }

            const promises = [createPromise(), createPromise(), createPromise()];

            Promise.all(promises)
                .then(results => {
                    const totalTime = Math.max(...results);
                    
                    // Clear loading message
                    output.innerHTML = '';
                    
                    // Add promise results
                    results.forEach((time, index) => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>Promise ${index + 1}</td>
                            <td>${time.toFixed(3)}</td>
                        `;
                        output.appendChild(row);
                    });
                    
                    // Add total row
                    const totalRow = document.createElement('tr');
                    totalRow.innerHTML = `
                        <td>Total</td>
                        <td>${totalTime.toFixed(3)}</td>
                    `;
                    output.appendChild(totalRow);