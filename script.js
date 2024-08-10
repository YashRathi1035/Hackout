// Simulate a click on the hidden file input when the "Browse files" button is clicked
document.getElementById('browse-btn').addEventListener('click', function() {
    document.getElementById('file-upload').click();
});

document.getElementById('file-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('uploaded-image').src = e.target.result;
            document.getElementById('uploaded-image').style.display = 'block';
            document.getElementById('file-name').textContent = file.name;
            document.getElementById('remove-btn').style.display = 'block';
            document.getElementById('classify-btn').disabled = false;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('remove-btn').addEventListener('click', function() {
    document.getElementById('file-upload').value = '';
    document.getElementById('uploaded-image').style.display = 'none';
    document.getElementById('file-name').textContent = '';
    document.getElementById('remove-btn').style.display = 'none';
    document.getElementById('classify-btn').disabled = true;
});

document.getElementById('classify-btn').addEventListener('click', function() {
    document.getElementById('prediction').style.display = 'block';
});