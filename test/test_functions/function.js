function add(a, b) {
	if (typeof a == "number" && typeof b == "number") return a + b;
	else return null;
}

module.exports = { add };
