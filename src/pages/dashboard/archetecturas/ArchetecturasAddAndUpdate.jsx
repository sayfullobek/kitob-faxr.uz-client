import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { AutoForm } from '../../../component/AutoForm'
import { Breadcrump } from '../../../component/Breadcrump'
import { Loader } from '../../../component/Loader'
import { APP_API } from '../../../config/BaseConfig'
import { AutoGet, AutoSave } from '../../../config/service/AppService'
import { ARCHETECTURAS_BREADCRUMP_ADD } from '../../../utils/BreadcrumpUtils'
import { DASHBOARD_URL } from '../../../utils/Utils'

export const ArchetecturasAddAndUpdate = () => {
	const { id } = useParams()
	const [formData, setFormData] = useState({})
	const [projects, setProjects] = useState([])
	const navigate = useNavigate()

	const [loading, setLoading] = useState(false)
	const [photo, setPhoto] = useState(null)
	const getAll = async () => {
		try {
			if (id) {
				const res = await AutoGet(`${APP_API.archetecturas}/${id}`)
				setFormData({
					kvartiraNumber: res.kvartiraNumber,
					imageUrl:
						res.photo instanceof Blob
							? URL.createObjectURL(`${APP_API.upload}/${res.photo}`)
							: `${APP_API.upload}/${res.photo}`,
					maydon: res.maydon,
					xonalar: res.xonalar,
					qavat: res.qavat,
					endDate: new Date(res.endDate).toISOString().split('T')[0],
					seksiya: res.seksiya,
					navbat: res.navbat,
					projects: res.projects?._id,
				})
				setPhoto(res.photo)
			}
			const project = await AutoGet(`${APP_API.projects}`)
			const arr = []

			project.data.forEach(item => {
				arr.push({ value: item._id, name: item.name })
			})

			setProjects(arr)
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
		{
			name: 'photo',
			label: 'Kvartira rasmi',
			type: 'file',
			col: '100%',
		},
		{
			name: 'kvartiraNumber',
			label: 'Kvartira raqami',
			type: 'number',
			col: '100%',
		},
		{ name: 'maydon', label: 'Maydoni', type: 'number', col: '100%' },
		{ name: 'xonalar', label: 'Xonalar', type: 'number', col: '100%' },
		{ name: 'qavat', label: 'Qavat', type: 'number', col: '100%' },
		{
			name: 'endDate',
			label: 'Topshirish yili',
			type: 'date',
			col: '100%',
		},
		{ name: 'seksiya', label: 'Seksiya', type: 'text', col: '100%' },
		{ name: 'navbat', label: 'Navbat', type: 'number', col: '100%' },
		{
			name: 'projects',
			label: 'Loyiha',
			type: 'select',
			col: '100%',
			arr: projects,
		},
	]

	const handleSubmit = async formData => {
		if (id) {
			if (!formData.photo && photo != undefined) {
				formData.photo = photo
			}
			if (!formData.photo) {
				return Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: "Kvartira rasmi bo'lishi shart bo'lishi shart.",
				})
			}
		}

		if (!formData.kvartiraNumber) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Kvartira raqami bo'lishi shart bo'lishi shart.",
			})
		}

		if (!formData.maydon) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Maydon bo'lishi shart.",
			})
		}

		if (!formData.xonalar) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Xonalar bo'lishi shart.",
			})
		}

		if (!formData.qavat) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Qavat bo'lishi shart.",
			})
		}

		if (!formData.endDate) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Topshirish sanasi bo'lishi shart.",
			})
		}

		if (!formData.seksiya) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Seksiya bo'lishi shart.",
			})
		}

		if (!formData.navbat) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Navbat bo'lishi shart.",
			})
		}

		if (!formData.projects) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Loyihaga tegishliligi bo'lishi shart.",
			})
		}

		const data = new FormData()
		data.append('photo', formData.photo)
		data.append('kvartiraNumber', formData.kvartiraNumber)
		data.append('maydon', formData.maydon)
		data.append('xonalar', formData.xonalar)
		data.append('qavat', formData.qavat)
		data.append('endDate', formData.endDate)
		data.append('seksiya', formData.seksiya)
		data.append('navbat', formData.navbat)
		data.append('projects', formData.projects)

		const res = await AutoSave(
			data,
			APP_API.archetecturas,
			id ? id : '',
			navigate,
			`${DASHBOARD_URL.archetecturas}`
		)
		console.log(res)
		if (res) {
			Swal.fire({ icon: 'success', title: 'Saqlandi!', timer: 1500 })
			setFormData({})
		}
	}

	return loading ? (
		<Box sx={{ padding: '3rem', width: '100%' }}>
			<Breadcrump
				status={'back'}
				url={`/${DASHBOARD_URL.archetecturas}`}
				arr={ARCHETECTURAS_BREADCRUMP_ADD}
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
