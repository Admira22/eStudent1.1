const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dwhynx6j5',
    api_key: '184424425752741',
    api_secret: 'Xvc4KmUQpuJQXJEg5UlRUZWu2CE'
})

const upload = async file => {
    return await cloudinary.uploader.upload(file, {
        folder: 'covers',

    })
}

module.exports = upload