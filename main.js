// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const voiceSelect = document.getElementById('voice-select');
    const speakButton = document.getElementById('speak-button');
    const synth = window.speechSynthesis;
    let voices = [];

    // Populate the voices dropdown
    function populateVoiceList() {
        voices = synth.getVoices();
        voiceSelect.innerHTML = '';
        voices.forEach((voice, index) => {
            const option = document.createElement('option');
            option.textContent = `${voice.name} (${voice.lang})`;
            option.value = index;
            voiceSelect.appendChild(option);
        });
    }

    // Call populateVoiceList when voices are loaded
    populateVoiceList();
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = populateVoiceList;
    }

    // Function to speak the text
    function speakText() {
        if (synth.speaking) {
            console.error('SpeechSynthesis.speaking');
            return;
        }
        if (textInput.value !== '') {
            const utterThis = new SpeechSynthesisUtterance(textInput.value);
            utterThis.onend = () => {
                console.log('SpeechSynthesisUtterance.onend');
            };
            utterThis.onerror = (event) => {
                console.error('SpeechSynthesisUtterance.onerror', event);
            };
            const selectedVoice = voices[voiceSelect.value];
            utterThis.voice = selectedVoice;
            synth.speak(utterThis);
        }
    }

    // Add event listener to the speak button
    speakButton.addEventListener('click', speakText);
});
