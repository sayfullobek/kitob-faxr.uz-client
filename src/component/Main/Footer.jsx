export default function Footer() {
	return (
		<div className='footer wow fadeIn' data-wow-delay='0.3s'>
			<div className='container'>
				<div className='row'>
					<div className='col-md-6 col-lg-4'>
						<div className='footer-contact'>
							<h2>Kontakt</h2>
							<p>
								<i className='fa fa-phone-alt'></i> 54
							</p>
							<p>
								<i className='fa fa-phone-alt'></i> 25
							</p>
							<p>
								<i className='fa fa-phone-alt'></i> 787
							</p>
							<p>
								<i className='fa fa-clock'></i> Dushanba - Shanba, 8:00 - 17:00
							</p>
						</div>
					</div>
					<div className='col-md-6 col-lg-4'>
						<div className='footer-link'>
							<h2>Xizmatlar</h2>
							<p>Turar joy va tijorat binolari qurilishi</p>
							<p>Ichki va tashqi ta'mirlash</p>
							<p>Loyihalash va maslahatlar</p>
						</div>
					</div>
					<div className='col-md-6 col-lg-4'>
						<div className='footer-author'>
							<h2>Mualliflik</h2>
							<p>
								Ushbu sayt{' '}
								<a className='btn btn-link' href='https://sayfullodev.uz'>
									SayfulloDev
								</a>{' '}
								tomonidan yaratilgan.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
