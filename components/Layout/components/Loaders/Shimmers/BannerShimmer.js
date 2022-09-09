const BannerShimmer = () => {
	return (
		<div>
			<div className="hidden animate-pulse lg:flex flex-row justify-between space-x-6 items-center aspect-[4.5] w-full p-2 rounded-lg bg-slate-200">
				<div className="flex flex-col h-full w-[65%] justify-center space-y-2 items-center">
					<div className="flex flex-row space-x-2 w-full h-1/5">
						<div className="animate-pulse w-1/3 h-full rounded-lg bg-slate-100"></div>
						<div className="animate-pulse w-1/3 h-full rounded-lg bg-slate-100"></div>
						<div className="animate-pulse w-1/3 h-full rounded-lg bg-slate-100"></div>
					</div>
					<div className="animate-pulse w-full h-4/5 rounded-lg bg-slate-100"></div>
				</div>
				<div className="animate-pulse w-[35%] h-full rounded-lg bg-slate-100"></div>
			</div>
			<div className="flex animate-pulse lg:hidden h-[250px] w-full p-3 rounded-lg bg-slate-200">
				<div className="animate-pulse w-full h-full rounded-lg bg-slate-100" />
			</div>
		</div>
	)
}

export default BannerShimmer
