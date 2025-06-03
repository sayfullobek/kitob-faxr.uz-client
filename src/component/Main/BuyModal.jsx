// components/BuyModal.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { APP_API } from '../../config/BaseConfig'
import { AutoSave } from '../../config/service/AppService'

export default function BuyModal({ id, onSubmit, onClose, isVisible }) {
	const [formData, setFormData] = useState({ name: '', phone: '' })
	const navigate = useNavigate()

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
			alert("Iltimos, telefon raqamini to'g'ri formatda kiriting: +998 90 123 45 67")
			return
		}
		const data = new FormData()
		data.append('archetectura', id)
		data.append('name', formData.name)
		data.append('phone', formData.phone)
		await AutoSave(data, `${APP_API.orderArchetectura}`, '', navigate, `/`)
		onSubmit?.(formData)
		setFormData({ name: '', phone: '' })
		onClose?.()
	}

	if (!isVisible) return null

	return (
		<div className='custom-modal-overlay'>
			<div className='custom-modal'>
				<div className='custom-modal-header'>
					<h5>Buyurtma berish</h5>
					<button onClick={onClose} className='close-btn'>&times;</button>
				</div>
				<form onSubmit={handleSubmit} className='custom-modal-body'>
					<div className='form-group'>
						<label htmlFor='name'>Ismingiz</label>
						<input
							type='text'
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
							id='phone'
							name='phone'
							placeholder='+998 90 123 45 67'
							value={formData.phone}
							onChange={handleChange}
							pattern='^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$'
							required
						/>
					</div>
					<div className='custom-modal-footer'>
						<button type='button' onClick={onClose} className='btn-secondary'>Yopish</button>
						<button type='submit' className='btn-primary'>Yuborish</button>
					</div>
				</form>
			</div>
		</div>
	)
}
