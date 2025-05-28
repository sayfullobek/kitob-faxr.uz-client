import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { APP_API } from '../../config/BaseConfig'
import { AutoSave } from '../../config/service/AppService'

export default function BuyModal({ id, onSubmit }) {
	const [formData, setFormData] = useState({ name: '', phone: '' })
	const navigate = useNavigate()
	console.log(id)

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		if (!formData.name || !formData.phone) {
			alert("Iltimos, barcha maydonlarni to'ldiring.")
			return
		}
		if (!/^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/.test(formData.phone)) {
			alert(
				"Iltimos, telefon raqamini to'g'ri formatda kiriting: +998 90 123 45 67"
			)
			return
		}
		const data = new FormData()
		data.append('archetectura', id)
		data.append('name', formData.name)
		data.append('phone', formData.phone)
		const res = await AutoSave(
			data,
			`${APP_API.orderArchetectura}`,
			'',
			navigate,
			`/`
		)
		console.log(res)
		onSubmit?.(formData)
		setFormData({ name: '', phone: '' })
		window.$('#buyModal').modal('hide')
	}

	return (
		<div
			className='modal fade'
			id='buyModal'
			tabIndex='-1'
			role='dialog'
			aria-labelledby='buyModalLabel'
			aria-hidden='true'
		>
			<div className='modal-dialog modal-dialog-centered' role='document'>
				<div className='modal-content'>
					<div className='modal-header bg-warning text-dark'>
						<h5 className='modal-title' id='buyModalLabel'>
							Buyurtma berish
						</h5>
						<button
							type='button'
							className='close'
							data-dismiss='modal'
							aria-label='Close'
						>
							<span aria-hidden='true'>&times;</span>
						</button>
					</div>
					<form onSubmit={handleSubmit}>
						<div className='modal-body'>
							<div className='form-group'>
								<label htmlFor='name'>Ismingiz</label>
								<input
									type='text'
									className='form-control border-warning'
									id='name'
									name='name'
									placeholder='Ismingizni kiriting'
									value={formData.name}
									onChange={handleChange}
									required
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='phone'>Telefon raqam</label>
								<input
									type='tel'
									className='form-control border-warning'
									id='phone'
									name='phone'
									value={formData.phone}
									onChange={handleChange}
									placeholder='+998 90 123 45 67'
									pattern='^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$'
									required
								/>
							</div>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-secondary'
								data-dismiss='modal'
							>
								Yopish
							</button>
							<button type='submit' className='btn btn-warning text-dark'>
								Yuborish
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
