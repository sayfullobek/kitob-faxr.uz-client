import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Loader } from '../component/Loader'
import Footer from '../component/Main/Footer'
import HeroSection from '../component/Main/HeroSection'

export default function MainLayout() {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false)
		}, 2000) // Simulate loading for 2 second

		return () => clearTimeout(timer)
	}, [])
	return loading ? (
		<Loader />
	) : (
		<div>
			<HeroSection />
			<Outlet />
			<Footer />
		</div>
	)
}
