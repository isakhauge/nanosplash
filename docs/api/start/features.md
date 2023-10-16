# Features

## Small bundle size

The Nanosplash bundle is merely 3KB minified and gzipped and will not add any significant weight to your application what so ever. Go to [Bundlephobia](https://bundlephobia.com/package/nanosplash) to see for yourself.

## Simple API

Nanosplash was written from the ground up with simplicity in mind. The API is very simple and easy to use, and you can easily get started in seconds. Just install the package and start using `ns.show` and `ns.hide`. Go to [Getting started](/api/start/install.md) to see how.

## Spawning

With Nanosplash you can spawn a splash element anywhere in your DOM. You can even spawn multiple splash elements if you want to. Go to the [API Documentation](/api/doc/show#show-inside) to see how.

## Element recycling

Instead of creating new elements all the time and exhausting DOM manipulations, we recycle and repurpose obsolete splash elements instead. For each time a splash element is created, we check for existing splash elements inside the parent element and use them instead of creating new ones.
