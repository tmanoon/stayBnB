import React, { useState, useRef } from 'react'
import { uploadService } from '../services/upload.service'

export function SignupImgUploader({ onUploaded = null, onAddImg }) {
    const [imgData, setImgData] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef(null)

    async function addImg(ev) {
        const file = ev.target.files[0]

        if (file) {
            setIsUploading(true)
            try {
                const { secure_url } = await uploadService.uploadImg({ target: { files: [file] } })
                const updatedImgUrl = secure_url

                setImgData(updatedImgUrl)
                onAddImg(updatedImgUrl)
                setIsUploading(false)

                if (onUploaded) {
                    onUploaded(secure_url)
                }
            } catch (err) { console.log(err) }
        }
    }

    const handleImageClick = () => {
        if (!isUploading) fileInputRef.current.click()
    }

    return (
        <div className="upload-preview flex column align-center" onClick={handleImageClick}>
            {imgData &&
                <img src={imgData} alt="User Image" />
            }
            <input
                ref={fileInputRef}
                type="file"
                onChange={addImg}
                accept="image/*"
                style={{ display: 'none' }}
            />
        </div>
    )
}