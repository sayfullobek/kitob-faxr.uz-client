import About from '../component/Main/About'
import About2 from '../component/Main/About2'
import Blog from '../component/Main/Blog'
import Carausel from '../component/Main/Carausel'
import Fact from '../component/Main/Fact'
import Faq from '../component/Main/Faq'
import Features from '../component/Main/Features'
import Service from '../component/Main/Service'
import Team from '../component/Main/Team'

export default function Main() {
	return (
		<div>
			<Carausel />
			<Features />
			<About />
			<Fact />
			<Service />
			<About2 />
			<Team />
			<Faq />
			<Blog />
		</div>
	)
}
