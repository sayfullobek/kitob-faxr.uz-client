import { useEffect, useState } from 'react'
import { APP_API } from '../../config/BaseConfig'
import { AutoGet } from '../../config/service/AppService'
import ProjectModal from './ProjectModal'

export default function Carausel() {
	const [projects, setProjects] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [data, setData] = useState(null)
	const handleShowModal = item => {
		setData(item)
		setShowModal(true)
	}

	const getAll = async () => {
		try {
			const res = await AutoGet(APP_API.projects)
			setProjects(res.data || [])
		} catch (err) {
			console.error('Maʼlumotlar olinmadi:', err)
		}
	}

	useEffect(() => {
		getAll()
	}, [])

	return (
		<div
			id='carouselExampleIndicators'
			className='carousel slide'
			data-ride='carousel'
			data-interval='5000'
		>
			{showModal && <ProjectModal data={data} setShowModals={setShowModal} />}
			<ol className='carousel-indicators'>
				{projects.map((_, index) => (
					<li
						key={index}
						data-target='#carouselExampleIndicators'
						data-slide-to={index}
						className={index === 0 ? 'active' : ''}
					></li>
				))}
			</ol>
			<div className='carousel-inner'>
				{projects.map((item, index) => (
					<div
						className={`carousel-item ${index === 0 ? 'active' : ''}`}
						key={item._id}
					>
						<img
							src={`${APP_API.upload}/${item.photo}`}
							className='d-block w-100'
							alt={item.name}
							style={{
								height: '100%',
								objectFit: 'cover',
								filter: 'brightness(60%)',
							}}
						/>
						<div
							className='carousel-caption d-flex flex-column justify-content-center align-items-center'
							style={{
								top: 0,
								bottom: 0,
								left: 0,
								right: 0,
								position: 'absolute',
							}}
						>
							<h2
								className='text-white font-weight-bold mb-3'
								style={{ fontSize: '2.5rem' }}
							>
								{item.name}
							</h2>
							<p
								className='text-white mb-4'
								style={{ fontSize: '1.2rem', maxWidth: '800px' }}
							>
								{item.description}
							</p>
							<a
								className='btn btn-warning btn-lg'
								onClick={() => handleShowModal(item)}
								target='_blank'
								rel='noopener noreferrer'
							>
								O‘tish
							</a>
						</div>
					</div>
				))}
			</div>

			<a
				className='carousel-control-prev'
				href='#carouselExampleIndicators'
				role='button'
				data-slide='prev'
				style={{
					cursor: 'pointer',
					zIndex: '222222',
				}}
			>
				<span className='carousel-control-prev-icon' aria-hidden='true'></span>
				<span className='sr-only'>Previous</span>
			</a>
			<a
				className='carousel-control-next'
				href='#carouselExampleIndicators'
				role='button'
				data-slide='next'
				style={{
					cursor: 'pointer',
					zIndex: '222222',
				}}
			>
				<span className='carousel-control-next-icon' aria-hidden='true'></span>
				<span className='sr-only'>Next</span>
			</a>
		</div>
	)
}
