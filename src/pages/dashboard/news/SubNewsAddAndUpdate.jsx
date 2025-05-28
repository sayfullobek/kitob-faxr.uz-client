import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { AutoForm } from '../../../component/AutoForm'
import { Breadcrump } from '../../../component/Breadcrump'
import { Loader } from '../../../component/Loader'
import { APP_API } from '../../../config/BaseConfig'
import { AutoGet, AutoSave } from '../../../config/service/AppService'
import { SUB_NEWS_BREADCRUMP_ADD } from '../../../utils/BreadcrumpUtils'
import { DASHBOARD_URL } from '../../../utils/Utils'

export const SubNewsAddAndUpdate = () => {
	const { id, newsId } = useParams()
	const [formData, setFormData] = useState({})
	const navigate = useNavigate()

	const [loading, setLoading] = useState(false)
	const [photo, setPhoto] = useState(null)

	const getAll = async () => {
		try {
			if (id) {
				const res = await AutoGet(`${APP_API.subNews}/${id}`)
				console.log(res)
				setFormData({
					description: res.description,
					imageUrl:
						res.photo instanceof Blob
							? URL.createObjectURL(`${APP_API.upload}/${res.photo}`)
							: `${APP_API.upload}/${res.photo}`,
				})
				setPhoto(res.photo)
			}
			setLoading(true)
		} catch (err) {}
	}

	useEffect(() => {
		getAll()
	}, [])

	const formFields = [
		{
			name: 'editPhotoSee',
			type: 'editPhotoSee',
			col: '50%',
		},
		{ name: 'photo', label: 'Rasm yuklang', type: 'file', col: '100%' },
		{ name: 'description', label: 'Izohi', type: 'textarea', col: '100%' },
	]

	const handleSubmit = async formData => {
		if (id) {
			formData.photo = photo
		}
		console.log(formData.photo)
		// Agar eski rasm string bo‘lsa, reject qilamiz
		if (!formData.photo) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Xatolik yuz berdi. Yangi rasm yuklang.',
			})
		}

		if (!formData.description || formData.description.trim().length < 2) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Tavsif bo'lishi shart.",
			})
		}

		const data = new FormData()
		data.append('photo', formData.photo)
		data.append('description', formData.description)
		data.append('news', newsId)

		const res = await AutoSave(
			data,
			APP_API.subNews,
			id ? id : '',
			navigate,
			`${DASHBOARD_URL.goNews}/${newsId}`
		)
		if (res) {
			Swal.fire({ icon: 'success', title: 'Saqlandi!', timer: 1500 })
			setFormData({})
		}
	}

	return loading ? (
		<Box sx={{ padding: '3rem', width: '100%' }}>
			<Breadcrump
				status={'back'}
				url={`/${DASHBOARD_URL.goNews}/${newsId}`}
				arr={SUB_NEWS_BREADCRUMP_ADD(newsId)}
			/>
			<Box sx={{ marginTop: '2rem', width: '100%' }}>
				<AutoForm
					fields={formFields}
					onSubmit={handleSubmit}
					formData={formData}
					setFormData={setFormData}
				/>
			</Box>
		</Box>
	) : (
		<Loader />
	)
}
