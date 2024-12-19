const quoteContainer = document.getElementById('quote-container');
const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const button = document.getElementById('new-quote');

// Function to fetch a random quote from the Quotable API
async function fetchQuote() {
  try {
    const res = await fetch('https://api.quotable.io/random');
    const data = await res.json();
  
    quoteElement.innerText = `"${data.content}"`;
    authorElement.innerText = `— ${data.author}`;
  } catch (error) {
    console.log('Error fetching quote:', error);
    quoteElement.innerText = 'Failed to load a quote, please try again later.';
    authorElement.innerText = '';
  }
}

// Set initial quote when the page loads
window.onload = fetchQuote;

// Event listener for the button click
button.addEventListener('click', fetchQuote);
