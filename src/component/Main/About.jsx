import about from '../../assets/about.jpg'
export default function About() {
	return (
		<div className='bg-light'>
			<div class='about wow fadeInUp' data-wow-delay='0.1s'>
				<div class='container'>
					<div class='row align-items-center'>
						<div class='col-lg-5 col-md-6'>
							<div class='about-img'>
								<img src={about} alt='Image' />
							</div>
						</div>
						<div class='col-lg-7 col-md-6'>
							<div class='section-header text-left'>
								<p>Tajriba, Sifat va Ishonchning Qurilishdagi Namoyoni!</p>
								<h2>Kitob-Faxr</h2>
							</div>
							<div class='about-text'>
								<p>
									Kitob-Faxr qurilish kompaniyasi yillar davomida shakllangan
									tajriba, puxta rejalashtirish va mukammal natijalar bilan
									o‘zini isbotlagan, ishonchli va mas'uliyatli hamkordir. Biz
									nafaqat bino va inshootlar quramiz – biz orzular, g‘oyalar va
									kelajakni mustahkam poydevorga tiklaymiz. 🔨 Kompaniyamiz o‘z
									ish faoliyatini boshlab, shu kungacha yuzlab turar joy
									binolari, savdo majmualari, ofislar, ijtimoiy obyektlar va
									boshqa ko‘plab yirik loyihalarni muvaffaqiyatli amalga
									oshirdi. Har bir loyiha ortida bilimli muhandislar, fidokor
									ishchilar va zamonaviy texnologiyalar bilan jihozlangan
									jamoaning mehnati mujassam.
								</p>
								<p>
									🌆 Kitob-Faxr – bu faqat qurilish emas, bu ishonch, sifat va
									barqaror rivojlanishdir. Biz mijozlarimiz bilan uzoq muddatli
									hamkorlikka intilamiz va ularning ehtiyojlarini to‘liq
									qondirishni o‘zimizga maqsad qilganmiz.
									<br />
									<br />
									📐 Biz quyidagi yo‘nalishlarda xizmat ko‘rsatamiz: <br />
									<ul>
										<li>
											Turar joy va tijorat binolari qurilishi Ta’mirlash va
											rekonstruksiya ishlari
										</li>
										<li>
											Tashqi va ichki obodonlashtirish Loyihalash va maslahat
											xizmatlari
										</li>
										<li>
											Har bir detal, har bir g‘isht – mas'uliyat bilan
											qo‘yiladi.
										</li>
										<li>Har bir mijoz – biz uchun alohida ahamiyatga ega.</li>
									</ul>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
