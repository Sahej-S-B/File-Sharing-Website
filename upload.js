document.getElementById('uploadForm').onsubmit = async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    
    const response = await fetch('https://api.github.com/repos/<username>/<repo>/contents/<path_to_file>', {
        method: 'PUT',
        headers: {
            'Authorization': 'token YOUR_GITHUB_TOKEN',
            'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
            message: 'Upload file',
            content: btoa(await readFile(formData.get('file'))),
            sha: '' // Optional: Use if you want to update an existing file
        })
    });

    const data = await response.json();
    document.getElementById('linkContainer').innerText = `File uploaded! Link: ${data.content.html_url}`;
};

async function readFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsArrayBuffer(file);
    });
}
