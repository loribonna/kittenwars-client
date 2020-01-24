export const post = async (url: string, body: Object) => {
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(body)
	}).then(res => {
		if (!res.ok) {
			throw 'Response error';
		}
		return res.json();
	});
};

export const getFile = async (url: string) => {
    return fetch(url).then(res => {
		if (!res.ok) {
			throw 'Response error';
		}
		return res.text();
	});
}

export const get = async (url: string) => {
	return fetch(url).then(res => {
		if (!res.ok) {
			throw 'Response error';
		}
		return res.json();
	});
};

export const put = async (url: string, body: Object) => {
	return fetch(url, {
		method: 'PUT',
		body: body ? JSON.stringify(body) : null
	}).then(async res => {
		if (!res.ok) {
			throw {err:'Response error', data: await res.json()};
		}
		return res.json();
	});
};

export const del = async (url: string) => {
	return fetch(url, { method: 'DELETE' }).then(res => {
		if (!res.ok) {
			throw 'Response error';
        }

        return res.statusText === "No Content" ? null : res.json();
	});
};
