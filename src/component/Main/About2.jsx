import about from '../../assets/about2.png'

export default function About2() {
	return (
		<div className='bg-light'>
			<div className='about wow fadeInUp' data-wow-delay='0.1s'>
				<div className='container'>
					<div className='row align-items-center'>
						<div className='col-lg-5 col-md-6'>
							<div className='about-img'>
								<img src={about} alt='Kitob-Faxr Qurilish Kompaniyasi' />
							</div>
						</div>
						<div className='col-lg-7 col-md-6'>
							<div className='section-header text-left'>
								<p>Mijozlar ishonchi – muvaffaqiyatimiz kaliti!</p>
								<h2>Kitob-Faxr</h2>
							</div>
							<div className='about-text'>
								<p>
									Kitob-Faxr qurilish kompaniyasi mijoz ehtiyojini birinchi
									o‘ringa qo‘ygan holda faoliyat yuritadi. Biz uchun har bir
									loyiha – bu insonlarning orzularini ro‘yobga chiqarish
									vositasi. Kompaniyamiz yillar davomida minglab mijozlarning
									ishonchini qozongan va o‘z vaqtida, sifatli bajarilgan ishlar
									bilan nom qozongan.
								</p>
								<p>
									🏗 Har bir mijoz – bu bizning hamkorimiz. Biz uzoq muddatli
									aloqalarga asoslangan xizmatlar taklif qilamiz va ularning har
									bir savoliga, ehtiyojiga mas’uliyat bilan yondashamiz.
								</p>
								<p>📋 Xizmatlarimiz ro‘yxati:</p>
								<ul>
									<li>Turar joy, tijorat va ijtimoiy binolarni qurish</li>
									<li>Kapital ta’mirlash, qayta qurish va yangilash ishlari</li>
									<li>Landshaft dizayni va ichki interyer ishlari</li>
									<li>
										Obyektlarni ekspluatatsiyaga topshirish bo‘yicha to‘liq
										xizmatlar
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
