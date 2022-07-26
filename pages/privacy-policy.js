import PageHeading from '../components/Layout/components/Typography/PageHeading'
import Heading from '../components/Layout/components/Typography/Heading'
import Paragraph from '../components/Layout/components/Typography/Paragraph'
import HeadTag from '../components/Layout/components/Head/HeadTag'

export default function Privacy() {
	return (
		<div className='px-5'>
			<HeadTag title={'Privacy Policy'}/>
			<PageHeading
				text={'Privacy Policy'}
			/>
			<section>
				<Heading
					text={'Welcome to Apricart Privacy Policy'}
				/>
				<Paragraph
					text={'Our system for website and Mobile App backend is hosted on Amazon Web Services (AWS), a comprehensive and broadly adopted cloud platform provided by Amazon. Our website and backend e-commerce management systems follow industry standard security protocols and securely store the databases and relevant information.'}
				/>
				<Paragraph
					text={'The brand "Apricart" is owned by Apricart E-Stores Private Ltd. This is operated by Apricart E-Stores Private Ltd. Apricart is a grocery and pharmacy orders delivery service. The policy only covers information, i.e your Name, your contact number, your address, your GPS location collected through this application to present you the relevant products, contact you, and serve you, your order delivery at your communicated location. No information is collected offline by Apricart E-Stores Private Ltd.'}
				/>
				<Paragraph
					text={'Personal information provided on the website and Mobile Apps are transmitted through a secure server. We take appropriate physical, electronic and administrative steps to maintain the security and accuracy of personally identifiable information we collect, including limiting the number of people who have physical access to our database servers, as well as employing electronic security systems and password protections that guard against unauthorized access.'}
				/>
				<Paragraph
					text={'Our website and Mobile apps use encryption technology, like Secure Socket Layer (SSL) to protect your personal information during data transport. SSL encrypts ordering information such as your name, address, email address and telephone number and GPS location to provide you the required delivery of the service.'}
				/>
				<Paragraph
					text={'May use your information to: Provide, maintain, and improve our services, send receipts, develop new features, authenticate users, and send product updates and administrative messages.'}
				/>
				<Paragraph
					text={'We may share your basic information (name, address &amp; contact number) to a third party in order to make the delivery of products (we shall send SMS to service provider or delivery supplier).'}
				/>
				<Paragraph
					text={'To help us achieve our goal of providing the highest quality products and services, we use information from our interactions with you and other customers. Because we respect your privacy, we have implemented procedures to ensure that your personal information is handled in a safe, secure, and responsible manner. We have posted this privacy policy in order to explain our information collection practices and the choices you have about the way information is collected and used.'}
				/>
				<Paragraph
					text={'As we continue to enhance the website and mobile apps and take advantage of advances in technology to improve the services we offer, this privacy policy may likely will change. We therefore encourage you to refer to this policy on an ongoing basis so that you understand our current privacy policy.'}
				/>
			</section>
			<section>
				<Heading
					text={'Consent For Collecting Your Information'}
				/>
				<Paragraph
					text={'When you create an account, place an order, arrange a delivery or sbook a service on the website and Apricart Mobile app, we imply that you are giving us your consent to collect and use the information of your Name, your contact number, your address, your GPS location for the purposes defined in this policy. In case you want to opt-out from this consent, please send us an email on support@apricart.pk and we will remove your contact details from our database.'}
				/>
			</section>
			<section>
				<Heading
					text={'Validity Of Privacy Policy'}
				/>
				<Paragraph
					text={'Our Privacy Policy is subject to change. We may periodically change our privacy policy and apply updates.'}
				/>
			</section>
		</div>
	)
}