const BannerShimmer = () => {
	return (
		<div>
			<div className="hidden animate-pulse lg:flex flex-row justify-between space-x-6 items-center h-[500px] p-4 rounded-lg bg-slate-200">
				<div className="animate-pulse w-3/5 h-full rounded-lg bg-slate-100"></div>
				<div className="flex flex-col h-[90%] w-2/5 justify-center space-y-12 items-center">
					<div className="animate-pulse w-full h-full rounded-lg bg-slate-100"></div>
					<div className="animate-pulse w-full h-full rounded-lg bg-slate-100"></div>
				</div>
			</div>
			<div className="flex animate-pulse lg:hidden h-[250px] w-full p-3 rounded-lg bg-slate-200">
				<div className="animate-pulse w-full h-full rounded-lg bg-slate-100" />
			</div>
		</div>
	)
}

export default BannerShimmer
