import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NewsNow from './component/Main/NewsNow'
import ProjectModal from './component/Main/ProjectModal'
import Service from './component/Main/Service'
import Team from './component/Main/Team'
import { DashboardLayouts } from './layout/DashboardLayout'
import MainLayout from './layout/MainLayout'
import { Login } from './pages/auth/Login'
import { Archetecturas } from './pages/dashboard/archetecturas/Archetecturas'
import { ArchetecturasAddAndUpdate } from './pages/dashboard/archetecturas/ArchetecturasAddAndUpdate'
import { Dashboard } from './pages/dashboard/Dashboard'
import { GoSubNews } from './pages/dashboard/news/GoSubNews'
import { News } from './pages/dashboard/news/News'
import { NewsAddAndUpdate } from './pages/dashboard/news/NewsForAddAndUpdate'
import { SubNewsAddAndUpdate } from './pages/dashboard/news/SubNewsAddAndUpdate'
import { Orders } from './pages/dashboard/order/Orders'
import { Projects } from './pages/dashboard/projects/Project'
import { ProjectsAddAndUpdate } from './pages/dashboard/projects/ProjectsAddAndUpdate'
import { Sales } from './pages/dashboard/sales/Sales'
import { SalesAddAndUpdate } from './pages/dashboard/sales/SalesForAddAndUpdate'
import Main from './pages/Main'
import { DASHBOARD_URL } from './utils/Utils'
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<MainLayout />}>
					<Route index element={<Main />} />
					<Route path='/all-archetectures' element={<Service />} />
					<Route path='/news' element={<Team />} />
					<Route path='/newsNow/:id' element={<NewsNow />} />
					<Route path='/project/:id' element={<ProjectModal />} />
				</Route>
				<Route path={`/${DASHBOARD_URL.login}`} element={<Login />} />
				<Route
					path={`/${DASHBOARD_URL.dashboard}`}
					element={<DashboardLayouts />}
				>
					<Route path={`/${DASHBOARD_URL.dashboard}`} element={<Dashboard />} />
					<Route path={`/${DASHBOARD_URL.sales}`} element={<Sales />} />
					<Route
						path={`/${DASHBOARD_URL.salesAdd}`}
						element={<SalesAddAndUpdate />}
					/>
					<Route
						path={`/${DASHBOARD_URL.salesUpdate}/:id`}
						element={<SalesAddAndUpdate />}
					/>

					<Route path={`/${DASHBOARD_URL.news}`} element={<News />} />
					<Route
						path={`/${DASHBOARD_URL.goNews}/:id`}
						element={<GoSubNews />}
					/>
					<Route
						path={`/${DASHBOARD_URL.newsAdd}`}
						element={<NewsAddAndUpdate />}
					/>
					<Route
						path={`/${DASHBOARD_URL.newsUpdate}/:id`}
						element={<NewsAddAndUpdate />}
					/>
					<Route
						path={`/${DASHBOARD_URL.subNewsAdd}/:newsId`}
						element={<SubNewsAddAndUpdate />}
					/>
					<Route
						path={`/${DASHBOARD_URL.subNewsUpdate}/:newsId/:id`}
						element={<SubNewsAddAndUpdate />}
					/>

					<Route path={`/${DASHBOARD_URL.projects}`} element={<Projects />} />

					<Route
						path={`/${DASHBOARD_URL.projectsAdd}`}
						element={<ProjectsAddAndUpdate />}
					/>

					<Route
						path={`/${DASHBOARD_URL.projectsUpdate}/:id`}
						element={<ProjectsAddAndUpdate />}
					/>

					<Route
						path={`/${DASHBOARD_URL.archetecturas}`}
						element={<Archetecturas />}
					/>

					<Route
						path={`/${DASHBOARD_URL.archetecturasAdd}`}
						element={<ArchetecturasAddAndUpdate />}
					/>

					<Route
						path={`/${DASHBOARD_URL.archetecturasUpdate}/:id`}
						element={<ArchetecturasAddAndUpdate />}
					/>

					<Route
						path={`/${DASHBOARD_URL.archetecturasOrder}`}
						element={<Orders />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
