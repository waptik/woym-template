const objectToString = Object.prototype.toString;

const isError = (value: Error) => objectToString.call(value) === '[object Error]';

const errorMessages = new Set([
	'network error', // Chrome
	'Failed to fetch', // Chrome
	'NetworkError when attempting to fetch resource.', // Firefox
	'The Internet connection appears to be offline.', // Safari 16
	'Load failed', // Safari 17+
	'Network request failed', // `cross-fetch`
	'fetch failed', // Undici (Node.js)
	'terminated', // Undici (Node.js)
]);

/**
Check if an error is a [Fetch network error](https://developer.mozilla.org/en-US/docs/Web/API/fetch#exceptions)

@return Returns `true` if the given value is a Fetch network error, otherwise `false`.

@see [is-network-error](https://github.com/sindresorhus/is-network-error/blob/main/index.js)

@example
```
import isNetworkError from 'is-network-error';

async function getUnicorns() {
	try {
		const response = await fetch('unicorns.json');
		return await response.json();
	} catch (error) {
		if (isNetworkError(error)) {
			return localStorage.getItem('…');
		}

		throw error;
	}
}

console.log(await getUnicorns());
```
*/
export default function isNetworkError(err:unknown) {
    const error = err as Error;

	const isValid = error
		&& isError(error)
		&& error.name === 'TypeError'
		&& typeof error.message === 'string';

	if (!isValid) {
		return false;
	}

	// We do an extra check for Safari 17+ as it has a very generic error message.
	// Network errors in Safari have no stack.
	if (error.message === 'Load failed') {
		return error.stack === undefined;
	}

	return errorMessages.has(error.message);
}