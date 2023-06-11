import React from "react";

const TermsAndCondition = () => {
  return (
    <div className="flex mx-[40px] justify-center items-center  my-12  ">
      <div className="flex flex-1  rounded-xl  bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500">
        <div className=" flex-col relative  bg-white w-full   m-[3px] border-2 p-12  shadow-2xl rounded-lg ">
          <h1 className="heading-one">Terms and Condition</h1>
          <p className="paragraph italic text-gray-500">
            Please read these terms and conditions ("Terms") carefully before
            using the Samaritan Pharmacy Inventory Web Application
            ("Application"). These Terms constitute a legally binding agreement
            between you ("User" or "You") and Samaritan Solutions Ltd.
            ("Samaritan," "We," or "Us") governing your use of the Application.
          </p>
          <h2 className="heading-three">1. Acceptance of Terms</h2>
          <p className="paragraph">
            By accessing or using the Application, you acknowledge that you have
            read, understood, and agree to be bound by these Terms. If you do
            not agree to these Terms, you may not use the Application.
          </p>
          <h2 className="heading-three">2. Description of the Application</h2>
          <p className="paragraph">
            The Samaritan Pharmacy Inventory Web Application is a software
            application designed to assist pharmacies in managing their
            inventory, including stock tracking, medication expiration alerts,
            order management, and reporting. The Application is intended for use
            by licensed pharmacists and authorized personnel within pharmacies.
          </p>
          <h2 className="heading-three">
            3. User Eligibility and Registration
          </h2>
          <h3 className="heading-four">3.1 User Eligibility</h3>
          <p className="paragraph">
            You must be at least 18 years old and have the legal capacity to
            enter into a binding agreement to use the Application. By using the
            Application, you represent and warrant that you meet these
            requirements.
          </p>
          <h4 className="heading-four">3.2 User Registration </h4>
          <p className="paragraph">
            To access and use the Application, you may need to create a user
            account. You agree to provide accurate, current, and complete
            information during the registration process. You are solely
            responsible for maintaining the confidentiality of your account
            credentials and for any activities that occur under your account.
          </p>
          <h3 className="heading-three">4. Intellectual Property Rights</h3>
          <h4 className="heading-four">4.1 Ownership</h4>
          <p className="paragraph">
            Samaritan retains all right, title, and interest in and to the
            Application, including all intellectual property rights. These Terms
            do not grant you any ownership rights or licenses to the
            Application.
          </p>
          <h4 className="heading-four">4.2 Use of Application</h4>
          <p>
            Subject to these Terms, Samaritan grants you a limited,
            non-exclusive, non-transferable, revocable license to use the
            Application for your personal or business purposes. You may not use
            the Application for any other purpose not expressly permitted by
            these Terms.
          </p>
          <h4 className="heading-four">4.3 Prohibited Uses</h4>
          <p className="font-bold"> you agree to:</p>
          <ol className="list-decimal pl-4">
            <li className="paragraph">
              Modify, distribute, sublicense, translate, reverse engineer, or
              create derivative works of the Application;
            </li>
            <li className="paragraph">
              Use the Application for any illegal or unauthorized purpose;
            </li>
            <li className="paragraph">
              Remove, alter, or obscure any copyright, trademark, or proprietary
              notices in the Application;
            </li>
            <li className="paragraph">
              Use the Application in a manner that could harm Samaritan, its
              users, or third parties;
            </li>
            <li className="paragraph">
              Use the Application to transmit viruses, worms, or any other
              malicious code;
            </li>
            <li className="paragraph">
              less or attempt to access the accounts of other users;
            </li>
            <li className="paragraph">
              Impersonate any person or entity or falsely state or otherwise
              misrepresent your affiliation with a person or entity;
            </li>
            <li className="paragraph">
              Interfere with or disrupt the integrity or performance of the
              Application or its related systems;
            </li>
            <li className="paragraph">
              Use the Application in violation of any applicable laws or
              regulations.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TermsAndCondition;
