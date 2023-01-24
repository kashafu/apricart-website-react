const BannerShimmer = () => {
	return (
		<>
			<div className="lg:hidden aspect-[2.2] w-full bg-slate-200 animate-pulse rounded-lg" />
			<div className="hidden lg:block aspect-[5] w-full bg-slate-200 animate-pulse rounded-lg" />
		</>
	)
}

export default BannerShimmer
