import sanityClient from '@sanity/client'
import ImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const client = sanityClient({
    projectId: import.meta.env.VITE_PROJECT_ID,
    dataset: 'production',
    apiVersion: import.meta.env.VITE_VERSION_API,
    token: import.meta.env.VITE_API_TOKEN,
    useCdn: false,
})

const builder = ImageUrlBuilder(client)

const urlFor = (src: SanityImageSource | undefined) => src && builder.image(src).toString()

export { client, urlFor }
