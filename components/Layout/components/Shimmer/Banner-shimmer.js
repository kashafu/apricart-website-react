export default function Bannershimmer() {
	return (
		<div className="animate-pulse flex flex-row mx-2 h-[600px] p-4 bg-slate-100 ">
			<div className="animate-pulse  w-3/5 h-3/4 my-[100px]  bg-cyan-200"></div>
			<div className="flex flex-col h-full w-2/5 justify-center items-center">
				<div className="animate-pulse w-4/5 h-1/3 my-2 bg-cyan-50"></div>
				<div className="animate-pulse w-4/5 h-1/3 my-2 bg-cyan-50"></div>
			</div>
		</div>
	)
}
