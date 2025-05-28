// AutoTable.jsx
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import {
	Button,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { APP_API } from '../config/BaseConfig'
import { AutoDelete, AutoSave } from '../config/service/AppService'
import { DASHBOARD_URL } from '../utils/Utils'

export const AutoTable = ({
	data,
	fields,
	onEdit,
	url,
	deleteUrl,
	getAll,
	pathName,
	goModule,
}) => {
	const navigate = useNavigate()
	return (
		<TableContainer
			component={Paper}
			sx={{ marginTop: '1rem', padding: '2rem' }}
		>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Tartib</TableCell>
						{fields.map(field => (
							<TableCell key={field.name}>{field.label}</TableCell>
						))}
						{pathName != `/${DASHBOARD_URL.archetecturasOrder}` && (
							<TableCell>Amallar</TableCell>
						)}
					</TableRow>
				</TableHead>
				<TableBody>
					{data?.map((row, index) => (
						<TableRow key={index}>
							<TableCell key={'tr'}>{index + 1}</TableCell>
							{fields.map(field =>
								field.name === 'imageUrl' ? (
									<TableCell key={field.name}>
										<img
											style={{
												width: '50px',
												height: '50px',
												borderRadius: '50%',
											}}
											src={
												row[field.name]
													? row[field.name]
													: `${APP_API.upload}/${row.photo}`
											}
											alt=''
										/>
									</TableCell>
								) : field.name === 'archetectures' ? (
									<TableCell key={field.name}>
										<Button
											variant='contained'
											sx={{ marginRight: '1rem' }}
											color='primary'
											onClick={() =>
												Swal.fire({
													title: `
													<img src="${APP_API.upload}/${row.archetectura?.photo}"/>
													<div style="font-size:20px">
													<div className="d-flex">
													<p className="col-6">Kvartira raqami : ${row.archetectura?.kvartiraNumber}</p>
													<p className="col-6">Maydoni : ${row.archetectura?.maydon}</p></div>
													<p>Xonalari : ${row.archetectura?.xonalar}</p>
													<p>Qavati : ${row.archetectura?.qavat}</p><p>
														Tugallanish vaqti : ${row.archetectura?.endDate.substr(0, 10)}</p>
													<p>
														Seksiya : ${row.archetectura?.seksiya}</p>
														<p>
														Navbati : ${row.archetectura?.navbat}</p>
														<p>
														Sotilganmi : ${row.archetectura?.soldOut ? 'Sotilgan' : 'Sotilmagan'}</p>
														</div>`,
													showClass: {
														popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
													},
													hideClass: {
														popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
													},
												})
											}
										>
											<IconButton>
												<RemoveRedEyeIcon />
											</IconButton>
										</Button>
									</TableCell>
								) : field.name === 'teacher' ? (
									<TableCell key={field.name}>
										{row[field.name].firstName} {row[field.name].lastName}
									</TableCell>
								) : field.name === 'description' ? (
									<TableCell key={field.name}>
										<Button
											variant='contained'
											sx={{ marginRight: '1rem' }}
											color='primary'
											onClick={() =>
												Swal.fire({
													title: row.description,
													showClass: {
														popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
													},
													hideClass: {
														popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
													},
												})
											}
										>
											<IconButton>
												<RemoveRedEyeIcon />
											</IconButton>
										</Button>
									</TableCell>
								) : field.name === 'video' ? (
									<TableCell key={field.name}>
										<Button
											variant='contained'
											sx={{ marginRight: '1rem' }}
											color='primary'
											onClick={() =>
												Swal.fire({
													title: `<video style="width:100%;" src="${APP_API.upload}/${row.video}" controls>
													</video>`,
													showClass: {
														popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
													},
													hideClass: {
														popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
													},
												})
											}
										>
											<IconButton>
												<RemoveRedEyeIcon />
											</IconButton>
										</Button>
									</TableCell>
								) : field.name === 'go' ? (
									<TableCell key='goPage'>
										<Button
											variant='contained'
											sx={{ marginRight: '1rem' }}
											color='secondary'
											onClick={() => navigate(`${goModule}/${row._id}`)}
										>
											<IconButton>
												<RemoveRedEyeIcon />
											</IconButton>
										</Button>
									</TableCell>
								) : field.name === 'soldOut' ? (
									<TableCell key={field.name}>
										{/* export const AutoSave = async (data, api, id, navigate, url) */}
										<Button
											onClick={() => {
												Swal.fire({
													title: 'Yangilash?',
													text: `Yangilashga tayyormisiz! Kvartirani (${row.soldOut ? "Sotilmaganlarga qo'shmoqchimisiz?" : "Sotilganlarga qo'shmoqchimisiz?"})`,
													icon: 'warning',
													showCancelButton: true,
													confirmButtonColor: 'green',
													cancelButtonColor: '#d33',
													cancelButtonText: 'Yopish',
													confirmButtonText: 'Xa yangilayman!',
												}).then(async result => {
													if (result.isConfirmed) {
														try {
															const data = new FormData()
															data.append(
																'soldOut',
																row[field.name] ? false : true
															)
															const res = await AutoSave(
																data,
																`${APP_API.archetecturas}/soldOut`,
																row._id,
																navigate,
																`${DASHBOARD_URL.archetecturas}`
															)
															Swal.fire({
																title: 'Yaxshi',
																text: res.message,
																icon: 'success',
															})
															const page = Number.parseInt(
																localStorage.getItem(`start-page-${pathName}`)
															)
															const rowsPerPage = localStorage.getItem(
																`limit-page-${pathName}`
															)
															await getAll(page, rowsPerPage)
														} catch (err) {
															Swal.fire({
																icon: 'error',
																title: 'Oops...',
																text:
																	err?.response?.data?.message ||
																	'Nomaʼlum xatolik yuz berdi',
															})
														}
													}
												})
											}}
											variant='contained'
											color={row[field.name] ? 'error' : 'success'}
										>
											<IconButton>
												<CurrencyExchangeIcon />
											</IconButton>
										</Button>
									</TableCell>
								) : (
									<TableCell key={field.name}>{row[field.name]}</TableCell>
								)
							)}
							{pathName != `/${DASHBOARD_URL.archetecturasOrder}` ? (
								<TableCell>
									<Button
										variant='contained'
										sx={{ marginRight: '1rem' }}
										color='warning'
										onClick={() => navigate(`/${url}/${row._id}`)}
									>
										<IconButton onClick={() => onEdit(row)}>
											<EditIcon />
										</IconButton>
									</Button>
									<Button
										onClick={() =>
											AutoDelete(deleteUrl, row._id, getAll, pathName)
										}
										variant='contained'
										color='error'
									>
										<IconButton>
											<DeleteIcon />
										</IconButton>
									</Button>
								</TableCell>
							) : (
								pathName != `/${DASHBOARD_URL.archetecturasOrder}` && (
									<TableCell key='goPage'>
										<Button
											variant='contained'
											sx={{ marginRight: '1rem' }}
											color='primary'
											onClick={() =>
												navigate(`/${DASHBOARD_URL.goCourse}/${row._id}`)
											}
										>
											<IconButton>
												<RemoveRedEyeIcon />
											</IconButton>
										</Button>
									</TableCell>
								)
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
