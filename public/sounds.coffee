window.AudioContext = window.AudioContext || window.webkitAudioContext

navigator.getUserMedia = navigator.getUserMedia ||
navigator.oGetUserMedia ||
navigator.msGetUserMedia ||
navigator.mozGetUserMedia ||
navigator.webkitGetUserMedia

context = new AudioContext()

onError = (e) =>
  console.log('error', e)

bieberBuffer = null

loadBieber = (url) =>
  request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.responseType = 'arraybuffer'

  request.onload = () =>
    context.decodeAudioData(request.response,
      (buffer) => bieberBuffer = buffer
      console.log("Bieber loaded")
      ,
      onError)

  request.send()

playSound = (buffer) =>
  source = context.createBufferSource()
  source.buffer = buffer
  source.connect(context.destination)
  source.start(0)

loadBieber("/sounds/bieber.wav")

window.playBieber = () =>
  playSound(bieberBuffer)

#
#navigator.getUserMedia({audio: true},
#  (stream) =>
#    microphone = context.createMediaStreamSource(stream)
#    filter = context.createBiquadFilter()
#
#  # microphone -> filter -> destination.
#    microphone.connect(filter)
#    filter.connect(context.destination)
#  , errorCallback)