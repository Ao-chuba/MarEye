"use client";

export function VideoBackground() {
	return (
		<div className="fixed inset-0 -z-10 overflow-hidden">
			{/* Beautiful animated gradient background */}
			<div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950"></div>
			
			{/* Animated ocean waves effect */}
			<div className="absolute inset-0 opacity-20">
				<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-teal-500/10 animate-pulse" style={{ animationDuration: "6s" }}></div>
				<div className="absolute inset-0 bg-gradient-to-l from-transparent via-cyan-400/5 to-transparent animate-pulse" style={{ animationDuration: "8s", animationDelay: "2s" }}></div>
			</div>
			
			{/* Floating particles */}
			<div className="absolute inset-0">
				{Array.from({ length: 30 }).map((_, i) => (
					<div
						key={i}
						className="absolute rounded-full bg-cyan-400/20 animate-pulse"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							width: `${Math.random() * 4 + 2}px`,
							height: `${Math.random() * 4 + 2}px`,
							animationDelay: `${Math.random() * 5}s`,
							animationDuration: `${Math.random() * 4 + 3}s`,
						}}
					/>
				))}
			</div>
			
			<div className="absolute inset-0 bg-black/20" />
		</div>
	);
}
