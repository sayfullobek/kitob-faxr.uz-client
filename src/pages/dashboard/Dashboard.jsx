import { Box, Card, CardContent, Grid, Paper, Typography } from '@mui/material'
import { BarChart } from '@mui/x-charts/BarChart'
import { useEffect, useState } from 'react'
import { Loader } from '../../component/Loader'
import { APP_API } from '../../config/BaseConfig'
import { AutoGet } from '../../config/service/AppService'

export const Dashboard = () => {
	const [stats, setStats] = useState([])
	const [chartData, setChartData] = useState([])
	const [loading, setLoading] = useState(false)

	const getAll = async () => {
		const res = await AutoGet(`${APP_API.allData}`)
		setStats(res.stats || [])
		setChartData(res.chartData || [])
		setLoading(true)
	}

	useEffect(() => {
		getAll()
	}, [])
	return loading ? (
		<Box sx={{ p: 3 }}>
			<Grid container spacing={2}>
				{stats.map((stat, index) => (
					<Grid item xs={12} sm={6} md={6} lg={4} key={index}>
						<Card elevation={3}>
							<CardContent>
								<Typography variant='body2' color='text.secondary'>
									{stat.name}
								</Typography>
								<Typography variant='h5' fontWeight='bold'>
									{stat.value} ta
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>

			<Paper elevation={3} sx={{ mt: 5, p: 3 }}>
				<Typography variant='h6' gutterBottom>
					Statistika Diagrammasi
				</Typography>
				<BarChart
					xAxis={[
						{
							scaleType: 'band',
							data: chartData.map(item => item.name),
						},
					]}
					series={[
						{
							data: chartData.map(item => item.value),
							color: '#1976d2',
						},
					]}
					width={600}
					height={300}
				/>
			</Paper>
		</Box>
	) : (
		<Loader />
	)
}
