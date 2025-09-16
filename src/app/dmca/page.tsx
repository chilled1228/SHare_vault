import { Metadata } from 'next';
import Link from 'next/link';
import { getCanonicalUrl, getRobotsMeta } from '@/lib/seo-utils';

export const metadata: Metadata = {
  title: 'DMCA Policy | ShareVault',
  description: 'DMCA Policy for ShareVault. We respect the intellectual property rights of others and expect our users to do the same.',
  robots: getRobotsMeta('/dmca'),
  alternates: {
    canonical: getCanonicalUrl('/dmca'),
  },
};

export default function DMCAPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg">
            <h1>DMCA Policy</h1>
            <p>
              ShareVault ("we", "us", or "our") respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act of 1998, the text of which may be found on the U.S. Copyright Office website at <Link href="http://www.copyright.gov/legislation/dmca.pdf" target="_blank" rel="noopener noreferrer">http://www.copyright.gov/legislation/dmca.pdf</Link>, we will respond expeditiously to claims of copyright infringement committed using our service that are reported to our Designated Copyright Agent identified below.
            </p>

            <h2>1. Infringement Notification</h2>
            <p>
              If you are a copyright owner, or are authorized to act on behalf of one, or authorized to act under any exclusive right under copyright, please report alleged copyright infringements taking place on or through the site by completing the following DMCA Notice of Alleged Infringement and delivering it to our Designated Copyright Agent.
            </p>
            <p>
              Upon receipt of the Notice as described below, we will take whatever action, in our sole discretion, we deem appropriate, including removal of the challenged material from the site.
            </p>
            <p>
              Your DMCA Notice of Alleged Infringement must include the following:
            </p>
            <ul>
              <li>Identify the copyrighted work that you claim has been infringed, or - if multiple copyrighted works are covered by this Notice - you may provide a representative list of the copyrighted works that you claim have been infringed.</li>
              <li>Identify the material that you claim is infringing (or to be the subject of infringing activity) and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate the material, including at a minimum, if applicable, the URL of the link shown on the site where such material may be found.</li>
              <li>Provide your mailing address, telephone number, and, if available, email address.</li>
              <li>Include both of the following statements in the body of the Notice:
                <ul>
                  <li>"I hereby state that I have a good faith belief that the disputed use of the copyrighted material is not authorized by the copyright owner, its agent, or the law (e.g., as a fair use)."</li>
                  <li>"I hereby state that the information in this Notice is accurate and, under penalty of perjury, that I am the owner, or authorized to act on behalf of the owner, of the copyright or of an exclusive right under the copyright that is allegedly infringed."</li>
                </ul>
              </li>
              <li>Provide your full legal name and your electronic or physical signature.</li>
            </ul>

            <h2>2. Counter-Notification</h2>
            <p>
              If you believe that your content that was removed (or to which access was disabled) is not infringing, or that you have the authorization from the copyright owner, the copyright owner’s agent, or pursuant to the law, to post and use the material in your content, you may send a Counter-Notice containing the following information to our Copyright Agent:
            </p>
            <ul>
              <li>Your physical or electronic signature.</li>
              <li>Identification of the content that has been removed or to which access has been disabled and the location at which the content appeared before it was removed or disabled.</li>
              <li>A statement that you have a good faith belief that the content was removed or disabled as a result of mistake or a misidentification of the content.</li>
              <li>Your name, address, telephone number, and e-mail address, a statement that you consent to the jurisdiction of the federal court in your judicial district, and a statement that you will accept service of process from the person who provided notification of the alleged infringement.</li>
            </ul>
            <p>
              If a Counter-Notice is received by the Copyright Agent, we may send a copy of the Counter-Notice to the original complaining party informing that person that we may replace the removed content or cease disabling it in 10 business days. Unless the copyright owner files an action seeking a court order against the content provider, member or user, the removed content may be replaced, or access to it restored, in 10 to 14 business days or more after receipt of the Counter-Notice, at our sole discretion.
            </p>

            <h2>3. Designated Copyright Agent</h2>
            <p>
              Our Designated Copyright Agent to receive notifications of claimed infringement can be reached as follows:
            </p>
            <p>
              <strong>Copyright Agent</strong><br />
              ShareVault<br />
              [Your Company Address]<br />
              [Your City, State, Zip Code]<br />
              Email: <Link href="mailto:blog.boopul@gmail.com">blog.boopul@gmail.com</Link>
            </p>
            <p>
              Please note that for security reasons, email attachments may be blocked, so please include all necessary information in the body of the email.
            </p>
          </article>
        </div>
      </main>
    </div>
  );
}