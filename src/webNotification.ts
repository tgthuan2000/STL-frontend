import { client } from './sanityConfig'

const setupNotifications = async () => {
    if (!('Notification' in window)) {
        return
    }

    if (Notification.permission === 'denied') {
        return
    }

    // Wait for the user to give notification permissions
    await new Promise(async (resolve) => {
        if (Notification.permission === 'granted') {
            resolve('granted')
        }

        const result = await Notification.requestPermission()

        if (result === 'granted') {
            resolve('granted')
        }
    })

    const subscriber = async () => {
        const sub = client.listen(`count(*[ _type == 'madLib' ])`).subscribe(() => {})
        // sub.unsubscribe()
    }

    subscriber()
}

export default setupNotifications
