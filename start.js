const matching = document.querySelector(".matching")
const game = document.querySelector(".game")

function memoryColor(){
    const r = Math.floor(Math.random() * 256) 
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rbg(${r},${g},${b})`
  }
  matching.style.color = memoryColor()
  game.style.color = memoryColor()
  
  reset.addEventListener('click', function(){
    location.reload();
  })