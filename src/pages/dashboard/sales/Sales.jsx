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
import { useLocation } from 'react-router-dom'
import * as XLSX from 'xlsx'
import { AutoTable } from '../../../component/AutoTable'
import { Breadcrump } from '../../../component/Breadcrump'
import { Loader } from '../../../component/Loader'
import { Pagination } from '../../../component/Pagination'
import { APP_API } from '../../../config/BaseConfig'
import { AutoGet } from '../../../config/service/AppService'
import { SALES_BREADCRUMP } from '../../../utils/BreadcrumpUtils'
import { SALES_HEAD } from '../../../utils/TableHeadUtils'
import { DASHBOARD_URL } from '../../../utils/Utils'

export const Sales = () => {
	const [search, setSearch] = useState('')
	const [searchField, setSearchField] = useState('name') // default: name
	const [data, setData] = useState([])
	const [totalItems, setTotalItems] = useState(0)
	const [forSearch, setForSearch] = useState([])
	const [loading, setLoading] = useState(false)
	const [filteredData, setFilteredData] = useState([])
	const pathName = useLocation().pathname

	const getAll = async (page = 1, limit = 10) => {
		try {
			const res = await AutoGet(`${APP_API.sales}?page=${page}&limit=${limit}`)
			setData(res.data)
			setTotalItems(res.total)
			const searchs = await AutoGet(
				`${APP_API.sales}?page=1&limit=${res.total}`
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
			case 'name':
				return 'Nomi bo‘yicha qidirish...'
			case 'link':
				return 'Linki bo‘yicha qidirish...'
			default:
				return 'Qidirish...'
		}
	}

	const exportToExcel = () => {
		const exportData = search.trim().length === 0 ? forSearch : filteredData
		const worksheet = XLSX.utils.json_to_sheet(exportData)
		const workbook = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(workbook, worksheet, 'SalesData')

		const excelBuffer = XLSX.write(workbook, {
			bookType: 'xlsx',
			type: 'array',
		})
		const dataBlob = new Blob([excelBuffer], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		})
		saveAs(dataBlob, 'sales-data.xlsx')
	}

	return loading ? (
		<Box sx={{ padding: '3rem' }}>
			<Breadcrump
				status={'add'}
				url={`/${DASHBOARD_URL.salesAdd}`}
				arr={SALES_BREADCRUMP}
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
						<MenuItem value='name'>Nomi</MenuItem>
						<MenuItem value='link'>Linki</MenuItem>
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
				fields={SALES_HEAD}
				url={DASHBOARD_URL.salesUpdate}
				deleteUrl={APP_API.sales}
				getAll={getAll}
				pathName={pathName}
			/>
			<Pagination totalItems={totalItems} getAll={getAll} />
		</Box>
	) : (
		<Loader />
	)
}
