export const uploadService = {
  uploadImg
}
async function uploadImg(ev) {
  const UPLOAD_PRESET = "story-upload"
  const CLOUD_NAME = "dku6kryxs"
  
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const file =
    ev.type === 'change' ? ev.target.files[0] : ev.dataTransfer.files[0]

  const formData = new FormData()

  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)
  try {
    

    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData
    })
    const imgUrl = await res.json()
    return imgUrl
  } catch (err) {
    console.error('Failed to upload', err)
    throw err
  }
}

