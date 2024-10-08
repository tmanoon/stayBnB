import React, { useState, useRef } from 'react'
import { uploadService } from '../../services/upload.service'

export function StayImgsUploader({ onUploaded = null, editStay, stay }) {

  const [imgData, setImgData] = useState(stay.imgUrls || [])
  const fileInputRef = useRef(null)

  async function addImgs(ev) {
    const files = ev.target.files
    const newImgUrls = []

    for (const file of files) {
      const { secure_url } = await uploadService.uploadImg({ target: { files: [file] } })
      newImgUrls.push(secure_url)
    }

    const updatedImgUrls = [...(stay.imgUrls || []), ...newImgUrls]
    editStay({ ...stay, imgUrls: updatedImgUrls })
    setImgData(updatedImgUrls)

    if (onUploaded) {
      newImgUrls.forEach(url => onUploaded(url))
    }
  }

  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  const handleDeleteImg = (ev, idx) => {
    ev.stopPropagation()
    const updatedImgUrls = imgData.filter((_, index) => index !== idx)
    setImgData(updatedImgUrls)
    editStay({ ...stay, imgUrls: updatedImgUrls })
  }

  return (
    <div className="upload-preview" onClick={handleImageClick}>
      {!!imgData.length && <div className="img-gallery">
        {imgData.map((url, idx) => (
          <div className='img' key={idx} >
            <img
              src={url}
              alt={`Uploaded Image ${idx}`}
            />
            <button className='delete-btn' onClick={(ev) => handleDeleteImg(ev, idx)}></button>
          </div>
        ))}
      </div>}
      {!imgData.length && <div className='replace-img-txt'>Add photos</div>}
      <input
        ref={fileInputRef}
        type="file"
        onChange={addImgs}
        accept="image/*"
        multiple
        style={{ display: 'none' }}
      />
    </div>
  )
}
