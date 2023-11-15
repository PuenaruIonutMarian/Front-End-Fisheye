function mediaFactory(mediaData) {
    const { type, url, title } = mediaData;

    switch (type) {
        case 'image':
            const img = document.createElement('img');
            img.src = url;
            img.alt = title;
    
            return img;
        case 'video':
            const video = document.createElement('video');
            video.src = url;
            video.alt = title;
            video.controls = true;
            return video;
            
        default:
            console.error('Unsupported media type:', type);
            return null;
    }
}
