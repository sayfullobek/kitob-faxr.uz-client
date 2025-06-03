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
					<div class='row'>
						{news.map(item => (
							<div class='col-lg-3 col-md-6 wow fadeInUp' data-wow-delay='0.1s'>
								<div class='team-item'>
									<div class='team-img'>
										<img
											src={`${APP_API.upload}/${item.subNews?.photo}`}
											alt='Team Image'
										/>
									</div>
									<div class='team-text'>
										<h2>{item.name}</h2>
										<p>
											{item.subNews?.description.slice(0, 15)}{' '}
											{item.subNews?.description.length > 15 && '...'}
										</p>
										<button
											className='btn btn-info mt-2 w-100'
											onClick={() => navigate(`/newsNow/${item._id}`)}
										>
											O'tish
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
