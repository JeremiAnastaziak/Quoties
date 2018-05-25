import { visionApiKey } from 'private/config';

export default function (base64string) {
    return fetch(`https://vision.googleapis.com/v1/images:annotate?key=${visionApiKey}`,{
        method: 'POST',
        body: JSON.stringify({
            "requests": [
                {
                "image": {
                    "content": base64string.split(',')[1]
                },
                "features": [
                    {
                    "type": "TEXT_DETECTION"
                    }
                ]
                }
            ]
        }),
    })
    .then(response => response.json())
    .catch(console.log)
}
