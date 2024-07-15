document.addEventListener('DOMContentLoaded', () => {
    const symptomForm = document.getElementById('symptomForm');
    const recordButton = document.getElementById('recordButton');
    const stopButton = document.getElementById('stopButton');
    const recordingStatus = document.getElementById('recordingStatus');
    const audioPlayback = document.getElementById('audioPlayback');

    let mediaRecorder;
    let audioChunks = [];

    recordButton.addEventListener('click', () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                recordingStatus.textContent = 'Recording...';
                recordButton.disabled = true;
                stopButton.disabled = false;

                mediaRecorder.ondataavailable = event => {
                    audioChunks.push(event.data);
                };

                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    audioPlayback.src = audioUrl;
                    audioPlayback.style.display = 'block';

                    audioPlayback.audioBlob = audioBlob; // Attach the audioBlob to the audio element for later use
                };
            })
            .catch(error => {
                console.error('Error accessing audio devices:', error);
                alert('Could not access microphone. Please check your microphone settings.');
            });
    });

    stopButton.addEventListener('click', () => {
        mediaRecorder.stop();
        recordingStatus.textContent = 'Recording stopped.';
        recordButton.disabled = false;
        stopButton.disabled = true;
        audioChunks = [];
    });

    symptomForm.addEventListener('submit', event => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const age = document.getElementById('age').value.trim();
        const gender = document.getElementById('gender').value;
        const symptoms = document.getElementById('symptoms').value.trim();

        if (name === "" || age === "" || gender === "" || symptoms === "") {
            alert("Please fill out all fields.");
            return;
        }

        if (isNaN(age) || age <= 0) {
            alert("Please enter a valid age.");
            return;
        }

        const formData = new FormData(symptomForm);

        if (audioPlayback.audioBlob) {
            formData.append('audio', audioPlayback.audioBlob, 'symptoms.wav');
        }

        // Perform form submission (e.g., using fetch or XMLHttpRequest)
        fetch('/submit-symptoms', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert('Thank you for submitting your symptoms. Our team will get back to you soon.');
                symptomForm.reset();
                audioPlayback.style.display = 'none';
                recordingStatus.textContent = '';
            } else {
                alert('There was an issue submitting your symptoms. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your symptoms. Please try again.');
        });
    });
});
