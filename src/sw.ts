import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'

cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST)
self.skipWaiting()
clientsClaim()

declare let self: ServiceWorkerGlobalScope
declare const clients: {
    openWindow(url: string): Promise<WindowClient>
}

const receivePushNotification: (this: ServiceWorkerGlobalScope, ev: PushEvent) => any = (event) => {
    console.log('[Service Worker] Push Received.')
    if (event.data) {
        try {
            const { image, tag, url, title, body } = event.data?.json()

            const options: NotificationOptions = {
                data: url,
                body: body,
                // icon: image,
                vibrate: [200, 100, 200],
                tag: tag,
                // image: image,
                actions: [{ action: 'Detail', title: 'View' }],
            }
            event.waitUntil(self.registration.showNotification(title, options))
        } catch (error) {
            console.log(error)
        }
    }
}

const openPushNotification: (this: ServiceWorkerGlobalScope, ev: NotificationEvent) => any = (event) => {
    console.log('[Service Worker] Notification click Received.', event.notification.data)

    event.notification.close()
    event.waitUntil(clients.openWindow(event.notification.data))
}

self.addEventListener('push', receivePushNotification)
self.addEventListener('notificationclick', openPushNotification)
