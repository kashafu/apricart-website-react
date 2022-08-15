import PageHeading from "../components/Layout/components/Typography/PageHeading"
import Heading from "../components/Layout/components/Typography/Heading"
import Paragraph from "../components/Layout/components/Typography/Paragraph"
import HeadTag from "../components/Layout/components/Head/HeadTag"

export default function AboutUs() {
	return (
		<div className="px-5">
			<HeadTag title={"About Us"} />
			<PageHeading text={"About Us"} />
			<section>
				<Heading
					text={
						"Grocery mein bachat ki art, let’s Apricart. Best Online Grocery Shopping App in Karachi, Pakistan"
					}
				/>
				<Paragraph text={"Welcome to Apricart, your number one source for all your everyday needs. Get groceries delivered to your doorstep without any hassle."} />
				<Paragraph text={"Founded in 2021 by Khalid Memon, a Chartered Accountant with staples related a family business, Apricart has come a long way to larger essential variety of items with home delivery and pickup options.. When Apricart first started out, Khalid’s passion was for helping people and relieving Pakistani households of high grocery bills. This drove him to create a platform that provides high quality rice, daal, sugar, spices along with other essential grocery items at the best rates with a booming online and a physical store."} />
				<Paragraph text={"What makes the startup unique is its highly competitive pricing model; the platform sources top-notch food products directly from local factories, which eliminates the additional reselling costs incurred by conventional retailers, and enables Apricart to offer food staples to the masses at easily affordable low prices, without compromising on quality."} />
				<Paragraph text={"Apricart is currently operating in Karachi and Peshawar with further growth planned across Pakistan."} />
				<Paragraph text={"Apricart has also launched its first hybrid Hub in Pakistan under the name of “Apricart Click & Collect store”. It brings convenience for online grocery shopping. Just select Click & Collect, add items to your cart on the app, get an additional discount,  select a time, and pick up groceries at your convenience from a selected Apricart Click & Collect Store... Not only this, when collecting the order, one can get into the store to do physical shopping from Apricart click & Collect Store as well."} />
				<Paragraph text={"Skip the long check-out queues at the stores. There is no need to look around to find the best places to buy groceries. Online grocery shopping along with Click & Collect can now be done with Apricart while sitting at home."} />
				<Paragraph text={"To strengthen startups, entrepreneurship, Online Grocery, facilitation to the public and implementing other related new ideas, the strategies are constantly being reviewed and aligned, hence without wait and burn, Apricart started Bulk Buy for our customers. Check that out on our app and website; apricart.pk"} />
				<Paragraph text={"In the new normal, citizens have become increasingly accustomed to on-demand delivery services, and this trend is expected to continue in the foreseeable future."} />
				<Paragraph text={"Keeping up with the overall digital transformation in Pakistan and the unique proposition of attractive prices on everyday essential items, Apricart promises to positively restructure the online delivery industry in the country."} />
				<Paragraph text={"Order now to enjoy the lowest grocery prices and save on your monthly budget. We hope you enjoy our products. If you have any questions or comments, please don't hesitate to contact us."} />
				<Paragraph text={"Address: Office No 601, Emarah Suites, Shahrah-e-Faisal, Sindhi Muslim Society, Karachi"} />
				<Paragraph text={"Call/WhatsApp: 0304-1110195"} />
				<Paragraph text={"Email: support@apricart.pk"} />
			</section>
		</div>
	)
}
