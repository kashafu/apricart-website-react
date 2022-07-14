import PageHeading from '../components/Layout/components/Typography/PageHeading'
import Heading from '../components/Layout/components/Typography/Heading'
import Paragraph from '../components/Layout/components/Typography/Paragraph'
import BulletPoints from '../components/Layout/components/Typography/BulletPoints'

export default function TermOfUse() {
	return (
		<div>
			<PageHeading
				text={'Terms of Use'}
			/>
			<section>
				<Paragraph
					text={'These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Apricart E-Stores Private Limited doing business as Apricart, (“Apricart”, “we”, “us”, or “our”), Concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “site”). We are registered in Pakistan and have our registered office at B-191, Block No. 5, Gulshan-e-Iqbal, Karachi. You agree that by accessing the site, you have read, understood, and agreed to be bound by all of these terms of use'}
				/>
				<Paragraph
					text={'Supplemental terms and conditions or documents that may be posted on the site from time to time are here by expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make any chances or modifications to these terms of use at any time and for any reason. We will alert you about the changes by updating the last updated date of these terms of use.'}
				/>
				<Paragraph
					text={'The information provided on the site is not intended for distribution to or use by any person or entity in any jurisdiction or country. Accordingly, those persons who choose to access the site from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.'}
				/>
			</section>
			<section>
				<Heading
					text={'USER REPRESENTATION'}
				/>
				<Paragraph
					text={'By using the site, you represent and warrant that. (1) all registrated information you submit will be true, accurate, current, and complete. (2) you will maintain the accuracy of such information and promptly update such registration information as necessary. (3) you will not access the site or app through automated or non human means. Whether through a bot, script or any otherwise. (4) you will not use the site or app for any illegal or unauthorized purpose and (7) your use of the site or app will not violate any applicable law or regulation.'}
				/>
			</section>
			<section>
				<Heading
					text={'USER REGISTRATION'}
				/>
				<Paragraph
					text={'You will be required to register on the app. You agree to keep your password confidential and will be responsible for all the use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole dicretion, that such username is inappropriate, obscene or otherwise.'}
				/>
			</section>
			<section>
				<Heading
					text={'PRODUCTS'}
				/>
				<Paragraph
					text={'We make every effort to display as accurately as possible the colors, features, specifications and other details of the products available on the site. However, we do not guarantee that the colors, features, specifications and details of the products will be fre of any errors. All products are subject to availability, and we cannot guarantee that items will be in stock. We reserve right to discontinue anu products at any time for any reason. Prices for all the products are subject to change.'}
				/>
			</section>
			<section>
				<Heading
					text={'PURCHASES AND PAYMENT'}
				/>
				<Paragraph
					text={'We accept the following forms of payment'}
				/>
				<BulletPoints
					points={['Cash on Delivery', 'Credit/Debit Cards']}
				/>
				<Paragraph
					text={'You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed.'}
				/>
				<Paragraph
					text={'You agree to pay all charges at the prices then in effect for your purchases and any applicable shipping fees, and you authorize us to charge your chosen payment provider for any such amounts upon placing your order.'}
				/>
				<Paragraph
					text={'We reserve the right to refuse any order placed through the Site. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed by or under the same customer account, the same payment method, and/or orders that use the same billing or shipping address. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers, or distributors'}
				/>
			</section>
			<section>
				<Heading
					text={'SITE MANAGEMENT'}
				/>
				<Paragraph
					text={'We reserve the right, but not the obligation, to:'}
				/>
				<BulletPoints
					points={['Monitor the site for violations of these terms of use;',
						'Take appropriate legal action against anyone who, in our sole discretion, violates the law or these terms of use, including without limitation, reporting such user to law enforcement authorities.',
						'Otherwise manage the app & site in a manner designed to protect our rights and property and to facilitate the proper functions of the site and the marketplace offerings.'
					]}
				/>
			</section>
			<section>
				<Heading
					text={'CORRECTIONS'}
				/>
				<Paragraph
					text={'There may be information on the site that contains typographical errors, inaccuracies or omissions that may relate to the marketplace offerings, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the app or site at any time, without prior notice.'}
				/>
			</section>
			<section>
				<Heading
					text={'USER DATA'}
				/>
				<Paragraph
					text={'We will maintain certain data that you transmit to the site for the purpose of managing the performance of the app or site, as well as data relating to your use of the app or site. Although we perform regular routine backups of data. You are solely responsible for all data that you transmit or that related to any activity you have undertaken using the app or site. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.'}
				/>
			</section>
			<section>
				<Heading
					text={'CONTACT US'}
				/>
				<Paragraph
					text={'In order to resolve a complaint regarding the site or to receive further information regarding use of the app or site, please contact us at:'}
				/>
				<Paragraph
					text={'Apricart E-Stores Private Limited'}
				/>
				<Paragraph
					text={'B-191, Block 5, Gulshan e Iqbal, Karachi, Pakistan'}
				/>
				<Paragraph
					text={'Phone: 0304-1110195'}
				/>
				<Paragraph
					text={'support@apricart.pk'}
				/>
			</section>
		</div>
	)
}