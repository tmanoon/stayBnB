export const uploadService = {
  uploadImg
}

export async function uploadImg(ev) {
  const CLOUD_NAME = "db7t5amdv"
  const UPLOAD_PRESET = "Stay_imgs"
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const FORM_DATA = new FormData()
  FORM_DATA.append('upload_preset', UPLOAD_PRESET)
  FORM_DATA.append('file', ev.target.files[0])

  try {
    const res = await fetch(UPLOAD_URL, { method: 'POST', body: FORM_DATA })
    const elImg = await res.json()
    return elImg
  } catch (err) {
    console.error('Failed to upload', err)
    throw err
  }
}