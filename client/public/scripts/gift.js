const renderGift = async () => {
  const requestedID = parseInt(window.location.href.split('/').pop())

  const response = await fetch('/music')
  const data = await response.json()

  const giftContent = document.getElementById('gift-content')

  let gift

  gift = data.find(gift => gift.id === requestedID)

  if (gift) {
    document.getElementById('image').src = gift.cover
    document.getElementById('title').textContent = gift.title
    document.getElementById('artist').textContent = 'Artist: ' + gift.artist
    document.getElementById('year').textContent = 'Year: ' + gift.year
    document.getElementById('genre').textContent = 'Genre: ' + gift.genre
    document.getElementById('url').textContent = gift.url
    document.title = `Melody- ${gift.title}`
  }
  else {
     
  }
}

renderGift()
