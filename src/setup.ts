export const setupNotifications = async () => {
    if (!('Notification' in window)) {
        console.warn('Notifications are not supported in this browser')
        return
    }

    if (Notification.permission === 'denied') {
        console.warn('Notifications are denied by the user')
        return
    }

    if (!('PushManager' in window)) {
        console.warn('Push messaging is not supported')
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
}
