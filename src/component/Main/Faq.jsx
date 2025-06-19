export default function Faq() {
	const arr = [
		{
			name: 'Kitob-Faxr.uz nima bilan shug‘ullanadi?',
			value:
				'Kitob-Faxr.uz — bu Kitob tumanida faoliyat yurituvchi zamonaviy qurilish kompaniyasi bo‘lib, uyingizni loyihalashdan tortib, kalit topshiruvgacha bo‘lgan barcha bosqichlarda siz bilan birga bo‘ladi.',
		},
		{
			name: 'Sizlarda qanday qurilish xizmatlari mavjud?',
			value:
				'Biz quyidagi xizmatlarni taqdim etamiz: uy-joy qurilishi, ofis va tijorat binolari, ta’mirlash, dizayn, loyiha chizish, material yetkazib berish va boshqalar.',
		},
		{
			name: 'Loyihalash xizmatlari bepulmi?',
			value:
				'Agar siz biz bilan qurilish shartnomasini imzolasangiz, loyiha chizmasi bepul! Aks holda, loyiha alohida narx asosida baholanadi.',
		},
		{
			name: 'Qurilish qancha muddatda tugaydi?',
			value:
				'Qurilish muddati loyihaning hajmi va murakkabligiga qarab o‘rtacha 2-6 oy ichida yakunlanadi. Ish jadvali oldindan siz bilan kelishiladi.',
		},
		{
			name: 'Materiallarni o‘zim olib kelishim mumkinmi?',
			value:
				'Ha, albatta. Ammo biz tavsiya qiladigan materiallar sifat jihatdan tekshiruvdan o‘tgan va kafolatlangan. Tanlov sizniki!',
		},
		{
			name: 'To‘lov qanday amalga oshiriladi?',
			value:
				'To‘lovlar bosqichma-bosqich amalga oshiriladi. Shartnoma imzolanganda boshlang‘ich to‘lov, keyinchalik esa ish holatiga qarab bo‘lib-bo‘lib to‘lanadi.',
		},
		{
			name: 'Qurilish ishlari ustidan nazorat qanday olib boriladi?',
			value:
				'Har bir loyiha uchun mas’ul muhandis biriktiriladi. Siz esa real vaqt rejimida ish holatini Telegram yoki WhatsApp orqali kuzatib borishingiz mumkin.',
		},
		{
			name: 'Kompaniyangiz kafolat beradimi?',
			value:
				'Ha, biz qurilgan obyektlarga 1 yillik bepul kafolat xizmatini taqdim etamiz. Agar muammo yuzaga kelsa, bepul tuzatamiz.',
		},
		{
			name: 'Kredit yoki muddatli to‘lov orqali qurdirish mumkinmi?',
			value:
				'Ha, biz bir nechta mahalliy banklar bilan hamkorlik qilamiz. Sizga mos kredit yoki muddatli to‘lov variantlarini taklif qilishimiz mumkin.',
		},
		{
			name: 'Kitob-Faxr.uz bilan qanday bog‘lanishim mumkin?',
			value:
				'Quyidagi qisqa raqamlar orqali bog‘lanishingiz mumkin: 📞 54, 25, 787. Yoki bizning rasmiy saytda kitob-faxr.uz orqali ariza qoldiring — biz siz bilan o‘zimiz aloqaga chiqamiz!',
		},
	]

	// Savollarni 2 ga bo'lamiz
	const firstHalf = arr.slice(0, Math.ceil(arr.length / 2))
	const secondHalf = arr.slice(Math.ceil(arr.length / 2))

	return (
		<div>
			<div className='faqs'>
				<div className='container'>
					<div className='section-header text-center'>
						<p>Savollar</p>
						<h2>Javob olishingiz mumkin.</h2>
					</div>
					<div className='row'>
						<div className='col-md-6'>
							<div id='accordion-1'>
								{firstHalf.map((item, idx) => {
									const collapseId = `collapse${idx + 1}`
									return (
										<div
											className='card wow fadeInLeft'
											data-wow-delay={`${(idx + 1) * 0.1}s`}
											key={collapseId}
										>
											<div className='card-header'>
												<a
													className='card-link collapsed'
													data-toggle='collapse'
													href={`#${collapseId}`}
													aria-expanded='false'
													aria-controls={collapseId}
												>
													{item.name}
												</a>
											</div>
											<div
												id={collapseId}
												className='collapse'
												data-parent='#accordion-1'
											>
												<div className='card-body'>{item.value}</div>
											</div>
										</div>
									)
								})}
							</div>
						</div>
						<div className='col-md-6'>
							<div id='accordion-2'>
								{secondHalf.map((item, idx) => {
									const collapseId = `collapse${idx + firstHalf.length + 1}`
									return (
										<div
											className='card wow fadeInRight'
											data-wow-delay={`${(idx + 1) * 0.1}s`}
											key={collapseId}
										>
											<div className='card-header'>
												<a
													className='card-link collapsed'
													data-toggle='collapse'
													href={`#${collapseId}`}
													aria-expanded='false'
													aria-controls={collapseId}
												>
													{item.name}
												</a>
											</div>
											<div
												id={collapseId}
												className='collapse'
												data-parent='#accordion-2'
											>
												<div className='card-body'>{item.value}</div>
											</div>
										</div>
									)
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
