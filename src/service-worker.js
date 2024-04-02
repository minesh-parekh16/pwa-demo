/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from 'workbox-precaching';
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ url }) => url.origin === 'https://jsonplaceholder.typicode.com',
  new NetworkFirst()
);

registerRoute(
  /\.(?:js|css|html)$/,
  new StaleWhileRevalidate()
);