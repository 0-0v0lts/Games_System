import { useState, useEffect } from 'react'
import axios from 'axios'

const Gameimagem = ({ title }) => {
  const [imgUrl, setImgUrl] = useState('')
  const API_KEY = 'a270cb5741884441adca87b8298d3c1b'

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${title}`)
        if (res.data.results && res.data.results.length > 0) {
          setImgUrl(res.data.results[0].background_image)
        }
      } catch (err) {
        console.error("nn achou a imagem", err)
      }
    }
    if (title) fetchImage()
  }, [title, API_KEY])

  return (
    <div className='image-container'>
      <img 
        src={imgUrl || 'https://via.placeholder.com/280x160?text=Buscando+Capa...'}
        alt={title}
      />
    </div>
  )
}

export default Gameimagem