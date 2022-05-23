import React from 'react';
import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import Colors from '../../styles/Colors';
import Navigation from '../../components/Navigation';

const Breakpoint = '1080px';

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: fill-available;
  align-items: center;
  padding: 0 24px;
`;

const Title = styled.div`
  color: ${Colors.White};
  line-height: 3rem;
  font-size: 2.4rem;
  font-weight: bold;
  margin: 120px 0 24px;
`;

const Header = styled.p`
  color: ${Colors.White};
  line-height: 3rem;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 24px;
`;

const Paragraph = styled.p`
  color: ${Colors.White};
  line-height: 3rem;
  font-size: 1.6rem;
  margin-bottom: 24px;
  text-align: justify;
`;

const Page = styled.div`
  position: relative;
  max-width: ${Breakpoint};
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

type PrivacyPolicyPageProps = {};

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = () => (
  <Container>
    <NextSeo
      title="Bedrock | The Solana Pay Toolkit"
      description="Bedrock Privacy Policy"
    />
    <Navigation />
    <Page>
      <Title>Privacy Policy</Title>
      <Paragraph>
        <Paragraph>
          This Privacy Policy explains how your personal information is
          collected, used and disclosed by Bedrock Foundation. This Privacy
          Policy applies to any site that references this Privacy Policy, our
          mobile apps for iPhone, Windows or Android mobile devices (the “App”)
          and our Subscription Services (collectively, our “Service”). By
          accessing or using our Service, you signify that you have read,
          understood and agree to our collection, storage, use and disclosure of
          your personal information as described in this Privacy Policy and our
          Terms of Use. This Privacy Policy applies to all users who access our
          service.
        </Paragraph>

        <Header>1. HOW WE COLLECT AND USE INFORMATION</Header>

        <Paragraph>
          We collect personal information from our Bedrock Foundation Platform
          visitors and users of the Service in order to provide you with a
          personalized, useful and efficient experience. The categories of
          information we collect can include:
        </Paragraph>

        <Paragraph>
          Information that you provide directly to us. We collect information
          that you provide to us when you set up an account with us, use our
          Service, or communicate with us. For example, we may request your
          personal information (e.g., name, postal address, email address, DOB,
          telephone number) or your applicable business information when you
          register for an account or purchase a Subscription Service or Fee
          Service, including company name and company email and additional
          company contact information. We may also request payment information
          (such as your payment card number, expiration date and billing
          address). We may also collect any communications that you exchange
          with us, as well as any information you provide if you take part in
          any interactive features of the Service (e.g., promotions, surveys,
          etc.). We collect information you may provide when providing content
          or commentary to our Service in the form of blog posts, comments, and
          the like, including without limitation property information pertaining
          to a Listing (“User Content”).
        </Paragraph>

        <Paragraph>
          Information we receive from social networking sites. When you interact
          with our site through various social media, such as when you login
          through Google, Linkedin, Facebook, or share Bedrock Foundation
          content on Linkedin, Facebook, Twitter, Pinterest, Instagram or other
          sites, we may receive information from the social network including
          your profile information, profile picture, gender, user name, user ID
          associated with your social media account, age range, language,
          country, friends list, and any other information you permit the social
          network to share with third parties. The data we receive is dependent
          upon your privacy settings with the social network. You should always
          review, and if necessary, adjust your privacy settings on third-party
          websites and services before linking or connecting them to the Bedrock
          Foundation Platform or Service.
        </Paragraph>

        <Paragraph>
          We use this information to operate, maintain, and provide to you the
          features and functionality of the Service, including to perform
          background and verification checks as well as to communicate directly
          with you, such as to send you email messages about products and
          services that may be of interest to you. We may also send you
          Service-related emails or messages (e.g., account verification,
          purchase confirmation, changes or updates to features of the Service,
          technical and security notices). Similarly, if you request information
          from us through an online contact form or if you email us, we collect
          the information you provide (e.g., name, telephone number, email
          address) so that we can respond to you. For more information about
          your communication preferences, see “Control Over Your Information”
          below.
        </Paragraph>

        <Paragraph>
          Information from other sources. We may obtain information from other
          sources, such as third party background verification information and
          reference information, or through mergers and acquisitions, and
          combine this with information previously collected. In these cases,
          our Privacy Policy governs the handling of the combined personal
          information. We may also collect information about you that is
          publicly available.
        </Paragraph>

        <Header>
          2. HOW WE USE COOKIES AND OTHER TRACKING TECHNOLOGY TO COLLECT
          INFORMATION.
        </Header>

        <Paragraph>
          We, and our third party partners, automatically collect certain types
          of usage information when you visit and use our Service, read our
          emails, or otherwise engage with us. We typically collect this
          information through a variety of tracking technologies, including
          cookies, web beacons, file information and similar technology
          (collectively, “tracking technologies”). For example, we collect
          information about your device and its software, such as your IP
          address, browser type, Internet service provider, platform type,
          device type, operating system, date and time stamp, a unique ID that
          allows us to uniquely identify your browser, mobile device or your
          account, and other such information. We also collect information about
          the way you use our Service, for example, the site from which you came
          and the site to which you are going when you leave our website, the
          pages you visit, the links you click, how frequently you access the
          Service, whether you open emails or click the links contained in
          emails, and other actions you take on the Service. When you access our
          Service from a mobile device, we may collect unique identification
          numbers associated with your device or our mobile application
          (including, for example, a UDID, Unique ID for Advertisers (“IDFA”),
          Google AdID, or Windows Advertising ID), mobile carrier, device type,
          model and manufacturer, mobile device operating system brand and
          model, phone number, and depending on your mobile device settings,
          your geographical location data, including GPS coordinates (e.g.,
          latitude and/or longitude) or similar information regarding the
          location of your mobile device, or we may be able to approximate a
          device’s location by analyzing other information, like an IP address.
          We may collect analytics data, or use third-party analytics tools, to
          help us measure traffic and usage trends for the Service and to
          understand more about the demographics of our users. Although we do
          our best to honor the privacy preferences of our users, we are unable
          to respond to Do Not Track signals set by your browser at this time.
        </Paragraph>

        <Paragraph>
          We use or may use the data collected through tracking technologies to:
          (a) remember information so that you will not have to re-enter it
          during your visit or the next time you visit the site; (b) provide
          custom, personalized content and information, including targeted
          content and advertising; (c) provide and monitor the effectiveness of
          our Service; (d) monitor aggregate metrics such as total number of
          visitors, traffic, usage, and demographic patterns on our website; (e)
          diagnose or fix technology problems; and (f) otherwise to plan for and
          enhance our Service.
        </Paragraph>

        <Paragraph>
          If you would prefer not to accept cookies, most browsers will allow
          you to: (i) change your browser settings to notify you when you
          receive a cookie, which lets you choose whether or not to accept it;
          (ii) disable existing cookies; or (iii) set your browser to
          automatically reject cookies. Please note that doing so may negatively
          impact your experience using the Service, as some features and
          services on the Bedrock Foundation Platform may not work properly.
          Depending on your mobile device and operating system, you may not be
          able to delete or block all cookies. You may also set your e-mail
          options to prevent the automatic downloading of images that may
          contain technologies that would allow us to know whether you have
          accessed our e-mail and performed certain functions with it.
        </Paragraph>

        <Paragraph>
          We and our third party partners may also use cookies and tracking
          technologies for advertising purposes. For more information about
          tracking technologies, please see “Third Party Tracking and Online
          Advertising” below.
        </Paragraph>

        <Header>3. HOW WE SHARE PERSONAL INFORMATION</Header>

        <Paragraph>
          We may share your personal information in the instances described
          below. For further information on your choices regarding your
          information, see “Control Over Your Information.”
        </Paragraph>

        <Paragraph>
          We may share your personal information with third-party service
          providers or business partners who help us deliver or improve our
          Service or who perform services on our behalf, such as identifying and
          serving targeted advertisements, processing payments, verifying
          backgrounds and identities, providing back-office services, or
          measuring site traffic.
        </Paragraph>

        <Paragraph>
          We may aggregate, or strip information of personally identifying
          characteristics, and then share that aggregated or anonymized
          information with third parties.
        </Paragraph>

        <Paragraph>
          We may share or disclose your personal information if we determine, in
          our sole discretion, that we are required to do so under applicable
          law or regulatory requirements, or if we reasonably believe disclosure
          is necessary to prevent harm or financial loss, or in connection with
          preventing fraud or illegal activity, and/or to enforce our Terms of
          Use.
        </Paragraph>

        <Paragraph>
          We may share with other companies and brands owned or controlled by
          Bedrock Foundation Inc., and other companies owned by or under common
          ownership as Bedrock Foundation, which also includes our subsidiaries
          (i.e., any organization we own or control) or our ultimate holding
          company (i.e., any organization that owns or controls us) and any
          subsidiaries it owns. These companies will use your personal
          information in the same way as we can under this Privacy Policy;
        </Paragraph>

        <Paragraph>
          We reserve the right to transfer any information we collect in the
          event we sell or transfer all or a portion of our business or assets
          (including any shares in the Bedrock Foundation) or any portion or
          combination of our products, services, businesses and/or assets.
          Should such a transaction occur (whether a divestiture, merger,
          acquisition, bankruptcy, dissolution, reorganization, liquidation, or
          similar transaction or proceeding), we will use reasonable efforts to
          ensure that any transferred information is treated in a manner
          consistent with this Privacy Policy.
        </Paragraph>

        <Paragraph>
          We may also share information with others in an aggregated or
          otherwise anonymized form that does not reasonably identify you
          directly as an individual.
        </Paragraph>

        <Header>4. USER DATA</Header>

        <Paragraph>
          In providing our Service, our Users may upload data to our Service,
          which may include personal information or data about our Users’ end
          users. User Data is owned and controlled by our Users, and any User
          Data that we maintain or process we consider to be strictly
          confidential. We collect and process User Data solely on behalf of our
          Users, and in accordance with our agreements with the Users. We do not
          use or disclose User Data except as authorized and required by our
          Users and as provided for in our agreements with our Users.
        </Paragraph>

        <Header>5. CONTROL OVER YOUR INFORMATION</Header>

        <Paragraph>
          Email Communications. From time to time, we may send you emails
          regarding updates to our website, products or services, notices about
          our organization, or information about products/services we offer (or
          promotional offers from third parties) that we think may be of
          interest to you. If you wish to unsubscribe from such emails, simply
          click the “unsubscribe link” provided at the bottom of the email
          communication. Note that you cannot unsubscribe from certain
          Services-related email communications (e.g., account verification,
          confirmations of transactions, technical or legal notices).
        </Paragraph>

        <Paragraph>
          Modifying Account Information. If you have an online account with us,
          you have the ability to modify certain information in your account
          (e.g., your contact information) through “profile,” “account,”
          “settings,” or “preferences” options provided on the website or
          service. If you have any questions about review, modifying, updating
          or deleting your information, please contact us at the email or postal
          address provided below. We may not be able to modify or delete your
          information in all circumstances. Please note that Bedrock Foundation
          does not own or control the User Data uploaded to our Service by our
          Users, and cannot modify or delete User Data except at the request of
          our User, or as permitted by our Terms of Use.
        </Paragraph>

        <Header>6. THIRD PARTY TRACKING AND ONLINE ADVERTISING</Header>

        <Paragraph>
          We participate in interest-based advertising and use third party
          advertising companies to serve you targeted advertisements based on
          your online browsing history and your interests. We permit third party
          online advertising networks, social media companies and other third
          party services, to collect, information about your use of our Service
          over time so that they may play or display ads on other websites, apps
          or services you may use, including on Facebook, and on other devices
          you may use. Typically, though not always, the information used for
          interest-based advertising is collected through cookies or similar
          tracking technologies. We may share a common account identifier (such
          as an email address or user ID) or hashed data with our third party
          advertising partners to help identify you across devices. We and our
          third party partners use this information to make the advertisements
          you see online more relevant to your interests, as well as to provide
          advertising-related services such as reporting, attribution, analytics
          and market research.
        </Paragraph>

        <Paragraph>
          To learn more about interest-based advertising and how you may be able
          to opt-out of some of this advertising, you may wish to visit the
          Network Advertising Initiative’s online resources, at
          http://www.networkadvertising.org/choices, and/or the DAA’s resources
          at www.aboutads.info/choices. You may also be able to set your browser
          to delete or notify you of cookies by actively managing the settings
          on your browser or mobile device. Please note that some advertising
          opt-outs may not be effective unless your browser is set to accept
          cookies. Furthermore, if you use a different device, change browsers
          or delete the opt-out cookies, you may need to perform the opt-out
          task again.
        </Paragraph>

        <Paragraph>
          You may also be able to limit certain interest-based mobile
          advertising through the settings on your mobile device by selecting
          “limit ad tracking” (iOS) or “opt-out of interest based ads”
          (Android).
        </Paragraph>

        <Paragraph>
          Google Analytics and Advertising. We may also utilize certain forms of
          display advertising and other advanced features through Google
          Analytics, such as Remarketing with Google Analytics, Google Display
          Network Impression Reporting, and Google Analytics Demographics and
          Interest Reporting. These features enable us to use first-party
          cookies (such as the Google Analytics cookie) and third-party cookies
          (such as the DoubleClick advertising cookie) or other third-party
          cookies together to inform, optimize, and display ads based on your
          past visits to the Sites. You may control your advertising preferences
          or opt-out of certain Google advertising products by visiting the
          Google Ads Preferences Manager, currently available at
          https://google.com/ads/preferences, or by vising NAI’s online
          resources at http://www.networkadvertising.org/choices.
        </Paragraph>

        <Header>7. DATA PROTECTION AND SECURITY</Header>

        <Paragraph>
          Data Retention: Following termination or deactivation of your User
          account, Bedrock Foundation may retain your information commercially
          reasonable time for recordkeeping, audit or other purposes. Any User
          Data that we have access to shall be retained, stored, and deleted in
          accordance with our agreements with our business customer.
        </Paragraph>

        <Paragraph>
          Data storage and transfer: Your information may be stored and
          processed in the United States or any other country in which Bedrock
          Foundation or its subsidiaries, affiliates or service providers
          maintain facilities. If you are located in the European Union or other
          regions with laws governing data collection and use that may differ
          from U.S. law, please note that we may transfer information, including
          personal information, to a country and jurisdiction that does not have
          the same data protection laws as your jurisdiction, and you consent to
          the transfer of information to the U.S. or any other country in which
          we or our parent, subsidiaries, affiliates or service providers
          maintain facilities and the use and disclosure of information about
          you as described in this Privacy Policy.
        </Paragraph>

        <Paragraph>
          Keeping information safe: Bedrock Foundation cares about the security
          of your information and uses commercially reasonable physical,
          technical and organizational measures designed to preserve the
          integrity and security of all information we collect. However, no
          security system is impenetrable and we cannot guarantee the security
          of our systems 100%. In the event that any information under our
          control is compromised as a result of a breach of security, we will
          take reasonable steps to investigate the situation and where
          appropriate, notify those individuals whose information may have been
          compromised and take other steps, in accordance with any applicable
          laws and regulations.
        </Paragraph>

        <Paragraph>
          Bedrock Foundation’s obligations with respect to User Data are defined
          in applicable agreements with our business customers and are not
          included in this Privacy Policy. Each customer will remain responsible
          for the privacy and security of the User Data that it collects and
          processes and for compliance with applicable data protection laws that
          may apply to the collection, processing and disclosure of User Data
          through the Services.
        </Paragraph>

        <Header>8. LINKS TO THIRD-PARTY WEBSITES AND SERVICES</Header>

        <Paragraph>
          For your convenience, our website and Service may provide links to
          third-party websites or services that are not governed by this Privacy
          Policy. To the extent that any linked third-party websites or services
          you visit are not owned or controlled by Bedrock Foundation, we are
          not responsible for those websites’ or services’ content or
          information practices. We encourage you to review the privacy policies
          of any site or service before providing any personal information.
        </Paragraph>

        <Header>9. CHILDREN’S PRIVACY</Header>

        <Paragraph>
          Bedrock Foundation’s website and Service are intended for use strictly
          by adults. We do not knowingly solicit or collect personal information
          from children under the age of 13. If we learn that any personal
          information has been collected inadvertently from a child under 13, we
          will delete the information as soon as possible. If you believe that
          we might have collected information from a child under 13, please
          contact us at contact@Bedrock Foundation.com.
        </Paragraph>

        <Header>10. CHANGES TO PRIVACY POLICY</Header>

        <Paragraph>
          We reserve the right to change this Privacy Policy from time to time
          in our sole discretion. We will post changes on this page and indicate
          the “last modified” date at the top of this page. Please check back
          often for any updates. Your continued use of our website or services
          after any change in this Privacy Policy will constitute your
          acceptance of such change.
        </Paragraph>

        <Header>11. CONTACT US</Header>

        <Paragraph>
          For additional inquiries about this Privacy Policy, please send us an
          email at sam@loyal.fyi
        </Paragraph>
      </Paragraph>
    </Page>
  </Container>
);

export const getServerSideProps: GetServerSideProps<PrivacyPolicyPageProps> = async () => {
  return {
    props: {
      props: {},
    },
  };
};

export default PrivacyPolicyPage;
