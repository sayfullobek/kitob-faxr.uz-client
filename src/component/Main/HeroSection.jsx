import { Link, useParams } from 'react-router-dom'

export default function HeroSection() {
	const location = useParams().pathname
	return (
		<div>
			<div class='top-bar'>
				<div class='container-fluid'>
					<div class='row align-items-center'>
						<div class='col-lg-4 col-md-12'>
							<div class='logo'>
								<Link to={'/'}>
									<h1>Kitob-faxr.uz</h1>
								</Link>
							</div>
						</div>
						<div class='col-lg-8 col-md-7 d-none d-lg-block'>
							<div class='row'>
								<div class='col-6'>
									<div class='top-bar-item'>
										<div class='top-bar-icon'>
											<i class='flaticon-calendar'></i>
										</div>
										<div class='top-bar-text'>
											<h3>Ish kunlari</h3>
											<p>Dushanba - Shanba, 8:00 - 17:00</p>
										</div>
									</div>
								</div>
								<div class='col-6'>
									<div class='top-bar-item'>
										<div class='top-bar-icon'>
											<i class='flaticon-call'></i>
										</div>
										<div class='top-bar-text'>
											<h3>Qisqa telefon raqamlarimiz</h3>
											<p>54, 25, 787</p>
										</div>
									</div>
								</div>
								{/* <div class='col-4'>
									<div class='top-bar-item'>
										<div class='top-bar-icon'>
											<i class='flaticon-send-mail'></i>
										</div>
										<div class='top-bar-text'>
											<h3>Email Us</h3>
											<p>info@example.com</p>
										</div>
									</div>
								</div> */}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class='nav-bar'>
				<div class='container-fluid'>
					<nav class='navbar navbar-expand-lg bg-dark navbar-dark'>
						<Link to={'/'} class='navbar-brand'>
							Asosiy
						</Link>
						<button
							type='button'
							class='navbar-toggler'
							data-toggle='collapse'
							data-target='#navbarCollapse'
						>
							<span class='navbar-toggler-icon'></span>
						</button>

						<div
							class='collapse navbar-collapse justify-content-between'
							id='navbarCollapse'
						>
							<div class='navbar-nav mr-auto'>
								<Link to='/' class={`nav-item nav-link`}>
									Asosiy
								</Link>
								<Link to='/all-archetectures' class='nav-item nav-link'>
									Kvartiralar
								</Link>
								<Link to='/news' class='nav-item nav-link'>
									Yangiliklar
								</Link>
							</div>
							{/* <div class='ml-auto'>
								<a class='btn' href='#'>
									Ijtimoiy tarmoqlar
								</a>
							</div> */}
						</div>
					</nav>
				</div>
			</div>
		</div>
	)
}
