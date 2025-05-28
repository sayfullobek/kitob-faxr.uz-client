import { useEffect, useState } from 'react'
import { APP_API } from '../../config/BaseConfig'
import { AutoGet } from '../../config/service/AppService'
import ProjectModal from './ProjectModal'

export default function Blog() {
	const [projects, setProjects] = useState([])
	const [size, setSize] = useState(8)
	const [sizeLoading, setSizeLoading] = useState(false)
	const [total, setTotal] = useState(0)
	const [showModal, setShowModal] = useState(false)
	const [data, setData] = useState(null)

	const handleShowModal = item => {
		setData(item)
		setShowModal(true)
	}
	const getAll = async (size = 8) => {
		try {
			const res = await AutoGet(`${APP_API.projects}?page=1&limit=${size}`)
			setProjects(res.data || [])
			setTotal(res.total || 0)
		} catch (err) {}
	}
	const changeSize = async () => {
		setSizeLoading(true)
		setSize(size + 4)
		await getAll(size + 4)
		setSizeLoading(false)
	}
	useEffect(() => {
		getAll()
	}, [])
	return (
		<div>
			{showModal && <ProjectModal data={data} setShowModals={setShowModal} />}

			<div class='blog'>
				<div class='container'>
					<div class='section-header text-center'>
						<p>Loyihalar</p>
						<h2>Bu Bizning loyihalarimiz.</h2>
					</div>
					<div class='row'>
						{projects.map(item => (
							<div
								class='col-lg-4 col-md-6 wow fadeInUp'
								data-wow-delay='0.2s'
								onClick={() => handleShowModal(item)}
							>
								<div class='blog-item'>
									<div class='blog-img'>
										<img
											src={`${APP_API.upload}/${item.photo}`}
											alt='Image'
											style={{
												width: '100%',
												height: '250px',
												objectFit: 'cover',
											}}
										/>
									</div>
									<div class='blog-title'>
										<h3>{item.name}</h3>
									</div>
									<div class='blog-meta'>
										{/* <p>
											By<a href=''>Admin</a>
										</p>
										<p>
											In<a href=''>Construction</a>
										</p> */}
										<p>Kitob Faxr</p>
									</div>
									<div class='blog-text'>
										<p>{item.description}</p>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className='w-100 d-flex align-items-center justify-content-center'>
						<button
							className='btn btn-warning'
							onClick={changeSize}
							disabled={total <= size}
						>
							{total > size ? 'Yana yuklash' : ' Barcha loyihalar yuklandi'}
							{sizeLoading && <span class='fa fa-spinner fa-spin'></span>}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
