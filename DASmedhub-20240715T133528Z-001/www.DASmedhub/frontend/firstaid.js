document.getElementById('join-live-session').addEventListener('click', function() {
    alert('Redirecting to live session platform...');
    // Here you can add the link to the live session platform or any other functionality
    window.location.href = 'https://live-session-platform.com/join';
});

document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search').value;
    alert('You searched for: ' + query);
    // Implement the search functionality here
});
