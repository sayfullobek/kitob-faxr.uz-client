import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { AutoForm } from '../../../component/AutoForm'
import { Breadcrump } from '../../../component/Breadcrump'
import { Loader } from '../../../component/Loader'
import { APP_API } from '../../../config/BaseConfig'
import { AutoGet, AutoSave } from '../../../config/service/AppService'
import { PROJECTS_BREADCRUMP_ADD } from '../../../utils/BreadcrumpUtils'
import { DASHBOARD_URL } from '../../../utils/Utils'

export const ProjectsAddAndUpdate = () => {
	const { id } = useParams()
	const [formData, setFormData] = useState({})
	const navigate = useNavigate()

	const [loading, setLoading] = useState(false)
	const [photo, setPhoto] = useState(null)
	const type = [
		{ value: 'Biznes', name: 'Biznes' },
		{ value: 'Premium', name: 'Premium' },
	]
	const status = [
		{ value: "Eng so'ngi xonadonlar", name: "Eng so'ngi xonadonlar" },
		{ value: 'Barcha xonadonlar sotilgan', name: 'Barcha xonadonlar sotilgan' },
		{ value: 'Sotuvda bor', name: 'Sotuvda bor' },
		{ value: 'Tez orada', name: 'Tez orada' },
	]

	const getAll = async () => {
		try {
			if (id) {
				const res = await AutoGet(`${APP_API.projects}/${id}`)
				console.log(res)
				setFormData({
					name: res.name,
					imageUrl:
						res.photo instanceof Blob
							? URL.createObjectURL(`${APP_API.upload}/${res.photo}`)
							: `${APP_API.upload}/${res.photo}`,
					description: res.description,
					address: res.address,
					endDate: res.endDate,
					projectType: res.projectType,
					status: res.status,
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
		{ name: 'name', label: 'Nomi', type: 'input', col: '100%' },
		{ name: 'description', label: 'Izohi', type: 'textarea', col: '100%' },
		{ name: 'address', label: 'Manzili', type: 'textarea', col: '100%' },
		{
			name: 'endDate',
			label: 'Loyiha tugash sanasi',
			type: 'date',
			col: '100%',
		},
		{
			name: 'projectType',
			label: 'Loyiha turi',
			type: 'select',
			col: '100%',
			arr: type,
		},
		{
			name: 'status',
			label: 'Status',
			type: 'select',
			col: '100%',
			arr: status,
		},
	]

	const handleSubmit = async formData => {
		if (id) {
			formData.photo = photo
		}
		// Agar eski rasm string bo‘lsa, reject qilamiz
		if (!formData.photo) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Xatolik yuz berdi. Yangi rasm yuklang.',
			})
		}

		if (!formData.name || formData.name.trim().length < 2) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Loyiha nomi bo'lishi shart.",
			})
		}

		if (!formData.description || formData.description.trim().length < 2) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Tavsif bo'lishi shart.",
			})
		}

		if (!formData.address || formData.address.trim().length < 2) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Manzil bo'lishi shart.",
			})
		}

		if (!formData.endDate || formData.endDate.trim().length < 2) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Tugash sanasi bo'lishi shart.",
			})
		}

		if (!formData.projectType || formData.projectType.trim().length < 2) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Loyiha turi bo'lishi shart.",
			})
		}

		if (!formData.status || formData.status.trim().length < 2) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Status bo'lishi shart.",
			})
		}

		const data = new FormData()
		data.append('name', formData.name)
		data.append('photo', formData.photo)
		data.append('description', formData.description)
		data.append('address', formData.address)
		data.append('endDate', formData.endDate)
		data.append('projectType', formData.projectType)
		data.append('status', formData.status)

		const res = await AutoSave(
			data,
			APP_API.projects,
			id ? id : '',
			navigate,
			`${DASHBOARD_URL.projects}`
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
				url={`/${DASHBOARD_URL.projects}`}
				arr={PROJECTS_BREADCRUMP_ADD}
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
