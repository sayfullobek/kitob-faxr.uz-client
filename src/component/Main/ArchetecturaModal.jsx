import { useState } from 'react'
import { APP_API } from '../../config/BaseConfig'
import BuyModal from './BuyModal'

export default function ArchetecturaModal({ data }) {

	const [isBuyModalOpen, setIsBuyModalOpen] = useState(false)

	const handleShowBuy = () => {
		setIsBuyModalOpen(true)
	}

	const handleCloseBuy = () => {
		setIsBuyModalOpen(false)
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

			<BuyModal id={data._id} isVisible={isBuyModalOpen} onClose={handleCloseBuy} />
			<div
				className='modal-dialog modal-xl modal-dialog-centered'
				role='document'
			>
				<div
					className='modal-content border-0'
					style={{

						backgroundColor: 'rgba(255, 255, 255, 0.515)',
						height: '100%',
						overflowY: 'auto',
					}}
				>
					<div className='modal-header border-0'>
						<button
							type='button'

							className='close text-info'
							data-dismiss='modal'
							aria-label='Yopish'
						>
							<span aria-hidden='true'>&times;</span>
						</button>
					</div>

					<div className='modal-body d-flex flex-wrap justify-content-center align-items-start h-100'>
						{/* Rasm */}
						<div className='md-col-md-9'>
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
						<div className='col-md-10 bg-info p-4 shadow text-dark'>
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

							className='btn btn-info'
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
