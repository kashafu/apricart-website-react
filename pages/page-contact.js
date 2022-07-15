import HeadTag from "../components/Layout/components/Head/HeadTag";

export default function PageContact() {
    return <>
        <HeadTag title={'Contact Us'}/>
        <body className="bg-emerald-200">
            <div className="hero-content">
                <div className="container">
                    <div className="text-center">
                        <h4 className="text-brand mb-20">Get in touch</h4>
                        <h1 className="mb-20 wow fadeIn animated font-xxl fw-900">
                            Let's Talk  <br />
                            <span className="text-style-1"></span>
                        </h1>
                        <p className="w-50 m-auto mb-50 wow fadeIn animated">We love hearing from you, our Apricart customers. Please contact us about anything at all. Your experience or request for a specific product. We’ll do everything we can to make your experience unforgettable every time. Reach us however you like.</p>
                        {/* <p className="wow fadeIn animated">
                            <a className="btn btn-brand btn-lg font-weight-bold text-white border-radius-5 btn-shadow-brand hover-up" href="page-about.html">About Us</a>
                            <a className="btn btn-outline btn-lg btn-brand-outline font-weight-bold text-brand bg-white text-hover-white ml-15 border-radius-5 btn-shadow-brand hover-up">Support Center</a>
                        </p>  */}
                    </div>
                </div>
            </div>
            <div className="container  left-1/4">

                <h3 className="">Drop Us a Line</h3>
                <p className="">Please direct all inquiries via email to: support@apricart.pk</p>
                <form className="" id="contact-form" action="#" method="post">
                    <div className="relative wd-120">
                        <div className="absolute left-0 m-2.5">
                            <span>First Name</span> <br />
                            <input name="name" placeholder="First Name" type="text" />
                        </div>
                        <div className="absolute left-1/3">
                            <span >EMAIL</span> <br />
                            <input name="email" placeholder="Your Email" type="email" />
                        </div>
                        <br />
                        <br />

                        <div className="absolute left-0 m-2.5">
                            <span >telephone</span> <br />
                            <input name="telephone" placeholder="Your Phone" type="tel" />

                        </div>
                        <div className="absolute left-1/3">
                            <span >SUBJECT</span> <br />
                            <input name="subject" placeholder="Subject" type="text" />
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="absolute left-1/6">
                            <textarea name="message" placeholder="Message"></textarea>
                        </div><br />
                        <br />
                        <button className="absolute left-1/6" type="submit">Send message</button>
                    </div>
                </form>
                <p className="form-messege"></p>
            </div>
        </body>
    </>
}