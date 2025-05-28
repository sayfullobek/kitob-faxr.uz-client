import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { APP_API } from '../../config/BaseConfig'
import { AutoGet } from '../../config/service/AppService'
import { Loader } from '../Loader'

export default function NewsNow() {
	const id = useParams().id
	const [news, setNews] = useState([])
	const [newNow, setNewNow] = useState({})
	const [allNews, setAllNews] = useState([])
	const [loading, setLoading] = useState(false)

	const getOne = async () => {
		const res = await AutoGet(`${APP_API.subNews}/news/${id}`)
		const newsNow = await AutoGet(`${APP_API.news}/${id}`)
		const allNews = await AutoGet(`${APP_API.news}/all?page=1&limit=3`)
		setAllNews(allNews.data)
		setNews(res)
		setNewNow(newsNow.news)
		setLoading(true)
	}

	useEffect(() => {
		getOne()
	}, [id])
	return loading ? (
		<div className='d-flex justify-content-between p-4'>
			<div className='md-col-9 NewsNow'>
				<div className='card p-4 NewsNow'>
					<div>
						<h1 className='card-title'>{newNow.name}</h1>
					</div>
					{news.map(item => (
						<>
							<img
								src={`${APP_API.upload}/${item.photo}`}
								className='card-img-top w-100'
								alt={newNow.name}
							/>
							<div className='card-body'>
								<p className='card-text'>{item.description}</p>
							</div>
						</>
					))}
				</div>
			</div>
			<div className='col-3 p-4 bg-light another-news'>
				<div>
					<h2>Boshqa Yangiliklar</h2>
				</div>
				<div>
					{allNews?.map(item => (
						<div className='card mb-3' key={item._id}>
							<img
								src={`${APP_API.upload}/${item.subNews?.photo}`}
								className='card-img-top'
								alt={item.name}
							/>
							<div className='card-body'>
								<h5 className='card-title'>{item.name}</h5>
								<p className='card-text'>{item.description}</p>
								<a href={`/newsNow/${item._id}`} className='btn btn-primary'>
									O'tish
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	) : (
		<Loader />
	)
}
