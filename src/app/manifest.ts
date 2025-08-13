import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        "name": "Todo List Next",
        "short_name": "Todo",
        "description": "A progressive application built with Next JS (Todo List)",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffc40d",
        "theme_color": "#ffc40d",
        "icons": [
            {
                "src": "main.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "main.png",
                "sizes": "512x512",
                "type": "image/png"
            }
        ]
    }
}