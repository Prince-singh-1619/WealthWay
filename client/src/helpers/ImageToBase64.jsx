import imageCompression from 'browser-image-compression'

const compressImage = async(image) =>{
    const imageFile = image

    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
    }

    try{
        const compressedFile = await imageCompression(imageFile, options)
        console.log("Compressed file size:", compressedFile.size / 1024, "KB")
        return compressedFile
    }
    catch(err) {
        console.error("Error handling image upload:", err)
    }
}

const ImageToBase64 = async(image) =>{
    const compressedImage = await compressImage(image)

    const reader = new FileReader()
    reader.readAsDataURL(compressedImage) //converts to base 64

    const data = await new Promise((resolve, reject)=>{
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })
    return data
}

export default ImageToBase64