import { SEO } from 'components/SEO'
import { CrispChat } from 'components/Scripts/CrispChat'
import { LayoutSidebar } from 'components/Layout/LayoutSidebar'
import { ContactForm } from 'components/ContactForm/ContactForm'

export default function Contact() {
	return (
		<>
			<SEO
				title="Contact Us"
				description="This page contains a contact form. Use this form if you have questions or suggestions about the content on this site."
				canonical="/contact/"
			/>
			<CrispChat />
			<LayoutSidebar heading="Contact Us" url="/contact/">
				<p>
					We would love to hear from you. Please submit a message using the
					contact form below and we will get back to you as soon as
					possible. You can also send an email directly to{' '}
					<a className="bll" href="mailto:contact@stockanalysis.com">
						contact@stockanalysis.com
					</a>
					.
				</p>
				<ContactForm />
			</LayoutSidebar>
		</>
	)
}
