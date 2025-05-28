import {
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	TextField,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginHandler } from '../../config/service/AuthService'
import { DASHBOARD_URL } from '../../utils/Utils'

export const Login = () => {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		phoneNumber: '',
		password: '',
	})

	const validation = async () => {
		if (localStorage.getItem('token')) {
			navigate(`/${DASHBOARD_URL.dashboard}`)
		}
	}
	useEffect(() => {
		validation()
	}, [])

	const [errors, setErrors] = useState({})

	const handleChange = e => {
		setFormData(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	const validate = () => {
		let tempErrors = {}

		const phonePattern = /^\+998\d{9}$/
		tempErrors.phoneNumber = phonePattern.test(formData.phoneNumber)
			? ''
			: 'Telefon raqam +998 bilan va 9 ta raqam bilan kiritilishi shart'

		tempErrors.password = formData.password ? '' : 'Parol kiritilishi shart'

		setErrors(tempErrors)
		return Object.values(tempErrors).every(x => x === '')
	}

	const handleSubmit = async e => {
		e.preventDefault()
		if (validate()) {
			await LoginHandler(formData, navigate)
		}
	}

	return (
		<Box
			sx={{
				minHeight: '100vh',
				backgroundColor: '#d1fae5',
				backgroundImage: `radial-gradient(650px circle at 0% 0%,
          #6ee7b7 15%,
          #34d399 35%,
          #10b981 75%,
          #059669 80%,
          transparent 100%),
        radial-gradient(1250px circle at 100% 100%,
          #a7f3d0 15%,
          #6ee7b7 35%,
          #34d399 75%,
          #10b981 80%,
          transparent 100%)`,
				overflow: 'hidden',
				px: { xs: 2, md: 8 },
				py: 5,
			}}
		>
			<Grid container spacing={4} alignItems='center' justifyContent='center'>
				<Grid item xs={12} md={6}>
					<Typography
						variant='h3'
						fontWeight='bold'
						color='#064e3b'
						gutterBottom
					>
						Kitob-Faxr.uz <br />
						<Box component='span' color='#047857'>
							qurilish kompaniyasi
						</Box>
					</Typography>
					<Typography color='#065f46'>
						Hurmatli foydalanuvchi, tizimga kirish uchun telefon raqamingiz va
						parolingizni kiriting. Tizim faqat administratorlar uchun
						mo‘ljallangan.
					</Typography>
				</Grid>

				<Grid item xs={12} md={6}>
					<Box
						sx={{
							position: 'relative',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							minHeight: { xs: 'auto', md: '100%' },
						}}
					>
						<Box
							sx={{
								position: 'absolute',
								top: -60,
								left: -130,
								width: 220,
								height: 220,
								borderRadius: '50%',
								background: 'radial-gradient(#065f46, #34d399)',
								zIndex: 1,
							}}
						/>
						<Box
							sx={{
								position: 'absolute',
								bottom: -60,
								right: -110,
								width: 300,
								height: 300,
								borderRadius: '38% 62% 63% 37% / 70% 33% 67% 30%',
								background: 'radial-gradient(#065f46, #34d399)',
								zIndex: 1,
							}}
						/>

						<Card
							sx={{
								position: 'relative',
								zIndex: 2,
								width: '100%',
								maxWidth: 400,
								backdropFilter: 'saturate(200%) blur(25px)',
								backgroundColor: 'rgba(255, 255, 255, 0.9)',
							}}
						>
							<CardContent sx={{ p: 4 }}>
								<Typography variant='h6' align='center' gutterBottom>
									Tizimga kirish
								</Typography>
								<form>
									<TextField
										name='phoneNumber'
										label='Telefon raqam'
										type='tel'
										fullWidth
										required
										sx={{ mt: 2 }}
										value={formData.phoneNumber}
										onChange={handleChange}
										error={!!errors.phoneNumber}
										helperText={errors.phoneNumber}
										placeholder='+998901234567'
									/>

									<TextField
										name='password'
										label='Parol'
										type='password'
										fullWidth
										required
										sx={{ mt: 2 }}
										value={formData.password}
										onChange={handleChange}
										error={!!errors.password}
										helperText={errors.password}
									/>

									<Button
										type='button'
										fullWidth
										variant='contained'
										sx={{
											mt: 3,
											backgroundColor: '#10b981',
											'&:hover': {
												backgroundColor: '#059669',
											},
										}}
										onClick={handleSubmit}
									>
										Kirish
									</Button>
								</form>
							</CardContent>
						</Card>
					</Box>
				</Grid>
			</Grid>
		</Box>
	)
}
