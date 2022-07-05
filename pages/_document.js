import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const originalRenderPage = ctx.renderPage;

		// Run the React rendering logic synchronously
		ctx.renderPage = () =>
			originalRenderPage({
				// Useful for wrapping the whole react tree
				enhanceApp: (App) => App,
				// Useful for wrapping in a per-page basis
				enhanceComponent: (Component) => Component,
			});

		// Run the parent `getInitialProps`, it now includes the custom `renderPage`
		const initialProps = await Document.getInitialProps(ctx);

		return initialProps;
	}

	render() {
		return (
			<Html>
				<Head>
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
					<script
						src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
						integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
						crossOrigin="anonymous"

					/>
					<link
						rel="stylesheet"
						type="text/css"
						charset="UTF-8"
						href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
					/>
					<link
						rel="stylesheet"
						type="text/css"
						href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
					/>
					{/* <meta name="viewport" content="width=device-width, initial-scale=1"/> */}
					{/* <link rel="stylesheet" type="text/css" href="assets/css/style.css" /> */}
					<link
						href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
						rel="stylesheet"
						integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
						crossOrigin="anonymous"
					/>

					<link rel="stylesheet" type="text/css" href="assets/css/custom.css" />
					<link rel="stylesheet" type="text/css" href="style/globals.css" />

					<link
						rel="stylesheet"
						href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
						integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
						crossOrigin="anonymous"
						referrerpolicy="no-referrer"
					/>
					{/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossOrigin="anonymous" referrerpolicy="no-referrer" /> */}
					{/* <!-- Bootstrap CSS --> */}

					{/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous"/> */}
					<link
						rel="stylesheet"
						type="text/css"
						href="assets/css/bootstrap.min.css"
					/>
					<link
						rel="stylesheet"
						type="text/css"
						href="assets/css/animate.css"
					/>



					<link rel="stylesheet" type="text/css" href="assets/css/animate.css" />
					<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />
					<link rel="stylesheet" type="text/css" href="https://rawgit.com/kenwheeler/slick/master/slick/slick.css" />
					<link rel="stylesheet" type="text/css" href="https://rawgit.com/kenwheeler/slick/master/slick/slick-theme.css" />


					<link
						rel="stylesheet"
						href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
						integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
						crossOrigin="anonymous"
					/>

					<link
						rel="stylesheet"
						type="text/css"
						href="https://rawgit.com/kenwheeler/slick/master/slick/slick-theme.css"
					/>

				</Head>
				<body>
					<Main />
					<NextScript />
					<script
						type="text/javascript"
						src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"
					/>
					<script src="assets/js/bootstrap.bundle.js" />
					<script src="assets/js/custom.js" />
					<script
						type="text/javascript"
						src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"
					/>
					<script
						type="text/javascript"
						src="https://kenwheeler.github.io/slick/slick/slick.js"
					/>
					<script src="assets/js/wow.min.js" />
					{/* <script src="assets/js/customAjax.js"/> */}
					<script src="assets/js/custom.js" />
					<script src="assets/js/customcategories.js" />
					<script
						src="https://unpkg.com/react/umd/react.production.min.js"
						crossOrigin
					/>

					<script
						src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
						crossOrigin
					/>

					<script
						src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
						crossOrigin
					/>
					<script
						type="text/javascript"
						src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"
					/>
					<script
						type="text/javascript"
						src="https://kenwheeler.github.io/slick/slick/slick.js"
					/>
					<script src="assets/js/wow.min.js" />
					<script type="text/javascript" src="assets/js/newJS.Js" />
					{/* <script type="text/javascript" src="assets/js/customAjax.Js"/> */}


					<script />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
