function permute (n, k) {
	const result = []
	const path = []
	const used = new Array(n + 1).fill(false)

	function backtrack () {
		if (path.length === k ) {
			result.push([...path])
			return
		}

		for (let i = 1; i <= n; i ++) {
			if (used[i]) continue;
			path.push(i)
			used[i] = true

			backtrack()
			path.pop()
			used[i]= false
		}
	}

	backtrack()

	return result
}

console.log('%c Evay ', 'background:#222;color:#42b983;padding:2px 6px;border-radius:4px;',
	permute(4, 3)
);
