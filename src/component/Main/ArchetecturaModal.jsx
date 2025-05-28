import { APP_API } from '../../config/BaseConfig'
import BuyModal from './BuyModal'

export default function ArchetecturaModal({ data }) {
	const handleShowBuy = () => {
		setTimeout(() => {
			window.$('#buyModal').modal('show')
		}, 100)
	}
	return (
		<div
			className='modal fade text-light'
			id='kvartiraModal'
			tabIndex='-1'
			role='dialog'
			aria-labelledby='kvartiraModalLabel'
			aria-hidden='true'
			style={{
				backgroundColor: 'rgba(255, 255, 255, 0.3)', // yoki 'white'
				height: '100vh',
				overflowY: 'auto',
			}}
		>
			{data && <BuyModal id={data?._id} onSubmit={handleShowBuy} />}
			<div
				className='modal-dialog modal-xl modal-dialog-centered'
				role='document'
			>
				<div
					className='modal-content border-0'
					style={{
						backgroundColor: 'transparent',
						height: '100%',
						overflowY: 'auto',
					}}
				>
					<div className='modal-header border-0'>
						<button
							type='button'
							className='close text-warning'
							data-dismiss='modal'
							aria-label='Yopish'
						>
							<span aria-hidden='true'>&times;</span>
						</button>
					</div>

					<div className='modal-body d-flex flex-wrap justify-content-center align-items-start h-100'>
						{/* Rasm */}
						<div className='md-col-md-7'>
							<img
								src={`${APP_API.upload}/${data?.photo}`}
								alt='Kvartira'
								className='img-fluid shadow w-100 md-h-100'
								style={{
									objectFit: 'cover',
								}}
							/>
						</div>

						{/* Ma'lumotlar */}
						<div className='col-md-5 bg-warning p-4 shadow text-dark'>
							<h4 className='mb-3'>Loyiha: {data?.projects?.name}</h4>
							<p className='d-flex align-items-center justify-content-between'>
								<strong>Maydon:</strong> {data?.maydon} m²
							</p>
							<p className='d-flex align-items-center justify-content-between'>
								<strong>Qavat:</strong> {data?.qavat}
							</p>
							<p className='d-flex align-items-center justify-content-between'>
								<strong>Seksiya:</strong> {data?.seksiya}
							</p>
							<p className='d-flex align-items-center justify-content-between'>
								<strong>Navbat:</strong> {data?.navbat}
							</p>
							<p className='d-flex align-items-center justify-content-between'>
								<strong>Yangilangan:</strong>{' '}
								{new Date(data?.updatedAt).toLocaleString()}
							</p>
						</div>
					</div>

					<div className='modal-footer border-0'>
						<button
							type='button'
							className='btn btn-warning'
							data-toggle='modal'
							data-target='#buyModal'
							onClick={handleShowBuy}
						>
							Buyurtma berish
						</button>
						<button
							type='button'
							className='btn btn-secondary'
							data-dismiss='modal'
						>
							Yopish
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
