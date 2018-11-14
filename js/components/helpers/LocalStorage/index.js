class LS {
	get(key) {
		const cached = JSON.parse(
			localStorage.getItem(key)
		)

		if (!cached) {
			return null;
		}

        return cached;
	}

    getString(key) {
        JSON.stringify(this.get(key));
    }

	set(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	remove(key) {
		localStorage.removeItem(key);
	}

	getItem(key, item) {

	}

	setItem(key, item) {

	}

	removeItem(key, item) {

	}
}

export default new LS();
