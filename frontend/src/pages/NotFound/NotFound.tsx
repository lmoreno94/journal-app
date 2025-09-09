import React, { useState, useEffect } from "react";
import { Home, ArrowLeft, Rocket, Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);

		const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
			setMousePosition({
				x: (e.clientX / window.innerWidth) * 100,
				y: (e.clientY / window.innerHeight) * 100,
			});
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	const handleGoBack = () => {
		window.history.back();
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center relative overflow-hidden">
			{/* Estrellas de fondo */}
			<div className="absolute inset-0">
				{[...Array(30)].map((_, i) => (
					<div
						key={i}
						className="absolute bg-white rounded-full animate-pulse"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							width: `${Math.random() * 4 + 1}px`,
							height: `${Math.random() * 4 + 1}px`,
							animationDelay: `${Math.random() * 3}s`,
							animationDuration: `${Math.random() * 2 + 2}s`,
						}}
					/>
				))}
			</div>

			{/* Partículas interactivas */}
			<div className="absolute inset-0 pointer-events-none">
				{[...Array(8)].map((_, i) => (
					<div
						key={i}
						className="absolute w-6 h-6 bg-white bg-opacity-20 rounded-full animate-pulse"
						style={{
							left: `${20 + i * 8}%`,
							top: `${30 + i * 5}%`,
							transform: mounted
								? `translate(${mousePosition.x * 0.5}px, ${
										mousePosition.y * 0.3
								  }px)`
								: "none",
							transition: "transform 0.3s ease-out",
							animationDelay: `${i * 0.2}s`,
						}}
					/>
				))}
			</div>

			{/* Elemento decorativo - Cohete */}
			<div className="absolute top-20 right-20 hidden lg:block animate-bounce">
				<Rocket
					size={80}
					className="text-white opacity-60 transform rotate-45"
				/>
			</div>

			{/* Elemento decorativo - Planeta */}
			<div className="absolute bottom-20 left-20 hidden lg:block">
				<div
					className="w-24 h-24 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-70 animate-spin"
					style={{ animationDuration: "10s" }}
				/>
			</div>

			{/* Contenido principal */}
			<div className="relative z-30 text-center text-white px-6 max-w-4xl mx-auto">
				{/* Número 404 principal */}
				<div className="relative mb-8">
					<h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
						404
					</h1>

					{/* Efecto de resplandor */}
					<div
						className="absolute inset-0 text-8xl md:text-9xl lg:text-[12rem] font-bold text-white opacity-10 blur-sm animate-pulse"
						style={{ animationDelay: "0.5s" }}
					>
						404
					</div>
				</div>

				{/* Título con animación */}
				<div
					className={`transform transition-all duration-1000 ${
						mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
					}`}
				>
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 flex items-center justify-center gap-3">
						<Sparkles className="animate-spin text-yellow-300" size={32} />
						¡Oops! Página no encontrada
						<Sparkles className="animate-spin text-yellow-300" size={32} />
					</h2>
				</div>

				{/* Mensaje descriptivo */}
				<div
					className={`transform transition-all duration-1000 delay-500 ${
						mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
					}`}
				>
					<p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
						Parece que esta página se perdió en el espacio infinito del
						internet.
						<br />
						<span className="inline-flex items-center gap-2 mt-3">
							No te preocupes, podemos ayudarte a encontrar tu camino de regreso
							<Star size={24} className="animate-bounce text-yellow-300" />
						</span>
					</p>
				</div>

				{/* Botones de acción */}
				<div
					className={`transform transition-all duration-1000 delay-1000 ${
						mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
					}`}
				>
					<div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
						<Link
                            to={"/mis_notas"}
							className="group relative px-8 py-4 bg-opacity-20 backdrop-blur-md border border-white border-opacity-30 rounded-full text-white font-medium text-lg transition-all duration-300 hover:bg-opacity-30 hover:scale-105 hover:shadow-2xl flex items-center gap-3 min-w-[220px] justify-center"
						>
							<Home
								size={24}
								className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
							/>
							<span>Ir al inicio</span>
							<div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
						</Link>

						<button
							onClick={handleGoBack}
							className="group relative px-8 py-4 bg-opacity-20 backdrop-blur-md border border-white border-opacity-30 rounded-full text-white font-medium text-lg transition-all duration-300 hover:bg-opacity-30 hover:scale-105 hover:shadow-2xl flex items-center gap-3 min-w-[220px] justify-center"
						>
							<ArrowLeft
								size={24}
								className="transition-transform duration-300 group-hover:scale-110 group-hover:-translate-x-1"
							/>
							Volver atrás
							<div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
						</button>
					</div>
				</div>

				{/* Mensaje final */}
				<div
					className={`transform transition-all duration-1000 delay-1500 ${
						mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
					}`}
				>
					<div className="flex items-center justify-center gap-2 text-lg opacity-70">
						<span>O tal vez estás explorando nuevos horizontes...</span>
						<div className="flex gap-1">
							<Star size={16} className="animate-pulse text-yellow-300" />
							<Star
								size={18}
								className="animate-pulse text-blue-300"
								style={{ animationDelay: "0.3s" }}
							/>
							<Star
								size={16}
								className="animate-pulse text-pink-300"
								style={{ animationDelay: "0.6s" }}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Orbes flotantes grandes */}
			<div className="absolute inset-0 pointer-events-none z-10">
				<div
					className="absolute top-1/3 left-1/4 w-32 h-32 bg-purple-400 bg-opacity-20 rounded-full blur-xl animate-pulse"
					style={{ animationDuration: "4s" }}
				/>
				<div
					className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-pink-400 bg-opacity-20 rounded-full blur-xl animate-pulse"
					style={{ animationDuration: "6s", animationDelay: "2s" }}
				/>
				<div
					className="absolute top-1/2 right-1/3 w-24 h-24 bg-cyan-400 bg-opacity-20 rounded-full blur-xl animate-pulse"
					style={{ animationDuration: "5s", animationDelay: "1s" }}
				/>
			</div>

			{/* Elementos móviles en versión mobile */}
			<div className="absolute top-10 right-10 lg:hidden">
				<Rocket size={40} className="text-white opacity-60 animate-bounce" />
			</div>

			<div className="absolute bottom-10 left-10 lg:hidden">
				<div
					className="w-12 h-12 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-70 animate-spin"
					style={{ animationDuration: "8s" }}
				/>
			</div>
		</div>
	);
}
