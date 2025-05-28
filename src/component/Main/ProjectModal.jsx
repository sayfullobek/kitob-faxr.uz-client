import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { APP_API } from '../../config/BaseConfig'
import { AutoGet } from '../../config/service/AppService'
import ArchetecturaModal from './ArchetecturaModal'
import BuyModal from './BuyModal'
import Footer from './Footer'

export default function ProjectModal({ data, setShowModals }) {
	const [datas, setDatas] = useState([])
	const [filtered, setFiltered] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [dataone, setDataOne] = useState(null)
	const navigate = useNavigate()
	const [filters, setFilters] = useState({
		qavat: '',
		navbat: '',
		minMaydon: '',
		maxMaydon: '',
		soldOut: '',
	})
	const [size, setSize] = useState(8)
	const [total, setTotal] = useState(0)

	const getAll = async (size = 8) => {
		try {
			const res = await AutoGet(
				`${APP_API.archetecturas}/project/${data._id}?page=1&limit=${size}`
			)
			setTotal(res.total)
			setDatas(res.data)
			setFiltered(res.data)
		} catch (err) {
			console.error('Maʼlumotlar olinmadi:', err)
		}
	}

	useEffect(() => {
		getAll()
	}, [])

	useEffect(() => {
		let result = datas

		if (filters.qavat) {
			result = result.filter(item => item.qavat >= Number(filters.qavat))
		}
		if (filters.navbat) {
			result = result.filter(item => item.navbat >= Number(filters.navbat))
		}
		if (filters.minMaydon) {
			result = result.filter(item => item.maydon >= Number(filters.minMaydon))
		}
		if (filters.maxMaydon) {
			result = result.filter(item => item.maydon <= Number(filters.maxMaydon))
		}
		if (filters.soldOut) {
			const bool = filters.soldOut === 'true'
			result = result.filter(item => item.soldOut === bool)
		}

		setFiltered(result)
	}, [filters, datas])

	const handleChange = e => {
		const { name, value } = e.target
		setFilters(prev => ({ ...prev, [name]: value }))
	}

	const handleShowModal = item => {
		setDataOne(item)
		setTimeout(() => {
			window.$('#kvartiraModal').modal('show')
		}, 100)
	}

	const handleShowBuy = () => {
		setTimeout(() => {
			window.$('#buyModal').modal('show')
		}, 100)
	}

	const changeSize = async () => {
		setSize(size + 4)
		await getAll(size + 4)
	}
	return (
		<div
			className='bg-light'
			style={{
				height: '100vh',
				width: '100%',
				position: 'fixed',
				overflow: 'auto',
				top: 0,
				left: 0,
				zIndex: 9999999,
			}}
		>
			<div className='w-100'>
				<div className='w-100' style={{ position: 'relative' }}>
					<button
						className='btn btn-warning m-2'
						style={{ position: 'absolute', zIndex: '999999999' }}
						onClick={() => setShowModals(false)}
					>
						Orqaga
					</button>
					<img
						src={`${APP_API.upload}/${data.photo}`}
						className='w-100'
						style={{
							height: '50vh',
							objectFit: 'cover',
							filter: 'brightness(60%)',
						}}
						alt=''
					/>
				</div>
				<div>
					<div className='service py-5'>
						{data && <ArchetecturaModal data={dataone} />}
						<BuyModal />
						<div className='container'>
							<div className='section-header text-center mb-5'>
								<p>Kvartiralar</p>
								<h2>Bizning Kvartiralar</h2>
							</div>

							{/* Filter Form */}
							<div className='row mb-4 bg-light p-4 rounded'>
								<div className='col-md-4 mt-4'>
									<input
										type='number'
										name='qavat'
										value={filters.qavat}
										onChange={handleChange}
										className='form-control'
										placeholder='Qavat'
									/>
								</div>
								<div className='col-md-4 mt-4'>
									<input
										type='number'
										name='navbat'
										value={filters.navbat}
										onChange={handleChange}
										className='form-control'
										placeholder='Navbat'
									/>
								</div>
								<div className='col-md-4 mt-4'>
									<input
										type='number'
										name='minMaydon'
										value={filters.minMaydon}
										onChange={handleChange}
										className='form-control'
										placeholder='Min maydon (m²)'
									/>
								</div>
								<div className='col-md-4 mt-4'>
									<input
										type='number'
										name='maxMaydon'
										value={filters.maxMaydon}
										onChange={handleChange}
										className='form-control'
										placeholder='Max maydon (m²)'
									/>
								</div>
							</div>

							{/* Filtered List */}
							<div className='row'>
								{filtered.length === 0 ? (
									<div className='col-12 text-center'>
										<p>Hech qanday kvartira topilmadi.</p>
									</div>
								) : (
									filtered.map(item => (
										<div
											key={item._id}
											className='col-lg-4 col-md-6 wow fadeInUp mb-4'
											data-wow-delay='0.1s'
										>
											<div
												className='service-item'
												style={{
													boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
													borderRadius: 10,
													overflow: 'hidden',
													backgroundColor: item.soldOut ? '#fdbe33' : 'white',
													color: item.soldOut ? 'white' : 'black',
												}}
											>
												<div
													className='service-img'
													onClick={() => handleShowModal(item)}
												>
													<img
														src={`${APP_API.upload}/${item.photo}`}
														alt='Image'
														style={{
															width: '100%',
															height: '200px',
															objectFit: 'cover',
														}}
													/>
													<div className='service-overlay'>
														<p>Maydon: {item.maydon} m²</p>
														<p>Qavat: {item.qavat}</p>
														<p>Xonalar: {item.xonalar}</p>
														<p>Navbat: {item.navbat}</p>
													</div>
												</div>
												<div className='service-text p-3'>
													<h5>{item.projects?.name || 'Nomlanmagan'}</h5>
													<p
														style={{
															width: '100%',
															display: 'flex',
															justifyContent: 'space-between',
															marginTop: '10px',
														}}
													>
														Kvartira №: <strong>{item.kvartiraNumber}</strong>
													</p>
													<p
														style={{
															width: '100%',
															display: 'flex',
															justifyContent: 'space-between',
														}}
													>
														Sektsiya: <strong>{item.seksiya}</strong>
													</p>
													<p
														style={{
															width: '100%',
															display: 'flex',
															justifyContent: 'space-between',
														}}
													>
														Yakuniy sana:{' '}
														<strong>
															{new Date(item.endDate).toLocaleDateString()}
														</strong>
													</p>
													<button
														type='button'
														className='btn btn-warning mt-3 w-100'
														data-toggle='modal'
														data-target='#buyModal'
														onClick={handleShowBuy}
													>
														Buyurtma berish
													</button>
												</div>
											</div>
										</div>
									))
								)}
							</div>
						</div>
						<div className='text-center mt-4'>
							<button
								className='btn btn-warning'
								disabled={total <= size ? true : false}
								onClick={() => changeSize()}
							>
								Yana yuklash
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='w-100 text-start'>
				<Footer />
			</div>
		</div>
	)
}
