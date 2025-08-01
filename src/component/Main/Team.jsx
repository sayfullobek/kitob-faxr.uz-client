import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { APP_API } from '../../config/BaseConfig'
import { AutoGet } from '../../config/service/AppService'
import { Loader } from '../Loader'

export default function Team() {
	const [news, setNews] = useState([])
	const navigate = useNavigate()
	const [size, setSize] = useState(8)
	const [total, setTotal] = useState(0)
	const [loading, setLoading] = useState(false)

	const getAll = async (size = 8) => {
		const res = await AutoGet(`${APP_API.news}/all?page=1&limit=${size}`)
		setNews(res.data)
		setTotal(res.total)
		setLoading(true)
	}

	const changeSize = async () => {
		setSize(size + 4)
		await getAll(size + 4)
	}

	useEffect(() => {
		getAll()
	}, [])
	return loading ? (
		<div className='bg-light'>
			<div class='team'>
				<div class='container'>
					<div class='section-header text-center'>
						<p>Yangiliklar</p>
						<h2>Kompaniya yangiliklari</h2>
					</div>
					<div className="row justify-content-center">
						{news.map((item, index) => (
							<div
								key={item._id || index}
								className="col-xl-3 col-lg-4 col-md-6 mb-4 d-flex align-items-stretch"
							>
								<div className="card shadow-sm w-100 border-0">
									<img
										src={`${APP_API.upload}/${item.subNews?.photo}`}
										alt="Yangilik rasmi"
										className="card-img-top"
										style={{
											height: "200px",
											objectFit: "cover",
											borderTopLeftRadius: "0.5rem",
											borderTopRightRadius: "0.5rem",
										}}
									/>
									<div className="card-body d-flex flex-column">
										<h5 className="card-title fw-bold text-dark">{item.name}</h5>
										<p className="card-text text-muted flex-grow-1">
											{item.subNews?.description?.slice(0, 60)}
											{item.subNews?.description?.length > 60 && "..."}
										</p>
										<button
											className="btn btn-primary mt-auto"
											onClick={() => navigate(`/newsNow/${item._id}`)}
										>
											Batafsil ko‘rish
										</button>
									</div>
								</div>
							</div>
						))}
					</div>

					<div className='text-center mt-4'>
						<button
							className='btn btn-info'
							disabled={total <= size ? true : false}
							onClick={() => changeSize()}
						>
							Yana yuklash
						</button>
					</div>
				</div>
			</div>
		</div>
	) : (
		<Loader />
	)
}
