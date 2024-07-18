import React, { useState, useRef } from 'react'
import { uploadService } from '../../services/upload.service'

export function ImgUploader({ onUploaded = null, placeholder = null, editStay = null, stay = null }) {
  const [imgData, setImgData] = useState({
    imgUrl: placeholder, // Initially set to placeholder
    height: 500,
    width: 500,
  });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null)

  async function uploadImg(ev) {
    setIsUploading(true)
    const { secure_url, height, width } = await uploadService.uploadImg(ev);
    setImgData({ imgUrl: secure_url, width, height })
    setIsUploading(false)
    onUploaded && onUploaded(secure_url)

    if (secure_url) {
      const updatedImgUrls = [...stay.imgUrls]
      updatedImgUrls[0] = secure_url
      editStay({ ...stay, imgUrls: updatedImgUrls })
    }
  }

  const handleImageClick = () => {
    fileInputRef.current.click()
  };

  return (
    <div className="upload-preview">
      <img
        src={stay.imgUrls[0]}
        style={{ maxWidth: '100%', maxHeight: '100%', float: 'right', cursor: 'pointer' }}
        onClick={handleImageClick}
        alt="Uploaded Image"
      />
      <div className='replace-img-txt'>Replace photo</div>
      <input
        ref={fileInputRef}
        className="upload-btn"
        type="file"
        onChange={uploadImg}
        accept="image/*"
        id="imgUpload"
        style={{ display: 'none' }}
      />
    </div>
  );
}
