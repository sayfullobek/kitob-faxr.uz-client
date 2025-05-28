import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material'
import { saveAs } from 'file-saver'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import * as XLSX from 'xlsx'
import { AutoTable } from '../../../component/AutoTable'
import { Breadcrump } from '../../../component/Breadcrump'
import { Loader } from '../../../component/Loader'
import { Pagination } from '../../../component/Pagination'
import { APP_API } from '../../../config/BaseConfig'
import { AutoGet } from '../../../config/service/AppService'
import { SUB_NEWS_BREADCRUMP_ADD } from '../../../utils/BreadcrumpUtils'
import { SUB_NEWS_HEAD } from '../../../utils/TableHeadUtils'
import { DASHBOARD_URL } from '../../../utils/Utils'

export const GoSubNews = () => {
	const id = useParams().id
	const [search, setSearch] = useState('')
	const [searchField, setSearchField] = useState('description') // default: name
	const [data, setData] = useState([])
	const [totalItems, setTotalItems] = useState(0)
	const [forSearch, setForSearch] = useState([])
	const [loading, setLoading] = useState(false)
	const [filteredData, setFilteredData] = useState([])
	const pathName = useLocation().pathname

	const getAll = async (page = 1, limit = 10) => {
		try {
			const res = await AutoGet(
				`${APP_API.subNews}?page=${page}&limit=${limit}&newsId=${id}`
			)
			setData(res.data)
			setTotalItems(res.total)
			const searchs = await AutoGet(
				`${APP_API.subNews}?page=1&limit=${res.total}&newsId=${id}`
			)
			setForSearch(searchs.data)
			setLoading(true)
		} catch (err) {}
	}

	useEffect(() => {
		getAll()
	}, [])

	useEffect(() => {
		const timer = setTimeout(() => {
			if (search.trim().length === 0) {
				setFilteredData([])
			} else {
				const filtered = forSearch.filter(item =>
					(item[searchField] || '')
						.toLowerCase()
						.includes(search.trim().toLowerCase())
				)
				setFilteredData(filtered)
			}
		}, 1000)

		return () => clearTimeout(timer)
	}, [search, searchField, forSearch])

	const getLabel = () => {
		switch (searchField) {
			case 'description':
				return 'Izohi bo‘yicha qidirish...'
			default:
				return 'Qidirish...'
		}
	}

	const exportToExcel = () => {
		const exportData = search.trim().length === 0 ? forSearch : filteredData
		const worksheet = XLSX.utils.json_to_sheet(exportData)
		const workbook = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(workbook, worksheet, 'subNewsData')

		const excelBuffer = XLSX.write(workbook, {
			bookType: 'xlsx',
			type: 'array',
		})
		const dataBlob = new Blob([excelBuffer], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		})
		saveAs(dataBlob, 'sub-news-data.xlsx')
	}

	return loading ? (
		<Box sx={{ padding: '3rem' }}>
			<Breadcrump
				status={'addAndBack'}
				url={`/${DASHBOARD_URL.subNewsAdd}/${id}`}
				arr={SUB_NEWS_BREADCRUMP_ADD(id)}
				backUrl={`/${DASHBOARD_URL.news}`}
			/>
			<Box
				sx={{
					display: 'flex',
					gap: 2,
					alignItems: 'center',
					flexWrap: 'wrap',
					mt: 2,
				}}
			>
				<FormControl sx={{ minWidth: 200 }}>
					<InputLabel id='search-field-label'>Filter turi</InputLabel>
					<Select
						labelId='search-field-label'
						value={searchField}
						label='Filter turi'
						onChange={e => setSearchField(e.target.value)}
					>
						<MenuItem value='description'>Izohi</MenuItem>
					</Select>
				</FormControl>

				<FormControl sx={{ flexGrow: 1, minWidth: 250 }}>
					<TextField
						label={getLabel()}
						type='search'
						value={search}
						onChange={e => setSearch(e.target.value)}
						variant='outlined'
						fullWidth
					/>
				</FormControl>
				<Button
					variant='contained'
					color='success'
					onClick={exportToExcel}
					sx={{ height: '56px' }}
				>
					Excelga saqlash
				</Button>
			</Box>

			<AutoTable
				data={
					search.trim().length === 0
						? data
						: filteredData.length > 0
							? filteredData
							: []
				}
				fields={SUB_NEWS_HEAD}
				url={`${DASHBOARD_URL.subNewsUpdate}/${id}`}
				deleteUrl={APP_API.subNews}
				getAll={getAll}
				pathName={pathName}
			/>
			<Pagination totalItems={totalItems} getAll={getAll} />
		</Box>
	) : (
		<Loader />
	)
}
