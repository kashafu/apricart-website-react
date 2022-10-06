export default function toKebabCase(word) {
	return encodeURI(word
		.replace(/([a-z])([A-Z])/g, "$1-$2")
		.replace(/[\s_]+/g, "-")
		.toLowerCase())
}

export function fromKebabCase(word) {
	let temp = word.split('-')
	let out = ''
	temp.forEach((item) => {
		out = out.concat(item + " ")
	})
	return decodeURI(out)
}