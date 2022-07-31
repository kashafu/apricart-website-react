/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: ["cbe.apricart.pk", "15.184.248.248", "staging.apricart.pk"],
	},
	async redirects() {
		return [
			{
				source: "/index.html",
				destination: "/",
				permanent: true,
			},
			{
				source: "/privacy-policy.html",
				destination: "/privacy-policy",
				permanent: true,
			},
			{
				source: "/terms-of-use.html",
				destination: "/terms-of-use",
				permanent: true,
			},
			{
				source: "/faq.html",
				destination: "/faqs",
				permanent: true,
			},
		]
	},
	// basePath: '/web'
}

// module.exports = nextConfig
