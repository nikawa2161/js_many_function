const textarea = document.querySelector('#text')
const textTitle = document.querySelector(".text-title");
let voiceList = document.querySelector('#voice')
let speechBtn = document.querySelector('.submit')

let synth = speechSynthesis
let isSpeaking = true

const voicesSpeech = () => {
  for(let voice of synth.getVoices()) {
    let option = document.createElement('option')
    option.text = voice.name
    voiceList.add(option)
  }
}

synth.addEventListener('voiceschanged', voicesSpeech)

const textToSpeech = text => {
  let utterance = new SpeechSynthesisUtterance(text)
  for(let voice of synth.getVoices()) {
    if(voice.name == voiceList.value) {
      utterance.voice = voice
    }
  }
  speechSynthesis.speak(utterance)
}

speechBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (textarea.value !== '') {
    if (textTitle.classList.contains("blank-error")) {
      textTitle.classList.remove("blank-error");
    }
    if (!synth.speaking) { 
      textToSpeech(textarea.value)
    }
    if (textarea.value.length > 30) {
      if (isSpeaking) {
        synth.resume()
        isSpeaking = false
        speechBtn.innerHTML = '一時停止'
      } else {
        synth.pause()
        isSpeaking = true
        speechBtn.innerHTML = '音声再開'
      }
      setInterval(() => {
        if (!synth.speaking && !isSpeaking) {
          isSpeaking = true
          speechBtn.innerHTML = '音声出力'
        }
      })
    } else {
      speechBtn.innerHTML = "音声出力";
    }
  } else {
    if (!textTitle.classList.contains('blank-error')) {
      textTitle.classList.add("blank-error");
    }
  }
})
