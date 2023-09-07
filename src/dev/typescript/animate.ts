const animationClass : string = 'animated' as const
const allowedAnimations : readonly string[] = ['faderight','fadeleft']


function animateElement(element : HTMLElement, delay ?: number) {
  setTimeout(()=>{
    element.classList.add('animated')
  },delay || 0)
}

function animationCallback(entries : IntersectionObserverEntry[], observer : IntersectionObserver) {
  entries.forEach(entry => {
    try {
      // Check if entry is intersecting
      if (!entry.isIntersecting) return
      // Get the animation  style
      const animationStyle : string = entry.target.getAttribute('data-animate') as string
      //If animation does not exist, throw an error
      if (!allowedAnimations.includes(animationStyle)) throw new Error(`Animation of style ${animationStyle} does not exist`)
      // Get the animation delay
      const animationDelay : number | null = Number(entry.target.getAttribute('data-delay'))
      // Execute the animation
      animateElement(entry.target as HTMLElement,animationDelay)
    } catch(err) {
        console.error(err)
    }
    // Disconnect the observer if all entries have been animated
    if (entries.every(entry => entry.target.classList.contains(animationClass))) observer.disconnect()
  })
}
// Create the intersection observer
const animationObserver = new IntersectionObserver(animationCallback, { threshold: 1 })
// Observe all the elements with the attribute 'data-animate'
Array.from(document.querySelectorAll('[data-animate]')).forEach(entry => animationObserver.observe(entry))