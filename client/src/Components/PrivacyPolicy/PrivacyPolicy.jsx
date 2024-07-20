import React from "react";

function PrivacyPolicy() {
  return (
    <>
      <div className="min-h-screen">
        <div className="max-w-3xl mx-auto p-8">
          <h1 className="text-3xl  mb-4 text-center p-4">Privacy Policy</h1>
          <div className="overflow-auto  h-2/3 mb-5">
            <h2 className="text-xl font-semibold mb-2">
              1. Information Collection:
            </h2>
            <p className="mb-4">
              Detail the types of information collected from users, such as
              personal data (e.g., name, email address, phone number),
              demographic information, employment history, and any other
              relevant data necessary for the hiring and onboarding process.
            </p>

            <h2 className="text-xl font-semibold mb-2">2. Data Usage: </h2>
            <p className="mb-4">
              Explain how the collected information is used, including but not
              limited to facilitating job searches, matching candidates with job
              opportunities, communicating with users, providing customer
              support, and improving the platform's functionality and user
              experience.
            </p>

            <h2 className="text-xl font-semibold mb-2">
              3. Branding and Identity:{" "}
            </h2>
            <p className="mb-4">
              Data Storage and Security: Describe the measures taken to protect
              user data, including encryption, access controls, firewalls, and
              regular security audits, to safeguard against unauthorized access,
              disclosure, alteration, or destruction of personal information.
            </p>

            <h2 className="text-xl font-semibold mb-2">
              4. Data Sharing and Disclosure:{" "}
            </h2>
            <p className="mb-4">
              Clarify circumstances under which user data may be shared or
              disclosed to third parties, such as employers, recruiters, service
              providers, or regulatory authorities, and ensure compliance with
              applicable laws and regulations governing data protection and
              privacy.
            </p>

            {/* Add more sections as needed */}
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy;
