/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/3rdpartylicenses.txt","d41d8cd98f00b204e9800998ecf8427e"],["/assets/images/IMG_2746.JPG","d8e56846fcb24a81d0966f51d363f06a"],["/assets/images/icons/android-icon-144x144.png","9a9c94bc4abbf2f6fce5950a267c0123"],["/assets/images/icons/android-icon-192x192.png","b5307165189572399139b3e2a55d0828"],["/assets/images/icons/android-icon-36x36.png","eca7e8e3061370fd8e07b1a330ebe6d3"],["/assets/images/icons/android-icon-48x48.png","e84fee1c825300ade055157938d0431a"],["/assets/images/icons/android-icon-72x72.png","d6565d3da4af7c86b9db5f064b50f0da"],["/assets/images/icons/android-icon-96x96.png","579f014ed6f2980007103b030ba597da"],["/assets/images/icons/apple-icon-114x114.png","47f07d3fee9b33ba264476cb9672d89e"],["/assets/images/icons/apple-icon-120x120.png","53ea0c489db814fdecbe30a1d6264291"],["/assets/images/icons/apple-icon-144x144.png","9a9c94bc4abbf2f6fce5950a267c0123"],["/assets/images/icons/apple-icon-152x152.png","dffe5f746afe1fe7ad37f5d871c844f2"],["/assets/images/icons/apple-icon-180x180.png","bfcca38768fb5982c4dffe1fcd77a144"],["/assets/images/icons/apple-icon-57x57.png","32801c5a4d0506403a75773cd98bc505"],["/assets/images/icons/apple-icon-60x60.png","b4fd6d072e798b59adef3ed1783f114c"],["/assets/images/icons/apple-icon-72x72.png","d6565d3da4af7c86b9db5f064b50f0da"],["/assets/images/icons/apple-icon-76x76.png","643e83e10aaaed8b7976ffda7b909ab7"],["/assets/images/icons/apple-icon-precomposed.png","de99d1c0ab59452b0b085b60b98ba07d"],["/assets/images/icons/apple-icon.png","de99d1c0ab59452b0b085b60b98ba07d"],["/assets/images/icons/browserconfig.xml","653d077300a12f09a69caeea7a8947f8"],["/assets/images/icons/favicon-16x16.png","e1f28791ea6da765ab0c84dfbee1b06a"],["/assets/images/icons/favicon-32x32.png","f1fa0e73bcdba0ace5b8998e291a09e8"],["/assets/images/icons/favicon-96x96.png","579f014ed6f2980007103b030ba597da"],["/assets/images/icons/favicon.ico","c1ec3a3873279d185206b879dbbcc7a8"],["/assets/images/icons/manifest.json","b58fcfa7628c9205cb11a1b2c3e8f99a"],["/assets/images/icons/ms-icon-144x144.png","9a9c94bc4abbf2f6fce5950a267c0123"],["/assets/images/icons/ms-icon-150x150.png","d0274778ce1347f351bbc33e280cb17d"],["/assets/images/icons/ms-icon-310x310.png","0c5a6aba5255d0329a73e3d3ca5381ca"],["/assets/images/icons/ms-icon-70x70.png","f93d8c4ac2dc1aaa0d9a35a7a4a0b61e"],["/favicon.ico","b9aa7c338693424aae99599bec875b5f"],["/index.html","8efc3d783d397cb713c236c7958a12e6"],["/inline.8054cd66ef867036e955.bundle.js","be1e514bd8e98b808f198566af55ffd6"],["/main.8504b47ee437ebc0768f.bundle.js","3bcaac126f4e1baa311e5a48d424c20c"],["/manifest.json","e0c9625a7cc9011875699143429efb7a"],["/polyfills.67d068662b88f84493d2.bundle.js","ad4076ac41e8c08e5b5f872136081192"],["/styles.93c6b41b2b26b0093a05.bundle.css","93c6b41b2b26b0093a055af87118b2a4"],["/vendor.c614f1fd049d6fe8d374.bundle.js","6226e0f29635f701a3b8cdd2a2565405"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '/index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["^(?!\\/__)"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







