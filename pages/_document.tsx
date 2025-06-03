import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="robots" content="index,follow" />
				<link rel="icon" type="image/png" href="/img/logo/favicon.svg" />

				{/* SEO: Search Engine Optimization */}
				<meta name="keyword" content={'drivex, drivex.uz, drivex fullstack'} />
				<meta
					name={'description'}
					content={
						'Buy cars anywhere and anytime in South Korea. Luxury cars with affordable prices on Drivex.uz | ' +
						'대한민국 어디서든 언제든지 차량을 구매하세요. Drivex.uz에서 합리적인 가격으로 고급 차량을 만나보세요 | ' +
						'在韩国随时随地购买汽车。尽在 Drivex.uz 以实惠价格购买豪华汽车'
					}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
