import { useEffect, useState } from 'react'
import { APP_API } from '../../config/BaseConfig'
import { AutoGet } from '../../config/service/AppService'

export default function Fact() {
	const [project, setProject] = useState(0)
	const [sell, setSell] = useState(0)

	const get = async () => {
		const res = await AutoGet(`${APP_API.allData}`)

		setProject(res.allProjects || 0)
		setSell(res.soldOutArch || 0)
	}

	useEffect(() => {
		get()
	}, [])
	return (
		<div>
			<div class='fact'>
				<div class='container-fluid'>
					<div class='row counters'>
						<div class='col-md-6 fact-left wow slideInLeft'>
							<div class='row'>
								<div class='col-6'>
									<div class='fact-icon'>
										<i class='flaticon-worker'></i>
									</div>
									<div class='fact-text'>
										<h2 data-toggle='counter-up'>100+</h2>
										<p>Kuchli hodimlar</p>
									</div>
								</div>
								<div class='col-6'>
									<div class='fact-icon'>
										<i class='flaticon-building'></i>
									</div>
									<div class='fact-text'>
										<h2 data-toggle='counter-up'>400+</h2>
										<p>Mamnun mijozlar</p>
									</div>
								</div>
							</div>
						</div>
						<div class='col-md-6 fact-right wow slideInRight'>
							<div class='row'>
								<div class='col-6'>
									<div class='fact-icon'>
										<i class='flaticon-address'></i>
									</div>
									<div class='fact-text'>
										<h2 data-toggle='counter-up'>{project}</h2>
										<p>Muvaffaqiyatli loyihalar</p>
									</div>
								</div>
								<div class='col-6'>
									<div class='fact-icon'>
										<i class='flaticon-crane'></i>
									</div>
									<div class='fact-text'>
										<h2 data-toggle='counter-up'>{sell}</h2>
										<p>Sotilgan uylar</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
